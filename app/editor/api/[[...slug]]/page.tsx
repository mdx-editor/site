/* eslint-disable react-refresh/only-export-components */
import { getApiDocs } from '@/app/getApiDocs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeRewrite from 'rehype-rewrite'
import { Root, RootContent } from 'hast'
import remarkGfm from 'remark-gfm'
import * as fs from 'fs'
import * as path from 'path'
import classNames from 'classnames'

interface SlugParam {
  slug: string[]
}

export function generateStaticParams() {
  const files: SlugParam[] = []

  function readFilesRecursively(currentPath: string) {
    const entries = fs.readdirSync(currentPath)

    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry)
      const stat = fs.statSync(entryPath)

      if (stat.isDirectory()) {
        readFilesRecursively(entryPath)
      } else if (stat.isFile() && path.extname(entryPath) === '.md') {
        const slugParts = entryPath.replace('api-ref/', '').replace('.md', '').replace('README', '').split('/')

        files.push({
          slug: slugParts,
        })
      }
    }
  }

  readFilesRecursively('./api-ref')

  return files
}

interface PageParams {
  slug: string[]
}

export function generateMetadata({ params }: { params: PageParams }) {
  return {}
  const { docs } = getApiDocs('./api-ref')
  const doc = docs.find((file) => file.slug === params.slug)
  return {
    title: `${doc?.title} | MDXEditor`,
    description:
      'MDXEditor is an open-source React component that lets your users edit markdown documents naturally, just like in Google docs or Notion.',
  }
}

export default function Page({ params }: { params: PageParams }) {
  let slug = params.slug
  if (!slug) {
    slug = ['README']
  }

  const pageContent = fs.readFileSync(`./api-ref/${slug.join('/')}.md`, 'utf-8')

  return (
    <div className={classNames({ homepage: slug[0] === 'README' })}>
      <MDXRemote
        source={pageContent}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              rehypePrism,
              [
                rehypeRewrite,
                {
                  selector: 'a',
                  rewrite(node: Root | RootContent) {
                    if (node.type == 'element' && node.tagName === 'a') {
                      node.properties!.href = (node.properties!.href as string).replace(/\.md$/, '').replace('README.md', '')
                    }
                  },
                },
              ],
            ],
            format: 'md',
          },
          parseFrontmatter: true,
        }}
      />
    </div>
  )
}
