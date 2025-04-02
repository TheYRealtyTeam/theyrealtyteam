
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimationObserver from '@/utils/AnimationObserver';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    document.title = "Blog Post | Y Realty Team";
    window.scrollTo(0, 0);
  }, []);

  // This would normally come from a database or API
  const blogPost = {
    title: '5 Ways to Maximize Your Rental Property ROI',
    date: 'June 15, 2023',
    author: 'Sarah Johnson',
    authorRole: 'Investment Specialist',
    category: 'Investment',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=80',
    content: `
      <p>Real estate has long been considered one of the most reliable investment vehicles, and rental properties in particular offer a unique combination of steady cash flow and long-term appreciation potential. However, simply owning a rental property doesn't guarantee strong returns. To truly maximize your rental property ROI (Return on Investment), strategic management and informed decision-making are essential.</p>
      
      <h2>1. Strategic Pricing</h2>
      <p>Setting the right rental price is perhaps the most immediate factor affecting your ROI. Price too high, and you risk extended vacancy periods; price too low, and you're leaving money on the table. Professional property managers conduct thorough market analyses, considering factors such as:</p>
      <ul>
        <li>Comparable properties in the area</li>
        <li>Property size, condition, and amenities</li>
        <li>Local market trends and seasonal fluctuations</li>
        <li>Neighborhood desirability and amenities</li>
      </ul>
      <p>Regularly reassessing your rental rates—especially at lease renewal time—ensures you're maximizing income while remaining competitive.</p>
      
      <h2>2. Minimize Vacancy Periods</h2>
      <p>Every day your property sits vacant is a day of lost income that can never be recovered. Proactive tenant retention strategies and efficient turnover processes are crucial for maintaining consistent cash flow. Consider these approaches:</p>
      <ul>
        <li>Begin marketing as soon as you receive notice from an outgoing tenant</li>
        <li>Implement tenant retention programs that reward lease renewals</li>
        <li>Maintain positive landlord-tenant relationships through responsive management</li>
        <li>Schedule turnover work efficiently to minimize downtime between tenants</li>
        <li>Consider short-term rental options during traditionally slow rental seasons</li>
      </ul>
      
      <h2>3. Preventative Maintenance</h2>
      <p>While it might seem counterintuitive to spend money to save money, preventative maintenance is one of the smartest investments you can make in your rental property. Regular inspections and timely repairs help you:</p>
      <ul>
        <li>Avoid costly emergency repairs that typically cost 3-9 times more than scheduled maintenance</li>
        <li>Extend the lifespan of major systems and appliances</li>
        <li>Maintain property value and appeal to quality tenants</li>
        <li>Identify small issues before they become major problems</li>
      </ul>
      <p>A systematic approach to property maintenance not only reduces costs over time but also helps maintain tenant satisfaction and property value.</p>
      
      <h2>4. Strategic Improvements</h2>
      <p>Not all property improvements deliver equal returns. The key is identifying upgrades that will either command higher rent, attract better tenants, or reduce operating costs. High-ROI improvements often include:</p>
      <ul>
        <li>Kitchen and bathroom updates (often returning 70-80% of investment through increased rent)</li>
        <li>Energy-efficient appliances and systems that reduce utility costs</li>
        <li>Curb appeal enhancements that make a strong first impression</li>
        <li>Durable, low-maintenance flooring and fixtures that reduce replacement frequency</li>
      </ul>
      <p>Before undertaking any significant improvement project, calculate the expected ROI by estimating the potential rent increase against the investment cost.</p>
      
      <h2>5. Professional Property Management</h2>
      <p>For many property owners, especially those with multiple properties or those living far from their investments, professional property management can significantly boost ROI despite the management fees. A quality property management company brings:</p>
      <ul>
        <li>Market expertise for optimal pricing strategy</li>
        <li>Tenant screening processes that reduce problematic tenancies</li>
        <li>Established vendor relationships for cost-effective maintenance</li>
        <li>Legal compliance expertise that minimizes risk exposure</li>
        <li>Systematic processes that maximize efficiency and minimize vacancies</li>
      </ul>
      <p>When evaluating whether professional management makes financial sense for your situation, consider not just the fee percentage but the comprehensive value offered through reduced vacancies, better tenant quality, maintenance savings, and time saved.</p>
      
      <h2>Conclusion</h2>
      <p>Maximizing rental property ROI requires a multi-faceted approach that balances short-term cash flow with long-term asset appreciation. By implementing these five strategies—strategic pricing, vacancy minimization, preventative maintenance, targeted improvements, and considering professional management—property owners can significantly enhance their returns while building sustainable wealth through real estate.</p>
      <p>At Y Realty Team, we specialize in helping property owners implement these exact strategies across their investment portfolios. Contact us today to discuss how we can help optimize your rental property performance.</p>
    `
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="pt-24 pb-6 bg-yrealty-blue">
          <div className="container-custom">
            <Link to="/blog" className="inline-flex items-center text-yrealty-navy hover:underline mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
        
        <article className="bg-white pb-16">
          <div className="container-custom max-w-4xl">
            <img 
              src={blogPost.image} 
              alt={blogPost.title} 
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-md mb-8" 
            />
            
            <div className="mb-8">
              <div className="text-sm text-gray-500 mb-2">{blogPost.date} | {blogPost.category}</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yrealty-navy">{blogPost.title}</h1>
              
              <div className="flex items-center mb-6 border-b border-gray-200 pb-6">
                <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center text-gray-700 font-bold text-lg mr-4">
                  {blogPost.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium">{blogPost.author}</div>
                  <div className="text-sm text-gray-500">{blogPost.authorRole}</div>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }}>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mt-12">
              <h3 className="text-xl font-bold mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <button className="p-2 bg-[#1877F2] text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                  </svg>
                </button>
                <button className="p-2 bg-[#1DA1F2] text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 5.89443C21.2642 6.21524 20.4733 6.43192 19.643 6.52901C20.4904 6.03361 21.1411 5.24942 21.4475 4.30483C20.6547 4.76798 19.7765 5.10193 18.8419 5.28408C18.0931 4.5083 17.0277 4.03601 15.8469 4.03601C13.5807 4.03601 11.7432 5.87276 11.7432 8.13855C11.7432 8.45936 11.7795 8.77094 11.8484 9.06949C8.43958 8.89812 5.41608 7.26686 3.39188 4.83035C3.03834 5.44029 2.83759 6.13361 2.83759 6.87205C2.83759 8.27138 3.56125 9.51702 4.66241 10.2324C3.99008 10.2115 3.35719 10.0349 2.80418 9.74553C2.80336 9.76248 2.80336 9.77943 2.80336 9.79638C2.80336 11.7835 4.21805 13.4392 6.09513 13.8173C5.75048 13.91 5.38809 13.9589 5.01374 13.9589C4.74986 13.9589 4.49224 13.9328 4.24057 13.8847C4.76438 15.5128 6.27889 16.6801 8.07405 16.7127C6.67036 17.7931 4.90098 18.4307 2.97878 18.4307C2.64773 18.4307 2.32075 18.4105 2 18.3718C3.81563 19.5192 5.97379 20.1832 8.28986 20.1832C15.8371 20.1832 19.9639 14.0251 19.9639 8.66038C19.9639 8.48497 19.9598 8.3104 19.9515 8.13667C20.7542 7.57193 21.4492 6.86217 22 6.04889"></path>
                  </svg>
                </button>
                <button className="p-2 bg-[#0077b5] text-white rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.94048 4.99999C6.94011 5.81424 6.44608 6.54702 5.69134 6.84953C4.9366 7.15204 4.07187 6.97253 3.5049 6.40506C2.93793 5.83759 2.75905 4.97263 3.06199 4.21807C3.36493 3.46351 4.09792 2.97007 4.91218 2.97038C6.05353 2.97104 6.94037 3.85788 6.94048 4.99999ZM7.00048 8.47999H3.00048V21H7.00048V8.47999ZM13.3205 8.47999H9.34048V21H13.2805V14.43C13.2805 10.77 18.0505 10.43 18.0505 14.43V21H22.0005V13.07C22.0005 6.90999 14.9405 7.13999 13.2805 10.16L13.3205 8.47999Z"></path>
                  </svg>
                </button>
                <button className="p-2 bg-gray-200 text-gray-700 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <AnimationObserver />
    </div>
  );
};

export default BlogPost;
