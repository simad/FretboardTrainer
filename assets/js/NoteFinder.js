(function(){
    'use strict';

    var defaultConfig = {
        numStrings: 6,
        numFrets: 12,
        tuning: 'standard',
        theme: 'wood'
    };

    var resultsView = new ResultsView();
    var fretboard = new Fretboard(defaultConfig);
    var notes = new Notes(defaultConfig);

    var container = $('.container');

    var start;
    var note;

    var play = function() {
        var selection = fretboard.selectRandomly();
        note = notes.getNote(selection.string, selection.fret);
        start = new Date();
    };

    var draw = function() {
        var data = {
            "numStrings": defaultConfig.numStrings,
            "numFrets": defaultConfig.numFrets,
            "tuning": defaultConfig.tuning,
            "notes": notes.getAllNotes()
        };
        var source   = container.html();
        var compiled = dust.compile(source, "index");

        dust.loadSource(compiled);

        dust.render("index", data, function(err, out) {
            container.html(out);
            fretboard.draw();
            play();
        });
    }();

    var end;
    var results = [];

    $('.notes').on('click', function(){
        end = new Date();
        console.log(end)
        results.push({
            note:  note,
            selected: $(this).text(),
            time: end - start
        });
        if ($(this).text() === note) {
            $('.notes').fadeIn();
            play();
        } else {
            $(this).fadeOut();
        }
    });
    var t = true;
    $('.control').on('click', function(){
        var toggle = $(this).find('#startstop');
        toggle.toggleClass('glyphicon-stop').toggleClass('glyphicon-play');
        if (t) {
            t = false;
            $('.fretboard').hide(1000);
            $('.notes').hide(1000);

        } else {
            t = true;
            $('.fretboard').show(1000);
            $('.notes').show(1000);
            play();
        }
        resultsView.paint({results: results});
        results = [];
    });


})(window.TuningMapper, window.Fretboard);
