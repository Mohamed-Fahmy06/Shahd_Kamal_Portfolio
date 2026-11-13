export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  category,
  client,
  summary,
  description,
  mainImage,
  kpis,
  technologies,
  liveUrl,
  order
}`;

export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(order asc, _createdAt desc){
  _id,
  number,
  category,
  title,
  role,
  period,
  badge,
  bullets,
  highlights,
  order
}`;

export const SKILLS_QUERY = `*[_type == "skill"] | order(order asc, _createdAt asc){
  _id,
  name,
  category,
  order
}`;

export const PROFILE_QUERY = `*[_type == "profile"][0]{
  _id,
  name,
  tagline,
  subTagline,
  aboutTitle,
  aboutIntro,
  aboutDataAnalysis,
  aboutDigitalMarketing,
  aboutConclusion,
  cvFile,
  avatarImage,
  socialLinks
}`;
