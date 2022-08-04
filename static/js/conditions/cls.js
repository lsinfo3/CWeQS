function getCLSTrainingConditions() {
    if (withBlog) {
        return [
            { "url": "static/html/blog.html", "page": "blog", "clstime": 500, "clsdist": 200, "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2 },
            { "url": "static/html/news.html", "page": "news", "clstime": 500, "clsdist": 100, "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2 },
            { "url": "static/html/agency.html", "page": "agency", "clstime": 5000, "clsdist": 50, "firstpaint": 2500, "ttimages": 5000, "tttext": 7500, "plt": 10000, "pageTarget": 1 }
        ];
    } else {
        return [
            //news will have no shift, agency will have a big shift
            { "url": "static/html/news.html", "page": "news", "clstime": 1000, "clsdist": 0, "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2, },
            { "url": "static/html/agency.html", "page": "agency", "clstime": 1000, "clsdist": 0.2 * window.innerHeight, "firstpaint": 2500, "ttimages": 5000, "tttext": 7500, "plt": 10000, "pageTarget": 1 }
        ];
    }
}


function getCLSTestConditions() {
    let CLS100 = [0, 0.05, 0.11, 0.22, 0.33]
    let CLS50 = [0.13, 0.21, 0.33, 0.43]

    let PLT = [2000, 5000, 10000];
    let conditions = [];
    for (var p in PLT) {
        for (var i in CLS100) {
            //clstime = plt
            conditions.push({ "url": "static/html/news.html", "page": "news", "clstime": PLT[p], "clsdist": CLS100[i] * window.innerHeight, "firstpaint": PLT[p] / 4, "tttext": PLT[p] / 2, "ttimages": PLT[p] / 4 * 3, "plt": PLT[p], "clspercentage": CLS100[i] });
            conditions.push({ "url": "static/html/agency.html", "page": "agency", "clstime": PLT[p], "clsdist": CLS100[i] * window.innerHeight, "firstpaint": PLT[p] / 4, "tttext": PLT[p] / 2, "ttimages": PLT[p] / 4 * 3, "plt": PLT[p], "clspercentage": CLS100[i] });
            if (withBlog) {
                conditions.push({ "url": "static/html/blog.html", "page": "blog", "clstime": PLT[p], "clsdist": CLS100[i] * window.innerHeight, "firstpaint": PLT[p] / 4, "tttext": PLT[p] / 2, "ttimages": PLT[p] / 4 * 3, "plt": PLT[p], "clspercentage": CLS100[i] });
            }
            for (var i in CLS50) {
                //clstime = 50%
                conditions.push({ "url": "static/html/news.html", "page": "news", "clstime": PLT[p] * 0.5, "clsdist": CLS50[i] * window.innerHeight, "firstpaint": PLT[p] / 4, "tttext": PLT[p] / 2, "ttimages": PLT[p] / 4 * 3, "plt": PLT[p], "clspercentage": CLS50[i] });
                conditions.push({ "url": "static/html/agency.html", "page": "agency", "clstime": PLT[p] * 0.5, "clsdist": CLS50[i] * window.innerHeight, "firstpaint": PLT[p] / 4, "tttext": PLT[p] / 2, "ttimages": PLT[p] / 4 * 3, "plt": PLT[p], "clspercentage": CLS50[i] });
                if (withBlog) {
                    conditions.push({ "url": "static/html/blog.html", "page": "blog", "clstime": PLT[p] * 0.5, "clsdist": CLS50[i] * window.innerHeight, "firstpaint": PLT[p] / 4, "tttext": PLT[p] / 2, "ttimages": PLT[p] / 4 * 3, "plt": PLT[p], "clspercentage": CLS50[i] });
                }
            }
        }
        return conditions;
    }
}