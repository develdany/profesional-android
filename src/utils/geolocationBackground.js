import { ref } from 'vue';
import { registerPlugin } from '@capacitor/core';

export function geolocationBackground(callback, timeout = 1000) {
  const last_location = ref(null);
  const BackgroundGeolocation = registerPlugin('BackgroundGeolocation');

  BackgroundGeolocation.addWatcher(
    {
      backgroundMessage: "Cancele para evitar que se agote la batería.",
      backgroundTitle: "Tracking You.",
      requestPermissions: true,
      stale: true
    },
    (location) => {
      last_location.value = location || undefined;
    }
  ).then((id) => {
    setTimeout(() => {
      callback(last_location.value);
      BackgroundGeolocation.removeWatcher({ id });
    }, timeout);
  });
}









