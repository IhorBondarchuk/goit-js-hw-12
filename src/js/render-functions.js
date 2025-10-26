import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.load-more-button');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionsDelay: 250,
});

export function createGallery(images) {
    const markup = images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
        `
    <li class="gallery-item">
    <div class="image-box">
    <a href="${largeImageURL}" class="gallery-link">
        <img
        src="${webformatURL}" 
        alt="${tags}" 
        class="gallery-image">
    </a>
    </div>
    <ul class="image-stats">
  <li class="image-stat-item">
    <h4>Likes</h4>
    <p>${likes}</p>
  </li>
  <li class="image-stat-item">
    <h4>Views</h4>
    <p>${views}</p>
  </li>
  <li class="image-stat-item">
    <h4>Comments</h4>
    <p>${comments}</p>
  </li>
  <li class="image-stat-item">
    <h4>Downloads</h4>
    <p>${downloads}</p>
  </li>
</ul>
</li>
    `
    ).join('');

    galleryElement.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
};

export function clearGallery() {
    galleryElement.innerHTML = "";
};


export function showLoader() {
    loaderElement.classList.remove('is-hidden');
};

export function hideLoader() {
    loaderElement.classList.add('is-hidden');
};

export function showLoadMoreButton() {
    loadMoreBtn.style.display = "block";
};

export function hideLoadMoreButton() {
    loadMoreBtn.style.display = "none";
};

export function scrollPage(pxY) {
    window.scrollBy({
        top: pxY,
        left: 0,
        behavior: "smooth",
    });
};

export function getHeightImageCard(elem) {
    const rect = elem[0].getBoundingClientRect();
    return (rect.height + 24) * 2;
};