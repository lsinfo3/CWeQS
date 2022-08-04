function readURLParameters() {
    let params = location.search.replace("?", "").split("&");
    let page = params[0];
    //transform input parameters to Object
    let values = params.reduce(function(map, obj) {
        let kv = obj.split("=");
        if (kv[0] == "clspercentage") {
            map[kv[0]] = parseFloat(kv[1]);
        } else {
            map[kv[0]] = parseInt(kv[1]);
        }
        // }
        return map;
    }, {});
    values["page"] = page.split("=")[1];
    return values;
}

function generateTimeout(elementId, loadingTime) {
    return setTimeout(function() {
        $("#" + elementId).removeClass("hideElement");
    }, loadingTime);
}


function showElements(elements) {
    for (var i in elements) {
        $("." + elements[i]).css({ 'visibility': 'visible' });
    }
}

function hideElements(elements) {
    for (var i in elements) {
        console.log(elements[i]);
        $("." + elements[i]).addClass('hideElement');
    }
}

// favicon, with 4 images 
function loadingFavicon(timeFavicon) {
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
        if (time >= timeFavicon) {
            clearInterval(loading);
            favicon.href = "static/img/icons/logo.png";
        }
    }, 500);
}

function executeTimeoutsAgency(values) {
    generateTimeout("leftHeader", values["leftHeader"]);
    generateTimeout("rightHeader", values["rightHeader"]);
    generateTimeout("leftTitle", values["leftTitle"]);
    generateTimeout("rightTitle", values["rightTitle"]);
    generateTimeout("footerLeft", values["footerLeft"]);
    generateTimeout("text1", values["text1"]);
    generateTimeout("text2", values["text2"]);
    generateTimeout("text3", values["text3"]);
    generateTimeout("art1", values["art1"]);
    generateTimeout("art2", values["art2"]);
    generateTimeout("art3", values["art3"]);
    generateTimeout("art4", values["art4"]);
    generateTimeout("art5", values["art5"]);
    generateTimeout("art6", values["art6"]);
    generateTimeout("pagingBtn", values["pagingBtn"]);
    generateTimeout("btnRating", values["btnRating"]);

    if (values["clstime"] > 0) {
        setTimeout(function() {
            $(".clsHeader").css({ 'display': 'block' });
        }, values["clstime"]);
    }

    if (values["lcp"] > 0 && values["lcppic"] > 0) {
        setTimeout(function() {
            $(".lcp").css({ 'display': 'block' });
        }, values["lcp"]);
    }
}

function executeTimeoutsNews(values) {
    generateTimeout("leftHeaderN", values["leftHeaderN"]);
    generateTimeout("rightHeaderN", values["rightHeaderN"]);
    generateTimeout("leftTitleN", values["leftTitleN"]);
    generateTimeout("rightTitleN", values["rightTitleN"]);
    generateTimeout("footerLeftN", values["footerLeftN"]);
    generateTimeout("textN1", values["textN1"]);
    generateTimeout("textN2", values["textN2"]);
    generateTimeout("textN3", values["textN3"]);
    generateTimeout("art1", values["art1"]);
    generateTimeout("art2", values["art2"]);
    generateTimeout("art3", values["art3"]);
    generateTimeout("advert1", values["advert1"]);
    generateTimeout("advert2", values["advert2"]);
    generateTimeout("advert3", values["advert3"]);
    generateTimeout("pagingBtn", values["pagingBtn"]);
    generateTimeout("btnRating", values["btnRating"]);

    if (values["clstime"] > 0) {
        setTimeout(function() {
            $(".clsHeader").css({ 'display': 'block' });
        }, values["clstime"]);
    }

    if (values["lcp"] > 0 && values["lcppic"]) {
        setTimeout(function() {
            $(".lcp").css({ 'display': 'block' });
        }, values["lcp"]);
    }
}

function executeTimeoutsBlog(values) {
    generateTimeout("leftHeader", values["leftHeader"]);
    generateTimeout("rightHeader", values["rightHeader"]);
    generateTimeout("leftTitle", values["leftTitle"]);
    generateTimeout("rightTitle", values["rightTitle"]);
    generateTimeout("footerLeft", values["footerLeft"]);
    generateTimeout("blogimg", values["blogimg"]);
    generateTimeout("blogtext", values["blogtext"]);
    generateTimeout("pagingBtn", values["pagingBtn"]);
    generateTimeout("btnRating", values["btnRating"]);

    if (values["clstime"] > 0) {
        setTimeout(function() {
            $(".clsHeader").css({ 'display': 'block' });
        }, values["clstime"]);
    }

    if (values["lcp"] > 0 && values["lcppic"] > 0) {
        setTimeout(function() {
            $(".lcp").css({ 'display': 'block' });
        }, values["lcp"]);
    }
}

function setCLS(clsdist) {
    if (clsdist > 0) {
        $(".clsHeader").css({ 'height': clsdist });
        $(".clsHeader").css({ 'width': window.innerWidth });
        $(".headbuttonone").css({ 'height': 0 });
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

    } else {
        $(".clsHeader").css({ 'height': 0 });
        $(".clsHeader").css({ "height": 0 });
        $(".headButton").css({ "display": "none" });
        $("#lupe").css({ "display": "none" });
    }
}

