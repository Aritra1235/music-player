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
      platforms: ['linux'], // Ensure .deb is included
      config: {
        options: {
          icon: './assets/icons/icon.png',
        },
      },
    },
    // Removed RPM maker configuration
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {},
    // },
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
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
