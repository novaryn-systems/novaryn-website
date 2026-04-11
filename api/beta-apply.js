// Vercel Serverless Function — AxJedi Beta Application Handler
// Receives form POST, sends email via AgentMail to hk@datamatrix.dk

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Honeypot check — bots fill hidden fields
    if (data.website && data.website.trim()) {
      return res.status(200).json({ ok: true, message: 'Application received' });
    }

    // Required fields
    const firstName = (data.firstName || '').trim();
    const lastName = (data.lastName || '').trim();
    const email = (data.email || '').trim();
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Build email content
    const company = (data.company || 'Not specified').trim();
    const role = (data.role || 'Not specified').trim();
    const axVersions = (data.axVersions || []).join(', ') || 'Not specified';
    const ipAddresses = (data.ipAddresses || 'Not provided').trim();
    const features = (data.features || []).join(', ') || 'None selected';
    const notes = (data.notes || 'None').trim();

    const textBody = `New AxJedi Beta Application
${'='.repeat(50)}

Personal Information:
  Name: ${firstName} ${lastName}
  Email: ${email}
  Company: ${company}

AX Background:
  Role: ${role}
  AX Versions: ${axVersions}
  IP Address(es): ${ipAddresses}

Interest:
  Features: ${features}
  Notes: ${notes}

${'='.repeat(50)}
Submitted from novaryn.io/axjedi/apply/
Timestamp: ${new Date().toISOString()}
`;

    const htmlBody = `<div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; color: #eef1f6; background: #0f1115; padding: 24px; border-radius: 12px;">
<h2 style="color: #4a9eff;">New AxJedi Beta Application</h2>
<hr style="border-color: rgba(255,255,255,0.1);">
<h3 style="color: #a2aab8;">Personal Information</h3>
<table style="color: #eef1f6; font-size: 15px;">
<tr><td style="padding: 4px 12px 4px 0; color: #a2aab8;">Name:</td><td><strong>${firstName} ${lastName}</strong></td></tr>
<tr><td style="padding: 4px 12px 4px 0; color: #a2aab8;">Email:</td><td><a href="mailto:${email}" style="color: #4a9eff;">${email}</a></td></tr>
<tr><td style="padding: 4px 12px 4px 0; color: #a2aab8;">Company:</td><td>${company}</td></tr>
</table>
<h3 style="color: #a2aab8; margin-top: 16px;">AX Background</h3>
<table style="color: #eef1f6; font-size: 15px;">
<tr><td style="padding: 4px 12px 4px 0; color: #a2aab8;">Role:</td><td>${role}</td></tr>
<tr><td style="padding: 4px 12px 4px 0; color: #a2aab8;">AX Versions:</td><td>${axVersions}</td></tr>
<tr><td style="padding: 4px 12px 4px 0; color: #a2aab8;">IP Address(es):</td><td><code>${ipAddresses}</code></td></tr>
</table>
<h3 style="color: #a2aab8; margin-top: 16px;">Interest</h3>
<table style="color: #eef1f6; font-size: 15px;">
<tr><td style="padding: 4px 12px 4px 0; color: #a2aab8;">Features:</td><td>${features}</td></tr>
<tr><td style="padding: 4px 12px 4px 0; color: #a2aab8;">Notes:</td><td>${notes}</td></tr>
</table>
<hr style="border-color: rgba(255,255,255,0.1); margin-top: 20px;">
<p style="color: #a2aab8; font-size: 13px;">Submitted from novaryn.io/axjedi/apply/ at ${new Date().toISOString()}</p>
</div>`;

    // Send via AgentMail API
    const agentmailKey = process.env.AGENTMAIL_API_KEY;
    const inbox = process.env.AGENTMAIL_INBOX || 'axjedi@agentmail.to';

    if (!agentmailKey) {
      console.error('[BETA] No AGENTMAIL_API_KEY configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const mailResponse = await fetch(`https://api.agentmail.to/v1/inboxes/${encodeURIComponent(inbox)}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${agentmailKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: [{ email: 'hk@datamatrix.dk' }],
        subject: `AxJedi Beta Application: ${firstName} ${lastName} (${company})`,
        text: textBody,
        html: htmlBody
      })
    });

    if (!mailResponse.ok) {
      const errText = await mailResponse.text();
      console.error(`[BETA] AgentMail error: ${mailResponse.status} ${errText}`);
      return res.status(500).json({ error: 'Failed to send application email' });
    }

    console.log(`[BETA] Application received: ${firstName} ${lastName} <${email}> (${company})`);
    return res.status(200).json({ ok: true, message: 'Application received' });

  } catch (err) {
    console.error('[BETA] Error:', err);
    return res.status(500).json({ error: 'Failed to submit application' });
  }
}
