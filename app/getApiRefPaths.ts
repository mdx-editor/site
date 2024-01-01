import * as fs from 'fs'
import * as path from 'path'

interface SlugParam {
  slug: string[]
}
export function getApiRefPaths(): SlugParam[] {
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
