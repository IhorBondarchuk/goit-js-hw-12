import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import { clearGallery, createGallery, galleryElement, getHeightImageCard, hideLoader, hideLoadMoreButton, loadMoreBtn, scrollPage, showLoader, showLoadMoreButton } from "./js/render-functions";
import { getImagesByQuery, PER_PAGE } from "./js/pixabay-api";

const formElement = document.querySelector('.form');

formElement.addEventListener("submit", handlerSubmitForm);
loadMoreBtn.addEventListener("click", onLoadMore);

let page = 1;
let query = "";

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
    showLoader();
    clearGallery();

    try {
        const {data} = await getImagesByQuery(query, page);
        if (data.hits.length === 0) {
            hideLoadMoreButton();
            iziToast.info({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                    timeout: 4000,
                });
            return;
        }
        else {
            createGallery(data.hits);
            showLoadMoreButton();
            page += 1;
            
            if (data.totalHits / PER_PAGE <= page) {
                
                
                hideLoadMoreButton();
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight",
                    timeout: 4000,
                });
            }
        }
    } catch (error) {
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
    showLoader();

    try {
        const { data } = await getImagesByQuery(query, page);
        
        if (data.totalHits / PER_PAGE <= page) {
            createGallery(data.hits) 
                hideLoadMoreButton();
                scroll(getHeightImageCard(galleryElement.children));
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
                timeout: 4000,
                })
        }
        else {
            createGallery(data.hits);
            showLoadMoreButton();
            scrollPage(getHeightImageCard(galleryElement.children));
            page += 1;
        }
        }
     catch (error) {
        iziToast.error({
            message: "ERROR",
            position: 'topRight',
            timeout: 4000,
        })
    }
    finally {
        hideLoader();
    }
}