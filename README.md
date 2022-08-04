Documentation for the JSPsych web browsing simulation framework.

Each website is defined with at least the attributes firstpaint, tttext (time to text), ttimage (time to image), and plt (page load time). Elements are loaded according to these parameters. There are additional parameters like lcp, fid, cls, etc. which are only relevant for specific sub studies.

## Setup
A web server (e.g., Apache or Nginx) and PHP are required. 
Framework is started by addressing the game.html in the browser, e.g.: localhost/folder/game.html.

<p>If the experiment fails to load on startup, <b>disable any ad blocker</b>.</p>

<p>
If check components are active, additional GET parameters are required:
localhost/folder/game.html?worker=a&campaign=a&randkey=a 
</p>

## Framework Components
- **game.js**: The JSPsych timeline, i.e., the list of components, is defined here. Additionally, all configuration parameters for the study like the number of stimuli, the available participant spots, the secret key, and others are set here by reading from **config.js**. 
- **game.html**: All relevant HTML, CSS, and JS files have to be included here. Calls the game.js script.
- **config.js**: Simple JS file which loads a config object specifying all framework related parameters.
- **static/css**: All CSS files are listed here.
- **static/html**: All HTML files are listed here.
- **static/img**: All images which are later preloaded by JSPsych can be found here.
- **static/php**:
    - **config.php**: States where the log files should be saved. Required!
    - **number*.php**: Utility PHP scripts which check how many participants are currently using the framework and how many participants already finished the task.
    - **write*.php**: Utility PHP scripts which dump the collected data in JSON and CSV files.
- **static/js**:
    - **external**: External JS scripts. Should not be modified.
    - **plugins**: JSPsych plugins. Should not be modified.
    - **components**: All components which are later displayed to the participants are defined here.
    - **conditions**: All study types and parameters for the corresponding studies are set here.
    - **websites**: All websites and their relevant HTML elements are defined here. The corresponding HTML files are under /static/html.
    - **randomNumber.js**: A utility script which generates random numbers.
    - **targets.js**: Depending on the validation task, images are exchanged with the target image or the target link. Required for reasonable validation. Note: The blog page does not provide image validation so far.
    - **prepareConditions.js**: Shuffles and selects the stimuli from all stimuli of a condition.
    - **waterfall.js**: Main class for simulating the web browsing behavior. The passed parameters from the game.js and the individual stimuli of prepareConditions.js are used here to allow page navigation, timer starting, capturing user clicks, hiding and showing web page elements. Most changes have to be done here.

## Components
All components are completely decoupled and can be inserted independetly into the JSPsych timeline object. This is achieved by using the constructor of the component and calling the `getTimelineObject` method afterwards. The following components are implemented:
- **questionnaire**: Questionnaire components with various demographic questions.
- **checkBrowserSize.js**: Checks whether the size of the browser window is large enough. Blocks the study if it is not.
- **checkCredentials.js**: Checks whether the participant passed credentials in the form of GET parameters. Blocks the study if credentials are missing.
- **checkScreenSize.js**: Checks whether the screen of the participant is suitable for the study. Blocks the study if the screen is too small.
- **checkWorkers.js**: Checks whether there are still free spots for additional study participants. Blocks the study if the `survSpots` are full.
- **instructionsOne.js**: First page of instructions in the beginning.
- **instructionsTwo.js**: Second page of instructions in the beginning.
- **beforeTest.js**: The instructions before starting the test phase.
- **postTest.js**: Contains a text field where a user can submit feedback.
- **debrief.js**: The last page displaying the verification code.
- **conditionBlock.js**: Contains an instance of a websites simulating the browsing under the passed conditions. Additionally, the rating block is also defined directly here.

## Conditions
The condition objects describe which kind of study is performed and in which way the stimuli are conditioned. These arrays of stimuli are then further processed by prepareConditions.js, where the stimuli are shuffled and the required number of stimuli is extracted.

Currently, there are the following conditions implemented:
- **base.js**: The basic scenario, where only firstpaint, tttext, ttimage and plt are relevant.
- **baseSwap.js**: The basic scenario, where only firstpaint, tttext, ttimage and plt are relevant, but tttext and ttimage are swapped.
- **cls.js**: Cumulative Layout Shift of Google Web Vitals.
- **fid.js**: First Input Delay of Google Web Vitals.
- **lcp.js**: Largest Contentful Paint of Google Web Vitals.
- **combinations.js**: This is a utility script for a factorial design of all possible combinations using a various number of different waiting times.

## Websites
Each website class is based on the corresponding HTML file. This class is responsible for providing the HTML elements which are supposed to be manipulated during the web browsing simulation. Here, the specified condition parameters are passed to the websites, the targets are initialized, and the timeouts are started.
The following websites are implemented:
- **interface.js**: An interface which provides an overview on the structure of a new website class
- **news.js**: A sports news page.
- **agency.js**: A shopping page.
- **blog.js**: A simple blog page with one large image and much text.
- **preload.js**: Provides functions to preload image elements.


