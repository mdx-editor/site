'use client'
import MDXEditor from '@/app/editor'

export function LiveDemo({ markdown }: { markdown: string }) {
  return (
    <MDXEditor
      markdown={markdown}
      contentEditableClassName="prose max-w-full font-sans"
      // eslint-disable-next-line @typescript-eslint/require-await
      imageUploadHandler={async () => '/sample-image.png'}
    />
  )
}
