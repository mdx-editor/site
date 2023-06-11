import fs from 'fs'
import path from 'path'
import grayMatter from 'gray-matter'

interface MarkdownFile {
  slug: string
  content: string
}

export function getDocs(directoryPath: string): MarkdownFile[] {
  const markdownFiles: MarkdownFile[] = []

  // Read the directory and filter for markdown files
  const files = fs.readdirSync(directoryPath)
  const markdownRegex = /\.mdx$/i
  const markdownFilesPaths = files.filter((file) => markdownRegex.test(file))

  // Read each markdown file and extract the frontmatter
  markdownFilesPaths.forEach((filePath) => {
    const thePath = path.join(directoryPath, filePath)
    const fileContent = fs.readFileSync(thePath, 'utf-8')
    const { data } = grayMatter(fileContent) as unknown as { data: { slug: string } }
    const slug = data.slug || ''

    markdownFiles.push({ slug, content: fileContent })
  })

  return markdownFiles
}
