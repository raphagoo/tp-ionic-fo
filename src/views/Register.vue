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
                   message="Please wait..."
      >
      </ion-loading>
      <form novalidate>
        <ion-item color="dark">
          <ion-label position="floating" color="primary">Username</ion-label>
          <ion-input
              @input="credentials.username = $event.target.value"
              :value="credentials.username"
              name="username"
              type="text"
              autocapitalize="off"
          ></ion-input>
        </ion-item>
        <ion-item color="dark">
          <ion-label position="floating" color="primary">Password</ion-label>
          <ion-input
              @input="credentials.password = $event.target.value"
              :value="credentials.password"
              name="password"
              type="password"
          ></ion-input>
        </ion-item>
        <ion-button @click="doRegister(credentials)" color="secondary" expand="full">Register</ion-button>
        <ion-toast
            :is-open="showToast"
            message="Successfully registered"
            :duration="2000"
        >
        </ion-toast>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonLoading, IonToast, IonButton, IonButtons, IonLabel, IonItem, IonInput, IonHeader, IonTitle, IonToolbar, IonContent, IonPage, IonMenuButton } from '@ionic/vue';
import { mapActions } from "vuex";
import router from "@/router";
export default {
  name: "Register",
  components: {
    IonLoading,
    IonToast,
    IonButton,
    IonButtons,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonPage,
    IonMenuButton
  },
  data() {
    return {
      credentials: {},
      showToast: false,
      showLoading: false
    };
  },
  methods: {
    // get actions and getters from vuex state model
    ...mapActions("account", ["register"]),
    // methods for this component
    doRegister(credentials: any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //@ts-ignore
        this.showLoading = true
        this.register(credentials).then(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          this.showLoading = false
          console.log('logged')
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          this.showToast = true
          credentials = {};
          router.push("login");
        }).catch(() => {
          console.log('error')
        })
      }

  },
}
</script>

<style scoped>
</style>
