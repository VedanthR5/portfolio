import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { SectionWrapper } from "../hoc";
import { honors, now, portrait } from "../constants";
import { posts } from "../blog/catalog";

const latestPost = [...posts].sort((a, b) => b.date.localeCompare(a.date))[0];

const PinIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden="true" className="place-pin">
    <path
      fill="currentColor"
      d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
    />
  </svg>
);

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
          I&apos;m in Carnegie Mellon&apos;s class of 2028, studying artificial intelligence
          with a concentration in computer systems.
        </p>
        <p>
          I work mostly on security and machine learning. This summer at Google Project
          Zero, I built a fuzzer that agents can run against AV1 video decoders. Before
          that, I tested whether language models had trained on copyrighted text, and
          wrote a paper on spotting DDoS floods with a network small enough to run at
          the edge.
        </p>
        <p>
          Markets are the newer thread. My current research looks for trading signals
          in the language of earnings calls, and I&apos;ve started{" "}
          <Link to="/blog">writing</Link> about the institutions behind the prices.
        </p>
        <p>
          At CMU, I chair the{" "}
          <External href="https://scsbusinessoffice.cs.cmu.edu/advisory-committees/index.html">
            School of Computer Science Dean&apos;s Advisory Council
          </External>{" "}
          and have written sports columns for{" "}
          <External href="https://the-tartan.org/author/vedanth-ramanathan/">The Tartan</External>.
          In high school, I founded <External href="https://www.computely.org">Computely</External>{" "}
          to teach computing to students around Austin. I&apos;ve played the violin for
          thirteen years, and play basketball and football when I can.
        </p>
      </div>

      <div className="about-side">
        <figure className="about-photo">
          <img
            src={portrait.src}
            srcSet={portrait.srcSet}
            sizes="(min-width: 1024px) 280px, 300px"
            width={portrait.width}
            height={portrait.height}
            alt={portrait.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <a className="place-chip" href={portrait.mapUrl} target="_blank" rel="noopener noreferrer">
              <PinIcon />
              <span className="place-text">
                <span>{portrait.place}</span>
                <span className="place-coords" aria-hidden="true">
                  {portrait.coordinates}
                </span>
              </span>
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
          </figcaption>
        </figure>

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
      </div>
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
