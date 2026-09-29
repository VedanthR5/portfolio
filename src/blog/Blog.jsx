import { Link, useSearchParams } from "react-router-dom";
import { posts, topics, selectPosts, formatDate, browsing, blogIndex } from "./catalog";
import { FieldArt, Reveal } from "./Shared";
import { usePageMeta } from "./usePageMeta";
import { preload, preloadOn } from "../routes";
import "./blog.css";

const sortLabels = { newest: "Newest first", oldest: "Oldest first", title: "Title A–Z" };

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const topic = topics.includes(params.get("topic")) ? params.get("topic") : "All";
  const sort = Object.hasOwn(sortLabels, params.get("sort")) ? params.get("sort") : "newest";
  const results = selectPosts({ query, topic, sort });
  const filtered = Boolean(query) || topic !== "All";
  usePageMeta(blogIndex.title, blogIndex.description);
  function update(key, value) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (!value || (key === "topic" && value === "All") || (key === "sort" && value === "newest")) next.delete(key); else next.set(key, value);
      return next;
    }, { replace: true });
  }
  // Controls appear as the collection grows (thresholds in catalog.js). A
  // shared link can still carry a filter whose control is hidden, so an
  // active filter always shows what it is and how to clear it.
  const hasControls = browsing.topics || browsing.search || browsing.sort;
  return <div className="journal journal-index">
    <Reveal className="journal-intro">
      <h1>Writing</h1>
      <p>{blogIndex.dek}</p>
      <div className="intro-rule"><span>By Vedanth Ramanathan</span><span>{posts.length} {posts.length === 1 ? "essay" : "essays"}</span></div>
    </Reveal>
    <section aria-label="Articles">
      {hasControls && <Reveal className="journal-controls" delay={0.08}>
        {browsing.topics && <div className="topic-filters" role="group" aria-label="Filter by topic">{["All", ...topics].map((tag) =>
          <button key={tag} type="button" aria-pressed={topic === tag} onClick={() => update("topic", tag)}>{tag}{tag === "All" && <span>{posts.length}</span>}</button>)}</div>}
        <div className="search-sort">
          {browsing.search && <label className="search-field"><span aria-hidden="true">⌕</span><span className="sr-only">Search articles</span><input type="search" placeholder="Search articles" value={query} onChange={(event) => update("q", event.target.value)} /></label>}
          {browsing.sort && <label><span className="sr-only">Sort articles</span><select value={sort} onChange={(event) => update("sort", event.target.value)}>{Object.entries(sortLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>}
        </div>
      </Reveal>}
      {filtered && (!browsing.topics || !browsing.search) && <p className="filter-note">
        Showing {[topic !== "All" && `essays tagged ${topic}`, query && `results for “${query}”`].filter(Boolean).join(", ")}. <button type="button" onClick={() => setParams({})}>Show all</button>
      </p>}
      <p className="sr-only" role="status">{filtered ? `${results.length} ${results.length === 1 ? "article" : "articles"} found` : ""}</p>
      {results.map((post, i) => <Reveal key={post.slug} delay={i * 0.06}>
        <Link className="essay-card" to={`/blog/${post.slug}`} {...preloadOn(preload.post)} state={{ from: `/blog${params.size ? `?${params}` : ""}` }}>
          <div className="essay-copy">
            <div className="eyebrow"><span>{post.tags.join(" / ")}</span><span className="draft-pill">{post.status}</span></div>
            <h2>{post.title}</h2><p className="essay-subtitle">{post.subtitle}</p>
            <p className="essay-description">{post.description}</p>
            <div className="essay-meta"><time dateTime={post.date}>{formatDate(post.date)}</time><span className="read-link">Read the essay <span aria-hidden="true">→</span></span></div>
          </div>
          <FieldArt />
        </Link>
      </Reveal>)}
      {!results.length && <div className="empty-state"><h2>No articles found.</h2><p>Try another phrase or reset your filters.</p><button type="button" onClick={() => setParams({})}>Clear filters</button></div>}
    </section>
    <footer className="journal-footer"><Link to="/" {...preloadOn(preload.home)}>← Back to the portfolio</Link></footer>
  </div>;
}
