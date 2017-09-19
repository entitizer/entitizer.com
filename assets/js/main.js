
(function () {
    var $ = require('jquery');
    var axios = require('axios');

    function htmlEncode(value) {
        return $('<div/>').text(value).html();
    }

    function getEntipicImage(lang, name, size) {
        return '//cdn.entipic.com/' + lang + '/' + encodeURIComponent(name) + '.jpg';
    }

    function getEntityImageSrc(entity, lang) {
        return getEntipicImage(lang, entity.wikiTitle || entity.name);
    }

    function getConceptImageSrc(concept, lang) {
        return getEntipicImage(lang, concept.name || concept.value);
    }

    function getEntityTypeName(entity) {
        return entity.type;
    }

    function formatEntityHtml(entityData, lang) {
        var entity = entityData.entity;
        var html = '<div class="entity-item"><div class="entity-img"><img src="' + getEntityImageSrc(entity, lang) + '" alt="" /></div>';
        html += '<div class="entity-info"><span class="name">' + htmlEncode(entity.name) + '</span><sup>' + getEntityTypeName(entity) + '</sup>';
        html += ' <span class="description">' + htmlEncode(entity.description || '') + '</span>';

        return html;
    }

    function formatConceptHtml(concept, lang) {
        var html = '<div class="concept-item"><div class="concept-img"><img src="' + getConceptImageSrc(concept, lang) + '" alt="" /></div>';
        html += '<div class="concept-info"><span class="name">' + htmlEncode(concept.value) + '</span><sup>' + concept.index + '</sup>';
        html += '</div>';
        html += '</div>';


        return html;
    }

    function showDemoResult(result, lang) {
        $('#demo-result').removeClass('hide');
        $('#demo-error').addClass('hide');
        var htmlEl = $('#result-html');
        htmlEl.removeClass('hide');
        htmlEl.html('');

        var data = result.data;

        var html = '<ul class="no-bullet">';
        html += '<li><h5>Entities <sup>' + data.entities.length + '</sup></li>';
        for (var i = 0; i < data.entities.length; i++) {
            html += '<li>' + formatEntityHtml(data.entities[i], lang) + '</li>';
        }
        html += '<li><h5>Concepts <sup>' + data.concepts.length + '</sup></li>';
        for (var i = 0; i < data.concepts.length; i++) {
            html += '<li>' + formatConceptHtml(data.concepts[i], lang) + '</li>';
        }
        html += '</ul>';

        htmlEl.html(html);
    }

    function showDemoError(error) {
        showUIError(error.message);
    }

    function showUIError(message) {
        $('#demo-result').removeClass('hide');
        $('#result-html').addClass('hide');
        $('#result-error').removeClass('hide').text(message);
    }

    var processing = false;

    function startDemo() {
        if (processing) {
            return false;
        }
        var text = $('#demo-text').val();
        var lang = $('#demo-lang').val();

        if (!lang || lang.length !== 2 || !text || text.length < 10) {
            return false;
        }

        processing = true;
        var btn = $('#demo-btn-run');
        btn.prop('disabled', true);
        var processText = btn.text();
        btn.text(btn.data('loading'));

        axios.get('http://localhost:41736/v0/entitize', {
            params: { text: text, lang: lang }
        })
            .then(function (response) {
                // console.log('response', response);
                return response.data;
            })
            .then(function (result) {
                showDemoResult(result, lang);
            })
            .catch(showDemoError)
            .then(function () {
                btn.text(processText);
                btn.prop('disabled', false);
                processing = false;
            });

        return false;
    }

    function init() {
        $("#demo-form").submit(function (event) {
            startDemo();
            event.preventDefault();
            return false;
        });

        $('#demo-lang').change(testInputData);
        // $('#demo-text').change(testInputData);
        testInputData();
    }

    function testInputData() {
        var lang = $('#demo-lang').val();
        if (lang && lang.length === 2) {
            $('#demo-btn-run').prop('disabled', false);
        } else {
            $('#demo-btn-run').prop('disabled', true);
        }
    }


    $(document).ready(init);
})();