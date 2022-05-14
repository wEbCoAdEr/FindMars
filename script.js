$(document).ready(function () {

    let images = $('.holeImage');
    let startBtnElement = $('#startBtn');
    let startStatus = false;
    let clickReady = false;
    let chanceValueElement = $('.chanceValue');
    let scoreValueElement = $('.scoreValue');
    let clickedImgObject;
    let scoreValue;
    let gameOverModal = $('#gameOverModal');

    let gamePlayAudio = new Audio('audio/game-play.mp3');
    gamePlayAudio.loop = true;
    let scoreAudio = new Audio('audio/score.mp3');
    let showMarsAudio = new Audio('audio/show-mars.mp3');
    let gameOverAudio = new Audio('audio/game-over.mp3');

    function showMars() {
        clickReady = false;

        let randomHoleNumber = Math.floor(Math.random() * 9);
        showMarsAudio.play();
        $(images[randomHoleNumber]).attr('src', 'images/hole-with-mars.png');

        updateScore();

        setTimeout(function () {
            //Replace Mars with only hole
            $(images[randomHoleNumber]).attr('src', 'images/hole.png');
            clickReady = true;
        }, 800);

        console.log(randomHoleNumber);
    }

    function updateScore() {
        let selectedImgElement = $(clickedImgObject);
        if (selectedImgElement.attr('src') === 'images/hole-with-mars.png') {
            scoreAudio.play();
            scoreValue = Number(scoreValueElement.text());
            scoreValue += 1;
            scoreValueElement.text(scoreValue);
        }
    }

    function executeGameOver() {
        gamePlayAudio.pause();
        gamePlayAudio.currentTime = 0;
        gameOverAudio.play();
        $('.modalScoreValue').text(scoreValue);
        gameOverModal.modal('show');
        startStatus = false;
        scoreValueElement.text(0);
        chanceValueElement.text(20);
        //reset button
        startBtnElement.show();
    }

    function decreaseChance() {
        let chanceValue = Number(chanceValueElement.text());
        chanceValue -= 1;
        chanceValueElement.text(chanceValue);
        if (chanceValue === 0) {
            executeGameOver();
        }
    }

    function startGame() {
        gamePlayAudio.play();
        startBtnElement.hide();
        startStatus = true;
        clickReady = true;
    }

    images.click(function () {
        if (startStatus && clickReady) {
            clickedImgObject = this;
            showMars();
            decreaseChance();
        }
    });

    startBtnElement.click(function () {
        startGame();
    });

    $('.replayBtn').click(function () {
        startGame();
        gameOverModal.modal('hide');
    });

});