import { regentsPark300, regentsPark600 } from "../assets";

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
];

export const profile = {
  email: "vedanth.ramanathan@gmail.com",
  github: "https://github.com/VedanthR5",
  linkedin: "https://www.linkedin.com/in/vedanthramanathan",
  // Set VITE_RESUME_URL at build time to link the résumé directly; otherwise
  // visitors are offered an email request instead.
  resumeUrl: import.meta.env.VITE_RESUME_URL || null,
};

// The About photo and where it was taken. Coordinates are Regent's Park's
// (Wikipedia), shown when the location chip is hovered or focused.
export const portrait = {
  src: regentsPark300,
  srcSet: `${regentsPark300} 300w, ${regentsPark600} 600w`,
  width: 300,
  height: 375,
  alt: "Vedanth, smiling in sunglasses with his arms crossed, in the rose garden at Regent's Park.",
  place: "Regent's Park, London",
  coordinates: "51°31′56″N 0°09′24″W",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Regent%27s%20Park%2C%20London",
};

// What is true this term. Keep it short and dated; remove lines as they end.
export const now = {
  label: "Fall 2026",
  items: [
    {
      text: "Quantitative research on earnings-call signals with Prof. Lars-Alexander Kuehn.",
      href: "https://www.cmu.edu/ccf/",
    },
    {
      text: "COO at CivicDuty, tracking Georgia legislation one county at a time.",
      href: "https://civicduty.app",
    },
    {
      text: "Teaching assistant for Computer Vision (16-385).",
      href: "https://16385.courses.cs.cmu.edu/fall2026/courseinfo",
    },
  ],
};

// Grouped so the range reads at a glance. `note` is the context a reader needs.
export const honors = [
  {
    label: "Computing and security",
    items: [
      { name: "USACO Platinum" },
      { name: "National Cyber Scholar with Honors", note: "National Cyber Scholarship Foundation, 2023" },
      { name: "Congressional App Challenge winner", note: "Texas's 37th district, 2023, for FoodCycle" },
      { name: "ACM@CMU hackathon winner" },
    ],
  },
  {
    label: "Markets and ventures",
    items: [
      { name: "D. E. Shaw Vector Fellow", note: "About 100 students selected, 2026" },
      { name: "Top 3, CMU Citadel Quant Invitational" },
      { name: "McGinnis Venture Competition finalist", note: "CivicDuty, 2026" },
    ],
  },
  {
    label: "Violin",
    items: [
      { name: "TMEA All-State violinist", note: "Texas, all four years of high school" },
      { name: "YoungArts honorable mention" },
      { name: "Concerto competition finalist", note: "PIMF and Skylight" },
    ],
  },
];

// Each entry: `line` is what a skimmer needs; `detail` is for anyone who opens it.
// Link labels say what the destination is (Paper, Code, Demo, Coverage…).
export const experiences = [
  {
    id: "computational-finance",
    org: "CMU Center for Computational Finance",
    role: "Quantitative research",
    when: "Current",
    line: "Researching trading signals in company earnings calls with Professor Lars-Alexander Kuehn.",
    links: [
      { label: "Center", href: "https://www.cmu.edu/ccf/" },
      { label: "Prof. Kuehn", href: "https://larskuehn.com/" },
    ],
  },
  {
    id: "civicduty",
    org: "CivicDuty",
    role: "Chief operating officer",
    when: "Aug 2025 – now",
    line: "A legislative-tracking platform for Georgia: bills, votes, meetings and representatives, expanding one county at a time.",
    detail: [
      "In beta through the 2026 Georgia legislative session, with county, school-board and city bodies next. The team was a finalist in CMU's 2026 McGinnis Venture Competition.",
    ],
    links: [
      { label: "Product", href: "https://civicduty.app" },
      {
        label: "McGinnis finalists",
        href: "https://www.cmu.edu/swartz-center-for-entrepreneurship/resources-funding-and-talent/mcginnis-venture-competition/2026-final-round-info.html",
      },
    ],
  },
  {
    id: "project-zero",
    org: "Google Project Zero",
    role: "Software security engineering intern",
    when: "May – Aug 2026",
    place: "New York",
    line: "Built AV1Forge, a closed-loop fuzzing system for AV1 video decoders that autonomous agents can drive. It found a couple of bugs confirmed with AddressSanitizer.",
    detail: [
      "Written in Python and Rust. The loop generates AV1 bitstreams, mutates them down to individual OBUs, runs them through decoder harnesses, and feeds sanitizer results back into the next round, with crash triage automated.",
      "The difficult part was the encoder interface: it had to stay backward-compatible across more than 50,000 test cases so agents could drive the loop without breaking earlier work. I pushed for its use in continued agent-driven vulnerability research.",
    ],
    diagram: "fuzz",
    links: [{ label: "Project Zero", href: "https://projectzero.google" }],
  },
  {
    id: "lei-li-lab",
    org: "CMU Lei Li Lab",
    role: "Undergraduate AI research assistant",
    when: "May 2025 – Feb 2026",
    place: "Pittsburgh",
    line: "Extended DE-COP, a test for whether a language model was trained on specific copyrighted text.",
    detail: [
      "I benchmarked Mistral, Mixtral, LLaMA and GPT-family models using calibrated likelihood signals and AUC analysis, and built the PyTorch and Hugging Face pipeline for inference, calibration and evaluation. It reached 95% detection accuracy.",
      "DE-COP itself is the lab's method (Duarte et al., ICML 2024); my work extended its evaluation across model families.",
    ],
    links: [
      { label: "Lab", href: "https://leililab.github.io/" },
      { label: "Original method (paper)", href: "https://arxiv.org/abs/2402.09910" },
    ],
  },
  {
    id: "sandia",
    org: "Sandia National Laboratories",
    role: "Software engineering intern",
    when: "May – Aug 2025",
    place: "Livermore, CA",
    line: "Cut network-telemetry ingestion time by 30% and built machine-learning threat detection over aerospace network flows.",
    detail: [
      "The PostgreSQL ingestion pipeline streams DataFrames concurrently and tolerates schema drift in irregular telemetry.",
      "For detection, I benchmarked models over more than 5,000 aerospace network flows and moved training and regression evaluation into CI/CD. I also built an AI-assisted incident-response toolkit for DOE security operations that automates parts of analyst investigation and threat triage.",
    ],
    links: [],
  },
  {
    id: "georgia-tech",
    org: "Georgia Tech Institute for Information Security & Privacy",
    role: "Principal research assistant",
    when: "May 2023 – Feb 2025",
    place: "Atlanta",
    line: "First author of a paper on a small CNN that detects DDoS traffic at the network edge.",
    detail: [
      "A PyShark pipeline turns raw CIC-DDoS2019 packet captures into normalized, fixed-length bidirectional flows. The compact CNN reached 98.83% accuracy and 0.982 F1 on held-out traffic and classified the whole test set in 0.28 seconds.",
      "I also built honeypot pipelines that sustained more than 100,000 security events an hour.",
    ],
    diagram: "flow",
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2309.05646" },
      {
        label: "Code",
        href: "https://github.com/VedanthR5/A-Novel-Deep-Learning-Solution-to-detect-DDoS-attacks-using-Neural-Networks",
      },
    ],
  },
];

