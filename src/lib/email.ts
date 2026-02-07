import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'alerts@trendwatcher.io';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

/**
 * Send welcome email with login credentials
 */
export async function sendCredentialsEmail(email: string, username: string, password: string): Promise<boolean> {
  const loginUrl = 'https://trendwatcher.io/login';

  const msg = {
    to: email,
    from: {
      email: FROM_EMAIL,
      name: 'TrendWatcher'
    },
    subject: '🎉 Welcome to TrendWatcher - Your Inner Circle Access',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TrendWatcher</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #fafafa;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; margin: 0;">
        TrendWatcher
      </h1>
      <p style="color: #888; margin-top: 8px;">Predictive Velocity via Metadata Arbitrage</p>
    </div>

    <!-- Content -->
    <div style="background: #1a1a1a; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
      <h2 style="color: #fff; margin: 0 0 16px 0; font-size: 24px;">🎉 Welcome to the Inner Circle!</h2>
      <p style="color: #aaa; line-height: 1.6; margin: 0 0 24px 0;">
        Your payment was successful and you're now part of the Inner Circle. Here are your login credentials:
      </p>

      <!-- Credentials Box -->
      <div style="background: #0a0a0a; border-radius: 12px; padding: 24px; border: 1px solid #333;">
        <div style="margin-bottom: 16px;">
          <label style="display: block; color: #888; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Username</label>
          <code style="color: #8B5CF6; font-size: 18px; font-family: monospace;">${username}</code>
        </div>
        <div>
          <label style="display: block; color: #888; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Password</label>
          <code style="color: #EC4899; font-size: 18px; font-family: monospace;">${password}</code>
        </div>
      </div>

      <p style="color: #f59e0b; font-size: 14px; margin: 20px 0 0 0;">
        ⚠️ Please change your password after your first login for security.
      </p>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin-bottom: 32px;">
      <a href="${loginUrl}"
         style="display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600;">
        Access Dashboard
      </a>
    </div>

    <!-- Features -->
    <div style="border-top: 1px solid #333; padding-top: 24px;">
      <p style="color: #888; font-size: 14px; margin: 0 0 16px 0;">As an Inner Circle member, you now have access to:</p>
      <ul style="color: #aaa; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
        <li>📈 Daily Top 5 trending products before anyone else</li>
        <li>🔔 Real-time velocity and saturation alerts</li>
        <li>🎯 Supplier sourcing links for every product</li>
        <li>📊 Historical performance tracking</li>
      </ul>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #222;">
      <p style="color: #555; font-size: 12px; margin: 0;">
        Need help? Reply to this email or join our Discord.
      </p>
      <p style="color: #555; font-size: 12px; margin: 8px 0 0 0;">
        © 2026 TrendWatcher. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
    `,
    text: `
🎉 Welcome to TrendWatcher - Inner Circle Access!

Your payment was successful! Here are your login credentials:

Username: ${username}
Password: ${password}

Login at: ${loginUrl}

⚠️ Please change your password after your first login.

As an Inner Circle member, you now have access to:
- Daily Top 5 trending products before anyone else
- Real-time velocity and saturation alerts
- Supplier sourcing links for every product
- Historical performance tracking

Need help? Reply to this email.
    `
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Credentials email sent to ${email}`);
    return true;
  } catch (error: any) {
    console.error('Failed to send credentials email:', error.message);
    if (error.response?.body) {
      console.error('SendGrid error:', error.response.body);
    }
    return false;
  }
}

/**
 * Send password reset email
 */
export async function sendResetEmail(email: string, resetToken: string): Promise<boolean> {
  const resetUrl = `https://trendwatcher.io/reset-password?token=${resetToken}`;

  const msg = {
    to: email,
    from: {
      email: FROM_EMAIL,
      name: 'TrendWatcher'
    },
    subject: '🔐 Password Reset - TrendWatcher',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #fafafa;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 32px; margin: 0;">
        TrendWatcher
      </h1>
    </div>

    <div style="background: #1a1a1a; border-radius: 16px; padding: 32px;">
      <h2 style="color: #fff; margin: 0 0 16px 0;">Password Reset Request</h2>
      <p style="color: #aaa; line-height: 1.6;">
        You requested a password reset. Click the button below to set a new password:
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${resetUrl}"
           style="display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600;">
          Reset Password
        </a>
      </div>

      <p style="color: #f59e0b; font-size: 14px;">
        ⚠️ This link expires in 1 hour. If you didn't request this, ignore this email.
      </p>
    </div>
  </div>
</body>
</html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Reset email sent to ${email}`);
    return true;
  } catch (error: any) {
    console.error('Failed to send reset email:', error.message);
    return false;
  }
}
