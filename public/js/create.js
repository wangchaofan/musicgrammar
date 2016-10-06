/**
 * Created by chaofan on 2016/10/6.
 */
$(function() {
    var FIFTHBARRIER = new Audio('../../public/audio/fifthbarrier.mp3');
    var SUCCESSSOUND = new Audio('../../public/audio/success.mp3');
    var FAILSOUND = new Audio('../../public/audio/fail.mp3');
    var Grammar = {
        sidedrum: new Audio('../../public/audio/Tabour.wav'),
        tam: new Audio('../../public/audio/bigbong.wav'),
        mule: new Audio('../../public/audio/maluo.wav'),
        cymbal: new Audio('../../public/audio/dabo.wav'),
        tupan: new Audio('../../public/audio/tanggu.wav')
    };

    var result = [];

    FIFTHBARRIER.addEventListener('ended', function() {
        end();
    });

    function start() {
        $('.hit-area').on('click', '.grammar', function() {
            var $this = $(this);
            var g = $this.attr('class').split(' ')[1].replace(/g-/, '');
            Grammar[g].play();
            result.push(g);
        });
        FIFTHBARRIER.play();
    }

    function end() {
        $('.hit-area').unbind('click');
        console.log(result);
    }
    start();
});