$(document).ready(function() {

  function Game() {
    this.rightAnsMsg = ['Awesome!', 'Good Job!', 'Nice!', 'Sweet'];
    this.wrongAnsMsg = ['Wrong!', 'Oh Oh!', 'Uh.. Noooo..'];
    this.playerWinMsg = 'Wins!';
    this.playerDraws = 'Its a Draw!';
    this.player1 = 'Player 1';
    this.player2 = 'Player 2';
    this.player1Score = 0;
    this.player2Score = 0;
    this.timer = 30;
    this.countdownTimerId = 0;
    this.popUpTimerId = 0;
    this.popDownTimerId = 0;
    this.$clickStart = $('#start-btn');
    this.$clickRestart = $('#restart-btn');
    this.$remarks = $('#remarks');
    this.$popImageBox = $('#box1');
    this.timerDisplay = $('#countdown-timer');
    this.image = ['images/angry-bird.png', 'images/poison-pig.png'];
    this.randomImg = 0;
    this.randomPopInterval = 0;
  }

  Game.prototype = {
    constructor: Game,

    setUpGame: function() {
      // this one adds an event listener to the click start button -> when it is clicked, it initialise game
      this.$clickStart.click(this.initGame.bind(this));

      // adding keypress event listener to all answers -> when key is pressed, it updates score
      // this.$keyPress.keypress($.proxy(this.whenKeyDown, this));
      $(document).keypress(this.whenKeyDown.bind(this));

      // adding click event liand it calls the restart function
      this.$clickRestart.click(this.restart.bind(this));
    },

    initGame: function() {
      //hide Start button
      this.$clickStart.hide();
      //play music
      this.playGameMusic();
      this.setTimerInterval();
      this.setPopUpInterval();
      this.isGameOver();
    },

    playGameMusic: function() {
      var happyfeet = new Audio('audio/happy-feet.mp3');
      happyfeet.play();
    },

    //insert images
    popImageUp: function() {
      this.randomImg = Math.floor(Math.random() * 2);
      this.$popImageBox.attr('src', this.image[this.randomImg]);
    },

    popImageDown: function() {
      this.$popImageBox.attr('src', ' ');
    },

    //setcountdown Interval 1 second
    setTimerInterval: function() {
      this.countdownTimerId = window.setInterval(this.countDownTimer.bind(this), 1000);
    },

    //countdown by 1 second
    countDownTimer: function() {
      console.log(this.timer);
      if (this.timer !== -1) {
      this.timer--;
      this.setMsg(this.timerDisplay, 'Countdown \: ' + this.timer);
    }
    },

    //set image popping up Interval
    setPopUpInterval: function() {
      this.randomPopInterval = Math.floor(Math.random() * 500) + 500;

      this.popUpTimerId = window.setInterval(this.popImageUp.bind(this), this.randomPopInterval);
      this.setPopDownInterval();
    },

    setPopDownInterval: function() {
      this.randomPopInterval = Math.floor(Math.random() * 1500) + 1000;

      this.popDownTimerId = window.setInterval(this.popImageDown.bind(this), this.randomPopInterval);
    },

    whenKeyDown: function(event) {

      // boingMusic.play();
      if (this.isGameOver()) {
        // this.whoWon();
      } else {
        // switch (event.which)
        console.log(event);
        console.log(event.which);




      }
    },
    //set Message to timer and message Box
    setMsg: function(destination, message) {
      destination.text(message);
    },

    // check winner
    whoWon: function() {
      // if (this.player1Score > this.player2Score) {
      //   this.updateRemarks(this.player1 + ' ' + this.playerWinMsg);
      //
      //
      // } else if (this.player1Score < this.player2Score) {
      //   this.updateRemarks(this.player2 + ' ' + this.playerWinMsg);
      // } else {
      //   this.setMsg(this.$remarks, "It\'s a Draw Lah!");
      //
      // }

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

    //restarts the game
    restart: function() {
      this.clearIntervalOfId(this.countdownTimerId);
      this.timer = 30;
      this.$clickStart.show();
      this.setMsg(this.timerDisplay, 'Countdown \: ' + this.timer);

    }
  };


  var angryBird = new Game();

  angryBird.setUpGame();

  // document ready ends here
});
