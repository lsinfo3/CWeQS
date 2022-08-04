// Whether the image elements are interactive
var isInteractive = false;
// Whether the first input delay is active
var isDelay = true;
var delayQueue = [];
var delayTimerRunning = false;

var page = jsPsych.currentTrial().data.page;
// Times when the elements are displayed 
var firstpaint = jsPsych.currentTrial().data.firstpaint;
var tttext = jsPsych.currentTrial().data.tttext;
var ttimages = jsPsych.currentTrial().data.ttimages;
var plt = jsPsych.currentTrial().data.plt;
var ttinteractive = isNaN(jsPsych.currentTrial().data.ttinteractive) ? 0 : jsPsych.currentTrial().data.ttinteractive;
var fid = isNaN(jsPsych.currentTrial().data.fid) ? 0 : jsPsych.currentTrial().data.fid;
var clstime = isNaN(jsPsych.currentTrial().data.clstime) ? -Infinity : jsPsych.currentTrial().data.clstime;
var clsdist = jsPsych.currentTrial().data.clsdist;
var lcp = isNaN(jsPsych.currentTrial().data.lcp) ? -Infinity : jsPsych.currentTrial().data.lcp;
var lcppic = jsPsych.currentTrial().data.lcppic;

//Targets to click
var pageTarget = jsPsych.currentTrial().data.pageTarget;

var timerShow, timerContinue;

var website;
if (page == "agency") {
    website = new Agency(firstpaint, ttimages, tttext, plt, clstime, lcp);
} else if (page == "news") {
    website = new News(firstpaint, ttimages, tttext, plt, clstime, lcp);
} else if (page == "blog") {
    website = new Blog(firstpaint, ttimages, tttext, plt, clstime, lcp);
}

// initial load of the page, reset timer -if exists-
$('#continue').on('click', function() {
    $('#launch').css({ "display": "none" });
    $("#main").css({ 'display': 'block' });
    initialLoad();
    loadPage();
});

function showElements(elements) {
    for (var i in elements) {
        $("." + elements[i]).css({ 'visibility': 'visible' });
    }
}

function hideElements(elements) {
    for (var i in elements) {
        $("#" + elements[i]).addClass('hideElement');
    }
}

