import{S as P,a as S,i}from"./assets/vendor-GN5hr8qZ.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const u=document.querySelector(".gallery"),p=document.querySelector(".loader"),h=document.querySelector(".load-more-button"),q=new P(".gallery a",{captionsData:"alt",captionsDelay:250});function m(t){const o=t.map(({webformatURL:a,largeImageURL:l,tags:e,likes:r,views:n,comments:E,downloads:v})=>`
    <li class="gallery-item">
    <div class="image-box">
    <a href="${l}" class="gallery-link">
        <img
        src="${a}" 
        alt="${e}" 
        class="gallery-image">
    </a>
    </div>
    <ul class="image-stats">
  <li class="image-stat-item">
    <h4>Likes</h4>
    <p>${r}</p>
  </li>
  <li class="image-stat-item">
    <h4>Views</h4>
    <p>${n}</p>
  </li>
  <li class="image-stat-item">
    <h4>Comments</h4>
    <p>${E}</p>
  </li>
  <li class="image-stat-item">
    <h4>Downloads</h4>
    <p>${v}</p>
  </li>
</ul>
</li>
    `).join("");u.insertAdjacentHTML("beforeend",o),q.refresh()}function $(){u.innerHTML=""}function y(){p.classList.remove("is-hidden")}function L(){p.classList.add("is-hidden")}function R(){h.style.display="block"}function d(){h.style.display="none"}function O(t){window.scrollBy({top:t,left:0,behavior:"smooth"})}function g(t){return(t[0].getBoundingClientRect().height+24)*2}const B="https://pixabay.com/api/",M="52835014-1fa6accc1c58d324fc268a772",f=15;async function b(t,o){const a=new URLSearchParams({key:M,q:t,page:o,per_page:f,image_type:"photo",orientation:"horizontal",safesearch:"true"});return S.get(`${B}?${a}`)}const w=document.querySelector(".form");w.addEventListener("submit",x);h.addEventListener("click",A);let s=1,c="";async function x(t){if(t.preventDefault(),c=t.target.elements["search-text"].value.trim(),!c){i.warning({message:"Please enter a search query",position:"topRight",timeout:4e3});return}y(),$();try{const{data:o}=await b(c,s);if(o.hits.length===0){d(),i.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:4e3});return}else m(o.hits),R(),s+=1,o.totalHits/f<=s&&(d(),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3}))}catch{i.error({message:"ERROR",position:"topRight",timeout:4e3})}finally{w.reset(),L()}}async function A(){y();try{const{data:t}=await b(c,s);t.totalHits/f<=s?(m(t.hits),d(),scroll(g(u.children)),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3})):(m(t.hits),R(),O(g(u.children)),s+=1)}catch{i.error({message:"ERROR",position:"topRight",timeout:4e3})}finally{L()}}
//# sourceMappingURL=index.js.map
