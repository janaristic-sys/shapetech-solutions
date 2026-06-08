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
  { id: 1n, name: "Crunchi", logoUrl: "https://logo.clearbit.com/crunchi.com", websiteUrl: "https://crunchi.com", sortOrder: 1n, solutionSlug: "crunchi-storefront" },
  { id: 2n, name: "IDLife", logoUrl: "https://logo.clearbit.com/idlife.com", websiteUrl: "https://idlife.com", sortOrder: 2n, solutionSlug: "idlife-subscriptions" },
  { id: 3n, name: "Nuvita Global", logoUrl: "https://logo.clearbit.com/nuvitaglobal.com", websiteUrl: "https://nuvitaglobal.com", sortOrder: 3n, solutionSlug: "nuvita-global" },
  { id: 4n, name: "Wine Shop at Home", logoUrl: "https://logo.clearbit.com/wineshopathome.com", websiteUrl: "https://wineshopathome.com", sortOrder: 4n, solutionSlug: "wine-shop-at-home" },
  { id: 5n, name: "Reliv International", logoUrl: "https://logo.clearbit.com/reliv.com", websiteUrl: "https://reliv.com", sortOrder: 5n, solutionSlug: "reliv-international" },
  { id: 6n, name: "Sam Houston", logoUrl: "", websiteUrl: "https://samhouston.com", sortOrder: 6n, solutionSlug: "sam-houston" },
];

const defaultIndustries: Industry[] = [
  {
    id: 1n,
    title: "Direct-Selling & Network Models",
    description:
      "We construct distributor portals, commission engines, and mobile applications that power complex, high-volume multi-level marketing structures.",
    iconName: "Users",
    slug: "direct-selling",
    sortOrder: 1n,
    highlights: ["Commission Engines", "Distributor Portals", "Genealogy Trees"],
    featured: true,
    relatedSolutionIds: [3n, 5n],
  },
  {
    id: 2n,
    title: "Subscription & Replenishment Commerce",
    description:
      "Managing complex cohort billing, replenishment cycles, automated dunning, and bespoke product builders for recurring revenue e-commerce.",
    iconName: "RefreshCcw",
    slug: "subscriptions",
    sortOrder: 2n,
    highlights: ["Cohort Billing", "Automated Dunning", "Product Bundling"],
    featured: true,
    relatedSolutionIds: [4n],
  },
  {
    id: 3n,
    title: "Health, Wellness, & Nutraceuticals",
    description:
      "Compliance-focused, high-transaction platforms designed specifically for supplement brands and complex wellness distribution pathways.",
    iconName: "HeartPulse",
    slug: "nutraceuticals",
    sortOrder: 3n,
    highlights: ["Wellness Platforms", "Data Compliance", "Supplement E-commerce"],
    featured: true,
    relatedSolutionIds: [3n, 6n],
  },
];

const defaultShapes: Shape[] = [
  {
    id: 1n,
    slug: "subscriptions",
    title: "Subscriptions",
    tagline: "Bespoke subscription engines",
    description:
      "A bespoke subscription engine engineered for the unique needs of network models. We handle the complexity of recurring billing while ensuring genealogy and commission data stay perfectly synced.",
    iconName: "RefreshCcw",
    sortOrder: 1n,
    capabilities: [
      "Recurring billing trees",
      "Genealogy-synced cohorts",
      "Automated dunning logic",
      "Custom replenishment cycles",
    ],
  },
  {
    id: 2n,
    slug: "credits",
    title: "Credits",
    tagline: "Digital wallet & ledger engine",
    description:
      "This shape provides a robust framework for managing user credits, digital wallets, and internal currency exchanges. (In Development)",
    iconName: "Wallet",
    sortOrder: 2n,
    capabilities: [
      "Bespoke digital wallets",
      "Internal currency ledgers",
      "Cross-border compliance",
      "Multi-wallet transactions",
    ],
  },
  {
    id: 3n,
    slug: "shopify-direct",
    title: "Shopify Direct",
    tagline: "Shopify network marketing bridge",
    description:
      "An intelligent bridge that allows you to leverage Shopify’s world-class speed and reliability while maintaining your bespoke compensation model, replicated sites, and member enrollment flows. It protects your field with accurate commission tracking and link integrity.",
    iconName: "ShoppingCart",
    sortOrder: 3n,
    capabilities: [
      "Shopify Plus checkout extensions",
      "Replicated distributor stores",
      "Field link integrity protection",
      "Compensation plan matching",
    ],
  },
  {
    id: 4n,
    slug: "crm-direct",
    title: "CRM Direct",
    tagline: "Commission & marketing stack sync",
    description:
      "Our integration acts as an automatic sync between your core Commission Engine and your marketing stack, transforming fractured data into actionable intelligence.",
    iconName: "Network",
    sortOrder: 4n,
    capabilities: [
      "Real-time commission syncing",
      "Marketing funnel tracking",
      "Field performance dashboards",
      "Fractured data aggregation",
    ],
  },
];


