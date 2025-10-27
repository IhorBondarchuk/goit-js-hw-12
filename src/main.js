import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import { clearGallery, createGallery, galleryElement, getHeightImageCard, hideLoader, hideLoadMoreButton, loadMoreBtn, scrollPage, showLoader, showLoadMoreButton } from "./js/render-functions";
import { getImagesByQuery, PER_PAGE } from "./js/pixabay-api";

const formElement = document.querySelector('.form');

formElement.addEventListener("submit", handlerSubmitForm);
loadMoreBtn.addEventListener("click", onLoadMore);

let page = 1;
let query = "";
let totalPages = 0;

async function handlerSubmitForm(evt) {
    evt.preventDefault();

    query = evt.target.elements['search-text'].value.trim();

    if (!query) {
        iziToast.warning({
            message: "Please enter a search query",
            position: 'topRight',
            timeout: 4000,
        });
        return;
    };
    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();


    try {
        const {data} = await getImagesByQuery(query, page);
        if (!data.hits || data.hits.length === 0) {
            iziToast.info({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                    timeout: 4000,
                });
            return;
        }

        createGallery(data.hits);
        totalPages = Math.ceil(data.totalHits / PER_PAGE);
        if (page < totalPages) {
            showLoadMoreButton();
            page += 1;
        }
        else {
            hideLoadMoreButton();
            iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight",
                    timeout: 4000,
                });

        }


    } catch (error) {
        hideLoadMoreButton();
        iziToast.error({
            message: "ERROR",
            position: "topRight",
            timeout: 4000,
        });
    }
    finally {
        formElement.reset();
        hideLoader();
    };

};

async function onLoadMore() {
    hideLoadMoreButton();
    showLoader();

    try {
        const { data } = await getImagesByQuery(query, page);

        if (!data.hits || data.hits.length === 0) {
            hideLoadMoreButton();
            iziToast.info({
                message: "Sorry, no more images found.",
                position: 'topRight',
                timeout: 4000,
            });
            return;
        }
        createGallery(data.hits);
        scrollPage(getHeightImageCard(galleryElement.children));
        totalPages = Math.ceil(data.totalHits / PER_PAGE);
        if (page < totalPages) {
            page += 1;
            showLoadMoreButton();
            
        }
        else {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                timeout: 4000,
            })
        }
    }
    catch (error) {
        iziToast.error({
            message: "ERROR",
            position: 'topRight',
            timeout: 4000,
        });
        hideLoadMoreButton();
    }
    finally {
        hideLoader();
    }
    
}