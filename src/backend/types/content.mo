import Common "common";

module {
  public type Id = Common.Id;
  public type Timestamp = Common.Timestamp;
  public type Url = Common.Url;

  // ── Site settings ──────────────────────────────────────────────────────────
  public type SocialLinks = {
    linkedin : Text;
    twitter  : Text;
    github   : Text;
    facebook : Text;
    instagram: Text;
  };

  public type SiteSettings = {
    companyName : Text;
    tagline     : Text;
    phone       : Text;
    email       : Text;
    addressLine1: Text;
    addressLine2: Text;
    socialLinks : SocialLinks;
  };

  // ── Hero ───────────────────────────────────────────────────────────────────
  public type HeroContent = {
    headline    : Text;
    subheading  : Text;
    ctaText     : Text;
    ctaLink     : Text;
    secondaryCtaText : Text;
    secondaryCtaLink : Text;
  };

  // ── About ──────────────────────────────────────────────────────────────────
  public type AboutContent = {
    description : Text;
    mission     : Text;
    vision      : Text;
  };

  // ── Clients ────────────────────────────────────────────────────────────────
  public type Client = {
    id         : Id;
    name       : Text;
    logoUrl    : Url;
    websiteUrl : Url;
    sortOrder  : Nat;
  };

  // ── Industries ─────────────────────────────────────────────────────────────
  public type Industry = {
    id          : Id;
    title       : Text;
    description : Text;
    iconName    : Text;
    sortOrder   : Nat;
  };

  // ── Shapes (brand pillars) ─────────────────────────────────────────────────
  public type Shape = {
    id          : Id;
    title       : Text;
    description : Text;
    icon        : Text;
    sortOrder   : Nat;
  };

  // ── Solutions ──────────────────────────────────────────────────────────────
  public type Solution = {
    id          : Id;
    title       : Text;
    description : Text;
    icon        : Text;
    features    : [Text];
    sortOrder   : Nat;
  };

  // ── Testimonials ───────────────────────────────────────────────────────────
  public type Testimonial = {
    id        : Id;
    name      : Text;
    title     : Text;
    company   : Text;
    quote     : Text;
    rating    : Nat;  // 1-5
    sortOrder : Nat;
  };

  // ── Portfolio / Recent Launches ────────────────────────────────────────────
  public type PortfolioItem = {
    id          : Id;
    title       : Text;
    description : Text;
    imageUrl    : Url;
    link        : Url;
    tags        : [Text];
    sortOrder   : Nat;
  };

  // ── FAQ ────────────────────────────────────────────────────────────────────
  public type FaqItem = {
    id        : Id;
    question  : Text;
    answer    : Text;
    sortOrder : Nat;
  };

  // ── Contact submissions ────────────────────────────────────────────────────
  public type ContactSubmission = {
    id        : Id;
    name      : Text;
    email     : Text;
    message   : Text;
    timestamp : Timestamp;
  };

  // ── Team members ──────────────────────────────────────────────────────────
  public type TeamMember = {
    id        : Id;
    name      : Text;
    role      : Text;
    photoUrl  : Url;
    bio       : Text;
    sortOrder : Nat;
  };

  // ── Partners ───────────────────────────────────────────────────────────────
  public type Partner = {
    id          : Id;
    name        : Text;
    logoUrl     : Url;
    websiteUrl  : Url;
    description : Text;
    sortOrder   : Nat;
  };

  // ── Blog posts ─────────────────────────────────────────────────────────────
  public type BlogPost = {
    id        : Id;
    title     : Text;
    slug      : Text;
    summary   : Text;
    content   : Text;
    date      : Timestamp;
    author    : Text;
    tags      : [Text];
    published : Bool;
  };

  // ── Admin result ───────────────────────────────────────────────────────────
  public type AdminResult = { #ok; #unauthorized; #notFound };

  // ── Input types (for create/update – no id) ────────────────────────────────
  public type ClientInput       = { name : Text; logoUrl : Url; websiteUrl : Url; sortOrder : Nat };
  public type IndustryInput     = { title : Text; description : Text; iconName : Text; sortOrder : Nat };
  public type ShapeInput        = { title : Text; description : Text; icon : Text; sortOrder : Nat };
  public type SolutionInput     = { title : Text; description : Text; icon : Text; features : [Text]; sortOrder : Nat };
  public type TestimonialInput  = { name : Text; title : Text; company : Text; quote : Text; rating : Nat; sortOrder : Nat };
  public type PortfolioInput    = { title : Text; description : Text; imageUrl : Url; link : Url; tags : [Text]; sortOrder : Nat };
  public type FaqInput          = { question : Text; answer : Text; sortOrder : Nat };
  public type ContactInput      = { name : Text; email : Text; message : Text };
  public type TeamMemberInput   = { name : Text; role : Text; photoUrl : Url; bio : Text; sortOrder : Nat };
  public type PartnerInput      = { name : Text; logoUrl : Url; websiteUrl : Url; description : Text; sortOrder : Nat };
  public type BlogPostInput     = { title : Text; slug : Text; summary : Text; content : Text; date : Timestamp; author : Text; tags : [Text]; published : Bool };
};
