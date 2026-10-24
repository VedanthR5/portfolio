// Escape text before turning the small citation syntax into ordinary links.
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

export function renderArticle(post, article) {
  const e = escapeHtml;
  const text = (value) => e(value).replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,
    (_, key, label) => `<a href="${e(article.sources[key].url)}">${label}</a>`);
  return `<article>
    <header><h1>${e(post.title)}</h1><p>${e(post.subtitle)}</p>
    <p>By Vedanth Ramanathan · <time datetime="${post.date}">${post.date}</time></p></header>
    <img src="${e(post.cover.src)}" alt="${e(post.cover.alt)}" width="${post.cover.width}" height="${post.cover.height}" style="max-width:100%;height:auto" />
    ${article.note ? `<p>${e(article.note)}</p>` : ""}<p>${text(article.lede)}</p>
    ${article.sections.map((section) => `<section id="${section.id}"><h2>${e(section.title)}</h2>
      ${section.paragraphs.map((paragraph) => `<p>${text(paragraph)}</p>`).join("")}
      ${section.quote ? `<blockquote><p>${e(section.quote)}</p><cite><a href="${e(article.sources[section.quoteSource].url)}">${e(section.quoteAttribution || article.sources[section.quoteSource].title)}</a></cite></blockquote>` : ""}
    </section>`).join("")}
    <section id="sources"><h2>Sources</h2><ul>${Object.values(article.sources).map((source) => `<li><a href="${e(source.url)}">${e(source.title)}</a> · ${e(source.publisher)}</li>`).join("")}</ul></section>
  </article>`;
}
