import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { SectionWrapper } from "../hoc";
import { honors, now } from "../constants";
import { posts } from "../blog/catalog";

const latestPost = [...posts].sort((a, b) => b.date.localeCompare(a.date))[0];

const External = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

External.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const About = () => (
  <>
    <div className="about-grid">
      <div className="about-copy">
  <h2 className="section-title">About</h2>
  <p>
    I study artificial intelligence at Carnegie Mellon, concentrating in computer
    systems. I graduate in 2028.
  </p>
  <p>
    My work sits around security, machine learning, and the systems beneath them.
    I've built tools to find vulnerabilities in video decoders, worked on incident
    response, and researched what language models may have seen during training.
    I've also become interested in markets and how people make decisions with
    incomplete information.
  </p>
  <p>
    At CMU, I chair the{" "}
    <External href="https://scsbusinessoffice.cs.cmu.edu/advisory-committees/index.html">
      School of Computer Science Dean&apos;s Advisory Council
    </External>{" "}
    and have written sports columns for{" "}
    <External href="https://the-tartan.org/author/vedanth-ramanathan/">
      The Tartan
    </External>
    . In high school, I founded{" "}
    <External href="https://www.computely.org">Computely</External> to teach
    computing to students in Austin. I've played violin for 13 years and made
    Texas All-State four times. I play basketball & football with less distinction.
  </p>
</div>

      <aside className="about-side" aria-labelledby="now-title">
        <h3 id="now-title" className="side-title">
          Now <span>{now.label}</span>
        </h3>
        <ul className="now-list">
          {now.items.map((item) => (
            <li key={item.text}>
              <External href={item.href}>{item.text}</External>
            </li>
          ))}
          {latestPost && (
            <li>
              Latest essay: <Link to={`/blog/${latestPost.slug}`}>{latestPost.title}</Link>
            </li>
          )}
        </ul>
      </aside>
    </div>

    <section className="recognition" aria-labelledby="recognition-title">
      <h3 id="recognition-title" className="recognition-title">
        Recognition
      </h3>
      <div className="recognition-groups">
        {honors.map((group) => (
          <div key={group.label} className="recognition-group">
            <p className="recognition-label">{group.label}</p>
            <ul>
              {group.items.map((honor) => (
                <li key={honor.name}>
                  <span className="recognition-name">{honor.name}</span>
                  {honor.note && <span className="recognition-note">{honor.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </>
);

const WrappedAbout = SectionWrapper(About, "about");
WrappedAbout.displayName = "About";

export default WrappedAbout;
