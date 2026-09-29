import { lazy } from "react";

// Each route is its own chunk. Links preload the chunk they lead to on hover,
// focus or touch, so a click usually finds it ready; the router's transition
// keeps the current page on screen until it is.
const loadHome = () => import("./components/Home");
const loadBlog = () => import("./blog/Blog");
const loadPost = () => import("./blog/Post");

export const Home = lazy(loadHome);
export const Blog = lazy(loadBlog);
export const Post = lazy(loadPost);

export const preload = {
  home: loadHome,
  blog: loadBlog,
  post: loadPost,
};

// Props that start loading a route when a visitor shows intent to open it.
export const preloadOn = (load) => ({
  onPointerEnter: load,
  onFocus: load,
  onTouchStart: load,
});
