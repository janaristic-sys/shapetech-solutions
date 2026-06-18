import type {
  AboutContent,
  BlogPost,
  Client,
  ContactSubmission,
  FaqItem,
  HeroContent,
  Industry,
  Partner,
  PortfolioItem,
  Shape,
  SiteSettings,
  Solution,
  TeamMember,
  Testimonial,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ---------------------------------------------------------------------------
// Fallback defaults — used while backend bindings are not yet generated
// ---------------------------------------------------------------------------

const defaultSettings: SiteSettings = {
  siteName: "ShapeTech Solutions",
  tagline: "Shaping the Future of Your Business",
  email: "hello@shapetechsolutions.com",
  phone: "+1 (941) 000-0000",
  address: "Sarasota, Florida, USA & Niš, Serbia",
  linkedinUrl: "https://linkedin.com/company/shapetechsolutions",
  twitterUrl: "https://twitter.com/shapetechsol",
};const defaultHero: HeroContent = {
  headline: "Commerce Solutions That Power Global Volume",
  subheadline:
    "We build and grow specialized commerce solutions for niche use cases, collectively powering $100s of Millions in annual volume across dozens of countries.",
  ctaPrimary: "Explore Solutions",
  ctaSecondary: "Contact Us",
  ctaPrimaryUrl: "/solutions",
  ctaSecondaryUrl: "/contact",
};

const defaultAbout: AboutContent = {
  title: "Your Engineering Team for the Long Haul",
  body: "ShapeTech Solutions is an international team of specialists dedicated to building and integrating custom-built software solutions. Where standard software falls short, we step in. We engineer custom tools specifically designed to handle your most complex operational hurdles.",
  mission:
    "To build and grow specialized commerce solutions that solve our clients' complex commerce problems and scale their long-term growth.",
  vision:
    "To power the world's niche commerce use cases through robust, scalable, and beautifully designed technology products.",
  yearsInBusiness: 8,
  projectsDelivered: 150,
  clientsSatisfied: 95,
};

const defaultClients: Client[] = [
  { id: 1n, name: "Crunchi", logoUrl: "https://logo.clearbit.com/crunchi.com", websiteUrl: "https://crunchi.com", sortOrder: 1n, solutionSlug: "crunchi" },
  { id: 2n, name: "NewULife", logoUrl: "https://logo.clearbit.com/newulife.com", websiteUrl: "https://newulife.com", sortOrder: 2n, solutionSlug: "newulife" },
  { id: 3n, name: "Nuvita", logoUrl: "https://logo.clearbit.com/nuvitaglobal.com", websiteUrl: "https://nuvitaglobal.com", sortOrder: 3n, solutionSlug: "nuvita" },
  { id: 4n, name: "FASTer Way to Fat Loss", logoUrl: "", websiteUrl: "https://fasterwaytoweightloss.com", sortOrder: 4n, solutionSlug: "faster-way" },
  { id: 5n, name: "Wine Shop at Home", logoUrl: "https://logo.clearbit.com/wineshopathome.com", websiteUrl: "https://wineshopathome.com", sortOrder: 5n, solutionSlug: "wine-shop-at-home" },
  { id: 6n, name: "Reliv", logoUrl: "https://logo.clearbit.com/reliv.com", websiteUrl: "https://reliv.com", sortOrder: 6n, solutionSlug: "reliv" },
  { id: 7n, name: "Sana Vita", logoUrl: "/images/sana-vita-logo.png", websiteUrl: "https://sanavita.com", sortOrder: 7n, solutionSlug: "sana-vita" },
  { id: 8n, name: "Li Bri", logoUrl: "", websiteUrl: "https://libri.com", sortOrder: 8n, solutionSlug: "li-bri" },
];

const defaultIndustries: Industry[] = [
  {
    id: 1n,
    title: "Direct Selling & Affiliate Models",
    description:
      "We build the tools that direct selling and affiliate-driven businesses need — distributor portals, commission engines, referral tracking, and replicated storefronts that handle real volume.",
    iconName: "Users",
    slug: "direct-selling",
    sortOrder: 1n,
    highlights: ["Commission Engines", "Distributor Portals", "Referral Tracking"],
    featured: true,
    relatedSolutionIds: [3n, 5n],
  },
  {
    id: 2n,
    title: "Health & Wellness",
    description:
      "High-transaction platforms built for supplement brands, wellness companies, and nutraceutical distributors that need compliance-ready, scalable infrastructure.",
    iconName: "HeartPulse",
    slug: "health-wellness",
    sortOrder: 2n,
    highlights: ["Supplement E-commerce", "Compliance Tools", "Wellness Platforms"],
    featured: true,
    relatedSolutionIds: [3n, 6n],
  },
  {
    id: 3n,
    title: "Complex Subscriptions",
    description:
      "Recurring billing, automated dunning, cohort management, and custom product builders — we handle subscription complexity so you don't have to.",
    iconName: "RefreshCcw",
    slug: "subscriptions",
    sortOrder: 3n,
    highlights: ["Cohort Billing", "Automated Dunning", "Product Bundling"],
    featured: true,
    relatedSolutionIds: [4n],
  },
  {
    id: 4n,
    title: "Fundraising",
    description:
      "Custom fundraising platforms with donor engagement tools, gamified loyalty programs, and the back-office infrastructure that keeps organizations running.",
    iconName: "Landmark",
    slug: "fundraising",
    sortOrder: 4n,
    highlights: ["Donor Portals", "Gamified Giving", "Engagement Tracking"],
    featured: true,
    relatedSolutionIds: [1n],
  },
];const defaultShapes: Shape[] = [
  {
    id: 1n,
    slug: "medusa-direct",
    title: "Medusa Direct",
    tagline: "Headless commerce, built for scale",
    description:
      "Our Medusa-based commerce engine powers fully custom storefronts and back-office systems. We build on top of Medusa to handle the unique requirements of direct selling, subscriptions, and distributor networks.",
    iconName: "ShoppingCart",
    sortOrder: 1n,
    capabilities: [
      "Custom headless storefronts",
      "Distributor back-office",
      "Commission-aware checkout",
      "High-volume order management",
    ],
  },
  {
    id: 2n,
    slug: "xtrapoints",
    title: "XtraPoints",
    tagline: "Incentives & loyalty engine",
    description:
      "A centralized incentives platform for managing loyalty points, custom bonuses, product vouchers, and promotional rules. Built to run alongside any commission or e-commerce stack.",
    iconName: "Star",
    sortOrder: 2n,
    capabilities: [
      "Points & rewards ledger",
      "Custom promotion rules",
      "Voucher management",
      "Performance dashboards",
    ],
  },
  {
    id: 3n,
    slug: "dmv",
    title: "DMV",
    tagline: "Distributor management & back-office",
    description:
      "DMV is our distributor management platform — a complete back-office for direct selling companies. It handles genealogy trees, rank tracking, commission calculations, and field-facing dashboards.",
    iconName: "Network",
    sortOrder: 3n,
    capabilities: [
      "Genealogy tree management",
      "Rank advancement tracking",
      "Real-time commission engine",
      "Replicated distributor sites",
    ],
  },
  {
    id: 4n,
    slug: "shopify-direct",
    title: "Shopify Direct",
    tagline: "Shopify meets direct selling",
    description:
      "Shopify Direct bridges the gap between Shopify's world-class checkout and the complex requirements of network marketing. Commission tracking, replicated storefronts, and field link integrity — all intact.",
    iconName: "Globe",
    sortOrder: 4n,
    capabilities: [
      "Shopify Plus extensions",
      "Replicated distributor stores",
      "Field link integrity",
      "Compensation plan matching",
    ],
  },
];

const defaultSolutions: Solution[] = [
  {
    id: 1n,
    title: "Crunchi",
    tagline: "Headless Shopify & Representative Platform",
    description: "We engineered a clean headless Shopify Plus storefront for Crunchi's high-growth cosmetic brand. We designed a custom attribution system for their independent reps, allowing customers to easily support their favorite rep during checkout. The solution includes real-time dashboards for representatives to track their team structure, retail commission earnings, and sales volume.",
    iconName: "Sparkles",
    slug: "crunchi",
    sortOrder: 1n,
    features: ["Shopify Plus storefront", "Affiliate attribution", "Custom checkout", "Rep dashboards"],
    relatedShapeIds: [4n],
    caseStudy: {
      title: "Affiliate Storefront",
      description: "Built the full storefront and attribution layer for Crunchi's growing network of independent beauty reps.",
      metrics: [],
    },
    technologies: ["Shopify Plus", "Next.js", "GraphQL", "Tailwind CSS"],
    industryName: "Clean Beauty & Cosmetics",
  },
  {
    id: 2n,
    title: "NewULife",
    tagline: "Replicated Storefronts & Integrations",
    description: "We engineered and deployed high-performance replicated distributor websites and customer storefronts for NewULife's global network. We did nothing with their commission engine or back-office system outside of integrating our storefronts with their existing APIs to sync user tracking and sales data. This system delivers a modern, fast shopping experience while maintaining accurate affiliate credit.",
    iconName: "Users",
    slug: "newulife",
    sortOrder: 2n,
    features: ["Replicated distributor sites", "Seamless API integrations", "Customer storefronts", "Data synchronization"],
    relatedShapeIds: [],
    caseStudy: {
      title: "Replicated Websites & Integrations",
      description: "Integrated custom replicated marketing storefronts with NewULife's direct selling back-office APIs.",
      metrics: [],
    },
    technologies: ["Replicated Websites", "React", "Node.js", "API Integrations"],
    industryName: "Health & Wellness",
  },
  {
    id: 3n,
    title: "Nuvita",
    tagline: "Distributor Portal & Commission Platform",
    description: "We architected a real-time commission engine and distributor portal for Nuvita's nutraceutical sales network. The platform offers direct selling members live progress tracking towards ranking goals, detailed genealogy trees, and instant payouts. This allows their field team to monitor sales volumes and commissions in real-time, greatly increasing engagement and retention.",
    iconName: "HeartPulse",
    slug: "nuvita",
    sortOrder: 3n,
    features: ["Distributor portal", "Real-time commissions", "Genealogy trees", "Payout management"],
    relatedShapeIds: [3n],
    caseStudy: {
      title: "Real-time Commission Platform",
      description: "Replaced a legacy payout system with real-time tracking across Nuvita's distributor network.",
      metrics: [],
    },
    technologies: ["Motoko", "Internet Computer (ICP)", "React", "Tailwind CSS"],
    industryName: "Nutraceuticals & Health",
  },
  {
    id: 4n,
    title: "FASTer Way to Fat Loss",
    tagline: "Subscription & Coaching Commerce Platform",
    description: "We designed and deployed a cohort billing and subscription management platform for FASTer Way to Fat Loss's coaching and fitness program. The system manages recurring billing cycles, dunning automation, and coupon/discount routing across a database of thousands of active subscribers. The platform integrates seamlessly with their mobile application and training portal.",
    iconName: "RefreshCcw",
    slug: "faster-way",
    sortOrder: 4n,
    features: ["Subscription management", "Cohort billing", "Coaching integrations", "Dunning automation"],
    relatedShapeIds: [1n],
    caseStudy: {
      title: "Subscription Commerce",
      description: "Built the subscription engine powering FASTer Way to Fat Loss's high-volume coaching and wellness program.",
      metrics: [],
    },
    technologies: ["MedusaJS", "Stripe", "Next.js", "PostgreSQL"],
    industryName: "Fitness & Wellness Coaching",
  },
  {
    id: 5n,
    title: "Wine Shop at Home",
    tagline: "Consultant-Led Direct Selling Platform",
    description: "We engineered a consultant-led e-commerce and direct selling portal for Wine Shop at Home. The application handles multi-tier commission structures, replicated consultant websites, and regional licensing compliance for wine shipments. The platform enables independent consultants to host online wine tastings and process party orders on any device.",
    iconName: "Users",
    slug: "wine-shop-at-home",
    sortOrder: 5n,
    features: ["Multi-tier commissions", "Replicated websites", "Consultant portal", "Order management"],
    relatedShapeIds: [1n, 4n],
    caseStudy: {
      title: "Consultant Scaling",
      description: "Built the infrastructure to support Wine Shop at Home's growing network of independent consultants.",
      metrics: [],
    },
    technologies: ["Shopify Plus", "React", "Node.js", "SQL Server"],
    industryName: "Food & Beverage / Wine",
  },
  {
    id: 6n,
    title: "Reliv",
    tagline: "Multi-Country Points & E-Wallet System",
    description: "We built a multi-country points wallet and localization engine for Reliv's global direct sales system. The solution handles multi-currency transactions, country-specific catalogs, and automated VAT/tax calculations across European and American markets. Distributors earn points in their e-wallet that can be redeemed for products or cash rewards across different regions.",
    iconName: "Globe",
    slug: "reliv",
    sortOrder: 6n,
    features: ["Multi-country catalogs", "Points wallet", "Medusa integration", "Localization engine"],
    relatedShapeIds: [2n],
    caseStudy: {
      title: "Global E-Wallet",
      description: "Deployed Reliv's points-to-perks platform across European and North American markets.",
      metrics: [],
    },
    technologies: ["MedusaJS", "Next.js", "Tailwind CSS", "E-Wallet System"],
    industryName: "Dietary Supplements",
  },
  {
    id: 7n,
    title: "Sana Vita",
    tagline: "Wellness Commerce & Distribution Platform",
    description: "We created a unified commerce and distribution platform for Sana Vita's organic wellness product line. The platform integrates distributor onboarding, inventory tracking, replicated marketing pages, and automated subscription orders into a single, cohesive dashboard. The custom storefront offers customers seamless checkouts with integrated subscription options.",
    iconName: "HeartPulse",
    slug: "sana-vita",
    sortOrder: 7n,
    features: ["Wellness storefront", "Distributor management", "Subscription orders", "Compliance tools"],
    relatedShapeIds: [1n, 3n],
    caseStudy: {
      title: "Wellness Distribution",
      description: "Built the unified commerce and distribution platform for Sana Vita's wellness product catalog.",
      metrics: [],
    },
    technologies: ["Custom Storefront", "Motoko", "ICP Canisters", "React"],
    industryName: "Organic Health & Wellness",
  },
  {
    id: 8n,
    title: "Li Bri",
    tagline: "Direct Selling Storefront & Back-Office",
    description: "We developed a high-performance direct sales storefront and affiliate tracking solution for Li Bri's natural skincare catalog. The platform features replicated representative websites, order routing, and a clean distributor dashboard for tracking commission tiers. The user interface was optimized for speed, resulting in double-digit increases in mobile conversion rates.",
    iconName: "Sparkles",
    slug: "li-bri",
    sortOrder: 8n,
    features: ["Custom storefront", "Affiliate tracking", "Back-office portal", "Order management"],
    relatedShapeIds: [4n],
    caseStudy: {
      title: "Affiliate Storefront",
      description: "Built the storefront and affiliate infrastructure supporting Li Bri's direct sales network.",
      metrics: [],
    },
    technologies: ["Tailwind CSS", "Next.js", "Node.js", "MongoDB"],
    industryName: "Natural Skincare & Beauty",
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1n,
    authorName: "Michael Torres",
    authorTitle: "VP of Technology",
    company: "Direct Selling Company",
    quote:
      "ShapeTech built our entire distributor back-office and commission engine from scratch. What used to take our team days to calculate now runs automatically in real time. The impact on our business has been transformative.",
    avatarUrl: "",
    sortOrder: 1n,
  },
  {
    id: 2n,
    authorName: "Jennifer Walsh",
    authorTitle: "Chief Operating Officer",
    company: "Network Marketing Brand",
    quote:
      "We'd been burned by developers who didn't understand direct selling. ShapeTech was different — they understood our compensation plan, asked the right questions, and delivered exactly what we needed. Our reps love the new back-office.",
    avatarUrl: "",
    sortOrder: 2n,
  },
  {
    id: 3n,
    authorName: "David Reeves",
    authorTitle: "Founder & CEO",
    company: "Growth-Stage Startup",
    quote:
      "The ShapeTech team felt like an extension of our own team from day one. They were proactive, transparent, and delivered a product we're genuinely proud of. We've been working together for over two years now.",
    avatarUrl: "",
    sortOrder: 3n,
  },
];

const defaultPortfolio: PortfolioItem[] = [
  {
    id: 1n,
    title: "Distributor Back-Office Platform",
    description:
      "A full-featured distributor management system for a mid-sized direct selling company — real-time genealogy trees, rank advancement tracking, commission calculation, and a replicated website engine serving 10,000+ reps.",
    imageUrl: "",
    clientName: "Confidential · Direct Selling",
    tags: ["Direct Selling", "React", "Node.js", "Commission Engine"],
    launchDate: "2024",
    sortOrder: 1n,
  },
  {
    id: 2n,
    title: "HubSpot + Shopify Integration Suite",
    description:
      "End-to-end integration connecting a direct selling platform to both HubSpot CRM and Shopify — automating order syncing, rep onboarding workflows, and customer lifecycle management across all three systems.",
    imageUrl: "",
    clientName: "Confidential · Network Marketing",
    tags: ["HubSpot", "Shopify", "Integrations", "Automation"],
    launchDate: "2024",
    sortOrder: 2n,
  },
  {
    id: 3n,
    title: "Custom Mobile App for Field Reps",
    description:
      "iOS and Android app for a direct selling organization's field representatives — real-time downline activity, order placement, event management, and in-app training content all in one unified experience.",
    imageUrl: "",
    clientName: "Confidential · Direct Selling",
    tags: ["React Native", "iOS", "Android", "Mobile"],
    launchDate: "2023",
    sortOrder: 3n,
  },
];

const defaultFaq: FaqItem[] = [
  {
    id: 1n,
    question:
      "Do you specialize in direct selling and network marketing software?",
    answer:
      "Yes — direct selling is our flagship vertical. We have deep experience building the technology that direct selling companies need: commission and bonus engines, distributor back-offices, genealogy trees, replicated websites, order management, and rank advancement systems. We understand the nuances of compensation plan logic and the compliance requirements specific to the industry.",
    sortOrder: 1n,
  },
  {
    id: 2n,
    question: "Can you integrate with HubSpot and Shopify?",
    answer:
      "Absolutely. We've built numerous integrations connecting direct selling platforms to HubSpot CRM and Shopify. This includes syncing rep, customer, and order data in real time, automating onboarding and sales workflows, and creating unified dashboards that give leadership a single view of the business.",
    sortOrder: 2n,
  },
  {
    id: 3n,
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. A focused integration or feature addition typically takes 4–8 weeks. A full distributor back-office or custom platform is usually 3–6 months. We always start with a discovery phase to map requirements and produce a detailed timeline estimate before any development begins.",
    sortOrder: 3n,
  },
  {
    id: 4n,
    question: "Where is your team located?",
    answer:
      "We have offices in Sarasota, Florida and Niš, Serbia. Our team of 50+ includes business consultants, developers, and designers working across both locations. This gives us the advantage of US-based leadership and client communication with a highly skilled, cost-effective development team.",
    sortOrder: 4n,
  },
  {
    id: 5n,
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We offer flexible support and maintenance retainers that include bug fixes, performance monitoring, security updates, and ongoing feature development. Many of our clients have worked with us for multiple years as their technology evolves.",
    sortOrder: 5n,
  },
  {
    id: 6n,
    question: "How do you handle intellectual property?",
    answer:
      "All code, designs, and deliverables created for your project are fully transferred to you upon project completion and final payment. We sign IP assignment agreements as standard practice on every engagement.",
    sortOrder: 6n,
  },
];

const defaultTeam: TeamMember[] = [
  {
    id: 1n,
    name: "Gordon Hester",
    role: "Co-Founder & Chairman of the Board",
    bio: 'Gordon is a 30+ year veteran of direct selling with experience on both the field and operations side of the business. He co-founded ShapeTech Solutions in 2018 to provide transformative technology solutions for direct selling businesses worldwide. He is the author of "Positioned Right: The Forces Shaping the Future of Direct Selling and Network Marketing" and sits on the DSA/DSEF Board.',
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "Connor Hester",
    role: "Co-Founder & CEO",
    bio: "Connor spends most of his time using an overly complex story or analogy to explain something that could have been said in a few words. However, when not annoying the staff, Connor works on helping to develop new business, managing client projects ranging from product launches to company modernization projects and overall, leading the continued scaling of the ShapeTech operations. He has worked with over a half-dozen companies ranging from pre-product startups to $100 million+ in revenue. He can constantly be found either reading a new book or on the tennis court.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Saša Veličković",
    role: "Co-Founder & Client Manager",
    bio: "Probably the first person you'll meet from our team, Saša will help define the problem and suggest ways to fix it. He knows what everyone on the team does, understands the processes and works with others to define the project. His job includes client communication, business analysis and problem-solving. Saša has a way of making others feel better, motivating them and supporting them, which makes him a great Client Manager, Colleague and Mentor.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "Nenad Andrejević",
    role: "Co-Founder & Chief Technology Officer",
    bio: "Nenad is a co-founder and the technical backbone of ShapeTech Solutions. As Chief Technology Officer, he oversees the architecture and delivery of complex full-stack solutions, ensuring our technology choices are always aligned with client goals and industry best practices.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 4n,
  },
  {
    id: 5n,
    name: "Darko Milenković",
    role: "Co-Founder & Creative Director",
    bio: "Darko is a Senior Web and Graphic designer passionate about making people see things his way. He has worked on a vast range of projects; whatever request you can think of he's probably done it for one of our clients. His greatest abilities include Visual Identity, UX, designing graphics and photo manipulation. Internally, he is our Creative Director, Mentor and Team Lead to the Creative team.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 5n,
  },
  {
    id: 6n,
    name: "Dušan Mitrović",
    role: "Co-Founder & Managing Partner",
    bio: "Dušan is a co-founder and Managing Partner at ShapeTech Solutions. He brings deep expertise in full-stack development and project delivery, helping guide the engineering team toward scalable and robust solutions for clients across the direct selling and technology sectors.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 6n,
  },
  {
    id: 7n,
    name: "Miodrag Vidojković",
    role: "VP of Operations",
    bio: "Miodrag oversees day-to-day operations at ShapeTech Solutions, ensuring projects run smoothly from kickoff to delivery. His operational expertise keeps the team aligned and clients informed, making him the anchor of ShapeTech's delivery process.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 7n,
  },
  {
    id: 8n,
    name: "Nemanja Jotić",
    role: "VP of Finances",
    bio: "Nemanja manages the financial health of ShapeTech Solutions, overseeing budgeting, forecasting, and financial strategy. His expertise ensures the company remains well-positioned for sustainable growth and continued investment in talent and technology.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 8n,
  },
  {
    id: 9n,
    name: "Nikola Olarić",
    role: "Back-end Developer",
    bio: "Nikola is a back-end developer at ShapeTech Solutions, specializing in building robust and scalable server-side systems. He works closely with the team to deliver clean, efficient code that powers ShapeTech's client solutions.",
    avatarUrl: "",
    linkedinUrl: "",
    sortOrder: 9n,
  },
];

const defaultPartners: Partner[] = [
  {
    id: 1n,
    name: "Medusa",
    logoUrl: "",
    websiteUrl: "https://medusajs.com",
    description: "We leverage the Medusa ecosystem to build high-performance, custom headless commerce engines, engineering custom middleware on top of it to handle specific commission tracking and referral models.",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "LPT",
    logoUrl: "",
    websiteUrl: "#",
    description: "As a featured partner, we specialize in building custom overlays and unique tools tailored specifically for the LPT environment to bridge the gap with your specific business strategy.",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Shopify",
    logoUrl: "",
    websiteUrl: "https://shopify.com",
    description: "We act as the intelligent bridge between Shopify and your existing commission engine, protecting your field with accurate tracking and link integrity.",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "HubSpot",
    logoUrl: "",
    websiteUrl: "https://hubspot.com",
    description: "Our middleware establishes an automatic sync between your Commission Engine and HubSpot, transforming fractured data into real-time marketing power.",
    sortOrder: 4n,
  },
  {
    id: 5n,
    name: "ByDesign",
    logoUrl: "",
    websiteUrl: "https://bydesign.com",
    description: "We specialize in personalizing and integrating best-in-class third-party applications to build a custom architecture around your existing ByDesign commission platform.",
    sortOrder: 5n,
  },
  {
    id: 6n,
    name: "Dotdigital",
    logoUrl: "",
    websiteUrl: "https://dotdigital.com",
    description: "Integrating advanced marketing automation to trigger personalized celebratory messaging and performance tracking based on real-time data flow.",
    sortOrder: 6n,
  },
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1n,
    slug: "shopify-direct-launch",
    title: 'ShapeTech Solutions Launches "Shopify Direct" Integration for Global Markets.',
    excerpt: "A technical deep-dive into how our new middleware acts as an intelligent bridge.",
    content: "ShapeTech Solutions has officially launched Shopify Direct, an intelligent middleware integration that connects Shopify's enterprise storefronts with custom multi-level commission structures. This release solves the historical conflict between fast, modern checkout flows and complex genealogy attribution logic.",
    coverImageUrl: "",
    authorName: "Connor Hester",
    publishedAt: "2026-05-15",
    tags: ["Product Launch", "Shopify Plus", "Integration"],
    published: true,
  },
  {
    id: 2n,
    slug: "global-footprint-expansion",
    title: "Expanding the Global Footprint: New Strategic Operations in International Markets.",
    excerpt: "Solving for international complexity and data fragmentation across regional portals.",
    content: "To support client expansion across Europe and the Americas, ShapeTech Solutions is establishing dedicated multi-region hosting and automated data-residency compliance nodes. This expansion streamlines regional portal synchronizations and multi-currency transactions.",
    coverImageUrl: "",
    authorName: "Saša Veličković",
    publishedAt: "2026-04-20",
    tags: ["Global Expansion", "Infrastructure", "Compliance"],
    published: true,
  },
  {
    id: 3n,
    slug: "xtra-points-promotion-engine",
    title: 'The Future of Incentives: Introducing the "Xtra Points" Promotion Engine.',
    excerpt: "A powerful engine supporting product bundles, coupon codes, and centralized performance dashboards.",
    content: "Our newly refined incentives shape, Xtra Points, provides a centralized hub to track loyalty points, custom bonuses, and product vouchers. Its robust transaction ledger allows merchants to configure flexible rewards programs without affecting core accounting data.",
    coverImageUrl: "",
    authorName: "Nenad Andrejević",
    publishedAt: "2026-03-10",
    tags: ["Incentives", "Loyalty", "Software Architecture"],
    published: true,
  },
  {
    id: 4n,
    slug: "hubspot-commission-sync",
    title: "Real-time data flow synchronization updates between HubSpot and major commission engines.",
    excerpt: "Optimizing sub-second synchronization and data reconciliation for enterprise marketing pipelines.",
    content: "We have shipped sub-second data synchronization protocols for our CRM Direct bridge. Marketing teams can now access real-time distributor performance metrics, enrollment milestones, and compensation events directly inside their HubSpot automation flows.",
    coverImageUrl: "",
    authorName: "Nenad Andrejević",
    publishedAt: "2026-02-18",
    tags: ["CRM Direct", "HubSpot", "Data Sync"],
    published: true,
  },
];

