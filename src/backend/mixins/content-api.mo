import Principal "mo:core/Principal";
import List      "mo:core/List";
import Types     "../types/content";
import Lib       "../lib/content";

// Public-facing API mixin for the content domain.
// State slices are injected via mixin parameters.
mixin (
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
  contacts     : List.List<Types.ContactSubmission>,
  team         : List.List<Types.TeamMember>,
  partners     : List.List<Types.Partner>,
  blog         : List.List<Types.BlogPost>,
  idCounter    : { var value : Nat },
  admins       : { var primary : Principal },
) {

  func isAdmin(caller : Principal) : Bool {
    Principal.equal(caller, admins.primary);
  };

  // ── Site settings ──────────────────────────────────────────────────────────
  public query func getSettings() : async Types.SiteSettings {
    Lib.getSettings(settings);
  };

  public shared ({ caller }) func updateSettings(input : Types.SiteSettings) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    Lib.updateSettings(settings, input);
    #ok;
  };

  // ── Hero ───────────────────────────────────────────────────────────────────
  public query func getHero() : async Types.HeroContent {
    Lib.getHero(hero);
  };

  public shared ({ caller }) func updateHero(input : Types.HeroContent) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    Lib.updateHero(hero, input);
    #ok;
  };

  // ── About ──────────────────────────────────────────────────────────────────
  public query func getAbout() : async Types.AboutContent {
    Lib.getAbout(about);
  };

  public shared ({ caller }) func updateAbout(input : Types.AboutContent) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    Lib.updateAbout(about, input);
    #ok;
  };

  // ── Clients ────────────────────────────────────────────────────────────────
  public query func listClients() : async [Types.Client] {
    Lib.listClients(clients);
  };

  public shared ({ caller }) func addClient(input : Types.ClientInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addClient(clients, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updateClient(id : Types.Id, input : Types.ClientInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updateClient(clients, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deleteClient(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deleteClient(clients, id)) #ok else #notFound;
  };

  // ── Industries ─────────────────────────────────────────────────────────────
  public query func listIndustries() : async [Types.Industry] {
    Lib.listIndustries(industries);
  };

  public shared ({ caller }) func addIndustry(input : Types.IndustryInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addIndustry(industries, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updateIndustry(id : Types.Id, input : Types.IndustryInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updateIndustry(industries, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deleteIndustry(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deleteIndustry(industries, id)) #ok else #notFound;
  };

  // ── Shapes ─────────────────────────────────────────────────────────────────
  public query func listShapes() : async [Types.Shape] {
    Lib.listShapes(shapes);
  };

  public shared ({ caller }) func addShape(input : Types.ShapeInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addShape(shapes, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updateShape(id : Types.Id, input : Types.ShapeInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updateShape(shapes, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deleteShape(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deleteShape(shapes, id)) #ok else #notFound;
  };

  // ── Solutions ──────────────────────────────────────────────────────────────
  public query func listSolutions() : async [Types.Solution] {
    Lib.listSolutions(solutions);
  };

  public shared ({ caller }) func addSolution(input : Types.SolutionInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addSolution(solutions, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updateSolution(id : Types.Id, input : Types.SolutionInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updateSolution(solutions, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deleteSolution(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deleteSolution(solutions, id)) #ok else #notFound;
  };

  // ── Testimonials ───────────────────────────────────────────────────────────
  public query func listTestimonials() : async [Types.Testimonial] {
    Lib.listTestimonials(testimonials);
  };

  public shared ({ caller }) func addTestimonial(input : Types.TestimonialInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addTestimonial(testimonials, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updateTestimonial(id : Types.Id, input : Types.TestimonialInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updateTestimonial(testimonials, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deleteTestimonial(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deleteTestimonial(testimonials, id)) #ok else #notFound;
  };

  // ── Portfolio ──────────────────────────────────────────────────────────────
  public query func listPortfolio() : async [Types.PortfolioItem] {
    Lib.listPortfolio(portfolio);
  };

  public shared ({ caller }) func addPortfolioItem(input : Types.PortfolioInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addPortfolioItem(portfolio, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updatePortfolioItem(id : Types.Id, input : Types.PortfolioInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updatePortfolioItem(portfolio, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deletePortfolioItem(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deletePortfolioItem(portfolio, id)) #ok else #notFound;
  };

  // ── FAQ ────────────────────────────────────────────────────────────────────
  public query func listFaq() : async [Types.FaqItem] {
    Lib.listFaq(faq);
  };

  public shared ({ caller }) func addFaqItem(input : Types.FaqInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addFaqItem(faq, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updateFaqItem(id : Types.Id, input : Types.FaqInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updateFaqItem(faq, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deleteFaqItem(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deleteFaqItem(faq, id)) #ok else #notFound;
  };

  // ── Contact submissions ────────────────────────────────────────────────────
  public shared func submitContact(input : Types.ContactInput) : async Bool {
    ignore Lib.submitContact(contacts, idCounter, input);
    true;
  };

  public shared ({ caller }) func listContactSubmissions() : async [Types.ContactSubmission] {
    if (not isAdmin(caller)) return [];
    Lib.listContactSubmissions(contacts);
  };

  public shared ({ caller }) func deleteContactSubmission(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deleteContactSubmission(contacts, id)) #ok else #notFound;
  };

  // ── Team ───────────────────────────────────────────────────────────────────
  public query func listTeam() : async [Types.TeamMember] {
    Lib.listTeam(team);
  };

  public shared ({ caller }) func addTeamMember(input : Types.TeamMemberInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addTeamMember(team, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updateTeamMember(id : Types.Id, input : Types.TeamMemberInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updateTeamMember(team, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deleteTeamMember(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deleteTeamMember(team, id)) #ok else #notFound;
  };

  // ── Partners ───────────────────────────────────────────────────────────────
  public query func listPartners() : async [Types.Partner] {
    Lib.listPartners(partners);
  };

  public shared ({ caller }) func addPartner(input : Types.PartnerInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addPartner(partners, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updatePartner(id : Types.Id, input : Types.PartnerInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updatePartner(partners, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deletePartner(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deletePartner(partners, id)) #ok else #notFound;
  };

  // ── Blog ───────────────────────────────────────────────────────────────────
  public query func listBlogPosts() : async [Types.BlogPost] {
    Lib.listBlogPosts(blog, false);
  };

  public query func listPublishedBlogPosts() : async [Types.BlogPost] {
    Lib.listBlogPosts(blog, true);
  };

  public query func getBlogPost(id : Types.Id) : async ?Types.BlogPost {
    Lib.getBlogPost(blog, id);
  };

  public query func getBlogPostBySlug(slug : Text) : async ?Types.BlogPost {
    Lib.getBlogPostBySlug(blog, slug);
  };

  public shared ({ caller }) func addBlogPost(input : Types.BlogPostInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    ignore Lib.addBlogPost(blog, idCounter, input);
    #ok;
  };

  public shared ({ caller }) func updateBlogPost(id : Types.Id, input : Types.BlogPostInput) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    switch (Lib.updateBlogPost(blog, id, input)) {
      case (?_) #ok;
      case null #notFound;
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : Types.Id) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    if (Lib.deleteBlogPost(blog, id)) #ok else #notFound;
  };

  // ── Admin management ───────────────────────────────────────────────────────
  public shared ({ caller }) func setAdmin(newAdmin : Principal) : async Types.AdminResult {
    if (not isAdmin(caller)) return #unauthorized;
    admins.primary := newAdmin;
    #ok;
  };

  public query func getAdmin() : async Principal {
    admins.primary;
  };
};
