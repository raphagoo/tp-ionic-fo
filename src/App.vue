<template>
  <ion-app>
    <ion-menu content-id="main-content" type="overlay">
      <ion-content color="dark">
        <ion-list v-if="account.user !== null" class="inbox-list">
          <ion-list-header class="menu-username">{{account.user.username}}</ion-list-header>
          <ion-note>Number of songs liked : {{account.user.likes.length}}</ion-note>
          <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPagesLogged" :key="i">
            <ion-item color="dark" @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
              <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
        <ion-list v-else class="inbox-list">
          <ion-list-header class="menu-username">Welcome</ion-list-header>

          <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
            <ion-item color="dark" @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
              <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { logInOutline, logInSharp, logOutOutline, logOutSharp, heartOutline, heartSharp, searchOutline, searchSharp, personCircleOutline, personCircleSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import {mapState} from "vuex";


export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
  },
  computed: {
    ...mapState({
      account: (state): any => (state as any).account,
    })
  },
  setup() {
    const selectedIndex = ref(0);
    const appPagesLogged = [
      {
        title: 'Search',
        url: '/search',
        iosIcon: searchOutline,
        mdIcon: searchSharp
      },
      {
        title: 'Profile',
        url: '/profile',
        iosIcon: personCircleOutline,
        mdIcon: personCircleSharp
      },
      {
        title: 'Liked',
        url: '/liked',
        iosIcon: heartOutline,
        mdIcon: heartSharp
      },
      {
        title: 'Logout',
        url: '/logout',
        iosIcon: logOutOutline,
        mdIcon: logOutSharp
      }
    ];

    const appPages = [
      {
        title: 'Login',
        url: '/login',
        iosIcon: logInOutline,
        mdIcon: logInSharp
      },
      {
        title: 'Search',
        url: '/search',
        iosIcon: searchOutline,
        mdIcon: searchSharp
      }
    ];

    const route = useRoute();

    return {
      selectedIndex,
      appPages,
      appPagesLogged,
      logInOutline,
      logInSharp,
      logOutOutline,
      logOutSharp,
      heartOutline,
      heartSharp,
      searchOutline,
      searchSharp,
      personCircleOutline,
      personCircleSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  }
});
</script>

<style scoped>
.menu-username{
  color: #98D6D3;
}
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list.inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
  background-color: #222428;
}

ion-menu.md ion-list.inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
