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
      headline         = "Commerce Solutions That Power Global Volume";
      subheading       = "We build and grow specialized commerce solutions for niche use cases, collectively powering $100s of Millions in annual volume across dozens of countries.";
      ctaText          = "Explore Solutions";
      ctaLink          = "/solutions";
      secondaryCtaText = "Contact Us";
      secondaryCtaLink = "/contact";
    };

    // About
    about.data := ?{
      description = "ShapeTech Solutions is an international team of specialists dedicated to building and integrating custom-built software solutions. Where standard software falls short, we step in. We engineer custom tools specifically designed to handle your most complex operational hurdles.";
      mission     = "To build and grow specialized commerce solutions that solve our clients' complex commerce problems and scale their long-term growth.";
      vision      = "To power the world's niche commerce use cases through robust, scalable, and beautifully designed technology products.";
    };

    // Clients
    ignore addClient(clients, idCounter, { name = "Crunchi"; logoUrl = ""; websiteUrl = "https://crunchi.com"; sortOrder = 1 });
    ignore addClient(clients, idCounter, { name = "IDLife"; logoUrl = ""; websiteUrl = "https://idlife.com"; sortOrder = 2 });
    ignore addClient(clients, idCounter, { name = "Nuvita Global"; logoUrl = ""; websiteUrl = "https://nuvitaglobal.com"; sortOrder = 3 });
    ignore addClient(clients, idCounter, { name = "Wine Shop at Home"; logoUrl = ""; websiteUrl = "https://wineshopathome.com"; sortOrder = 4 });
    ignore addClient(clients, idCounter, { name = "Reliv International"; logoUrl = ""; websiteUrl = "https://reliv.com"; sortOrder = 5 });
    ignore addClient(clients, idCounter, { name = "Sam Houston"; logoUrl = ""; websiteUrl = "https://samhouston.com"; sortOrder = 6 });

    // Industries
    ignore addIndustry(industries, idCounter, { title = "Direct-Selling & Network Models"; description = "We construct distributor portals, commission engines, and mobile applications that power complex, high-volume multi-level marketing structures."; iconName = "users"; sortOrder = 1 });
    ignore addIndustry(industries, idCounter, { title = "Subscription & Replenishment Commerce"; description = "Managing complex cohort billing, replenishment cycles, automated dunning, and bespoke product builders for recurring revenue e-commerce."; iconName = "refresh-ccw"; sortOrder = 2 });
    ignore addIndustry(industries, idCounter, { title = "Health, Wellness, & Nutraceuticals"; description = "Compliance-focused, high-transaction platforms designed specifically for supplement brands and complex wellness distribution pathways."; iconName = "heart-pulse"; sortOrder = 3 });

    // Shapes (our products)
    ignore addShape(shapes, idCounter, { title = "Subscriptions"; description = "A bespoke subscription engine engineered for the unique needs of network models. We handle the complexity of recurring billing while ensuring genealogy and commission data stay perfectly synced."; icon = "refresh-ccw"; sortOrder = 1 });
    ignore addShape(shapes, idCounter, { title = "Credits"; description = "This shape provides a robust framework for managing user credits, digital wallets, and internal currency exchanges. (In Development)"; icon = "wallet"; sortOrder = 2 });
    ignore addShape(shapes, idCounter, { title = "Shopify Direct"; description = "An intelligent bridge that allows you to leverage Shopify’s world-class speed and reliability while maintaining your bespoke compensation model, replicated sites, and member enrollment flows. It protects your field with accurate commission tracking and link integrity."; icon = "shopping-cart"; sortOrder = 3 });
    ignore addShape(shapes, idCounter, { title = "CRM Direct"; description = "Our integration acts as an automatic sync between your core Commission Engine and your marketing stack, transforming fractured data into actionable intelligence."; icon = "network"; sortOrder = 4 });

    // Solutions (individual implementations / case studies)
    ignore addSolution(solutions, idCounter, { title = "Sam Houston"; description = "A custom fundraising platform with gamified donor loyalty powered by CRM Direct, enabling automated perks redemption and engagement leaderboards."; icon = "landmark"; features = ["Custom fundraising portal", "Gamified donor points", "Engagement leaderboards", "Perks redemption"]; sortOrder = 1 });
    ignore addSolution(solutions, idCounter, { title = "Crunchi Storefront"; description = "High-conversion Shopify Plus build for premium skincare with a custom affiliate sales attribution engine."; icon = "sparkles"; features = ["Shopify Plus storefront", "Affiliate attribution", "Custom variant selection", "Optimized checkout"]; sortOrder = 2 });
    ignore addSolution(solutions, idCounter, { title = "Nuvita Global"; description = "A custom distributor portal and real-time commission engine for nutraceutical sales networks, built on DMV."; icon = "heart-pulse"; features = ["Distributor portal", "Real-time commission logic", "Genealogy tree views", "Payout management"]; sortOrder = 3 });
    ignore addSolution(solutions, idCounter, { title = "IDLife Subscriptions"; description = "Headless subscription box e-commerce engine built on Medusa, optimized for high-volume monthly replenishment orders."; icon = "refresh-ccw"; features = ["Headless Medusa core", "Subscription box builder", "Dunning automation", "Cohort churn tracking"]; sortOrder = 4 });
    ignore addSolution(solutions, idCounter, { title = "Wine Shop at Home"; description = "A direct-selling platform with multi-tiered payout structures and replicated websites for thousands of independent consultants."; icon = "users"; features = ["MLM payout structures", "Replicated websites", "Consultant backend", "Resource library"]; sortOrder = 5 });
    ignore addSolution(solutions, idCounter, { title = "Reliv International"; description = "Multi-country e-commerce platform with global points e-wallet redemption system powered by Credits."; icon = "globe"; features = ["Multi-country catalogs", "Points wallet system", "Headless Medusa integration", "Localization engine"]; sortOrder = 6 });

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
    ignore addPartner(partners, idCounter, { name = "Medusa"; logoUrl = ""; websiteUrl = "https://medusajs.com"; description = "We leverage the Medusa ecosystem to build high-performance, custom headless commerce engines, engineering custom middleware on top of it to handle specific commission tracking and referral models."; sortOrder = 1 });
    ignore addPartner(partners, idCounter, { name = "LPT"; logoUrl = ""; websiteUrl = "#"; description = "As a featured partner, we specialize in building custom overlays and unique tools tailored specifically for the LPT environment to bridge the gap with your specific business strategy."; sortOrder = 2 });
    ignore addPartner(partners, idCounter, { name = "Shopify"; logoUrl = ""; websiteUrl = "https://shopify.com"; description = "We act as the intelligent bridge between Shopify and your existing commission engine, protecting your field with accurate tracking and link integrity."; sortOrder = 3 });
    ignore addPartner(partners, idCounter, { name = "HubSpot"; logoUrl = ""; websiteUrl = "https://hubspot.com"; description = "Our middleware establishes an automatic sync between your Commission Engine and HubSpot, transforming fractured data into real-time marketing power."; sortOrder = 4 });
    ignore addPartner(partners, idCounter, { name = "ByDesign"; logoUrl = ""; websiteUrl = "https://bydesign.com"; description = "We specialize in personalizing and integrating best-in-class third-party applications to build a custom architecture around your existing ByDesign commission platform."; sortOrder = 5 });
    ignore addPartner(partners, idCounter, { name = "Dotdigital"; logoUrl = ""; websiteUrl = "https://dotdigital.com"; description = "Integrating advanced marketing automation to trigger personalized celebratory messaging and performance tracking based on real-time data flow."; sortOrder = 6 });

    // Blog posts
    ignore addBlogPost(blog, idCounter, {
      title     = "ShapeTech Solutions Launches \"Shopify Direct\" Integration for Global Markets.";
      slug      = "shopify-direct-launch";
      summary   = "A technical deep-dive into how our new middleware acts as an intelligent bridge.";
      content   = "ShapeTech Solutions has officially launched Shopify Direct, an intelligent middleware integration that connects Shopify's enterprise storefronts with custom multi-level commission structures. This release solves the historical conflict between fast, modern checkout flows and complex genealogy attribution logic.";
      date      = 1_778_803_200_000_000_000;
      author    = "Connor Hester";
      tags      = ["Product Launch", "Shopify Plus", "Integration"];
      published = true;
    });
    ignore addBlogPost(blog, idCounter, {
      title     = "Expanding the Global Footprint: New Strategic Operations in International Markets.";
      slug      = "global-footprint-expansion";
      summary   = "Solving for international complexity and data fragmentation across regional portals.";
      content   = "To support client expansion across Europe and the Americas, ShapeTech Solutions is establishing dedicated multi-region hosting and automated data-residency compliance nodes. This expansion streamlines regional portal synchronizations and multi-currency transactions.";
      date      = 1_776_643_200_000_000_000;
      author    = "Sasa Velickovic";
      tags      = ["Global Expansion", "Infrastructure", "Compliance"];
      published = true;
    });
    ignore addBlogPost(blog, idCounter, {
      title     = "The Future of Incentives: Introducing the \"Xtra Points\" Promotion Engine.";
      slug      = "xtra-points-promotion-engine";
      summary   = "A powerful engine supporting product bundles, coupon codes, and centralized performance dashboards.";
      content   = "Our newly refined incentives shape, Xtra Points, provides a centralized hub to track loyalty points, custom bonuses, and product vouchers. Its robust transaction ledger allows merchants to configure flexible rewards programs without affecting core accounting data.";
      date      = 1_773_100_800_000_000_000;
      author    = "Nenad Andrejevic";
      tags      = ["Incentives", "Loyalty", "Software Architecture"];
      published = true;
    });
    ignore addBlogPost(blog, idCounter, {
      title     = "Real-time data flow synchronization updates between HubSpot and major commission engines.";
      slug      = "hubspot-commission-sync";
      summary   = "Optimizing sub-second synchronization and data reconciliation for enterprise marketing pipelines.";
      content   = "We have shipped sub-second data synchronization protocols for our CRM Direct bridge. Marketing teams can now access real-time distributor performance metrics, enrollment milestones, and compensation events directly inside their HubSpot automation flows.";
      date      = 1_771_372_800_000_000_000;
      author    = "Nenad Andrejevic";
      tags      = ["CRM Direct", "HubSpot", "Data Sync"];
      published = true;
    });
  };
};
