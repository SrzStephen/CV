const path = require(`path`);
const SITE_URL = process.env.URL || `https://stephen.resume.engineering`;
const titleDesc = 'Stephen Mott CV';
const buildDate = Date.now();

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: titleDesc,
    siteUrl: SITE_URL,
    description: titleDesc,
    image: '/src/assets/images/favicon.png',
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `assets`, `images`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tristan Teufel CV`,
        short_name: `CV`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
        icons: [
          {
            src: 'favicons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'favicons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'favicons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'favicons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'favicons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'favicons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'favicons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `markdown-pages`),
        name: `markdown-pages`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `data`, 'work'),
        name: 'work',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `data`, 'projects'),
        name: 'projects',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `data`, 'social'),
        name: 'social',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `data`, 'skills'),
        name: 'skills',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `data`, 'certs'),
        name: 'certs',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `data`, 'educations'),
        name: 'educations',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/',
        createLinkInHead: true,
        //TODO this is being ignored by sitemap plugin
        //It's probably related to
        query: `
        query MyQuery {
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
        resolveSiteUrl: () => SITE_URL,
      },
    },
    {
      resolve: 'gatsby-plugin-newrelic',
      options: {
        config: {
          instrumentationType: 'proAndSPA',
          accountId: process.env.NEW_RELIC_ACCOUNT_ID || '',
          trustKey: process.env.NEW_RELIC_ACCOUNT_ID || '',
          agentID: process.env.NEW_RELIC_AGENT_ID || '',
          licenseKey: process.env.NEW_RELIC_LICENSE_KEY || '',
          applicationID: process.env.NEW_RELIC_AGENT_ID || '',
          beacon: 'bam.nr-data.net',
          errorBeacon: 'bam.nr-data.net',
          settings: {
            distributed_tracing: { enabled: true },
            privacy: { cookies_enabled: true },
            ajax: { deny_list: ['bam.nr-data.net'] }
          }
        }
      }
    }
  ],
};
