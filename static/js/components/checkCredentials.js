function CredentialsCheck(urlvar, experimentStart) {

    this.check = function() {
        if (urlvar.campaign !== undefined) {
            if (urlvar.worker === undefined) {
                urlvar.worker = (Math.random() * 100000000000000000) + 1;
            }
            let eventFile = urlvar.worker + "_" + urlvar.campaign + "_" + urlvar.randkey + "_" + experimentStart + "_events";
            startEventTracking(eventFile);
            return false;
        }
        return true;
    };


    this.getTimelineObject = function() {
        return {
            timeline: [{
                type: "html-keyboard-response",
                stimulus: '<p>This task is only available with a valid worker ID, campaign ID, and random key. Please use the link as displayed on Microworkers.</p>',
                choices: jsPsych.NO_KEYS
            }],
            conditional_function: () => {
                return function(fun) {
                    return fun();
                }(this.check)
            }
        }
    }
}

function startEventTracking(taskName) {
    // Please read js/src/trackui.js for the API and code documentation.
    TrackUI.record({
        debug: false,

        postInterval: 10,
        // Example: track all clicks and poll mouse movements at 50 ms
        regularEvents: "click",
        //pollingEvents: "mousemove",
        //pollingMs: 50,

        // Example: pure event polling at 500 ms
        //regularEvents: "",
        //pollingEvents: "*",
        //pollingMs: 500,

        taskName: taskName,

        postServer: "static/php/writeEvents.php"
    });
}