export const projects = [
  {
    id: "bustub",
    featured: true,
    org: "BusTub",
    role: "Database engine in C++",
    when: "2026",
    line: "An ACID database engine for CMU's database systems course; 5th among 190+ implementations on the performance benchmark.",
    detail: [
      "Thread-safe buffer pool, B+ tree index, vectorized execution, concurrency control and custom query-optimizer rules.",
      "Tuning for concurrent and OLAP workloads raised throughput by more than 50%. The implementation is private; the course's starter codebase is public.",
    ],
    diagram: "db",
    links: [{ label: "Course starter code", href: "https://github.com/cmu-db/bustub" }],
  },
  {
    id: "foodcycle",
    featured: true,
    org: "FoodCycle",
    role: "Surplus-food distribution, team of four",
    when: "2023 – 2026",
    line: "Matched vendors' surplus food with partner hubs; won the 2023 Congressional App Challenge for Texas's 37th district.",
    detail: [
      "The contest entry was a React and AWS Amplify marketplace built with three classmates. For the later Flutter, Node.js and Google Cloud version, which coordinated pickups between vendors and partner hubs, I built the vendor dashboard and backend; it supported delivery of more than 3,000 meals across Central Texas.",
    ],
    links: [
      { label: "Award", href: "https://www.congressionalappchallenge.us/23-tx37/" },
      {
        label: "Coverage (KXAN)",
        href: "https://www.kxan.com/news/local/austin/four-teens-get-u-s-recognition-for-app-development-on-food-waste-and-insecurity/",
      },
      { label: "Demo video", href: "https://www.youtube.com/watch?v=ZtAP1khv5Nw" },
      { label: "Code (2023)", href: "https://github.com/VedanthR5/FoodCycle" },
    ],
  },
  {
    id: "zetamac",
    featured: true,
    org: "v2v's zetamac",
    role: "Mental-math trainer",
    when: "2025",
    line: "A dependency-free arithmetic drill for quant interview prep. After each round it finds your slowest operation and drills it.",
    detail: [
      "Plain HTML, CSS and JavaScript. Settings are encoded in the URL, so a drill can be shared as a link, and the post-game table times every problem, then switches to practice mode for the slowest category.",
    ],
    image: "zetamac",
    links: [
      { label: "Demo", href: "https://vedanthr5.github.io/v2v-Zetamac/" },
      { label: "Code", href: "https://github.com/VedanthR5/v2v-Zetamac" },
    ],
  },
  {
    id: "quantfolio",
    org: "Quantfolio",
    role: "Portfolio analysis toolkit",
    when: "2026",
    line: "A Streamlit app for comparing forecasting models and optimizing portfolios.",
    links: [
      { label: "Demo (may take a minute to wake)", href: "https://vrquantfolio.streamlit.app/" },
      { label: "Code", href: "https://github.com/VedanthR5/Quantfolio-Optimization" },
    ],
  },
  {
    id: "portkey",
    org: "portkey",
    role: "Intent router",
    when: "2025",
    line: "Turns a typed intent into an action by routing it to the right tool.",
    links: [{ label: "Code", href: "https://github.com/VedanthR5/portkey" }],
  },
  {
    id: "skin-lesion",
    org: "Skin-lesion classifier",
    role: "Independent study",
    when: "2023 – 2024",
    line: "Compared a custom CNN with Inception v3 on the HAM10000 dermatoscopy dataset, reporting accuracy per lesion class. Presented at UT Austin's Oden Institute in May 2024.",
    links: [
      {
        label: "Talk at the Oden Institute",
        href: "https://oden.utexas.edu/news-and-events/events/1928---LASA%20Computer%20Science%20Independent%20Study%20Students/",
      },
      {
        label: "Slides",
        href: "https://docs.google.com/presentation/d/17k3rfrBu-ShUnvRCkQ0N9p9d9BurqgM_/edit?usp=sharing",
      },
    ],
  },
];
