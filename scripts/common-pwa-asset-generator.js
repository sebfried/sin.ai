const pwaAssetGenerator = require('pwa-asset-generator');

(async () => {
  const options = {
    background: 'black',
    manifest: './source',
    pathOverride: '/img/icons',
    manifest: './source/manifest.json',
    favicon: true,
    mstile: true,
    quality: 80
  };

  const sourceImage = './source/img/logos/sinai-logo-max.png';
  const outputFolder = './source/img/icons';

  const { savedImages, htmlMeta, manifestJsonContent } = await pwaAssetGenerator.generateImages(
    sourceImage,
    outputFolder,
    options
  );

  // You can access the generated assets and manifest data here if needed.

  // Access to static data for Apple Device specs that are used for generating launch images
  const appleDeviceSpecsForLaunchImages = pwaAssetGenerator.appleDeviceSpecsForLaunchImages;
})();
