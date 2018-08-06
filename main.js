$(document).ready(initializeApp);

var gotCorrect = 0;
var gotWrong = 0;
var triedNum = 0;
var accuracy = 0;
var gameWinLoseCount = 0;
var soundOn = false;
var matchPlayed = 0;
var playAdder = true;

var first_clickedCard = null;
var second_clickedCard = null;

function initializeApp(){
    $('.cardBack').mouseover(gameActivityObject.hoverMusic);
    clickHandler();
    $('.modal-btn').click(nextLevel);
    $('.reset').click(reset);
    $('.mute').click(soundOnOff);
}

function soundOnOff(){
    soundOn = !soundOn;
    if(soundOn){
        $('.mute > img').attr('src', './images/extra/speater.svg');
        gameActivityObject.themeMusic();
    } else {
        $('.mute > img').attr('src', './images/extra/speakerMute.png');
        gameActivityObject.themeMusic();
    }
}

function reset(){
    var gotCorrect = 0;
    var gotWrong = 0;
    var triedNum = 0;
    var accuracy = 0;
    var gameWinLoseCount = 0;
    playAdder = true;

    var first_clickedCard = null;
    var second_clickedCard = null;
    $('.correct').text(gotCorrect).css('font-size', '40px').css('color', 'green');
    $('.wrong').text(gotWrong).css('font-size', '40px').css('color', 'red');
    $('.accuracy').text(accuracy).css('font-size', '40px').css('color', 'blue');
    $('.cardBack').show();

}

function clickHandler(){
    $('.cardBack').click(function(){
        if(playAdder){
            matchPlayed++;
            $('.playedNum').text(matchPlayed);
        }
        playAdder = false;
        if(first_clickedCard === null){
            first_clickedCard = $(this);
            $(this).hide();
        } else {
            second_clickedCard = $(this);
            $(this).hide();
            var isSame = checkForSimilarity();
            if(isSame){
                first_clickedCard.hide();
                second_clickedCard.hide();
                first_clickedCard = null;
                second_clickedCard = null;
            } else {
                first_clickedCard.show(1000);
                second_clickedCard.show(1000);
                first_clickedCard = null;
                second_clickedCard = null;
            }
        }
    });
}

function checkForSimilarity(){
    if(first_clickedCard.parent('.card').find('.cardFront img').attr('src') === second_clickedCard.parent('.card').find('.cardFront img').attr('src')){
        gameActivityObject.matchMusic();
        // var newDiv = $('<div>').addClass('infoUnhide');
        // $('.infoSection').append(newDiv);
        gotCorrect++;
        triedNum = gotCorrect + gotWrong;
        $('.correct').text(gotCorrect).css('font-size', '40px').css('color', 'green');
        calAccuracy();
        gameWinLoseCount++;
        if(gameWinLoseCount === 9){
            playAdder = true;
            gameActivityObject.winMusic();
            $('.card').attr('id', 'gamePlayAnimation');
            var animationEnd = document.getElementById('gamePlayAnimation');
            // animationEnd.addEventListener("webkitAnimationEnd", myfunction);
            animationEnd.addEventListener("animationend", afterAnimation);
            function afterAnimation(){
                $('.gamePlay > *').css('display', 'none');
                $('.modal').show();
            }

        }
        return true;
    } else {
        gameActivityObject.notMatchMusic();
        gotWrong++;
        triedNum = gotCorrect + gotWrong;
        $('.wrong').text(gotWrong).css('font-size', '40px').css('color', 'red');
        calAccuracy();
        return false;
    }
    // console.log(first_clickedCard.parent('.card').find('.cardFront img').attr('src'));
}

function calAccuracy(){
    accuracy = ((gotCorrect/triedNum) * 100).toFixed(2) + '%';

    $('.accuracy').text(accuracy).css('font-size', '40px').css('color', 'blue');
}
var gameActivityObject = {
    soundsTheme: new Audio('./sounds/harryPTheme.mp3'),
    themeMusic: function(){
        if(soundOn){
            this.soundsTheme.play();
            this.soundsTheme.loop = true;
        } else {
            debugger;
            this.soundsTheme.pause();
        }
    },
    hoverMusic: function(){
        if(soundOn){
            var sounds = new Audio('./sounds/hoverClick.mp3');
            sounds.play();
        }
    },
    notMatchMusic: function(){
        if(soundOn){
            var sounds = new Audio('./sounds/noMatch.mp3');
            sounds.play();
        }

    },
    matchMusic: function(){
        if(soundOn){
            var sounds = new Audio('./sounds/match.mp3');
            sounds.play();
        }

    },
    winMusic: function(){
        if(soundOn){
            var sounds = new Audio('./sounds/win.mp3');
            sounds.play();
        }

    }
}