// makes the elements visible, not hidden anymore, so they can easily accessed by their id
function initialLoadAgency(values) {
    let elements = ["head",
        "rightHeader", "leftHeader", "leftTitle", "rightTitle",
        "text1", "text2", "text3",
        "art1", "art2", "art3", "art4", "art5", "art6",
        "footer",
        "footerLeft", "pagingBtn", "timer", "btnRating"
    ];
    $('#page').css({ 'display': "grid" });
    $("#main").css({ 'display': 'block' });
    showElements(elements);
    hideElements(elements);
    $('#page').css({ "display": "grid" });
    $('#pagingBtn').addClass('hideElement');

    if (values["clspercentage"] > 0 && values["clstime"]) {
        let clsdist = values["clspercentage"] * window.innerHeight;
        setCLS(clsdist);
    }

    if (values["lcp"] > 0 && values["lcppic"] > 0) {
        $(".art" + lcppic).addClass("lcp");
        $(".art" + lcppic).removeClass("art" + lcppic);
        $(".lcp").css({ "grid-area": "art" + lcppic });
        $(".lcp").find("img").addClass("lcpimg");
        $(".lcp").find("img").removeClass("center");
        $(".lcp").find("img").removeClass("borderless");
        $('.container').css({ "grid-template-rows": "5vh 25vh 17vh 17vh" });
        $('.container').css({ "grid-template-columns": "auto 25vw auto 35vw auto 25vw auto" });
    }
}

function initialLoadNews(values) {
    let elements = ["head",
        "rightHeaderN", "leftHeaderN", "leftTitleN", "rightTitleN",
        "textN1", "textN2", "textN3",
        "artN1", "artN2", "artN3",
        "advertN1", "advertN2", "advertN3",
        "footer",
        "footerLeftN", "pagingBtn", "btnRating", "timer"
    ];
    $('#page').css({ 'display': "grid" });
    $("#main").css({ 'display': 'block' });
    showElements(elements);
    hideElements(elements);
    $('#page').css({ "display": "grid" });
    $('#pagingBtn').addClass('hideElement');


    if (values["clspercentage"] > 0 && values["clstime"]) {
        let clsdist = values["clspercentage"] * window.innerHeight;
        setCLS(clsdist);
    }

    if (values["lcp"] > 0 && values["lcppic"]) {
        $(".art" + lcppic).addClass("lcp");
        $(".art" + lcppic).removeClass("art" + lcppic);
        $(".lcp").css({ "grid-area": "art" + lcppic });
        $(".lcp").find("img").addClass("lcpimg");
        $(".lcp").find("img").removeClass("center");
        $(".lcp").find("img").removeClass("borderless");
        $('.container').css({ "grid-template-rows": "5vh 25vh 17vh 17vh" });
        $('.container').css({ "grid-template-columns": "auto 25vw auto 35vw auto 25vw auto" });
    }
}

function initialLoadBlog(values) {
    let elements = ["head",
        "rightHeader", "leftHeader", "leftTitle", "rightTitle",
        "blogtext", "blogimg",
        "footer",
        "footerLeft", "pagingBtn", "timer", "btnRating"
    ];
    $('#page').css({ 'display': "grid" });
    $("#main").css({ 'display': 'block' });
    showElements(elements);
    hideElements(elements);
    $('#page').css({ "display": "grid" });
    $('#pagingBtn').addClass('hideElement');

    if (values["clspercentage"] > 0 && values["clstime"]) {
        let clsdist = values["clspercentage"] * window.innerHeight;
        setCLS(clsdist);
    }

    if (values["lcp"] > 0 && values["lcppic"]) {
        $(".art" + lcppic).addClass("lcp");
        $(".art" + lcppic).removeClass("art" + lcppic);
        $(".lcp").css({ "grid-area": "art" + lcppic });
        $(".lcp").find("img").addClass("lcpimg");
        $(".lcp").find("img").removeClass("center");
        $(".lcp").find("img").removeClass("borderless");
        $('.containerB').css({ "grid-template-rows": "5vh 25vh 17vh 17vh" });
        $('.containerB').css({ "grid-template-columns": "auto 25vw auto 35vw auto 25vw auto" });
    }
}

//main
const values = readURLParameters();
//removes continue button
$('#launch').css({ "display": "none" });
if (values["page"] == "agency") {
    initialLoadAgency(values);
    loadingFavicon(values["favicon"]);
    executeTimeoutsAgency(values);
} else if (values["page"] == "news") {
    initialLoadNews(values);
    loadingFavicon(values["favicon"]);
    executeTimeoutsNews(values);
} else if (values["page"] == "blog") {
    initialLoadBlog(values);
    loadingFavicon(values["favicon"]);
    executeTimeoutsBlog(values);
} else {
    console.error(values["page"]);
    console.error("PAGE IS UNKNOWN OR NOT SET");
}