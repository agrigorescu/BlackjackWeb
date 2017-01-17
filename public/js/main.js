import Vue from 'vue';
import VueRouter from 'vue-resource';
import routes from './routes';
import moment from 'moment';
import VeeValidate from 'vee-validate';
import jQuery from 'jquery';

// var $ = require('jquery');


exports.install = function (Vue, options) {
    Vue.prototype.moment = function (...args) {
        return moment(...args);
    };
};

Vue.use(exports);
Vue.use(VueRouter);
Vue.use(VeeValidate);
// Vue.use(jQuery);

window.Vue = Vue;

const app = new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent () {
            const matchingView = routes[this.currentRoute];
            return matchingView
                ? require('./pages/' + matchingView + '.vue')
                : require('./pages/404.vue')
        }
    },
    render (h) {
        return h(this.ViewComponent);
    }
});

window.addEventListener('popstate', () => {
    app.currentRoute = window.location.pathname;
});