class Blog {
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
            configuration['leftTitle'] = betaRandomInRange(firstpaint, ttimages);;
            configuration['rightTitle'] = betaRandomInRange(firstpaint, ttimages);;
            configuration['footerLeft'] = betaRandomInRange(firstpaint, ttimages);
            configuration['blogtext'] = tttext;
            configuration['blogimg'] = ttimages;
            configuration['btnRating'] = plt;
            configuration['favicon'] = Math.max(plt, clstime, lcp);
            configuration['timer'] = Math.max(plt, clstime, lcp);
            return configuration;
        }
    }

    initializeCLSConfiguration(firstpaint, ttimages, tttext, plt, clstime, lcp) {
        let configuration = {};
        if (clstime == plt) {
            configuration['clsHeader'] = clstime;
            configuration['head'] = plt / 9;
            configuration['footer'] = plt;
            configuration['rightHeader'] = plt / 5;
            configuration['leftHeader'] = plt / 4;
            configuration['leftTitle'] = plt / 3;
            configuration['rightTitle'] = plt;
            configuration['footerLeft'] = plt;
            configuration['blogtext'] = plt / 9 * 8;
            configuration['blogimg'] = plt / 9 * 4;
            configuration['btnRating'] = plt;
            configuration['pagingBtn'] = plt;
            configuration['favicon'] = plt;
            configuration['timer'] = plt;
        } else {
            configuration['clsHeader'] = clstime;
            configuration['head'] = plt / 9;
            configuration['footer'] = plt;
            configuration['rightHeader'] = plt / 5;
            configuration['leftHeader'] = plt / 4;
            configuration['leftTitle'] = plt / 3;
            configuration['rightTitle'] = plt;
            configuration['footerLeft'] = plt;
            configuration['blogtext'] = plt / 9 * 8;
            configuration['blogimg'] = plt / 9 * 4;
            configuration['btnRating'] = plt;
            configuration['pagingBtn'] = plt;
            configuration['favicon'] = plt;
            configuration['timer'] = plt;
        }
        return configuration;
    }

    startTimeouts() {
        this.timeouts["timeoutLoadLeftHeader"] = generateTimeout("leftHeader", this.configuration['leftHeader']);
        this.timeouts["timeoutLoadRightHeader"] = generateTimeout("rightHeader", this.configuration['rightHeader']);
        this.timeouts["timeoutLoadLeftTitle"] = generateTimeout("leftTitle", this.configuration['leftTitle']);
        this.timeouts["timeoutLoadRightTitle"] = generateTimeout("rightTitle", this.configuration['rightTitle']);
        this.timeouts["timeoutLoadBlogtext"] = generateTimeout("blogtext", this.configuration['blogtext']);
        this.timeouts["timeoutLoadBlogimg"] = generateTimeout("blogimg", this.configuration['blogimg']);
        this.timeouts["timeoutLoadPagingBtn"] = generateTimeout("pagingBtn", this.configuration['pagingBtn']);
        this.timeouts["timeoutLoadFooterLeft"] = generateTimeout("footerLeft", this.configuration['footerLeft']);
        this.timeouts["timeoutLoadButtonRating"] = generateTimeout("btnRating", this.configuration['btnRating']);
    }

    addImageTargets(numberOfTargets) {}

    addTextTargets(numberOfTargets) {
        var bucket = ['URL1', 'URL2', 'URL3', 'URL4'];

        function getRandomFromBucket() {
            var randomIndex = Math.floor(Math.random() * bucket.length);
            return bucket.splice(randomIndex, 1)[0];
        }
        for (var j = 0; j < numberOfTargets; j++) {
            var idx = getRandomFromBucket();
            $("#" + idx).css({
                "color": "#0645AD",
                "textDecoration": "underline",
                "border": "4px solid white"
            });
            $("#" + idx).removeClass("hideElement");
            $("#" + idx).click(function() { mark(this); });
        }
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
            "blogtext", "blogimg",
            "footer",
            "footerLeft", "pagingBtn", "buttonRating", "timer"
        ];
    }

    getClickTarget() {}
}