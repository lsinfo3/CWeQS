'use strict';

const experimentStart = Date.parse(new Date());
const survSpots = config.survSpots; // max Nr of participants
const allowedWindowWidth = config.allowedWindowHeight;
const allowedWindowHeight = config.allowedWindowHeight;
const numTestConditions = config.numTestConditions;
const target = config.target; //'text', 'pic', 'both', 'none'
const withBlog = config.withBlog;
const shortWaitingTime = config.shortWaitingTime;
const longWaitingTime = config.longWaitingTime;
var windowLog = "";
const urlvar = jsPsych.data.urlVariables();
const verification = 'mw-' + sha256(urlvar.campaign + urlvar.worker + urlvar.randkey + config.secretKey);

let trainConditionFun = undefined;
let testConditionFun = undefined;
if (config.study == "BASE") {
    trainConditionFun = getBaseTrainingConditions;
    testConditionFun = getBaseTestConditions;
} else if (config.study == "BASE_SWAP") {
    trainConditionFun = getBaseSwapTrainingConditions;
    testConditionFun = getBaseSwapTestConditions;
} else if (config.study == "LCP") {
    trainConditionFun = getLCPTrainingConditions;
    testConditionFun = getLCPTestConditions;
} else if (config.study == "FID") {
    trainConditionFun = getFIDTrainingConditions;
    testConditionFun = getFIDTestConditions;
} else if (config.study == "CLS") {
    trainConditionFun = getCLSTrainingConditions;
    testConditionFun = getCLSTestConditions;
}

var trainingConditions = createTrainingConditions(trainConditionFun);
var testConditions = createTestConditions(testConditionFun, numTestConditions);
console.log(testConditions);

// Determine progress bar step size
const numberOfInstructions = 4; //HTML instructions
const tickAmount = 1 / (numberOfInstructions + 2 * trainingConditions.length + 2 * testConditions.length); //x2 to accomodate for ratings

// Add components
var startNoCredentials = new CredentialsCheck(urlvar, experimentStart).getTimelineObject();
var startTooManyWorkers = new WorkersCheck(survSpots).getTimelineObject();
var startFalseScreenSize = new ScreenSizeCheck(allowedWindowWidth, allowedWindowHeight).getTimelineObject();
var startFalseBrowserSize = new BrowserSizeCheck(allowedWindowWidth, allowedWindowHeight).getTimelineObject();
var instructionsTrainingOne = new InstructionsTrainingOne(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject();
var instructionsTrainingTwo = new InstructionsTrainingTwo(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject();
var instructionsSurvey = new InstructionsSurvey(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject();
var questionnaire = [
    new QuestionGender(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject(),
    new QuestionAge(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject(),
    new QuestionOrigin(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject(),
    new QuestionEducation(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject(),
    new QuestionProfession(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject(),
    new QuestionBrowsing(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject()
];
var trainingBlock = new ConditionBlock(trainingConditions, tickAmount).getTimelineObject();
var beforeTestStarts = new BeforeTest(testConditions.length, allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject();
var testBlock = new ConditionBlock(testConditions, tickAmount).getTimelineObject();
var postTestSurvey = new PostTest(allowedWindowWidth, allowedWindowHeight, windowLog, tickAmount).getTimelineObject();
var debriefBlock = new Debrief(urlvar, verification, allowedWindowHeight, allowedWindowHeight, windowLog, tickAmount).getTimelineObject();


//Timeline order
var timeline = [];
timeline.push(startNoCredentials);
timeline.push(startTooManyWorkers);
timeline.push(startFalseScreenSize);
timeline.push(startFalseBrowserSize);
timeline.push(instructionsSurvey);
for (let i in questionnaire) {
    timeline.push(questionnaire[i]);
}
timeline.push(instructionsTrainingOne);
timeline.push(instructionsTrainingTwo);
timeline.push(trainingBlock);
timeline.push(beforeTestStarts);
timeline.push(testBlock);
timeline.push(postTestSurvey);
timeline.push(debriefBlock);


//This function starts the test, with the timeline, preloaded images.
jsPsych.init({
    timeline: timeline,
    preload_images: getPreloadedImages(), // preload all images in the test as defined at top
    show_progress_bar: true,
    auto_update_progress_bar: false
});