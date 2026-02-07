import sgMail from '@sendgrid/mail';
import nodemailer, { TransportOptions } from 'nodemailer';

// SendGrid configuration
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'alerts@trendwatcher.io';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Brevo API configuration
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_FROM_EMAIL = process.env.BREVO_FROM_EMAIL || FROM_EMAIL;

// Brand colors - Blue/Green gradient
const BRAND_GRADIENT = 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)';
const BRAND_COLORS = {
  background: '#1f3157',  // Deep blue
  card: '#142040',
  cardBorder: 'rgba(0, 201, 255, 0.2)',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  accent: '#00C9FF'
};

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
<body style="margin: 0; padding: 0; background: ${BRAND_COLORS.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px; font-weight: 300; color: ${BRAND_COLORS.textPrimary};">trend</span>
      <span style="font-size: 24px; font-weight: 800; background: ${BRAND_GRADIENT}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">watcher</span>
    </div>

    <!-- Main Card -->
    <div style="background: ${BRAND_COLORS.card}; border: 1px solid ${BRAND_COLORS.cardBorder}; border-radius: 16px; padding: 40px;">
      <div style="font-size: 48px; text-align: center; margin-bottom: 24px;">🎉</div>
      
      <h1 style="font-size: 24px; font-weight: 700; color: ${BRAND_COLORS.textPrimary}; margin: 0 0 16px 0; text-align: center;">
        Welcome to TrendWatcher
      </h1>
      
      <p style="color: ${BRAND_COLORS.textSecondary}; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        Your Inner Circle access is ready. Set up your password to access your intelligence dashboard.
      </p>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${setupUrl}" style="display: inline-block; padding: 16px 32px; background: ${BRAND_GRADIENT}; border-radius: 8px; color: #000; font-size: 16px; font-weight: 600; text-decoration: none;">
          Set Up Password
        </a>
      </div>

      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 14px; text-align: center; margin: 0;">
        This link expires in 7 days.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid ${BRAND_COLORS.cardBorder};">
      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 13px; margin: 0;">
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
<body style="margin: 0; padding: 0; background: ${BRAND_COLORS.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px; font-weight: 300; color: ${BRAND_COLORS.textPrimary};">trend</span>
      <span style="font-size: 24px; font-weight: 800; background: ${BRAND_GRADIENT}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">watcher</span>
    </div>

    <!-- Main Card -->
    <div style="background: ${BRAND_COLORS.card}; border: 1px solid ${BRAND_COLORS.cardBorder}; border-radius: 16px; padding: 40px;">
      <div style="font-size: 48px; text-align: center; margin-bottom: 24px;">🔐</div>
      
      <h1 style="font-size: 24px; font-weight: 700; color: ${BRAND_COLORS.textPrimary}; margin: 0 0 16px 0; text-align: center;">
        Reset Your Password
      </h1>
      
      <p style="color: ${BRAND_COLORS.textSecondary}; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        Click the button below to reset your password. This link expires in 1 hour.
      </p>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${resetUrl}" style="display: inline-block; padding: 16px 32px; background: ${BRAND_GRADIENT}; border-radius: 8px; color: #000; font-size: 16px; font-weight: 600; text-decoration: none;">
          Reset Password
        </a>
      </div>

      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 14px; text-align: center; margin: 0;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid ${BRAND_COLORS.cardBorder};">
      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 13px; margin: 0;">
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

/**
 * Send Intelligence Card notification email
 */
