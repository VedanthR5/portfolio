import PropTypes from "prop-types";

import { profile } from "../constants";

// Links the résumé when VITE_RESUME_URL is set at build time; otherwise the
// link says what it does: it opens an email asking for one.
const ResumeLink = ({ className = "", onClick }) =>
  profile.resumeUrl ? (
    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      Résumé
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <a
      href={`mailto:${profile.email}?subject=${encodeURIComponent("Résumé request")}`}
      className={className}
      onClick={onClick}
    >
      Request résumé
    </a>
  );

ResumeLink.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ResumeLink;
