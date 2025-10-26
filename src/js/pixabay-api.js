import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "52835014-1fa6accc1c58d324fc268a772";
export const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        page,
        per_page: PER_PAGE,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
    });

    return axios.get(`${BASE_URL}?${params}`);
}