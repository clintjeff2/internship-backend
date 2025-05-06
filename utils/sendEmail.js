const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the email transporter
exports.transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	secure: process.env.EMAIL_SECURE === 'true',
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

// Create HTML email template
// exports.createWelcomeEmailHTML = (username) => {
// 	return `
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Welcome to Our LandmarkTech!</title>
//     <style>
//       body {
//         font-family: Arial, sans-serif;
//         line-height: 1.6;
//         color: #333333;
//         margin: 0;
//         padding: 0;
//       }
//       .container {
//         max-width: 600px;
//         margin: 0 auto;
//         padding: 20px;
//       }
//       .header {
//         background-color: #4285f4;
//         color: white;
//         padding: 20px;
//         text-align: center;
//       }
//       .content {
//         padding: 20px;
//       }
//       .footer {
//         background-color: #f5f5f5;
//         padding: 15px;
//         text-align: center;
//         font-size: 12px;
//         color: #666666;
//       }
//       .button {
//         display: inline-block;
//         background-color: #4285f4;
//         color: white;
//         text-decoration: none;
//         padding: 10px 20px;
//         border-radius: 4px;
//         margin-top: 15px;
//       }
//       .social-links {
//         margin-top: 15px;
//       }
//       .social-links a {
//         margin: 0 10px;
//         text-decoration: none;
//         color: #4285f4;
//       }
//     </style>
//   </head>
//   <body>
//     <div class="container">
//       <div class="header">
//         <h1>Welcome to Landmark Technologies!</h1>
//       </div>
//       <div class="content">
//         <h2>Hello ${username || 'there'},</h2>
//         <p>We're thrilled to welcome you to our community! Thank you for joining us.</p>
        
//         <h3>About Our Product</h3>
//         <p>Our platform provides innovative solutions designed to simplify your workflow and boost productivity. With our suite of tools, you'll be able to:</p>
//         <ul>
//           <li>Streamline your daily tasks</li>
//           <li>Collaborate seamlessly with your team</li>
//           <li>Access powerful analytics for better decision making</li>
//           <li>Enjoy secure, reliable service with 24/7 support</li>
//         </ul>
        
//         <p>To get started, check out our quick start guide or explore our features dashboard.</p>
//         <a href="#" class="button">Explore Dashboard</a>
        
//         <h3>Need Help?</h3>
//         <p>Our support team is always ready to assist you:</p>
//         <ul>
//           <li>Email: <a href="mailto:landmarktechcrm@gmail.com">landmarktechcrm@gmail.com</a></li>
//           <li>Phone: +237 6 73 98 15 95 | +237 6 54 55 89 34</li>
//           <li>Live Chat: Available on WhatsApp and Telegram via the numbers above from 8am - 9pm.</li>
//         </ul>
        
//         <div class="social-links">
//           <p>Follow us for updates:</p>
//           <a href="#">Twitter</a> | 
//           <a href="#">Facebook</a> | 
//           <a href="#">LinkedIn</a> | 
//           <a href="#">Instagram</a>
//         </div>
//       </div>
//       <div class="footer">
//         <p>© 2025 Landmark Technologies. All rights reserved.</p>
//         <p>Tarred Malingo | JRA, Buea, Southwest, 00237</p>
//         <p><small>If you received this email by mistake, please disregard it.</small></p>
//       </div>
//     </div>
//   </body>
//   </html>
//   `;
// };

