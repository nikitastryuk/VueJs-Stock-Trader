const state = {
    funds: 10000,
    stocks: []
};

const mutations = {
    'SET_PORTFOLIO' (state, portfolio) {
        state.funds = portfolio.funds;
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    },
    'CLEAR_PORTFOLIO' (state) {
        state.funds = 10000;
        state.stocks = [];
    },
    'SELL_STOCK' (state, {
        stockId,
        quantity,
        stockPrice
    }) {
        const record = state.stocks.find(element => element.id == stockId);
        if (record.quantity > quantity) {
            record.quantity -= quantity;
        } else {
            state.stocks.splice(state.stocks.indexOf(record), 1);
        }
        state.funds += stockPrice * quantity;
    },
    'BUY_STOCK' (state, {
        stockId,
        quantity,
        stockPrice
    }) {
        const record = state.stocks.find(element => element.id == stockId);
        if (record) {
            record.quantity += quantity;
        } else {
            state.stocks.push({
                id: stockId,
                quantity: quantity
            });
        }
        state.funds -= stockPrice * quantity;
    }
}

const actions = {
    sellStock: ({
        commit
    }, order) => {
        commit('SELL_STOCK', order);
    },
    clearPorfolio: ({
        commit
    }) => {
        commit('CLEAR_PORTFOLIO');
    }
}

const getters = {
    stockPortfolio(state, getters) {
        return state.stocks.map(stock => {
            const record = getters.stocks.find(element => element.id == stock.id);
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        });
    },
    funds(state) {
        return state.funds;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}