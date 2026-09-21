import { Link, useSearchParams } from "react-router-dom";
import { posts, topics, selectPosts, formatDate } from "./catalog";
import { FieldArt, Reveal } from "./Shared";
import { usePageMeta } from "./usePageMeta";
import "./blog.css";

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const topic = topics.includes(params.get("topic")) ? params.get("topic") : "All";
  const sort = ["newest", "oldest", "title"].includes(params.get("sort")) ? params.get("sort") : "newest";
  const results = selectPosts({ query, topic, sort });
  usePageMeta("Writing", "Notes and essays on economics, technology, and the institutions shaping what comes next.");
  function update(key, value) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (!value || (key === "topic" && value === "All") || (key === "sort" && value === "newest")) next.delete(key); else next.set(key, value);
      return next;
    }, { replace: true });
  }
  return <div className="journal journal-index">
    <Reveal className="journal-intro">
      <h1>Thinking out loud.<br /><span>Looking ahead.</span></h1>
      <p>Essays on technology, economics, and public policy.</p>
      <div className="intro-rule"><span>By Vedanth Ramanathan</span></div>
    </Reveal>
    <section aria-label="Browse articles">
      <Reveal className="journal-controls" delay={0.08}>
        <div className="topic-filters" aria-label="Filter by topic">{["All", ...topics].map((tag) =>
          <button key={tag} type="button" aria-pressed={topic === tag} onClick={() => update("topic", tag)}>{tag}{tag === "All" && <span>{posts.length}</span>}</button>)}</div>
        <div className="search-sort">
          <label className="search-field"><span aria-hidden="true">⌕</span><span className="sr-only">Search articles</span><input type="search" placeholder="Search articles" value={query} onChange={(event) => update("q", event.target.value)} /></label>
          <label><span className="sr-only">Sort articles</span><select value={sort} onChange={(event) => update("sort", event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="title">Title A–Z</option></select></label>
        </div>
      </Reveal>
      <p className="sr-only" role="status">{results.length} {results.length === 1 ? "article" : "articles"} found</p>
      {results.map((post, i) => <Reveal key={post.slug} delay={i * 0.06}>
        <Link className="essay-card" to={`/blog/${post.slug}`} state={{ from: `/blog${params.size ? `?${params}` : ""}` }}>
          <div className="essay-copy">
            <div className="eyebrow"><span>{post.tags.join(" / ")}</span><span className="draft-pill">{post.status}</span></div>
            <h2>{post.title}</h2><p className="essay-subtitle">{post.subtitle}</p>
            <p className="essay-description">{post.description}</p>
            <div className="essay-meta"><time dateTime={post.date}>{formatDate(post.date)}</time><span className="read-link">Read the essay <span aria-hidden="true">↗</span></span></div>
          </div>
          <FieldArt />
        </Link>
      </Reveal>)}
      {!results.length && <div className="empty-state"><h2>No articles found.</h2><p>Try another phrase or reset your filters.</p><button onClick={() => setParams({})}>Clear filters ↗</button></div>}
    </section>
    <footer className="journal-footer"><Link to="/">Back to portfolio ↗</Link></footer>
  </div>;
}