export async function sendIntelligenceCardEmail(email: string, cardData: {
  title: string;
  summary: {
    totalTrends: number;
    topMover: string;
    avgVelocity: number;
  };
  products: Array<{
    name: string;
    velocity: number;
    saturation: number;
    emoji: string;
  }>;
}): Promise<boolean> {
  const dashboardUrl = 'https://trendwatcher.io/dashboard';
  const topProducts = cardData.products.slice(0, 3).map(p => `
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(0, 201, 255, 0.1); border-radius: 8px; margin-bottom: 8px;">
      <span style="font-size: 24px;">${p.emoji}</span>
      <div>
        <div style="font-weight: 600; color: ${BRAND_COLORS.textPrimary};">${p.name}</div>
        <div style="font-size: 13px; color: ${BRAND_COLORS.textSecondary};">
          Velocity: ${p.velocity}% | Saturation: ${p.saturation.toFixed(1)}
        </div>
      </div>
    </div>
  `).join('');

  const subject = `📊 ${cardData.title} - ${cardData.summary.totalTrends} Trends Detected`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background: ${BRAND_COLORS.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px; font-weight: 300; color: ${BRAND_COLORS.textPrimary};">trend</span>
      <span style="font-size: 24px; font-weight: 800; background: ${BRAND_GRADIENT}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">watcher</span>
    </div>

    <!-- Main Card -->
    <div style="background: ${BRAND_COLORS.card}; border: 1px solid ${BRAND_COLORS.cardBorder}; border-radius: 16px; padding: 40px;">
      <div style="font-size: 48px; text-align: center; margin-bottom: 24px;">📊</div>
      
      <h1 style="font-size: 24px; font-weight: 700; color: ${BRAND_COLORS.textPrimary}; margin: 0 0 16px 0; text-align: center;">
        ${cardData.title}
      </h1>
      
      <p style="color: ${BRAND_COLORS.textSecondary}; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        <strong style="color: ${BRAND_COLORS.accent};">${cardData.summary.totalTrends} trends</strong> detected. 
        Top mover: <strong>${cardData.summary.topMover}</strong>
      </p>

      <!-- Top Products -->
      <div style="margin-bottom: 32px;">
        <h3 style="font-size: 16px; font-weight: 600; color: ${BRAND_COLORS.textPrimary}; margin: 0 0 16px 0;">
          🚀 Top Opportunities
        </h3>
        ${topProducts}
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${dashboardUrl}" style="display: inline-block; padding: 16px 32px; background: ${BRAND_GRADIENT}; border-radius: 8px; color: #000; font-size: 16px; font-weight: 600; text-decoration: none;">
          View Full Report
        </a>
      </div>

      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 14px; text-align: center; margin: 0;">
        Avg. Velocity: <strong>${cardData.summary.avgVelocity}%</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid ${BRAND_COLORS.cardBorder};">
      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 13px; margin: 0;">
        © 2026 TrendWatcher. <a href="https://trendwatcher.io/settings" style="color: ${BRAND_COLORS.accent};">Manage notifications</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `${cardData.title}

${cardData.summary.totalTrends} trends detected. Top mover: ${cardData.summary.topMover}

View full report: ${dashboardUrl}

© 2026 TrendWatcher`;

  return await sendEmail(email, subject, html, text);
}

/**
 * Send subscription confirmation email
 */
export async function sendSubscriptionConfirmationEmail(email: string, plan: string): Promise<boolean> {
  const dashboardUrl = 'https://trendwatcher.io/dashboard';
  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();

  const subject = '✅ Welcome to Inner Circle - Your Subscription is Active';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background: ${BRAND_COLORS.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px; font-weight: 300; color: ${BRAND_COLORS.textPrimary};">trend</span>
      <span style="font-size: 24px; font-weight: 800; background: ${BRAND_GRADIENT}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">watcher</span>
    </div>

    <!-- Main Card -->
    <div style="background: ${BRAND_COLORS.card}; border: 1px solid ${BRAND_COLORS.cardBorder}; border-radius: 16px; padding: 40px;">
      <div style="font-size: 48px; text-align: center; margin-bottom: 24px;">✅</div>
      
      <h1 style="font-size: 24px; font-weight: 700; color: ${BRAND_COLORS.textPrimary}; margin: 0 0 16px 0; text-align: center;">
        You're In! Inner Circle Activated
      </h1>
      
      <p style="color: ${BRAND_COLORS.textSecondary}; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        Your subscription is now active. You have full access to:
      </p>

      <ul style="color: ${BRAND_COLORS.textSecondary}; font-size: 15px; line-height: 2; margin: 0 0 32px 0; padding-left: 24px;">
        <li>📈 Daily Intelligence Cards</li>
        <li>🚀 Early Trend Detection</li>
        <li>💰 Saturation Analysis</li>
        <li>📊 Competitor Insights</li>
      </ul>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${dashboardUrl}" style="display: inline-block; padding: 16px 32px; background: ${BRAND_GRADIENT}; border-radius: 8px; color: #000; font-size: 16px; font-weight: 600; text-decoration: none;">
          Access Dashboard
        </a>
      </div>

      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 14px; text-align: center; margin: 0;">
        Next billing date: <strong>${endDate}</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid ${BRAND_COLORS.cardBorder};">
      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 13px; margin: 0;">
        © 2026 TrendWatcher. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `Welcome to Inner Circle!

Your subscription is active. Next billing date: ${endDate}

Access your dashboard: ${dashboardUrl}

© 2026 TrendWatcher`;

  return await sendEmail(email, subject, html, text);
}

/**
 * Send trial ending reminder
 */
export async function sendTrialEndingReminder(email: string, daysLeft: number): Promise<boolean> {
  const pricingUrl = 'https://trendwatcher.io/pricing';

  const subject = `⏰ ${daysLeft} Days Left in Your Trial`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background: ${BRAND_COLORS.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 24px; font-weight: 300; color: ${BRAND_COLORS.textPrimary};">trend</span>
      <span style="font-size: 24px; font-weight: 800; background: ${BRAND_GRADIENT}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">watcher</span>
    </div>

    <!-- Main Card -->
    <div style="background: ${BRAND_COLORS.card}; border: 1px solid ${BRAND_COLORS.cardBorder}; border-radius: 16px; padding: 40px;">
      <div style="font-size: 48px; text-align: center; margin-bottom: 24px;">⏰</div>
      
      <h1 style="font-size: 24px; font-weight: 700; color: ${BRAND_COLORS.textPrimary}; margin: 0 0 16px 0; text-align: center;">
        ${daysLeft} Days Left in Your Trial
      </h1>
      
      <p style="color: ${BRAND_COLORS.textSecondary}; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        Don't lose access to your trends! Upgrade to Inner Circle before your trial ends.
      </p>

      <!-- Stats -->
      <div style="display: flex; gap: 16px; margin-bottom: 32px;">
        <div style="flex: 1; text-align: center; padding: 16px; background: rgba(0, 201, 255, 0.1); border-radius: 8px;">
          <div style="font-size: 24px; font-weight: 700; color: ${BRAND_COLORS.accent};">${daysLeft}</div>
          <div style="font-size: 12px; color: ${BRAND_COLORS.textSecondary};">Days Left</div>
        </div>
        <div style="flex: 1; text-align: center; padding: 16px; background: rgba(146, 254, 157, 0.1); border-radius: 8px;">
          <div style="font-size: 24px; font-weight: 700; color: #92FE9D;">$49</div>
          <div style="font-size: 12px; color: ${BRAND_COLORS.textSecondary};">Per Month</div>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${pricingUrl}" style="display: inline-block; padding: 16px 32px; background: ${BRAND_GRADIENT}; border-radius: 8px; color: #000; font-size: 16px; font-weight: 600; text-decoration: none;">
          Upgrade Now
        </a>
      </div>

      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 14px; text-align: center; margin: 0;">
        Questions? Reply to this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid ${BRAND_COLORS.cardBorder};">
      <p style="color: ${BRAND_COLORS.textMuted}; font-size: 13px; margin: 0;">
        © 2026 TrendWatcher. <a href="https://trendwatcher.io/settings" style="color: ${BRAND_COLORS.accent};">Cancel trial</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `${daysLeft} Days Left in Your Trial!

Don't lose access to your trends. Upgrade to Inner Circle for $49/month.

Upgrade: ${pricingUrl}

© 2026 TrendWatcher`;

  return await sendEmail(email, subject, html, text);
}
