<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark p-4">
        <div class="container">
            <img src="../assets/logo.png" width="50" height="50" class="d-inline-block align-top" alt="">
            <router-link to="/" class="navbar-brand my-auto">Stock Trader</router-link>
            <div id="navbarNav" class="collapse navbar-collapse">
                <ul v-if="isLoggedIn" class="navbar-nav">
                    <router-link to="/portfolio" activeClass="active" tag="li">
                        <a class="nav-link">Portfolio</a>
                    </router-link>
                    <router-link to="/stocks" activeClass="active" tag="li">
                        <a class="nav-link">Stocks</a>
                    </router-link>
                </ul>
                <ul v-if="isLoggedIn" class="navbar-nav ml-auto">
                    <li style="cursor: pointer" class="nav-item">
                        <a @click="endDay" class="nav-link">End Day</a>
                    </li>
                    <li @click="isDropDownOpen=!isDropDownOpen" style="cursor: pointer" class="nav-item dropdown mr-2">
                        <a data-toggle="dropdown" class="nav-link dropdown-toggle">
                            <i class="fa fa-user"></i> Save & Load
                        </a>
                        <div :class="{show:isDropDownOpen}" class="dropdown-menu">
                            <a @click="saveData" class="dropdown-item">
                                Save Data
                            </a>
                            <a @click="fetchData" class="dropdown-item">
                                <i class="fa fa-gear"></i> Load Data
                            </a>
                        </div>
                    </li>
                    <li style="cursor: pointer" class="nav-item">
                        <a class="nav-link">Funds: {{funds | currency }} </a>
                    </li>
                    <li @click="onLogOut" style="cursor: pointer" class="nav-item">
                        <a class="nav-link">Log Out</a>
                    </li>
                </ul>
                <ul v-else class="navbar-nav ml-auto">
                    <router-link to="/signup" activeClass="active" tag="li">
                        <a class="nav-link">Sign Up</a>
                    </router-link>
                    <router-link to="/login" activeClass="active" tag="li">
                        <a class="nav-link">Log In</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {
        mapActions
    } from "vuex";
    export default {
        computed: {
            funds() {
                return this.$store.getters.funds;
            },
            isLoggedIn() {
                return !this.$store.getters.user ? false : true;
            }
        },
        data() {
            return {
                isDropDownOpen: false
            };
        },
        methods: {
            ...mapActions(["randomizeStocks", "loadData", "changeData", "logout"]),
            endDay() {
                this.randomizeStocks();
            },
            onLogOut() {
                this.logout();
            },
            saveData() {
                const currentUser = this.$store.getters.user;
                const data = {
                    funds: this.$store.getters.funds,
                    stocks: this.$store.getters.stocks,
                    stockPortfolio: this.$store.getters.stockPortfolio
                };
                this.changeData({
                    dbKey: currentUser.dbKey,
                    idToken: currentUser.idToken,
                    data: data
                }).catch(err => {
                    console.log(err);
                });
            },
            fetchData() {
                const currentUser = this.$store.getters.user;
                this.loadData({
                    dbKey: currentUser.dbKey,
                    idToken: currentUser.idToken
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    };
</script>

<style scoped>
    .navbar-brand {
        font-size: 1.5rem;
    }
</style>