import stocks from '../../assets/stocks'
const state = {
    stocks: []
}

const mutations = {
    'SET_STOCKS' (state, stocks) {
        state.stocks = stocks;
    },
    'RND_STOCKS' (state) {
        state.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
        });
    },
    'CLEAR_STOCKS' (state) {
        state.stocks = stocks;
    },
}

const actions = {
    buyStock: ({
        commit
    }, order) => {
        commit('BUY_STOCK', order);
    },
    initStocks: ({
        commit
    }) => {
        commit('SET_STOCKS', stocks);
    },
    randomizeStocks: ({
        commit
    }) => {
        commit('RND_STOCKS');
    },
    clearStocks: ({
        commit
    }) => {
        commit('CLEAR_STOCKS');
    }
}

const getters = {
    stocks: state => {
        return state.stocks;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}