var _s = 'querySelector', _sa = 'querySelectorAll';
const carouselContainer = document[_s]('.carousel-container');
const listImageArea = document[_s]('.next-list');
const lstImgs = listImageArea[_sa]('.image-of-list');
const currentImage = carouselContainer[_s]('.current-image');
const arrowLeft = document[_s]('.arrow-left');
const arrowRight = document[_s]('.arrow-right');

function styleList() {
    if (listImageArea.scrollWidth == listImageArea.offsetWidth) {
        listImageArea.style.justifyContent = 'center'
    } else {
        listImageArea.style.justifyContent = 'flex-start'
    }

};

function goToRight() {
    var current = listImageArea[_s]('.current-image-list');
    current.parentElement.nextElementSibling.children[0].classList.add('current-image-list');
    current.classList.remove('current-image-list');
    current = listImageArea[_s]('.current-image-list');
    listImageArea.scrollLeft = current.offsetLeft;
    currentImage.style.backgroundImage = current.style.backgroundImage;
    currentImage.classList.add('slideInFromRight');
    setTimeout(function () {
        currentImage.classList.remove('slideInFromRight');
    }, 500);
};

function goToLeft() {
    var current = listImageArea[_s]('.current-image-list');
    current.parentElement.previousElementSibling.children[0].classList.add('current-image-list');
    current.classList.remove('current-image-list');
    current = listImageArea[_s]('.current-image-list');
    listImageArea.scrollLeft = current.offsetLeft;
    currentImage.style.backgroundImage = current.style.backgroundImage;
    currentImage.classList.add('slideInFromLeft');
    setTimeout(function () {
        currentImage.classList.remove('slideInFromLeft');
    }, 500);
};

function changeCurrentImage(newImage) {
    currentImage.classList.add('fadeIn');
    setTimeout(function () {
        currentImage.classList.remove('fadeIn');
    }, 500);
    currentImage.style.backgroundImage = this.style.backgroundImage;
    //lstImgs.forEach(image => image.classList.remove('current-image-list'));
    lstImgs.forEach(function (image) {
        image.classList.remove('current-image-list');
    })
    this.classList.add('current-image-list');
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

arrowLeft.addEventListener('click', goToLeft);
arrowRight.addEventListener('click', goToRight);
document[_s]('.placeorder').addEventListener('click', function () {
    //redirect('http://192.168.1.91:10996/phucky', 'post');// http://phucky.dnd.vn ;
    var xhr = new XMLHttpRequest();
    var url = "url";
    xhr.open("POST", 'http://brickapi.dnd.vn/api/githubcom/', true);////http://192.168.1.91:2432/api
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
        }
    };
    var data = JSON.stringify({ "act": "findthesameimg", "ncc": "phucky" });
    xhr.send(data);
});

window.addEventListener('resize', function (e) {
    styleList();
});

(function () {
    if (typeof NodeList.prototype.forEach === "function") return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();

//lstImgs.forEach(image => image.addEventListener('click', changeCurrentImage));
lstImgs.forEach(function (image) {
    image.addEventListener('click', changeCurrentImage);
});


carouselContainer.style.display = '';
styleList();