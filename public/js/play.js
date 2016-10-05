/**
 * Created by chaofan on 2016/10/4.
 */
$(function() {
    var $buttons = $('.buttons');
    var FOUTHBARRIER = new Audio('../../public/audio/fourthbarrier.mp3');
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

    var Readygo = new Audio('../../public/audio/ready_go.mp3');

    var mock = {
        "code": 0,
        "data": {
            "id": "1",
            "content": [
                [
                    {
                        "name": "tupan",
                        "begin": 0,
                        "begin_time": 0
                    }
                ],
                [
                    {
                        "name": "tupan",
                        "begin": 0,
                        "begin_time": 3440
                    },
                    {
                        "name": "mule",
                        "begin": 5,
                        "begin_time": 5160
                    }
                ],
                [
                    {
                        "name": "tupan",
                        "begin": 0,
                        "begin_time": 6880
                    },
                    {
                        "name": "tam",
                        "begin": 0,
                        "begin_time": 6880
                    },
                    {
                        "name": "cymbal",
                        "begin": 0,
                        "begin_time": 6880
                    },
                    {
                        "name": "sidedrum",
                        "begin": 0,
                        "begin_time": 6880
                    }
                ]
            ],
            "length": "10320",
            "temps": 3,
            "temps_time": "3440"
        }
    };

    var game = {
        init: function(level, type) {
            this.$el = $('.game-scene');
            this.comp = {
                $readyText: $('.ready-text'),
                $ktvStart: $('.ktv-start'),
                $container: $('.rhythm-container')
            };
            this.level = level || 1;
            this.type = type || 'exec';
            this.startTime = 0;
            this.data = mock.data;
            this.result = 0;
            this._createScene();
            this.showCountDown();
        },
        _bindEvent: function() {
            var self = this;
            $('.hit-area').on('click', '.grammar', function() {
                var $this = $(this);
                var g = $this.attr('class').split(' ')[1].replace(/g-/, '');
                var n = (Date.now() - self.startTime) / ~~self.data.temps_time;
                n = Math.floor(n);
                var selector = '.' + n + '-' + g;
                if ($(selector).length > 0) { // 计算分数
                    $(selector).removeClass();
                    self.result += 10;
                }
                Grammar[g].play();
            });
        },
        _unbindEvent: function() {
            $('.hit-area').unbind('click');
        },
        _createScene: function() {
            var content = this.data.content;
            var tempTime = ~~this.data.temps_time;
            var i, j, len;
            this.comp.$container.width(134 * this.data.temps);
            this.comp.$container.css('left', '134px');
            for(i = 0, len = content.length; i < len; i++) {
                var t = content[i];
                for (j = 0; j < t.length; j++) {
                    var span = $('<span />');
                    span.addClass(i + '-' + t[j].name).css('left', t[j].begin_time / tempTime * 134);
                    $('.' + t[j].name + '-row').append(span);
                }
            }
        },
        showCountDown: function() {
            var self = this;
            var $ktvStart = self.comp.$ktvStart;
            var $k1 = $ktvStart.find('.k1');
            var $k2 = $ktvStart.find('.k2');
            var $k3 = $ktvStart.find('.k3');

            $buttons.hide();
            $ktvStart.show();

            $k1.addClass('show');
            setTimeout(function() {
                $k2.addClass('show');
                setTimeout(function() {
                    $k3.addClass('show');
                    Readygo.play();
                    setTimeout(function() {
                        $ktvStart.hide();
                        $ktvStart.find('span').removeClass('show');
                        self.start();
                    }, 1200);
                }, 1000);
            }, 1000);
        },
        start: function() {
            var self = this;
            var $content = this.$el.find('.rhythm-container');
            this._bindEvent();
            this.startTime = Date.now();
            if (this.level == 4) {
                FOUTHBARRIER.play();
            }
            if (this.level == 5) {
                FIFTHBARRIER.play();
            }
            $content.show().animate(
                { left: -134 * self.data.temps },
                ~~self.data.length,
                'linear',
                function() {
                    self.end();
                });
        },
        end: function() {
            $buttons.show();
            this._unbindEvent();
            if (this.type === 'brk') {
                this.showResult();
            }
        },
        showResult: function() {
            $('.mask').show();
            if (this.result > 20) {
                $('.result').removeClass('fail').addClass('success').show();
                SUCCESSSOUND.play();
            } else {
                $('.result').removeClass('success').addClass('fail').show();
                FAILSOUND.play();
            }

        }
    };
    window.Game = game;
});