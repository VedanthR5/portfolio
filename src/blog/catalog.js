// Metadata stays small; article bodies load only when a reader opens a post.
export const posts = [
  {
    slug: "warsh-and-the-independent-fed",
    title: "The skeptic inherits the Fed.",
    subtitle: "Kevin Warsh, Jackson Hole, and the price of independence.",
    description: "A close reading of the moment a Fed critic became responsible for the institution he wanted to change.",
    date: "2026-09-20",
    tags: ["Economics", "Institutions"],
    status: "Working draft",
    load: () => import("./posts/warsh.js"),
  },
];

export const topics = [...new Set(posts.flatMap((post) => post.tags))].sort();
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
