const origin = "https://vedanthramanathan.com";

// Static pages, client navigation, and the navbar must agree about /blog/.
export function getRouteMeta(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const isBlog = path === "/blog" || path.startsWith("/blog/");
  return {
    path,
    url: `${origin}${path}`,
    isBlog,
    type: isBlog && path !== "/blog" ? "article" : "website",
  };
}