const defaultSolutions: Solution[] = [
  {
    id: 1n,
    title: "Sam Houston",
    tagline: "Cause-Based Donor Loyalty Platform",
    description: "A custom fundraising platform with gamified donor loyalty powered by CRM Direct, enabling automated perks redemption and engagement leaderboards.",
    iconName: "Landmark",
    slug: "sam-houston",
    sortOrder: 1n,
    features: [
      "Custom fundraising portal",
      "Gamified donor points",
      "Engagement leaderboards",
      "Perks redemption",
    ],
    relatedShapeIds: [4n],
    caseStudy: {
      title: "Donor Loyalty Growth",
      description: "Deployed custom donor gamification modules for Sam Houston, boosting repeat donations and community engagement.",
      metrics: [
        { label: "Repeat Donations", value: "+45%" },
        { label: "Donor Engagement", value: "+30%" },
      ],
    },
  },
  {
    id: 2n,
    title: "Crunchi Storefront",
    tagline: "High-Conversion Affiliate Storefront",
    description: "High-conversion Shopify Plus build for premium skincare with a custom affiliate sales attribution engine.",
    iconName: "Sparkles",
    slug: "crunchi-storefront",
    sortOrder: 2n,
    features: [
      "Shopify Plus storefront",
      "Affiliate attribution",
      "Custom variant selection",
      "Optimized checkout",
    ],
    relatedShapeIds: [3n],
    caseStudy: {
      title: "High-Volume Affiliate Lift",
      description: "Designed and launched the premium storefront integration, handling hundreds of simultaneous representative shopping sessions.",
      metrics: [
        { label: "Conversion Rate", value: "+28%" },
        { label: "Mobile Sales", value: "+55%" },
      ],
    },
  },
  {
    id: 3n,
    title: "Nuvita Global",
    tagline: "Distributor Back-Office & Commission Platform",
    description: "A custom distributor portal and real-time commission engine for nutraceutical sales networks, built on DMV.",
    iconName: "HeartPulse",
    slug: "nuvita-global",
    sortOrder: 3n,
    features: [
      "Distributor portal",
      "Real-time commission logic",
      "Genealogy tree views",
      "Payout management",
    ],
    relatedShapeIds: [1n],
    caseStudy: {
      title: "Real-time Payout Infrastructure",
      description: "Replaced a slow weekly payout system with real-time tracking, empowering distributors with immediate business transparency.",
      metrics: [
        { label: "Payout Latency", value: "< 5s" },
        { label: "Support Tickets", value: "-60%" },
      ],
    },
  },
  {
    id: 4n,
    title: "IDLife Subscriptions",
    tagline: "Headless Subscription E-Commerce Box",
    description: "Headless subscription box e-commerce engine built on Medusa, optimized for high-volume monthly replenishment orders.",
    iconName: "RefreshCcw",
    slug: "idlife-subscriptions",
    sortOrder: 4n,
    features: [
      "Headless Medusa core",
      "Subscription box builder",
      "Dunning automation",
      "Cohort churn tracking",
    ],
    relatedShapeIds: [1n],
    caseStudy: {
      title: "Churn Reduction Re-Engineering",
      description: "Engineered a flexible box builder that allows subscribers to pause, skip, or modify their wellness boxes at will, cutting churn significantly.",
      metrics: [
        { label: "Subscriber Churn", value: "-24%" },
        { label: "Average Order Value", value: "+18%" },
      ],
    },
  },
  {
    id: 5n,
    title: "Wine Shop at Home",
    tagline: "Consultant-Led MLM Platform",
    description: "A direct-selling platform with multi-tiered payout structures and replicated websites for thousands of independent consultants.",
    iconName: "Users",
    slug: "wine-shop-at-home",
    sortOrder: 5n,
    features: [
      "MLM payout structures",
      "Replicated websites",
      "Consultant backend",
      "Resource library",
    ],
    relatedShapeIds: [1n, 3n],
    caseStudy: {
      title: "Consultant Scaling Infrastructure",
      description: "Upgraded legacy direct-selling database schemas to support high-concurrency consult-led sales campaigns during peak holiday months.",
      metrics: [
        { label: "System Uptime", value: "99.99%" },
        { label: "Onboarding Time", value: "-40%" },
      ],
    },
  },
  {
    id: 6n,
    title: "Reliv International",
    tagline: "Multi-Country Points Wallet Engine",
    description: "Multi-country e-commerce platform with global points e-wallet redemption system powered by Credits.",
    iconName: "Globe",
    slug: "reliv-international",
    sortOrder: 6n,
    features: [
      "Multi-country catalogs",
      "Points wallet system",
      "Headless Medusa integration",
      "Localization engine",
    ],
    relatedShapeIds: [2n],
    caseStudy: {
      title: "Global E-Wallet Deployment",
      description: "Deployed the points-to-perks system across European and North American markets with automatic currency and tax adjustments.",
      metrics: [
        { label: "Redemption Volume", value: "$3.5M/yr" },
        { label: "Global Sync", value: "Sub-Second" },
      ],
    },
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
    authorName: "Sasa Velickovic",
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
    authorName: "Nenad Andrejevic",
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
    authorName: "Nenad Andrejevic",
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
