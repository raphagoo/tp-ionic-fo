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
            <ion-item>
              <ion-label position="floating" color="primary">Username</ion-label>
              <ion-input
                  @input="credentials.username = $event.target.value"
                  :value="credentials.username"
                  name="username"
                  type="text"
                  autocapitalize="off"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating" color="primary">Password</ion-label>
              <ion-input
                  @input="credentials.password = $event.target.value"
                  :value="credentials.password"
                  name="password"
                  type="password"
              ></ion-input>
            </ion-item>
          <ion-button @click="doLogin(credentials)" color="secondary" expand="full">Login</ion-button>
        </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonButton, IonLabel, IonItem, IonInput, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { mapActions } from "vuex";
import router from "@/router";
export default {
  name: 'Home',
  components: {
    IonButtons,
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
  },
  data() {
    return {
      credentials: {}
    };
  },
  methods: {
    // get actions and getters from vuex state model
    ...mapActions("account", ["login"]),
    // methods for this component
    async doLogin(credentials: any) {
      try {
        const user = await this.login(credentials);
        if (user === false) {
          console.log('error');
        } else {
          console.log('logged')
          router.push("search");
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
