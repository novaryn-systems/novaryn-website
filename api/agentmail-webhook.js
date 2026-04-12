// Vercel Serverless Function — AgentMail Webhook Auto-Forwarder
// Receives message.received webhooks from AgentMail and forwards to hk@datamatrix.dk

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const payload = req.body;
    const eventType = payload.type || payload.event_type;

    // Only process inbound messages
    if (eventType !== 'message.received') {
      return res.status(200).json({ ok: true, skipped: true });
    }

    const message = payload.message || {};
    const messageId = message.message_id;
    const inboxId = message.inbox_id;
    const from = message.from_ || message.from || '';
    const to = message.to || [];
    const subject = message.subject || '(no subject)';
    const textBody = message.text || '';
    const htmlBody = message.html || '';

    // Determine original recipient for tracking
    const originalRecipient = Array.isArray(to) ? to.join(', ') : (to || inboxId || 'unknown');

    const agentmailKey = process.env.AGENTMAIL_API_KEY;
    // Use a dedicated forwarding inbox, or fall back to axjedi@novaryn.io
    const forwardFromInbox = process.env.AGENTMAIL_INBOX || 'axjedi@novaryn.io';
    const forwardTo = 'hk@datamatrix.dk';

    if (!agentmailKey) {
      console.error('[WEBHOOK] No AGENTMAIL_API_KEY configured');
      return res.status(200).json({ ok: false, error: 'No API key' });
    }

    // Don't forward emails that are already FROM hk@datamatrix.dk (avoid loops)
    const fromStr = typeof from === 'string' ? from : JSON.stringify(from);
    if (fromStr.includes('hk@datamatrix.dk')) {
      console.log(`[WEBHOOK] Skipping forward — email is from hk@datamatrix.dk`);
      return res.status(200).json({ ok: true, skipped: true, reason: 'sender-loop' });
    }

    // Don't forward if the email was already sent TO hk@datamatrix.dk (e.g., our own beta form emails)
    const toStr = Array.isArray(to) ? to.join(' ') : (to || '');
    if (toStr.includes('hk@datamatrix.dk')) {
      console.log(`[WEBHOOK] Skipping forward — already addressed to hk@datamatrix.dk`);
      return res.status(200).json({ ok: true, skipped: true, reason: 'already-addressed' });
    }

    // Forward the message
    const forwardSubject = `[${originalRecipient}] ${subject}`;

    const forwardResponse = await fetch(`https://api.agentmail.to/v0/inboxes/${encodeURIComponent(forwardFromInbox)}/messages/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${agentmailKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: forwardTo,
        subject: forwardSubject,
        text: `--- Forwarded from ${originalRecipient} ---\nFrom: ${fromStr}\nSubject: ${subject}\n\n${textBody}`,
        html: htmlBody || undefined
      })
    });

    if (!forwardResponse.ok) {
      const errText = await forwardResponse.text();
      console.error(`[WEBHOOK] Forward failed: ${forwardResponse.status} ${errText}`);
      return res.status(200).json({ ok: false, error: 'Forward failed' });
    }

    console.log(`[WEBHOOK] Forwarded: "${subject}" from ${fromStr} → ${forwardTo} (original recipient: ${originalRecipient})`);
    return res.status(200).json({ ok: true, forwarded: true });

  } catch (err) {
    console.error('[WEBHOOK] Error:', err);
    // Always return 200 to AgentMail so it doesn't retry
    return res.status(200).json({ ok: false, error: 'Internal error' });
  }
}
