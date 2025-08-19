# Vedanth Ramanathan — Knowledge Pack

_Last updated: 2025-08-15_

## Quick Profile

- **Name:** Vedanth Ramanathan
- **Affiliations:** Carnegie Mellon University (student; contributor/writer at The Tartan, CMU's student newspaper)
- **Focus areas:** Applied AI/ML, security (DDoS detection), computer vision for healthcare, civic-tech/social impact apps.

## Canonical Summary

Vedanth Ramanathan is a student technologist and writer whose work spans **AI security**, **computer vision for health**, and **civic-tech**. Highlights include: a **Congressional App Challenge**-winning app (TX-37, 2023) addressing food waste and food insecurity (FoodCycle), a **deep-learning CNN** for **DDoS attack detection** evaluated on the CIC-DDoS2019 dataset, and public-facing teaching materials on **neural networks and skin-cancer classification**. He also writes for **The Tartan** (CMU), covering campus and national topics.

---

## Projects & Research (RAG-ready)

### 1) FoodCycle — Congressional App Challenge Winner (TX-37, 2023)

- **One-line:** Marketplace-style app redirecting surplus food from vendors to families in need; reduces food waste and methane emissions.
- **Team:** Vedanth Ramanathan; Vedant Sangani; William Gu; Justin Kwon.
- **Outcome:** Named **winner** of Rep. Lloyd Doggett’s 2023 Congressional App Challenge for TX-37 (House of Representatives program). Featured by the school (LASA) and the Computely initiative.
- **Problem & approach (from statements):** Addresses the “paradox of food waste and hunger,” enabling local markets/businesses to securely share surplus food with the community; aims for environmental and social benefits.
- **Notable dates:** District winner announcement article dated **Jan 31, 2024** (for the 2023 cycle); additional post Dec 19, 2023.
- **Entities/aliases:** FoodCycle; Congressional App Challenge; TX-37; Rep. **Lloyd Doggett**; LASA (Liberal Arts & Science Academy); **House of Code**.
- **Suggested tags:** food-waste, social-impact, marketplace, sustainability, CAC-2023.
- **Links (public):**
  - Congressional App Challenge TX-37 (2023) page — FoodCycle
  - CAC blog summary of TX-37 (2023) winners
  - LASA school news post (Jan 27, 2024) on FoodCycle
  - Computely post announcing FoodCycle win (Dec 19, 2023)

### 2) DDoS Detection with CNNs (arXiv preprint; science fair project)

- **One-line:** Supervised CNN that detects DDoS traffic using CIC-DDoS2019 flows; emphasizes preprocessing to create a spatial representation of packet flows.
- **Key methods:** Flow extraction from PCAP; zero-padding/normalization; 2D CNN (64 filters, 3×3), dropout, pooling; sigmoid output for binary classification.
- **Dataset:** CIC-DDoS2019 (Canadian Institute for Cybersecurity).
- **Reported performance:** Accuracy ≈ **0.9883** on 2000 unseen flows; strong precision/recall; confusion-matrix presented.
- **Artifacts:** arXiv preprint; GitHub repository (Apache-2.0) with README, figures, and a slide deck.
- **Awards (self-reported on repo):** **US Army and Navy Excellence Awards**, **3rd place** at science fair.
- **Suggested tags:** cybersecurity, ddos, cnn, intrusion-detection, cic-ddos2019.
- **Links (public):**
  - arXiv preprint
  - GitHub repository (README + figures)
  - CIC-DDoS2019 dataset page

### 3) Neural Networks & Computer Vision for Skin Cancer — Teaching Slides

- **One-line:** Introductory lecture deck on neural networks, training dynamics (losses, GD, overfitting, dropout), and CNNs for **skin lesion** classification.
- **Dataset focus:** **HAM10000** (10,015 dermatoscopic images; ISIC 2018 context); addresses class imbalance via augmentation and weighting.
- **Key takeaways:** Covers perceptron → multilayer NNs → backprop → CNNs; data augmentation strategies; introduces metrics and confusion matrices; discusses sensitivity to specific lesion classes.
- **Suggested tags:** computer-vision, healthcare, cnn, ham10000, education.
- **Artifacts:** Lecture PDF / slide deck.

---

## Journalism & Writing

- **Outlet:** **The Tartan** (CMU).
- **Example coverage:** Campus reactions to congressional scrutiny of Chinese students and research; broader context on academic freedom and federal oversight.
- **Entities:** President Farnam Jahanian, House Select Committee on the CCP, AAUP, Inside Higher Ed, CNN, AP, NBC, NYT (referenced in article).
- **Suggested tags:** journalism, higher-education, policy, CMU.

---

## Skills & Technologies (inferred from artifacts)

- **AI/ML:** CNNs, supervised learning, data preprocessing for network traffic; Python, TensorFlow.
- **Data/Infra:** PCAP parsing, flow construction, normalization/zero-padding; experimentation and cross-validation.
- **Civic-tech:** Product conception for social impact; marketplace design considerations (security, efficiency, community benefits).
- **Communication:** Public-facing technical education (slides), campus journalism.

---

## Structured Facts (for slot-filling)

- **Person:** Vedanth Ramanathan
- **Education/affiliation:** Student at Carnegie Mellon University (CMU); writer at The Tartan.
- **Award:** Congressional App Challenge **district winner** (TX-37, 2023) for **FoodCycle**.
- **Research:** DDoS detection using CNNs; reported accuracy ~0.9883 on unseen flows; CIC-DDoS2019 dataset.
- **Teaching/Outreach:** Lecture slides on neural networks and skin-cancer CV.
- **Teams/Collaborators:** Vedant Sangani; William Gu; Justin Kwon (FoodCycle). Krish Mahadevan; Sejal Dua (DDoS paper co-authors).
- **Organizations:** Congressional App Challenge; Liberal Arts & Science Academy; Canadian Institute for Cybersecurity; The Tartan.

---

## Source Notes (for ingestion)

- Congressional App Challenge TX-37 (2023) winner page: FoodCycle; team roster; motivation; program context.
- CAC 2023 winners round-up page (TX-37 entry).
- LASA school news (Jan 27, 2024) on FoodCycle and its goals (redistribution; methane).
- Computely post (Dec 19, 2023) describing the initiative and FoodCycle win.
- arXiv (Sep 2023): “A Novel Supervised Deep Learning Solution to Detect DDoS attacks on Edge Systems using CNN” (Ramanathan, Mahadevan, Dua).
- GitHub repo with README (methods, claimed awards, TensorFlow).
- CIC-DDoS2019 dataset page (Canadian Institute for Cybersecurity).
- Lecture PDF: “An Introduction to Neural Networks and Computer Vision in Skin Cancer Applications” (slides by Vedanth Ramanathan).
- The Tartan (Mar 30, 2025): article by Vedanth Ramanathan (CMU).

---

## Raw Links (verbatim, for your pipeline)

- Congressional App Challenge TX-37 (2023): https://www.congressionalappchallenge.us/23-tx37/
- CAC 2023 Winners (list): https://www.congressionalappchallenge.us/2023-winners/
- LASA school news: https://lasa.austinschools.org/news/2024/01/27/congressional-app-challenge
- Computely post: https://www.computely.org/post/food-cycle-wins-congressional-app-challenge-for-us-house-tx-37
- arXiv entry: https://arxiv.org/abs/2309.05649
- GitHub repo (DDoS CNN): https://github.com/VedanthR5/A-Novel-Deep-Learning-Solution-to-detect-DDoS-attacks-using-Neural-Networks
- CIC-DDoS2019 dataset: https://www.unb.ca/cic/datasets/ddos-2019.html
- Lecture PDF (uploaded): NeuralNetsForSkinCancer.pdf
- DDoS Paper PDF (uploaded): ResearchPaper.pdf
- The Tartan article: https://the-tartan.org/2025/03/30/congress-pens-letter-to-cmu-on-chinese-students-faculty/
