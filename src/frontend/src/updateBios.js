const fs = require('fs');
const file = 'c:/Users/CDM-PM/Documents/st-site/src/frontend/src/pages/AboutPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const generateBio = (name, role) => {
  if (role.includes('DevOps')) return `${name.split(' ')[0]} leads our infrastructure practices, ensuring secure, scalable, and highly available environments for all client projects.`;
  if (role.includes('Operations')) return `${name.split(' ')[0]} drives our operational workflows, focusing on building strong partnerships and internal efficiency.`;
  if (role.includes('Client')) return `${name.split(' ')[0]} ensures seamless communication and project alignment, serving as the trusted point of contact for our enterprise clients.`;
  if (role.includes('Full-stack')) return `${name.split(' ')[0]} builds robust full-stack features, blending frontend elegance with reliable backend architecture.`;
  if (role.includes('Back-end')) return `${name.split(' ')[0]} engineers scalable backend services, optimizing data flows and system performance across complex platforms.`;
  if (role.includes('Lead') || role.includes('Owner')) return `${name.split(' ')[0]} orchestrates engineering teams and owns the end-to-end delivery of specialized commerce solutions.`;
  if (role.includes('QA')) return `${name.split(' ')[0]} spearheads our quality assurance processes, rigorously testing applications to guarantee flawless user experiences.`;
  if (role.includes('Project')) return `${name.split(' ')[0]} manages project lifecycles from discovery to deployment, ensuring on-time and on-budget delivery.`;
  if (role.includes('HR')) return `${name.split(' ')[0]} champions our company culture and talent acquisition, building high-performing and happy teams.`;
  if (role.includes('Design') || role.includes('UI/UX')) return `${name.split(' ')[0]} crafts intuitive and beautiful interfaces that elevate the user experience across all digital touchpoints.`;
  if (role.includes('Front-end')) return `${name.split(' ')[0]} specializes in creating responsive, pixel-perfect front-end applications with modern web technologies.`;
  if (role.includes('Admin')) return `${name.split(' ')[0]} provides essential administrative support, keeping our daily operations organized and efficient.`;
  if (role.includes('Marketing')) return `${name.split(' ')[0]} develops our marketing strategies, driving brand awareness and growth across diverse channels.`;
  if (role.includes('Mobile')) return `${name.split(' ')[0]} develops robust mobile applications, delivering seamless native experiences for iOS and Android platforms.`;
  if (role.includes('Data')) return `${name.split(' ')[0]} leverages data analytics to unlock valuable insights, empowering data-driven decision making.`;
  
  return `${name.split(' ')[0]} is an integral part of the ShapeTech team, contributing expertise and dedication to our shared goals.`;
};

// Use a regex that captures name, role, and the empty bio line
const regex = /(name:\s*"([^"]+)",\s*role:\s*"([^"]+)",\s*)bio:\s*""/g;

content = content.replace(regex, (match, prefix, name, role) => {
  const bio = generateBio(name, role);
  return `${prefix}bio: "${bio}"`;
});

fs.writeFileSync(file, content);
console.log('Bios updated successfully.');
