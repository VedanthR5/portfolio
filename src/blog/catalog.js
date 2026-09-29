// Metadata stays small; article bodies load only when a reader opens a post.
export const posts = [
  {
    slug: "warsh-and-the-independent-fed",
    title: "The skeptic inherits the Fed.",
    subtitle: "Kevin Warsh, Jackson Hole, and the lonely work of saying no.",
    description: "How Warsh’s Jackson Hole speech set up September’s rate increase.",
    date: "2026-09-20",
    tags: ["Economics", "Institutions"],
    status: "Working draft",
    load: () => import("./posts/warsh.js"),
  },
];

// The index page's own metadata, shared with scripts/build-blog.mjs.
export const blogIndex = {
  title: "Writing",
  description: "Essays by Vedanth Ramanathan on economics, technology, and public policy.",
  dek: "Essays on economics, technology, and public policy. Every citation opens a preview of its source.",
};

export const topics = [...new Set(posts.flatMap((post) => post.tags))].sort();

// Browsing controls appear once there is enough to browse. Below these counts
// the index is short enough to read whole; URL parameters keep working either way.
export const BROWSE_THRESHOLDS = { topics: 4, search: 6, sort: 6 };
export const browsingFor = (count, topicCount) => ({
  topics: count >= BROWSE_THRESHOLDS.topics && topicCount >= 2,
  search: count >= BROWSE_THRESHOLDS.search,
  sort: count >= BROWSE_THRESHOLDS.sort,
});
export const browsing = browsingFor(posts.length, topics.length);
export const formatDate = (date) => new Intl.DateTimeFormat("en-US", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
}).format(new Date(`${date}T00:00:00Z`));

export function selectPosts({ query = "", topic = "All", sort = "newest" } = {}) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return posts.filter((post) => (topic === "All" || post.tags.includes(topic)) &&
    words.every((word) => `${post.title} ${post.subtitle} ${post.description} ${post.tags.join(" ")}`.toLowerCase().includes(word)))
    .sort((a, b) => sort === "title" ? a.title.localeCompare(b.title) :
      sort === "oldest" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
}
