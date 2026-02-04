import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | TrendWatcher',
  description: 'Privacy Policy for TrendWatcher AI-powered trend detection service.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-[#a1a1aa] mb-8"><strong>Last updated:</strong> February 3, 2026</p>

        <div className="space-y-8 text-[#a1a1aa]">
          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">1. Information We Collect</h2>
            <h3 className="text-lg font-medium text-[#fafafa] mb-2">Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Account information (email, name, payment details)</li>
              <li>Subscription preferences</li>
              <li>Any communications with our support team</li>
            </ul>
            <h3 className="text-lg font-medium text-[#fafafa] mb-2">Information Automatically Collected</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Usage data and analytics</li>
              <li>IP address and browser type</li>
              <li>Pages visited and time spent on Service</li>
              <li>Device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our Services</li>
              <li>Process payments and subscriptions</li>
              <li>Send updates and marketing communications</li>
              <li>Analyze usage patterns and trends</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">3. Data Sharing</h2>
            <p className="mb-4">We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers (hosting, payment processing)</li>
              <li>Analytics partners (Google Analytics)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">4. Cookies and Tracking</h2>
            <p className="mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your preferences</li>
              <li>Analyze traffic patterns</li>
              <li>Improve user experience</li>
              <li>You can disable cookies in your browser settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data (in portable format)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">7. Data Retention</h2>
            <p>We retain your personal data as long as your account is active or as needed to provide Services. Some data may be retained for legal or legitimate business purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">8. Children&apos;s Privacy</h2>
            <p>Our Service is not intended for users under 13 years of age. We do not knowingly collect personal information from children.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">9. Changes to Privacy Policy</h2>
            <p>We may update this policy periodically. We will notify users of material changes via email or through the Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">10. Contact Us</h2>
            <p className="mb-4">For privacy-related questions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: privacy@trend-watcher.ai</li>
              <li>Website: https://trend-watcher-web.vercel.app</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">11. Third-Party Services</h2>
            <p>Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
