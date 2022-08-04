function createTrainingConditions(fun) {
    let conditions = fun();
    var shuffledTrainingConditions = jsPsych.randomization.repeat(conditions, 1); // no repetition
    return shuffledTrainingConditions;
}

function createTestConditions(fun, numConditions) {
    //afterwards inject them as data and use them in the respective page scripts
    var targetsBlogFactors = getTargetFactors("blog");
    var targetsNewsFactors = getTargetFactors("news");
    var targetsAgencyFactors = getTargetFactors("agency");
    //full factorial target matrix
    var targetsBlogData = jsPsych.randomization.factorial(targetsBlogFactors, 1);
    var targetsNewsData = jsPsych.randomization.factorial(targetsNewsFactors, 1);
    var targetsAgencyData = jsPsych.randomization.factorial(targetsAgencyFactors, 1);
    //shuffle all targets
    targetsBlog = jsPsych.randomization.sampleWithReplacement(targetsBlogData, numConditions);
    targetsNews = jsPsych.randomization.sampleWithReplacement(targetsNewsData, numConditions);
    targetsAgency = jsPsych.randomization.sampleWithReplacement(targetsAgencyData, numConditions);

    var totalConditions = numConditions;
    let conditions = fun();
    // separate conditions by page type
    var conditionsNews = conditions.filter(function(el) { return el.page == "news" });
    var conditionsAgency = conditions.filter(function(el) { return el.page == "agency" });
    var conditionsBlog = conditions.filter(function(el) { return el.page == "blog" });
    //shuffle all conditions
    conditionsNews = jsPsych.randomization.shuffle(conditionsNews);
    conditionsAgency = jsPsych.randomization.shuffle(conditionsAgency);
    conditionsBlog = jsPsych.randomization.shuffle(conditionsBlog);

    //add maximum number of conditions to test condition block
    let testConditions = [];
    let index = 0;
    while (testConditions.length < numConditions) {
        testConditions.push(conditionsNews[index]);
        testConditions.push(conditionsAgency[index]);
        testConditions.push(conditionsBlog[index]);
        index++;
    }
    //shuffle again
    testConditions = jsPsych.randomization.shuffle(testConditions);
    //slice to appropriate size
    testConditions = testConditions.slice(0, totalConditions);
    //add targets to test conditions
    let finalTestConditions = [];
    for (var i = 0; i < totalConditions; i++) {
        let tc = testConditions[i];
        let targets = 0;
        if (tc.page == "news") {
            targets = targetsNews[i];
        } else if (tc.page == "agency") {
            targets = targetsAgency[i];
        } else if (tc.page == "blog") {
            targets = targetsBlog[i];
        }
        finalTestConditions.push(Object.assign(tc, targets));
    }
    return finalTestConditions;
}