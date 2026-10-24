import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getShareLinks } from "./shareLinks";

export default function ShareArticle({ post }) {
  const { url, destinations } = getShareLinks(post);
  const disclosure = useRef(null);
  const summary = useRef(null);
  const timer = useRef(null);
  const [status, setStatus] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const hasNativeShare = typeof navigator.share === "function";

  useEffect(() => {
    const outside = (event) => {
      if (!disclosure.current?.contains(event.target)) disclosure.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("pointerdown", outside); clearTimeout(timer.current); };
  }, []);

  function announce(message) {
    setStatus(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 4000);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setManualCopy(false);
      announce("Link copied");
    } catch {
      setManualCopy(true);
      announce("Select and copy the link below");
    }
  }
  async function nativeShare() {
    try { await navigator.share({ title: post.title, url }); }
    catch (error) {
      if (error.name !== "AbortError") announce("Choose a service below or copy the link");
    }
  }

  return <div className="article-share">
    <div className="share-actions">
      <details ref={disclosure} className="share-disclosure" onKeyDown={(event) => {
        if (event.key === "Escape") {
          disclosure.current.removeAttribute("open");
          summary.current.focus({ preventScroll: true });
        }
      }}>
        <summary ref={summary}>Share <span aria-hidden="true">↗</span></summary>
        <div className="share-options" aria-label="Share this article">
          {hasNativeShare && <button type="button" onClick={nativeShare}>Messages & more <span aria-hidden="true">↗</span></button>}
          {!hasNativeShare && <a href={`sms:?body=${encodeURIComponent(`${post.title}\n${url}`)}`}>Messages <span aria-hidden="true">↗</span></a>}
          {destinations.map(({ label, href }) => <a key={label} href={href}
            target={href.startsWith("https:") ? "_blank" : undefined}
            rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}>
            {label}<span aria-hidden="true">↗</span>
            {href.startsWith("https:") && <span className="sr-only"> (opens in a new tab)</span>}
          </a>)}
        </div>
      </details>
      <button type="button" onClick={copy}>Copy link</button>
    </div>
    <span role="status" aria-live="polite">{status}</span>
    {manualCopy && <input className="share-copy-field" aria-label="Article link to copy" readOnly value={url} onFocus={(event) => event.target.select()} />}
  </div>;
}
ShareArticle.propTypes = { post: PropTypes.object.isRequired };
