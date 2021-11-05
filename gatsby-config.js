module.exports = {
  siteMetadata: {
    siteUrl: "headlessgatsbymultilangmain.gatsbyjs.io",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: "6a0328b9dd9aa78c1dd57a2cb9da2d",
      },
    },
  ],
};
