/* eslint-disable react-refresh/only-export-components */
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
  let slug = params.slug
  if (!slug) {
    slug = ['API Reference']
  }

  return {
    title: `${slug.at(-1)} | MDXEditor`,
    description:
      'MDXEditor is an open-source React component that lets your users edit markdown documents naturally, just like in Google docs or Notion.',
  }
}

export default function Page({ params }: { params: PageParams }) {
  let slug = params.slug
  if (!slug) {
    slug = ['README']
  }

  const pageContent = fs.readFileSync(`./api-ref/${decodeURIComponent(slug.join('/'))}.md`, 'utf-8')

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
                      let href = node.properties!.href as string
                      href = href.replace(/\.md/, '').replace('README.md', '')

                      // relative links are ok
                      if (!href.startsWith('..')) {
                        href = `/editor/api/${href}`
                      }
                      node.properties!.href = href
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
