<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Notificaciones</ion-title>
        <Logout/>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
    <ion-item>
      <ion-label>
        <h2><ion-text color="dark">01-05-2023 15:48:08</ion-text> </h2>
        <p>Debes ir a: <ion-text color="primary">FLORIDA 466/508</ion-text></p>
      </ion-label>
      <ion-badge slot="end" color="success">Nuevo</ion-badge>
    </ion-item>

    <ion-item>
      <ion-label>
        <h2><ion-text color="dark">01-05-2023 15:36:40</ion-text> </h2>
        <p>Debes ir a: <ion-text color="primary">1087 LPC</ion-text></p>
      </ion-label>
    </ion-item>

    <ion-item>
      <ion-label>
        <h2><ion-text color="dark">01-05-2023 15:32:19</ion-text> </h2>
        <p>Debes ir a: <ion-text color="primary">Dean Funes 1418</ion-text></p>
      </ion-label>
    </ion-item>

    <ion-item>
      <ion-label>
        <h2><ion-text color="dark">01-05-2023 15:30:57</ion-text> </h2>
        <p>Debes ir a: <ion-text color="primary">Pellegrini 183 dpto 104</ion-text></p>
      </ion-label>
    </ion-item>

    <ion-item>
      <ion-label>
        <h2><ion-text color="dark">01-05-2023 15:30:57</ion-text> </h2>
        <p>Debes ir a: <ion-text color="primary">966 MITRE IRMA</ion-text></p>
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>
        <h2>01-05-2023 15:48:08</h2>
        <p>Debes ir a: <ion-text color="primary">FLORIDA 466/508</ion-text></p>
      </ion-label>
    </ion-item>

    <ion-item>
      <ion-label>
        <h2>01-05-2023 15:36:40</h2>
        <p>Debes ir a: <ion-text color="primary">1087 LPC</ion-text></p>
      </ion-label>
    </ion-item>

    <ion-item>
      <ion-label>
        <h2>01-05-2023 15:32:19</h2>
        <p>Debes ir a: <ion-text color="primary">Dean Funes 1418</ion-text></p>
      </ion-label>
    </ion-item>

    <ion-item>
      <ion-label>
        <h2>01-05-2023 15:30:57</h2>
        <p>Debes ir a: <ion-text color="primary">Pellegrini 183 dpto 104</ion-text></p>
      </ion-label>
    </ion-item>

    <ion-item>
      <ion-label>
        <h2>01-05-2023 15:30:57</h2>
        <p>Debes ir a: <span>966 MITRE IRMA</span></p>
      </ion-label>
    </ion-item>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonItem,
  IonLabel,
  IonText,
  IonBadge
 } from '@ionic/vue';
 import Logout from '../components/Logout.vue'
 import backendApi from '@/api/backendApi';
import { useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';

const ubicacion = JSON.parse(localStorage.getItem('ubicacion'))
const user = JSON.parse(localStorage.getItem('user'))
const router = useRouter();

onMounted(()=>{
    checkAuth();
})

const checkAuth = () =>{
  if (!user) {
    router.push('/');
  }
}

</script>
