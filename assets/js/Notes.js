var Notes = function(defaultConfig) {
    var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    var tuningMapper = new TuningMapper(defaultConfig.numStrings);
    var tuning = tuningMapper.getTuning(defaultConfig.tuning);

    var _getNote = function(start, fret) {
        var index = (notes.indexOf(start) + fret) % notes.length;
        return notes[index];
    };

    var getNote = function(string, fret){
        return _getNote(tuning[string], fret);
    };

    var getAllNotes = function() {
        return notes;
    };
    return {
        getNote: getNote,
        getAllNotes: getAllNotes
    }
};

