<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-buttons color="dark" slot="end">
          <ion-back-button default-href="/search" color="dark"></ion-back-button>
        </ion-buttons>
        <ion-title>Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="loading === false" color="dark" :fullscreen="true">
      <ion-fab v-if="account.user.likes.includes(song.id)" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="heart"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab v-else vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="likeSong(song.id, account.user._id)">
          <ion-icon :icon="heartOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <img :src="song.albumArt" />
      <ion-item color="dark">
        <ion-label class="song-title" color="primary">
          {{song.title}}
        </ion-label>
      </ion-item>
      <ion-text color="primary">
        <p class="song-lyrics">
          {{song.lyrics}}
        </p>
      </ion-text>
    </ion-content>
    <ion-content v-else color="dark" :fullscreen="true">
      <ion-spinner color="primary"></ion-spinner>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonBackButton, IonLabel, IonSpinner, IonItem, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import {mapActions, mapState, useStore} from "vuex";
import { heartOutline, heart } from 'ionicons/icons';
import { useRoute } from 'vue-router';
export default {
  name: "Detail",
  components: {IonButtons, IonBackButton, IonLabel, IonItem, IonSpinner, IonContent, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon },
  computed: {
    ...mapState({
      song: (state): any => (state as any).genius.song,
      account: (state): any => (state as any).account,
      loading: (state): any => (state as any).genius.loading,
    }),
  },
  methods: {
    // get actions and getters from vuex state model
    ...mapActions("genius", ["getSong"]),

    ...mapActions("account", ["like"]),

    likeSong(songId: number, userId: number){
      this.like({songId: songId, userId: userId})
    }
  },
  created(){
    const route = useRoute();
    const store = useStore();
    store.state.genius.loading = true;
    store.dispatch('genius/getSong', route.params.songId);
  },
  setup() {
    return {
      heartOutline,
      heart
    }
  }
}
</script>

<style scoped>
.song-lyrics{
  white-space: pre-wrap;
  padding: 20px;
}
.song-title{
  text-align: center;
  color: #98D6D3;
}
ion-spinner {
  position: fixed;
  z-index: 999;
  height: 5em;
  width: 5em;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
