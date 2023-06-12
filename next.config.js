const withMDX = require('@next/mdx')()
const withSvgr = require('next-plugin-svgr');


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    mdxRs: true,
  },
}
 
module.exports = withSvgr(withMDX(nextConfig))
