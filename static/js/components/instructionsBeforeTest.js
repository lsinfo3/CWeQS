function BeforeTest(numConditions, allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount) {
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
        if (target == "pic") {
            return {
                type: 'instructions',
                pages: [
                    '<p>This is the end of the training.</p>' +
                    '<p>During the test, you will now see ' + numConditions + ' page loads that you will have to rate similar to the training.</p>' +
                    '<p>Remember: Please mark the correct images (football player/red bag) and rate the page load behavior! Thank you!</p>' +
                    '<div>' +
                    '<img class="beforeTestImg center" id="instructionVisual" src="static/img/instructions/pic-instruction.png" />' +
                    '</div>'
                ],
                show_clickable_nav: true,
                allow_keys: false,
                on_load: function() {
                    return function(fun) {
                        window.addEventListener("resize", fun);
                    }(this.check);
                },
                on_finish: function() {
                    jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + tickAmount);
                },
            };
        } else if (target == "text") {
            return {
                type: 'instructions',
                pages: [
                    '<p>This is the end of the training.</p>' +
                    '<p>During the test, you will now see ' + numConditions + ' page loads that you will have to rate similar to the training.</p>' +
                    '<p>Remember: Please <b>mark the links</b> and rate the page load behavior! Thank you!</p>' +
                    '<div>' +
                    '<img class="instImg center" id="instructionVisual" src="static/img/instructions/text-instruction.png" />' +
                    '</div>'
                ],
                show_clickable_nav: true,
                allow_keys: false,
                on_load: function() {
                    return function(fun) {
                        window.addEventListener("resize", fun);
                    }(this.check);
                },
                on_finish: function() {
                    jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + tickAmount);
                },
            };
        }
    }
}