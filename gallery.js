import galleryItems from './gallery-items.js'
// console.log(galleryItems)



// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const makeGalleryItem = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${ original }"
  >
    <img
      class="gallery__image"
      src="${ preview }"
      data-source="${ original }"
      alt="${ description }"
    />
  </a>
</li>
`
}

const makeGallery = galleryItems.map(makeGalleryItem).join("")
// console.log(makeGallery)

const galleryEl = document.querySelector('.js-gallery')
galleryEl.insertAdjacentHTML('afterbegin', makeGallery)
// console.log(galleryEl)

const lightboxEl = document.querySelector('.js-lightbox')

var imgEl = document.querySelector('img.lightbox__image')
// console.log(imgSrcEl)

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
function onGalleryClick(e) {
  e.preventDefault();
  // console.log(e.target.nodeName)
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const dataSource = e.target.dataset.source;
  // console.log(dataSource)
  const imgAltEl = e.target.alt;
  // console.log(imgAltEl)

  // Открытие модального окна по клику на элементе галереи.
  addOpenClass();

  // Подмена значения атрибута src элемента img.lightbox__image
  imgEl.src = dataSource;
  // console.log(imgEl.src)
  imgEl.alt = imgAltEl;
  // console.log(imgEl.alt)
}

function addOpenClass() {
  lightboxEl.classList.add('is-open')
}

galleryEl.addEventListener('click', onGalleryClick)


// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
const closeBtnEl = document.querySelector('button[data-action="close-lightbox"]')
// console.log(closeBtnEl)

closeBtnEl.addEventListener('click', onCloseBtnClick)

function onCloseBtnClick(e) {
  lightboxEl.classList.remove('is-open')
  // Очистка значения атрибута src элемента img.lightbox__image
  imgEl.src = "";
  imgEl.alt = "";
}