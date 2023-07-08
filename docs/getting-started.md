---
title: Getting Started
slug: getting-started
position: 0
---

# Getting Started

You've decided to give MDXEditor a try? That's great, because it does not take a lot of effort. While powerful, the component needs little to boot. In this article, we will go through the necessary steps to reach "Hello world" state.

## Installation

To use MDXEditor to your project, install the `@mdxeditor/editor` NPM package in your React project:

```sh
npm install --save @mdxeditor/editor
```

Then, include the React component and the necessary styles in your application. Your solution for the styling import may vary based on the framework you use. 

```tsx
import {MDXEditor} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

export default function App() {
  return (
    <div><MDXEditor markdown="Hello **world**!" /></div>
  )
}
```

To obtain the value of the editor, you can use the `onChange` prop. The event is triggered continuously as the user types, so you can use it to update your state.

```tsx
import {MDXEditor} from '@mdxeditor/editor';

export default function App() {
  return (
    <div><MDXEditor 
      markdown="Hello **world**!" 
      onChange={(markdown) => console.log(markdown)} 
    /></div>
  )
}
```

## Usage in a NextJS App

MDXEditor is a rich, client-side component that does not benefit from server-side rendering or hydration. To use it in NextJS, use the following technique:

```tsx
import dynamic from 'next/dynamic'

const MDXEditor = dynamic(
  () => import('@mdxeditor/editor').then((mod) => mod.MDXEditor), 
  { ssr: false }
)
```

