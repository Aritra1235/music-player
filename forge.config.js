module.exports = {
  packagerConfig: {
    asar: true,
    icon: './assets/icons',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: './assets/icons/icon.png',
        setupIcon: './assets/icons/icon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],  // Explicitly set the platform to Linux for .deb
      config: {
        options: {
          icon: './assets/icons/icon.png',
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],  // Also target Linux for RPM (optional)
      config: {},
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: './assets/dmg-background.png',
        format: 'ULFO',
        icon: './assets/icons/icon.icns',
      },
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-auto-unpack-natives',
      {},
    ],
  ],
};
