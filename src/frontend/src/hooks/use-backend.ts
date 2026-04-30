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
  siteName: "Shapetech Solutions",
  tagline: "Shaping the Future of Your Business",
  email: "hello@shapetechsolutions.com",
  phone: "+1 (941) 000-0000",
  address: "Sarasota, Florida, USA & Niš, Serbia",
  linkedinUrl: "https://linkedin.com/company/shapetechsolutions",
  twitterUrl: "https://twitter.com/shapetechsol",
};

const defaultHero: HeroContent = {
  headline: "Shaping the Future of Your Business",
  subheadline:
    "We are a boutique tech design and full-stack development firm helping companies leverage technology to transform their business.",
  ctaPrimary: "Get Started",
  ctaSecondary: "View Our Work",
  ctaPrimaryUrl: "/contact",
  ctaSecondaryUrl: "/solutions",
};

const defaultAbout: AboutContent = {
  title: "A Boutique Firm That Thinks Like Your Partner",
  body: "ShapeTech Solutions is a boutique tech design and full-stack development firm with offices in Sarasota, Florida and Niš, Serbia. We are an international team of 50+ business consultants, developers, and designers who help companies leverage technology to transform their business.",
  mission:
    "To help companies of all sizes leverage technology to transform their operations, accelerate growth, and build a competitive advantage.",
  vision:
    "A world where innovative technology is accessible to every ambitious business, regardless of size or geography.",
  yearsInBusiness: 5,
  projectsDelivered: 50,
  clientsSatisfied: 95,
};

const defaultClients: Client[] = [
  { id: 1n, name: "Crunchi", logoUrl: "https://logo.clearbit.com/crunchi.com", websiteUrl: "https://crunchi.com", sortOrder: 1n },
  { id: 2n, name: "New U Life", logoUrl: "https://logo.clearbit.com/newulife.com", websiteUrl: "https://newulife.com", sortOrder: 2n },
  { id: 3n, name: "IDLife", logoUrl: "https://logo.clearbit.com/idlife.com", websiteUrl: "https://idlife.com", sortOrder: 3n },
  { id: 4n, name: "LifePharm", logoUrl: "https://logo.clearbit.com/lifepharm.com", websiteUrl: "https://lifepharm.com", sortOrder: 4n },
  { id: 5n, name: "Nuvita", logoUrl: "https://logo.clearbit.com/nuvitaglobal.com", websiteUrl: "https://nuvitaglobal.com", sortOrder: 5n },
  { id: 6n, name: "Wine Shop at Home", logoUrl: "https://logo.clearbit.com/wineshopathome.com", websiteUrl: "https://wineshopathome.com", sortOrder: 6n },
  { id: 7n, name: "PM International", logoUrl: "https://logo.clearbit.com/pm-international.com", websiteUrl: "https://pm-international.com", sortOrder: 7n },
  { id: 8n, name: "NeoLife", logoUrl: "https://logo.clearbit.com/neolife.com", websiteUrl: "https://neolife.com", sortOrder: 8n },
  { id: 9n, name: "Reliv", logoUrl: "https://logo.clearbit.com/reliv.com", websiteUrl: "https://reliv.com", sortOrder: 9n },
];

const defaultIndustries: Industry[] = [
  {
    id: 1n,
    title: "Digital Products",
    description:
      "Scaling high-volume retail platforms for digital goods with custom headless architectures, robust licensing systems, and fast checkout flows.",
    iconName: "Cpu",
    slug: "digital-products",
    sortOrder: 1n,
    highlights: ["Digital Delivery", "Licensing", "Fast Checkout"],
    featured: false,
  },
  {
    id: 2n,
    title: "Direct-Selling",
    description:
      "Our flagship expertise. We build comprehensive commission engines, distributor back-offices, genealogy trees, and replicated websites that power global networks.",
    iconName: "Network",
    slug: "direct-selling",
    sortOrder: 2n,
    highlights: ["Commission Engines", "Distributor Portals", "Genealogy Trees"],
    featured: true,
  },
  {
    id: 3n,
    title: "Clothing & Apparel",
    description:
      "Bespoke Shopify storefronts and headless commerce solutions designed for modern apparel brands. Advanced variant handling and high-conversion flows.",
    iconName: "ShoppingCart",
    slug: "clothing-apparel",
    sortOrder: 3n,
    highlights: ["Shopify Plus", "Variant Handling", "Headless Frontends"],
    featured: false,
  },
  {
    id: 4n,
    title: "Skincare & Cosmetics",
    description:
      "Tailored solutions for high-growth beauty brands. Product catalog engines, complex subscription logic, and influencer tracking portals.",
    iconName: "Sparkles",
    slug: "skincare-cosmetics",
    sortOrder: 4n,
    highlights: ["Product Catalogs", "Subscription Models", "Influencer Tools"],
    featured: false,
  },
  {
    id: 5n,
    title: "Health & Wellness",
    description:
      "Transforming the wellness industry with technology. We build secure patient portals, habit-tracking apps, and specialized direct selling platforms.",
    iconName: "HeartPulse",
    slug: "health-wellness",
    sortOrder: 5n,
    highlights: ["Wellness Platforms", "Data Privacy", "Patient Portals"],
    featured: false,
  },
  {
    id: 6n,
    title: "Government Services",
    description:
      "Secure, compliant, and highly reliable technology platforms designed for public sector requirements, municipal processes, and state services.",
    iconName: "Landmark",
    slug: "government-services",
    sortOrder: 6n,
    highlights: ["Compliance Focus", "Secure Architetures", "Public Portals"],
    featured: false,
  },
  {
    id: 7n,
    title: "Fundraising",
    description:
      "Specialized platforms to empower donation processing, campaign tracking, and donor management for modern fundraising initiatives.",
    iconName: "Users",
    slug: "fundraising",
    sortOrder: 7n,
    highlights: ["Donation Processing", "Campaign Tracking", "Donor Portals"],
    featured: false,
  },
];

