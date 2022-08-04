var spareRandom = null;

function getRandomInt() {
    return Math.floor(Math.random() * 3.99);
}

function normalRandom() {
    var val, u, v, s, mul;

    if (spareRandom !== null) {
        val = spareRandom;
        spareRandom = null;
    } else {
        do {
            u = Math.random() * 2 - 1;
            v = Math.random() * 2 - 1;

            s = u * u + v * v;
        } while (s === 0 || s >= 1);

        mul = Math.sqrt(-2 * Math.log(s) / s);

        val = u * mul;
        spareRandom = v * mul;
    }

    return val / 14; // 7 standard deviations on either side
}

function normalRandomInRange(min, max) {
    var val;
    do {
        val = normalRandom();
    } while (val < min || val > max);
    return val;
}

function promiseGenerator({ id, timeout }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (jsPsych.data.getURLVariable('debug') === 'true') {
                $('.debug').html(id + ' visible after ' + timeout + 'ms.');
            };
            if (id === '.test') {
                $(id).css({ 'display': 'block' });
            } else {
                $(id).css({ 'visibility': 'visible' });
            };
            resolve();
        }, timeout);
    })
}

function promiseGeneratorDisplay({ id, timeout }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (jsPsych.data.getURLVariable('debug') === 'true') {
                $('.debug').html(id + ' visible after ' + timeout + 'ms.');
            };
            $(id).css({ 'display': 'block' });
            resolve();
        }, timeout);
    })
}

function estBetaParams(mu, sigma) {
    // console.log("b_mu = "+mu+", b_sigma = "+sigma);
    variance = Math.pow(sigma, 2);
    alpha = ((1 - mu) / variance - 1 / mu) * Math.pow(mu, 2);
    beta = alpha * (1 / mu - 1);
    return {
        a: alpha,
        b: beta
    };
}

function betaRandomInRange(min, max) {
    var betaparams = estBetaParams(0.9, 0.1);
    var random_num = jStat.beta.sample(betaparams.a, betaparams.b);
    // console.log("random_number -> "+random_num);
    var out = min + random_num * (max - min);
    // console.log("out -> "+Math.round(out)+" (min: "+min+", max: "+max+")");
    return Math.round(out);
}