import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import Diagram from "./Diagram";
import { trackProjectClick } from "../utils/analytics";
import zetamacAnalysis from "../assets/work/zetamac-analysis.jpg";

const images = {
  zetamac: {
    src: zetamacAnalysis,
    width: 752,
    height: 660,
    alt: "Zetamac results after a scripted 30-second round: 28 correct, 1.07 s average, slowest category multiplication, with a per-problem timing table.",
  },
};

const currentHash = () => decodeURIComponent(window.location.hash.slice(1));

// Mirror the most recently opened entry in the URL without adding history
// entries or telling the router (which would reset scroll on an empty hash).
const writeHash = (id) => {
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, "", id ? `#${id}` : `${pathname}${search}`);
};

// Open rows survive a round trip to the blog and back, so the browser's
// scroll restoration lands on the same content.
const rememberedOpen = new Map();
// Only a fresh page load treats the URL hash as an arrival; Back and Forward
// leave the reader where the browser restores them.
let isFreshLoad = true;

const EvidenceLinks = ({ entry }) =>
  entry.links.length > 0 && (
    <ul className="work-links" aria-label={`${entry.org} links`}>
      {entry.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProjectClick(`${entry.org}: ${link.label}`)}
          >
            {link.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );

const Artifact = ({ entry }) => {
  if (entry.diagram) {
    return (
      <figure className="work-artifact is-diagram">
        <Diagram kind={entry.diagram} />
      </figure>
    );
  }
  const image = images[entry.image];
  if (!image) return null;
  return (
    <figure className="work-artifact is-image">
      <img src={image.src} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />
    </figure>
  );
};

const WorkItem = ({ entry, isOpen, hasArrived, onToggle }) => {
  const reduceMotion = useReducedMotion();
  const detailId = `${entry.id}-detail`;
  const buttonId = `${entry.id}-toggle`;
  // A row with nothing more to show has no toggle.
  const expandable = Boolean(entry.detail?.length || entry.diagram || entry.image);

  // Escape anywhere in an open row (its toggle or its links) closes it.
  const closeOnEscape = (event) => {
    if (event.key !== "Escape" || !isOpen) return;
    event.stopPropagation();
    onToggle(entry.id);
    document.getElementById(buttonId)?.focus();
  };

  // A mouse can open the row from anywhere in its head; links keep their own
  // behavior and the toggle stays the keyboard and touch control, so a tap
  // that just misses a link doesn't open the row.
  const toggleFromHead = (event) => {
    if (!expandable || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (event.target.closest("a, button") || window.getSelection()?.toString()) return;
    onToggle(entry.id);
  };

  return (
    <li
      id={entry.id}
      className={`work-item${isOpen ? " is-open" : ""}${hasArrived ? " is-arrived" : ""}${expandable ? "" : " is-static"}`}
      onKeyDown={closeOnEscape}
    >
      <div className="work-head" onClick={toggleFromHead}>
        <p className="work-when">{entry.when}</p>
        <div className="work-main">
          <h3 className="work-title">
            {expandable ? (
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={detailId}
                onClick={() => onToggle(entry.id)}
              >
                <span className="work-org">{entry.org}</span>
                <span className="work-role">{entry.role}</span>
                <span className="work-toggle" aria-hidden="true" />
              </button>
            ) : (
              <span className="work-title-static">
                <span className="work-org">{entry.org}</span>
                <span className="work-role">{entry.role}</span>
              </span>
            )}
          </h3>
          <p className="work-line">{entry.line}</p>
          <EvidenceLinks entry={entry} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expandable && isOpen && (
          <motion.div
            id={detailId}
            role="region"
            aria-labelledby={buttonId}
            className="work-detail"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`work-detail-inner${entry.diagram || entry.image ? " has-artifact" : ""}`}>
              <div className="work-detail-copy">
                {entry.place && <p className="work-place">{entry.place}</p>}
                {(entry.detail ?? []).map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <Artifact entry={entry} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

// Smaller work: one line and its links, nothing to open.
const CompactItem = ({ entry }) => (
  <li id={entry.id} className="also-item">
    <p className="work-when">{entry.when}</p>
    <div>
      <h3 className="also-title">
        <span className="work-org">{entry.org}</span> <span className="work-role">{entry.role}</span>
      </h3>
      <p className="work-line">{entry.line}</p>
      <EvidenceLinks entry={entry} />
    </div>
  </li>
);

const entryShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  org: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  when: PropTypes.string.isRequired,
  place: PropTypes.string,
  line: PropTypes.string.isRequired,
  detail: PropTypes.arrayOf(PropTypes.string),
  diagram: PropTypes.string,
  image: PropTypes.string,
  featured: PropTypes.bool,
  links: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired, href: PropTypes.string.isRequired })
  ).isRequired,
});

EvidenceLinks.propTypes = { entry: entryShape.isRequired };
Artifact.propTypes = { entry: entryShape.isRequired };
CompactItem.propTypes = { entry: entryShape.isRequired };
WorkItem.propTypes = {
  entry: entryShape.isRequired,
  isOpen: PropTypes.bool.isRequired,
  hasArrived: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const WorkList = ({ entries, label, alsoLabel }) => {
  // Lists that mark some entries `featured` show the rest as a compact list.
  const tiered = entries.some((entry) => entry.featured);
  const rows = tiered ? entries.filter((entry) => entry.featured) : entries;
  const also = tiered ? entries.filter((entry) => !entry.featured) : [];

  const [arrivedId, setArrivedId] = useState(() => (isFreshLoad ? currentHash() : ""));
  // Several rows may stay open: closing one never moves the one being read.
  const [openIds, setOpenIds] = useState(() => {
    const hash = currentHash();
    const open = new Set(rememberedOpen.get(label) ?? []);
    if (rows.some((entry) => entry.id === hash)) open.add(hash);
    return [...open];
  });

  useEffect(() => {
    rememberedOpen.set(label, openIds);
  }, [label, openIds]);

  useEffect(() => {
    isFreshLoad = false;
  }, []);

  useEffect(() => {
    if (!arrivedId) return undefined;
    const timeout = window.setTimeout(() => setArrivedId(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [arrivedId]);


  const toggle = (id) => {
    const willOpen = !openIds.includes(id);
    setOpenIds((open) => (willOpen ? [...open, id] : open.filter((openId) => openId !== id)));
    if (willOpen) writeHash(id);
    else if (currentHash() === id) writeHash(null);
  };

  return (
    <>
      <ol className="work-list" aria-label={label}>
        {rows.map((entry) => (
          <WorkItem
            key={entry.id}
            entry={entry}
            isOpen={openIds.includes(entry.id)}
            hasArrived={arrivedId === entry.id}
            onToggle={toggle}
          />
        ))}
      </ol>
      {also.length > 0 && (
        <>
          <h3 className="also-heading">{alsoLabel}</h3>
          <ul className="also-list">
            {also.map((entry) => (
              <CompactItem key={entry.id} entry={entry} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

WorkList.propTypes = {
  entries: PropTypes.arrayOf(entryShape).isRequired,
  label: PropTypes.string.isRequired,
  alsoLabel: PropTypes.string,
};

export default WorkList;
