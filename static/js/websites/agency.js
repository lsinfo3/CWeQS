class Agency {
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
            configuration['rightHeader'] = firstpaint;
            configuration['leftHeader'] = firstpaint;
            configuration['leftTitle'] = betaRandomInRange(firstpaint, ttimages);
            configuration['rightTitle'] = betaRandomInRange(firstpaint, ttimages);
            configuration['footerLeft'] = betaRandomInRange(firstpaint, ttimages);
            configuration['text1'] = tttext;
            configuration['text2'] = betaRandomInRange(tttext, plt);
            configuration['text3'] = betaRandomInRange(tttext, plt);
            configuration['art1'] = ttimages;
            configuration['art2'] = ttimages;
            configuration['art3'] = betaRandomInRange(ttimages, tttext);
            configuration['art4'] = betaRandomInRange(ttimages, tttext);
            configuration['art5'] = betaRandomInRange(ttimages, tttext);
            configuration['art6'] = betaRandomInRange(ttimages, tttext);
            configuration['btnRating'] = Math.max(plt, clstime, lcp);
            configuration['favicon'] = Math.max(plt, clstime, lcp);
            configuration['pagingBtn'] = Math.max(plt, clstime, lcp);
            configuration['timer'] = Math.max(plt, clstime, lcp);

            return configuration;
        }
    }

    initializeCLSConfiguration(firstpaint, ttimages, tttext, plt, clstime, lcp) {
        let configuration = {};
        configuration['clsHeader'] = clstime; //fixed
        configuration['head'] = 100;
        configuration['footer'] = 100;
        configuration['rightHeader'] = betaRandomInRange(50, 150, 100);
        configuration['leftHeader'] = betaRandomInRange(100, 150, 200);
        configuration['leftTitle'] = betaRandomInRange(plt / 9, 150, 200);
        configuration['rightTitle'] = betaRandomInRange(plt / 9, 150, 200);

        if (clstime == plt) {
            configuration['text1'] = betaRandomInRange(plt / 9 * 1, plt / 9 * 2, plt / 9 * 3);
            configuration['text2'] = betaRandomInRange(plt / 9 * 4, plt / 9 * 5, plt / 9 * 6);
            configuration['text3'] = betaRandomInRange(plt / 9 * 7, plt / 9 * 8, plt / 9 * 9);
            configuration['art1'] = betaRandomInRange(plt / 9 * 1, plt / 9 * 2, plt / 9 * 3);
            configuration['art2'] = betaRandomInRange(plt / 9 * 1, plt / 9 * 2, plt / 9 * 3);
            configuration['art3'] = betaRandomInRange(plt / 9 * 4, plt / 9 * 5, plt / 9 * 6);
            configuration['art4'] = betaRandomInRange(plt / 9 * 4, plt / 9 * 5, plt / 9 * 6);
            configuration['art5'] = betaRandomInRange(plt / 9 * 7, plt / 9 * 8, plt / 9 * 9);
            configuration['art6'] = betaRandomInRange(plt / 9 * 7, plt / 9 * 8, plt / 9 * 9);
        } else {
            //first row
            configuration['text1'] = betaRandomInRange(plt / 9 * 1, plt / 9 * 2, plt / 9 * 3);
            configuration['text2'] = betaRandomInRange(plt / 9 * 6, plt / 9 * 8);
            configuration['text3'] = betaRandomInRange(plt / 9 * 7, plt / 9 * 8, plt / 9 * 9);
            configuration['art1'] = betaRandomInRange(plt / 9 * 1, plt / 9 * 2, plt / 9 * 3);
            configuration['art2'] = betaRandomInRange(plt / 9 * 1, plt / 9 * 2, plt / 9 * 3);
            configuration['art3'] = betaRandomInRange(plt / 9 * 7, plt / 9 * 8, plt / 9 * 6);
            configuration['art4'] = betaRandomInRange(plt / 9 * 7, plt / 9 * 8, plt / 9 * 6);
            configuration['art5'] = betaRandomInRange(plt / 9 * 8, plt / 9 * 9);
            configuration['art6'] = betaRandomInRange(plt / 9 * 8, plt / 9 * 9);
        }

        configuration['btnRating'] = Math.max(plt, clstime, lcp); //fest
        configuration['favicon'] = Math.max(plt, clstime, lcp); //fest
        configuration['pagingBtn'] = Math.max(plt, clstime, lcp); //fest
        configuration['timer'] = Math.max(plt, clstime, lcp); //fest
        configuration['footerLeft'] = Math.max(plt, clstime, lcp);
        return configuration;
    }


    startTimeouts() {
        this.timeouts["timeoutLoadLeftHeader"] = generateTimeout("leftHeader", this.configuration['leftHeader']);
        this.timeouts["timeoutLoadRightHeader"] = generateTimeout("rightHeader", this.configuration['rightHeader']);
        this.timeouts["timeoutLoadLeftTitle"] = generateTimeout("leftTitle", this.configuration['leftTitle']);
        this.timeouts["timeoutLoadRightTitle"] = generateTimeout("rightTitle", this.configuration['rightTitle']);
        this.timeouts["timeoutLoadFooterLeft"] = generateTimeout("footerLeft", this.configuration['footerLeft']);
        this.timeouts["timeoutLoadText1"] = generateTimeout("text1", this.configuration['text1']);
        this.timeouts["timeoutLoadText2"] = generateTimeout("text2", this.configuration['text2']);
        this.timeouts["timeoutLoadText3"] = generateTimeout("text3", this.configuration['text3']);
        this.timeouts["timeoutLoadArt1"] = generateTimeout("art1", this.configuration['art1']);
        this.timeouts["timeoutLoadArt2"] = generateTimeout("art2", this.configuration['art2']);
        this.timeouts["timeoutLoadArt3"] = generateTimeout("art3", this.configuration['art3']);
        this.timeouts["timeoutLoadArt4"] = generateTimeout("art4", this.configuration['art4']);
        this.timeouts["timeoutLoadArt5"] = generateTimeout("art5", this.configuration['art5']);
        this.timeouts["timeoutLoadArt6"] = generateTimeout("art6", this.configuration['art6']);
        this.timeouts["timeoutLoadPagingBtn"] = generateTimeout("pagingBtn", this.configuration['pagingBtn']);
    }

    addImageTargets(numberOfTargets) {
        var bucket = ['art1', 'art2', 'art3', 'art4', 'art5', 'art6'];

        function getRandomFromBucket() {
            var randomIndex = Math.floor(Math.random() * bucket.length);
            return bucket.splice(randomIndex, 1)[0];
        }

        for (var j = 0; j < numberOfTargets; j++) {
            let idx = getRandomFromBucket();
            $("#" + idx).find("img").attr({
                "src": "static/img/agency/bag.jpg",
                "border": "10px solid rgb(255, 255, 255)"
            });
        }
    }

    addTextTargets(numberOfTargets) {
        var bucket = ['text1', 'text2', 'text3'];
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
                "border": "4px solid white"
            });
            $("#" + idx).click(function() { mark(this); });
        }
    }

    setLCP(lcppic) {
        $(".art" + lcppic).addClass("lcp");
        $(".art" + lcppic).removeClass("art" + lcppic);
        $(".lcp").css({ "grid-area": "art" + lcppic });
        $(".lcp").find("img").addClass("lcpimg");
        $(".lcp").find("img").removeClass("center");
        $(".lcp").find("img").removeClass("object-borderless");
        $('.container').css({ "grid-template-rows": "5vh 25vh 17vh 17vh" });
        $('.container').css({ "grid-template-columns": "auto 25vw auto 35vw auto 25vw auto" });
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
            "rightHeader", "leftHeader", "leftTitle", "rightTitle",
            "text1", "text2", "text3",
            "art1", "art2", "art3", "art4", "art5", "art6",
            "footer",
            "footerLeft", "pagingBtn", "buttonRating", "timer"
        ];
    }

    getClickTarget() {
        return "static/img/agency/bag.jpg";
    }
}