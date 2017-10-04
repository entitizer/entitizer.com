(function () {

    var axios = require('axios');
    var Vue = require('vue');
    var beautify = require('json-beautify');

    function gEvent(name, params) {
        try {
            gtag('event', name, params);
        } catch { }
    }

    var app = new Vue({
        el: '#demo-app',
        template: '#demo-template',
        data: {
            processing: false,
            text: 'Federația Română de Fotbal a fost amendată de Comisia de Disciplină a Federației Internaționale (FIFA) cu 25.000 de franci elvețieni, iar Arena Națională a fost suspendată o partidă, după comportamentul nepotrivit al suporterilor naționalei României la meciurile cu Armenia și Muntenegru, relatează EFE, citată de Agerpres.',
            lang: 'ro',
            url: 'http://free.entitizer.com/v0/entitize',
            result: ''
        },
        methods: {
            processText: function () {
                var self = this;
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
                        gEvent('text-processed', {
                            'event_category': 'Demo',
                            'event_label': self.lang
                        });
                    })
                    .catch(function (error) {
                        self.result = error.message;
                        gEvent('exception', {
                            'description': error,
                            'fatal': false
                        });
                    })
                    .then(function () {
                        self.processing = false;
                    });
            }
        }
    });

})();