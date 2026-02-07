import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

// SendGrid configuration
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'alerts@trendwatcher.io';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Brevo configuration (alternative to SendGrid)
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_FROM_EMAIL = process.env.BREVO_FROM_EMAIL || FROM_EMAIL;
const BREVO_SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-brevo.com';
const BREVO_SMTP_PORT = parseInt(process.env.BREVO_SMTP_PORT || '587');
const BREVO_SMTP_USER = process.env.BREVO_SMTP_USER;
const BREVO_SMTP_PASS = process.env.BREVO_SMTP_PASS;

/**
 * Send email via SendGrid or Brevo
 */
async function sendEmail(to: string, subject: string, html: string, text: string): Promise<boolean> {
  // Try SendGrid first
  if (SENDGRID_API_KEY) {
    try {
      await sgMail.send({
        to,
        from: {
          email: FROM_EMAIL,
          name: 'TrendWatcher'
        },
        subject,
        html,
        text
      });
      console.log(`✅ Email sent via SendGrid to ${to}`);
      return true;
    } catch (error: any) {
      console.error('SendGrid error:', error.message);
    }
  }

  // Try Brevo API
  if (BREVO_API_KEY) {
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify({
          sender: {
            name: 'TrendWatcher',
            email: BREVO_FROM_EMAIL
          },
          to: [{ email: to }],
          subject,
          htmlContent: html,
          textContent: text
        })
      });

      if (response.ok) {
        console.log(`✅ Email sent via Brevo API to ${to}`);
        return true;
      }
      const error = await response.text();
      console.error('Brevo API error:', error);
    } catch (error: any) {
      console.error('Brevo API error:', error.message);
    }
  }

  // Fall back to Brevo SMTP
  if (BREVO_SMTP_USER && BREVO_SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: BREVO_SMTP_HOST,
        port: BREVO_SMTP_PORT,
        secure: BREVO_SMTP_PORT === 465,
        auth: {
          user: BREVO_SMTP_USER,
          pass: BREVO_SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"TrendWatcher" <${BREVO_FROM_EMAIL}>`,
        to,
        subject,
        html,
        text
      });

      console.log(`✅ Email sent via Brevo SMTP to ${to}`);
      return true;
    } catch (error: any) {
      console.error('Brevo SMTP error:', error.message);
    }
  }

  console.error('❌ No email provider configured');
  return false;
}

/**
 * Send welcome email with login credentials
 */
export async function sendCredentialsEmail(email: string, username: string, password: string): Promise<boolean> {
  const loginUrl = 'https://trendwatcher.io/login';

  const subject = '🎉 Welcome to TrendWatcher - Your Inner Circle Access';

  const html = `
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
        Your 2-day free trial is now active. Here are your login credentials:
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
        ⚠️ Please change your password after your first login.
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
      <p style="color: #888; font-size: 14px; margin: 0 0 16px 0;">Your Inner Circle benefits:</p>
      <ul style="color: #aaa; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
        <li>📈 Daily Top 5 trending products</li>
        <li>🔔 Real-time velocity & saturation alerts</li>
        <li>🏭 Supplier sourcing links</li>
        <li>📊 Historical trend tracking</li>
      </ul>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #222;">
      <p style="color: #555; font-size: 12px; margin: 0;">Questions? Reply to this email.</p>
      <p style="color: #555; font-size: 12px; margin: 8px 0 0 0;">© 2026 TrendWatcher. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
🎉 Welcome to TrendWatcher - Inner Circle Access!

Your 2-day free trial is now active!

Login credentials:
Username: ${username}
Password: ${password}

Login: ${loginUrl}

⚠️ Please change your password after your first login.

Your Inner Circle benefits:
- Daily Top 5 trending products
- Real-time velocity & saturation alerts
- Supplier sourcing links
- Historical trend tracking

Questions? Reply to this email.

© 2026 TrendWatcher
  `;

  return sendEmail(email, subject, html, text);
}

/**
 * Send password reset email
 */
export async function sendResetEmail(email: string, resetToken: string): Promise<boolean> {
  const resetUrl = `https://trendwatcher.io/reset-password?token=${resetToken}`;

  const subject = '🔐 Password Reset - TrendWatcher';

  const html = `
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
      <h2 style="color: #fff; margin: 0 0 16px 0; font-size: 24px;">Password Reset Request</h2>
      <p style="color: #aaa; line-height: 1.6;">
        Click below to reset your password:
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${resetUrl}"
           style="display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600;">
          Reset Password
        </a>
      </div>

      <p style="color: #f59e0b; font-size: 14px;">
        ⚠️ This link expires in 1 hour.
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
🔐 Password Reset - TrendWatcher

Click here to reset your password: ${resetUrl}

This link expires in 1 hour.
  `;

  return sendEmail(email, subject, html, text);
}
