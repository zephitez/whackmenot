$(document).ready(function() {

  function Game() {
    this.rightAnsMsg = ['Awesome!', 'Good Job!', 'Nice!', 'Sweet!'];
    this.wrongAnsMsg = ['Wrong!', 'Oh Oh!', 'Uh.. Noooo..', 'No Good!', 'That\'s a POISON PIG!'];
    this.playerWinMsg = 'Wins!';
    this.playerDraws = 'Its a Draw!';
    this.player1 = 'Player 1';
    this.player2 = 'Player 2';
    this.timerDisplay = $('#countdown-timer');
    this.randomImg = 0;
    this.randomMsgNo = 0;
    this.randomPopInterval = 0;
    this.player1Score = 0;
    this.player2Score = 0;
    this.timer = 25;
    this.countdownTimerId = 0;
    this.popUpTimerId = 0;
    this.popDownTimerId = 0;
    this.image = ['images/angry-bird.png', 'images/poison-pig.png'];
    this.happyfeetAudio = new Audio('audio/happy-feet.mp3');
    this.winAudio = new Audio('audio/win.mp3');
    this.loseAudio = new Audio('audio/lose.mp3');
    this.$clickStart = $('#start-btn');
    this.$clickRestart = $('#restart-btn');
    this.$response = $('#response');
    this.$instruction = $('.instruction');
    this.$popImageBox = $('#box1');
    this.$player1 = $('#player1');
    this.$player2 = $('#player2');

  }

  Game.prototype = {
    constructor: Game,

    setUpGame: function() {
      // this one adds an event listener to the click start button -> when it is clicked, it initialise game
      this.$clickStart.click(this.initGame.bind(this));

      // adding click event listener --> it calls the restart function
      this.$clickRestart.click(this.restart.bind(this));
    },

    initGame: function() {
      //hide Start button and instructions, clear response box
      this.$clickStart.hide();
      this.$instruction.hide();
      this.setMsg(this.$response, 'Let\'s Start!');
      //play music
      this.happyfeetAudio.load();
      this.happyfeetAudio.play();
      //set Timers
      this.setTimerInterval();
      this.setPopUpInterval();
      // adding keypress event listener to all answers -> when key is pressed, it updates score
      $(document).keypress(this.updateScore.bind(this));

    },

    //insert image
    popImageUp: function() {
      this.randomImg = Math.floor(Math.random() * 2);
      this.$popImageBox.attr('src', this.image[this.randomImg]);
    },

    //remove image
    popImageDown: function() {
      this.$popImageBox.attr('src', ' ');
    },

    //setcountdown Interval 1 second
    setTimerInterval: function() {
      this.countdownTimerId = window.setInterval(this.countDownTimer.bind(this), 1000);
    },

    //countdown by 1 second
    countDownTimer: function() {
      if (this.timer !== 0) {
        this.timer--;
        this.setMsg(this.timerDisplay, 'Countdown \: ' + this.timer);
      } else {
        this.isGameOver();
      }
    },

    //set image popping up Interval
    setPopUpInterval: function() {
      this.randomPopInterval = Math.floor(Math.random() * 500) + 500;
      this.popUpTimerId = window.setInterval(this.popImageUp.bind(this), this.randomPopInterval);
      this.setPopDownInterval();
    },

    //set image popping down Interval
    setPopDownInterval: function() {
      this.randomPopInterval = Math.floor(Math.random() * 1500) + 1000;
      this.popDownTimerId = window.setInterval(this.popImageDown.bind(this), this.randomPopInterval);
    },

    //update score and display wrong or right message --> on keyboard
    updateScore: function(event) {
      if (this.isGameOver()) {
        this.whoWon();
      } else {
        //create random right and wrong answer message
        this.randomMsgNo = Math.floor(Math.random() * 4);

        //update score for player 1 and 2
        switch (event.which) {
          case 97:
            this.winningLogic('this.$player1', 'this.player1Score');
            break;

          case 108:
              this.winningLogic(this.$player2, this.player2Score);
            break;
        }
      }
    },

//determine who gets points
winningLogic: function(x, y) {
  console.log(this.player1Score);
  if (this.$popImageBox.attr('src') == this.image[0]) {
    this.winLoseAudio('win');
    this.popImageDown();
    console.log(this.player1Score);
    y += 3;
    this.setMsg(x, y);
    this.setMsg(this.$response, this.rightAnsMsg[this.randomMsgNo]);
  }// else if (this.$popImageBox.attr('src') == this.image[1]) {
  //   y -= 2;
  //   this.winLoseAudio();
  //   this.popImageDown();
  //   this.setMsg(x, y);
  //   this.setMsg(this.$response, this.wrongAnsMsg[4]);
  // } else {
  //   y--;
  //       console.log('test empty');
  //       console.log(y);
  //   this.setMsg(x, y);
  //   this.setMsg(this.$response, this.wrongAnsMsg[this.randomMsgNo]);
  // }
},


//play winlose audio
winLoseAudio: function(x) {
  if (x == 'win') {
    this.loseAudio.pause();
    this.winAudio.load();
    this.winAudio.play();
  } else {
    this.winAudio.pause();
    this.loseAudio.load();
    this.loseAudio.play();
  }
},

    // check winner
    whoWon: function() {
      if (this.player1Score > this.player2Score) {
        this.setMsg(this.$response, this.player1 + ' ' + this.playerWinMsg);
      } else if (this.player1Score < this.player2Score) {
        this.setMsg(this.$response, this.player2 + ' ' + this.playerWinMsg);
      } else {
        this.setMsg(this.$response, this.playerDraws);
      }
    },

    //check if timer is zero, then gameover --> and make images stop popping
    isGameOver: function() {
      if (this.timer === 0) {
        this.clearIntervalOfId(this.popDownTimerId);
        this.clearIntervalOfId(this.popUpTimerId);
        return true;
      }
    },

    //clears interval using timer Id
    clearIntervalOfId: function(timerId) {
      window.clearInterval(timerId);
    },

    //set Message to timer and message Box
    setMsg: function(destination, message) {
      destination.text(message);
    },

    //restarts the game
    restart: function() {
      this.clearIntervalOfId(this.countdownTimerId);
      this.timer = 25;
      this.$clickStart.show();
      this.$instruction.show();
      this.popImageDown();
      this.winAudio.load();
      this.loseAudio.load();
      this.happyfeetAudio.load();
      this.player1Score = 0;
      this.player2Score = 0;
      this.setMsg(this.$player1, this.player1Score);
      this.setMsg(this.$player2, this.player2Score);
      this.setMsg(this.$response, 'How to Play');
      this.setMsg(this.timerDisplay, 'Countdown \: ' + this.timer);
      this.clearIntervalOfId(this.popDownTimerId);
      this.clearIntervalOfId(this.popUpTimerId);
      $(document).keypress(this.updateScore.bind(this)).off();
    }
  };


  var angryBird = new Game();
  angryBird.setUpGame();

  // document ready ends here
});
