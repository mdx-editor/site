const withMDX = require('@next/mdx')()
const withSvgr = require('next-plugin-svgr');


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    mdxRs: true,
  },
  images: {
    unoptimized: true,
  }
}
 
const svgrOptions = {
  svgo: true,
  replaceAttrValues: { '#000': 'currentColor' }
};

module.exports = withSvgr({...withMDX(nextConfig), svgrOptions})