const defaultShapes: Shape[] = [
  {
    id: 1n,
    title: "Credits",
    description: "Flexible, scalable currency systems and point management for modern applications and loyalty programs.",
    iconName: "Zap",
    slug: "credits",
    sortOrder: 1n,
  },
  {
    id: 2n,
    title: "Subscriptions",
    description: "Recurring revenue engines with advanced cohort management and flexible billing cycles.",
    iconName: "RefreshCcw",
    slug: "subscriptions",
    sortOrder: 2n,
  },
  {
    id: 3n,
    title: "Accelerators",
    description: "Pre-built technical foundations that drastically reduce time-to-market for complex architectures.",
    iconName: "Rocket",
    slug: "accelerators",
    sortOrder: 3n,
  },
  {
    id: 4n,
    title: "Shopify Direct",
    description: "Deep, two-way synchronisation between headless fronts, direct-selling engines, and Shopify plus.",
    iconName: "ShoppingCart",
    slug: "shopify-direct",
    sortOrder: 4n,
  },
  {
    id: 5n,
    title: "CRM Direct",
    description: "Seamless bridging between bespoke operational data and enterprise CRMs like HubSpot.",
    iconName: "Users",
    slug: "crm-direct",
    sortOrder: 5n,
  },
];

const defaultSolutions: Solution[] = [
  {
    id: 1n,
    title: "Client Solutions",
    description: "Bespoke, end-to-end commerce architectures and custom application development tailored for complex enterprise requirements.",
    iconName: "Network",
    slug: "client-solutions",
    sortOrder: 1n,
  },
  {
    id: 2n,
    title: "Channel Solutions",
    description: "Purpose-built platforms for specialized sales channels, direct-to-patient environments, and unique go-to-market strategies.",
    iconName: "Plug",
    slug: "channel-solutions",
    sortOrder: 2n,
  },
  {
    id: 3n,
    title: "Xtra Points",
    description: "A proprietary, fully managed loyalty and gamification engine designed to drive retention and lifetime value.",
    iconName: "Star",
    slug: "xtra-points",
    sortOrder: 3n,
  },
  {
    id: 4n,
    title: "DMV POS",
    description: "A specialized point-of-sale solution customized for government services, strict compliance, and complex operational flows.",
    iconName: "Smartphone",
    slug: "dmv-pos",
    sortOrder: 4n,
  },
  {
    id: 5n,
    title: "Explore Solutions",
    description: "Discover our full catalog of successful implementations, case studies, and live client examples.",
    iconName: "LineChart",
    slug: "explore",
    sortOrder: 5n,
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
    name: "Microsoft",
    logoUrl: "",
    websiteUrl: "https://microsoft.com",
    description: "Certified Microsoft Azure partner for cloud solutions.",
    sortOrder: 1n,
  },
  {
    id: 2n,
    name: "AWS",
    logoUrl: "",
    websiteUrl: "https://aws.amazon.com",
    description: "AWS Advanced Consulting Partner.",
    sortOrder: 2n,
  },
  {
    id: 3n,
    name: "Shopify",
    logoUrl: "",
    websiteUrl: "https://shopify.com",
    description: "Shopify Plus Partner for enterprise commerce.",
    sortOrder: 3n,
  },
  {
    id: 4n,
    name: "Stripe",
    logoUrl: "",
    websiteUrl: "https://stripe.com",
    description: "Stripe Verified Partner for payments integration.",
    sortOrder: 4n,
  },
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1n,
    slug: "ai-in-enterprise-2025",
    title: "How AI is Reshaping Enterprise Software in 2025",
    excerpt:
      "From LLM-powered workflows to autonomous agents — a practical look at where AI is creating measurable ROI.",
    content: "",
    coverImageUrl: "",
    authorName: "Priya Nair",
    publishedAt: "2025-03-15",
    tags: ["AI", "Enterprise", "Strategy"],
    published: true,
  },
  {
    id: 2n,
    slug: "design-systems-at-scale",
    title: "Building Design Systems That Scale With Your Team",
    excerpt:
      "The lessons we learned shipping a component library used by 40+ developers across 6 product teams.",
    content: "",
    coverImageUrl: "",
    authorName: "Daniel Kowalski",
    publishedAt: "2025-02-28",
    tags: ["Design", "Systems", "Frontend"],
    published: true,
  },
  {
    id: 3n,
    slug: "zero-downtime-deployments",
    title: "Zero-Downtime Deployments: A Practical Guide",
    excerpt:
      "Blue-green, canary, feature flags — which deployment strategy is right for your scale?",
    content: "",
    coverImageUrl: "",
    authorName: "Alejandro Reyes",
    publishedAt: "2025-01-20",
    tags: ["DevOps", "Cloud", "Engineering"],
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
