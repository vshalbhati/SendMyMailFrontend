import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      
      <p className="mission">Our mission: Simplifying cold emailing for everyone, one click at a time.</p>
      
      <p>At sudi, we're a team of passionate tech enthusiasts who recognized a common challenge in the business world: the complexity and time-consuming nature of cold emailing. We set out to create a solution that would make cold emailing accessible, efficient, and effective for individuals and businesses of all sizes.</p>
      
      <p>Founded in 2024, our journey began when we realized that many great ideas and opportunities were being lost simply because reaching out to potential clients or partners seemed too daunting. We believed that with the right tools, anyone could harness the power of cold emailing to grow their network, business, or career.</p>
      
      <h2>Our Team</h2>
      
      <div className="team-member">
        <h3>Vishal Bhati</h3>
        <p>Founder</p>
        <p>Vishal is the coding wizard behind our intuitive user interface and robust backend systems. With a background in software engineering and a knack for user-centric design, Vishal ensures that sudi is both powerful and user-friendly.</p>
      </div>
      
      {/* <div className="team-member">
        <h3>Sarah Johnson</h3>
        <p>Co-founder & Marketing Strategist</p>
        <p>Sarah brings her expertise in digital marketing and communication to the team. She's dedicated to helping our users craft compelling email campaigns and understand the nuances of effective cold outreach.</p>
      </div> */}
      
      <p>Our diverse team also includes experts in data security, customer support, and business development. Together, we're committed to continuously improving sudi to meet the evolving needs of our users.</p>
      
      <h2>Our Approach</h2>
      
      <p>We believe in the power of meaningful connections. Our platform is designed not just to send emails, but to help you build relationships. We emphasize quality over quantity, providing tools and insights to help you personalize your outreach and increase your success rate.</p>
      
      <p>As we continue to grow and evolve, we remain true to our core values:</p>
      <ul>
        <li>User-Centric Design: Every feature we develop is with you, our user, in mind.</li>
        <li>Ethical Practices: We promote responsible email practices and respect for privacy.</li>
        <li>Continuous Improvement: We're always learning and updating our platform based on user feedback and industry trends.</li>
        <li>Empowerment: We aim to empower individuals and businesses to reach their full potential through effective communication.</li>
      </ul>
      
      <p>Thank you for choosing sudi. We're excited to be part of your journey to more effective outreach and successful connections!</p>
    </div>
  );
}

export default AboutUs;