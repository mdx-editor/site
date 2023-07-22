---
title: Image support
slug: images
position: 7
---

# Image support

The MDXEditor component lets users insert images from the web or from their local device. The images are inserted as markdown images. Users can also paste and drop multiple images at once.

## Inserting images from the web

The toolbar includes an insert image button, which lets users insert an image from the web. When the button is clicked, a dialog is shown, where the user can enter the URL of the image. 
Optionally, you can add auto-complete suggestions for the image URL through the `imageAutocompleteSuggestions` prop.

```tsx
  <MDXEditor 
    imageAutocompleteSuggestions={[
      'https://google.com/', 
      'https://mdxeditor.dev', 
      'https://virtuoso.dev/'
    ]}
  />
```

## Pasting and dropping images

The editor handles dropping and pasting images and clipboard contents that contain images. To handle that, you need to upload the image to a location of your choice and return the URL of the uploaded image. This is done through the `imageUploadHandler` prop. The prop accepts a function that receives a `File` object and returns a `Promise` that resolves to the URL of the uploaded image. 

```tsx
async function imageUploadHandler(image: File) {
  const formData = new FormData()
  formData.append('image', image)
  // send the file to your server and return 
  // the URL of the uploaded image in the response
  const response = await fetch('/uploads/new', { 
      method: 'POST', 
      body: formData 
  })
  const json = (await response.json()) as { url: string }
  return json.url
}

export function Example() {
    return <MDXEditor
      markdown={'# Hello World'}
      imageUploadHandler={imageUploadHandler}
    />
}
```