exports.createWelcomeEmailHTML = (studentName, courseName) => {
  // Determine course-specific content
  let courseDescription = '';
  let courseDuration = '';
  let courseHighlights = '';
  
  switch(courseName) {
    case 'Back-End Development':
      courseDescription = "Behind every sleek interface lies a robust engine. In this 4-month immersion, you'll wield Node.js and Express.js to craft secure, scalable server-side systems—turning raw data into dynamic APIs that fuel modern applications across industries.";
      courseDuration = '4 Months';
      courseHighlights = `
        <li>API Mastery with Node.js and Express.js</li>
        <li>Database Wizardry with MongoDB and MySQL</li>
        <li>Scalable Foundations and Microservices Architecture</li>
        <li>Security Best Practices and Encryption Protocols</li>
      `;
      break;
    case 'Full-Stack Development':
      courseDescription = 'Become the complete creator. In 7 months, master the MERN stack to craft full web solutions—from pixel-perfect front-ends to robust back-ends—delivering apps that scale and shine with CI/CD precision.';
      courseDuration = '7 Months';
      courseHighlights = `
        <li>MERN Stack Mastery (MongoDB, Express, React, Node)</li>
        <li>Deployment Expertise with AWS and Docker</li>
        <li>Agile Workflow Implementation</li>
        <li>End-to-End Project Ownership</li>
      `;
      break;
    case 'Build & Release Engineering (CI/CD)':
      courseDescription = 'In 4 months, become the maestro of CI/CD pipelines. Master Jenkins, Terraform, and AWS tools to automate software releases—ensuring flawless deployments that keep dev teams humming.';
      courseDuration = '4 Months';
      courseHighlights = `
        <li>Pipeline Precision with Jenkins/GitLab CI</li>
        <li>Infrastructure as Code with Terraform</li>
        <li>Cloud DevOps on AWS</li>
        <li>Reliability Engineering for 99.99% uptime</li>
      `;
      break;
    case 'Cloud Computing Essentials':
      courseDescription = 'In just 2 months, grasp the essentials of AWS and Azure. Deploy basic infrastructure and manage costs—building the foundation for a cloud-powered career.';
      courseDuration = '2 Months';
      courseHighlights = `
        <li>Cloud Basics on AWS and Azure</li>
        <li>Virtualization 101 and Resource Optimization</li>
        <li>Security Essentials with IAM Policies</li>
        <li>Deployment Readiness with 99.9% Availability</li>
      `;
      break;
    case 'Cloud Solutions Architecture':
      courseDescription = "In 4 months, design bulletproof cloud systems with AWS and Azure. From disaster recovery to multi-cloud strategies, you'll craft architectures that power global enterprises.";
      courseDuration = '4 Months';
      courseHighlights = `
        <li>Advanced Cloud Design with Lambda and ECS</li>
        <li>Resilience Engineering and Compliance</li>
        <li>Multi-Cloud Strategy Implementation</li>
        <li>Leadership Skills for C-suite Communication</li>
      `;
      break;
    case 'Containerization & Orchestration':
      courseDescription = "In 4 months, harness Docker and Kubernetes to deploy scalable, cloud-native systems. From container basics to cluster orchestration, you'll manage apps that thrive under pressure.";
      courseDuration = '4 Months';
      courseHighlights = `
        <li>Container Mastery with Docker</li>
        <li>Kubernetes Orchestration Expertise</li>
        <li>Cloud-Native Design Principles</li>
        <li>Advanced Troubleshooting Techniques</li>
      `;
      break;
    case 'Cross-Platform Development':
      courseDescription = 'In 4 months, master WinDev to build apps for desktop, web, and mobile—fast. Leverage low-code RAD tools to ship multi-platform solutions with lightning speed.';
      courseDuration = '4 Months';
      courseHighlights = `
        <li>Multi-Platform Coding for Desktop and Web</li>
        <li>Mobile Excellence on iOS/Android</li>
        <li>Low-Code Efficiency with RAD Methodology</li>
        <li>Rapid Prototyping for Fast MVPs</li>
      `;
      break;
    case 'Data Analysis with Python':
      courseDescription = 'In 3 months, wield Python to transform raw data into insights. Master Pandas, NumPy, and visualization—unlocking the power of stats for real-world decisions.';
      courseDuration = '3 Months';
      courseHighlights = `
        <li>Data Wrangling with Pandas</li>
        <li>Visualization Artistry with Matplotlib/Seaborn</li>
        <li>Statistical Insight with NumPy</li>
        <li>Actionable Outcomes from Data</li>
      `;
      break;
    case 'Python Programming Masterclass':
      courseDescription = 'In 4 months, conquer Python from syntax to systems. Build APIs with Flask/Django and automate workflows—unlocking a world of software possibilities.';
      courseDuration = '4 Months';
      courseHighlights = `
        <li>Advanced Coding with OOP</li>
        <li>API Development with Flask/Django</li>
        <li>Automation for Workflow Efficiency</li>
        <li>Complex Problem Solving with Modular Design</li>
      `;
      break;
    case 'Business Intelligence & Data Visualization':
      courseDescription = 'In 3 months, master Power BI and Tableau to craft stunning dashboards. Turn SQL data into visual stories that drive business success.';
      courseDuration = '3 Months';
      courseHighlights = `
        <li>Dashboard Design with Power BI and DAX</li>
        <li>SQL Analytics for Fast Reporting</li>
        <li>Data Storytelling Mastery</li>
        <li>BI Tools Optimization</li>
      `;
      break;
    case 'Agile Coach (Scrum & Kanban)':
      courseDescription = 'Guide teams to greatness. This 4-month program (with a 1-month internship) trains you in Scrum and Kanban—mastering Jira, sprints, and metrics to optimize IT delivery and spark transformation.';
      courseDuration = '4 Months + 1 Month Internship';
      courseHighlights = `
        <li>Scrum Leadership and Sprint Management</li>
        <li>Kanban Flow Optimization</li>
        <li>Jira and DevOps Tool Expertise</li>
        <li>Agile Transformation Leadership</li>
      `;
      break;
    default:
      courseDescription = 'Welcome to your professional tech journey with Landmark Technologies in Buea. Our cutting-edge program will equip you with in-demand skills for the global market.';
      courseDuration = '';
      courseHighlights = `
        <li>Hands-on Project Experience</li>
        <li>Industry-Recognized Certification</li>
        <li>Mentorship from Global Tech Professionals</li>
        <li>Internship Opportunities with Canadian Partners</li>
      `;
  }

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Landmark Technologies!</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 0;
      }
      .header {
        background-color: #1a5276;
        color: white;
        padding: 30px 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
      }
      .header p {
        margin: 10px 0 0;
        font-size: 16px;
        opacity: 0.9;
      }
      .content {
        padding: 30px 20px;
        background-color: #ffffff;
      }
      .course-card {
        background-color: #f7f9fa;
        border-left: 4px solid #1a5276;
        padding: 15px;
        margin: 20px 0;
      }
      .course-title {
        color: #1a5276;
        margin-top: 0;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .duration-badge {
        background-color: #1a5276;
        color: white;
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 12px;
      }
      .next-steps {
        background-color: #e8f4f8;
        padding: 20px;
        margin: 20px 0;
        border-radius: 4px;
      }
      .next-steps h3 {
        margin-top: 0;
        color: #1a5276;
      }
      .next-steps ol {
        padding-left: 20px;
      }
      .next-steps li {
        margin-bottom: 10px;
      }
      .footer {
        background-color: #1a5276;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: white;
      }
      .social-links {
        margin: 15px 0;
      }
      .social-links a {
        margin: 0 10px;
        text-decoration: none;
        color: white;
      }
      .contact-info {
        margin-top: 15px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
      }
      .button {
        display: inline-block;
        background-color: #1a5276;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 4px;
        font-weight: bold;
        margin-top: 15px;
      }
      .signature {
        margin-top: 30px;
        font-style: italic;
      }
      h2 {
        color: #1a5276;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 10px;
        margin-top: 30px;
      }
      ul {
        padding-left: 20px;
      }
      ul li {
        margin-bottom: 8px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome to Landmark Technologies!</h1>
        <p>Your Journey to Tech Excellence Begins Today</p>
      </div>
      <div class="content">
        <h2>Hello ${studentName || 'Future Tech Leader'},</h2>
        <p>Congratulations on taking the first step towards transforming your career with Landmark Technologies! We're thrilled to welcome you to our community of innovators, problem-solvers, and future tech leaders.</p>
        
        <div class="course-card">
          <h3 class="course-title">${courseName} <span class="duration-badge">${courseDuration}</span></h3>
          <p>${courseDescription}</p>
          <h4>What You'll Master:</h4>
          <ul>
            ${courseHighlights}
          </ul>
        </div>
        
        <h2>Why Landmark Technologies?</h2>
        <p>Based in Buea – Cameroon's Tech Epicenter – Landmark Technologies offers a unique blend of:</p>
        <ul>
          <li><strong>Globally Recognized Certification</strong> that gives you a competitive edge in the job market</li>
          <li><strong>Strategic Canadian Partnerships</strong> providing real-world project experience and international exposure</li>
          <li><strong>Hybrid Learning Model</strong> combining hands-on labs with flexible online resources</li>
          <li><strong>"Code for Impact" Guarantee</strong> ensuring you graduate with portfolio-ready projects</li>
        </ul>
        
        <div class="next-steps">
          <h3>Your Next Steps:</h3>
          <ol>
            <li><strong>Complete Your Registration</strong> - Finalize any pending paperwork or payments</li>
            <li><strong>Join Our Student Portal</strong> - Access your learning materials and course schedule</li>
            <li><strong>Attend Orientation</strong> - Mark your calendar for our upcoming orientation session</li>
            <li><strong>Connect With Peers</strong> - Join our WhatsApp/Telegram community groups</li>
          </ol>
          <a href="#" class="button">Access Student Portal</a>
        </div>
        
        <h2>Need Assistance?</h2>
        <p>Our support team is ready to help with any questions:</p>
        <ul>
          <li>Email: <a href="mailto:landmarktechcrm@gmail.com">landmarktechcrm@gmail.com</a></li>
          <li>Phone: +237 6 73 98 15 95 | +237 6 54 55 89 34</li>
          <li>Live Chat: Available on WhatsApp and Telegram via the numbers above from 8am - 9pm</li>
          <li>Location: Tarred Malingo | JRA, Buea, Southwest, 00237</li>
        </ul>
        
        <div class="signature">
          <p>Looking forward to your success!</p>
          <p><strong>The Landmark Technologies Team</strong></p>
        </div>
      </div>
      <div class="footer">
        <p>© 2025 Landmark Technologies. All rights reserved.</p>
        <div class="social-links">
          <a href="#">LinkedIn</a> | 
          <a href="#">Facebook</a> | 
          <a href="#">Twitter</a> | 
          <a href="#">Instagram</a>
        </div>
        <div class="contact-info">
          <p>Tarred Malingo | JRA, Buea, Southwest, 00237</p>
          <p>This email was sent to you because you registered for a course at Landmark Technologies.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};


// Create plain text version as fallback
// exports.createWelcomeEmailText = (username) => {
// 	return `
// Welcome to Landmark Technologies!

// Hello ${username || 'there'},

// We're thrilled to welcome you to our community! Thank you for joining us.

// ABOUT OUR PRODUCT
// Our platform provides innovative solutions designed to simplify your workflow and boost productivity. With our suite of tools, you'll be able to:
// - Streamline your daily tasks
// - Collaborate seamlessly with your team
// - Access powerful analytics for better decision making
// - Enjoy secure, reliable service with 24/7 support

// To get started, check out our quick start guide or explore our features dashboard.

// NEED HELP?
// Our support team is always ready to assist you:
// - Email: landmarktechcrm@gmail.com
// - Phone: +237 6 73 98 15 95 | +237 6 54 55 89 34
// - Live Chat: Available on WhatsApp and Telegram via the numbers above from 8am - 9pm.

// Follow us for updates:
// Twitter | Facebook | LinkedIn | Instagram

// © 2025 Landmark Technologies. All rights reserved.
// Tarred Malingo | JRA, Buea, Southwest, 00237

// If you received this email by mistake, please disregard it.
// `;
// };

exports.createWelcomeEmailText = (studentName, courseName) => {
  let courseInfo = '';
  
  // Build course info based on course name
  if (courseName) {
    courseInfo = `\nYOUR COURSE: ${courseName}\n`;
    
    // Add course-specific details based on name
    switch(courseName) {
      case 'Back-End Development':
        courseInfo += "4-Month program where you'll master Node.js, Express.js, and build secure, scalable APIs that power modern applications.\n";
        break;
      case 'Full-Stack Development':
        courseInfo += "7-Month program to master the MERN stack and build complete web solutions from front-end to back-end.\n";
        break;
      // Add other cases as needed
      default:
        courseInfo += "Your program at Landmark Technologies will equip you with in-demand tech skills through hands-on projects and expert mentorship.\n";
    }
  }

  return `
WELCOME TO LANDMARK TECHNOLOGIES!
=================================

Hello ${studentName || 'Future Tech Leader'},

Congratulations on taking the first step towards transforming your career with Landmark Technologies! We're thrilled to welcome you to our community of innovators, problem-solvers, and future tech leaders.
${courseInfo}
WHY LANDMARK TECHNOLOGIES?
- Globally Recognized Certification giving you a competitive edge
- Strategic Canadian Partnerships for real-world project experience
- Hybrid Learning Model combining hands-on labs with flexible online resources
- "Code for Impact" Guarantee ensuring portfolio-ready projects

YOUR NEXT STEPS:
1. Complete Your Registration - Finalize any pending paperwork or payments
2. Join Our Student Portal - Access your learning materials and course schedule
3. Attend Orientation - Mark your calendar for our upcoming orientation session
4. Connect With Peers - Join our WhatsApp/Telegram community groups

NEED ASSISTANCE?
Our support team is ready to help with any questions:
- Email: landmarktechcrm@gmail.com
- Phone: +237 6 73 98 15 95 | +237 6 54 55 89 34
- Live Chat: Available on WhatsApp and Telegram from 8am - 9pm
- Location: Tarred Malingo | JRA, Buea, Southwest, 00237

Looking forward to your success!

The Landmark Technologies Team

© 2025 Landmark Technologies. All rights reserved.
Tarred Malingo | JRA, Buea, Southwest, 00237

This email was sent to you because you registered for a course at Landmark Technologies.
`;
};
