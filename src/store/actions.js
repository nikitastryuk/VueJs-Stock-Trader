import Vue from "vue";

export const loadData = ({
    commit
}, obj) => {
    if (!obj.idToken) {
        return
    }
    Vue.http.get(`users/${obj.dbKey}/data.json` + '?auth=' + obj.idToken).then(response => response.json()).then(data => {
        if (data) {
            const stocks = data.stocks;
            const funds = data.funds;
            const stockPortfolio = data.stockPortfolio;

            const portfolio = {
                stockPortfolio,
                funds
            };
            commit('SET_STOCKS', stocks);
            commit('SET_PORTFOLIO', portfolio);
        }
    })
}

export const changeData = ({
    commit
}, obj) => {
    if (!obj.idToken) {
        return
    }
    Vue.http.put(`users/${obj.dbKey}/data.json?auth=${obj.idToken}`, obj.data);
}