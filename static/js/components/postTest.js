function PostTest(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount) {
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

    this.getTimelineObject = function() {
        return {
            type: 'survey-text',
            preamble: '<h3>One last question about page loading</h3>During the test, we asked you to rate the page load experience of different pages. At the end, we are interested in what you used to determine if a page load experience was fast or slow.',
            questions: [{ prompt: "What is for you the most important thing for a fast page load experience? Please describe on what you focused most.", rows: 10, columns: 100 }],
            on_finish: function() {
                let interactionData = jsPsych.data.getInteractionData();
                jsPsych.data.get().addToLast({ interaction: interactionData.json(), campaign: urlvar.campaign, worker: urlvar.worker, randkey: urlvar.randkey, verificationcode: verification, window_log: windowLog });
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