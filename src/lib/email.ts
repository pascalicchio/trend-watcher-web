import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

// SendGrid configuration
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'alerts@trendwatcher.io';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Brevo API configuration
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_FROM_EMAIL = process.env.BREVO_FROM_EMAIL || FROM_EMAIL;

/**
 * Send email via available provider (SendGrid → Brevo API → Brevo SMTP)
 */
async function sendEmail(to: string, subject: string, html: string, text: string): Promise<boolean> {
  // Try SendGrid first
  if (SENDGRID_API_KEY) {
    try {
      await sgMail.send({
        to,
        from: { email: FROM_EMAIL, name: 'TrendWatcher' },
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
          sender: { email: BREVO_FROM_EMAIL, name: 'TrendWatcher' },
          to: [{ email: to, name: to }],
          subject,
          htmlContent: html,
          textContent: text
        })
      });

      if (response.ok) {
        console.log(`✅ Email sent via Brevo API to ${to}`);
        return true;
      } else {
        const error = await response.text();
        console.error('Brevo API error:', error);
      }
    } catch (error: any) {
      console.error('Brevo API error:', error.message);
    }
  }

  // Try Brevo SMTP as fallback
  const BREVO_SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
  const BREVO_SMTP_PORT = parseInt(process.env.BREVO_SMTP_PORT || '587');
  const BREVO_SMTP_USER = process.env.BREVO_SMTP_USER;
  const BREVO_SMTP_PASS = process.env.BREVO_SMTP_PASS;

  if (BREVO_SMTP_USER && BREVO_SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: BREVO_SMTP_HOST,
        port: BREVO_SMTP_PORT,
        secure: BREVO_SMTP_PORT === 465,
        auth: { user: BREVO_SMTP_USER, pass: BREVO_SMTP_PASS },
        timeout: 10000 // 10 second timeout
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
 * Send welcome email with password setup link
 */
export async function sendWelcomeEmail(email: string, setupToken: string): Promise<boolean> {
  const setupUrl = `https://trendwatcher.io/setup-password?token=${setupToken}&email=${encodeURIComponent(email)}`;

  const subject = '🎉 Welcome to TrendWatcher - Set Up Your Password';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px; font-weight: 300; color: #fafafa;">trend</span>
      <span style="font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #8B5CF6, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">watcher</span>
    </div>

    <!-- Main Card -->
    <div style="background: #161616; border: 1px solid #2a2a2a; border-radius: 16px; padding: 40px;">
      <div style="font-size: 48px; text-align: center; margin-bottom: 24px;">🎉</div>
      
      <h1 style="font-size: 24px; font-weight: 700; color: #fafafa; margin: 0 0 16px 0; text-align: center;">
        Welcome to TrendWatcher
      </h1>
      
      <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        Your Inner Circle access is ready. Set up your password to access your intelligence dashboard.
      </p>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${setupUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8B5CF6, #EC4899); border-radius: 8px; color: #fff; font-size: 16px; font-weight: 600; text-decoration: none;">
          Set Up Password
        </a>
      </div>

      <p style="color: #71717a; font-size: 14px; text-align: center; margin: 0;">
        This link expires in 7 days.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #2a2a2a;">
      <p style="color: #52525b; font-size: 13px; margin: 0;">
        © 2026 TrendWatcher. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `Welcome to TrendWatcher!

Your Inner Circle access is ready. Set up your password to access your intelligence dashboard:

${setupUrl}

This link expires in 7 days.

© 2026 TrendWatcher`;

  return await sendEmail(email, subject, html, text);
}

/**
 * Send password reset email
 */
export async function sendResetEmail(email: string, resetToken: string): Promise<boolean> {
  const resetUrl = `https://trendwatcher.io/reset-password?token=${resetToken}`;

  const subject = '🔐 Reset Your TrendWatcher Password';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px; font-weight: 300; color: #fafafa;">trend</span>
      <span style="font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #8B5CF6, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">watcher</span>
    </div>

    <!-- Main Card -->
    <div style="background: #161616; border: 1px solid #2a2a2a; border-radius: 16px; padding: 40px;">
      <div style="font-size: 48px; text-align: center; margin-bottom: 24px;">🔐</div>
      
      <h1 style="font-size: 24px; font-weight: 700; color: #fafafa; margin: 0 0 16px 0; text-align: center;">
        Reset Your Password
      </h1>
      
      <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        Click the button below to reset your password. This link expires in 1 hour.
      </p>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${resetUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8B5CF6, #EC4899); border-radius: 8px; color: #fff; font-size: 16px; font-weight: 600; text-decoration: none;">
          Reset Password
        </a>
      </div>

      <p style="color: #71717a; font-size: 14px; text-align: center; margin: 0;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #2a2a2a;">
      <p style="color: #52525b; font-size: 13px; margin: 0;">
        © 2026 TrendWatcher. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `Reset Your TrendWatcher Password

Click the link below to reset your password. This link expires in 1 hour.

${resetUrl}

If you didn't request this, you can safely ignore this email.

© 2026 TrendWatcher`;

  return await sendEmail(email, subject, html, text);
}
