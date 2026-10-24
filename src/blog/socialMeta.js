import { posts } from "./catalog.js";
import { getRouteMeta } from "./pageMeta.js";

export function getSocialMeta(pathname) {
  const { path } = getRouteMeta(pathname);
  const post = posts.find((entry) => path === `/blog/${entry.slug}`);
  const cover = (post || posts[0]).cover;
  return {
    image: `https://vedanthramanathan.com${cover.src.replace(/\.webp$/, "-share.jpg")}`,
    alt: cover.alt,
    width: 1200,
    height: 675,
  };
}
