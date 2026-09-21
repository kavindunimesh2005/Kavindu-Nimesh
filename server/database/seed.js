const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { saveLocalDb, loadLocalDb } = require('../config/db');

async function seedDatabase() {
  console.log('🌱 Seeding Kavindu Nimesh Portfolio Database...');

  const hashedPassword = await bcrypt.hash('Admin@2026!', 10);

  const seedData = {
    admins: [
      {
        id: 1,
        email: 'admin@kavindu.dev',
        password: hashedPassword,
        name: 'Kavindu Nimesh',
        role: 'superadmin',
        created_at: new Date().toISOString()
      }
    ],

    about: {
      id: 1,
      name: 'Kavindu Nimesh',
      title: 'Software Engineer & Web Developer',
      company: 'Aura Digital Developer Sri Lanka',
      tagline: 'Code. Design. Digital Impact.',
      bio: 'Driven Software Engineer & Web Developer with 3+ years of experience delivering high-performance digital products, mission-critical web applications, and award-winning user interfaces. Founder of Aura Digital Developer Sri Lanka, engineering digital solutions that merge architectural precision with bleeding-edge aesthetic performance.',
      secondary_bio: 'Specialized in building full-stack enterprise web platforms, custom e-commerce systems, real-time admin dashboards, and database-driven solutions. Dedicated to clean code, modular architecture, and modern UX design that drives measurable business growth.',
      years_experience: 3,
      projects_count: 28,
      clients_count: 22,
      tech_count: 19,
      portrait_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      resume_url: '/uploads/Kavindu_Nimesh_CV.pdf',
      location: 'Colombo, Sri Lanka',
      availability: 'Available for Select Client Projects',
      updated_at: new Date().toISOString()
    },

    projects: [
      {
        id: 1,
        slug: 'bharana-books',
        title: 'Bharana Books — Modern E-Commerce Platform',
        category: 'E-Commerce',
        client: 'Bharana Booksellers & Publishers',
        industry: 'Publishing & Retail',
        year: '2025',
        timeline: '8 Weeks',
        short_description: 'Full-stack high-speed digital bookstore platform with real-time stock management, fast search, multi-currency support, and payment gateways.',
        full_description: 'Bharana Books is a premier digital bookstore crafted to transform the reading experience in Sri Lanka. Engineered with lightning-fast catalog search, categorized collections, author spotlights, custom cart architecture, and integrated local & international payment gateways.',
        challenge: 'The client faced slow legacy inventory syncs, high cart abandonment rates during mobile checkout, and lacked automated order dispatch tracking for island-wide delivery.',
        solution: 'Engineered an optimized React e-commerce frontend paired with a modular REST API, indexed search algorithms, dynamic cart state management, and an automated SMS/email dispatch notification system.',
        features: [
          'Instant live book search & filtering by genre, author, price',
          'One-click mobile-first checkout with address autocomplete',
          'Automated inventory & re-order thresholds',
          'Integrated Payment Gateway (PayHere / Stripe & COD)',
          'Real-time dispatch & courier tracking updates',
          'Customer reviews, reading lists & rating engine'
        ],
        technologies: ['React.js', 'Node.js', 'Express', 'MySQL', 'CSS3', 'PayHere API', 'JWT'],
        live_url: 'https://bharanabooks.lk',
        github_url: 'https://github.com/kavindunimesh/bharana-books',
        image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1507842229451-7f01be7f70d3?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
        ],
        results: '42% boost in mobile conversions, 300ms catalog search response time, and over 15,000 orders processed in the first quarter.',
        client_feedback: 'Kavindu transformed our bookstore into Sri Lanka\'s fastest digital book shopping experience. The admin panel makes managing thousands of titles effortless.',
        is_featured: 1,
        is_published: 1,
        display_order: 1,
        created_at: '2025-01-15T10:00:00Z'
      },
      {
        id: 2,
        slug: 'ayu-care-ceylon',
        title: 'Ayu Care Ceylon — Ayurvedic Wellness & E-Commerce',
        category: 'E-Commerce',
        client: 'Ayu Care Ceylon Wellness Pvt Ltd',
        industry: 'Healthcare / Wellness Retail',
        year: '2025',
        timeline: '6 Weeks',
        short_description: 'Luxury wellness portal blending traditional Sri Lankan Ayurvedic therapy booking with direct-to-consumer organic herbal remedies e-commerce.',
        full_description: 'Ayu Care Ceylon is an editorial-grade wellness and wellness commerce platform designed to project tranquility and therapeutic authority. Features physician consultation booking, herbal product subscriptions, and tailored regimen quizzes.',
        challenge: 'The brand needed to communicate heritage luxury while managing complex booking schedules across multiple treatment centers alongside global product export logistics.',
        solution: 'Built a unified booking calendar engine with real-time room & therapist allocation, cross-border shipping calculator, and an immersive editorial aesthetic.',
        features: [
          'Interactive Doctor / Therapist Consultation Scheduler',
          'Direct-to-consumer organic apothecary shop',
          'Personalized Ayurvedic dosha quiz & product matcher',
          'Multi-currency checkout for worldwide clients',
          'Comprehensive admin scheduling calendar'
        ],
        technologies: ['React.js', 'Node.js', 'Express', 'MySQL', 'Framer Motion', 'Stripe'],
        live_url: 'https://ayucareceylon.com',
        github_url: 'https://github.com/kavindunimesh/ayu-care-ceylon',
        image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80'
        ],
        results: '210% increase in online wellness appointments and 65% repeat order rate for herbal therapies.',
        client_feedback: 'The website captures the true soul of Ceylon Ayurveda with world-class digital finesse. Kavindu exceeded every single benchmark.',
        is_featured: 1,
        is_published: 1,
        display_order: 2,
        created_at: '2025-02-01T12:00:00Z'
      },
      {
        id: 3,
        slug: 'aura-logistics-os',
        title: 'Aura Logistics — Fleet & Dispatch Management OS',
        category: 'Admin Dashboards',
        client: 'Aura Express Logistics',
        industry: 'Supply Chain & Transportation',
        year: '2024',
        timeline: '10 Weeks',
        short_description: 'Enterprise fleet telematics and parcel dispatch software featuring live route tracking, driver manifests, and predictive arrival windows.',
        full_description: 'Enterprise cloud solution built for high-throughput parcel routing and commercial fleet telemetry across 9 provinces in Sri Lanka.',
        challenge: 'Dispatchers were overwhelmed by manual phone coordination, delay blind spots, and lack of real-time route optimization.',
        solution: 'Engineered an ultra-fast real-time React dashboard with WebSockets telemetry, map geofencing, automated driver manifest generation, and predictive delivery windows.',
        features: [
          'Interactive live GPS map with fleet geofencing',
          'Dynamic route optimization algorithm',
          'One-click digital manifest & barcode scan integration',
          'Driver mobile view with digital signature capture',
          'Executive KPI reports & fuel consumption analytics'
        ],
        technologies: ['React.js', 'Node.js', 'Express', 'MySQL', 'Leaflet', 'Socket.io', 'Chart.js'],
        live_url: 'https://logistics.auradigital.lk',
        github_url: 'https://github.com/kavindunimesh/aura-logistics-os',
        image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
        ],
        results: 'Saved 38% dispatcher coordinating time and reduced daily transit delays by 24%.',
        client_feedback: 'A game-changing operating system for our fleet. Flawless execution, zero downtime, and stellar reliability.',
        is_featured: 1,
        is_published: 1,
        display_order: 3,
        created_at: '2024-11-10T14:30:00Z'
      },
      {
        id: 4,
        slug: 'apex-capital-analytics',
        title: 'Apex Capital — FinTech Investment Dashboard',
        category: 'Custom Web Applications',
        client: 'Apex Capital Partners',
        industry: 'Wealth Management & FinTech',
        year: '2024',
        timeline: '7 Weeks',
        short_description: 'Quantitative asset analytics platform delivering real-time portfolio health monitoring, automated rebalancing models, and tax reporting.',
        full_description: 'Sophisticated web application tailored for wealth managers and private clients to monitor asset growth across stocks, real estate, and crypto portfolios with high security.',
        challenge: 'Integrating disparate data feeds into a unified high-speed interface with millisecond rendering response and strict encryption.',
        solution: 'Built with optimized React state, virtualized data tables, sub-second charting renders, and secure role-based access control.',
        features: [
          'Live portfolio tracking & PnL visualizers',
          'Risk scenario simulations & stress test models',
          'Automated PDF client summary generator',
          'Multi-currency exchange rate matrix',
          'Role-based permissions for analysts and investors'
        ],
        technologies: ['React.js', 'Node.js', 'Express', 'MySQL', 'Recharts', 'TailwindCSS'],
        live_url: 'https://apexcapital.example.com',
        github_url: 'https://github.com/kavindunimesh/apex-capital-analytics',
        image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
        ],
        results: 'Handles over $12M in tracked assets daily with sub-second page performance.',
        client_feedback: 'Kavindu delivered an institutional-grade platform with the sleekness of modern consumer software.',
        is_featured: 1,
        is_published: 1,
        display_order: 4,
        created_at: '2024-09-20T11:00:00Z'
      }
    ],

    services: [
      {
        id: 1,
        service_number: '01',
        title: 'Website Development',
        icon: 'Globe',
        description: 'Engineering bespoke, lightning-fast corporate websites and interactive digital portals with bleeding-edge performance, modern animations, and SEO dominance.',
        technologies: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'SEO'],
        display_order: 1,
        is_active: 1
      },
      {
        id: 2,
        service_number: '02',
        title: 'E-Commerce Development',
        icon: 'ShoppingBag',
        description: 'Building high-converting digital storefronts with intuitive product catalogs, seamless payment gateway integrations, automated inventory management, and rapid mobile checkout.',
        technologies: ['Custom Cart', 'Payment Gateways', 'Shopify', 'WooCommerce', 'Node.js', 'MySQL'],
        display_order: 2,
        is_active: 1
      },
      {
        id: 3,
        service_number: '03',
        title: 'Custom Web Applications',
        icon: 'Cpu',
        description: 'Architecting robust, scalable SaaS applications and custom web software engineered to streamline complex business operations with clean, maintainable code.',
        technologies: ['React.js', 'Node.js', 'Express', 'RESTful APIs', 'State Management', 'WebSockets'],
        display_order: 3,
        is_active: 1
      },
      {
        id: 4,
        service_number: '04',
        title: 'Admin Dashboard Development',
        icon: 'LayoutDashboard',
        description: 'Crafting powerful, intuitive administrative dashboards and internal operations tools featuring live metrics, role-based access control, and actionable analytics.',
        technologies: ['Data Visualization', 'CRUD Management', 'JWT Security', 'Export Tools', 'Role Control'],
        display_order: 4,
        is_active: 1
      },
      {
        id: 5,
        service_number: '05',
        title: 'UI/UX Implementation',
        icon: 'Palette',
        description: 'Translating high-fidelity Figma designs into pixel-perfect, accessible, and responsive frontends with silky-smooth micro-interactions and tactile feedback.',
        technologies: ['Figma to React', 'Framer Motion', 'GSAP', 'Accessibility', 'Design Systems'],
        display_order: 5,
        is_active: 1
      },
      {
        id: 6,
        service_number: '06',
        title: 'Website Maintenance & Support',
        icon: 'ShieldCheck',
        description: 'Comprehensive security audits, database tuning, 99.9% uptime monitoring, speed optimizations, automated backups, and continuous feature updates.',
        technologies: ['Performance Tuning', 'Security Patches', 'Database Optimization', 'Uptime Audits'],
        display_order: 6,
        is_active: 1
      }
    ],

    skills: [
      // Frontend
      { id: 1, name: 'React.js', category: 'Frontend', icon: 'Atom', proficiency: 95, display_order: 1, is_active: 1 },
      { id: 2, name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'FileCode2', proficiency: 95, display_order: 2, is_active: 1 },
      { id: 3, name: 'HTML5 & Semantic Markup', category: 'Frontend', icon: 'Code2', proficiency: 98, display_order: 3, is_active: 1 },
      { id: 4, name: 'Modern CSS3 & Animations', category: 'Frontend', icon: 'Palette', proficiency: 94, display_order: 4, is_active: 1 },
      { id: 5, name: 'TailwindCSS & Bootstrap', category: 'Frontend', icon: 'Layers', proficiency: 92, display_order: 5, is_active: 1 },
      { id: 6, name: 'Responsive & Mobile First', category: 'Frontend', icon: 'Smartphone', proficiency: 98, display_order: 6, is_active: 1 },

      // Backend
      { id: 7, name: 'Node.js', category: 'Backend', icon: 'Server', proficiency: 90, display_order: 1, is_active: 1 },
      { id: 8, name: 'Express.js', category: 'Backend', icon: 'Network', proficiency: 92, display_order: 2, is_active: 1 },
      { id: 9, name: 'RESTful API Architecture', category: 'Backend', icon: 'Workflow', proficiency: 95, display_order: 3, is_active: 1 },
      { id: 10, name: 'PHP', category: 'Backend', icon: 'Binary', proficiency: 85, display_order: 4, is_active: 1 },
      { id: 11, name: 'JWT & Session Auth', category: 'Backend', icon: 'KeyRound', proficiency: 92, display_order: 5, is_active: 1 },

      // Database
      { id: 12, name: 'MySQL', category: 'Database', icon: 'Database', proficiency: 90, display_order: 1, is_active: 1 },
      { id: 13, name: 'Database Schema Design', category: 'Database', icon: 'FolderTree', proficiency: 92, display_order: 2, is_active: 1 },
      { id: 14, name: 'Query Optimization', category: 'Database', icon: 'Zap', proficiency: 88, display_order: 3, is_active: 1 },
      { id: 15, name: 'SQLite', category: 'Database', icon: 'HardDrive', proficiency: 90, display_order: 4, is_active: 1 },

      // Tools & CMS
      { id: 16, name: 'Git & GitHub', category: 'Tools', icon: 'GitBranch', proficiency: 94, display_order: 1, is_active: 1 },
      { id: 17, name: 'WordPress', category: 'Tools', icon: 'FileCode', proficiency: 88, display_order: 2, is_active: 1 },
      { id: 18, name: 'Shopify', category: 'Tools', icon: 'ShoppingBag', proficiency: 86, display_order: 3, is_active: 1 },
      { id: 19, name: 'Vite & Webpack', category: 'Tools', icon: 'Gauge', proficiency: 92, display_order: 4, is_active: 1 },

      // Design
      { id: 20, name: 'Figma to Code', category: 'Design', icon: 'Figma', proficiency: 94, display_order: 1, is_active: 1 },
      { id: 21, name: 'UI / UX Prototyping', category: 'Design', icon: 'Sparkles', proficiency: 90, display_order: 2, is_active: 1 },
      { id: 22, name: 'Design Systems', category: 'Design', icon: 'Boxes', proficiency: 92, display_order: 3, is_active: 1 }
    ],

    experiences: [
      {
        id: 1,
        company: 'Aura Digital Developer Sri Lanka',
        position: 'Founder & Lead Full-Stack Engineer',
        period: '2024 — Present',
        description: 'Founded and lead digital engineering operations. Architecting bespoke web solutions, enterprise e-commerce systems, and client dashboards. Delivering high-impact digital experiences for corporate clients across retail, wellness, and logistics.',
        technologies: ['React.js', 'Node.js', 'Express', 'MySQL', 'Architectural Design', 'Client Leadership'],
        display_order: 1
      },
      {
        id: 2,
        company: 'Freelance & Contract Engineering',
        position: 'Senior Web & Systems Developer',
        period: '2023 — 2024',
        description: 'Engineered 18+ custom client projects ranging from commercial business portals to multi-vendor e-commerce stores. Specialized in responsive UI, third-party API payment integrations, and database performance optimization.',
        technologies: ['React.js', 'PHP', 'MySQL', 'Payment Gateways', 'REST APIs', 'UI/UX'],
        display_order: 2
      },
      {
        id: 3,
        company: 'Digital Solutions Lanka',
        position: 'Web Application Developer',
        period: '2022 — 2023',
        description: 'Developed and maintained dynamic corporate websites and database-backed web applications. Collaborated with designers to deliver accessible, fast-loading, mobile-first web experiences.',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'PHP', 'MySQL', 'Bootstrap'],
        display_order: 3
      }
    ],

    testimonials: [
      {
        id: 1,
        client_name: 'Samantha Wijesinghe',
        position: 'Managing Director',
        company: 'Bharana Books',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        rating: 5,
        quote: 'Kavindu is simply a rare breed of developer. He delivers exceptional engineering speed with an eye for design that rivals top international studios. Our mobile sales jumped by 42% after the relaunch of our bookstore.',
        is_active: 1,
        display_order: 1
      },
      {
        id: 2,
        client_name: 'Dr. Damith Senanayake',
        position: 'Founder & CEO',
        company: 'Ayu Care Ceylon Wellness',
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        rating: 5,
        quote: 'Working with Kavindu and Aura Digital was effortlessly smooth. His commitment to precision, speed, and clean code is evident in every single interaction. He brought our Ayurvedic vision to life.',
        is_active: 1,
        display_order: 2
      },
      {
        id: 3,
        client_name: 'Tharindu Perera',
        position: 'Operations Director',
        company: 'Aura Express Freight',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        rating: 5,
        quote: 'Our dispatch team relies on the custom fleet OS Kavindu built every minute of every day. Fast, completely bug-free, and rock solid under heavy load.',
        is_active: 1,
        display_order: 3
      },
      {
        id: 4,
        client_name: 'Michelle Fernando',
        position: 'Creative Lead',
        company: 'Studio M Lanka',
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        rating: 5,
        quote: 'Kavindu’s attention to micro-animations, typography, and responsive perfection makes him our top choice development partner. A true professional.',
        is_active: 1,
        display_order: 4
      }
    ],

    social_links: [
      { id: 1, platform: 'github', title: 'GitHub', url: 'https://github.com/kavindunimesh', icon: 'Github', is_active: 1, display_order: 1 },
      { id: 2, platform: 'linkedin', title: 'LinkedIn', url: 'https://linkedin.com/in/kavindunimesh', icon: 'Linkedin', is_active: 1, display_order: 2 },
      { id: 3, platform: 'fiverr', title: 'Fiverr', url: 'https://fiverr.com/kavindu_nimesh', icon: 'Briefcase', is_active: 1, display_order: 3 },
      { id: 4, platform: 'tiktok', title: 'TikTok', url: 'https://tiktok.com/@auradigitaldeveloper', icon: 'Video', is_active: 1, display_order: 4 },
      { id: 5, platform: 'whatsapp', title: 'WhatsApp', url: 'https://wa.me/94771234567', icon: 'PhoneCall', is_active: 1, display_order: 5 },
      { id: 6, platform: 'email', title: 'Email', url: 'mailto:kavindu@auradigital.lk', icon: 'Mail', is_active: 1, display_order: 6 }
    ],

    messages: [
      {
        id: 1,
        name: 'Kasun Bandara',
        email: 'kasun@ceylonventures.lk',
        phone: '+94 71 888 9900',
        project_type: 'E-Commerce Platform',
        budget: '$1,500 - $3,000',
        message: 'Hi Kavindu, we love your work on Bharana Books. We are looking to build a high-performance luxury tea marketplace targeting global customers. Would love to schedule a consultation call this week.',
        is_read: 0,
        created_at: '2026-09-20T14:15:00Z'
      },
      {
        id: 2,
        name: 'Elena Rostova',
        email: 'elena@novatech.co',
        phone: '+44 7911 123456',
        project_type: 'Custom Web Application',
        budget: '$3,000 - $5,000',
        message: 'Hello Kavindu! Our London-based team needs a custom admin dashboard with real-time financial analytics. Your portfolio aesthetic is exactly the futuristic editorial feel we want.',
        is_read: 1,
        created_at: '2026-09-18T09:40:00Z'
      }
    ],

    site_settings: {
      site_name: 'Kavindu Nimesh Portfolio',
      meta_title: 'Kavindu Nimesh — Software Engineer & Web Developer | Aura Digital Sri Lanka',
      meta_description: 'Portfolio of Kavindu Nimesh, Software Engineer & Web Developer. Founder of Aura Digital Developer Sri Lanka. Crafting award-winning web platforms, e-commerce systems, and admin dashboards.',
      contact_email: 'kavindu@auradigital.lk',
      contact_phone: '+94 77 123 4567',
      contact_whatsapp: '+94 77 123 4567',
      hero_tagline: 'BUILDING DIGITAL EXPERIENCES.',
      hero_subtagline: 'CODE. DESIGN. DIGITAL IMPACT.',
      accent_color: '#ffffffff',
      primary_bg: '#050505',
      enable_sound: true,
      enable_cursor: true
    }
  };

  const dbPath = path.join(__dirname, 'db.json');
  fs.writeFileSync(dbPath, JSON.stringify(seedData, null, 2), 'utf8');
  console.log('✅ Database successfully seeded at:', dbPath);
  console.log('🔐 Default Admin Credentials:');
  console.log('   Email: admin@kavindu.dev');
  console.log('   Password: Admin@2026!');
  return seedData;
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed error:', err);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
