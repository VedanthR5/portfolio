import {
  mobile,
  backend,
  creator,
  web,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
  // Removed the resume link
];

const services = [
  {
    title: "Deep Learning Systems",
    icon: web,
  },
  {
    title: "Economics and Global Markets",
    icon: mobile,
  },
  {
    title: "Cybersecurity",
    icon: backend,
  },
  {
    title: "Algorithmic Programming",
    icon: creator,
  },
];

const companyLogos = {
  google: "/google_logo_enhanced_upscaled.png",
  civicduty: "/CD_Logo.png",
  cmu: "/cmu_logo.png",
  sandia: "/sandia.png",
};

const experiences = [
  {
    title: "Security Engineering Intern",
    company_name: "Google",
    date: "May 2026 - Aug 2026",
    summary: "Incoming security engineering intern based in New York City.",
    logo: companyLogos.google,
  },
  {
    title: "Founding Engineer",
    company_name: "CivicDuty",
    website: "https://civicduty.app",
    date: "Oct 2025 - Present",
    summary:
      "Building a legislative intelligence platform for tracking bills, votes, meetings, and local government activity.",
    logo: companyLogos.civicduty,
  },
  {
    title: "Undergraduate AI Research Assistant",
    company_name: "Carnegie Mellon University",
    date: "May 2025 - Present",
    summary:
      "Researching applied AI systems with an emphasis on reliable models and real-world deployment.",
    logo: companyLogos.cmu,
  },
  {
    title: "Software Engineer Intern",
    company_name: "Sandia National Laboratories",
    date: "May 2025 - Aug 2025",
    summary:
      "Built security and AI tooling across incident response, threat-log retrieval, and DDoS detection workflows.",
    logo: companyLogos.sandia,
  },
  {
    title: "Teaching Assistant - Computer Vision & Database Systems",
    company_name: "Carnegie Mellon University",
    date: "Jan 2026 - Present",
    summary:
      "Supporting students in computer vision, deep learning, and database systems through office hours, grading, and mentoring.",
    logo: companyLogos.cmu,
  },
];

const projects = [
  {
    name: "Neural Network for Skin Cancer Detection",
    description:
      "Deep learning pipeline for HAM10000 skin-lesion classification with augmentation, imbalance handling, and melanoma-focused evaluation.",
    tags: [
      {
        name: "PyTorch",
        color: "blue-text-gradient",
      },
      {
        name: "Keras",
        color: "green-text-gradient",
      },
      {
        name: "Deep Learning",
        color: "pink-text-gradient",
      },
    ],
    source_code_link: "https://github.com/VedanthR5/C-NN-ancerDetect",
  },
  {
    name: "v2v's zetamac",
    description:
      "Zero-dependency mental math trainer for quant prep with URL-shareable configs and post-game weakness analysis.",
    tags: [
      {
        name: "JavaScript",
        color: "blue-text-gradient",
      },
      {
        name: "Analytics",
        color: "green-text-gradient",
      },
      {
        name: "Education",
        color: "pink-text-gradient",
      },
    ],
    demo_link: "https://vedanthr5.github.io/v2v-Zetamac/",
    source_code_link: "https://vedanthr5.github.io/v2v-Zetamac/",
  },
  {
    name: "BusTub Relational Database",
    description:
      "CMU BusTub RDBMS implementation <b>ranked 5th out of 200 students</b> after performance-tuning storage, indexing, execution, and query-optimization paths.",
    tags: [
      {
        name: "C++",
        color: "blue-text-gradient",
      },
      {
        name: "Database Systems",
        color: "green-text-gradient",
      },
      {
        name: "Query Optimization",
        color: "pink-text-gradient",
      },
      {
        name: "Concurrency",
        color: "blue-text-gradient",
      },
    ],
    source_code_link: "https://github.com/VedanthR5/bustub-private",
    private: true,
  },
  {
    name: "Quantfolio Trading Dashboard",
    description:
      "Interactive Streamlit quant toolkit for stock analysis, PyCaret model comparison, ARIMA/NeuralProphet forecasting, and Riskfolio-Lib portfolio optimization.",
    tags: [
      {
        name: "Streamlit",
        color: "blue-text-gradient",
      },
      {
        name: "PyCaret",
        color: "green-text-gradient",
      },
      {
        name: "Riskfolio-Lib",
        color: "pink-text-gradient",
      },
      {
        name: "Plotly",
        color: "blue-text-gradient",
      },
    ],
    demo_link: "https://vrquantfolio.streamlit.app/",
    source_code_link: "https://github.com/VedanthR5/quantfolio",
  },
  {
    name: "DDoS Attack Detection using Neural Networks",
    description:
      "Machine-learning system for detecting DDoS attacks from network-flow patterns using CNN-based classification.",
    tags: [
      {
        name: "TensorFlow",
        color: "blue-text-gradient",
      },
      {
        name: "Research",
        color: "pink-text-gradient",
      },
      {
        name: "Cybersecurity",
        color: "green-text-gradient",
      },
    ],
    source_code_link: "https://arxiv.org/abs/2309.05646",
  },

  {
    name: "FoodCycle App",
    description:
      "Congressional App Challenge-winning food waste marketplace connecting surplus inventory with community buyers.",
    tags: [
      {
        name: "React Native",
        color: "blue-text-gradient",
      },
      {
        name: "AWS Amplify",
        color: "green-text-gradient",
      },
      {
        name: "Social Impact",
        color: "pink-text-gradient",
      },
    ],
    source_code_link:
      "https://www.kxan.com/news/local/austin/four-teens-get-u-s-recognition-for-app-development-on-food-waste-and-insecurity/",
  },
  {
    name: "Austin Divided: Road to Recovery",
    description:
      "Investigative magazine analyzing Austin's urban planning history, gentrification, and community-level recovery through historical and economic lenses.",
    tags: [
      {
        name: "Journalism",
        color: "blue-text-gradient",
      },
      {
        name: "Social Justice",
        color: "green-text-gradient",
      },
      {
        name: "Urban Planning",
        color: "pink-text-gradient",
      },
    ],
    source_code_link: "https://issuu.com/lasaezine/docs/austin_divided",
  },
];

export { services, experiences, projects };
