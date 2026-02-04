import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Trend-Watcher',
  description: 'Terms of Service for Trend-Watcher AI-powered trend detection service.',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-[#a1a1aa] mb-8"><strong>Last updated:</strong> February 3, 2026</p>

        <div className="space-y-8 text-[#a1a1aa]">
          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Trend-Watcher (&quot;the Service&quot;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">2. Description of Service</h2>
            <p>Trend-Watcher is an AI-powered trend detection service that identifies emerging trends and products across various platforms. The Service provides analysis, insights, and recommendations based on data gathered from publicly available sources.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You agree to use the Service only for lawful purposes</li>
              <li>You agree not to attempt to gain unauthorized access to any part of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">4. Subscription and Payments</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Some features require a paid subscription</li>
              <li>Subscription fees are billed monthly or annually as selected</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>We reserve the right to modify pricing with 30 days notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">5. Disclaimers</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Service provides trend analysis &quot;as is&quot; without warranties</li>
              <li>We do not guarantee the accuracy or completeness of trend predictions</li>
              <li>Any business decisions made based on our data are at your own risk</li>
              <li>Past trends do not guarantee future performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">6. Limitation of Liability</h2>
            <p>In no event shall Trend-Watcher, its affiliates, or suppliers be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the Service after any changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#fafafa] mb-4">8. Contact Information</h2>
            <p>For questions about these Terms, contact us at:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Email: support@trend-watcher.ai</li>
              <li>Website: https://trend-watcher-web.vercel.app</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
