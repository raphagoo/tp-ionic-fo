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
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonButtons, IonLabel, IonItem, IonInput, IonHeader, IonTitle, IonToolbar, IonContent, IonPage, IonMenuButton } from '@ionic/vue';
import { mapActions } from "vuex";
import router from "@/router";
export default {
  name: "Register",
  components: {
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
      credentials: {}
    };
  },
  methods: {
    // get actions and getters from vuex state model
    ...mapActions("account", ["register"]),
    // methods for this component
    async doRegister(credentials: any) {
      try {
        const user = await this.register(credentials);
        if (user === false) {
          console.log('error');
        } else {
          console.log('logged')
          credentials = {};
          router.push("login");
        }
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>

<style scoped>
</style>
