(function () {

    var axios = require('axios');
    var Vue = require('vue');
    var beautify = require('json-beautify');

    var app = new Vue({
        el: '#demo-app',
        template: '#demo-template',
        data: {
            processing: false,
            text: 'Secția pentru judecători a Consiliului Superior al Magistraturii a sesizat plenul Consiliului Superior al Magistraturii cu propunerea de admitere a cererii de numire în funcția de judecător formulate de procurorul Mihaela Moraru-Iorga, potrivit ordinii de zi soluționate a ședinței, postate pe site-ul instituției.',
            lang: 'ro',
            url: 'http://localhost:41736/v0/entitize',
            result: ''
        },
        methods: {
            processText: function () {
                var self = this;
                console.log('text', this.text, this.lang, this.url);
                if (this.processing || !this.text || !this.lang) {
                    return;
                }
                this.processing = true;

                axios.get(this.url, {
                    params: { text: this.text, lang: this.lang }
                })
                    .then(function (response) {
                        // console.log('response', response);
                        return response.data;
                    })
                    .then(function (result) {
                        self.result = beautify(result, null, 2, 80);
                    })
                    .catch(function (error) {
                        self.result = error.message;
                    })
                    .then(function () {
                        self.processing = false;
                    });
            }
        }
    });

})();