import { Geolocation } from '@capacitor/geolocation';

export const requestGeoPermissions = async () => {
  await Geolocation.getCurrentPosition()
  .then((result) => {
    return result;
  })
};