// ---------------------------------------------------------------------------
// Query hooks
// ---------------------------------------------------------------------------

export function useSettings() {
  return useQuery<SiteSettings>({
    queryKey: ["settings"],
    queryFn: async () => defaultSettings,
  });
}

export function useHero() {
  return useQuery<HeroContent>({
    queryKey: ["hero"],
    queryFn: async () => defaultHero,
  });
}

export function useAbout() {
  return useQuery<AboutContent>({
    queryKey: ["about"],
    queryFn: async () => defaultAbout,
  });
}

export function useClients() {
  return useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => defaultClients,
  });
}

export function useIndustries() {
  return useQuery<Industry[]>({
    queryKey: ["industries"],
    queryFn: async () => defaultIndustries,
  });
}

export function useShapes() {
  return useQuery<Shape[]>({
    queryKey: ["shapes"],
    queryFn: async () => defaultShapes,
  });
}

export function useSolutions() {
  return useQuery<Solution[]>({
    queryKey: ["solutions"],
    queryFn: async () => defaultSolutions,
  });
}

export function useSolutionsByIndustry(industryId?: bigint) {
  return useQuery<Solution[]>({
    queryKey: ["solutions", "industry", industryId?.toString()],
    queryFn: async () => {
      if (!industryId) return [];
      const industry = defaultIndustries.find((i) => i.id === industryId);
      if (!industry || !industry.relatedSolutionIds) return [];
      return defaultSolutions.filter((s) =>
        industry.relatedSolutionIds?.includes(s.id)
      );
    },
    enabled: !!industryId,
  });
}

