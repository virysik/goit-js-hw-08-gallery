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
    }
    ).join('');
}

const refs = {
    gallery: document.querySelector(".js-gallery"),
    imgGallery: document.querySelector(".gallery__image"),
    modal: document.querySelector(".js-lightbox"),
    imgLBox: document.querySelector(".lightbox__image"),
    closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
    lBoxOverlay: document.querySelector(".lightbox__overlay"),
}


const galleryEl = createMarkUp(galleryObj);
refs.gallery.insertAdjacentHTML( 'afterbegin', galleryEl);
refs.gallery.addEventListener('click', onClick);

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
    window.addEventListener('keydown', (e) => {
        if (e.code === "ArrowRight") {
          
        }
         if (e.code === "ArrowLeft") {
          
        }
})
}
//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
function closeModalWindow() {
    refs.closeBtn.addEventListener('click', onModalCloseBtn);

    // Закрытие модального окна по клику на div.lightbox__overlay
    refs.lBoxOverlay.addEventListener('click', onModalCloseBtn);

    // Закрытие модального окна по нажатию клавиши ESC
    window.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            onModalCloseBtn();
        }
    });
}

function onModalCloseBtn() {
    refs.modal.classList.remove("is-open");
    
    //Очистка значения атрибута src элемента img.lightbox__image.
    refs.imgLBox.src = "";
    refs.imgLBox.alt = "";
}
