class Interface {
    constructor(clstime, firstpaint, ttimages, tttext, plt) {
        this.configuration = this.initializeConfiguration(clstime, firstpaint, ttimages, tttext, plt);
        this.timeouts = {};
    }

    //TODO: Fix LCP and CLS
    initializeConfiguration(clstime, firstpaint, ttimages, tttext, plt) {
        console.log("Override");
    }

    startTimeouts(number) {
        console.log("Override");
    }

    addImageTargets(pageId, numberOfTargets) {
        console.log("Override");
    }

    addTextTargets(pageId, numberOfTargets) {
        console.log("Override");
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

    getShowElements() {
        return [];
    }

    getHideElements() {
        return [];
    }

    getClickTarget() {
        return "string";
    }


}