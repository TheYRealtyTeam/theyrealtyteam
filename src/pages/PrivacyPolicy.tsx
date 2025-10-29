import { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="Your privacy is important to us"
      metaDescription="Privacy policy for Y Realty Team. Learn how we collect, use, and protect your personal information."
    >
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> January 29, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Property information and preferences</li>
              <li>Messages and inquiries you send to us</li>
              <li>Appointment scheduling information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Respond to your inquiries and requests</li>
              <li>Schedule and manage property viewings</li>
              <li>Provide property management services</li>
              <li>Send you relevant updates about our services</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and property</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">4. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">6. Cookies</h2>
            <p className="text-gray-700">
              We use cookies and similar technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">7. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 mt-4">
              <strong>Email:</strong> <a href="mailto:info@theYteam.co" className="text-yrealty-blue hover:underline">info@theYteam.co</a><br />
              <strong>Phone:</strong> (845) 734-3331
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
