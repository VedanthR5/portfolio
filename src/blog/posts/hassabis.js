export default {
  "layout": "essay",
  "lede": "Demis Hassabis wants to understand intelligence and then use it to solve everything else. His [[wsj|Wall Street Journal profile]] stretches that aim from drug discovery to the nature of reality. Two days earlier, Sofia Liguori published [[liguori|a letter about leaving Google DeepMind]]. She could no longer accept the company’s military and surveillance partnerships, or the silence she described around them.",
  "sources": {
    "wsj": {
      "title": "Why AI’s Deepest Mind Believes the World Is About to Change Radically",
      "publisher": "The Wall Street Journal · Ben Cohen",
      "date": "2026-10-21",
      "kind": "Profile · subscription may be required",
      "url": "https://www.wsj.com/tech/ai/demis-hassabis-ai-deepmind-google-isomorphic-2b4e3153",
      "summary": "Hassabis discusses intelligence, scientific discovery, Isomorphic Labs, and the future he hopes AI will help build."
    },
    "liguori": {
      "title": "Stay Human.",
      "publisher": "Sofia Liguori",
      "date": "2026-10-20",
      "kind": "First-person account and opinion",
      "url": "https://stay-human.sofialiguori.com/",
      "summary": "Liguori explains her departure from Google DeepMind and her concerns about military partnerships, workplace silence, and responsibility for AI’s uses."
    },
    "bcg": {
      "title": "Navigating the Jagged Technological Frontier",
      "publisher": "Organization Science · Fabrizio Dell’Acqua and colleagues",
      "date": "2026-03-11",
      "kind": "Research · randomized experiment",
      "url": "https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838",
      "summary": "An experiment with 758 BCG consultants found GPT-4 improved performance on some tasks and reduced correctness on a task outside its capabilities."
    },
    "bundle": {
      "title": "Introducing The X Subscription",
      "publisher": "SpaceXSI",
      "date": "2026-10-12",
      "kind": "Company announcement",
      "url": "https://x.ai/news/x-subscription",
      "summary": "The announcement brings Grok, Grok Bot, Cursor, and X Premium into one subscription."
    },
    "manifesto": {
      "title": "A Framework for Frontier AI and the Dawning of a New Age",
      "publisher": "DeepMind Institute · Demis Hassabis",
      "date": "2026-07-14",
      "kind": "Policy proposal",
      "url": "https://institute.deepmind.com/essays/a-framework-for-frontier-ai-and-the-dawning-of-a-new-age/",
      "summary": "Hassabis proposes a federally overseen standards body for frontier-model assessments, independent tests, and possible coordinated slowdowns."
    },
    "gao": {
      "title": "Ask Sage, Inc. — B-423826",
      "publisher": "U.S. Government Accountability Office",
      "date": "2025-12-18",
      "kind": "Administrative bid-protest decision",
      "url": "https://www.gao.gov/products/b-423826",
      "summary": "GAO dismisses a protest concerning a government ChatGPT arrangement on procedural grounds, without ruling on the merits of the supplier’s competition concerns."
    },
    "foia": {
      "title": "Freedom of Information Act: Frequently Asked Questions",
      "publisher": "U.S. Department of Justice · FOIA.gov",
      "kind": "Official guidance",
      "url": "https://www.foia.gov/faq.html",
      "summary": "The guide explains federal records requests, exemptions, and appeals, including protections for classified and certain confidential commercial information."
    },
    "civicduty": {
      "title": "CivicDuty",
      "publisher": "CivicDuty",
      "kind": "Product · author’s disclosed affiliation",
      "url": "https://civicduty.app/",
      "summary": "CivicDuty makes Georgia government information easier to follow, with summaries linked to official sources. Vedanth Ramanathan is its COO."
    }
  },
  "sections": [
    {
      "id": "learning-the-fundamentals",
      "title": "Learning the fundamentals",
      "paragraphs": [
        "I believe much of what Hassabis hopes for is possible. Liguori’s account makes me less willing to assume that building the technology will get us there. Who benefits and who gets a say will depend partly on the contracts, business models, and workplace habits forming now. We are making those choices already, long before anyone agrees on when AGI will arrive.",
        "Isomorphic Labs is a good example of what is at stake. Hassabis wants to improve how drugs are found across diseases. A tool that lets scientists test more ideas changes what they can attempt, and an investigation once ruled out by cost or time can become worth pursuing. He wants to improve our ability to discover, and then apply the improved ability again.",
        "I see a similar opening for people who work nowhere near an AI lab. Someone who knows a field well and also understands machine learning has more ways to go after that field’s problems. I am optimistic about people who take that combination seriously. They learn faster. They can try approaches they once had no means to test, and they notice uses for AI that someone outside their field would miss.",
        "So people should learn how machines learn from data. Supervised learning uses examples paired with targets. Unsupervised learning finds structure. Much of ML amounts to optimizing an objective someone chose. Fitting a regression and training a neural network differ enormously in scale and complexity, but those ideas help explain both, and they belong in a broad education.",
        "We already accept this logic for economics. We teach it to people who will never become economists because incentives, prices, and opportunity cost help them understand decisions that affect their lives. Keynesian and Austrian thinkers offered different accounts of how economies work, and those accounts remain disputed. We learn the arguments anyway, look at experience, and try to judge where each one helps. AI deserves the same willingness to learn.",
        "What you gain is a way to reason about a system before accepting its output. Take an analyst studying company earnings calls. They need to know which financial comparisons make sense. They also need to know how a model could produce an impressive result by using information that would not have been available when the trade had to be made. An assistant can speed up the work and preserve that error the whole way through. Someone who understands only the field, or only the method, may not catch it.",
        "You can push on a door for a long time without opening it if you never turn the knob. The fundamentals give people that kind of advantage, and a basis for learning the next system when the current one changes."
      ],
      "quote": "When you’re in the midst of it, it’s so hard to make any progress that you don’t really worry about the top of the mountain. You’re just focusing on the next foothold and not falling off the mountain",
      "quoteSource": "wsj",
      "quoteAttribution": "Demis Hassabis · WSJ Magazine"
    },
    {
      "id": "work-and-responsibility",
      "title": "Work and responsibility",
      "paragraphs": [
        "None of this makes judgment automatic. In an [[bcg|experiment with 758 BCG consultants using GPT-4]], AI improved performance on some tasks. On a task outside its abilities, it made correct answers less likely. These were trained professionals doing work designed to resemble their jobs, and knowing their field did not tell them when to trust the model. That takes practice: testing its answers, finding where it fails, and changing how you use it.",
        "People choose what a model is trained to optimize. People decide how the trained system is used. A model can perform better while serving a purpose we should reject, and understanding how it works gives no one an exemption from judging that purpose.",
        "Liguori’s letter insists on that responsibility. She describes people who kept their own research separate from the company’s military work and went on believing in its good uses. I recognize the comfort in that separation. At Google, I worked with people who cared deeply about what they built, and that care can make the company’s direction harder to confront. When you have good reasons to value the work in front of you, it becomes easier to leave decisions about other uses to the people above you.",
        "Workplaces reward solving the problem you were assigned. Questioning the assignment itself carries a different cost, and people have careers and livelihoods to protect. But if everyone treats the wider decisions as someone else’s responsibility, those decisions belong to the few with the power to make them.",
        "I do not share Liguori’s certainty that deploying agentic AI in today’s world must produce net harm. I do share her refusal to let good intentions settle the issue. A company that claims to welcome hard questions about intelligence should let its workers ask hard questions about contracts and uses. Any serious account of how AI will benefit people has to include their ability to object."
      ]
    },
    {
      "id": "competition-and-control",
      "title": "Competition and control",
      "paragraphs": [
        "The problem does not stop at the office door. Who can compete with the firms building these systems? And who controls the information the public uses to judge them?",
        "The [[bundle|X Subscription]] now bundles Grok, Grok Bot, Cursor, and X Premium. That can save users money and effort. It also moves tools for producing information closer to a channel for spreading it. Defaults, source choices, and the way an answer frames a dispute can shape what a person believes before they ever inspect the evidence.",
        "That power concerns me even without evidence of deliberate abuse in any particular answer. People should be able to question the account they receive, compare it with another, and leave the service. Competition helps preserve those options. Rules that shut out new firms can leave both the tools and the terms of public debate in fewer hands.",
        "Hassabis’s [[manifesto|July manifesto]] proposes a standards body funded largely by industry and overseen by the federal government. It would assess frontier models and develop independent tests, and it could coordinate a slowdown if the risks required one. The proposal includes independent experts and open-source representatives. I share his concern for good regulation. I also want to know who can challenge the body’s decisions, and whether a new firm can afford to meet its demands. If established labs can bear the cost of review and a newcomer cannot, the rules can shield incumbents from competition. The independent experts and open-source representatives need enough authority to prevent that.",
        "Competition alone will not resolve the problem Liguori raises. Several firms can compete to supply a use that harms people. Governments help set the incentives through what they buy and what they permit, so their deals need scrutiny from people who can obtain evidence and act on it."
      ]
    },
    {
      "id": "public-accountability",
      "title": "Public accountability",
      "paragraphs": [
        "Making that scrutiny real is harder than pointing out that oversight exists. When [[gao|Ask Sage challenged a government ChatGPT arrangement]], it raised concerns about future vendor lock-in. GAO dismissed the protest on grounds involving contract administration and Ask Sage’s eligibility to bring the claim. It never decided whether the concerns were justified, which means a serious objection never reached anyone who would rule on its merits.",
        "Public records laws offer another route, though [[foia|national-security and commercial-confidentiality exemptions]] can restrict access. For accountability to mean much, people need to know what was bought and which uses were agreed to. They need to know who bears responsibility and where an objection can be heard. An announcement that a deal will improve efficiency tells them almost none of that.",
        "As COO of [[civicduty|CivicDuty]], I help build tools that make Georgia government information easier to understand and trace to its sources. We want people to follow decisions closely enough to form a view and respond. A record buried in unfamiliar language gives the public far less power than one people can find and understand well enough to question.",
        "AI can help with that work. It can explain a term, help someone put a concern into words, or make a position they disagree with easier to understand. But the source has to stay within reach, and the person has to be able to correct the summary. Otherwise the tool is one more authority asking to be trusted.",
        "I want that kind of assistance to count when we judge progress. A model that helps people express their thoughts and take part in decisions has value alongside one that can complete a harder task, and companies and governments need reasons to reward both. I do not yet know how to change incentives that make greater capability so attractive while leaving the costs to people who never chose the system.",
        "Hassabis says we have to build toward the future we want. I agree. For me, that starts with learning the methods well enough to use and question them, and with taking responsibility for the choices made where we work. It also means keeping routes open for people outside those workplaces to object. I remain hopeful about what AI can help us discover. I want more people to have the knowledge, freedom, and means to decide what we do with it."
      ]
    }
  ]
};
