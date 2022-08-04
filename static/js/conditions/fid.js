function getFIDTrainingConditions() {
    let plt1 = 2000;
    let plt2 = 10000;
    if (withBlog) {
        return [
            // { "url": "static/html/blog.html", "page": "blog", "fid": 100, "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2, },
            { "url": "static/html/news.html", "page": "news", "fid": 1000, "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2 },
            // { "url": "static/html/agency.html", "page": "agency", "fid": 3000, "firstpaint": 2500, "ttimages": 5000, "tttext": 7500, "plt": 10000, "pageTarget": 1 }
        ];
    } else {
        return [
            { "url": "static/html/news.html", "page": "news", "fid": 100, "firstpaint": plt1 / 4, "ttimages": plt1 / 2, "tttext": tttext1, "plt": 2000, "pageTarget": 2 },
            { "url": "static/html/agency.html", "page": "agency", "fid": 2000, "firstpaint": plt2 / 4, "ttimages": plt2 / 2, "tttext": tttext2, "plt": 10000, "pageTarget": 1 }
        ];
    }
}

function getFIDTestConditions() {
    let FID = [100, 300, 500, 1000, 2000];

    let PLT = [2000, 5000, 10000];
    let conditions = [];
    for (var p in PLT) {
        for (var i in FID) { //FID[i]                                                                                                
            conditions.push({ "url": "static/html/news.html", "page": "news", "fid": FID[i], "firstpaint": PLT[p] / 4, "tttext": PLT[p] / 2, "ttimages": PLT[p] / 4 * 3, "plt": PLT[p] });
            conditions.push({ "url": "static/html/agency.html", "page": "agency", "fid": FID[i], "firstpaint": PLT[p] / 4, "tttext": PLT[p] / 2, "ttimages": PLT[p] / 4 * 3, "plt": PLT[p] });
            if (withBlog) {
                conditions.push({ "url": "static/html/blog.html", "page": "blog", "fid": FID[i], "firstpaint": shortWaitingTime, "tttext": 2 * shortWaitingTime, "ttimages": 3 * shortWaitingTime, "plt": PLT[p] });
            }
        }
    }
    return conditions;
}