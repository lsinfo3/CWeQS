function BrowserSizeCheck(allowedWindowWidth, allowedWindowHeight) {
    this.allowedWindowWidth = allowedWindowWidth;
    this.allowedWindowHeight = allowedWindowHeight;

    this.check = function() {
        var win = window,
            doc = document,
            docElem = doc.documentElement,
            body = doc.getElementsByTagName('body')[0],
            w = win.innerWidth || docElem.clientWidth || body.clientWidth,
            h = win.innerHeight || docElem.clientHeight || body.clientHeight;

        if (w >= allowedWindowWidth && h >= allowedWindowHeight) {
            windowLog += jsPsych.totalTime() + ": " + w + "x" + h;
            return true;
        }
        return false;
    };

    this.getTimelineObject = function() {
        return {
            timeline: [{
                type: "html-keyboard-response",
                stimulus: '<p>We are sorry, the browser window must be at least ' + allowedWindowWidth + ' pixels wide and ' + allowedWindowHeight + ' pixels high! <br>Please resize your browser window to participate in the study! <br>Your browser width: ' + window.innerWidth + ';' + ' Your browser height: ' + window.innerHeight + '</p>',
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