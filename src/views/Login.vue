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
      <ion-loading :is-open="showLoading"
                   message="Logging in..."
                   >
      </ion-loading>
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
        <ion-button @click="authent()" color="secondary" expand="full">
          <ion-icon slot="start" :icon="fingerPrintOutline"></ion-icon>
          fingerprint
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonIcon, IonLoading, IonButton, IonButtons, IonTitle, IonContent, IonToolbar, IonHeader, IonLabel, IonItem, IonInput, IonPage, IonMenuButton } from '@ionic/vue';
import { fingerPrintOutline } from "ionicons/icons";
import { mapActions } from "vuex";
import router from "@/router";
import { KeychainTouchId } from "@ionic-native/keychain-touch-id";
import consoleLogger from "@/interfaces/consoleLogger";
const secretKey = 'mySuperSecrett';
export default {
  name: "Login",
  components: {
    IonIcon,
    IonLoading,
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
  setup() {
    return {
      fingerPrintOutline
    }
  },
  data() {
    return {
      credentials: {username: '', password: ''},
      showLoading: false
    };
  },
  methods: {
    // get actions and getters from vuex state model
    ...mapActions("account", ["login"]),
    // methods for this component
    async doLogin(credentials: any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //@ts-ignore
      this.showLoading = true
      try {
        const user = await this.login(credentials);
        if (user === false) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          this.showLoading = false;
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          this.showLoading = false
          KeychainTouchId.has(secretKey).then(() => {
            consoleLogger.info('keychain exists')
          }).catch(() => {
            KeychainTouchId.save(secretKey, credentials.password, true).then(() => {
              consoleLogger.info('success')
            })
          })
          .catch(error => {
            alert('Could not store password : ' + error)
          })
          router.push({path: '/search'});
        }
      } catch (e) {
        consoleLogger.error(e)
      }
    },
    authent() {
      KeychainTouchId.isAvailable().then(() => {
        KeychainTouchId.has(secretKey).then(() => {
          KeychainTouchId.verify(secretKey, 'Authentication').then(password => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            //@ts-ignore
            this.credentials.password = password
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            //@ts-ignore
            this.doLogin(this.credentials)
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
