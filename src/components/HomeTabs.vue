<template>
  <ion-tabs color="dark">
    <ion-router-outlet></ion-router-outlet>
    <ion-tab-bar color="secondary" slot="bottom">
      <ion-tab-button color="dark" tab="Register" href="/home/register">
        <ion-icon :icon="personAddOutline"></ion-icon>
        <ion-label color="light">Register</ion-label>
      </ion-tab-button>

      <ion-tab-button color="secondary" tab="Login" href="/home/login">
        <ion-icon :icon="personOutline"></ion-icon>
        <ion-label color="light">Login</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script lang="ts">
import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonLabel,
  IonTabs,
  IonTabButton,
} from '@ionic/vue';
import {personOutline, personAddOutline} from "ionicons/icons";

export default {
  name: "HomeTabs",
  components: { IonIcon, IonLabel, IonTabs, IonTabButton, IonTabBar, IonRouterOutlet },
  setup() {
    return {
      personOutline,
      personAddOutline
    }
  }
}
</script>

<style scoped>

</style>
