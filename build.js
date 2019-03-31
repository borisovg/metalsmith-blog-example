/* eslint-disable no-console */
'use strict';

/**
* Metalsmith build file
* @author George Borisov <git@gir.me.uk>
* @license Apache-2.0
*/

// variables
const baseUrl = '/';
const siteName = 'Example Metalsmith Blog';
const siteRoot = 'https://www.example.com/';
const navItems = [
    { href: 'index.html', text: 'Posts' },
    { href: 'first-page.html', text: 'First Page' },
    { href: 'second-page.html', text: 'Second Page' },
];

// metalsmith plugins
const collections = require('metalsmith-collections');
const dateFormatter = require('metalsmith-date-formatter');
const htmlMinifier = require('metalsmith-html-minifier');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const metalsmith = require('metalsmith');
const more = require('metalsmith-more');
const pagination = require('metalsmith-pagination');
const pug = require('metalsmith-pug');
const sass = require('metalsmith-sass');
const sitemap = require('metalsmith-sitemap');

// build configuration (order is important)
metalsmith(__dirname)
    .metadata({
        site: {
            baseUrl,
            navItems,
            name: siteName,
        }
    })
    .source('./src')
    .destination('./public')
    .use(dateFormatter({
        dates: [
            {
                key: 'date',
                format: 'YYYY-MM-DD'
            }
        ]
    }))
    .use(markdown())
    .use(sass({
        outputStyle: 'compressed'
    }))
    .use(pug({
        useMetadata: true
    }))
    .use(more())
    .use(collections({
        posts: {
            pattern: 'posts/*/*.html',
            sortBy: 'date',
            reverse: true
        },
    }))
    .use(pagination({
        'collections.posts': {
            layout: 'index.pug',
            perPage: 4,
            first: 'index.html',
            noPageOne: true,
            path: 'index-:num.html',
            pageMetadata: {
                title: 'Posts'
            }
        },
    }))
    .use(layouts())
    .use(sitemap({
        hostname: siteRoot,
    }))
    .use(htmlMinifier())
    .build(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Build complete');
        }
    });
