function getBaseSwapTrainingConditions() {
    if (withBlog) {
        return [
            { "url": "static/html/blog.html", "page": "blog", "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2 },
            { "url": "static/html/news.html", "page": "news", "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2 },
            { "url": "static/html/agency.html", "page": "agency", "firstpaint": 2500, "ttimages": 5000, "tttext": 7500, "plt": 10000, "pageTarget": 1 }
        ];
    } else {
        return [
            { "url": "static/html/news.html", "page": "news", "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2 },
            { "url": "static/html/agency.html", "page": "agency", "firstpaint": 2500, "ttimages": 5000, "tttext": 7500, "plt": 10000, "page1Target": 1 }
        ];
    }
}

function getBaseSwapTestConditions() {
    let combinations = getCombinations([shortWaitingTime, longWaitingTime], 4);
    //Switch images and text 
    let conditions = [];
    for (var i in combinations) {
        let firstpaint = combinations[i][0];
        let tttext = combinations[i][2];
        let ttimages = combinations[i][1];
        let plt = combinations[i][3];
        conditions.push({ "url": "static/html/news.html", "page": "news", "firstpaint": firstpaint, "tttext": tttext, "ttimages": ttimages, "plt": plt });
        conditions.push({ "url": "static/html/agency.html", "page": "agency", "firstpaint": firstpaint, "tttext": tttext, "ttimages": ttimages, "plt": plt });
        if (withBlog) {
            conditions.push({ "url": "static/html/blog.html", "page": "blog", "firstpaint": firstpaint, "tttext": tttext, "ttimages": ttimages, "plt": plt });
        }
    }
    return conditions;
}