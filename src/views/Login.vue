<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" :fullscreen="true">
      <form novalidate>
        <ion-item color="dark">
          <ion-label position="floating" color="primary">Username</ion-label>
          <ion-input
              v-model="credentials.username"
              name="username"
              type="text"
              autocapitalize="off"
          ></ion-input>
        </ion-item>
        <ion-item color="dark">
          <ion-label position="floating" color="primary">Password</ion-label>
          <ion-input
              v-model="credentials.password"
              name="password"
              type="password"
          ></ion-input>
        </ion-item>
        <ion-button @click="doLogin(credentials)" color="secondary" expand="full">Login</ion-button>
        <ion-button @click="authent()" color="secondary" expand="full">Authent</ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonButtons, IonTitle, IonContent, IonToolbar, IonHeader, IonLabel, IonItem, IonInput, IonPage, IonMenuButton } from '@ionic/vue';
import { mapActions } from "vuex";
import router from "@/router";
import { KeychainTouchId } from "@ionic-native/keychain-touch-id";
const secretKey = 'mySuperSecrett';
export default {
  name: "Login",
  components: {
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonContent,
    IonHeader,
    IonLabel,
    IonItem,
    IonInput,
    IonPage,
    IonMenuButton
  },
  data() {
    return {
      credentials: {username: '', password: ''}
    };
  },
  methods: {
    // get actions and getters from vuex state model
    ...mapActions("account", ["login"]),
    // methods for this component
    async doLogin(credentials: any) {
      console.log(credentials)
      try {
        const user = await this.login(credentials);
        if (user === false) {
          console.log('error');
        } else {
          console.log('logged')
          KeychainTouchId.has(secretKey).then(() => {
            KeychainTouchId.delete(secretKey)
          }).catch(() => {
            KeychainTouchId.save(secretKey, credentials.password, true).then(() => {
              console.log('success')
            })
          })
          .catch(error => {
            alert('Could not store password : ' + error)
          })
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          this.credentials.password = '';
          router.push({path: '/search'});
        }
      } catch (e) {
        console.log(e)
      }
    },
    authent() {
      KeychainTouchId.isAvailable().then(() => {
        KeychainTouchId.has(secretKey).then(() => {
          KeychainTouchId.verify(secretKey, 'Authentication').then(password => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            //@ts-ignore
            this.credentials.password = password
          })
        })
        .catch(error => {
          alert(error)
        })

      })
      .catch((error: any) => {
        alert('error' + error)
      });
    },
  }
}
</script>

<style scoped>
</style>
