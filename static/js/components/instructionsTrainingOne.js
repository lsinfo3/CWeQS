function InstructionsTrainingOne(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount) {
    this.allowedWindowWidth = allowedWindowWidth;
    this.allowedWindowHeight = allowedWindowHeight;
    this.windowLog = windowLog;
    this.tickAmount = tickAmount;

    this.check = function() {
        var win = window,
            doc = document,
            docElem = doc.documentElement,
            body = doc.getElementsByTagName('body')[0],
            w = win.innerWidth || docElem.clientWidth || body.clientWidth,
            h = win.innerHeight || docElem.clientHeight || body.clientHeight;

        if (w < allowedWindowWidth || h < allowedWindowHeight) {
            windowLog = windowLog + ("," + jsPsych.totalTime() + ": " + w + "x" + h);
        }
    };

    if (target == "pic") {
        this.getTimelineObject = function() {
            return {
                type: "external-html",
                url: "static/html/instructions/training-image.html",
                cont_btn: "consent",
                on_finish: function() {
                    jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + tickAmount);
                },
                on_load: function() {
                    return function(fun) {
                        window.addEventListener("resize", fun);
                    }(this.check);
                }
            };
        }
    } else if (target == "text") {
        this.getTimelineObject = function() {
            return {
                type: "external-html",
                url: "static/html/instructions/training-text.html",
                cont_btn: "consent",
                on_finish: function() {
                    jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + tickAmount);
                },
                on_load: function() {
                    return function(fun) {
                        window.addEventListener("resize", fun);
                    }(this.check);
                }
            };
        }
    }
}