'use client';
import LinkText from '@/components/common/LinkText';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this platform, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p>
                Our platform provides property management tools and services for landlords and property managers. 
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and 
                for all activities that occur under your account. You must immediately notify us of any 
                unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Obligations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect the privacy and rights of other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Payment Terms</h2>
              <p>
                Users agree to pay all fees and charges associated with their account on time. 
                Subscription fees are billed in advance on a monthly or annual basis. All payments 
                are non-refundable unless otherwise specified.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Privacy</h2>
              <p>
                We collect and process personal data in accordance with our Privacy Policy. 
                By using our services, you consent to such processing and warrant that all 
                data provided by you is accurate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p>
                Our platform is provided `&quot;as is`&quot; without any warranties. We shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages resulting 
                from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes via email or through our platform. Continued use of our services 
                following such changes constitutes acceptance of the modified terms.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <div className="mt-4">
              <LinkText
                href="/"
              >
                Back to Home
              </LinkText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}