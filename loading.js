(function () {
    function whichTransitionEvent() {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    _xxug0b('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css', 'css', function () {
        _xxug0b('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/js/swiper.min.js', 'js', function () {
            var thumbs = document.querySelector('.gallery-thumbs'),
                rawI = thumbs.getAttribute('data-imgs').split(',');
            n$EL = document.createElement("div");
            n$EL.innerHTML = '<div class="wrapper" style="right:10px"><a href="javascript:void(0)" id="placeorder" class="fancy-button bg-gradient1"><span style="padding:16px 20px;white-space:nowrap;font-size: larger;">MỜI ĐẶT CƠM</span></a></div>';
            thumbs.parentNode.insertBefore(n$EL.childNodes[0], thumbs.previousElementSibling);
            //
            var testLoad = '';
            for (var i = 0; i < rawI.length; i++) {
                testLoad += '<div data-src="' + rawI[i] + '" class="swiper-slide"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>';
            };
            thumbs.innerHTML = '<div class="swiper-wrapper">' + testLoad + '</div>';
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 5,
                preloadImages: false,
                lazyLoading: true,
                loop: false,
                freeMode: false,
                loopedSlides: 5, //looped slides should be the same
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            }), galleryTop = new Swiper('.gallery-top', {
                spaceBetween: 10,
                loop: false,
                preloadImages: false,
                lazyLoading: true,
                loopedSlides: 5, //looped slides should be the same
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: galleryThumbs,
                },
            }), fadeEnd = function () {

            };
            n$EL.innerHTML = '<div class="kmribbon noselect"><div class="starburst3"><span><span><span><span><span><span><span><span></span></span></span></span></span></span></span></span></div><span class="dis">GIÁ<div style="font-size: 30px">25.000đ</div>FREE SHIP</span></div>';
            thumbs.parentNode.appendChild(n$EL.childNodes[0]);
            //
            n$EL.innerHTML = '<div class="wrapper" style="right:10px;top:unset;bottom:0px">' +
                                    '<ul id="gameitem" style="display:none" class="my-nav my-nav--list">' +
                                        '<div id="wrapper-templates">' +
                                            '<li class="my-nav__item"><a id="openbox" class="my-nav__link my-nav__link--template">Mở hộp tìm quà</a> </li>' +
                                            '<li class="my-nav__item"><a id="find02img" class="my-nav__link my-nav__link--template">Lật hình tìm 02 món ăn giống nhau</a> </li>' +
                                        '</div>' +
                                    '</ul>' +
                                    '<a href="javascript:void(0)" id="gamemenu" class="fancy-button bg-gradient2"><span>GAME</span></a>' +
                                '</div>';
            thumbs.parentNode.appendChild(n$EL.childNodes[0]);
            //
            //ld.addEventListener('animationend', fadeEnd);
            //ld.classList.add('fadeOut');

            var gamemenu = document.getElementById('gamemenu'), gameitem = document.getElementById('gameitem');
            document.addEventListener("click", function () {
                gameitem.style.display = 'none';
            });
            gamemenu.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var ht = gameitem.style.display;
                gameitem.style.display = (ht == '') ? 'none' : '';
            });

            var back, transTO,
                transname = whichTransitionEvent()
                , evtEnd = function () {
                    clearTimeout(transTO);
                    //
                    var that = this;
                    transTO = setTimeout(function () {
                        back.removeEventListener(transname, evtEnd);
                        if (that == '0') {
                            var iframe = back.appendChild(document.createElement('iframe'));
                            iframe.style.cssText = "border:none;background: linear-gradient(to left,dodgerblue,#345)";
                            iframe.scrolling = "no";
                            iframe.onload = function () {
                                setTimeout(function () {
                                    iframe.contentWindow.trochoi({
                                        cb: function () {
                                            //back.previousElementSibling.style.display = '';
                                            back.addEventListener(transname, evtEnd.bind('1'));
                                            document.querySelector('#flip-toggle').classList.toggle('hoverx');
                                        }
                                    });
                                }, 100);
                            };
                            iframe.src = '../games/find02imgs/index.html';
                            //back.previousElementSibling.style.display = 'none';
                        } else {
                            back.innerHTML = '';
                        }
                    }, 300);
                }
            gameitem.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.target.id == 'find02img') {
                    back.addEventListener(transname, evtEnd.bind('0'));
                    document.querySelector('#flip-toggle').classList.toggle('hoverx');
                    gameitem.style.display = 'none';
                } else if (e.target.id == 'openbox') {
                    dosvr(null, function (json) {
                        e.target.innerHTML = json;
                    });
                }
            });
            //
            n$EL.innerHTML = '<div class="back iframe-wrapper"></div>'; back = n$EL.childNodes[0];
            var frnt = thumbs.parentNode;
            frnt.parentNode.appendChild(back);
            frnt.classList.add('woodbg');
            setTimeout(function () {
                document.body.style.background = "#222";
                var bgImage = new Image();
                var imgs = thumbs.querySelectorAll('.swiper-slide');
                for (var i = 0; i < imgs.length; i++) {
                    (function (atthumb, index) {
                        var downloadingImage = new Image(), dummy = '?v=' + (new Date()).getTime();
                        if (index == 0) dummy = '';
                        downloadingImage.onload = function () {
                            atthumb.innerHTML = '';
                            atthumb.style.background = 'url(' + this.src + ')';
                            if (index > 0) {
                                galleryTop.appendSlide(['<div class="swiper-slide" style="background-image:url(' + this.src + dummy + ')"></div>']);
                            };
                        };
                        downloadingImage.src = atthumb.getAttribute('data-src') + dummy;
                    })(imgs[i], i);
                }
            }, 1000);
            //
        });
    });

    function dosvr(args, cb) {
        //var xhr = new XMLHttpRequest();
        //var url = "http://localhost:2432/api/githubcom/";
        //xhr.open("POST", url, true);
        //xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        //xhr.onreadystatechange = function () {
        //    if (xhr.readyState === 4 && xhr.status === 200) {
        //        var json = JSON.parse(xhr.responseText);
        //        console.log(json.email + ", " + json.password);
        //    }
        //};
        //var data = JSON.stringify({ "act": "findthesameimg", "ncc": "phucky" });
        //xhr.send(data);

        var xhr = new XMLHttpRequest();
        var url = "http://caunoi.dnd.vn/jdata/sp.json";//"url?data=" + encodeURIComponent(JSON.stringify({ "email": "hey@mail.com", "password": "101010" }));
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                cb(xhr.responseText);
            }
        };
        xhr.send();
    }

})();

