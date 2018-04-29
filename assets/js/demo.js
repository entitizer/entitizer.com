(function (doc) {

    var axios = require('axios');
    var Vue = require('vue');
    var beautify = require('json-beautify');

    function gEvent(name, params) {
        try {
            gtag('event', name, params);
        } catch (e) { }
    }

    var API_URL = doc.getElementById('demo-app').getAttribute('data-url');

    var app = new Vue({
        el: '#demo-app',
        template: '#demo-template',
        data: {
            processing: false,
            text: 'Federația Română de Fotbal a fost amendată de Comisia de Disciplină a Federației Internaționale (FIFA) cu 25.000 de franci elvețieni, iar Arena Națională a fost suspendată o partidă, după comportamentul nepotrivit al suporterilor naționalei României la meciurile cu Armenia și Muntenegru, relatează EFE, citată de Agerpres.',
            lang: 'ro',
            country: 'md',
            url: API_URL,
            stringResult: '',
            jsonResult: '',
            error: '',
            entities: {},
        },

        methods: {
            entipicUrl: function (name) {
                return '//cdn.entipic.com/' + this.lang.toLowerCase() + '-' + this.country.toLowerCase() + '/' + name.replace(/\s+/g, '_') + '.jpg';
            },
            processText: function () {
                var self = this;
                if (this.processing || !this.text || !this.lang) {
                    return;
                }
                this.processing = true;

                axios.get(this.url, {
                    params: { text: this.text, lang: this.lang, country: this.country }
                })
                    .then(function (response) {
                        var result = response.data;
                        self.jsonResult = result;
                        self.entities = result.data.entities;

                        // result.data.entities.forEach(function (item) {
                        //     var type = item.type || 'UNKNOWN';
                        //     self.entities[type] = self.entities[type] || [];
                        //     self.entities[type].push(item);
                        // })
                        self.stringResult = beautify(result, null, 2, 80);
                        // console.log(self.stringResult || result || 'NO RESULT');
                        gEvent('text-processed', {
                            'event_category': 'Demo',
                            'event_label': self.lang
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                        self.error = error.message;
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

})(document);