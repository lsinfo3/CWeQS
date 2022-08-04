function ScreenSizeCheck(allowedWindowWidth, allowedWindowHeight) {
    this.allowedWindowWidth = allowedWindowWidth;
    this.allowedWindowHeight = allowedWindowHeight;

    this.check = function() {
        var screenW = screen.availWidth;
        var screenH = screen.availHeight;
        if (screenW >= allowedWindowWidth && screenH >= allowedWindowHeight) {
            return true;
        }
        return false;
    };

    this.getTimelineObject = function() {
        return {
            timeline: [{
                type: "html-keyboard-response",
                stimulus: '<p>We are sorry, the screen of your device must be at least ' + allowedWindowWidth + ' pixels wide and ' + allowedWindowHeight + ' pixels high! <br>Please use another device to participate in the study! <br>Your browser width: ' + window.innerWidth + ';' + ' Your browser height: ' + window.innerHeight + '</p>',
                choices: jsPsych.NO_KEYS
            }],
            conditional_function: () => {
                return function(fun) {
                    return !fun();
                }(this.check)
            }
        }
    }
}