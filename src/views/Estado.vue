<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Estado</ion-title>
        <Logout/>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
    <div>
      <b>
        Estado actual:
      </b>   
      <ion-badge v-if="!estado.ocupado" color="danger">Ocupado</ion-badge>
      <ion-badge v-else color="success">Libre</ion-badge>
    </div>
    <div class="center-div">
      <button 
        v-if="estado.ocupado"
        class="ripple-parent circle btn-ocupado"
        @click="onChangeOcupado"
      >
          Ocupado
      </button>
      <button
        v-if="!estado.ocupado"
        class="ripple-parent circle btn-libre"
        @click="onChangeOcupado"
      >
        Libre
      </button>
    </div>  
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonBadge } from '@ionic/vue';
import { power } from 'ionicons/icons';
import Logout from '../components/Logout.vue'
import { reactive, onMounted} from 'vue';
import { Geolocation } from '@capacitor/geolocation';
import backendApi from '@/api/backendApi';
import { useRouter } from 'vue-router';
import { geolocationBackground } from '../utils/geolocationBackground'

import {registerPlugin} from "@capacitor/core";
const BackgroundGeolocation = registerPlugin("BackgroundGeolocation");

const router = useRouter();
const ubicacion = reactive({
  coords: JSON.parse(localStorage.getItem('ubicacion'))
});
const user = JSON.parse(localStorage.getItem('user'))

onMounted(()=>{
    checkAuth();
    //getCurrentLocation();
})

const checkAuth = () =>{
  if (user) {
    let intervalId = setInterval(getCurrentLocation, 4000);
    localStorage.setItem('intervalId', intervalId);
  }else{
    router.push('/');
  }
}

// const requestUbication = async () => {
//   await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
//     .then((result) => {
//       console.log('coords',result);
//       ubicacion.coords.latitud = result.coords.latitude
//       ubicacion.coords.longitud = result.coords.longitude
//       backendApi.put(`/ubicaciones/${ubicacion.coords.id}`,ubicacion.coords)
//       .then( response => {
//         console.log(response);
//       })
//       //console.log('resuuuuu',result.coords.latitude);
//     })
// }

const estado = reactive({
  ocupado:true
});

const onChangeOcupado = () => {
  estado.ocupado = !estado.ocupado;
  console.log('enviando datos',estado.ocupado);
  
  backendApi.post(`/vehiculos/${ubicacion.coords.vehiculo_id}/changeStatus`, {disponible: estado.ocupado})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    // Maneja el error
    console.log('error',error);
  });
}



const getCurrentLocation = () => {
  geolocationBackground((location) => {
    console.log('ubi desde la nueva libreria', location);
    ubicacion.coords.latitud = location.latitude
    ubicacion.coords.longitud = location.longitude
    backendApi.put(`/ubicaciones/${ubicacion.coords.id}`,ubicacion.coords)
    .then( response => {
      console.log(response);
    })
  }, 5000); // Espera 5 segundos antes de devolver la ubicación
};

</script>

<style scoped>

.center-div{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}  
.ripple-parent {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border: 1px solid #ddd;
    user-select: none;
  }
.circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  font-size: 26px;
  color: #ddd;
}

.btn-ocupado{
  background: #BB2D3B;
}
.btn-libre{
  background: #157347;
}
</style>
