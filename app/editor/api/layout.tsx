/* eslint-disable react-refresh/only-export-components */
import { DocsLayout } from '../DocsLayout'
import { readFileSync } from 'fs'
import { fromMarkdown } from 'mdast-util-from-markdown'
import * as Mdast from 'mdast'
import NavGroup from './NavGroup'

interface NavLink {
  label: string
  location: string
}

interface NavGroup {
  title: string
  links: NavLink[]
}

function getNav(): NavGroup[] {
  const markdown = readFileSync('./api-ref/README.md', 'utf-8')
  // find the first heading and get everything after it
  const md = markdown.split('\n## ').slice(1).join('\n## ')
  const navGroups: NavGroup[] = []

  const tree = fromMarkdown(md, {
    extensions: [],
    mdastExtensions: [],
  })

  for (let i = 0; i < tree.children.length; i += 2) {
    const heading = tree.children[i] as Mdast.Heading
    const list = tree.children[i + 1] as Mdast.List
    navGroups.push({
      title: (heading.children[0] as Mdast.Text).value,
      links: list.children.map((item) => {
        const link = (item.children[0] as Mdast.Paragraph).children[0] as Mdast.Link
        return {
          label: (link.children[0] as Mdast.Text).value,
          location: `/editor/api/${link.url.replace('.md', '').replace('README', '')}`,
        }
      }),
    })
  }

  return navGroups
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const navGroups = getNav()

  const nav = (
    <nav className="doc-nav api-ref-nav">
      {navGroups.map((group, i) => {
        return <NavGroup key={i} group={group} />
      })}
    </nav>
  )

  return (
    <>
      <DocsLayout nav={nav} content={children} pageNav={null} />
    </>
  )
}
