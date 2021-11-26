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
      <HomeTabs></HomeTabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import HomeTabs from "@/components/HomeTabs.vue";
export default {
  name: "Home",
  components: {
    HomeTabs,
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar },
}
</script>

<style scoped>

</style>
