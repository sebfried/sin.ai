# Resize Images

Resize your images from this directory for a variety of devices, resolutions and pixel densities. This helps to improve loading times and visual quality of the website.

1. Place your image files in this directory. 
2. Configure their paths and desired sizes in `/scripts/common-image-resizer.mjs`:

```js
// Image configurations
const imagesConfig = [
  {
    source: 'cake.png', // File name in the /img/src directory
    sizes: [100, 200, 300], // Width. Multiple image widths
    format: 'webp' // Output format
  },
  {
    source: 'cake2.jpg', // There is no cake2.jpg
    sizes: [200, 300],
    format: 'webp'
  },
  // Add additional images and sizes as needed
];
```

3. Run the **`image-resizer`** command in the console:

```shell
npm run image-resizer
```

The console output can be used in the HTML document:
```html
<!-- Example output -->
<img src="/img/src/cake.png" width="2049" height="341" srcset="/img/cake-200.webp 200w, /img/cake-300.webp 300w">
```