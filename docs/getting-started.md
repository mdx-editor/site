---
title: Getting Started
slug: getting-started
position: 0
---

# Getting Started

You've decided to give MDXEditor a try? That's great, because it does not take a lot of effort. While powerful, the component needs little to boot. In this article, we will go through the necessary steps to reach "Hello world" state.

## Installation

To use MDXEditor to your project, install the `mdxeditor` NPM package in your react project:

```sh
npm install --save mdxeditor
```

Then, include the React component somewhere in your application:

```tsx
import {MDXEditor} from 'mdxeditor';

export default function App() {
  return (
    <div><MDXEditor markdown="Hello **world**!" /></div>
  )
}
```

To obtain the value of the editor, you can use the `onChange` prop. The event is triggered continuously as the user types, so you can use it to update your state.

```tsx
import {MDXEditor} from 'mdxeditor';

export default function App() {
  return (
    <div><MDXEditor 
      markdown="Hello **world**!" 
      onChange={(markdown) => console.log(markdown)} 
    /></div>
  )
}
```

## Use in NextJS RSC

MDXEditor is a rich, client-side component that does not benefit from server-side rendering. To use it in your server components, you should use `next/dynamic`:

```tsx
import dynamic from 'next/dynamic'

const MDXEditor = dynamic(
  () => import('mdxeditor').then((mod) => mod.MDXEditor), 
  { ssr: false }
)
```

