import List  "mo:core/List";
import Time  "mo:core/Time";
import Types "../types/content";

module {
  // ── Counters ───────────────────────────────────────────────────────────────
  public func nextId(counter : { var value : Nat }) : Nat {
    counter.value += 1;
    counter.value;
  };

  // ── Site settings ──────────────────────────────────────────────────────────
  public func getSettings(settings : { var data : ?Types.SiteSettings }) : Types.SiteSettings {
    switch (settings.data) {
      case (?s) s;
      case null {
        {
          companyName  = "Shapetech Solutions";
          tagline      = "Shaping the Future of Your Business";
          phone        = "+1 (941) 123-4567";
          email        = "info@shapetechsolutions.com";
          addressLine1 = "Sarasota, FL, USA";
          addressLine2 = "Niš, Serbia";
          socialLinks  = {
            linkedin  = "https://linkedin.com/company/shapetechsolutions";
            twitter   = "https://twitter.com/shapetechsol";
            github    = "https://github.com/shapetechsolutions";
            facebook  = "https://facebook.com/shapetechsolutions";
            instagram = "https://instagram.com/shapetechsolutions";
          };
        };
      };
    };
  };

  public func updateSettings(settings : { var data : ?Types.SiteSettings }, input : Types.SiteSettings) {
    settings.data := ?input;
  };

  // ── Hero ───────────────────────────────────────────────────────────────────
  public func getHero(hero : { var data : ?Types.HeroContent }) : Types.HeroContent {
    switch (hero.data) {
      case (?h) h;
      case null {
        {
          headline         = "Shaping the Future of Your Business";
          subheading       = "A boutique technology design and full-stack development firm headquartered in Sarasota, FL and Niš, Serbia — delivering scalable software solutions for direct sellers, startups, and mid-market companies.";
          ctaText          = "Get Started";
          ctaLink          = "/contact";
          secondaryCtaText = "Our Work";
          secondaryCtaLink = "/solutions";
        };
      };
    };
  };

  public func updateHero(hero : { var data : ?Types.HeroContent }, input : Types.HeroContent) {
    hero.data := ?input;
  };

  // ── About ──────────────────────────────────────────────────────────────────
  public func getAbout(about : { var data : ?Types.AboutContent }) : Types.AboutContent {
    switch (about.data) {
      case (?a) a;
      case null {
        {
          description = "Shapetech Solutions is a boutique technology company with offices in Sarasota, Florida and Niš, Serbia. We partner with direct selling organizations, high-growth startups, and mid-market companies to architect and build the digital products that drive their next stage of growth.";
          mission     = "To deliver beautifully engineered software solutions that create measurable business value — combining deep technical expertise with strategic design thinking.";
          vision      = "To be the trusted technology partner of choice for companies that refuse to settle for off-the-shelf answers to complex business challenges.";
        };
      };
    };
  };

  public func updateAbout(about : { var data : ?Types.AboutContent }, input : Types.AboutContent) {
    about.data := ?input;
  };

  // ── Clients ────────────────────────────────────────────────────────────────
  public func listClients(clients : List.List<Types.Client>) : [Types.Client] {
    clients.toArray();
  };

  public func addClient(clients : List.List<Types.Client>, counter : { var value : Nat }, input : Types.ClientInput) : Types.Client {
    let item : Types.Client = {
      id         = nextId(counter);
      name       = input.name;
      logoUrl    = input.logoUrl;
      websiteUrl = input.websiteUrl;
      sortOrder  = input.sortOrder;
    };
    clients.add(item);
    item;
  };

  public func updateClient(clients : List.List<Types.Client>, id : Types.Id, input : Types.ClientInput) : ?Types.Client {
    var result : ?Types.Client = null;
    clients.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.Client = { item with name = input.name; logoUrl = input.logoUrl; websiteUrl = input.websiteUrl; sortOrder = input.sortOrder };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deleteClient(clients : List.List<Types.Client>, id : Types.Id) : Bool {
    let before = clients.size();
    let kept = clients.filter(func(item) { item.id != id });
    clients.clear();
    clients.append(kept);
    clients.size() < before;
  };

  // ── Industries ─────────────────────────────────────────────────────────────
  public func listIndustries(items : List.List<Types.Industry>) : [Types.Industry] {
    items.toArray();
  };

  public func addIndustry(items : List.List<Types.Industry>, counter : { var value : Nat }, input : Types.IndustryInput) : Types.Industry {
    let item : Types.Industry = {
      id          = nextId(counter);
      title       = input.title;
      description = input.description;
      iconName    = input.iconName;
      sortOrder   = input.sortOrder;
    };
    items.add(item);
    item;
  };

  public func updateIndustry(items : List.List<Types.Industry>, id : Types.Id, input : Types.IndustryInput) : ?Types.Industry {
    var result : ?Types.Industry = null;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.Industry = { item with title = input.title; description = input.description; iconName = input.iconName; sortOrder = input.sortOrder };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deleteIndustry(items : List.List<Types.Industry>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── Shapes ─────────────────────────────────────────────────────────────────
  public func listShapes(items : List.List<Types.Shape>) : [Types.Shape] {
    items.toArray();
  };

  public func addShape(items : List.List<Types.Shape>, counter : { var value : Nat }, input : Types.ShapeInput) : Types.Shape {
    let item : Types.Shape = {
      id          = nextId(counter);
      title       = input.title;
      description = input.description;
      icon        = input.icon;
      sortOrder   = input.sortOrder;
    };
    items.add(item);
    item;
  };

  public func updateShape(items : List.List<Types.Shape>, id : Types.Id, input : Types.ShapeInput) : ?Types.Shape {
    var result : ?Types.Shape = null;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.Shape = { item with title = input.title; description = input.description; icon = input.icon; sortOrder = input.sortOrder };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deleteShape(items : List.List<Types.Shape>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── Solutions ──────────────────────────────────────────────────────────────
  public func listSolutions(items : List.List<Types.Solution>) : [Types.Solution] {
    items.toArray();
  };

  public func addSolution(items : List.List<Types.Solution>, counter : { var value : Nat }, input : Types.SolutionInput) : Types.Solution {
    let item : Types.Solution = {
      id          = nextId(counter);
      title       = input.title;
      description = input.description;
      icon        = input.icon;
      features    = input.features;
      sortOrder   = input.sortOrder;
    };
    items.add(item);
    item;
  };

  public func updateSolution(items : List.List<Types.Solution>, id : Types.Id, input : Types.SolutionInput) : ?Types.Solution {
    var result : ?Types.Solution = null;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.Solution = { item with title = input.title; description = input.description; icon = input.icon; features = input.features; sortOrder = input.sortOrder };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deleteSolution(items : List.List<Types.Solution>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── Testimonials ───────────────────────────────────────────────────────────
  public func listTestimonials(items : List.List<Types.Testimonial>) : [Types.Testimonial] {
    items.toArray();
  };

  public func addTestimonial(items : List.List<Types.Testimonial>, counter : { var value : Nat }, input : Types.TestimonialInput) : Types.Testimonial {
    let item : Types.Testimonial = {
      id        = nextId(counter);
      name      = input.name;
      title     = input.title;
      company   = input.company;
      quote     = input.quote;
      rating    = input.rating;
      sortOrder = input.sortOrder;
    };
    items.add(item);
    item;
  };

  public func updateTestimonial(items : List.List<Types.Testimonial>, id : Types.Id, input : Types.TestimonialInput) : ?Types.Testimonial {
    var result : ?Types.Testimonial = null;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.Testimonial = { item with name = input.name; title = input.title; company = input.company; quote = input.quote; rating = input.rating; sortOrder = input.sortOrder };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deleteTestimonial(items : List.List<Types.Testimonial>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── Portfolio ──────────────────────────────────────────────────────────────
  public func listPortfolio(items : List.List<Types.PortfolioItem>) : [Types.PortfolioItem] {
    items.toArray();
  };

  public func addPortfolioItem(items : List.List<Types.PortfolioItem>, counter : { var value : Nat }, input : Types.PortfolioInput) : Types.PortfolioItem {
    let item : Types.PortfolioItem = {
      id          = nextId(counter);
      title       = input.title;
      description = input.description;
      imageUrl    = input.imageUrl;
      link        = input.link;
      tags        = input.tags;
      sortOrder   = input.sortOrder;
    };
    items.add(item);
    item;
  };

  public func updatePortfolioItem(items : List.List<Types.PortfolioItem>, id : Types.Id, input : Types.PortfolioInput) : ?Types.PortfolioItem {
    var result : ?Types.PortfolioItem = null;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.PortfolioItem = { item with title = input.title; description = input.description; imageUrl = input.imageUrl; link = input.link; tags = input.tags; sortOrder = input.sortOrder };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deletePortfolioItem(items : List.List<Types.PortfolioItem>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── FAQ ────────────────────────────────────────────────────────────────────
  public func listFaq(items : List.List<Types.FaqItem>) : [Types.FaqItem] {
    items.toArray();
  };

  public func addFaqItem(items : List.List<Types.FaqItem>, counter : { var value : Nat }, input : Types.FaqInput) : Types.FaqItem {
    let item : Types.FaqItem = {
      id        = nextId(counter);
      question  = input.question;
      answer    = input.answer;
      sortOrder = input.sortOrder;
    };
    items.add(item);
    item;
  };

  public func updateFaqItem(items : List.List<Types.FaqItem>, id : Types.Id, input : Types.FaqInput) : ?Types.FaqItem {
    var result : ?Types.FaqItem = null;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.FaqItem = { item with question = input.question; answer = input.answer; sortOrder = input.sortOrder };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deleteFaqItem(items : List.List<Types.FaqItem>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── Contact submissions ────────────────────────────────────────────────────
  public func submitContact(items : List.List<Types.ContactSubmission>, counter : { var value : Nat }, input : Types.ContactInput) : Types.ContactSubmission {
    let item : Types.ContactSubmission = {
      id        = nextId(counter);
      name      = input.name;
      email     = input.email;
      message   = input.message;
      timestamp = Time.now();
    };
    items.add(item);
    item;
  };

  public func listContactSubmissions(items : List.List<Types.ContactSubmission>) : [Types.ContactSubmission] {
    items.toArray();
  };

  public func deleteContactSubmission(items : List.List<Types.ContactSubmission>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── Team members ───────────────────────────────────────────────────────────
  public func listTeam(items : List.List<Types.TeamMember>) : [Types.TeamMember] {
    items.toArray();
  };

  public func addTeamMember(items : List.List<Types.TeamMember>, counter : { var value : Nat }, input : Types.TeamMemberInput) : Types.TeamMember {
    let item : Types.TeamMember = {
      id        = nextId(counter);
      name      = input.name;
      role      = input.role;
      photoUrl  = input.photoUrl;
      bio       = input.bio;
      sortOrder = input.sortOrder;
    };
    items.add(item);
    item;
  };

  public func updateTeamMember(items : List.List<Types.TeamMember>, id : Types.Id, input : Types.TeamMemberInput) : ?Types.TeamMember {
    var result : ?Types.TeamMember = null;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.TeamMember = { item with name = input.name; role = input.role; photoUrl = input.photoUrl; bio = input.bio; sortOrder = input.sortOrder };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deleteTeamMember(items : List.List<Types.TeamMember>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── Partners ───────────────────────────────────────────────────────────────
  public func listPartners(items : List.List<Types.Partner>) : [Types.Partner] {
    items.toArray();
  };

  public func addPartner(items : List.List<Types.Partner>, counter : { var value : Nat }, input : Types.PartnerInput) : Types.Partner {
    let item : Types.Partner = {
      id          = nextId(counter);
      name        = input.name;
      logoUrl     = input.logoUrl;
      websiteUrl  = input.websiteUrl;
      description = input.description;
      sortOrder   = input.sortOrder;
    };
    items.add(item);
    item;
  };

  public func updatePartner(items : List.List<Types.Partner>, id : Types.Id, input : Types.PartnerInput) : ?Types.Partner {
    var result : ?Types.Partner = null;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.Partner = { item with name = input.name; logoUrl = input.logoUrl; websiteUrl = input.websiteUrl; description = input.description; sortOrder = input.sortOrder };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deletePartner(items : List.List<Types.Partner>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── Blog posts ─────────────────────────────────────────────────────────────
  public func listBlogPosts(items : List.List<Types.BlogPost>, publishedOnly : Bool) : [Types.BlogPost] {
    if (publishedOnly) {
      items.filter(func(p) { p.published }).toArray();
    } else {
      items.toArray();
    };
  };

  public func getBlogPost(items : List.List<Types.BlogPost>, id : Types.Id) : ?Types.BlogPost {
    items.find(func(p) { p.id == id });
  };

  public func getBlogPostBySlug(items : List.List<Types.BlogPost>, slug : Text) : ?Types.BlogPost {
    items.find(func(p) { p.slug == slug });
  };

  public func addBlogPost(items : List.List<Types.BlogPost>, counter : { var value : Nat }, input : Types.BlogPostInput) : Types.BlogPost {
    let item : Types.BlogPost = {
      id        = nextId(counter);
      title     = input.title;
      slug      = input.slug;
      summary   = input.summary;
      content   = input.content;
      date      = input.date;
      author    = input.author;
      tags      = input.tags;
      published = input.published;
    };
    items.add(item);
    item;
  };

  public func updateBlogPost(items : List.List<Types.BlogPost>, id : Types.Id, input : Types.BlogPostInput) : ?Types.BlogPost {
    var result : ?Types.BlogPost = null;
    items.mapInPlace(func(item) {
      if (item.id == id) {
        let updated : Types.BlogPost = { item with title = input.title; slug = input.slug; summary = input.summary; content = input.content; date = input.date; author = input.author; tags = input.tags; published = input.published };
        result := ?updated;
        updated;
      } else item;
    });
    result;
  };

  public func deleteBlogPost(items : List.List<Types.BlogPost>, id : Types.Id) : Bool {
    let before = items.size();
    let kept = items.filter(func(item) { item.id != id });
    items.clear();
    items.append(kept);
    items.size() < before;
  };

  // ── Seeding ────────────────────────────────────────────────────────────────
  public func seedSampleData(
    seeded       : { var value : Bool },
    settings     : { var data : ?Types.SiteSettings },
    hero         : { var data : ?Types.HeroContent },
    about        : { var data : ?Types.AboutContent },
    clients      : List.List<Types.Client>,
    industries   : List.List<Types.Industry>,
    shapes       : List.List<Types.Shape>,
    solutions    : List.List<Types.Solution>,
    testimonials : List.List<Types.Testimonial>,
    portfolio    : List.List<Types.PortfolioItem>,
    faq          : List.List<Types.FaqItem>,
    team         : List.List<Types.TeamMember>,
    partners     : List.List<Types.Partner>,
    blog         : List.List<Types.BlogPost>,
    idCounter    : { var value : Nat },
  ) {
    if (seeded.value) return;
    seeded.value := true;

    // Settings
    settings.data := ?{
      companyName  = "Shapetech Solutions";
      tagline      = "Shaping the Future of Your Business";
      phone        = "+1 (941) 123-4567";
      email        = "info@shapetechsolutions.com";
      addressLine1 = "Sarasota, FL, USA";
      addressLine2 = "Niš, Serbia";
      socialLinks  = {
        linkedin  = "https://linkedin.com/company/shapetechsolutions";
        twitter   = "https://twitter.com/shapetechsol";
        github    = "https://github.com/shapetechsolutions";
        facebook  = "https://facebook.com/shapetechsolutions";
        instagram = "https://instagram.com/shapetechsolutions";
      };
    };

    // Hero
    hero.data := ?{
      headline         = "Shaping the Future of Your Business";
      subheading       = "A boutique technology design and full-stack development firm headquartered in Sarasota, FL and Niš, Serbia — delivering scalable software solutions for direct sellers, startups, and mid-market companies.";
      ctaText          = "Get Started";
      ctaLink          = "/contact";
      secondaryCtaText = "Our Work";
      secondaryCtaLink = "/solutions";
    };

    // About
    about.data := ?{
      description = "Shapetech Solutions is a boutique technology company with offices in Sarasota, Florida and Niš, Serbia. We partner with direct selling organizations, high-growth startups, and mid-market companies to architect and build the digital products that drive their next stage of growth.";
      mission     = "To deliver beautifully engineered software solutions that create measurable business value — combining deep technical expertise with strategic design thinking.";
      vision      = "To be the trusted technology partner of choice for companies that refuse to settle for off-the-shelf answers to complex business challenges.";
    };

    // Clients
    ignore addClient(clients, idCounter, { name = "USANA Health Sciences"; logoUrl = ""; websiteUrl = "https://usana.com"; sortOrder = 1 });
    ignore addClient(clients, idCounter, { name = "4Life Research"; logoUrl = ""; websiteUrl = "https://4life.com"; sortOrder = 2 });
    ignore addClient(clients, idCounter, { name = "Vivos Therapeutics"; logoUrl = ""; websiteUrl = "https://vivoslife.com"; sortOrder = 3 });
    ignore addClient(clients, idCounter, { name = "Primerica"; logoUrl = ""; websiteUrl = "https://primerica.com"; sortOrder = 4 });

    // Industries
    ignore addIndustry(industries, idCounter, { title = "Direct Selling"; description = "We have deep roots in direct sales — building distributor portals, compensation engines, and mobile apps that power multi-level organizations at scale."; iconName = "users"; sortOrder = 1 });
    ignore addIndustry(industries, idCounter, { title = "Startups"; description = "From MVP to market-ready product, we help startups move fast without breaking things — providing architecture guidance, rapid development, and growth infrastructure."; iconName = "rocket"; sortOrder = 2 });
    ignore addIndustry(industries, idCounter, { title = "Mid-Market Companies"; description = "We modernize legacy systems and build new platforms that give established companies the technological edge they need to compete in a digital-first world."; iconName = "building"; sortOrder = 3 });
    ignore addIndustry(industries, idCounter, { title = "Platform Businesses"; description = "Marketplaces, SaaS platforms, and API-driven ecosystems — we design and build the infrastructure that connects buyers, sellers, and partners."; iconName = "grid"; sortOrder = 4 });

    // Shapes (brand pillars)
    ignore addShape(shapes, idCounter, { title = "Strategy First"; description = "Every engagement begins with a deep discovery process. We map your business goals to a technology strategy before a single line of code is written."; icon = "map"; sortOrder = 1 });
    ignore addShape(shapes, idCounter, { title = "Design-Led Engineering"; description = "Beautiful products are born from the intersection of thoughtful design and clean architecture. We hold both to the same high standard."; icon = "pen-tool"; sortOrder = 2 });
    ignore addShape(shapes, idCounter, { title = "Full-Stack Ownership"; description = "From database schema to pixel-perfect UI, our teams own the full vertical — eliminating handoff friction and delivering cohesive products faster."; icon = "layers"; sortOrder = 3 });
    ignore addShape(shapes, idCounter, { title = "Transparent Partnership"; description = "We operate as an extension of your team. Shared roadmaps, weekly syncs, and open communication mean you're never left wondering what's happening."; icon = "handshake"; sortOrder = 4 });
    ignore addShape(shapes, idCounter, { title = "Scalable by Default"; description = "We architect for the business you're building, not just the one you have today — ensuring your platform grows with you without costly rewrites."; icon = "trending-up"; sortOrder = 5 });

    // Solutions
    ignore addSolution(solutions, idCounter, { title = "System Architecture"; description = "We design robust, scalable system architectures that form the backbone of your digital products — from microservices to event-driven platforms."; icon = "cpu"; features = ["Cloud-native design", "Microservices & APIs", "Database architecture", "Security & compliance planning"]; sortOrder = 1 });
    ignore addSolution(solutions, idCounter, { title = "Mobile & Native Apps"; description = "Cross-platform mobile applications built with modern frameworks, delivering native performance and a seamless user experience on iOS and Android."; icon = "smartphone"; features = ["React Native & Flutter", "iOS & Android native", "Offline-first architecture", "Push notifications & deep linking"]; sortOrder = 2 });
    ignore addSolution(solutions, idCounter, { title = "Data-Driven Applications"; description = "Analytics dashboards, reporting engines, and data pipelines that turn raw numbers into actionable business intelligence."; icon = "bar-chart"; features = ["Real-time dashboards", "ETL & data pipelines", "Business intelligence tools", "Custom reporting"]; sortOrder = 3 });
    ignore addSolution(solutions, idCounter, { title = "Website Development"; description = "High-performance marketing sites and web applications that make a strong first impression and convert visitors into customers."; icon = "globe"; features = ["Responsive design", "CMS integration", "Performance optimization", "SEO best practices"]; sortOrder = 4 });
    ignore addSolution(solutions, idCounter, { title = "Multi-Platform Systems"; description = "Unified platforms that work seamlessly across web, mobile, and desktop — giving your users a consistent experience wherever they are."; icon = "monitor"; features = ["Progressive web apps", "Cross-platform desktop", "Synchronized state", "Unified design system"]; sortOrder = 5 });
    ignore addSolution(solutions, idCounter, { title = "API Integrations"; description = "We connect your platforms to the tools your business relies on — payment processors, CRMs, ERPs, and third-party services."; icon = "link"; features = ["REST & GraphQL APIs", "Third-party integrations", "Webhook automation", "API security & rate limiting"]; sortOrder = 6 });
    ignore addSolution(solutions, idCounter, { title = "UX/UI Design"; description = "User-centered design that balances aesthetics with usability — from wireframes and prototypes to polished, production-ready interfaces."; icon = "figma"; features = ["User research & personas", "Wireframing & prototyping", "Design systems", "Accessibility compliance"]; sortOrder = 7 });

    // Testimonials
    ignore addTestimonial(testimonials, idCounter, { name = "Michael Torres"; title = "Chief Technology Officer"; company = "DirectPath International"; quote = "Shapetech rebuilt our entire distributor portal from the ground up. The new platform handles over 50,000 active distributors without breaking a sweat. Their team's technical depth is exceptional."; rating = 5; sortOrder = 1 });
    ignore addTestimonial(testimonials, idCounter, { name = "Sarah Lindqvist"; title = "VP of Product"; company = "NovaSeed Ventures"; quote = "We came to Shapetech with a napkin sketch and left with a fully launched SaaS product six months later. Their strategy-first approach saved us from at least three costly wrong turns."; rating = 5; sortOrder = 2 });
    ignore addTestimonial(testimonials, idCounter, { name = "David Kim"; title = "CEO"; company = "Momentum Health Corp"; quote = "The mobile app they built for our sales team increased field productivity by 40% in the first quarter. Shapetech doesn't just build software — they solve business problems."; rating = 5; sortOrder = 3 });
    ignore addTestimonial(testimonials, idCounter, { name = "Rachel Okonkwo"; title = "Director of Digital Transformation"; company = "Crestline Brands"; quote = "What sets Shapetech apart is their communication. We always knew exactly where the project stood. No surprises, no delays, and a final product that exceeded our expectations."; rating = 5; sortOrder = 4 });

    // Portfolio
    ignore addPortfolioItem(portfolio, idCounter, { title = "DirectPath Distributor Portal"; description = "A comprehensive web and mobile platform for managing 50,000+ direct sales distributors — featuring real-time compensation tracking, genealogy trees, and automated onboarding workflows."; imageUrl = ""; link = ""; tags = ["Direct Selling", "React", "Node.js", "Mobile"]; sortOrder = 1 });
    ignore addPortfolioItem(portfolio, idCounter, { title = "NovaSeed SaaS Platform"; description = "An end-to-end SaaS solution for seed-stage startups to manage investor relations, cap tables, and fundraising pipelines — launched from zero to production in 24 weeks."; imageUrl = ""; link = ""; tags = ["SaaS", "FinTech", "React", "PostgreSQL"]; sortOrder = 2 });
    ignore addPortfolioItem(portfolio, idCounter, { title = "Momentum Health Mobile App"; description = "A cross-platform mobile application for field sales teams featuring product catalogs, order management, customer CRM, and real-time sales analytics synced to a central dashboard."; imageUrl = ""; link = ""; tags = ["Mobile", "React Native", "Sales Tools"]; sortOrder = 3 });
    ignore addPortfolioItem(portfolio, idCounter, { title = "Crestline E-Commerce Rebuild"; description = "A complete re-architecture of a legacy e-commerce platform serving 200,000+ monthly visitors — reducing page load times by 70% and increasing conversion rates by 25%."; imageUrl = ""; link = ""; tags = ["E-Commerce", "Performance", "Next.js"]; sortOrder = 4 });

    // FAQ
    ignore addFaqItem(faq, idCounter, { question = "What types of companies does Shapetech work with?"; answer = "We primarily work with direct selling organizations, high-growth startups, and mid-market companies. Our sweet spot is businesses that need a strategic technology partner — not just a vendor — to help them build, scale, or modernize their digital products."; sortOrder = 1 });
    ignore addFaqItem(faq, idCounter, { question = "How does a typical engagement begin?"; answer = "Every project starts with a discovery phase. We invest time understanding your business goals, existing systems, and user needs before proposing any technical solution. This ensures we're solving the right problem in the most effective way."; sortOrder = 2 });
    ignore addFaqItem(faq, idCounter, { question = "Do you offer ongoing support after launch?"; answer = "Yes. Most of our clients engage us on a long-term retainer after initial delivery. We offer maintenance, feature development, and dedicated support packages — because great software is never truly finished."; sortOrder = 3 });
    ignore addFaqItem(faq, idCounter, { question = "How are your teams structured?"; answer = "Our cross-functional teams typically include a project lead, senior engineers, a UX designer, and a QA specialist. We operate in two-week sprints with regular client demos so you always see progress and can provide real-time feedback."; sortOrder = 4 });
    ignore addFaqItem(faq, idCounter, { question = "Can you work with our existing technology stack?"; answer = "Absolutely. We adapt to your environment rather than forcing you into ours. That said, we'll always give you our honest technical assessment and recommend changes that would meaningfully improve performance, maintainability, or scalability."; sortOrder = 5 });
    ignore addFaqItem(faq, idCounter, { question = "Where are your teams located?"; answer = "Our leadership is based in Sarasota, Florida, with our primary engineering team in Niš, Serbia. This dual-timezone presence means we can cover nearly any business hours and respond quickly to urgent needs."; sortOrder = 6 });

    // Team
    ignore addTeamMember(team, idCounter, { name = "Connor Hester"; role = "Chief Executive Officer"; photoUrl = ""; bio = "Connor founded Shapetech with a vision to bring enterprise-grade software craftsmanship to companies of every size. With a background in direct sales technology and product strategy, he leads client relationships and company direction."; sortOrder = 1 });
    ignore addTeamMember(team, idCounter, { name = "Sasa Velickovic"; role = "President"; photoUrl = ""; bio = "Sasa oversees company operations and growth strategy. His extensive experience managing large-scale technology organizations across Europe and North America shapes how Shapetech delivers at every level."; sortOrder = 2 });
    ignore addTeamMember(team, idCounter, { name = "Nenad Andrejevic"; role = "Chief Technology Officer"; photoUrl = ""; bio = "Nenad leads our engineering practice with a focus on architecture, code quality, and technical innovation. His team builds the systems that clients depend on to run their most critical business operations."; sortOrder = 3 });
    ignore addTeamMember(team, idCounter, { name = "Darko Milenkovic"; role = "Creative Director"; photoUrl = ""; bio = "Darko drives the design philosophy at Shapetech — ensuring every product we ship is not only functional but visually compelling and intuitive to use. He bridges the gap between engineering precision and design artistry."; sortOrder = 4 });
    ignore addTeamMember(team, idCounter, { name = "Dusan Mitrovic"; role = "Managing Partner"; photoUrl = ""; bio = "Dusan manages key client accounts and oversees project delivery. His hands-on approach and deep understanding of client industries ensure that every engagement delivers tangible, measurable results."; sortOrder = 5 });

    // Partners
    ignore addPartner(partners, idCounter, { name = "Microsoft Azure"; logoUrl = ""; websiteUrl = "https://azure.microsoft.com"; description = "Our preferred cloud platform for enterprise-grade deployments — providing the infrastructure reliability and global scale our clients demand."; sortOrder = 1 });
    ignore addPartner(partners, idCounter, { name = "Stripe"; logoUrl = ""; websiteUrl = "https://stripe.com"; description = "Powering payments across our client applications — from simple e-commerce checkouts to complex subscription billing and marketplace payouts."; sortOrder = 2 });
    ignore addPartner(partners, idCounter, { name = "Salesforce"; logoUrl = ""; websiteUrl = "https://salesforce.com"; description = "We integrate Salesforce CRM into client workflows, building custom Lightning components and automation that connect sales, service, and data."; sortOrder = 3 });
    ignore addPartner(partners, idCounter, { name = "AWS"; logoUrl = ""; websiteUrl = "https://aws.amazon.com"; description = "Amazon Web Services provides the serverless, container, and database infrastructure underlying many of our most performance-critical applications."; sortOrder = 4 });

    // Blog posts
    ignore addBlogPost(blog, idCounter, {
      title     = "Why Direct Selling Companies Need Custom Technology";
      slug      = "why-direct-selling-needs-custom-technology";
      summary   = "Off-the-shelf software can't keep up with the unique demands of MLM and direct sales organizations. Here's why custom-built platforms deliver better ROI.";
      content   = "The direct selling industry has unique technological requirements that generic software simply cannot address. Compensation plans with complex leg structures, real-time genealogy tracking, and multi-currency payouts for international distributors — these aren't features you find in an off-the-shelf CRM.\n\nAt Shapetech, we've spent years building platforms specifically for direct sales organizations, and the pattern is consistent: companies that invest in custom technology see faster distributor onboarding, higher retention rates, and significantly more data visibility into what's driving growth.\n\nThe key is not building everything from scratch. It's identifying the 20% of functionality that is genuinely unique to your business model and building that precisely, while integrating best-in-class tools for the other 80%. That's the Shapetech approach.";
      date      = 1_713_600_000_000_000_000;
      author    = "Connor Hester";
      tags      = ["Direct Selling", "Technology Strategy", "Custom Software"];
      published = true;
    });
    ignore addBlogPost(blog, idCounter, {
      title     = "The Hidden Cost of Technical Debt in Growing Companies";
      slug      = "hidden-cost-technical-debt-growing-companies";
      summary   = "Every shortcut taken during rapid growth becomes a tax on your future velocity. Understanding and managing technical debt is one of the most important things a CTO can do.";
      content   = "Technical debt is often misunderstood as a purely engineering problem. In reality, it's a business risk that compounds over time — much like financial debt. Every \"we'll fix it later\" decision made during a fast growth phase adds to a mounting balance that eventually demands repayment.\n\nThe symptoms are familiar: new features take longer than they should, bugs in one area cause unexpected failures elsewhere, and engineering velocity slows to a crawl even as the team grows. By the time leadership notices, the debt has usually become significant.\n\nAt Shapetech, our approach with mid-market clients often involves a structured modernization roadmap — prioritizing the highest-risk areas of the codebase first, while continuing to deliver new business value in parallel. The goal is never a complete rewrite (rarely worth it) but a systematic reduction of risk and a restoration of development speed.";
      date      = 1_711_008_000_000_000_000;
      author    = "Nenad Andrejevic";
      tags      = ["Engineering", "Technical Debt", "Leadership"];
      published = true;
    });
    ignore addBlogPost(blog, idCounter, {
      title     = "Designing for the Field: Mobile UX for Sales Teams";
      slug      = "designing-mobile-ux-for-sales-teams";
      summary   = "Sales professionals use apps in the real world — noisy, distracted, high-stakes moments. Designing for that reality requires a fundamentally different mindset.";
      content   = "Most enterprise mobile applications are designed by people who will never actually use them in the field. The result is interfaces optimized for demos rather than daily reality — too many taps to complete a simple task, dense data tables that are unreadable in sunlight, and workflows that assume a reliable internet connection.\n\nWhen Shapetech designs mobile applications for sales teams, we start by shadowing actual users in their work environment. What does a home-based consultant's workspace look like? What information does a field rep need in the 30 seconds before walking into a client meeting? These questions shape every design decision.\n\nThe most successful sales mobile apps we've built share common characteristics: a single primary action per screen, offline capability for core workflows, and data visualizations that communicate at a glance. Simplicity, in this context, is not a design preference — it's a performance requirement.";
      date      = 1_708_329_600_000_000_000;
      author    = "Darko Milenkovic";
      tags      = ["Mobile Design", "UX", "Sales Technology"];
      published = true;
    });
  };
};
