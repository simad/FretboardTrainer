var FretboardView = function(numStrings, numFrets, theme) {
    var strokeWidth = 8;
    var strings;

    var draw = function() {
        SVG.registerEvent('select');
        SVG.registerEvent('deselect');

        var svg = SVG('fret').size($('#fret').width(), 190);

        svg.rect('100%', '100%').attr({ fill: theme.backgroundColor });
        //Fret Distance Formula: see here http://liutaiomottola.com/formulae/fret.htm
        var fretDistance = function(fret) {
            var normalizedWidth = svg.width() * 2 - strokeWidth;
            return normalizedWidth - (normalizedWidth / Math.pow(2,(fret/numFrets)));
        };

        placeFrets(svg, fretDistance);

        placeStrings(svg, fretDistance);

        placeDots(svg, fretDistance);
    };

    var placeFrets = function(svg, fretDistance){
        for (var fretNumber = 1; fretNumber <= numFrets; fretNumber++) {
            var fret = svg.line(fretDistance(fretNumber), 0, fretDistance(fretNumber), '100%');
            fret.stroke({ color: theme.fretColor,
                width: strokeWidth});
        }
    };

    var placeStrings = function(svg, fretDistance) {
        strings = svg.set();
        var stringSpacing = svg.height() / numStrings;
        var stringDistance = function(whichString) {
            return (stringSpacing/2 + (stringSpacing * whichString));
        };
        for (var stringNumber = 0; stringNumber < numStrings; stringNumber++){
            var string = svg.set();
            for (var fretNumber = 0; fretNumber < numFrets; fretNumber++) {
                var stringPiece = svg.line(fretDistance(fretNumber), stringDistance(stringNumber), fretDistance(fretNumber+1), stringDistance(stringNumber));
                stringPiece.data({
                    s: numStrings - 1 - stringNumber,
                    f: fretNumber+1
                });
                stringPiece.on('select', function() {
                    this.stroke({ color: theme.selectedStringColor });
                });
                stringPiece.on('deselect', function() {
                    this.stroke({ color: theme.stringColor});
                });
                string.add(stringPiece);
                string.stroke({color: theme.stringColor, width: stringNumber + 3});
                var shadow = svg.line(fretDistance(fretNumber), stringDistance(stringNumber) + (stringNumber + 3)/2, fretDistance(fretNumber+1), stringDistance(stringNumber) +  (stringNumber + 3)/2);
                shadow.stroke({color: theme.stringShadowColor, width: 2});
            }
            strings.add(string);
        }
    };

    var placeDots = function(svg, fretDistance) {
        var placeDot = function(fret, double) {
            var radius = 16;
            var fill = { color: theme.dotsColor };
            var distance = fretDistance(fret) - fretDistance(fret-1);
            var dotX = fretDistance(fret) - distance/2 - radius/2;
            if (double) {
                svg.circle(radius).fill(fill).move(dotX, svg.height() / 3 - radius/2);
                svg.circle(radius).fill(fill).move(dotX, 2*svg.height() / 3 - radius/2);
            } else {
                svg.circle(radius).fill(fill).move(dotX, svg.height() / 2 - radius/2);
            }
        };

        for (var twelveMul = 0; twelveMul < numFrets; twelveMul+=12) {
            [3,5,7,9].map(function(where){
                placeDot(twelveMul+where);
            });
            placeDot(twelveMul+12, true);
        }
    };

    var sel;
    var select = function(string, fret) {
        if (sel) {
            sel.fire('deselect');
        }
        sel = strings.get(string).get(fret);
        sel.fire('select');
        return {
            string: sel.data('s'),
            fret: sel.data('f')
        };
    };

    return {
        draw: draw,
        select: select
    }
};