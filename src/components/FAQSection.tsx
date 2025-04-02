
import React from 'react';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion';

const FAQSection = () => {
  const faqCategories = [
    {
      id: "property-owners",
      title: "For Property Owners",
      faqs: [
        {
          question: "What services does Y Realty Team offer to property owners?",
          answer: "We offer comprehensive property management services including tenant placement, rent collection, property maintenance, financial reporting, regular inspections, and 24/6 emergency support. Our goal is to maximize your property's ROI while minimizing your personal involvement."
        },
        {
          question: "How do you screen potential tenants?",
          answer: "Our tenant screening process is thorough and includes background checks, credit reports, employment verification, income validation, rental history, and reference checks. We ensure only qualified tenants are placed in your property."
        },
        {
          question: "How do you handle maintenance and repairs?",
          answer: "We have a network of licensed, insured, and vetted contractors who provide quality service at competitive rates. For routine maintenance, we handle everything without bothering you. For larger repairs, we seek your approval before proceeding, unless it's an emergency situation."
        },
        {
          question: "What are your management fees?",
          answer: "Our fee structure is transparent and competitive. We typically charge a percentage of the monthly rent collected, plus leasing fees for new tenant placement. Please contact us for a customized quote based on your specific property and needs."
        },
        {
          question: "How often will I receive statements and payments?",
          answer: "Property owners receive detailed monthly statements showing all income and expenses. Payments are typically disbursed by the 15th of each month via direct deposit to your designated account."
        }
      ]
    },
    {
      id: "tenants",
      title: "For Tenants",
      faqs: [
        {
          question: "How do I apply for a rental property?",
          answer: "You can apply online through our website or contact our office for assistance. The application process includes background and credit checks, employment verification, and rental history review."
        },
        {
          question: "How do I report maintenance issues?",
          answer: "Maintenance requests can be submitted through our tenant portal, by email, or by phone for urgent matters. Our maintenance team responds quickly to address your concerns."
        },
        {
          question: "What is your pet policy?",
          answer: "Pet policies vary by property and owner preferences. Many properties do accept pets with additional pet deposits or fees. Service animals are accommodated according to fair housing laws."
        },
        {
          question: "How do I pay my rent?",
          answer: "We offer multiple convenient payment methods including online payments through our tenant portal, bank transfers, and check payments. We encourage setting up automatic payments for convenience and to avoid late fees."
        },
        {
          question: "What happens when my lease is ending?",
          answer: "We'll contact you approximately 60 days before your lease ends to discuss renewal options. If you plan to move out, we'll provide clear instructions for the move-out process and security deposit return."
        }
      ]
    },
    {
      id: "investors",
      title: "For Real Estate Investors",
      faqs: [
        {
          question: "Can you help me identify good investment properties?",
          answer: "Yes, our team has extensive knowledge of local real estate markets and can help you identify properties with good investment potential based on your financial goals and risk tolerance."
        },
        {
          question: "Do you work with out-of-state property owners?",
          answer: "Absolutely! Many of our clients are out-of-state or even international investors. Our comprehensive management services allow you to invest in real estate markets nationwide without needing to be physically present."
        },
        {
          question: "What's your average property vacancy rate?",
          answer: "Our properties typically experience vacancy rates significantly below market averages thanks to our proactive marketing, competitive pricing strategies, and high tenant retention rates."
        },
        {
          question: "How do you determine optimal rental rates?",
          answer: "We conduct thorough market analyses to determine competitive rental rates that maximize your income while minimizing vacancy periods. Our pricing strategy considers property features, location, market trends, and seasonal factors."
        },
        {
          question: "What makes your property management services different from others?",
          answer: "We distinguish ourselves through personalized service, transparent communication, proactive maintenance, rigorous tenant screening, and leveraging technology to streamline operations and provide real-time information to property owners."
        }
      ]
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12">
          {faqCategories.map((category) => (
            <div key={category.id} className="reveal">
              <h2 className="text-2xl font-bold mb-6 text-yrealty-navy border-b pb-2">{category.title}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`${category.id}-item-${index}`} className="border rounded-lg p-1">
                    <AccordionTrigger className="px-4 text-left font-medium text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