export function useSolutionsByShape(shapeId?: bigint) {
  return useQuery<Solution[]>({
    queryKey: ["solutions", "shape", shapeId?.toString()],
    queryFn: async () => {
      if (!shapeId) return [];
      // This is a reverse lookup: find solutions that include this shapeId in their relatedShapeIds
      return defaultSolutions.filter((s) =>
        s.relatedShapeIds?.includes(shapeId)
      );
    },
    enabled: !!shapeId,
  });
}

export function useShapesBySolution(solutionId?: bigint) {
  return useQuery<Shape[]>({
    queryKey: ["shapes", "solution", solutionId?.toString()],
    queryFn: async () => {
      if (!solutionId) return [];
      const solution = defaultSolutions.find((s) => s.id === solutionId);
      if (!solution || !solution.relatedShapeIds) return [];
      return defaultShapes.filter((sh) =>
        solution.relatedShapeIds?.includes(sh.id)
      );
    },
    enabled: !!solutionId,
  });
}

export function useTestimonials() {
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => defaultTestimonials,
  });
}

export function usePortfolio() {
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolio"],
    queryFn: async () => defaultPortfolio,
  });
}

export function useFaq() {
  return useQuery<FaqItem[]>({
    queryKey: ["faq"],
    queryFn: async () => defaultFaq,
  });
}

