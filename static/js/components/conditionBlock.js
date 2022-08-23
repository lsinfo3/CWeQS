function ConditionBlock(conditions, tickAmount) {
    this.conditions = conditions;

    this.evaluate = function() {
        return {
            type: 'survey-multi-choice',
            questions: [{
                prompt: "<b>How did you experience the loading of the last page?</b><p>'Bad' refers to the worst experience, 'Excellent' refers to the best experience.</p>",
                options: ["Excellent", "Good", "Fair", "Poor", "Bad"],
                required: true,
                horizontal: false
            }]
        }
    };

    this.generateTestCondition = function(obj) {
        return {
            type: "external-html",
            data: obj,
            timeline: [{ url: obj["url"] }, this.evaluate()],
            cont_btn: "btnRatingGoOn",
            on_finish: function() {
                jsPsych.setProgressBar(jsPsych.getProgressBarCompleted() + tickAmount);
            }
        };
    }

    this.getTimelineObject = function() {
        generatedConditions = [];
        for (var condition of this.conditions) {
            generatedConditions.push(this.generateTestCondition(condition));
        }
        return {
            type: "external-html",
            timeline: generatedConditions,
            cont_btn: "endTrial",
            force_refresh: true,
            executeScript: true,
            on_finish: function(data) {
                data.configuration = JSON.stringify(configuration);
            }
        }
    }
}
