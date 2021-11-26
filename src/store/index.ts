import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { account } from '@/store/account.module';
import { genius } from "@/store/genius.module";

export const store = new Vuex.Store({
    modules: {
        account,
        genius
    },
    plugins: [createPersistedState()]
});
