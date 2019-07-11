$(function () {

    // Number of seconds in every time division
    var days = 24 * 60 * 60,
        hours = 60 * 60,
        minutes = 60,
        newYear = true, ini_ts = function (sec) {
            var ts = new Date(2012, 0, 1)
            if ((new Date()) > ts) {
                // The new year is here! Count towards something else.
                // Notice the *1000 at the end - time must be in milliseconds
                ts = (new Date()).getTime() + sec * 1000; //10 * 24 * 60 * 60 * 1000;
                newYear = false;
            };
            return ts;
        }
    , fncountdown = function (el, prop) {

        var options = {
            callback: function () { },
            timestamp: 0,
            isPause: false
        };
        for (i in prop) {
            if (prop.hasOwnProperty(i)) {
                options[i] = prop[i];
            };
        };


        var left, d, h, m, s, positions;

        // Initialize the plugin
        init(el, options);

        positions = el.querySelectorAll('.position');

        var start = function () {

            // Time left
            left = Math.floor((options.timestamp - (new Date())) / 1000);

            if (left < 0) {
                left = 0;
                options.callback(d, h, m, s, 'end');
                return;
            }

            // Number of days left
            d = Math.floor(left / days);
            updateDuo(0, 1, d);
            left -= d * days;

            // Number of hours left
            h = Math.floor(left / hours);
            updateDuo(2, 3, h);
            left -= h * hours;

            // Number of minutes left
            m = Math.floor(left / minutes);
            updateDuo(4, 5, m);
            left -= m * minutes;

            // Number of seconds left
            s = left;
            updateDuo(6, 7, s);

            // Calling an optional user supplied callback
            options.callback(d, h, m, s, 'tick');

            // Scheduling another call of this function in 1s
            if (!options.isPause) {
                setTimeout(start, 1000);
            }
        }

        // This function updates two digit positions at once
        updateDuo = function (minor, major, value) {
            switchDigit(parent.$(positions[minor]), Math.floor(value / 10) % 10);
            switchDigit(parent.$(positions[major]), value % 10);
        }
        var pause = function () {
            options.isPause = true;
        }
        var reset = function (timestamp) {
            options.timestamp = timestamp;
            options.isPause = false;
            start();
        }
        var resume = function () {
            options.timestamp = (new Date()).getTime() + (left + 1) * 1000;
            options.isPause = false;
            start();
        }
        return {
            start: start,
            pause: pause,
            reset: reset,
            resume: resume,
        }
    };
    function init(elem, options) {
        elem.classList.add("countdownHolder");

        // Creating the markup inside the container
        var html = '';
        ['Days', 'Hours', 'Minutes', 'Seconds'].map(function (word, i, arr) {
            html += '<span class="count' + word + '">';
            html += '<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>';
            html += '</span>';

            if (word != "Seconds") {
                html += '<span class="countDiv countDiv' + i + '"></span>';
            }
        });
        elem.innerHTML = html;
    }

    // Creates an animated transition between the two numbers
    function switchDigit(position, number) {
        var digit = position.find('.digit');
        if (digit.is(':animated')) {
            return false;
        }

        if (position.data('digit') == number) {
            // We are already showing this number
            return false;
        }

        position.data('digit', number);

        var replacement = parent.$('<span>', {
            'class': 'digit',
            css: {
                top: '-2.1em',
                opacity: 0
            },
            html: number
        });

        // The .static class is added when the animation
        // completes. This makes it run smoother.

        digit
            .before(replacement)
            .removeClass('static')
            .animate({ top: '2.5em', opacity: 0 }, 'fast', function () {
                try {
                    digit.remove();
                } catch (err) { };
            })

        replacement
            .delay(100)
            .animate({ top: 0, opacity: 1 }, 'fast', function () {
                try {
                    replacement.addClass('static');
                } catch (err) { };
            });
    }

    var shuffleArray = function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }, thoigian = function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        stargameTime = date + ' ' + time;
    };

    var stargameTime = '', selected1 = undefined, orderapi = 'http://localhost:10996/phucky'// "http://phucky.dnd.vn",// ;
    selected2 = undefined, api = 'http://192.168.1.91:2432/api'// "http://brickapi.dnd.vn/api",// ;
    clickCount = 0, list = [],
    cardsLeft = 0,
    gameCompleted = false,
    $app__hud = $('.app__hud'), $status = $('.app__hud__game-status'),
    $app = $('.app__cards-container'), $tmp = $app.children().first();
    $tmp.detach();
    //
    var iconAnimals = ['🐵', '🐶', '🐺', '🐱', '🐯', '🐴', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐨', '🐼', '🐔', '🐤', '🐦', '🐧', '🐸'];
    var iconFruits = ['🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍏', '🍑', '🍒', '🍓'];

    var icons = iconAnimals;

    var resizeTimeout, adjustsize = function () {
        if (!gameCompleted) {
            var _W = window.innerWidth, _H = window.innerHeight;
            if (_W > _H) {
                _W -= $app__hud.width();
            } else {
                _H -= $app__hud.height();
            }
            var spinW = Math.min(_W, _H);
            $('.app__cards-container').css({ width: spinW + 'px' });
            var cardW = parseInt(spinW / 4) - 20;
            $('.app__cards-container__card').css({ width: cardW + 'px', height: cardW + 'px' });
        } else {
            $('.app__cards-container').removeAttr('style');
        };
    }, finishgame = function () {
        $status.html('Số lần: ' + clickCount + ', Món: ' + cardsLeft + '');
        if (list.length === 0) {
            // We have finished the game
            gameCompleted = true;
            dosvr(JSON.stringify({ "act": "findthesameimg_rst", "ncc": "phucky", 'args': [clickCount, stargameTime, $app__hud.data('gamekey')] }), function (kq, rst) {
                if (kq == 'ok') {
                    if (rst.kq == 'OK') {
                        //
                        $('.rst').css('display', 'block');
                        $app__hud.css('display', 'none');
                        //
                        $app__hud.data('gamekey', rst.kmkey);
                        var $pre = $('.rst .pre'), $button = $('.rst .button');
                        $pre.html(rst.gamekey.rst + '<div style="position:absolute;right:10px;top:5px"><div id="countdown" class="countdownHolder"></div></div>');
                        $button.html(rst.gamekey.giamgia + '<div class="giamgia"></div><div class="giamgia"></div><div class="giamgia"></div>')
                            .click(function (e) {
                                triggertoOrder({ pricekm: rst.kmkey });
                            });

                        var fuckCDT = fncountdown(document.getElementById('countdown'), {
                            timestamp: ini_ts(60),
                            callback: function (days, hours, minutes, seconds, act) {
                                if (act == 'end') {
                                    $pre.html('');
                                    $button.html('').unbind('click');
                                    startNewGame();
                                }
                            }
                        });
                        fuckCDT.start();
                    } else {
                        var msg = $(rst.gamekey);
                        $('.app').prepend(msg);
                        var cover = $('.cover');
                        $('.buttonx.OK').click(function (e) {
                            cover.slideUp(350, function (e) {
                                cover.remove();
                                startNewGame();
                            });
                        });
                        cover.slideDown(350);
                    }
                } else {
                    //se trigger thang vao web dat hang ..
                    triggertoOrder({});
                };
            });
        }
    }
    function triggertoOrder(p) {
        $.redirect(orderapi, p, "POST");
        //window.location.replace(orderapi + p);
    }
    $(window).resize(function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            adjustsize();
        }, 500);
    });

    function startNewGame() {
        thoigian();
        gameCompleted = false;
        shuffleArray(icons); // randomize displayed icons
        $('.rst').css('display', 'none');
        $app__hud.css('display', '');
        //
        list = [], cardCount = 16;
        for (var i = 1; i <= cardCount; i++) {
            var type = i % (cardCount / 2) + 1;
            list.push({
                id: i,
                type: type,
                icon: icons[type - 1],
                theme: 'theme' + type,
                isKnown: false,
                flipped: false
            });
        }

        shuffleArray(list); // randomize card on the board
        $.each(list, function (i, card) {
            var the = $tmp.clone();
            the.attr('id', 'card-' + card.id);
            $(the.children()[0]).removeClass('khoitao').addClass('front');//.html(card.isKnown ? "" : "?");
            $(the.children()[1]).find('span').addClass(card.theme).css({ display: 'none', 'background-image': 'url("https://caicangcua.github.io/pk8/imgs/' + card.icon + '.png")' });
            //
            $app.append(the);
            the.click(function () {

                if (card.flipped) return; // dont allow to flip already flipped cards

                clickCount++;

                // Update state
                card.flipped = true;
                selected2 = selected1;
                selected1 = card;

                var that = $(this);
                that.find('span').css({ display: 'inherit' });

                // Update UI
                that.flip(true); // use flip api

                if (selected1 && selected2 && selected1.type === selected2.type) {
                    // We found a match

                    $("#card-" + selected1.id).fadeOut('5000', function () { $(this).remove(); });
                    $("#card-" + selected2.id).fadeOut('5000', function () {
                        $(this).remove();
                        if (gameCompleted) {
                            adjustsize();
                        };
                    });

                    list.splice(list.indexOf(selected1), 1);
                    list.splice(list.indexOf(selected2), 1);

                    selected1 = selected2 = null;

                    cardsLeft = list.length;

                    finishgame();
                    return;
                }
                $status.html('Số lần: ' + clickCount + ', Món: ' + cardsLeft + '');
                if (selected2) {
                    // Flip back the 2nd shown card
                    var id = selected2.id;
                    (function (id) {
                        setTimeout(function () {
                            list.forEach(function (card) {
                                if (card.id === id) {
                                    // Update state
                                    card.flipped = false;
                                    card.isKnown = true;
                                }
                            });
                            $("#card-" + id).flip(false, function () {
                                $(this).find('span').css({ display: 'none' });
                            }); // use flip api
                        }, 800);
                    })(id);
                }
            });
        });

        // Update state
        selected1 = selected2 = null;
        cardsLeft = list.length;

        var $card = $(".app__cards-container__card");
        $card.flip({
            axis: 'y',
            trigger: 'manual',
            reverse: true
        }, function (e) {
            var c = e;
        });
        adjustsize();
        //dosvr(JSON.stringify({ "act": "findthesameimg","ncc":"phucky"}), function (kq, rst) {
        //    if (kq == 'ok') {
        //        if (rst.kq == 'OK') {
        //            $app__hud.data('gamekey', rst.gamekey);
        //        } else {
        //            $app__hud.data('gamekey','-1');
        //            var msg = $(rst.gamekey);
        //            $('.app').prepend(msg);
        //            var cover = $('.cover');
        //            $('.buttonx.OK').click(function (e) {
        //                cover.slideUp(350, function (e) {
        //                    cover.remove();
        //                });
        //            });
        //            cover.slideDown(350);
        //        }
        //    } else {
        //        //se trigger thang vao web dat hang ..
        //        triggertoOrder({});
        //    };
        //});
    }

    clickCount = 0;
    cardsLeft = 0;

    setTimeout(function () {
        startNewGame();
    }, 100);

    function dosvr(args, cb) {
        $.ajax({
            retryLimit: 0,
            tryCount: 3,
            url: api + "/githubcom/",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            cache: false,
            timeout: 7000,
            data: args
            , success: function (result, textStatus, xhr) {
                cb('ok', result);
            }, error: function (xhr, textStatus, errorThrown) {
                cb('err', '');
            }
        });
    }

    $('.app__hud__btn-restart').click(function (e) {
        //if ($app__hud.data('gamekey') == '-1') {
        //    var cover = $('.cover');
        //    if (cover.length > 0) {
        //        cover.find('.scr_head').html("KẾT QUẢ");
        //        cover.find('.scr_time').html('<div style="color:black">Time : <span id="min">00</span> Min <span id="sec">00</span> Sec</div>');
        //        cover.find('.scr_moves').html('Moves : <span id="moves"></span>');
        //        cover.find('.i').html('Nhấn nút OK để bắt đầu trò chơi mới');
        //        $('.cover').slideDown(350);
        //    }
        //}


        //////////var chil = $('.app__cards-container').children();
        //////////for (var i = chil.length - 1; i > 0; i--) {
        //////////    $(chil[i]).remove();

        //////////};
        //////////list = [];
        //////////cardsLeft = 0;
        //////////adjustsize();
        //////////finishgame();

        if (args.cb) args.cb();

    });




});

