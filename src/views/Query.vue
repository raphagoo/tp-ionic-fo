<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-button color="dark"></ion-menu-button>
        </ion-buttons>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" :fullscreen="true">
      <ion-item color="dark">
        <ion-label position="floating" color="primary">Type a song, artist or album name..</ion-label>
        <ion-input
            @input="term = $event.target.value"
            :value="term"
            name="term"
            type="text"
            autocapitalize="off"
        ></ion-input>
      </ion-item>
      <ion-button @click="doSearch(term)" color="secondary" expand="full">
        <ion-icon slot="start" :icon="searchOutline"></ion-icon>
        Search
      </ion-button>
      <ion-list color="dark" v-if="results.hits">
        <ion-item class="item-song" @click="toDetail(hit.result.id)" color="dark" v-for="hit in results.hits" :key="hit.result.id">
          <ion-thumbnail>
            <ion-img :src="hit.result.header_image_thumbnail_url" />
          </ion-thumbnail>
          <ion-label class="song-label">{{hit.result.full_title}}</ion-label>
        </ion-item>
      </ion-list>
      <ion-list color="dark" v-if="results.loading === true">
          <ion-item v-for="n in 7" :key="n.id" color="dark">
            <ion-thumbnail slot="start">
              <ion-skeleton-text></ion-skeleton-text>
            </ion-thumbnail>
            <ion-label>
              <h3>
                <ion-skeleton-text style="width: 80%"></ion-skeleton-text>
              </h3>
              <p>
                <ion-skeleton-text animated style="width: 60%"></ion-skeleton-text>
              </p>
              <p>
                <ion-skeleton-text animated style="width: 30%"></ion-skeleton-text>
              </p>
            </ion-label>
          </ion-item>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonIcon, IonSkeletonText, IonButtons, IonImg, IonButton, IonList, IonContent, IonHeader, IonItem, IonLabel, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonThumbnail } from '@ionic/vue';
import { searchOutline } from "ionicons/icons";
import {mapActions, mapState} from "vuex";
import { useRouter } from 'vue-router';
import router from "@/router";
export default {
  name: "Query",
  computed: {
    ...mapState({
      results: (state): any => (state as any).genius.search,
    }),
  },
  setup() {
    const router = useRouter();
    return { router, searchOutline };

  },
  components: { IonIcon, IonButtons, IonSkeletonText, IonImg, IonButton, IonList, IonContent, IonHeader, IonItem, IonLabel, IonInput, IonMenuButton, IonPage, IonTitle, IonToolbar, IonThumbnail },
  data() {
    return {
      term: ''
    };
  },
  methods: {
    // get actions and getters from vuex state model
    ...mapActions("genius", ["search"]),
    // methods for this component
    async doSearch(term: string) {
      try {
        const user = await this.search(term);
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
    toDetail(hitId: number){
      router.push({name:'Detail', params: {songId: hitId}})
    }
  }
}
</script>

<style scoped>
ion-list{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.song-label{
  padding-left: 15px;
}
</style>
