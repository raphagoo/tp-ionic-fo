<template>
  <ion-tabs color="dark">
    <ion-router-outlet></ion-router-outlet>
    <ion-tab-bar color="secondary" slot="bottom">
      <ion-tab-button color="dark" tab="Register" href="/home/register">
        <ion-label color="light">Register</ion-label>
      </ion-tab-button>

      <ion-tab-button color="secondary" tab="Login" href="/home/login">
        <ion-label color="light">Login</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script lang="ts">
import {
  IonRouterOutlet,
  IonTabBar,
  IonLabel,
  IonTabs,
  IonTabButton,
} from '@ionic/vue';
export default {
  name: "HomeTabs",
  components: { IonLabel, IonTabs, IonTabButton, IonTabBar, IonRouterOutlet },
}
</script>

<style scoped>

</style>
