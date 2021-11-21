import api from '../interfaces/apiInterface';
import { default as router } from '../router';
import { default as log } from '../interfaces/consoleLogger'
import { User } from '@/types';
import {Dispatch, Commit} from 'vuex';

const token = sessionStorage.getItem('token');
const state = token
    ? { status: { loggedIn: true }, token }
    : { status: {}, user: null };

const actions = {
    //Connexion
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login({dispatch, commit}: {dispatch: Dispatch; commit: Commit}, user: User){
        return new Promise((resolve, reject) => {
            commit('loginRequest', user);
            api.post('/user/login', user, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        sessionStorage.setItem('token', response.data.token)
                        commit('loginSuccess', response.data.user)
                        resolve(response)
                    },
                    error => {
                        log.info('Erreur : ', error)
                        reject(error)
                    }
                );
        })
    },

    logout(){
        sessionStorage.removeItem('user');
        router.push('/')
    }
}

const mutations = {
    loginRequest(){
        log.info('account.module.login.request')
    },
    loginSuccess(state: {user: User}, user: User){
        log.info('account.module.login.success')
        state.user = user
    }
}

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
