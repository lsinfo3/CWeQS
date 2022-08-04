function WorkersCheck(survSpots) {
    this.survSpots = survSpots;

    // similar to the other survey
    this.numberSession = function() {
        var xhr = new XMLHttpRequest();
        var ret;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                ret = xhr.responseText;
            }
        }
        xhr.open('GET', 'static/php/numberSession.php', false);
        xhr.send(null);
        return ret;
    }

    this.numberFiles = function() {
        var xhr = new XMLHttpRequest();
        var ret;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                ret = xhr.responseText;
            }
        }
        xhr.open('GET', 'static/php/numberFiles.php', false);
        xhr.send(null);
        return ret;
    }

    this.check = function(files, sessions) {
        var filecount = parseInt(files(), 10) + parseInt(sessions(), 10);
        return filecount > survSpots;
    }(this.numberFiles, this.numberSession);

    this.getTimelineObject = function() {
        return {
            timeline: [{
                type: "html-keyboard-response",
                stimulus: '<p>We are sorry, the maximum amount of workers for this task has already been reached.</p>',
                choices: jsPsych.NO_KEYS
            }],
            conditional_function: () => {
                return function(check) {
                    return check;
                }(this.check)
            }
        }
    }
}