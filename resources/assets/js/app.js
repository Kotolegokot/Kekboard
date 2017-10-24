require('./bootstrap');

window.Vue = require('vue');

(function () {
    const vw = new Vue({
        el: "#kekboard",
        data: {
            appName: 'Kekboard',
            currentPage: '',
        },
        computed: {
            title: function () {
                if (this.currentPage) {
                    return this.appName + ' | ' + this.currentPage;
                } else {
                    return this.appName;
                }
            },
        },
    });
})();
