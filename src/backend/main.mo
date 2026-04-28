import List       "mo:core/List";
import Principal  "mo:core/Principal";
import Types      "types/content";
import ContentLib "lib/content";
import ContentApi "mixins/content-api";

actor {
  // ── Singleton / scalar state ───────────────────────────────────────────────
  let seeded   : { var value : Bool }              = { var value = false };
  let settings : { var data : ?Types.SiteSettings } = { var data = null };
  let hero     : { var data : ?Types.HeroContent }  = { var data = null };
  let about    : { var data : ?Types.AboutContent }  = { var data = null };
  let admins   : { var primary : Principal }         = { var primary = Principal.anonymous() };
  let idCounter : { var value : Nat }                = { var value = 0 };

  // ── Collection state ──────────────────────────────────────────────────────
  let clients      = List.empty<Types.Client>();
  let industries   = List.empty<Types.Industry>();
  let shapes       = List.empty<Types.Shape>();
  let solutions    = List.empty<Types.Solution>();
  let testimonials = List.empty<Types.Testimonial>();
  let portfolio    = List.empty<Types.PortfolioItem>();
  let faq          = List.empty<Types.FaqItem>();
  let contacts     = List.empty<Types.ContactSubmission>();
  let team         = List.empty<Types.TeamMember>();
  let partners     = List.empty<Types.Partner>();
  let blog         = List.empty<Types.BlogPost>();

  // ── Mixin composition ─────────────────────────────────────────────────────
  include ContentApi(
    seeded,
    settings,
    hero,
    about,
    clients,
    industries,
    shapes,
    solutions,
    testimonials,
    portfolio,
    faq,
    contacts,
    team,
    partners,
    blog,
    idCounter,
    admins,
  );

  // ── Seed on first deploy ───────────────────────────────────────────────────
  ContentLib.seedSampleData(
    seeded,
    settings,
    hero,
    about,
    clients,
    industries,
    shapes,
    solutions,
    testimonials,
    portfolio,
    faq,
    team,
    partners,
    blog,
    idCounter,
  );
};
