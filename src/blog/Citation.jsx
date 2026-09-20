import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { formatDate } from "./catalog";

// Local editorial metadata: previews never fetch, frame, or track external sites.
export default function Citation({ source, children }) {
  const id = useId();
  const trigger = useRef(null);
  const card = useRef(null);
  const timer = useRef(null);
  const focusPreview = useRef(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 16, top: 0 });
  const cancelClose = () => clearTimeout(timer.current);
  const close = () => { cancelClose(); setOpen(false); };
  const scheduleClose = () => {
    cancelClose();
    timer.current = setTimeout(() => {
      if (!trigger.current?.contains(document.activeElement) && !card.current?.contains(document.activeElement)) setOpen(false);
    }, 160);
  };
  const show = () => {
    cancelClose();
    window.dispatchEvent(new CustomEvent("portfolio:source-open", { detail: id }));
    setOpen(true);
  };
  const enterPreview = () => {
    focusPreview.current = true;
    show();
    if (card.current) { card.current.focus({ preventScroll: true }); focusPreview.current = false; }
  };

  useEffect(() => {
    const closeOther = (event) => { if (event.detail !== id) setOpen(false); };
    window.addEventListener("portfolio:source-open", closeOther);
    return () => { clearTimeout(timer.current); window.removeEventListener("portfolio:source-open", closeOther); };
  }, [id]);
  useEffect(() => {
    if (!open) return undefined;
    function place() {
      const rect = trigger.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(350, window.innerWidth - 32);
      const height = card.current?.offsetHeight || 260;
      const below = rect.bottom + 12;
      setPosition({
        left: Math.max(16, Math.min(rect.left, window.innerWidth - width - 16)),
        top: Math.max(12, Math.min(below + height < window.innerHeight - 12 ? below : rect.top - height - 12, window.innerHeight - height - 12)),
      });
    }
    function onKey(event) {
      if (event.key === "Escape") {
        // Return focus without reopening on focus; the queued close wins.
        if (card.current?.contains(document.activeElement)) trigger.current?.querySelector("button")?.focus({ preventScroll: true });
        setOpen(false);
      }
    }
    function outside(event) {
      if (!trigger.current?.contains(event.target) && !card.current?.contains(event.target)) setOpen(false);
    }
    place();
    if (focusPreview.current) { card.current?.focus({ preventScroll: true }); focusPreview.current = false; }
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return <span className="citation" ref={trigger} onPointerEnter={(event) => { if (event.pointerType !== "touch") show(); }} onPointerLeave={scheduleClose}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget) && !card.current?.contains(event.relatedTarget)) scheduleClose(); }}>
    <a href={source.url} target="_blank" rel="noopener noreferrer" onFocus={show} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); enterPreview(); } }} aria-describedby={open ? `${id}-summary` : undefined}>{children}<span className="sr-only"> (opens in a new tab)</span></a>
    <button className="citation-toggle" aria-label={`Preview source: ${source.title}`} aria-expanded={open} aria-controls={open ? id : undefined}
      onClick={enterPreview} type="button">↗</button>
    {open && createPortal(<aside id={id} ref={card} tabIndex={-1} className="source-preview" aria-label={`Source preview: ${source.title}`} style={position}
      onPointerEnter={cancelClose} onPointerLeave={scheduleClose}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget) && !trigger.current?.contains(event.relatedTarget)) scheduleClose(); }}>
      <div className="preview-top"><span>{source.kind}</span><button type="button" aria-label="Close source preview" onClick={() => { trigger.current?.querySelector("button")?.focus({ preventScroll: true }); close(); }}>×</button></div>
      <p className="preview-publisher">{source.publisher}</p>
      <h3>{source.title}</h3><p id={`${id}-summary`}>{source.summary}</p>
      <div className="preview-bottom">{source.date && <time dateTime={source.date}>{formatDate(source.date)}</time>}<a href={source.url} target="_blank" rel="noopener noreferrer">Open source ↗<span className="sr-only"> (opens in a new tab)</span></a></div>
    </aside>, document.body)}
  </span>;
}
Citation.propTypes = { source: PropTypes.shape({ title: PropTypes.string.isRequired, url: PropTypes.string.isRequired, publisher: PropTypes.string, date: PropTypes.string, summary: PropTypes.string, kind: PropTypes.string }).isRequired, children: PropTypes.node.isRequired };
