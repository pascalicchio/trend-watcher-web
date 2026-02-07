#!/usr/bin/env node

/**
 * Test email sending via Brevo SMTP
 */

require('dotenv').config();

const nodemailer = require('nodemailer');

const BREVO_SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
const BREVO_SMTP_PORT = parseInt(process.env.BREVO_SMTP_PORT || '587');
const BREVO_SMTP_USER = process.env.BREVO_SMTP_USER;
const BREVO_SMTP_PASS = process.env.BREVO_SMTP_PASS;
const BREVO_FROM_EMAIL = process.env.BREVO_FROM_EMAIL || 'alerts@trendwatcher.io';

async function sendTestEmail() {
  if (!BREVO_SMTP_USER || !BREVO_SMTP_PASS) {
    console.error('❌ SMTP credentials not configured');
    console.log('Required: BREVO_SMTP_USER, BREVO_SMTP_PASS');
    process.exit(1);
  }

  console.log('🧪 Testing Brevo SMTP connection...');
  console.log(`Host: ${BREVO_SMTP_HOST}:${BREVO_SMTP_PORT}`);
  console.log(`User: ${BREVO_SMTP_USER}`);

  const transporter = nodemailer.createTransport({
    host: BREVO_SMTP_HOST,
    port: BREVO_SMTP_PORT,
    secure: BREVO_SMTP_PORT === 465,
    auth: {
      user: BREVO_SMTP_USER,
      pass: BREVO_SMTP_PASS
    }
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified!');

    // Send test email
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail({
      from: `"TrendWatcher" <${BREVO_FROM_EMAIL}>`,
      to: 'wakingupinmatrix@gmail.com',
      subject: '🧪 Test Email from TrendWatcher',
      html: `
        <h1>✅ Email Test Successful!</h1>
        <p>Your Brevo SMTP connection is working.</p>
        <p>This is a test email from TrendWatcher.</p>
        <hr>
        <p><small>Sent at: ${new Date().toISOString()}</small></p>
      `,
      text: `Email test successful! Sent at: ${new Date().toISOString()}`
    });

    console.log('✅ Email sent!');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`To: wakingupinmatrix@gmail.com`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

sendTestEmail();
