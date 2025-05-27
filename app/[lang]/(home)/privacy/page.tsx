'use client';
import LinkText from '@/components/common/LinkText';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Property management information</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
                <li>Usage data and platform interactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and improving our services</li>
                <li>Processing your transactions</li>
                <li>Communicating with you about our services</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Protecting against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p>
                We do not sell your personal information to third parties. We may share your 
                information with service providers who assist in our operations, subject to 
                confidentiality agreements. We may also share information when required by law 
                or to protect our rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your 
                personal information. However, no method of transmission over the Internet or 
                electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your 
                browsing activities. You can control cookies through your browser settings, but 
                disabling them may limit some features of our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect 
                personal information from children under 13. If you become aware that a child 
                has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the `&quot;Last Updated`&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@example.com" className="text-blue-600 hover:text-blue-800">
                  privacy@example.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <div className="mt-4 space-x-4">
              <LinkText
                href="/"
                text="Back to Home"
                className="text-blue-600 hover:text-blue-800 font-medium"
              />
              <LinkText
                href="/terms"
                text="Terms of Service"
                className="text-blue-600 hover:text-blue-800 font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}