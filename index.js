//Создание и рендер разметки по массиву данных и предоставленному шаблону.
import galleryObj from "./gallery-items.js";

const createMarkUp = (obj) => {
    return obj.map(({ preview, original, description }) => {
        return`<li class="gallery__item">
        <a
          class="gallery__link"
          href=${original}
        >
          <img
            class="gallery__image"
            src=${preview}
            data-source=${original}
            alt=${description}
          />
        </a>
      </li>
      `;
    }).join('');
}

const refs = {
    gallery: document.querySelector(".js-gallery"),
    modal: document.querySelector(".js-lightbox"),
    imgLBox: document.querySelector(".lightbox__image"),
    closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
    lBoxOverlay: document.querySelector(".lightbox__overlay"),
}

const galleryEl = createMarkUp(galleryObj);
refs.gallery.insertAdjacentHTML( 'afterbegin', galleryEl);
refs.gallery.addEventListener('click', onClick);

const imgSrcs = galleryObj.map(e => e.original);
const imgAlts = galleryObj.map(e => e.description);

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
function onClick(e) {
    e.preventDefault();
    const imgSource = e.target.dataset.source;
    
    if (!imgSource) {
        return;
    }
    openModalWindow(e.target);
    closeModalWindow();
}

//Открытие модального окна по клику на элементе галереи.
function openModalWindow(trg) {
    refs.modal.classList.add("is-open");
    
  //Подмена значения атрибута src элемента img.lightbox__image. 
    refs.imgLBox.src = trg.dataset.source;
    refs.imgLBox.alt = trg.alt;

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
    window.addEventListener('keydown', onArrowClick);
}

function onArrowClick(e) {
        let currentSrcIndex = imgSrcs.indexOf(refs.imgLBox.src);
        let lastSrcIndex = imgSrcs.indexOf(imgSrcs[imgSrcs.length - 1]);
        let currentAltIndex = imgAlts.indexOf(refs.imgLBox.alt);
        let lastAltIndex = imgAlts.indexOf(imgAlts[imgAlts.length - 1]);
        
        if (e.code === "ArrowRight") {
            currentSrcIndex = currentSrcIndex !== lastSrcIndex ? currentSrcIndex + 1 : 0;
            currentAltIndex = currentAltIndex !== lastAltIndex ? currentAltIndex + 1 : 0;
        } else if (e.code === "ArrowLeft") {
            currentSrcIndex = currentSrcIndex !== 0 ? currentSrcIndex - 1 : lastSrcIndex;
            currentAltIndex = currentAltIndex !== 0 ? currentAltIndex - 1 : lastAltIndex;
        }
    
    setAttributes(currentSrcIndex, currentAltIndex); 
}

function setAttributes(src, alt) {
      refs.imgLBox.src = imgSrcs[src];
        refs.imgLBox.alt = imgAlts[alt];
}

//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
function closeModalWindow() {
    refs.closeBtn.addEventListener('click', onModalCloseClick);

    // Закрытие модального окна по клику на div.lightbox__overlay
    refs.lBoxOverlay.addEventListener('click', onModalCloseClick);

    // Закрытие модального окна по нажатию клавиши ESC
    window.addEventListener('keydown', onEscClick);
}

function onEscClick(e) {
    if (e.code !== "Escape") {
        return;
    }
    onModalCloseClick();
}

function onModalCloseClick() {
    refs.modal.classList.remove("is-open");
    window.removeEventListener('keydown', onArrowClick);
    window.removeEventListener('keydown', onEscClick);
    refs.closeBtn.removeEventListener('click', onModalCloseClick);
    refs.lBoxOverlay.removeEventListener('click', onModalCloseClick);
   
    //Очистка значения атрибута src элемента img.lightbox__image.
    refs.imgLBox.src = "";
    refs.imgLBox.alt = "";
}



