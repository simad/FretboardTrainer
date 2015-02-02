var ResultsView = function() {
    'use strict';

    var templateLoaded = false;

    $.get('./partials/results.dust', function(data) {
        var compiled = dust.compile(data, "resultsTemplate");
        dust.loadSource(compiled);
        templateLoaded = true;
    });

    var getIcon = function(selectedNote, actualNote){
        if (selectedNote === actualNote) {
            return 'ok';
        }
        return 'remove';
    };

    return function () {
        var paint = function(model) {
            if (templateLoaded) {
                var container = $('.res');
                model.results.map(function(result){
                    result.icon = getIcon(result.selected, result.note);
                });
                dust.render("resultsTemplate", model, function (err, out) {
                    container.html(out);
                });
            }
        };

        return {
            paint: paint
        };
    };
}();
