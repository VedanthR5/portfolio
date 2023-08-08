import {
  dart,
  divided,
  flutter,
  latex,
  linux,
  canva,
  mobile,
  backend,
  survey,
  creator,
  web,
  javascript,
  java,
  python,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  github,
} from "../assets";

export const navLinks = [
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
];

const services = [
  {
    title: "Web Development",
    icon: web,
  },
  {
    title: "Mobile Development",
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
    name: "Canva",
    icon: canva,
  },
  {
    name: "CSS",
    icon: css,
  },
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Github",
    icon: github,
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
    name: "Latex",
    icon: latex,
  },
  {
    name: "Linux",
    icon: linux,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "React JS",
    icon: reactjs,
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
    name: "Resume",
    description: "The Resume of Vedanth Ramanathan",
    tags: [
      {
        name: "projects",
        color: "blue-text-gradient",
      },
      {
        name: "achievements",
        color: "green-text-gradient",
      },
      {
        name: "academic",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link:
      "https://pdfhost.io/v/FLySS.dQ0_Vedanth_Ramanathan_Resume_8823",
  },
  {
    name: "Github Portfolio",
    description:
      "Code for school, projects, and all my scripts for the Cyberpatriot Competition",
    tags: [
      {
        name: "dashboard",
        color: "blue-text-gradient",
      },
      {
        name: "code",
        color: "green-text-gradient",
      },
      {
        name: "cybersecurity",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/VedanthR5",
  },
  {
    name: "Detecting DDoS attacks using Neural Networks",
    description:
      "Science Fair Project made by Vedanth Ramanathan. Won US Army and Navy Excellence Awards. 3rd in Fair. Made using Python, LinuxMint, and Tensorflow. Achieved a Accuracy of 97.6% over 2000+ samples.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "linux",
        color: "green-text-gradient",
      },
      {
        name: "science fair",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link:
      "https://scienteer.com/project/display/ZWZlMjMzYzVlMWEwMDM1OWQ2M2ZiZjY0NmQzNmZlMzE5NTU4ZTQ3NTIuMTgyMzM0.dc797fd1eceb082093407db8c1548c71f841d897ec27efff847cee908901fa0c/",
  },
  {
    name: "Austin Divided: Road to Recovery",
    description:
      "In this magazine, my fellow colleagues and I wanted to capture the less known history of Austin's racist past and how it had come to the forefront in city planning and gentrification. In Austin Divided: Road to Recovery, we analyzed 5 different lens (History, Economical, Geographical, and Education, and Police Brutality) of how Austin was shaped by racist processes and how that was affecting and could affect the city for years to come. Based on interviews done with professors, locals, and businessess",
    tags: [
      {
        name: "gentrification",
        color: "blue-text-gradient",
      },
      {
        name: "adobe",
        color: "green-text-gradient",
      },
      {
        name: "Austin",
        color: "pink-text-gradient",
      },
    ],
    image: divided,
    source_code_link: "https://issuu.com/lasaezine/docs/austin_divided",
  },
  {
    name: "Survey App",
    description:
      "Using Microsoft Sharepoint and Powerapps, I created a basic survey to use to get data for innovative app ideas. -Used by Elementary Schools across AISD as an engagement tool.",
    tags: [
      {
        name: "Microsoft",
        color: "blue-text-gradient",
      },
      {
        name: "Sharepoint",
        color: "green-text-gradient",
      },
      {
        name: "Powerapps",
        color: "pink-text-gradient",
      },
    ],
    image: survey,
    source_code_link:
      "https://apps.powerapps.com/play/b84bdf40-dd4a-4c42-9bbb-6dfb18fa85f0?tenantId=5f37781d-268b-465c-8cb5-c18270fb129c",
  },
];

export { services, technologies, experiences, projects };
