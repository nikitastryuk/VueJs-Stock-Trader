import Vue from "vue";
import router from '../../router';

const state = {
    idToken: null,
    user: null
}

const mutations = {
    'AUTH_USER' (state, userData) {
        state.idToken = userData.token;
    },
    'SET_USER' (state, user) {
        state.user = user
    },
    'CLEAR_AUTH' (state) {
        state.idToken = null;
        state.user = null;
    }
}

const actions = {
    // tryAutoLogin() {
    //     const idToken = localStorage.getItem('token');
    //     if(!token) {
    //         return;
    //     }
    //     const expirationDate = localStorage.getItem('expirationDate');
    //     const now = new Date();
    //     if(now >= expirationDate) {
    //         return;
    //     }
    //     commit('AUTH_USER', {token})
    // },
    setLogOutTimer({
        commit,
        dispatch
    }, expirationTime) {
        setTimeout(() => {
            dispatch('logout');
        }, expirationTime * 1000);
    },
    signup({
        commit
    }, authData) {
        return Vue.http.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC22fVuM9UwEn_56JwqQLHlib-YTDUAx1w', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        }).then((res) => {
            Vue.http.post(`users.json?auth=${res.body.idToken}`, {
                email: res.body.email
            })
        });
    },
    logout({
        commit, dispatch
    }) {
        dispatch('clearPorfolio');
        dispatch('clearStocks');
        router.replace('/login');
        commit('CLEAR_AUTH');
    },
    login({
        commit,
        dispatch
    }, authData) {
        return Vue.http.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC22fVuM9UwEn_56JwqQLHlib-YTDUAx1w', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        }).then(res => {
            commit('AUTH_USER', {
                token: res.body.idToken,
            });

            // const now = new Date();
            // const expirationTime = new Date(now.getTime() + res.body.expiresIn * 1000);
            // localStorage.setItem('token', res.body.idToken);
            // localStorage.setItem('expirationDate', expirationTime);;

            dispatch('setLogOutTimer', res.body.expiresIn);
        }).then(() => {
            Vue.http.get(`users.json?auth=${state.idToken}`).then((users) => {
                for (let key in users.body) {
                    if (users.body.hasOwnProperty(key)) {
                        if (users.body[key].email == authData.email) {
                            commit('SET_USER', {
                                dbKey: key,
                                email: authData.email,
                                idToken: state.idToken
                            });
                        }
                    }
                }
            });
        });
    }
}

const getters = {
    user(state) {
        return state.user;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}