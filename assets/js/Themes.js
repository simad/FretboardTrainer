var ThemesMapper = function() {
    'use strict';

    var themes = {
        'wood': {
            stringColor: '#DCDCDC',
            stringShadowColor: '#000',
            selectedStringColor: '#FF0000',
            fretColor: '#A9A9A9',
            dotsColor: '#DCDCDC',
            backgroundColor: '#635147'
        },
        'grey': {
            stringColor: '#DCDCDC',
            stringShadowColor: '#000',
            selectedStringColor: '#FF0000',
            fretColor: '#333',
            dotsColor: '#DCDCDC',
            backgroundColor: '#696969'
        }
    };

    var getTheme = function (theme) {
        var theTheme = themes[theme];
        if (!theTheme) {
            throw "Unknown theme";
        }
        return theTheme;
    };

    return {
        getTheme: getTheme
    };
};