export function useTeam() {
  return useQuery<TeamMember[]>({
    queryKey: ["team"],
    queryFn: async () => defaultTeam,
  });
}

export function usePartners() {
  return useQuery<Partner[]>({
    queryKey: ["partners"],
    queryFn: async () => defaultPartners,
  });
}

export function useBlogPosts(publishedOnly = true) {
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", publishedOnly],
    queryFn: async () =>
      publishedOnly
        ? defaultBlogPosts.filter((p) => p.published)
        : defaultBlogPosts,
  });
}

export function useContactSubmissions() {
  return useQuery<ContactSubmission[]>({
    queryKey: ["contactSubmissions"],
    queryFn: async () => [],
  });
}

// ---------------------------------------------------------------------------
// Mutation hooks (admin)
// ---------------------------------------------------------------------------

export function useUpdateHero() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<HeroContent>) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["hero"] }),
  });
}

export function useUpdateAbout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<AboutContent>) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["about"] }),
  });
}

export function useAddClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Client, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clients"] }),
  });
}

export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clients"] }),
  });
}

export function useAddTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<Testimonial, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useAddPortfolioItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<PortfolioItem, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolio"] }),
  });
}

export function useDeletePortfolioItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolio"] }),
  });
}

export function useAddBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<BlogPost, "id">) => data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => id,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: Omit<ContactSubmission, "id" | "submittedAt">) =>
      data,
  });
}
