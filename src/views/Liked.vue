<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>Liked</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" :fullscreen="true">
      <ion-list color="dark" v-if="account.user.likes.length > 0">
        <ion-item @click="toDetail(song.id)" color="dark" v-for="song in account.user.likes" :key="song.id">
          <ion-thumbnail>
            <ion-img :src="song.albumArt" />
          </ion-thumbnail>
          <ion-label class="song-label">{{song.title}}</ion-label>
        </ion-item>
      </ion-list>
      <ion-item color="dark" v-else>
        <ion-label color="primary">Vous n'avez aucun titres aimés</ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonImg, IonList, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar, IonThumbnail } from '@ionic/vue';
import {mapState} from "vuex";
import router from "@/router";
export default {
  name: "Liked",
  components: { IonButtons, IonImg, IonList, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar, IonThumbnail },
  computed: {
    ...mapState({
      account: (state): any => (state as any).account,
    })
  },
  methods: {
    toDetail(songId: number){
      router.push({name:'Detail', params: {songId: songId}})
    }
  }
}
</script>

<style scoped>
.list-md{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.song-label{
  padding-left: 15px;
}
</style>
