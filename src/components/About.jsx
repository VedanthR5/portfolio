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
  <div className="about-grid">
    <div className="about-copy">
      <h2 className="section-title">About</h2>
      <p>
        I study artificial intelligence at Carnegie Mellon, with a concentration in computer
        systems, and graduate in 2028.
      </p>
      <p>
        Most of what I build is security or machine-learning software, and the part I enjoy is
        underneath it: how a decoder parses hostile input, or how a database keeps the right pages
        in memory under load. I follow markets for a related reason. They reward the same habit of
        distrusting a signal that looks too clean.
      </p>
      <p>
        I sit on the School of Computer Science&apos;s{" "}
        <External href="https://scsbusinessoffice.cs.cmu.edu/advisory-committees/index.html">
          undergraduate advisory committee
        </External>{" "}
        and have written sports columns for{" "}
        <External href="https://the-tartan.org/author/vedanth-ramanathan/">The Tartan</External>. In
        high school I founded <External href="https://www.computely.org">Computely</External>, a
        computing curriculum for K–12 students in Austin. Away from a keyboard, it&apos;s violin
        and basketball.
      </p>
    </div>

    <aside className="about-side" aria-label="Now and recognition">
      <section aria-labelledby="now-title">
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
      </section>

      <section aria-labelledby="recognition-title">
        <h3 id="recognition-title" className="side-title">
          Recognition
        </h3>
        <ul className="honors-list">
          {honors.map((honor) => (
            <li key={honor}>{honor}</li>
          ))}
        </ul>
      </section>
    </aside>
  </div>
);

const WrappedAbout = SectionWrapper(About, "about");
WrappedAbout.displayName = "About";

export default WrappedAbout;
