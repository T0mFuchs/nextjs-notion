/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.DOMAIN,
  generateRobotsTxt: true,
  exclude: [
    // protected routes here
  ]
}