import { getRouteMeta } from "./pageMeta.js";

export function getShareLinks(post) {
  const { url } = getRouteMeta(`/blog/${post.slug}`);
  const message = `${post.title}\n${url}`;
  const query = (values) => new URLSearchParams(values).toString().replace(/\+/g, "%20");
  return {
    url,
    message,
    destinations: [
      { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?${query({ url })}` },
      { label: "X / Twitter", href: `https://twitter.com/intent/tweet?${query({ text: post.title, url })}` },
      { label: "WhatsApp", href: `https://wa.me/?${query({ text: message })}` },
      { label: "Email", href: `mailto:?${query({ subject: post.title, body: `${post.description}\n\n${url}` })}` },
    ],
  };
}
