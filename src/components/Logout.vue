<template>
  <ion-button
    slot="end" 
    fill="clear"
    color="danger"
    @click="logout()"
  >
    <ion-icon aria-hidden="true" :icon="power" />
  </ion-button>
</template>
<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'
import { power } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { useIonRouter } from '@ionic/vue'
import backendApi from '@/api/backendApi'

const router = useRouter()
const ionRouter = useIonRouter()

const logout = () => {
  backendApi.post('/logout')
  .then( () => {
    clearInterval(localStorage.getItem('intervalId'));
    localStorage.clear()
    ionRouter.push('/')
  })
  .catch(error => {
    console.log('error',error)
  });
}
</script>