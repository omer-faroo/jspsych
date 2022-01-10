function getPresentedName(file_path){
    const end_position = file_path.indexOf('.png');
    return file_path.substr(0, end_position);
  }
    
  const trial = {
      type: "html-keyboard-response",
      stimulus: function(){
        return `<table><tr>
          <td><img src="${jsPsych.timelineVariable('image1', true)}"></td>
          <td><img src="${jsPsych.timelineVariable('image2', true)}"></td>
          <td><img src="${jsPsych.timelineVariable('image3', true)}"></td>
          <td><img src="${jsPsych.timelineVariable('image4', true)}"></td>
          </tr>
          <tr>
          <td><h1><center>${getPresentedName(jsPsych.timelineVariable('image1', true))}</center></h1></td>
          <td><h1><center>${getPresentedName(jsPsych.timelineVariable('image2', true))}</center></h1></td>
          <td><h1><center>${getPresentedName(jsPsych.timelineVariable('image3', true))}</center></h1></td>
          <td><h1><center>${getPresentedName(jsPsych.timelineVariable('image4', true))}</center></h1></td>
          </tr></table>`},
      trial_duration: 5000,
      response_ends_trial: false,
      //data: jsPsych.timelineVariable("data"),	
  };
  
  const image_names = [
    'battery.png',
    'clip.png',
    'pen.png',
    'pin.png',
    'pliers.png',
    'postit.png',
    'scissors.png',
    'tape.png'
  ]
  
  const shuffled_image_names = jsPsych.randomization.shuffle(image_names);
  
  const multi_images = {
    timeline: [trial],
    timeline_variables: [
      {image1: shuffled_image_names[0], image2: shuffled_image_names[1], image3: shuffled_image_names[2], image4: shuffled_image_names[3]},
      {image1: shuffled_image_names[4], image2: shuffled_image_names[5], image3: shuffled_image_names[6], image4: shuffled_image_names[7]}
    ]
  }
  
  jsPsych.init({
      timeline: [multi_images],
  });