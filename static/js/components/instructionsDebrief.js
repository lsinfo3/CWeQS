function Debrief(urlvar, verification, allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount) {
    this.urlvar = urlvar;
    this.verification = verification;
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
            type: "instructions",
            allow_keys: false,
            pages: [
                "<h1><i>THANK YOU FOR PARTICIPATING IN OUR STUDY</i></h1>" +
                "<p>The goal of this study is to find out if and what correlations the Web Vitals provided by Google and the experience of our users have.</p>" +
                "<p>Thank you for contributing!</p>" +
                "<br>" +
                "<p>Your Microworkers verification code is:</p>" +
                "<b style='-webkit-user-select:all;'>" + verification + "</b>" +
                "<p>Please copy this code to Microworkers to receive your payment. Afterwards you can close this window.</p>"
            ],
            on_load: function() {
                return function(check) {
                    window.addEventListener("resize", check);
                    saveData(urlvar.worker + "_" + urlvar.campaign + "_" + urlvar.randkey + "_" + experimentStart + "_data", postProcessJson(JSON.parse(jsPsych.data.get().json())));
                }(this.check);
            }
        };

    }
}

function saveData(name, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'static/php/writeData.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ filename: name, filedata: data }));
}

function postProcessJson(jsonArray) {
    let newJsonArray = [];
    for (let i in jsonArray) {
        let json = jsonArray[i];
        let keys = Object.keys(json);
        //trial data
        if (keys.includes("page1-visit-0-start")) {
            let pages = ["page1", "page2", "page3"];
            for (let p in pages) {
                let page = pages[p];
                json[page] = {};

                json[page]["targets"] = json[page + "Target"];
                delete json[page + "Target"];

                json[page]["visits"] = {};

                let visitKeys = Object.keys(json).filter((x) => x.includes(page + "-visit"));
                for (let v in visitKeys) {
                    let visitKey = visitKeys[v];
                    let parts = visitKey.split("-");
                    //create visit entry if not exists
                    if (!json[page]["visits"].hasOwnProperty(parts[2])) {
                        json[page]["visits"][parts[2]] = {};
                    }
                    //append elements to visit
                    if (parts[3] == "start") {
                        //add start timestamp for visit 
                        json[page]["visits"][parts[2]][parts[3]] = json[visitKey];
                    } else {
                        //check if clicks element already exists
                        if (!json[page]["visits"][parts[2]].hasOwnProperty(parts[3])) {
                            json[page]["visits"][parts[2]][parts[3]] = {};
                        }
                        //add clicks category
                        json[page]["visits"][parts[2]][parts[3]][parts[4]] = json[visitKey];
                    }

                    delete json[visitKey];
                }
            }

            json["conditions"] = {};
            json["conditions"]["firstpaint"] = json["firstpaint"];
            json["conditions"]["tttext"] = json["tttext"];
            json["conditions"]["ttimages"] = json["ttimages"];
            json["conditions"]["plt"] = json["plt"];
            json["conditions"]["ttinteractive"] = json["ttinteractive"];
            json["conditions"]["fid"] = json["fid"];

            delete json["firstpaint"];
            delete json["tttext"];
            delete json["ttimages"];
            delete json["plt"];
            delete json["ttinteractive"];
            delete json["fid"];

            //survey response
        } else if (keys.includes("responses")) {
            json["responses"] = JSON.parse(json["responses"])["Q0"];
            for (let j in keys) {
                let key = keys[j];
                if (key.startsWith("page") || key.startsWith("tt") || key == "plt" || key == "firstpaint" || key == "fid") {
                    delete json[key];
                }
            }
        }
        newJsonArray.push(json);
    }
    return JSON.stringify(newJsonArray);
}