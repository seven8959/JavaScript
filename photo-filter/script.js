// API fullscreen

const btnFullscreen = document.querySelector('.fullscreen');

function toggleScreen() {
    if (document.fullscreenElement === null) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.fullscreenEnabled) {
            document.exitFullscreen();
        }
    }
}

btnFullscreen.addEventListener('click', toggleScreen);


// Change input 

const inputs = document.querySelectorAll('.filters input');
const image = document.getElementById('current-image');

function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    image.style.setProperty(`--${this.name}`, this.value + suffix);

    const outputs = this.nextElementSibling;
    outputs.innerHTML = this.value;
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));


// Toggle buttons

const btnContainer = document.querySelectorAll('.btn-container .btn');

function toggleBtns() {

    btnContainer.forEach(el => el.addEventListener('click', function () {
        const activeBtn = document.querySelectorAll('.btn-active');
        activeBtn[0].className = activeBtn[0].className.replace('btn-active', '');
        el.className += ' btn-active';
    }));
}

toggleBtns()


// Reset filters

const btnCollection = document.querySelector('.btn-container');

function resetFilters(e) {
    if (e.target.classList.contains('btn-reset')) {
        inputs.forEach(input => {
            input.name === 'saturate' ? input.value = 100 : input.value = 0;
            image.style.setProperty(`--${input.name}`, input.value + (input.dataset.sizing || ''));

            const outputs = input.nextElementSibling;
            outputs.innerHTML = input.value;
        });
    }
}

btnCollection.addEventListener('click', resetFilters);


// Next picture

const btnNext = document.querySelector('.btn-next');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];


function getImage() {
    let i = 0;

    function nextImage() {
        const index = i % images.length;
        const imageSrc = getDayTime() + images[index];
        image.src = imageSrc;
        i++;
        btnNext.disabled = true;
        setTimeout(function () {
            btnNext.disabled = false;
        }, 500);
    }

    function getDayTime() {
        const hour = new Date().getHours();

        if (hour >= 6 && hour < 12) {
            return base + 'morning/';
        } else if (hour >= 12 && hour < 18) {
            return base + 'day/';
        } else if (hour >= 18 && hour < 24) {
            return base + 'evening/';
        } else {
            return base + 'night/';
        }
    }

    btnNext.addEventListener('click', nextImage);
}
getImage();


// Load picture


const btnLoad = document.querySelector('.btn-load--input');

function loadImage() {
    btnLoad.addEventListener('change', () => {
        const file = btnLoad.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            image.src = reader.result;
        }
        reader.readAsDataURL(file);
        btnLoad.value = null;
    });
}

loadImage();


// Save picture

const btnSave = document.querySelector('.btn-save');
const canvas = document.createElement('canvas');

btnSave.addEventListener('click', () => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = image.src;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        function getFilters() {
            let filters = '';
            let imageFilters = image.style.cssText;

            for (let i = 0; i < imageFilters.length; i++) {
                if (imageFilters[i] === '-' && imageFilters[i - 1] !== 'e') {
                    continue;
                } else {
                    switch (imageFilters[i]) {
                        case ':':
                            filters = filters + '(';
                            break;
                        case ';':
                            filters = filters + ')';
                            break;
                        default:
                            filters = filters + imageFilters[i];
                            break;
                    }
                }
            }
            return filters;
        }

        ctx.filter = getFilters();
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.download = 'download.png';
        link.href = dataURL;
        link.click();
    };
})

