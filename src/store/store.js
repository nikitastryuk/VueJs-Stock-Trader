import Vue from 'vue';
import Vuex from 'vuex';
import stocksModule from './modules/stocks';
import portfolioModule from './modules/portfolio';
import authModule from './modules/auth';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    modules: {
        stocksModule,
        portfolioModule,
        authModule
    }
});