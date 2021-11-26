<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" :fullscreen="true">
      <ion-item class="ion-text-center" color="dark">
        <ion-label color="primary">Welcome to your profile, {{account.user.username}}</ion-label>
      </ion-item>
      <ion-item color="dark">
        <ion-label color="primary">Number of songs liked : {{account.user.likes.length}}</ion-label>
      </ion-item>
      <ion-item class="ion-text-center" color="dark">
        <ion-button>
          Modify password
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel, IonButton, IonItem} from '@ionic/vue';
import {mapState} from "vuex";
export default {
  name: "Profile",
  components: { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel, IonButton, IonItem },
  computed: {
    ...mapState({
      account: (state): any => (state as any).account,
    })
  },
}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
