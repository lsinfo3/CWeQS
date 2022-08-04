class News {

    constructor(firstpaint, ttimages, tttext, plt, clstime, lcp) {
        this.configuration = this.initializeConfiguration(firstpaint, ttimages, tttext, plt, clstime, lcp);
        this.timeouts = {};
    }

    initializeConfiguration(firstpaint, ttimages, tttext, plt, clstime, lcp) {
        if (clstime != null) {
            return this.initializeCLSConfiguration(firstpaint, ttimages, tttext, plt, clstime, lcp);
        } else {
            let configuration = {};
            configuration['head'] = firstpaint;
            configuration['footer'] = firstpaint;
            configuration['rightHeaderN'] = firstpaint;
            configuration['leftHeaderN'] = firstpaint;
            configuration['leftTitleN'] = betaRandomInRange(firstpaint, ttimages);
            configuration['rightTitleN'] = betaRandomInRange(firstpaint, ttimages);
            configuration['footerLeftN'] = betaRandomInRange(firstpaint, ttimages);
            configuration['test'] = betaRandomInRange(firstpaint, ttimages);
            configuration['textN1'] = tttext;
            configuration['textN2'] = betaRandomInRange(tttext, plt);
            configuration['textN3'] = betaRandomInRange(tttext, plt);
            configuration['artN1'] = ttimages;
            configuration['artN2'] = ttimages;
            configuration['artN3'] = betaRandomInRange(ttimages, tttext);
            configuration['advertN1'] = betaRandomInRange(ttimages, tttext);
            configuration['advertN2'] = plt;
            configuration['advertN3'] = plt;
            configuration['btnRating'] = Math.max(plt, clstime, lcp);
            configuration['favicon'] = Math.max(plt, clstime, lcp);
            configuration['pagingBtn'] = Math.max(plt, clstime, lcp);
            configuration['timer'] = Math.max(plt, clstime, lcp);

            return configuration;
        }
    }

    initializeCLSConfiguration(firstpaint, ttimages, tttext, plt, clstime, lcp) {
        let configuration = {};
        configuration['clsHeader'] = clstime;
        configuration['head'] = 100;
        configuration['footer'] = 100;
        configuration['rightHeaderN'] = betaRandomInRange(plt / 9, 100);
        configuration['leftHeaderN'] = betaRandomInRange(100, 150);
        configuration['leftTitleN'] = betaRandomInRange(plt / 9, 150, 200);
        configuration['rightTitleN'] = betaRandomInRange(plt / 9, 150, 200);

        configuration['textN1'] = betaRandomInRange(plt / 9 * 1, plt / 9 * 2, plt / 9 * 3);
        configuration['textN2'] = betaRandomInRange(plt / 9 * 4, plt / 9 * 5, plt / 9 * 6);
        configuration['textN3'] = betaRandomInRange(plt / 9 * 7, plt / 9 * 8, plt / 9 * 9);
        configuration['artN1'] = betaRandomInRange(plt / 9 * 1, plt / 9 * 2, plt / 9 * 3);
        configuration['artN2'] = betaRandomInRange(plt / 9 * 7, plt / 9 * 8, plt / 9 * 9);
        configuration['artN3'] = betaRandomInRange(plt / 9 * 4, plt / 9 * 5, plt / 9 * 6);
        configuration['advertN1'] = betaRandomInRange(plt / 9 * 1, plt / 9 * 2, plt / 9 * 3);
        configuration['advertN2'] = betaRandomInRange(plt / 9 * 4, plt / 9 * 5, plt / 9 * 6);
        configuration['advertN3'] = betaRandomInRange(plt / 9 * 7, plt / 9 * 8, plt / 9 * 9);

        configuration['btnRating'] = Math.max(plt, clstime, lcp);
        configuration['favicon'] = Math.max(plt, clstime, lcp);
        configuration['pagingBtn'] = Math.max(plt, clstime, lcp);
        configuration['timer'] = Math.max(plt, clstime, lcp);
        configuration['footerLeftN'] = Math.max(plt, clstime, lcp);
        return configuration;
    }

    startTimeouts() {
        this.timeouts["timeoutLoadLeftHeader"] = generateTimeout("leftHeaderN", this.configuration['leftHeaderN']);
        this.timeouts["timeoutLoadRightHeader"] = generateTimeout("rightHeaderN", this.configuration['rightHeaderN']);
        this.timeouts["timeoutLoadLeftTitle"] = generateTimeout("leftTitleN", this.configuration['leftTitleN']);
        this.timeouts["timeoutLoadRightTitle"] = generateTimeout("rightTitleN", this.configuration['rightTitleN']);
        this.timeouts["timeoutLoadText1"] = generateTimeout("textN1", this.configuration['textN1']);
        this.timeouts["timeoutLoadText2"] = generateTimeout("textN2", this.configuration['textN2']);
        this.timeouts["timeoutLoadText3"] = generateTimeout("textN3", this.configuration['textN3']);
        this.timeouts["timeoutLoadArt1"] = generateTimeout("artN1", this.configuration['artN1']);
        this.timeouts["timeoutLoadArt2"] = generateTimeout("artN2", this.configuration['artN2']);
        this.timeouts["timeoutLoadArt3"] = generateTimeout("artN3", this.configuration['artN3']);
        this.timeouts["timeoutLoadAdvert1"] = generateTimeout("advertN1", this.configuration['advertN1']);
        this.timeouts["timeoutLoadAdvert2"] = generateTimeout("advertN2", this.configuration['advertN2']);
        this.timeouts["timeoutLoadAdvert3"] = generateTimeout("advertN3", this.configuration['advertN3']);
        this.timeouts["timeoutLoadPagingBtn"] = generateTimeout("pagingBtn", this.configuration['pagingBtn']);
        this.timeouts["timeoutLoadFooterLeft"] = generateTimeout("footerLeftN", this.configuration['footerLeftN']);
    }

    addImageTargets(numberOfTargets) {
        if (numberOfTargets == 1) {
            var rnd = Math.random();
            if (rnd < 0.5) {
                $('#casey1').attr({
                    "src": "static/img/news/coutinho.jpg",
                    "border": "10px solid rgb(255, 255, 255)"
                });
            } else {
                $('#wayne1').attr({
                    "src": "static/img/news/coutinho.jpg",
                    "border": "10px solid rgb(255, 255, 255)"
                });
            }
        } else if (numberOfTargets == 2) {
            $('img#casey1').attr({
                "src": "static/img/news/coutinho.jpg",
                "border": "10px solid rgb(255, 255, 255)"
            });
            $('img#wayne1').attr({
                "src": "static/img/news/coutinho.jpg",
                "border": "10px solid rgb(255, 255, 255)"
            });
        }
    }

    addTextTargets(numberOfTargets) {
        var bucket = ['textN1', 'textN2', 'textN3'];
        var texts = [
            "www.buy-the-best-stuff-here.com/apfelkuchen/",
            "www.buy-big-apple-pies-here.com/kuchen/",
            "www.definetly-not-amazon.com/primus/",
            "www.great-shopping-here.com/cake/"
        ];

        function getRandomFromBucket() {
            var randomIndex = Math.floor(Math.random() * bucket.length);
            var test = bucket.splice(randomIndex, 1)[0];
            return test;
        }

        for (var j = 0; j < numberOfTargets; j++) {
            let idx = getRandomFromBucket();
            let randInt = getRandomInt();
            $("#" + idx).html(texts[randInt]);
            $("#" + idx).css({
                "color": "rgb(6, 69, 173)",
                "textDecoration": "underline",
                "border": "4px solid rgb(255, 255, 255)"
            });
            $("#" + idx).click(function() { mark(this); });
        }
    }

    setLCP(lcppic) {
        $(".artN" + lcppic).addClass("lcp");
        $(".artN" + lcppic).removeClass("artN" + lcppic);
        $(".lcp").css({ "grid-area": "artN" + lcppic });
        $(".lcp").find("img").addClass("lcpimg");
        $(".lcp").find("img").removeClass("center");
        $(".lcp").find("img").removeClass("borderless");
        $('.containerN').css({ "grid-template-rows": "5vh 25vh 17vh 17vh" });
        $('.containerN').css({ "grid-template-columns": "auto 35vw 25vw 10vw 25vw auto" });
    }

    getConfiguration() {
        return this.configuration;
    }

    getTimeouts() {
        return this.timeouts;
    }

    setTimeout(name, time) {
        this.configuration[name] = time;
    }

    getElements() {
        return ["head",
            "rightHeaderN", "leftHeaderN", "leftTitleN", "rightTitleN",
            "textN1", "textN2", "textN3",
            "artN1", "artN2", "artN3",
            "advertN1", "advertN2", "advertN3",
            "footer",
            "footerLeftN", "pagingBtn", "buttonRating", "timer"
        ];
    }

    getClickTarget() {
        return "static/img/news/coutinho.jpg";
    }
}