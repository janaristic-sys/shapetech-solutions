import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PartnerInput {
    websiteUrl: Url;
    sortOrder: bigint;
    name: string;
    description: string;
    logoUrl: Url;
}
export interface AboutContent {
    mission: string;
    description: string;
    vision: string;
}
export type Timestamp = bigint;
export interface ContactSubmission {
    id: Id;
    name: string;
    email: string;
    message: string;
    timestamp: Timestamp;
}
export interface BlogPostInput {
    title: string;
    content: string;
    date: Timestamp;
    published: boolean;
    slug: string;
    tags: Array<string>;
    author: string;
    summary: string;
}
export interface SocialLinks {
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    github: string;
}
export interface FaqInput {
    question: string;
    sortOrder: bigint;
    answer: string;
}
export interface TestimonialInput {
    title: string;
    sortOrder: bigint;
    name: string;
    quote: string;
    company: string;
    rating: bigint;
}
export type Url = string;
export interface SolutionInput {
    title: string;
    features: Array<string>;
    sortOrder: bigint;
    icon: string;
    description: string;
}
export interface Solution {
    id: Id;
    title: string;
    features: Array<string>;
    sortOrder: bigint;
    icon: string;
    description: string;
}
export interface ClientInput {
    websiteUrl: Url;
    sortOrder: bigint;
    name: string;
    logoUrl: Url;
}
export interface TeamMemberInput {
    bio: string;
    sortOrder: bigint;
    name: string;
    role: string;
    photoUrl: Url;
}
export interface Client {
    id: Id;
    websiteUrl: Url;
    sortOrder: bigint;
    name: string;
    logoUrl: Url;
}
export interface PortfolioInput {
    title: string;
    sortOrder: bigint;
    link: Url;
    tags: Array<string>;
    description: string;
    imageUrl: Url;
}
export interface ContactInput {
    name: string;
    email: string;
    message: string;
}
export interface BlogPost {
    id: Id;
    title: string;
    content: string;
    date: Timestamp;
    published: boolean;
    slug: string;
    tags: Array<string>;
    author: string;
    summary: string;
}
export interface IndustryInput {
    title: string;
    sortOrder: bigint;
    description: string;
    iconName: string;
}
export interface HeroContent {
    subheading: string;
    headline: string;
    ctaLink: string;
    secondaryCtaLink: string;
    ctaText: string;
    secondaryCtaText: string;
}
export interface Partner {
    id: Id;
    websiteUrl: Url;
    sortOrder: bigint;
    name: string;
    description: string;
    logoUrl: Url;
}
export interface Shape {
    id: Id;
    title: string;
    sortOrder: bigint;
    icon: string;
    description: string;
}
export interface Industry {
    id: Id;
    title: string;
    sortOrder: bigint;
    description: string;
    iconName: string;
}
export interface ShapeInput {
    title: string;
    sortOrder: bigint;
    icon: string;
    description: string;
}
export interface FaqItem {
    id: Id;
    question: string;
    sortOrder: bigint;
    answer: string;
}
export interface SiteSettings {
    tagline: string;
    socialLinks: SocialLinks;
    email: string;
    addressLine1: string;
    addressLine2: string;
    companyName: string;
    phone: string;
}
export interface PortfolioItem {
    id: Id;
    title: string;
    sortOrder: bigint;
    link: Url;
    tags: Array<string>;
    description: string;
    imageUrl: Url;
}
export type Id = bigint;
export interface TeamMember {
    id: Id;
    bio: string;
    sortOrder: bigint;
    name: string;
    role: string;
    photoUrl: Url;
}
export interface Testimonial {
    id: Id;
    title: string;
    sortOrder: bigint;
    name: string;
    quote: string;
    company: string;
    rating: bigint;
}
export enum AdminResult {
    ok = "ok",
    notFound = "notFound",
    unauthorized = "unauthorized"
}
export interface backendInterface {
    addBlogPost(input: BlogPostInput): Promise<AdminResult>;
    addClient(input: ClientInput): Promise<AdminResult>;
    addFaqItem(input: FaqInput): Promise<AdminResult>;
    addIndustry(input: IndustryInput): Promise<AdminResult>;
    addPartner(input: PartnerInput): Promise<AdminResult>;
    addPortfolioItem(input: PortfolioInput): Promise<AdminResult>;
    addShape(input: ShapeInput): Promise<AdminResult>;
    addSolution(input: SolutionInput): Promise<AdminResult>;
    addTeamMember(input: TeamMemberInput): Promise<AdminResult>;
    addTestimonial(input: TestimonialInput): Promise<AdminResult>;
    deleteBlogPost(id: Id): Promise<AdminResult>;
    deleteClient(id: Id): Promise<AdminResult>;
    deleteContactSubmission(id: Id): Promise<AdminResult>;
    deleteFaqItem(id: Id): Promise<AdminResult>;
    deleteIndustry(id: Id): Promise<AdminResult>;
    deletePartner(id: Id): Promise<AdminResult>;
    deletePortfolioItem(id: Id): Promise<AdminResult>;
    deleteShape(id: Id): Promise<AdminResult>;
    deleteSolution(id: Id): Promise<AdminResult>;
    deleteTeamMember(id: Id): Promise<AdminResult>;
    deleteTestimonial(id: Id): Promise<AdminResult>;
    getAbout(): Promise<AboutContent>;
    getAdmin(): Promise<Principal>;
    getBlogPost(id: Id): Promise<BlogPost | null>;
    getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
    getHero(): Promise<HeroContent>;
    getSettings(): Promise<SiteSettings>;
    listBlogPosts(): Promise<Array<BlogPost>>;
    listClients(): Promise<Array<Client>>;
    listContactSubmissions(): Promise<Array<ContactSubmission>>;
    listFaq(): Promise<Array<FaqItem>>;
    listIndustries(): Promise<Array<Industry>>;
    listPartners(): Promise<Array<Partner>>;
    listPortfolio(): Promise<Array<PortfolioItem>>;
    listPublishedBlogPosts(): Promise<Array<BlogPost>>;
    listShapes(): Promise<Array<Shape>>;
    listSolutions(): Promise<Array<Solution>>;
    listTeam(): Promise<Array<TeamMember>>;
    listTestimonials(): Promise<Array<Testimonial>>;
    setAdmin(newAdmin: Principal): Promise<AdminResult>;
    submitContact(input: ContactInput): Promise<boolean>;
    updateAbout(input: AboutContent): Promise<AdminResult>;
    updateBlogPost(id: Id, input: BlogPostInput): Promise<AdminResult>;
    updateClient(id: Id, input: ClientInput): Promise<AdminResult>;
    updateFaqItem(id: Id, input: FaqInput): Promise<AdminResult>;
    updateHero(input: HeroContent): Promise<AdminResult>;
    updateIndustry(id: Id, input: IndustryInput): Promise<AdminResult>;
    updatePartner(id: Id, input: PartnerInput): Promise<AdminResult>;
    updatePortfolioItem(id: Id, input: PortfolioInput): Promise<AdminResult>;
    updateSettings(input: SiteSettings): Promise<AdminResult>;
    updateShape(id: Id, input: ShapeInput): Promise<AdminResult>;
    updateSolution(id: Id, input: SolutionInput): Promise<AdminResult>;
    updateTeamMember(id: Id, input: TeamMemberInput): Promise<AdminResult>;
    updateTestimonial(id: Id, input: TestimonialInput): Promise<AdminResult>;
}
