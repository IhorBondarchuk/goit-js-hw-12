import{S,a as v,i as r}from"./assets/vendor-GN5hr8qZ.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();const d=document.querySelector(".gallery"),g=document.querySelector(".loader"),h=document.querySelector(".load-more-button"),q=new S(".gallery a",{captionsData:"alt",captionsDelay:250});function p(e){const o=e.map(({webformatURL:n,largeImageURL:c,tags:t,likes:i,views:l,comments:E,downloads:P})=>`
    <li class="gallery-item">
    <div class="image-box">
    <a href="${c}" class="gallery-link">
        <img
        src="${n}" 
        alt="${t}" 
        class="gallery-image">
    </a>
    </div>
    <ul class="image-stats">
  <li class="image-stat-item">
    <h4>Likes</h4>
    <p>${i}</p>
  </li>
  <li class="image-stat-item">
    <h4>Views</h4>
    <p>${l}</p>
  </li>
  <li class="image-stat-item">
    <h4>Comments</h4>
    <p>${E}</p>
  </li>
  <li class="image-stat-item">
    <h4>Downloads</h4>
    <p>${P}</p>
  </li>
</ul>
</li>
    `).join("");d.insertAdjacentHTML("beforeend",o),q.refresh()}function M(){d.innerHTML=""}function y(){g.classList.remove("is-hidden")}function L(){g.classList.add("is-hidden")}function R(){h.style.display="block"}function s(){h.style.display="none"}function $(e){window.scrollBy({top:e,left:0,behavior:"smooth"})}function O(e){return(e[0].getBoundingClientRect().height+24)*2}const B="https://pixabay.com/api/",x="52835014-1fa6accc1c58d324fc268a772",f=15;async function b(e,o){const n=new URLSearchParams({key:x,q:e,page:o,per_page:f,image_type:"photo",orientation:"horizontal",safesearch:"true"});return v.get(`${B}?${n}`)}const w=document.querySelector(".form");w.addEventListener("submit",A);h.addEventListener("click",H);let a=1,u="",m=0;async function A(e){if(e.preventDefault(),u=e.target.elements["search-text"].value.trim(),!u){r.warning({message:"Please enter a search query",position:"topRight",timeout:4e3});return}a=1,M(),s(),y();try{const{data:o}=await b(u,a);if(!o.hits||o.hits.length===0){r.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:4e3});return}p(o.hits),m=Math.ceil(o.totalHits/f),a<m?(R(),a+=1):(s(),r.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3}))}catch{s(),r.error({message:"ERROR",position:"topRight",timeout:4e3})}finally{w.reset(),L()}}async function H(){s(),y();try{const{data:e}=await b(u,a);if(!e.hits||e.hits.length===0){s(),r.info({message:"Sorry, no more images found.",position:"topRight",timeout:4e3});return}p(e.hits),$(O(d.children)),m=Math.ceil(e.totalHits/f),a<m?(a+=1,R()):(s(),r.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3}))}catch{r.error({message:"ERROR",position:"topRight",timeout:4e3}),s()}finally{L()}}
//# sourceMappingURL=index.js.map
