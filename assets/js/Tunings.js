var TuningMapper = function(numStrings){
    'use strict';

    var tunings = {
        6: {
            standard: ['E','A','D','G','B','E']
        }
    };
    
    var getTuning = function(tuning) {
        var tuningsForStrings = tunings[numStrings];
       if (!tuningsForStrings){
           throw "No tuning available for the selected number of strings";
       }
        if(tuningsForStrings[tuning].length !== numStrings){
            throw "This tuning has the wrong number of notes"
        }
        return tuningsForStrings[tuning];
    };

    return {
        getTuning: getTuning
    }
};