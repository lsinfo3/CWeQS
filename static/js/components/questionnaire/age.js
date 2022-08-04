function QuestionAge(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount) {
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

    this.age = [" <20", " 20-25", " 25-30", " 30-35", " 35-40", " 40-45", " 45-50", " >50"];

    this.getTimelineObject = function() {
        return {
            type: 'survey-multi-choice',
            questions: [
                { prompt: "<b>2. Age: Please select your age<b>", name: "age", options: this.age, required: true, horizontal: false }
            ],
            on_finish: function() {

            },
            on_load: function() {
                return function(fun) {
                    window.addEventListener("resize", fun);
                }(this.check);
            }
        };
    }
}