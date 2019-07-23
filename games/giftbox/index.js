(function () {

    // VAR
    var cw = document.querySelectorAll('.cube');
    var c = document.querySelectorAll('.cube-contain');
    var overall = document.querySelector('input[id="pickWin"]');
    var refreshButton = document.querySelector('.modal .refresh');
    var modalContainer = document.querySelector('.container-modal');
    var modalClose = document.querySelector('.modal-close');
    var containerMs = document.querySelector('.modal-tilte');
    var messageWin = function () {
        var rst = refreshButton.winP;
        if (rst.kq == 'OK') {
            refreshButton.innerHTML = 'Mời đặt cơm'; refreshButton.act = 'PLACEORDER';
            return rst["gamekey"]["rst"];//'Xin chúc mừng! Bạn được giảm giá 26% trên tổng hóa đơn';
        } else {
            refreshButton.act = 'TRYAGAIN'; refreshButton.innerHTML = 'Thử lại'
            return 'Xin chúc mừng, bạn đã chiến thắng!';
        }
    };
    var messageLose = function () { refreshButton.innerHTML = 'Thử lại'; refreshButton.act = 'TRYAGAIN'; return 'Rất tiếc, bạn đã dùng hết 03 lần lật. Bạn muốn thử lại?'; };
    var clicks = 0;
    var N = 180; // SOUND

    //http://www.knowstack.com/flexbox-responsive-layout/
    var factor = 0.5; //1. 4x4 // 1.5 3x6 // 2 2x8 // 3 2x10 // 4 1x16
    var resizeTimeout, adjustsize = function () {
        var _W = window.innerWidth, _H = window.innerHeight, row = 0, col = 0;
        var dt = parseInt(Math.sqrt(_W * _H / 16));
        var phandu = (_W % dt);
        var phannguyen = (_W - phandu) / dt;
        dt = Math.floor(_W / (phannguyen + 1));
        if (dt < 100) dt = 100;
        if (dt <= 250) {
            for (var i = 0 ; i < cw.length; i++) {
                cw[i].style.cssText = 'width:' + dt + 'px;height:' + dt + 'px';
            }
        };
    }

    window.addEventListener('resize', function (event) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            adjustsize();
        }, 500);
    });



    //http://showcase.codethislab.com/games/sweety_memory/sounds/game_over.mp3
    //http://showcase.codethislab.com/games/sweety_memory/sounds/win.mp3
    //http://showcase.codethislab.com/games/sweety_memory/sounds/right.mp3
    //http://showcase.codethislab.com/games/sweety_memory/sounds/card.mp3
    //http://showcase.codethislab.com/games/sweety_memory/
    //var soundError = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/953/151309__tcpp__beep1-resonant-error-beep.wav');
    var soundError = new Howl({
        src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/953/151309__tcpp__beep1-resonant-error-beep.wav']
    });
    var soundWin = new Howl({
        src: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/953/391539__mativve__electro-win-sound.wav']
    });
    var soundJingle = new Howl({
        src: ['http://showcase.codethislab.com/games/sweety_memory/sounds/win.mp3']//https://s3-us-west-2.amazonaws.com/s.cdpn.io/953/411420__ihaksi__deck-the-halls-christmas-jingle-played-with-bells.wav
    });

    function init() {
        addGift();
        adjustsize();
        startAnimation();
        eventInit();
    }

    function eventInit() {
        [].forEach.call(c, function (item) {
            item.addEventListener('click', function (e) {
                clicks++;

                if (clicks < 4) {
                    openGift(item);
                    document.getElementById('number').innerHTML = 3 - clicks;
                }

                if (clicks == 3 && !item.classList.contains('win')) {
                    offSelect();
                    setTimeout(function () {
                        openModal(messageLose(), false);
                    }, 800);
                }

                if (item.classList.contains('win')) {
                    offSelect();
                    setTimeout(function () {
                        soundWin.play();
                    }, 500);

                    var delay = 2, doWin = function () {
                        delay--;
                        if (delay == 0) {
                            openModal(messageWin(), true);
                        };
                    }

                    dosvr({ "act": "giftbox_rst", "ncc": "phucky", 'args': [(overall.checked) ? '1' : '0', new Date(), refreshButton.gamekey] }, function (rst) {
                        refreshButton.winP = rst;
                        doWin();
                    });
                    setTimeout(function () {
                        doWin();
                    }, 1000);
                } else {
                    setTimeout(function () {
                        soundError.play();
                    }, 500);
                }
            }, false);
        });
        overall.addEventListener('change', function () {
            if (overall.checked) {
                document.querySelector('.win').classList.add('pseudo-block');
            } else {
                document.querySelector('.win').classList.remove('pseudo-block');
            }
        }, false);
        refreshButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (refreshButton.act == 'TRYAGAIN') {
                resetTodo();
            } else if (refreshButton.act == 'PLACEORDER') {
                args.cb('DATHANG', { 'kmkey': refreshButton.winP['kmkey'] });
            };
        }, false);
        modalClose.addEventListener('click', function (e) {
            e.preventDefault();
            closeModal();
        }, false);
    }
    function startAnimation() {
        TweenMax.staggerTo(c, 1, {
            rotationX: "-=" + N,
            rotationY: "+=" + N,
            rotationZ: "+=" + N,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            force3D: true,
            ease: Back.easeOut.config(1.7),
            onComplete: function onComplete() {
                for (var i = 0; i < cw.length; i++) {
                    cw[i].classList.add('hover-cube');
                }
            }
        }, 0.1);
    }

    function addGift() {
        var rd = Math.round(Math.random() * (c.length - 1));
        var selectionGift = c[rd - 1].querySelector('.gift');
        var WINGIFT = '<div>😎</div>';
        var TGIFT = '<div>😢</div>';

        for (var i = 0; i < c.length; i++) {
            var allGift = c[i].querySelector('.gift');

            while (allGift.firstChild) {
                allGift.removeChild(allGift.firstChild);
            }
            allGift.innerHTML = TGIFT;
        }
        setTimeout(function () {
            c[rd - 1].classList.add('win');

            while (selectionGift.firstChild) {
                selectionGift.removeChild(selectionGift.firstChild);
            }
            selectionGift.innerHTML = WINGIFT;
            console.log('You are a curious boy, this is the result ' + rd);
        }, 500);
    }

    function openGift(elem) {
        var tl = new TimelineMax();
        elem.parentElement.classList.add('static-cube');
        elem.parentElement.classList.remove('hover-cube');
        elem.classList.add('no-ribbon');
        tl.to(elem.querySelector('.cube-top'), 1, {
            transformOrigin: 'right',
            rotationZ: 90,
            autoAlpha: 0,
            ease: Power2.easeOut
        });
        tl.to(elem.querySelector('.cube-right'), 0.5, {
            transformOrigin: '50% 100%',
            rotationX: -90,
            rotationY: 90,
            z: 0,
            ease: Power2.easeOut
        }, "-=0.3");
        tl.to(elem.querySelector('.cube-front'), 0.5, {
            transformOrigin: '100% 100%',
            rotationX: -90,
            ease: Power2.easeOut
        }, "-=0.3");
        tl.to(elem.querySelector('.cube-back'), 0.5, {
            transformOrigin: '100% 100%',
            rotationX: 90,
            ease: Power2.easeOut
        }, "-=0.3");
        tl.to(elem.querySelector('.cube-left'), 0.5, {
            transformOrigin: '50% 100%',
            rotationX: 90,
            rotationY: 90,
            z: 0,
            ease: Power2.easeOut
        }, "-=0.3");
        tl.timeScale(2);
    }

    function offSelect() {
        for (var i = 0; i < c.length; i++) {
            c[i].classList.add('off');
            c[i].parentElement.style.cursor = 'not-allowed';
        }
        [].forEach.call(c, function (item) {
            item.removeEventListener('click', function (e) {
                e.preventDefault();
            }, false);
        });
    }

    function resetTodo() {
        closeModal();
        clicks = 0;
        document.getElementById('number').innerHTML = 3;

        for (var i = 0; i < c.length; i++) {
            c[i].classList.remove('off');
            c[i].classList.remove('win');
            c[i].parentElement.style.cursor = 'pointer';
            c[i].parentElement.classList.remove('static-cube');
            c[i].classList.remove('no-ribbon');
            c[i].parentElement.classList.add('hover-cube');
            TweenMax.set(c[i].querySelector('.cube-top'), {
                clearProps: 'all'
            });
            TweenMax.set(c[i].querySelector('.cube-right'), {
                clearProps: 'all'
            });
            TweenMax.set(c[i].querySelector('.cube-front'), {
                clearProps: 'all'
            });
            TweenMax.set(c[i].querySelector('.cube-back'), {
                clearProps: 'all'
            });
            TweenMax.set(c[i].querySelector('.cube-left'), {
                clearProps: 'all'
            });
        }
        addGift();
        startAnimation();
    }

    function openModal(ms, t) {
        while (containerMs.firstChild) {
            containerMs.removeChild(containerMs.firstChild);
        };
        containerMs.innerHTML = ms;
        var tl = new TimelineMax();
        tl.to(modalContainer, 0.5, {
            autoAlpha: 1
        }).to(modalContainer.querySelector('.modal'), 0.5, {
            y: 0 + '%'
        });

        if (t === true) {
            soundJingle.play();
        }
    }

    function closeModal() {
        containerMs.innerHTML = '';
        overall.checked = false;
        document.querySelector('.win').classList.remove('pseudo-block');
        var tl = new TimelineMax();
        tl.to(modalContainer.querySelector('.modal'), 0.5, {
            y: 100 + '%'
        }).to(modalContainer, 0.5, {
            autoAlpha: 0, onComplete: function () {
                var score = modalContainer.querySelector('.score');
                if (score) {
                    score.parentNode.removeChild(score);
                    modalContainer.querySelector('#tryagain').style.display = '';
                };
            }
        });
    }

    function dosvr(args, cb) {
        var xhr = new XMLHttpRequest();
        var url = "http://192.168.1.91:2432/api/githubcom/";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        var data = JSON.stringify(args);
        xhr.send(data);

        // 4. This will be called after the response is received
        xhr.onload = function () {
            if (xhr.status != 200) { // analyze HTTP status of the response
                cb({ 'kq': 'NG', 'status': xhr.status, 'statusTex': xhr.statusText });// e.g. 404: Not Found
            } else { // show the result
                var json = JSON.parse(xhr.responseText);
                cb(json);
            }
        };
        xhr.onerror = function (err) {
            cb({ 'kq': 'ERR' });
        };
    }

    var notKM = function (cb) {
        dosvr({ "act": "findthesameimg", "ncc": "phucky" }, function (rst) {
            if (!rst || !rst.kq || rst.kq != 'OK') {
                var n$EL = document.createElement("div");
                if (rst.gamekey) {
                    n$EL.innerHTML = rst.gamekey;//rst.kq='ERR' chua xu ly duoc ve no ko co gamekey
                } else {
                    n$EL.innerHTML = "<div class='cover'><div class='score'><p class='scr_head'>THÔNG BÁO</p><p class='scr_time'>Khung giờ hiện tại không có áp dụng khuyến mãi Giảm giá!</p><p class='scr_moves'></p><p class='i'>Nhấn OK để tiếp tục trò chơi</p><div class='buttonx OK'>OK</div></div></div>"
                };
                modalContainer.querySelector('.container-modal .modal').appendChild(n$EL.querySelector('.score'));
                modalContainer.querySelector('#tryagain').style.display = 'none';
                openModal(messageLose(), false);
                modalContainer.querySelector('.buttonx.OK').addEventListener('click', function (e) {
                    e.preventDefault();
                    closeModal();
                }, false);
            } else {
                refreshButton.gamekey = rst.gamekey;
            };
            if (cb) cb();
        });
    }
    notKM(function () {
        init();
    });
    //
})();