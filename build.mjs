/* eslint-disable no-console */

/**
 * Metalsmith build file
 * @author George Borisov <git@gir.me.uk>
 * @license Apache-2.0
 */

// variables
const baseUrl = "/";
const siteName = "Example Metalsmith Blog";
const siteRoot = `https://www.example.com${baseUrl}`;
const navItems = [
  { href: "index.html", text: "Posts" },
  { href: "first-page.html", text: "First Page" },
  { href: "second-page.html", text: "Second Page" },
];

// metalsmith plugins
import collections from "@metalsmith/collections";
import dateFormatter from "metalsmith-date-formatter";
import htmlMinifier from "metalsmith-html-minifier";
import inPlace from "@metalsmith/in-place";
import layouts from "@metalsmith/layouts";
import metalsmith from "metalsmith";
import more from "metalsmith-more";
import pagination from "metalsmith-pagination";
import pug from "metalsmith-pug";
import sass from "metalsmith-sass";
import sitemap from "metalsmith-sitemap";

// build configuration (order is important)
metalsmith(import.meta.dirname)
  .metadata({
    site: {
      baseUrl,
      navItems,
      name: siteName,
    },
  })
  .source("./src")
  .destination("./public")
  .use(
    dateFormatter({
      dates: [
        {
          key: "date",
          format: "YYYY-MM-DD",
        },
      ],
    })
  )
  .use(
    sass({
      outputStyle: "compressed",
    })
  )
  .use(
    pug({
      useMetadata: true,
    })
  )
  .use(
    inPlace({
      extname: ".pug",
      transform: "markdown-it",
      engineOptions: {
        html: true,
      },
    })
  )
  .use(
    more({
      ext: "pug",
    })
  )
  .use(
    layouts({
      transform: "pug",
    })
  )
  .use(
    collections({
      posts: {
        pattern: "posts/*/*.html",
        sortBy: "date",
        reverse: true,
      },
    })
  )
  .use(
    pagination({
      "collections.posts": {
        layout: "index.pug",
        perPage: 4,
        first: "index.html",
        noPageOne: true,
        path: "index-:num.html",
        pageMetadata: {
          title: "Posts",
        },
      },
    })
  )
  .use(
    layouts({
      transform: "pug",
      pattern: "index*.html",
    })
  )
  .use(
    sitemap({
      hostname: siteRoot,
    })
  )
  .use(htmlMinifier())
  .build(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Build complete");
    }
  });
