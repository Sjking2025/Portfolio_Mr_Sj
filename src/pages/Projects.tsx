
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DemoCarousel from '@/components/DemoCarousel';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "MERN Unique Todo App",
      description: "A modern, full-stack To-Do application built with the MERN stack featuring a unique design, real-time updates, and seamless user experience.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60",
      category: "fullstack",
      technologies: ["MongoDB", "Express.js", "React", "Node.js"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/MERN-UNIQUETODO-APP",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop', title: 'Dashboard' },
        { id: 2, url: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=300&fit=crop', title: 'Task List' },
        { id: 3, url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop', title: 'Add Task' },
        { id: 4, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', title: 'Analytics' },
        { id: 5, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', title: 'Settings' },
        { id: 6, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop', title: 'Mobile View' },
      ]
    },
    {
      id: 2,
      title: "React Weather App",
      description: "Real-time weather application with interactive UI, location-based forecasts, and global weather coverage using OpenWeatherMap API.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=60",
      category: "frontend",
      technologies: ["React", "JavaScript", "CSS", "OpenWeatherMap API"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/React_Weather_App",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop', title: 'Current Weather' },
        { id: 2, url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop', title: 'Forecast' },
        { id: 3, url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=300&fit=crop', title: 'Hourly View' },
        { id: 4, url: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=400&h=300&fit=crop', title: 'Location Search' },
        { id: 5, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop', title: 'Map View' },
        { id: 6, url: 'https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=400&h=300&fit=crop', title: 'Night Mode' },
      ]
    },
    {
      id: 3,
      title: "Kanban Board",
      description: "Modern Kanban board with drag & drop functionality, multiple themes, and local storage. Built with vanilla JavaScript for seamless task management.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60",
      category: "frontend",
      technologies: ["JavaScript", "HTML5", "CSS3", "Drag & Drop API"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/kanban-board",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop', title: 'Board View' },
        { id: 2, url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop', title: 'Drag & Drop' },
        { id: 3, url: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=300&fit=crop', title: 'Task Details' },
        { id: 4, url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop', title: 'Themes' },
        { id: 5, url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop', title: 'Team View' },
        { id: 6, url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop', title: 'Mobile' },
      ]
    },
    {
      id: 4,
      title: "Lift Simulator 3D",
      description: "Interactive 3D elevator simulator implementing the SCAN disk scheduling algorithm. Features realistic physics, floor animations, and activity logging.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=60",
      category: "3d",
      technologies: ["React", "Three.js", "React Three Fiber", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/Lift_Simulator_3D",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', title: '3D View' },
        { id: 2, url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', title: 'Elevator Interior' },
        { id: 3, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop', title: 'Building View' },
        { id: 4, url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', title: 'Floor Selection' },
        { id: 5, url: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=400&h=300&fit=crop', title: 'Controls' },
        { id: 6, url: 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=400&h=300&fit=crop', title: 'Activity Log' },
      ]
    },
    {
      id: 5,
      title: "HR Recruitment Chatbot",
      description: "AI-powered HR Management Chatbot that helps with recruitment, candidate screening, and job application tracking with intelligent responses.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop&q=60",
      category: "ai",
      technologies: ["Python", "NLP", "React", "FastAPI"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/HR-Recruitment-Chatbot",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop', title: 'Chat Interface' },
        { id: 2, url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop', title: 'AI Response' },
        { id: 3, url: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop', title: 'Job Matching' },
        { id: 4, url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop', title: 'Resume Upload' },
        { id: 5, url: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&h=300&fit=crop', title: 'Analytics' },
        { id: 6, url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop', title: 'Candidates' },
      ]
    },
    {
      id: 6,
      title: "Resume Builder & Analyzer Pro",
      description: "AI-powered resume builder with parsing capabilities, ATS compatibility checker, and intelligent suggestions for resume optimization.",
      image: "/screenshots/resume-builder/cover.png",
      category: "ai",
      technologies: ["Python", "React", "AI/ML", "PDF Generation"],
      liveUrl: "https://resume-builder-pro-gilt.vercel.app/",
      githubUrl: "https://github.com/Sjking2025/Resume-Builder-Parser-Analyzer-Pro",
      screenshots: [
        // Resume Editor Features
        { id: 1, url: '/screenshots/resume-builder/01-homepage.png', title: 'Homepage', description: 'AI-powered resume builder with 18 professional templates, ATS optimization, and privacy-first approach.' },
        { id: 2, url: '/screenshots/resume-builder/03-editor-experience.png', title: 'Experience Editor', description: 'Add work experience with real-time live preview showing your resume updates instantly.' },
        { id: 3, url: '/screenshots/resume-builder/06-editor-skills.png', title: 'Skills & Languages', description: 'Add technical skills, soft skills, and languages with smart tag-based input system.' },
        { id: 4, url: '/screenshots/resume-builder/08-template-sidebar.png', title: 'Template Customization', description: 'Choose from ATS-friendly and Modern templates with adjustable text sizes and layouts.' },
        // Template Showcase
        { id: 5, url: '/screenshots/resume-builder/14-template-classic.png', title: 'Classic Template', description: 'Clean, professional design perfect for traditional industries and corporate roles.' },
        { id: 6, url: '/screenshots/resume-builder/15-template-executive.png', title: 'Executive Template', description: 'Premium executive layout for senior positions and leadership roles.' },
        { id: 7, url: '/screenshots/resume-builder/11-full-resume-preview.png', title: 'Full Resume Preview', description: 'Complete resume with all sections - experience, education, projects, skills, and certifications.' },
        { id: 8, url: '/screenshots/resume-builder/10-pdf-export.png', title: 'PDF Export', description: 'Export to PDF with custom margins and professional formatting for applications.' },
        // Portfolio Generator
        { id: 9, url: '/screenshots/resume-builder/portfolio-gen/01-portfolio-preview.png', title: 'Portfolio Generator', description: 'Generate a professional portfolio website from your resume with multiple themes.' },
        // Skill Gap Analyzer (user-specified order)
        { id: 10, url: '/screenshots/resume-builder/skill-gap/06-job-input.png', title: 'Job Description Input', description: 'Paste a job description to analyze skill gaps. Auto-extracts key skills and matches against your resume (18 skills, 2 experiences).' },
        { id: 11, url: '/screenshots/resume-builder/skill-gap/01-gap-analysis-report.png', title: 'Gap Analysis Report', description: 'Full Stack Developer role shows 63% match score with estimated 8-12 weeks prep time. Shows 14 matched, 7 missing, and 3 needs-work skills.' },
        { id: 12, url: '/screenshots/resume-builder/skill-gap/02-skills-breakdown.png', title: 'Detailed Skills Breakdown', description: 'Complete breakdown: Matched skills (Node.js, JavaScript, MongoDB), Missing skills (React Native, Authentication), and AI-generated recommendations.' },
        { id: 13, url: '/screenshots/resume-builder/skill-gap/04-learning-roadmap.png', title: 'Customize Your Roadmap', description: 'Set learning preferences: Available time (1-6 hrs/day), speed, timeline (14 days to 3 months), style, and video language options.' },
        { id: 14, url: '/screenshots/resume-builder/skill-gap/07-analysis-steps.png', title: 'Generating Roadmap', description: 'AI generates personalized 8-week roadmap with weekly modules: Authentication, React Native, Flutter, Next.js, DevOps, and UX.' },
        { id: 15, url: '/screenshots/resume-builder/skill-gap/generated-roadmap.png', title: 'Your Practice Roadmap', description: 'Week 1: React Native & TypeScript with 6 hrs learning, 9 hrs practice. Includes video courses, docs, projects, and validation questions.' },
      ]
    },
    {
      id: 7,
      title: "AI-Driven Learning Platform",
      description: "Personalized incremental learning platform powered by AI that adapts to user's learning pace and provides customized educational content.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60",
      category: "ai",
      technologies: ["React", "Python", "TensorFlow", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/AI-Driven-Incremental-Learning-Platform",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop', title: 'Dashboard' },
        { id: 2, url: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=400&h=300&fit=crop', title: 'Courses' },
        { id: 3, url: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=300&fit=crop', title: 'Lesson' },
        { id: 4, url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop', title: 'Quiz' },
        { id: 5, url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop', title: 'Progress' },
        { id: 6, url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop', title: 'AI Tutor' },
      ]
    },
    {
      id: 8,
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration built with React.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sjking2025/Ecommerce_platform_reactjs",
      screenshots: [
        { id: 1, url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop', title: 'Homepage' },
        { id: 2, url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop', title: 'Products' },
        { id: 3, url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', title: 'Product Detail' },
        { id: 4, url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop', title: 'Cart' },
        { id: 5, url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=300&fit=crop', title: 'Checkout' },
        { id: 6, url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', title: 'Order History' },
      ]
    },
    {
      id: 9,
      title: "PrintFlow",
      description: "The Ultimate Digital Command Center for Modern Print Shops. A full-stack order management system with automated pricing, priority-sorted queue, Razorpay payments, and role-based dashboards for customers, shop owners, and admins.",
      image: "/screenshots/printflow/cover.png",
      category: "fullstack",
      technologies: ["Spring Boot", "React", "PostgreSQL", "Razorpay", "Firebase", "TypeScript"],
      liveUrl: "https://printflow-order-management-frontend.vercel.app/",
      githubUrl: "https://github.com/Sjking2025/printflow-order-management",
      screenshots: [
        // Platform Overview & Landing Showcase
        { id: 1, url: '/screenshots/printflow/01-landing-hero.png', title: 'Landing Page & Hero', description: 'Modern landing experience highlighting calm, precise digital order management workflows for modern print shops.' },
        { id: 2, url: '/screenshots/printflow/02-landing-queue-preview.png', title: 'Live Production Queue Showcase', description: 'Automated document scanning, priority ordering, and real-time Razorpay payment verification.' },
        { id: 3, url: '/screenshots/printflow/03-controlled-modification-window.png', title: 'Controlled Modification Window', description: 'Shop-defined grace period timer allowing customers to adjust copy counts before printing starts.' },
        { id: 4, url: '/screenshots/printflow/04-built-in-clarification-chat.png', title: 'Contextual Clarification Chat', description: 'Direct timeline communication between shop owner and customer to resolve binding and paper specifications.' },
        { id: 5, url: '/screenshots/printflow/05-smart-priority-queue.png', title: 'Smart Queue Intelligence', description: 'Automated sorting algorithms categorizing orders by Critical, High, and Standard urgency tiers.' },
        { id: 6, url: '/screenshots/printflow/06-instant-realtime-quoting.png', title: 'Instant Dynamic Quoting', description: 'Real-time transparent price calculation across page counts, B&W vs color, duplexing, and finishing.' },
        { id: 7, url: '/screenshots/printflow/07-unified-workspace-overview.png', title: 'Unified Workspace Ecosystem', description: 'Complete operational hub uniting Owner Dashboard, Customer Self-Service Portal, and Verified Payment Gateways.' },

        // Role-Based Access Control (RBAC)
        { id: 8, url: '/screenshots/printflow/08-auth-customer-portal.png', title: 'Customer Portal Authentication', description: 'Role-based customer sign-in via Google OAuth or email to submit jobs and track print progress.' },
        { id: 9, url: '/screenshots/printflow/09-auth-shop-owner.png', title: 'Shop Owner Terminal Sign-In', description: 'Dedicated terminal access for print house operators to manage live queues and verified payments.' },
        { id: 10, url: '/screenshots/printflow/10-auth-admin-console.png', title: 'Enterprise Admin Console Access', description: 'Restricted system administration login with role-based access control (RBAC) and audit capabilities.' },

        // Customer Self-Service Order Workflow
        { id: 11, url: '/screenshots/printflow/11-customer-orders-dashboard.png', title: 'Customer Order History Hub', description: 'Comprehensive tracking dashboard with tab filters for Pending, In Progress, Completed, and Cancelled orders.' },
        { id: 12, url: '/screenshots/printflow/12-order-select-shop.png', title: 'Order Flow - Select Print Shop', description: 'Browse verified local and campus print shops with transparent per-page rates for B&W and color.' },
        { id: 13, url: '/screenshots/printflow/13-order-document-upload.png', title: 'Order Flow - Document Upload', description: 'Drag-and-drop file upload supporting PDF, DOCX, JPG, and PNG files up to 20MB per document.' },
        { id: 14, url: '/screenshots/printflow/14-order-configure-specs.png', title: 'Order Flow - Document Specifications', description: 'Detailed print settings for copy count, color mode (B&W/Color), duplexing, spiral binding, and lamination.' },
        { id: 15, url: '/screenshots/printflow/15-order-speed-turnaround.png', title: 'Order Flow - Priority & Turnaround', description: 'Select turnaround speed from Standard, High Priority (+₹10), or Critical Rush (+₹5) with live order recalculation.' },
        { id: 16, url: '/screenshots/printflow/16-payment-method-selection.png', title: 'Order Flow - Payment Method Selection', description: 'Choose between instant online checkout with Razorpay or shop counter UPI QR code / cash payment.' },

        // Razorpay Payment Integration & Verification
        { id: 17, url: '/screenshots/printflow/17-payment-checkout-summary.png', title: 'Order Checkout - Review & Pay', description: 'Final invoice summary including subtotal and priority rush fees before launching secure Razorpay checkout.' },
        { id: 18, url: '/screenshots/printflow/18-razorpay-contact-verification.png', title: 'Razorpay Checkout - Contact Details', description: 'Customer verification modal capturing phone number and email for automated SMS receipts and payment tracking.' },
        { id: 19, url: '/screenshots/printflow/19-razorpay-gateway-options.png', title: 'Razorpay Gateway - Payment Rails', description: 'Multi-payment support featuring dynamic UPI QR, Credit/Debit cards, Netbanking, Wallets, and EMI.' },
        { id: 20, url: '/screenshots/printflow/20-razorpay-payment-success.png', title: 'Razorpay Gateway - Payment Verified', description: 'Instant transaction capture screen displaying Razorpay payment ID and automated order redirect.' },
        { id: 21, url: '/screenshots/printflow/21-payment-receipt-verification.png', title: 'Digital Payment Receipt Banner', description: 'Verified payment confirmation tag tied to Razorpay transaction reference and precise payment timestamp.' },
        { id: 22, url: '/screenshots/printflow/22-customer-order-tracking.png', title: 'Customer Order Tracking & Actions', description: 'Live 4-phase production tracker with direct shop phone contact, quantity adjustment, and chat assistance.' },

        // Shop Owner Command Center & Operations
        { id: 23, url: '/screenshots/printflow/23-owner-dashboard-overview.png', title: 'Shop Owner Command Center', description: 'Real-time production metrics: Ready to Print, Total Pending, Urgent Jobs, and daily/lifetime revenue.' },
        { id: 24, url: '/screenshots/printflow/24-owner-smart-queue-hardware.png', title: 'Owner Portal - Smart Queue & Hardware', description: 'Priority-sorted live order cards alongside hardware health monitors for color and B&W printing machines.' },
        { id: 25, url: '/screenshots/printflow/25-owner-order-management.png', title: 'Owner Portal - Order Inspection & Actions', description: 'Order inspection detail view featuring embedded document thumbnail preview, download, delay, and start actions.' },
        { id: 26, url: '/screenshots/printflow/26-owner-clarification-drawer.png', title: 'Owner Portal - Clarification Drawer', description: 'In-app direct messaging drawer enabling shop operators to quickly resolve customer questions and delivery times.' },
        { id: 27, url: '/screenshots/printflow/27-owner-customers-directory.png', title: 'Shop CRM - Customer Directory', description: 'Customer directory tracking repeat client accounts, order counts, email records, and recent orders.' },
        { id: 28, url: '/screenshots/printflow/28-owner-live-queue-filters.png', title: 'Live Production Queue Management', description: 'Real-time queue synchronized across terminals with filters for Ready to Print, Needs Acceptance, and On Machine.' },

        // Shop Operations & Configuration
        { id: 29, url: '/screenshots/printflow/29-shop-availability-closure.png', title: 'Shop Availability & Status Controls', description: 'Quick toggle status manager for Shop Open, Lunch Break, Machine Maintenance, Emergency, and Custom Message.' },
        { id: 30, url: '/screenshots/printflow/30-shop-maintenance-reopen-timer.png', title: 'Maintenance Mode with Reopen Timer', description: 'Set expected repair completion time with date/time picker, keeping customers informed and pausing new orders.' },
        { id: 31, url: '/screenshots/printflow/31-shop-pricing-rules-config.png', title: 'Shop Settings - Pricing & Order Rules', description: 'Configure base page pricing, A3 multipliers, duplex discounts, binding add-ons, and copy lock timers.' },
        { id: 32, url: '/screenshots/printflow/32-shop-payouts-notifications.png', title: 'Shop Settings - UPI Payouts & Alerts', description: 'Merchant UPI ID setup, optional GSTIN registration, and notification channels for Email, SMS, and WhatsApp.' },

        // Enterprise Administration & Governance
        { id: 33, url: '/screenshots/printflow/33-admin-enterprise-dashboard.png', title: 'Enterprise Admin - Systems Overview', description: 'Network-wide administrative console tracking total customers, active accounts, shop reviews, and security alerts.' },
        { id: 34, url: '/screenshots/printflow/34-admin-customer-governance.png', title: 'Enterprise Admin - Customer Governance', description: 'Platform customer registry showing internal user IDs, registered emails, order tallies, and active states.' },
        { id: 35, url: '/screenshots/printflow/35-admin-shop-owner-management.png', title: 'Enterprise Admin - Shop Partner Directory', description: 'Multi-shop network directory managing partner accounts, shop names, business locations, and verification status.' },
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'frontend', name: 'Front End' },
    { id: 'ai', name: 'AI / ML' },
    { id: '3d', name: '3D / Graphics' }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen px-4 pt-32 pb-16">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">My Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my latest work, featuring innovative solutions and cutting-edge technologies
            </p>
          </div>

          {/* Featured Projects */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="gradient-text">Featured Projects</span>
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[projects.find(p => p.id === 9), projects.find(p => p.id === 6)].map((project, index) => (
                <motion.div
                  key={project?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-3xl overflow-hidden min-h-[320px] cursor-pointer"
                  data-cursor="view"
                  onClick={() => setActiveProject(project?.id ?? null)}
                >
                  <div className="absolute inset-0">
                    <motion.img
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.25 }}
                      src={project?.image}
                      alt={project?.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
                  </div>
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
                          {project?.category === 'fullstack' ? 'Full Stack' : 'AI / ML'}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-muted-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                          Featured
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {project?.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed max-w-xl line-clamp-2">
                        {project?.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project?.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
                            {tech}
                          </span>
                        ))}
                        {project && project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-white/10 text-white/60 rounded-full text-xs backdrop-blur-sm">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProject(project?.id ?? null);
                          }}
                          className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm shadow-lg shadow-primary/25"
                        >
                          Live Demo
                        </motion.button>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project?.githubUrl}
                          className="px-5 py-2.5 glass-effect rounded-xl font-medium text-sm"
                        >
                          GitHub
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${filter === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'glass-effect hover:bg-white/10 text-muted-foreground hover:text-foreground'
                  }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Projects grid */}
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.16) }}
                  whileHover={{ y: -6 }}
                  className="glass-effect rounded-3xl overflow-hidden group cursor-pointer"
                  data-cursor="view"
                >
                  {/* Project image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.25 }}
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>

                    {/* Overlay buttons */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-background/80 flex items-center justify-center space-x-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(project.id);
                        }}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
                      >
                        Live Demo
                      </motion.button>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubUrl}
                        className="px-4 py-2 glass-effect rounded-xl font-medium"
                      >
                        GitHub
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Project content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center space-y-6 pt-16"
          >
            <h3 className="text-3xl font-bold">Have a Project in Mind?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm always excited to work on new and challenging projects. Let's discuss how we can bring your ideas to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300"
            >
              Start a Project
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Demo Carousel Modal */}
      <AnimatePresence>
        {activeProject !== null && (
          <DemoCarousel
            screenshots={projects.find(p => p.id === activeProject)?.screenshots || []}
            projectTitle={projects.find(p => p.id === activeProject)?.title || ''}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
