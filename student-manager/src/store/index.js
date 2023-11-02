import { createStore } from 'vuex'

const LOCAL_STORAGE_KEY = 'student-manager-storage';

export default createStore({
    state () {
        return {
            user: {}
        }
    },

    getters: {
        isLoggedIn(state) {
            return state.user && Object.keys(state.user).length > 0;
        },

        name(state) {
            // state.user && state.user.username ? state.user.username : ''
            return state.user?.username ?? '';
        }
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
            } catch (e) {
                console.error(e);
            }
        }
    },

    actions: {
        getUserFromStorage(context) {
            try {
                let user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
                if (user) {
                    context.commit('setUser', user);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
})