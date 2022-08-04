function QuestionProfession(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount) {
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

    this.profession = [" Unemployed", " Student", " Factory/service worker", " Employee", " Self Employed", " Retired", " Something else"];

    this.getTimelineObject = function() {
        return {
            type: 'survey-multi-choice',
            questions: [
                { prompt: "<b>5. Please select your current profession<b>", name: "profession", options: this.profession, required: true, horizontal: false }
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