export default function Home() {
  return (
    <div className="flex items-stretch gap-4">
      <div className="flex-grow shrink-1 basis-0">
        <h2 className="font-mono text-2xl font-extralight mb-4">
          <span className="underline">Markdown</span> editing can be <br />
          even{' '}
          <span className="bg-blue-200 after:border-r-blue-700 after:border-solid after:border-r-[3px] after:inline-block after:h-[2.1rem] after:translate-y-[0.5rem]">
            more
          </span>{' '}
          delightful.
        </h2>
        <p className="text-lg">
          MDX Editor is an open-source React component that lets your users author markdown documents naturally, just like in Google docs or
          Notion.
        </p>
      </div>

      <div className="p-4 flex-grow shrink-0 basis-0">
        <code>
          <pre>a live demo</pre>
        </code>
      </div>
    </div>
  )
}
