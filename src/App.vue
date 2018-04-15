<template>
    <div>
        <app-header></app-header>
        <div class="container">
            <transition name="slide">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    export default {
        components: {
            appHeader: Header
        },
        created() {
            this.$store.dispatch("initStocks");
        }
    }
</script>

<style lang="scss">
    body {
        background: lavender;
    }

    .slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }

    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateX(-30px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-30px);
            opacity: 0;
        }
    }
</style>