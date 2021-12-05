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
      <ion-fab v-if="isLiked && account.user !== null" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="unlikeSong({song: {id: song.id, title: song.title, albumArt: song.albumArt}, userId: account.user._id})">
          <ion-icon :icon="heart"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab v-else-if="!isLiked && account.user !== null" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="likeSong({song: {id: song.id, title: song.title, albumArt: song.albumArt}, userId: account.user._id})">
          <ion-icon :icon="heartOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <img alt="albumArt" :src="song.albumArt" />
      <ion-item color="dark">
        <ion-label class="song-title" color="primary">
          {{song.title}}
        </ion-label>
      </ion-item>
      <ion-grid>
        <ion-row>
          <ion-col class="ion-text-center" color="dark">
            <a class="icons-col" v-for="media in geniusInfos.media" :key="media.provider">
              <ion-icon size="large" v-if="media.provider === 'soundcloud'" :icon="logoSoundcloud"></ion-icon>
              <ion-icon size="large" v-if="media.provider === 'youtube'" :icon="logoYoutube"></ion-icon>
              <ion-icon size="large" v-if="media.provider === 'spotify'" :icon="filterCircleOutline"></ion-icon>
            </a>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="ion-text-center">
            <ion-button @click="shareSong()">
              <ion-icon slot="start" :icon="shareSocialOutline"></ion-icon>
              Share
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
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
import { IonButtons, IonGrid, IonCol, IonRow, IonButton, IonContent, IonBackButton, IonLabel, IonSpinner, IonItem, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import {mapActions, mapState, useStore} from "vuex";
import { heartOutline, heart, shareSocialOutline, logoSoundcloud, logoYoutube, filterCircleOutline } from 'ionicons/icons';
import { useRoute } from 'vue-router';
import { SocialSharing } from "@ionic-native/social-sharing";


export default {
  name: "Detail",
  components: {IonButtons, IonGrid, IonCol, IonRow, IonButton, IonBackButton, IonLabel, IonItem, IonSpinner, IonContent, IonText, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon },
  computed: {
    ...mapState({
      song: (state): any => (state as any).genius.song,
      geniusInfos: (state): any => (state as any).genius.infos,
      account: (state): any => (state as any).account,
      loading: (state): any => (state as any).genius.loading,
    }),
    isLiked() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //@ts-ignore
      if(this.account.user !== null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        //@ts-ignore
        return this.account.user.likes.filter(like => like.id === this.song.id).length > 0;
      } else {
        return false;
      }
    }
  },
  data(){
    return {
      spotifyUrl: null,
      youtubeUrl: null,
      soundcloudUrl: null
    }
  },
  methods: {
    // get actions and getters from vuex state model
    ...mapActions("genius", ["getSong", "stream"]),

    ...mapActions("account", ["like", "unlike"]),

    likeSong(data: any){
      this.like(data)
    },

    shareSong() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //@ts-ignore
      SocialSharing.share('https://tp-ionic-api.herokuapp.com/detail/' + this.song.id, 'Checkout this song\'s lyrics !')
    },

    unlikeSong(data: any){
      this.unlike(data)
    },
  },
  created(){
    const route = useRoute();
    const store = useStore();
    store.state.genius.loading = true;
    store.dispatch('genius/getSong', route.params.songId).then(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //@ts-ignore
      this.geniusInfos.media.find(media => {
        if(media.provider === 'spotify'){
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          this.spotifyUrl = media.url
        } else if(media.provider === 'soundcloud') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          this.soundcloudUrl = media.url
        } else if(media.provider === 'youtube') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          this.youtubeUrl = media.url
        }
      });
    })
  },
  setup() {
    return {
      heartOutline,
      heart,
      shareSocialOutline,
      logoSoundcloud,
      logoYoutube,
      filterCircleOutline
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
.icons-col{
  padding: 0.5em;
}
</style>
