require('./bootstrap');

window.Vue = require('vue');

import Header from './components/Header.vue'

$(function () {
    var vw = new Vue({
        el: "#kekboard",
        data: {
            appName: 'Kekboard',
            page: '',
        },
        components: {
            'app-header': Header,
        },
        computed: {
            title: function () {
                if (this.page.title) {
                    return this.appName + ' | ' + this.page.title;
                } else {
                    return this.appName;
                }
            },
        },
    });

    vw.$watch('page', function () {
        $(document).attr('title', this.title);
    }, {
        immediate: true,
    });
});
