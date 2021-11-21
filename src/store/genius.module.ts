import api from '../interfaces/apiInterface';
import { default as log } from '../interfaces/consoleLogger'
import {Dispatch, Commit} from 'vuex';

type stateType = {search: {}}

const state = {search: {}}

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
}


const mutations = {
    searchRequest(){
        log.info('account.module.search.request')
    },
    searchSuccess(state: stateType, data: any){
        log.info('account.module.search.success')
        state.search = data.response
    }
}

export const genius = {
    namespaced: true,
    state,
    actions,
    mutations
};
