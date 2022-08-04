function QuestionBrowsing(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount) {
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

    this.browsing = [" Several times a day", " Several times a week", " Several times a month", " Once per month or less"];

    this.getTimelineObject = function() {
        return {
            type: 'survey-multi-choice',
            questions: [{
                prompt: "<b>6. Internet Usage: Please select the amount of time you browse in the Internet in your free time<b>",
                name: "browsing",
                options: this.browsing,
                required: true,
                horizontal: false
            }],
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