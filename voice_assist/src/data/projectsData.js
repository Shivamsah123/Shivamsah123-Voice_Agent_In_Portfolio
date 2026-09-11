import img1 from '../images/online_bank_loan (1).png';
import img2 from '../images/online_bank_loan (2).png';
import img3 from '../images/online_bank_loan (3).png';
import img4 from '../images/online_bank_loan (4).png';
import img5 from '../images/online_bank_loan (5).png';
import img6 from '../images/online_bank_loan (6).png';
import img7 from '../images/online_bank_loan (7).png';
import img8 from '../images/online_bank_loan (8).png';
import img9 from '../images/online_bank_loan (9).png';
import img10 from '../images/online_bank_loan (10).png';
import img11 from '../images/online_bank_loan (11).png';
import img12 from '../images/online_bank_loan (12).png';
import img13 from '../images/online_bank_loan (13).png';
import img14 from '../images/online_bank_loan (14).png';
import airbnb1 from '../images/Airbnb (1).png';
import airbnb2 from '../images/Airbnb (2).png';
import airbnb3 from '../images/Airbnb (3).png';
import airbnb4 from '../images/Airbnb (4).png';
import airbnb5 from '../images/Airbnb (5).png';
import airbnb6 from '../images/Airbnb (6).png';
import airbnb7 from '../images/Airbnb (7).png';
import portfolio1 from '../images/portfolio_web (1).png';
import portfolio2 from '../images/portfolio_web (2).png';
import portfolio3 from '../images/portfolio_web (3).png';
import portfolio4 from '../images/portfolio_web (4).png';
import portfolio5 from '../images/portfolio_web (5).png';

