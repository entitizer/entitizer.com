(function (doc) {

    var axios = require('axios');
    var Vue = require('vue');
    var beautify = require('json-beautify');

    function gEvent(name, params) {
        try {
            gtag('event', name, params);
        } catch (e) { }
    }

    var demoAppEl = doc.getElementById('demo-app');

    var API_URL = demoAppEl.getAttribute('data-url');
    var API_LOCALES = JSON.parse(demoAppEl.getAttribute('data-locales'));
    var API_LANGUAGES = Object.keys(API_LOCALES);
    var DEMO_TEXT = demoAppEl.getAttribute('data-text');
    var DEMO_WIKIDATA = !!demoAppEl.getAttribute('data-wikidata');
    var DEFAULT_LANG = demoAppEl.getAttribute('data-lang') || API_LANGUAGES[0];
    var DEFAULT_COUNTRY = demoAppEl.getAttribute('data-country') || API_LOCALES[DEFAULT_LANG][0];

    var app = new Vue({
        el: '#demo-app',
        template: '#demo-template',
        data: {
            processing: false,
            text: DEMO_TEXT,
            lang: DEFAULT_LANG,
            country: DEFAULT_COUNTRY,
            url: API_URL,
            stringResult: '',
            jsonResult: '',
            error: '',
            entities: {},
            languages: API_LANGUAGES,
            countries: API_LOCALES[DEFAULT_LANG],
            wikidata: DEMO_WIKIDATA,
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
                    params: { text: this.text, lang: this.lang, country: this.country, wikidata: this.wikidata }
                })
                    .then(function (response) {
                        var result = response.data;
                        self.jsonResult = result;
                        self.entities = result.data && result.data.entities || [];

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
        },

        watch: {
            lang: function (value) {
                this.countries = API_LOCALES[value];
                this.country = API_LOCALES[value][0];
                this.entities = {};
            }
        }
    });

})(document);