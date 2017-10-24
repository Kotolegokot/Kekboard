require('./bootstrap');

window.Vue = require('vue');

document

$(function () {
    var vw = new Vue({
        el: "#kekboard",
        data: {
            appName: 'Kekboard',
            page: ''
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

    vw.$watch('page', function () {
        $(document).attr('title', this.title);
    }, {
        immediate: true,
    });
});