function initialLoad() {
    resetTimer();
    showElements(website.getElements());
    $('#page').css({ 'display': "none" });
    hideElements(website.getElements());



    if (clsdist > 0) {
        $(".clsHeader").css({ 'height': clsdist, 'width': window.innerWidth });
        $(".headButton").css({ 'height': 0 });
        var buttonheight = Math.max(document.documentElement.clientHeight || 0);
        buttonheight = clsdist - 20 + "px";
        var lupewidth = Math.max(document.documentElement.clientHeight || 0);
        lupewidth = (clsdist - 20) * 3
        var font = Math.max(document.documentElement.clientHeight || 0);
        font = (($(".headButton")[0].style.width * buttonheight) / 2.5) + "px";
        $(".headButton").css({
            "height": buttonheight,
            "marginTop": "0.8vh",
            "fontSize": font
        })
        $("#lupe").css({
            "height": buttonheight,
            "width": lupewidth,
            "marginTop": "auto"
        })

        if (clsdist < 80) {
            buttonheight = clsdist + "px";
            var lupewidth = Math.max(document.documentElement.clientHeight || 0);
            lupewidth = clsdist;
            font = (clsdist / 2) + "px";
            $(".headButton").css({ "height": buttonheight, "fontSize": font, "marginTop": "0px" })
            $("#lupe").css({ "height": buttonheight, "width": lupewidth });
        }
    } else if (clsdist == 0) {
        $(".clsHeader").css({ "height": 0 });
        $(".headButton").css({ "display": "none" });
        $("#lupe").css({ "display": "none" });
    }

    if (lcp > 0 && lcppic > 0 && page != "blog") {
        website.setLCP(lcppic);
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function loadPage() {
    $("#jspsych-content").css({ "marginTop": "0" }); //remove space between progressbar and content
    scrollToTop();
    //reset FID global parameters
    isDelay = true;
    delayTimerRunning = false;
    loadingFavicon();

    // hide lcp element
    if (lcp > 0 && lcppic > 0) {
        $(".lcp").css({ 'display': 'none' });
    }

    jsPsych.currentTrial().data["visit-start"] = jsPsych.totalTime(); //start time of visit
    hideElements(["btnRating"]);
    website.setTimeout("timeoutLoadButtonRating", generateTimeout("btnRating", website.getConfiguration()["btnRating"]));

    if (target == 'pic') {
        website.addImageTargets(jsPsych.currentTrial().data["pageTarget"]);
    } else if (target == 'text') {
        website.addTextTargets(jsPsych.currentTrial().data["pageTarget"]);
    }

    jsPsych.currentTrial().data["clicks-correct"] = 0;
    jsPsych.currentTrial().data["clicks-wrong"] = 0;
    jsPsych.currentTrial().data["clicks-noninteractive"] = 0;

    $('#page').css({ "display": "grid" });
    $('#pagingBtn').addClass('hideElement');

    //start interactive timeout
    startInteractiveTimeout();

    //start element timeouts
    website.startTimeouts();

    if (clstime > 0) {
        setTimeout(function() {
            $(".clsHeader").css({ 'display': 'block' });
        }, clstime);
    }
    if (lcp > 0 && lcppic > 0 && page != "blog") {
        setTimeout(function() {
            $(".lcp").css({ 'display': 'block' });
        }, lcp);
    }

    // start 30 second timeout at end of page load
    setTimeout(function() {
        startTimer();
    }, website.getConfiguration()["btnRating"]);
}

// favicon, with 4 images 
function loadingFavicon() {
    document.head = document.head || document.getElementsByTagName('head')[0];
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.id = "favicon"
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'static/img/icons/logo.png';
    document.getElementsByTagName('head')[0].appendChild(link);

    var favicon = document.getElementById('favicon');
    var faviconIndex = 0;
    var time = 0;

    if (typeof loading !== 'undefined') {
        clearInterval(loading);
        loading = undefined;
    }

    favicon.href = "static/img/icons/" + "index" + faviconIndex + ".png";
    faviconIndex++;
    faviconIndex %= 4;
    loading = setInterval(function() {
        favicon.href = "static/img/icons/" + "index" + faviconIndex + ".png";
        faviconIndex++;
        faviconIndex %= 4;
        time += 500;
        if (time >= website.getConfiguration()['favicon']) {
            clearInterval(loading);
            favicon.href = "static/img/icons/logo.png";
        }
    }, 500);
}

function generateTimeout(element, loadingTime) {
    return setTimeout(function() {
        $("#" + element).removeClass('hideElement');
    }, loadingTime);
}

function startInteractiveTimeout() {
    isInteractive = false;
    setTimeout(function() {
        isInteractive = true;
    }, ttinteractive);
}

function startTimer() {
    var time = 30;
    resetTimer();
    timerShow = setInterval(function() {
        // Time calculations for days, hours, minutes and seconds
        time--;
        // If the count down is finished, write some text 
        if ($("#timerSeconds").length) {
            if (time <= 0) {
                $("#timerSeconds").html("")
                clearInterval(timerShow);
            } else {
                $("#timerSeconds").html(time);
            }
        } else {
            clearInterval(timerShow);
        }
    }, 1000);

    timerContinue = setTimeout(function() {
        if (jsPsych.currentTrial().data !== undefined) {
            jsPsych.currentTrial().data.configuration = JSON.stringify(website.getConfiguration());
        }
        goToEvaluate();
    }, time * 1000); //time after which the page is continued
}

function resetTimer() {
    //visible timer
    $("#timerSeconds").html("");
    if (typeof timerShow !== 'undefined') {
        clearInterval(timerShow);
        timerShow = undefined;
    }

    //internal timer
    if (typeof timerContinue !== 'undefined') {
        clearTimeout(timerContinue);
        timerContinue = undefined;
    }
}

function goToEvaluate() {
    resetTimer();
    for (var i in website.getTimeouts()) {
        clearTimeout(website.getTimeouts()[i]);
    }
    $("#jspsych-content").css({ "margin": "auto" });
    $('#btnRatingGoOn').click();
};


function countClickedImageElements(src, style, correct) {
    if (correct) {
        var clicked = $("#page").find("img").filter(function() {
            return $(this).attr("src") == src && this.style.border == style;
        });
    } else {
        var clicked = $("#page").find("img").filter(function() {
            return $(this).attr("src") != src && this.style.border == style;
        });
    }
    return clicked.length;
}

function countClickedTextElements() {
    return $("*").children().filter(function() {
        return this.style.color == "rgb(186, 0, 0)"
    }).length;
}

function isHidden(el) {
    return (window.getComputedStyle(el).display === "none");
}

function mark(el) {

    function markElement(el) {
        if (isInteractive && clsdist > 0 && clstime == 0 && isHidden(document.getElementById("clsHeader"))) {
            $(".clsHeader").css({ 'display': 'block' });
        } else if (isInteractive) {
            if (target == "pic" && $("#" + el.id).prop("nodeName") == "IMG") {
                if ($("#" + el.id).css("border") === "10px solid rgb(255, 0, 0)") {
                    $("#" + el.id).css({ "border": "10px solid rgb(255, 255, 255)" });
                } else {
                    $("#" + el.id).css({ "border": "10px solid rgb(255, 0, 0)" });
                }
            } else if (target == "text" && $("#" + el.id).prop("nodeName") != "IMG") {
                if ($("#" + el.id).css("color") == "rgb(6, 69, 173)") {
                    $("#" + el.id).css({
                        "color": "rgb(186, 0, 0)",
                        "border": "4px solid rgb(255, 0, 0)"
                    })
                } else {
                    $("#" + el.id).css({
                        "color": "rgb(6, 69, 173)",
                        "border": "4px solid rgb(255, 255, 255)"
                    })
                }
            }

            if (target == "pic") {
                jsPsych.currentTrial().data["clicks-correct"] = countClickedImageElements(website.getClickTarget(), "10px solid rgb(255, 0, 0)", true);
                jsPsych.currentTrial().data["clicks-wrong"] = countClickedImageElements(website.getClickTarget(), "10px solid rgb(255, 0, 0)", false);
            } else if (target == "text") {
                jsPsych.currentTrial().data["clicks-correct"] = countClickedTextElements();
            }
        }
    }

    function emptyQueue() {
        var j = 0; //counter to visualize clicks after delay is over
        var timeout = 0;
        while (delayQueue.length > 0) {
            var obj = delayQueue.shift();
            timeout = 50 * j;
            setTimeout(markElement, timeout, obj["element"]);
            j++;
        }
    }

    //use FID to delay marking of elements
    if (isDelay) {
        delayQueue.push({ "element": el });
        if (!delayTimerRunning) {
            setTimeout(() => {
                isDelay = false;
                delayTimerRunning = true;
                emptyQueue();
            }, fid);
        }
    } else {
        markElement(el);
    }
};