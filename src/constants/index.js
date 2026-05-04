import {
  divided,
  flutter,
  mobile,
  backend,
  creator,
  web,
  javascript,
  java,
  python,
  html,
  css,
  meta,
  starbucks,
  tesla,
  shopify,
  tripguide,
  github,
  nn,
  FoodCycle,
  antihack,
  zetamac,
} from "../assets";

export const navLinks = [
  {
    id: "linkedin",
    title: "LinkedIn",
  },
  {
    id: "github",
    title: "GitHub",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "activities",
    title: "Activities",
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

const technologies = [
  {
    name: "CSS",
    icon: css,
  },
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "Github",
    icon: github,
    link: "https://github.com/VedanthR5",
  },
  {
    name: "HTML 5",
    icon: html,
    link: "https://google.com", //change
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Python",
    icon: python,
  },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const projects = [
  {
    name: "Neural Network for Skin Cancer Detection",
    description:
      "Advanced deep learning model using Keras and PyTorch on the HAM10000 dataset to detect skin cancer with high accuracy. Features custom CNN architecture, data augmentation, and comprehensive evaluation metrics for melanoma classification.",
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
    image: nn,
    source_code_link: "https://jumpshare.com/share/ENaTgDliEHGVtNfJuTNk",
  },
  {
    name: "v2v's zetamac",
    description:
      "Mental math trainer for aspiring quants and trading interview prep - Speed drill with post-game analysis identifying your slowest operations and specific problem patterns. Features customizable ranges, shareable configurations via URL encoding, and detailed performance breakdowns. Pure JavaScript implementation with no dependencies.",
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
    image: zetamac,
    source_code_link: "https://vedanthr5.github.io/v2v-Zetamac/",
  },
  {
    name: "DDoS Attack Detection using Neural Networks",
    description:
      "Award-winning science fair project detecting DDoS attacks on edge devices using machine learning. Won US Army and Navy Excellence Awards, placed 3rd overall. Achieved 97.6% accuracy using Python, TensorFlow, and custom neural network architecture.",
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
    image: tripguide,
    source_code_link: "https://arxiv.org/abs/2309.05646",
  },

  {
    name: "FoodCycle App",
    description:
      "WINNER of Congressional App Challenge (TX-37) - Revolutionary app reducing food waste in supermarkets through smart inventory management. Featured by ABC, NBC, and Central Texas Food Bank. Full-stack React Native app with AWS backend.",
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
    image: FoodCycle,
    source_code_link:
      "https://www.kxan.com/news/local/austin/four-teens-get-u-s-recognition-for-app-development-on-food-waste-and-insecurity/",
  },
  {
    name: "DOD Cybersecurity Windows 10 Hardening Scripts",
    description:
      "Professional-grade PowerShell and Batch scripts for CyberPatriot XIV competition, aligned with Department of Defense cybersecurity standards. Automates Windows 10 security hardening, vulnerability patching, and system optimization.",
    tags: [
      {
        name: "PowerShell",
        color: "blue-text-gradient",
      },
      {
        name: "Windows Security",
        color: "green-text-gradient",
      },
      {
        name: "Automation",
        color: "pink-text-gradient",
      },
    ],
    image: antihack,
    source_code_link:
      "https://github.com/VedanthR5/Clickbait-Cyberpatriot-2022-2023/tree/main",
  },
  {
    name: "Austin Divided: Road to Recovery",
    description:
      "Investigative journalism magazine analyzing Austin's urban planning history and its modern impacts on gentrification. Multi-lens analysis covering historical, economic, geographical, educational, and social justice perspectives through community interviews.",
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
    image: divided,
    source_code_link: "https://issuu.com/lasaezine/docs/austin_divided",
  },
];

export { services, technologies, experiences, projects };
