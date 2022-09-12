import pkg from './package.json';

const pwaConfig = {
  devOptions: {
    enabled: true,
  },
  registerType: 'prompt',
  workbox: {
    sourcemap: true,
    cleanupOutdatedCaches: false,
  },
  includeAssets: ['logo.png', 'logo-256s.png', 'robots.txt'],
  manifest: {
    name: pkg.name,
    short_name: 'ViteEP',
    description: 'admin template for vue3',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'logo-256.png',
        sizes: '256x256',
        type: 'image/png',
      },
    ],
  },
};

export default pwaConfig;
