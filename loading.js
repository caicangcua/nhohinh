function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
}
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
    function redirect(url, method) {
        var form = document.createElement('form');
        form.method = method;
        form.action = url;
        //
        var input = document.createElement('input');
        input.type = "hidden";
        input.name = "pricekm";
        input.value = JSON.stringify({ 'ncc': 'phucky', 'id': encodeURIComponent(window.location.href) });
        //
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    };

    _xxug0b('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css', 'css', function () {
        _xxug0b('https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/js/swiper.min.js', 'js', function () {
            var thumbs = document.querySelector('.gallery-thumbs'),
                rawI = thumbs.getAttribute('data-imgs').split(',');
            n$EL = document.createElement("div");
            n$EL.innerHTML = '<div id="btnDatHang" class="wrapper" style="right:10px"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>';//
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
            var version = detectIE(), gamelist = '';
            gamelist += '<div class="wrapper" style="right:10px;top:unset;bottom:0px">' +
                        '<ul id="gameitem" style="display:none" class="my-nav my-nav--list">' +
                            '<div id="wrapper-templates">';
            if (version === false || version >= 12) {
                gamelist += '<li class="my-nav__item"><a id="giftbox" class="my-nav__link my-nav__link--template">Mở hộp tìm quà</a> </li>';
            };
            gamelist += '<li class="my-nav__item"><a id="find02imgs" class="my-nav__link my-nav__link--template">Lật hình tìm 02 món ăn giống nhau</a> </li>' +
                                        '</div>' +
                                    '</ul>' +
                                    '<a href="javascript:void(0)" id="gamemenu" class="fancy-button bg-gradient2"><span>GAME</span></a>' +
                                '</div>';
            n$EL.innerHTML = gamelist;
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
                    var that = this.split('|');
                    transTO = setTimeout(function () {
                        back.removeEventListener(transname, evtEnd);
                        if (that[0] == '0') {
                            var iframe = back.appendChild(document.createElement('iframe'));
                            iframe.style.cssText = "border:none;background: linear-gradient(to left,dodgerblue,#345)";
                            iframe.scrolling = "no";
                            iframe.onload = function () {
                                setTimeout(function () {
                                    iframe.contentWindow.trochoi({
                                        cb: function () {
                                            back.addEventListener(transname, evtEnd.bind('1'));
                                            document.querySelector('#flip-toggle').classList.toggle('hoverx');
                                        }
                                    });
                                }, 100);
                            };
                            iframe.src = '../games/' + that[1] + '/index.html?v=' + (new Date()).getTime();
                        } else {
                            back.innerHTML = '';
                        }
                    }, 300);
                }
            gameitem.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.target.id == 'find02imgs') {
                    back.addEventListener(transname, evtEnd.bind('0|find02imgs'));
                    document.querySelector('#flip-toggle').classList.toggle('hoverx');
                    gameitem.style.display = 'none';
                } else if (e.target.id == 'giftbox') {
                    back.addEventListener(transname, evtEnd.bind('0|giftbox'));
                    document.querySelector('#flip-toggle').classList.toggle('hoverx');
                    gameitem.style.display = 'none';
                    //dosvr(null, function (json) {
                    //    e.target.innerHTML = json;
                    //});
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
                var imgs = thumbs.querySelectorAll('.swiper-slide'), loadcount = 0;
                for (var i = 0; i < imgs.length; i++) {
                    (function (atthumb, index) {
                        var downloadingImage = new Image(), dummy = '?v=' + (new Date()).getTime();
                        if (index == 0) dummy = '';
                        downloadingImage.onload = function () {
                            atthumb.innerHTML = '';
                            atthumb.style.background = 'url(' + this.src + ')';
                            loadcount += 1;
                            if (loadcount == imgs.length) {
                                for (var i = 1; i < imgs.length; i++) {
                                    galleryTop.appendSlide(['<div class="swiper-slide" style="background-image:url(' + imgs[i].getAttribute('data-src') + '?v=' + (new Date()).getTime() + ')"></div>']);
                                }
                            }
                        };
                        downloadingImage.src = atthumb.getAttribute('data-src') + dummy;
                    })(imgs[i], i);
                }
            }, 1000);
            //
            if (lcDB && lcDB.hasOwnProperty('gio')) {
                var atD = new Date();
                var fh = new Date(); fh.setHours(0); fh.setMinutes(0); fh.setSeconds(0);
                var th = new Date(); th.setHours(0); th.setMinutes(0); th.setSeconds(0);
                var t = lcDB['gio'][atD.getDay()], tu = t[0].split(':'), den = t[1].split(':');
                fh = fh.setMinutes(60 * parseInt(tu[0]) + parseInt(tu[1])); fh = new Date(fh);
                th = th.setMinutes(60 * parseInt(den[0]) + parseInt(den[1])); th = new Date(th);
                var btnDatHang = document.getElementById('btnDatHang'),dathangClick=function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    redirect('http://phucky.dnd.vn', 'post');// http://localhost:10996/phucky;
                }, trackhwnd, dotrack = function () {
                    clearTimeout(trackhwnd); btnDatHang.removeEventListener('click',dathangClick );
                    comsvr({}, function (data) {
                        if (fh <= atD && atD <= th) {
                            btnDatHang.classList.remove('nghiban');
                            if (!btnDatHang.querySelector('#placeorder')) {
                                btnDatHang.innerHTML = '<a href="javascript:void(0)" id="placeorder" class="fancy-button bg-gradient1"><span style="padding:8px 12px;white-space:nowrap;font-size: larger;">MỜI ĐẶT CƠM</span></a>';
                                btnDatHang.addEventListener('click', dathangClick);
                            };
                        } else {
                            btnDatHang.innerHTML = '';
                            btnDatHang.classList.add('nghiban');
                        };
                        trackhwnd = setTimeout(function () { dotrack(); console.log('dotrack()'); }, 30000);
                    });
                };
                dotrack();
            }
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
        var url = "http://caunoi.dnd.vn/jdata/sp.json";//http://localhost:3165 "url?data=" + encodeURIComponent(JSON.stringify({ "email": "hey@mail.com", "password": "101010" }));
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

    function comsvr(args, cb) {
        var xhr = new XMLHttpRequest(),url = "http://caunoi.dnd.vn/jdata/sp.json";//http://localhost:3165 "url?data=" + encodeURIComponent(JSON.stringify({ "email": "hey@mail.com", "password": "101010" }));
        xhr.open('GET', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

        // 4. This will be called after the response is received
        xhr.onload = function () {
            if (xhr.status != 200) { // analyze HTTP status of the response
                cb({ 'kq': 'ng', 'status': xhr.status, 'statusTex': xhr.statusText });// e.g. 404: Not Found
            } else { // show the result
                var json = JSON.parse(xhr.responseText);
                json['kq'] = 'ok';
                cb(json);
            }
        };
        xhr.onerror = function () {
            cb({'kq':'err'});
        };
    }

})();

