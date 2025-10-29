import { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout
      title="Terms of Service"
      subtitle="Terms and conditions for using our services"
      metaDescription="Terms of Service for Y Realty Team. Read our terms and conditions for property management services."
    >
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> January 29, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using the Y Realty Team website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">2. Services</h2>
            <p className="text-gray-700 mb-4">
              Y Realty Team provides property management services including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Residential and commercial property management</li>
              <li>Tenant screening and placement</li>
              <li>Property maintenance coordination</li>
              <li>Financial reporting and rent collection</li>
              <li>Property marketing and listing services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use our services for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">4. Property Listings</h2>
            <p className="text-gray-700">
              Property listings on our website are subject to availability and may be updated or removed without notice. We strive to maintain accurate information but do not guarantee the accuracy of all listing details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on this website, including text, graphics, logos, images, and software, is the property of Y Realty Team and is protected by copyright and intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700">
              Y Realty Team shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or inability to use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">7. Modifications</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services constitutes acceptance of any modifications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">8. Governing Law</h2>
            <p className="text-gray-700">
              These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yrealty-navy mb-4">9. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us at:
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

export default Terms;
