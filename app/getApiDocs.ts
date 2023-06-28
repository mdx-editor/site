import fs from 'fs'
import path from 'path'
import * as Mdast from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { MarkdownApiRefDocument, TypeFieldMap, ApiRefNode, RefNodeField } from './apiDocsStructures'

export function getApiDocs(directoryPath: string) {
  const markdownFiles: MarkdownApiRefDocument[] = []

  const files = fs.readdirSync(directoryPath)
  const markdownRegex = /\.md$/i
  const markdownFilesPaths = files.filter((file) => markdownRegex.test(file))

  markdownFilesPaths.sort((a, b) => {
    return a.localeCompare(b)
  })

  markdownFilesPaths.forEach((filePath) => {
    const thePath = path.join(directoryPath, filePath)
    // remove the html comment from the start
    const content = fs.readFileSync(thePath, 'utf-8').split('\n').slice(2).join('\n')
    const slug = path.parse(filePath).name

    const tree = fromMarkdown(content)
    const heading = tree.children.find((child) => child.type === 'heading') as Mdast.Heading
    const [title, type = 'constructor'] = (heading.children[0] as Mdast.Text).value.split(' ') as [string, keyof typeof TypeFieldMap]
    const slugParts = slug.split('.')

    if (title) {
      markdownFiles.push({ slug, content, title, type, slugParts })
    }
  })

  markdownFiles.sort((a, b) => {
    return a.slugParts.length - b.slugParts.length || (a.slugParts.at(-1)?.localeCompare(b.slugParts.at(-1) as string) as number)
  })

  const apiRefNodes = new Map<string, ApiRefNode>()
  const root = {
    document: markdownFiles[0],
    packages: [],
  }
  apiRefNodes.set('index', root)

  markdownFiles.forEach((file) => {
    if (file.slug === 'index') {
      return
    }

    const parentSlug = file.slugParts.slice(0, -1).join('.')
    const parentNode = apiRefNodes.get(parentSlug) ?? apiRefNodes.get('index')!
    const typeField = TypeFieldMap[file.type] as RefNodeField

    const refNode = {
      document: file,
    }

    if (!typeField) {
      throw new Error(`Something wrong with ${file.slug}`)
    }

    if (typeField === 'constructor') {
      parentNode.constructorNode = refNode
    } else {
      if (!parentNode[typeField]) {
        parentNode[typeField] = [] as ApiRefNode[]
      }

      parentNode[typeField]!.push(refNode)
    }
    apiRefNodes.set(file.slug, refNode)
  })

  return { root, markdownFiles }
}
