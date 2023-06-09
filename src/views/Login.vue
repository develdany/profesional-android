<template>
    <ion-page>
        <body class="body">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>
                        <ion-text color="tertiary">Profesional | </ion-text>
                        <ion-text color="danger">&nbsp;Remis</ion-text>
                    </ion-card-title>
                </ion-card-header>
                <div
                  v-if="errores.data"
                  class="login"
                >
                  * Usuario y/o Contraseña inválidos
                </div>
                <form @submit.prevent="login">
                    <ion-input 
                      label="Usuario" 
                      label-placement="floating" 
                      fill="outline" 
                      placeholder="Usuario" 
                      class="custom"
                      v-model="form.user"
                    >
                    </ion-input>
                    <br />
                    <ion-input 
                      label="Contraseña" 
                      label-placement="floating" 
                      fill="outline" 
                      placeholder="Contraseña" 
                      class="custom" 
                      type="password"
                      v-model="form.password"
                    >
                    </ion-input>
                    <ion-button type="submit" expand="block" color="danger">Ingresar</ion-button>
                </form>
            </ion-card>
        </body>
    </ion-page>
</template>
<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonText, IonInput, IonButton, IonPage, alertController } from '@ionic/vue';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Geolocation } from '@capacitor/geolocation';
import { App } from '@capacitor/app';
import backendApi from '../api/backendApi'

const router = useRouter();

const form = ({
  user: '',
  password: ''
})

const user = reactive({
  token: null,
  data: null
})

const errores = reactive({
  data: null
})

onMounted(()=>{
    requestGeoPermissions();
})

const requestGeoPermissions = async () => {
    await Geolocation.getCurrentPosition()
      .then((result) => {
        //console.log(result);
      })
      .catch((error) => {
        NoGpsActivedAlert('No se pudo acceder a la ubicación. ¡Active el GPS!')
      })
}

const closeApp = () => {
  App.exitApp();
}

const NoGpsActivedAlert = async (text) => {
  const alert = await alertController.create({
    header: 'Notificación',
    subHeader: 'GPS no activado!',
    message: text,
    buttons: [{
      text: 'Ok',
      role: 'ok',
      handler: () => {
        closeApp()
      }
    }],
  });
  await alert.present();
  alert.onDidDismiss().then(() => {
    // Llama a la función que deseas ejecutar cuando se cierra o descarta la alerta
    closeApp();
  });
}

const UserIsNotChoferAlert = async () => {
  const alert = await alertController.create({
    header: 'Notificación',
    subHeader: 'Acceso denegado!',
    message: 'El usuario logueado no es un usuario de tipo chofer o no es un usuario activo!',
    buttons: [{
      text: 'Ok',
      role: 'ok',
    }],
  });
  await alert.present();
}

const login = () => {
  backendApi.post('/login', form)
  .then(response => {
    if (response.data.userData.rol.includes('chofer') && response.data.userData.state === '1') {
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.userData));
      localStorage.setItem('ubicacion', JSON.stringify(response.data.ubicacion[0]));
      localStorage.setItem('token-init-date', new Date().getTime());
      router.push('/home');
    }else{
      UserIsNotChoferAlert()
    }
  })
  .catch(error => {
    // Maneja el error
    errores.data = error.response
    console.log('error',error);
    
  });
}
</script>
<style scoped>
.body{
    background-color:#262C4D;
}
ion-card {
  padding: 15px 15px;
  position: absolute;
  top: 40%;
  left: 47%;
  transform: translate(-50%, -50%);
  width: 80%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
}
ion-card-title{
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
ion-input.custom {
  --background: #ffffff;
  --color: #262C4D;
  --placeholder-color: #262C4D;
}
ion-button {
  margin-top: 20px;
}
.login{
  color: red;
  margin-bottom: 10px;
}
</style>