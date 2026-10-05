// Case studies shown on the homepage and the projects page

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  stat1: {
    icon: string;
    value: string;
    label: string;
  };
  stat2: {
    icon: string;
    value: string;
    label: string;
  };
  description: string;
  link: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "skyra-flight",
    number: "01",
    title: "AI Flight Booking Mobile App Design for Skyra",
    category: "Mobile App & AI",
    tagline: "Skyra is an AI-powered flight booking mobile app that analyzes flight prices, routes, and timing.",
    image: "/images/case-studies/skyra-flight-booking.webp",
    stat1: {
      icon: "/images/case-studies/activeuser.svg",
      value: "5",
      label: "User Personas Analyzed",
    },
    stat2: {
      icon: "/images/case-studies/rating.svg",
      value: "4",
      label: "Major Competitors Researched",
    },
    description: "Built with intelligent predictive flight price tracking, multi-city route optimization, and a seamless checkout experience.",
    link: "/projects",
  },
  {
    id: "helixa-health",
    number: "02",
    title: "AI-Powered Health App Design for Helixa",
    category: "HealthTech & Wearables",
    tagline: "Helixa is an AI-powered health app designed for both patients and doctors with real-time biometric tracking.",
    image: "/images/case-studies/helixa-health-app.webp",
    stat1: {
      icon: "/images/case-studies/activeuser.svg",
      value: "2",
      label: "User Groups Analyzed",
    },
    stat2: {
      icon: "/images/case-studies/increase.svg",
      value: "3",
      label: "Core Health Modules",
    },
    description: "Engineered with comprehensive sleep telemetry, cardiovascular risk scoring, and encrypted doctor-patient consultation streams.",
    link: "/projects",
  },
  {
    id: "monoq-spatial",
    number: "03",
    title: "Spatial E-Commerce App Design for Monoq",
    category: "Spatial UI & Web3",
    tagline: "Monoq is a spatial e-commerce application engineered for next-gen interactive product visualization.",
    image: "/images/case-studies/monoq-spatial-ecommerce.webp",
    stat1: {
      icon: "/images/case-studies/star-count.svg",
      value: "4 Weeks",
      label: "Project Duration",
    },
    stat2: {
      icon: "/images/case-studies/activeuser.svg",
      value: "3",
      label: "User Personas Analyzed",
    },
    description: "Features realistic 3D tactile product inspection, frictionless one-tap spatial ordering, and fluid micro-interactions.",
    link: "/projects",
  },
  {
    id: "ecoray-solar",
    number: "04",
    title: "AI-Powered Solar Monitoring Dashboard for EcoRay",
    category: "CleanTech Dashboard",
    tagline: "An AI-powered solar monitoring dashboard, EcoRay tracks real-time energy generation and monitors system health.",
    image: "/images/case-studies/ecoray-solar-dashboard.webp",
    stat1: {
      icon: "/images/case-studies/star-count.svg",
      value: "4 Weeks",
      label: "Project Duration",
    },
    stat2: {
      icon: "/images/case-studies/increase.svg",
      value: "4",
      label: "Major Competitors Researched",
    },
    description: "Delivers sub-second telemetry graphs, automated predictive inverter maintenance alerts, and high-concurrency fleet controls.",
    link: "/projects",
  },
  {
    id: "taskflux-management",
    number: "05",
    title: "Modern Task Management Dashboard for TaskFlux",
    category: "Enterprise SaaS",
    tagline: "TaskFlux streamlines enterprise workflows by transforming complex project metrics into clear, actionable intelligence.",
    image: "/images/case-studies/taskflux-dashboard.webp",
    stat1: {
      icon: "/images/case-studies/increase.svg",
      value: "30%",
      label: "Faster Monitoring",
    },
    stat2: {
      icon: "/images/case-studies/star-count.svg",
      value: "6.08K",
      label: "Task Insights",
    },
    description: "Designed with drag-and-drop kanban boards, real-time workload heatmaps, and customizable automated workflow pipelines.",
    link: "/projects",
  },
];
