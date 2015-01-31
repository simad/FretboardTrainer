var Fretboard = function(config) {
    'use strict';
    if (!config) {
        throw "Tried to instantiate a fretboard without options";
    }

    var themes = new ThemesMapper();
    var fretboardView = new FretboardView(config.numStrings, config.numFrets, themes.getTheme(config.theme));

    var selectRandomly = function(){
        var string = Math.floor(Math.random() * config.numStrings);
        var fret = Math.floor(Math.random() * config.numFrets);
        return fretboardView.select(string, fret);
    };

    return {
        draw: fretboardView.draw,
        selectRandomly: selectRandomly
    };

};