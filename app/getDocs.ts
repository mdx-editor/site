import fs from 'fs'
import path from 'path'
import grayMatter from 'gray-matter'

interface MarkdownDocument {
  slug: string
  content: string
  position: number
  title: string
}

interface GrayMatterContents {
  data: {
    slug?: string
    position?: number
    title?: string
  }
}

export function getDocs(directoryPath: string): MarkdownDocument[] {
  const markdownFiles: MarkdownDocument[] = []

  const files = fs.readdirSync(directoryPath)
  const markdownRegex = /\.md$/i
  const markdownFilesPaths = files.filter((file) => markdownRegex.test(file))

  markdownFilesPaths.forEach((filePath) => {
    const thePath = path.join(directoryPath, filePath)
    const content = fs.readFileSync(thePath, 'utf-8')
    const {
      data: { title = 'No Title', slug = '', position = Infinity },
    }: GrayMatterContents = grayMatter(content)

    markdownFiles.push({ slug, content, title, position })
  })

  markdownFiles.sort((a, b) => a.position - b.position)

  return markdownFiles
}
