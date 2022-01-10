var instructions = {
    type: 'html-button-response',
    stimulus: 'Hier sind ein paar Erl&auml;uterungen zum Experiment.<br>' +
              'Eigentlich steht hier nur v&ouml;llig unn&ouml;tiger Text. Sie k&ouml;nnen ihn ruhig ignorieren. Ich schreibe ' + 
              'nur noch ein paar S&auml;tze, damit der Bildschirm voller aussieht.<br>' +
              'Mit "weiter" beginnt das Experiment.',
    choices: ['weiter'],
    margin_vertical: '100px' // vertical margin of the button
};

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<span style="font-size:60px">+</span>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000
};

var show_picture = {  
    type: 'image-button-response',
    stimulus: jsPsych.timelineVariable(['image']), // Take the element "image" from the timeline variable
    choices: ['s&uuml;&szlig;', 'meh'],
    stimulus_height: 400
};

var feedback = {
  type: 'html-keyboard-response',
  stimulus: function() {
    var previous_choice = jsPsych.data.getLastTrialData().values()[0].button_pressed;
    if (previous_choice == 0) {
      var feedback = 'Du mochtest dieses Alpaka.';
    } else {
      var feedback = 'Du mochtest dieses Alpaka <b>nicht.</b>';
    }
    return(feedback);
  },
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000
};

var end_screen = {
  type: 'html-button-response',
  stimulus: 'Uuuuuuund fertig!',
  choices: ['Yeah, done!'],
  margin_vertical: '100px'
};

// GET IMAGES
var pictures = []; // initialise empty array
var nTrials = 3; // number of trials
var imgPath = "./images/img"

var picture_array = []; // for preloading

for (let i = 0; i < nTrials ; i ++) { // loop through picture numbers
    pictures.push({ image : `${imgPath}${i}.jpg` }); // push to timeline variable array
    picture_array.push(`${imgPath}${i}.jpg`);
}

// BUILD TIMELINE
var timeline = [];

// Procedure for the main experiment.
var main_procedure = {
  timeline: [fixation, show_picture, feedback],
  timeline_variables: pictures // use timeline variable here
};

// Put together the whole timeline:
timeline.push(instructions, main_procedure, end_screen);

// START EXPERIMENT
jsPsych.init({
  timeline: timeline,
  preload_images: picture_array,
  on_finish: function() {
      jsPsych.data.displayData();
  }
});
