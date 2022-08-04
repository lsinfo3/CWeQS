function getLCPTrainingConditions() {
    if (withBlog) {
        return [
            { "url": "static/html/blog.html", "page": "blog", "lcp": 1000, "lcppic": 1, "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2, },
            { "url": "static/html/news.html", "page": "news", "lcp": 1000, "lcppic": 1, "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pageTarget": 2 },
            { "url": "static/html/agency.html", "page": "agency", "lcp": 4000, "lcppic": 1, "firstpaint": 2500, "ttimages": 5000, "tttext": 7500, "plt": 10000, "pageTarget": 1 }
        ];
    } else {
        return [
            { "url": "static/html/news.html", "page": "news", "lcp": 1000, "lcppic": 1, "firstpaint": 250, "ttimages": 500, "tttext": 750, "plt": 1000, "pagTarget": 2 },
            { "url": "static/html/agency.html", "page": "agency", "lcp": 4000, "lcppic": 1, "firstpaint": 2500, "ttimages": 5000, "tttext": 7500, "plt": 10000, "pageTarget": 1 }
        ];
    }
}

function getLCPTestConditions() {
    let PLT = [2000, 5000, 10000];
    let conditions = [];
    for (var p in PLT) {
        if (PLT[p] == 2000) {
            let LCP = [1000];
            for (var i in LCP) {
                conditions.push({ "url": "static/html/news.html", "page": "news", "lcp": LCP[i], "lcppic": 3, "firstpaint": (PLT[p] / 4), "tttext": (PLT[p] / 2), "ttimages": (PLT[p] * 0.75), "plt": PLT[p] });
                conditions.push({ "url": "static/html/agency.html", "page": "agency", "lcp": LCP[i], "lcppic": 2, "firstpaint": (PLT[p] / 4), "tttext": (PLT[p] / 2), "ttimages": (PLT[p] * 0.75), "plt": PLT[p] });
            }
        } else if (PLT[p] == 5000) {
            let LCP = [1000, 1500];
            for (var i in LCP) {
                conditions.push({ "url": "static/html/news.html", "page": "news", "lcp": LCP[i], "lcppic": 2, "firstpaint": (PLT[p] / 4), "tttext": (PLT[p] / 2), "ttimages": (PLT[p] * 0.75), "plt": PLT[p] });
                conditions.push({ "url": "static/html/agency.html", "page": "agency", "lcp": LCP[i], "lcppic": 1, "firstpaint": (PLT[p] / 4), "tttext": (PLT[p] / 2), "ttimages": (PLT[p] * 0.75), "plt": PLT[p] });
            }
        } else {
            let LCP = [1500, 7500];
            for (var i in LCP) {
                conditions.push({ "url": "static/html/news.html", "page": "news", "lcp": LCP[i], "lcppic": 1, "firstpaint": (PLT[p] / 4), "tttext": (PLT[p] / 2), "ttimages": (PLT[p] * 0.75), "plt": PLT[p] });
                conditions.push({ "url": "static/html/agency.html", "page": "agency", "lcp": LCP[i], "lcppic": 3, "firstpaint": (PLT[p] / 4), "tttext": (PLT[p] / 2), "ttimages": (PLT[p] * 0.75), "plt": PLT[p] });
            }
        }

    }
    return conditions;
}