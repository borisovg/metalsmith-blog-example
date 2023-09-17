# metalsmith-blog-example

A working example Metalsmith blog, suitable for use as a template for your own site.

## Demo

https://borisovg.github.io/metalsmith-blog-example-demo/

## Features

- Blog posts (without comments)
- Stand alone pages
- [Pug](https://pugjs.org/) templates
- Minified HTML and CSS (using SASS and Bootstrap 5)
- Sitemap
- Built as a static site using Metalsmith :)

## Using this template for your own site

```
git clone https://github.com/borisovg/metalsmith-blog-example.git my-site
cd my-site
rm -r .git
npm install
```

Edit the variables at the top of `build.js`.

Edit the content in `src/` and build the site:

```
node build.js
```

Copy the contents of `public/` to your web hosting server.
