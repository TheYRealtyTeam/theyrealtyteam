
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone } from 'lucide-react';
import { useSimpleNavigation } from '@/hooks/useSimpleNavigation';

const FAQ = () => {
  const { navigateToPage } = useSimpleNavigation();

  const handleContactClick = () => {
    navigateToPage('/contact');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:(845)734-3331';
  };

  const faqs = [
    {
      id: '1',
      question: 'What states do you provide property management services in?',
      answer: 'We provide property management services in all 50 states. Our nationwide network allows us to offer consistent, high-quality service regardless of your property location.'
    },
    {
      id: '2',
      question: 'What are your management fees?',
      answer: 'Our management fees vary based on property type and services required. We offer transparent, competitive pricing with no hidden fees. Contact us for a personalized quote based on your specific needs.'
    },
    {
      id: '3',
      question: 'How do you screen tenants?',
      answer: 'We conduct comprehensive tenant screening including credit checks, employment verification, rental history verification, and background checks. Our thorough process helps ensure reliable, qualified tenants for your property.'
    },
    {
      id: '4',
      question: 'How quickly can you place a tenant in my property?',
      answer: 'On average, we place qualified tenants within 30-45 days of taking over management. This timeframe can vary based on local market conditions, property condition, and rental pricing.'
    },
    {
      id: '5',
      question: 'Do you handle maintenance and repairs?',
      answer: 'Yes, we coordinate all maintenance and repairs using our network of licensed, insured contractors. We handle everything from routine maintenance to emergency repairs, keeping you informed throughout the process.'
    },
    {
      id: '6',
      question: 'How do I receive rental payments?',
      answer: 'Rental payments are collected electronically and transferred to your account via direct deposit. You receive detailed monthly statements showing all income and expenses for your property.'
    },
    {
      id: '7',
      question: 'What happens if a tenant stops paying rent?',
      answer: 'We follow a systematic approach including late notices, communication with tenants, and if necessary, initiation of the eviction process in accordance with local laws. We work to resolve payment issues quickly and professionally.'
    },
    {
      id: '8',
      question: 'Can I see reports on my property performance?',
      answer: 'Yes, you receive monthly financial statements and can access an online portal to view real-time information about your property, including rental payments, maintenance requests, and financial performance.'
    },
    {
      id: '9',
      question: 'Do you provide 24/7 emergency support?',
      answer: 'Yes, we offer 24/7 emergency maintenance support for urgent issues like plumbing leaks, heating failures, or security concerns. Tenants can reach our emergency line anytime.'
    },
    {
      id: '10',
      question: 'What happens when my lease expires?',
      answer: 'We proactively manage lease renewals, including market rent analysis and tenant communication. We work to retain good tenants when possible and efficiently transition to new tenants when needed.'
    }
  ];

  return (
    <PageLayout 
      title="Frequently Asked Questions"
      description="Find answers to common questions about Y Realty Team property management services, fees, tenant screening, and more."
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yrealty-navy mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Get answers to the most common questions about our property management services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-yrealty-navy hover:text-yrealty-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-yrealty-navy to-yrealty-accent rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our team is here to help with any additional questions you may have
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContactClick}
              className="bg-white text-yrealty-navy hover:bg-gray-100 font-semibold flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Contact Us
            </Button>
            <Button 
              onClick={handleCallClick}
              variant="outline" 
              className="border-white text-white hover:bg-white/20 font-semibold flex items-center gap-2"
            >
              <Phone className="h-5 w-5" />
              Call (845) 734-3331
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;
