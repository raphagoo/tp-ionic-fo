import api from '../interfaces/apiInterface';
import { default as log } from '../interfaces/consoleLogger'
import { User } from '@/types';
import {Dispatch, Commit} from 'vuex';

const token = localStorage.getItem('token');
const state = token
    ? { status: { loggedIn: true }, token, user: {} }
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
                        localStorage.setItem('token', response.data.token)
                        commit('loginSuccess', response.data.user)
                        resolve(response)
                    }).catch(
                    error => {
                        log.info('Erreur : ', error)
                        reject(error)
                    }
                );
        })
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    register({dispatch, commit}: {dispatch: Dispatch; commit: Commit}, user: User){
        return new Promise((resolve, reject) => {
            commit('registerRequest', user);
            api.post('/user/register', user, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        commit('registerSuccess', response.data.user)
                        resolve(response)
                    }
                ).catch(error => {
                    log.info('Erreur : ', error)
                    reject(error)
                })
        })
    },

    logout({commit}: {commit: Commit}){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        commit('logoutSuccess')
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    like({dispatch, commit}: {dispatch: Dispatch; commit: Commit}, data: any){
        return new Promise((resolve, reject) => {
            commit('likeSongRequest', data.songId);
            api.put('/user/like', data, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        commit('likeSongSuccess', response.data)
                        resolve(response)
                    }).catch(
                    error => {
                        log.info('Erreur : ', error)
                        reject(error)
                    }
                );
        })
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unlike({dispatch, commit}: {dispatch: Dispatch; commit: Commit}, data: any){
        return new Promise((resolve, reject) => {
            commit('unlikeSongRequest', data.songId);
            api.put('/user/unlike', data, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        commit('unlikeSongSuccess', response.data)
                        resolve(response)
                    }).catch(
                    error => {
                        log.info('Erreur : ', error)
                        reject(error)
                    }
                );
        })
    },
}

const mutations = {
    loginRequest(){
        log.info('account.module.login.request')
    },
    loginSuccess(state: {user: User}, user: User){
        log.info('account.module.login.success')
        state.user = user
    },
    registerRequest(){
        log.info('account.module.register.request')
    },
    registerSuccess(){
        log.info('account.module.register.success')
    },
    likeSongRequest(){
        log.info('account.module.likeSong.request')
    },
    likeSongSuccess(state: {user: User}, user: User){
        log.info(user)
        log.info('account.module.likeSong.success')
        state.user = user
    },
    unlikeSongRequest(){
        log.info('account.module.unlikeSong.request')
    },
    unlikeSongSuccess(state: {user: User}, user: User){
        log.info('account.module.unlikeSong.success')
        state.user = user
    },
    logoutSuccess(state: {user: any}){
        log.info('account.module.logout.success')
        state.user = null
    }
}

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
