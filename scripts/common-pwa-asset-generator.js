const pwaAssetGenerator = require('pwa-asset-generator');

(async () => {
  const options = {
    background: 'black',
    manifest: './source',
    path: '/pwa',
    manifest: './source/manifest.json'
  };

  const sourceImage = './source/img/logo.png';
  const outputFolder = './source/pwa';

  const { savedImages, htmlMeta, manifestJsonContent } = await pwaAssetGenerator.generateImages(
    sourceImage,
    outputFolder,
    options
  );

  // You can access the generated assets and manifest data here if needed.

  // Access to static data for Apple Device specs that are used for generating launch images
  const appleDeviceSpecsForLaunchImages = pwaAssetGenerator.appleDeviceSpecsForLaunchImages;
})();
