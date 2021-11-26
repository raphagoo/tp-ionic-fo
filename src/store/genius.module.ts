import api from '../interfaces/apiInterface';
import { default as log } from '../interfaces/consoleLogger';
import {Dispatch, Commit} from 'vuex';

type stateType = {search: {}; song: {}; loading: boolean};

const state = {search: {}, song: {}, loading: true};

const actions = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    search({dispatch, commit}: {dispatch: Dispatch; commit: Commit}, term: string){
        return new Promise((resolve, reject) => {
            commit('searchRequest', term);
            api.get('/search?term=' + encodeURIComponent(term), { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        commit('searchSuccess', response.data)
                        resolve(response)
                    },
                    error => {
                        log.info('Erreur : ', error)
                        reject(error)
                    }
                );
        })
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getSong({dispatch, commit}: {dispatch: Dispatch; commit: Commit}, songId: number){
        return new Promise((resolve, reject) => {
            commit('songRequest', songId);
            api.get('/songs/' + songId, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        commit('songSuccess', response.data);
                        resolve(response);
                    },
                    error => {
                        log.info('Erreur : ', error);
                        reject(error);
                    }
                );
        })
    },
}


const mutations = {
    searchRequest(){
        log.info('account.module.search.request');
    },
    searchSuccess(state: stateType, data: any){
        log.info('account.module.search.success');
        state.search = data.response;
    },
    songRequest(){
        log.info('account.module.song.request');
    },
    songSuccess(state: stateType, data: any){
        log.info('account.module.song.success');
        state.song = data;
        state.loading = false;
    }
}

export const genius = {
    namespaced: true,
    state,
    actions,
    mutations
};
