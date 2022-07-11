let round;
let dropdownText;
let astrategy;
let trigger = false;
var hrecord = [];
var arecord = [];

function handleLoad() {
  console.log('Hello from handleLoad()');
  // document object is representation of the HTML document as an object in javascript
  // This is called the DOM (Document Object Model)
  
  // button is an HTMLElement object

  tft_button = document.getElementById('tft-button');
  detective_button = document.getElementById('detective-button');
  gt_button = document.getElementById('gt-button');

  tft_button.onclick = tftMode
  detective_button.onclick = detectiveMode
  gt_button.onclick = gtMode

  gameplay = document.getElementById('gameplay')
  gamehistory = document.getElementById('gamehistory')
  tally = document.getElementById('tally')
  popup = document.getElementById('popup')

  dropdownText = document.getElementById('dropdown-text')
  dropdownMenu = document.getElementById("myDropdown")
  
  round = 1;
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownTrigger() {
  dropdownMenu.classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
  
function cooperateClick() {
  if (round == 10) {
    aiRunStrategy()
    cell = document.getElementById('hr' + round);
    cell.style.backgroundColor = 'green';
    hrecord.push(1)
    updateScores()
    analysisText()
  } else if (round < 10) {
    aiRunStrategy()
    cell = document.getElementById('hr' + round);
    cell.style.backgroundColor = 'green';
    hrecord.push(1)
    updateScores()
    round += 1;
  }
}

function defectClick() {
  if (round == 10) {
    aiRunStrategy()
    cell = document.getElementById('hr' + round);
    cell.style.backgroundColor = 'red';
    hrecord.push(0)
    updateScores()
    analysisText()
  }

  if (round < 10) {
    aiRunStrategy()
    cell = document.getElementById('hr' + round);
    cell.style.backgroundColor = 'red';
    hrecord.push(0)
    updateScores()
    trigger = true;
    round += 1;
  }
}

function aiRunStrategy() {
  if (astrategy == 'tft') {
    if (round == 1) {
      cell = document.getElementById('ar' + round);
      cell.style.backgroundColor = 'green';
      arecord.push(1)
    } else {
      past_player = hrecord[round-2];
      if (past_player == 0) {
        cell = document.getElementById('ar' + round);
        cell.style.backgroundColor = 'red';
        arecord.push(0)
      } else {
        cell = document.getElementById('ar' + round);
        cell.style.backgroundColor = 'green';
        arecord.push(1)
      }
    }
  }
  if (astrategy == 'detective') {
    testStrat = [1, 0, 1, 1]
    if (round <= 4) {
      if (testStrat[round - 1] == 1) {
        cell = document.getElementById('ar' + round);
        cell.style.backgroundColor = 'green';
        arecord.push(1)
      } else {
        cell = document.getElementById('ar' + round);
        cell.style.backgroundColor = 'red';
        arecord.push(0)
      }
    } else if (round == 5) {
      if (hrecord.includes(0)) {
        detect = false;
      } else {
        detect = true;
      }
    } 
    if (round >= 5) {
      if (detect == true) {
        cell = document.getElementById('ar' + round);
        cell.style.backgroundColor = 'red';
        arecord.push(0)
      } else {
        past_player = hrecord[round-2];
        if (past_player == 0) {
          cell = document.getElementById('ar' + round);
          cell.style.backgroundColor = 'red';
          arecord.push(0)
        } else {
          cell = document.getElementById('ar' + round);
          cell.style.backgroundColor = 'green';
          arecord.push(1)
        }
      }
    }
  }
  if (astrategy == 'gt') {
    if (trigger) {
      cell = document.getElementById('ar' + round);
      cell.style.backgroundColor = 'red';
      arecord.push(0)
    } else {
      cell = document.getElementById('ar' + round);
      cell.style.backgroundColor = 'green';
      arecord.push(1)
    }
  }
}

function updateScores() {
  last_h = hrecord[hrecord.length - 1]
  last_a = arecord[arecord.length - 1]
  if (last_h == 1) {
    if (last_a == 1) {
      hchange = 60
      achange = 60
    } else {
      hchange = -50
      achange = 145
    }
  } else {
    if (last_a == 1) {
      hchange = 145
      achange = -50
    } else {
      hchange = 10
      achange = 10
    }
  } 
  prev_hscore = hscore.textContent
  new_hscore = parseInt(prev_hscore) + hchange
  hscore.textContent = new_hscore
  prev_ascore = ascore.textContent
  new_ascore = parseInt(prev_ascore) + achange
  ascore.textContent = new_ascore
}

function tftMode() {
  dropdownText.textContent = "Tit for Tat";
  addGameplay();
  astrategy = 'tft';
}

function detectiveMode() {
  dropdownText.textContent = "Detective";
  addGameplay();
  astrategy = 'detective';
}

function gtMode() {
  dropdownText.textContent = "Grim Trigger";
  addGameplay();
  astrategy = 'gt';
}

function addGameplay() {
  gameplay.innerHTML = "<button id='cooperate-button'>Cooperate</button><button id='defect-button'>Defect</button>";
  gamehistory.innerHTML = "<table><tr><th>Round</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr><tr><th>You</th><th id='hr1'></th><th id='hr2'></th><th id='hr3'></th><th id='hr4'></th><th id='hr5'></th><th id='hr6'></th><th id='hr7'></th><th id='hr8'></th><th id='hr9'></th><th id='hr10'></th></tr><tr><th>AI</th><th id='ar1'></th><th id='ar2'></th><th id='ar3'></th><th id='ar4'></th><th id='ar5'></th><th id='ar6'></th><th id='ar7'></th><th id='ar8'></th><th id='ar9'></th><th id='ar10'></th></tr></table>";
  tally.innerHTML = "<table><tr><th>Your total score: <span id='your-score'>0</span></th><th>AI total score: <span id='ai-score'>0</span></th></tr></table>";

  hscore = document.getElementById('your-score');
  ascore = document.getElementById('ai-score');
  // paragraph an HTMLElement object

  cooperate = document.getElementById('cooperate-button');
  defect = document.getElementById('defect-button');
  
  cooperate.addEventListener('click', cooperateClick);
  defect.addEventListener('click', defectClick);
}

function analysisText() {
  popup.innerHTML = "<div id='performance'><p>Congratulations, you have finished playing against the AI!</p><p>Your final score is " + new_hscore + ", and the AI\'s final score is " + new_ascore + ". Some interesting statistics: </p><ul><li>When <a href='https://www.sciencedirect.com/science/article/abs/pii/0167268186900211'>humans play against humans</a> (Selten & Stoecker, 1986), their final score on average is 500.</li><li>When Tit for Tat plays Detective, the final score is 575.</li><li>When Tit for Tat plays Grim Trigger or Tit for Tat, the final score is 600.</li><li>When Grim Trigger plays Detective, the final score for the Detective is 165 and the final score for the Grim Trigger is 360.</li></ul></div><button onClick='window.location.reload();'' id='restart-button'>Restart</button><div id='explanation'><p>A Prisoner's Dilemma is characterised by the situation where individual decision-makers are incentivised to choose in a way that creates a less than optimal outcome for the individuals as a group. </p><p>In the situation above, you can notice that a player is <b>always better off choosing \"Defect\"</b>. If your opponent chooses \"Cooperate\", you're better off choosing \"Defect\", since your gain is +145 instead of +60. Similarly, if your opponent chooses \"Defect\", you're better off choosing \"Defect\", since you'll be gaining +10 instead of losing -50.</p><p>However, empirically, we often see humans playing against each other deviate from this \"optimal\" strategy of always playing \"Defect\". Instead, they often choose \"Cooperate\" to <b>garner the goodwill of their opponent</b>, until the last few turns where the goodwill of their opponent no longer matters.</p></div>"
}

window.addEventListener('load', handleLoad);
console.log('Hello from script.js');