export const projectsData = [
  {
    id: 1,
    title: "Online Bank Loan Management System",
    // Short description for the home page featured card
    description: "Developed a secure microservices-based banking system to automate the complete loan lifecycle and financial operations. Implemented JWT-based authentication and designed scalable REST APIs.",
    // Short tech stack for the home page featured card
    tech: ["Java", "Spring Boot", "React.js", "Microservices", "MySQL"],
    github: "https://github.com/Shivamsah123/online-bank-loan-management",
    demo: "https://online-bank-loan.netlify.app",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Full Stack",
    
    // Huge detailed data for the ProjectDetail page
    details: {
      overview: "A scalable and secure online banking web application built with modern microservices architecture to handle daily financial transactions safely and efficiently. Designed for high usability and robust security, it modernizes the core banking experience for end users and administrators alike.",
      problemStatement: "Traditional banking systems often struggle with scaling under high user load and are rigid, causing delayed transactions and poor customer experiences. There is a critical need for a modern, digital-first solution that ensures 24/7 availability, instant processing, and seamless user interaction without compromising on security.",
      solution: "The Online Banking System completely digitizes account management and fund transfers by leveraging a decoupled microservices backend. This ensures high availability and fast response times, while the responsive React frontend offers an intuitive interface that allows users to seamlessly and securely manage their finances anytime, anywhere.",
      features: [
        "Secure User Authentication and Role-Based Access Control (RBAC).",
        "Comprehensive Account Management (View balance, update profiles).",
        "Real-time Fund Transfers between internal accounts.",
        "Detailed Transaction History with filtering and sorting capabilities.",
        "Automated Email Notifications for transactions and security alerts."
      ],
      security: [
        "JWT-based authentication and secure session handling.",
        "End-to-end password encryption using BCrypt.",
        "Role-based route protection to prevent unauthorized access.",
        "API Gateway rate limiting to mitigate DDoS attacks."
      ],
      screenshotsDesc: "A glimpse into the clean and user-friendly interface of the banking system. Click any image to view it in full screen.",
      screenshots: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14],
      techStack: {
        Frontend: ["React.js", "HTML5", "CSS3", "Syncfusion Components"],
        Backend: ["Java", "Spring Boot", "Node.js", "ASP.NET Core"],
        Database: ["MySQL", "MongoDB", "SQL Server"],
        Tools: ["Microservices", "REST APIs", "API Gateway", "Docker", "Kubernetes", "Git"]
      },
      challenges: [],
      learnings: [
        "Deepened understanding of secure API integration and Gateway routing.",
        "Mastered full-stack state management bridging React frontends to Spring Boot backends.",
        "Gained hands-on experience in distributed transaction patterns within a microservices ecosystem."
      ],
      standout: "Built with enterprise-grade architecture in mind, this project goes beyond a simple CRUD application by successfully implementing true microservices communication and stringent security protocols, demonstrating a robust capability to build real-world, scalable software.",
      contact: "Are you a recruiter looking for a developer who understands modern scalable architectures? I'd love to discuss the technical decisions behind this project in detail. Please feel free to reach out via the Contact section!"
    }
  },
  {
    id: 2,
    title: "Airbnb Clone - Full Stack Web Application",
    description: "Built a scalable rental booking platform inspired by Airbnb. Developed secure REST APIs for property listing, booking, and user management using Spring Boot. Implemented responsive UI with React.js and Tailwind CSS.",
    tech: ["Java", "Spring Boot", "React.js", "MySQL", "Tailwind CSS", "JWT"],
    github: "https://github.com/Shivamsah123",
    demo: "https://example.com",
    image: airbnb1,
    category: "Full Stack",
    details: {
      overview: "A comprehensive full-stack rental booking application modeled after Airbnb, designed to provide a seamless property browsing and booking experience.",
      problemStatement: "Finding reliable, short-term rentals online requires platforms that are not only trustworthy but also highly responsive and easy to navigate. Current smaller platforms lack robust booking engines and modern UI design.",
      solution: "Developed a modern booking engine with a Spring Boot backend and React frontend that handles availability checks, secure booking transactions, and property management smoothly.",
      features: [
        "User Registration and Profile Management",
        "Property Listings with Image Galleries",
        "Dynamic Booking Calendar and Availability Checking",
        "Admin Dashboard for Listing Management"
      ],
      security: [
        "JWT Authentication",
        "Secure Password Hashing"
      ],
      screenshotsDesc: "A look at the Airbnb Clone UI — property listings, booking flow, and admin dashboard. Click any image to view in full screen.",
      screenshots: [airbnb1, airbnb2, airbnb3, airbnb4, airbnb5, airbnb6, airbnb7],
      techStack: {
        Frontend: ["React.js", "Tailwind CSS", "Vite"],
        Backend: ["Java", "Spring Boot"],
        Database: ["MySQL"],
        Tools: ["Git", "Postman", "JWT"]
      },
      challenges: [],
      learnings: [
        "Advanced relational database design for booking systems.",
        "Effective use of Tailwind CSS for rapid and responsive UI development."
      ],
      standout: "Features a fully functional and highly accurate booking availability engine that mirrors real-world industry standards.",
      contact: "Interested in the backend logic of the booking engine? Let's connect!"
    }
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description: "A modern, highly responsive personal portfolio website built to showcase my skills, projects, and professional experience. Designed with a clean, glassmorphism UI.",
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Vite"],
    github: "https://github.com/Shivamsah123/portfolio-web-2.0",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Frontend",
    details: {
      overview: "A sleek, high-performance portfolio application built with React to serve as a digital resume and project showcase.",
      problemStatement: "Standard PDF resumes often fail to capture the interactive capabilities and design sensibilities of a modern developer.",
      solution: "Created a fully interactive, responsive single-page application (SPA) that not only lists experiences but serves as a live demonstration of my frontend skills.",
      features: [
        "Dynamic Theme Toggling (Dark/Light)",
        "Responsive Glassmorphism Design",
        "Dynamic Routing for Project Details",
        "Secure Contact Form with EmailJS Integration"
      ],
      security: [
        "Google reCAPTCHA Integration (Optional)",
        "Form Input Validation and Sanitization"
      ],
      screenshotsDesc: "Showcasing the responsive design, smooth animations, and clean layouts of the portfolio across different devices. Click any image to view full screen.",
      screenshots: [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5],
      techStack: {
        Frontend: ["React.js", "CSS3 (Glassmorphism)", "HTML5"],
        Backend: ["None (Serverless via EmailJS)"],
        Database: ["None"],
        Tools: ["Vite", "Git", "Netlify/Vercel Deployment"]
      },
      challenges: [],
      learnings: [
        "Advanced CSS techniques including CSS Variables for theme switching and CSS Grid/Flexbox.",
        "React Router DOM integration for seamless multi-page transitions."
      ],
      standout: "The portfolio itself is a testament to my commitment to clean code, pixel-perfect design, and optimized performance.",
      contact: "Like what you see? I'd love to bring this level of polish to your company's projects. Let's chat!"
    }
  }
];
