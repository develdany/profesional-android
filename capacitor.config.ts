import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'profesional-vue',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    useLegacyBridge: true
  }
};

export default config;
