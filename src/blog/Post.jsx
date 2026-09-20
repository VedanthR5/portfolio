import { useEffect, useRef, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion, useScroll } from "motion/react";
import PropTypes from "prop-types";
import { posts, formatDate } from "./catalog";
import { FieldArt, Reveal } from "./Shared";
import Citation from "./Citation";
import { usePageMeta } from "./usePageMeta";
import "./blog.css";

function InlineText({ text, sources }) {
  return text.split(/(\[\[[^\]]+\]\])/g).map((part, index) => {
    const match = part.match(/^\[\[([^|]+)\|(.+)\]\]$/);
    return match && sources[match[1]] ? <Citation key={index} source={sources[match[1]]}>{match[2]}</Citation> : part;
  });
}
InlineText.propTypes = { text: PropTypes.string.isRequired, sources: PropTypes.object.isRequired };

function Article({ post, article }) {
  const { hash, state } = useLocation();
  const returnTo = useRef(state?.from?.startsWith("/blog?") ? state.from : "/blog").current;
  const articleRef = useRef(null);
  const [active, setActive] = useState(article.sections[0]?.id);
  const [copied, setCopied] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const copyTimer = useRef(null);
  const { scrollYProgress } = useScroll({ target: articleRef, offset: ["start start", "end end"] });
  const wordCount = [article.lede, ...article.sections.flatMap((s) => [s.title, ...s.paragraphs, s.quote || ""])].join(" ").split(/\s+/).length;
  usePageMeta(post.title, post.description);
  useEffect(() => {
    if (!hash) return undefined;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return undefined; }
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  useEffect(() => {
    const update = () => {
      const sections = [...articleRef.current.querySelectorAll("section[id]")];
      const current = sections.filter((section) => section.getBoundingClientRect().top <= 180).at(-1);
      setActive(current?.id || article.sections[0]?.id);
    };
    let frame;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { update(); frame = null; });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [article]);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setCopied("Link copied"); }
    catch { setCopied("Copy the address from your browser"); }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(""), 3000);
  }
  const sourcesLabel = `${String(article.sections.length + 1).padStart(2, "0")} / Sources & further reading`;
  const contents = <>{article.sections.map((section) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>{section.title}</a>)}<a href="#sources" aria-current={active === "sources" ? "location" : undefined}>{sourcesLabel}</a></>;

  return <article ref={articleRef} className={`journal journal-post ${focusMode ? "focus-reading" : ""}`}>
    <motion.div className="reading-progress" aria-hidden="true" style={{ scaleX: scrollYProgress }} />
    <Reveal><div className="post-topline"><Link to={returnTo}>← All writing</Link><span className="eyebrow">{post.tags.join(" / ")}</span></div></Reveal>
    <Reveal className="post-header" delay={0.04}>
      <span className="draft-pill">{post.status}</span>
      <h1>{post.title}</h1><p className="post-subtitle">{post.subtitle}</p>
      <div className="post-byline"><span>Vedanth Ramanathan</span><time dateTime={post.date}>{formatDate(post.date)}</time><span>{Math.max(1, Math.ceil(wordCount / 220))} min read</span></div>
    </Reveal>
    <Reveal className="post-art"><FieldArt /></Reveal>
    <div className="reading-layout">
      <aside className="reading-rail"><nav aria-label="Article contents"><span className="eyebrow">ON THIS PAGE</span>{contents}</nav>
        <div className="reading-tools"><button onClick={() => setFocusMode(!focusMode)} aria-pressed={focusMode}>{focusMode ? "Show artwork" : "Focus mode"} <span aria-hidden="true">◉</span></button><button onClick={copyLink}>Copy link ↗</button><span role="status">{copied}</span></div>
      </aside>
      <div className="article-body">
        <details className="mobile-contents"><summary>In this essay</summary><nav aria-label="Article contents on mobile">{contents}</nav></details>
        <p className="editor-note">{article.note}</p>
        <p className="article-lede">{article.lede}</p>
        {article.sections.map((section) => <section key={section.id} id={section.id}>
          <Reveal><h2><a href={`#${section.id}`}>{section.title}</a></h2>
            {section.paragraphs.map((paragraph, index) => <p key={index}><InlineText text={paragraph} sources={article.sources} /></p>)}
            {section.quote && <blockquote><p>“{section.quote}”</p><footer><Citation source={article.sources[section.quoteSource]}>{section.quoteAttribution || article.sources[section.quoteSource].publisher}</Citation></footer></blockquote>}
          </Reveal>
        </section>)}
        <section id="sources" className="source-list"><h2>{sourcesLabel}</h2><p>Primary documents and reporting behind this essay. Previews are editorial summaries, not live extracts.</p>
          <ol>{Object.entries(article.sources).map(([id, source], index) => <li key={id}><span className="source-number">{String(index + 1).padStart(2, "0")}</span><div><Citation source={source}>{source.title}</Citation><p>{source.publisher} · {formatDate(source.date)}</p></div></li>)}</ol>
        </section>
        <footer className="post-end"><span>Thanks for reading.</span><Link to={returnTo}>All articles ↗</Link></footer>
      </div>
    </div>
  </article>;
}
Article.propTypes = { post: PropTypes.object.isRequired, article: PropTypes.object.isRequired };

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((entry) => entry.slug === slug);
  const [loaded, setLoaded] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    if (post) post.load().then(({ default: article }) => { if (!cancelled) setLoaded({ slug, article }); }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, [post, slug]);
  if (!post || failed) return <div className="journal empty-state"><h1>{failed ? "This essay couldn’t load." : "Article not found."}</h1><p>{failed ? "Please refresh to try again." : "That essay doesn’t exist, or its address has changed."}</p><Link to="/blog">Back to all writing ↗</Link></div>;
  if (loaded?.slug !== slug) return <div className="journal" role="status">Loading article…</div>;
  return <Article key={slug} post={post} article={loaded.article} />;
}
