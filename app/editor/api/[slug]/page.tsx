/* eslint-disable react-refresh/only-export-components */
import { getApiDocs } from '@/app/getApiDocs'
import { ApiNav } from './Nav'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toc } from 'mdast-util-toc'
import { toMarkdown } from 'mdast-util-to-markdown'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeRewrite from 'rehype-rewrite'
import { Root, RootContent } from 'hast'
import remarkGfm from 'remark-gfm'
import { DocsLayout } from '../../DocsLayout'

export function generateStaticParams() {
  const { docs } = getApiDocs('./api-ref')
  return docs.map(({ slug }) => ({ slug }))
}

interface PageParams {
  slug: string
}

export default function Page({ params }: { params: PageParams }) {
  const { docs, root } = getApiDocs('./api-ref')
  const doc = docs.find((file) => file.slug === params.slug)

  if (!doc) {
    throw new Error(`No doc found for ${params.slug}`)
  }

  const tree = fromMarkdown(doc.content, {
    extensions: [],
    mdastExtensions: [],
  })

  const tocTree = toc(tree)
  const tocMarkdown = toMarkdown(tocTree.map!)

  return (
    <DocsLayout
      nav={<ApiNav root={root.packages[0]} currentDoc={doc} docs={docs} />}
      content={
        <MDXRemote
          source={doc.content}
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
                        node.properties!.href = (node.properties!.href as string).replace(/\.md$/, '')
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
      }
      pageNav={<MDXRemote source={tocMarkdown} />}
    />
  )
}
