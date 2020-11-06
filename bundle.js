(()=>{"use strict";!function(){const e=[{palace:{name:"Дворец",price:1e4}},{flat:{name:"Квартира",price:1e3}},{house:{name:"Дом",price:5e3}},{bungalow:{name:"Бунгало",price:0}}];window.data={getTypeValue:(t,o)=>e.filter((e=>e.hasOwnProperty(t)))[0][t][o],getData:e=>{window.network.loadData(e,(e=>{window.render.renderCustomErrorMessage(e)}))},adsData:void 0}}(),window.util={isEnterEvent:(e,t)=>{"Enter"===e.key&&(e.preventDefault(),t(e))},isLeftMouseButtonEvent:(e,t)=>{0===e.button&&(e.preventDefault(),t(e))},isEscapeEvent:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())}},function(){const e=e=>{const t=e.querySelector(".map__card");t&&e.removeChild(t)},t=(t,o)=>{e(o),window.render.renderCard((e=>{const t=e.alt?e.alt:e.querySelector("img").alt;return window.data.adsData.filter((e=>e.offer.title===t))})(t.target)[0],o)};window.card={create:(e,t)=>{const o=t.cloneNode(!0);return o.querySelector(".popup__title").textContent=e.offer.title,o.querySelector(".popup__text--address").textContent=e.offer.address,o.querySelector(".popup__text--price").textContent=e.offer.price+"₽/ночь",o.querySelector(".popup__type").textContent=window.data.getTypeValue(e.offer.type,"name"),o.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`,o.querySelector(".popup__text--time").innerHTML=`${e.offer.checkin}, выезд&nbsp;до ${e.offer.checkout}`,((e,t)=>{const o=t.querySelector(".popup__features"),n=o.cloneNode();e.forEach((e=>{n.appendChild(o.querySelector(".popup__feature--"+e))}));for(let e=o.children.length-1;e>=0;e--)o.children[e].classList.add("hidden");for(let e=n.children.length-1;e>=0;e--)o.appendChild(n.children[e])})(e.offer.features,o),o.querySelector(".popup__description").textContent=e.offer.description,((e,t)=>{const o=t.querySelector(".popup__photos"),n=o.querySelector(".popup__photo");e.forEach((e=>{const t=n.cloneNode();t.src=e,o.appendChild(t)})),o.removeChild(n)})(e.offer.photos,o),o.querySelector(".popup__avatar").src=e.author.avatar,o},close:e,onCardOpen:(e,o)=>{e.target.closest(".map__pin")&&!e.target.closest(".map__pin--main")&&("keydown"===e.type?window.util.isEnterEvent(e,(()=>{t(e,o)})):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,(()=>{t(e,o)})))},onCardClose:(t,o)=>{"keydown"===t.type?window.util.isEscapeEvent(t,(()=>{e(o)})):"mousedown"===t.type&&"popup__close"===t.target.className&&window.util.isLeftMouseButtonEvent(t,(()=>{e(o)}))}}}(),function(){const e=document.querySelector(".map");window.map={click:()=>{e.addEventListener("mousedown",(t=>{window.card.onCardOpen(t,e),window.card.onCardClose(t,e)})),e.addEventListener("keydown",(t=>{window.card.onCardOpen(t,e)})),document.addEventListener("keydown",(t=>{window.card.onCardClose(t,e)}))},get:()=>e,toggle:()=>{e.classList.toggle("map--faded")},checkMapActivity:()=>!e.classList.contains("map--faded")}}(),function(){let e=!1;const t=t=>{e=!0,window.map.toggle(),window.form.switchForm(),window.form.toggleForms(),window.form.setAddress(),window.validation.start(),window.render.renderData(),window.filter.change(),window.form.clear(),window.form.setAvatar(),window.form.setPhoto(),window.form.submissionHandler(),t.removeEventListener("mousedown",o),t.removeEventListener("keydown",o)},o=(e,o)=>{"keydown"===e.type?window.util.isEnterEvent(e,(()=>{t(o)})):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,(()=>{t(o)}))};window.state={deactivate:()=>{e=!1,window.map.toggle(),window.form.switchForm(),window.form.toggleForms(),window.validation.setNumPlaces(),window.validation.stop(),window.render.removePins(),window.card.close(window.map.get()),window.pin.resetPosition(),window.form.setAddress(),window.form.setPriceRange(),window.filter.stopChange(),window.form.stopSubmissionHandler(),window.form.resetPhotos()},onActivation:o,isActiveState:()=>e}}(),function(){const e=document.querySelector(".map__pin--main"),t=window.map.get().clientWidth;let o,n;const r=r=>{let d={x:r.clientX,y:r.clientY};const i=r=>{r.preventDefault(),(r=>{const i=d.x-r.clientX,s=d.y-r.clientY;d={x:r.clientX,y:r.clientY},window.form.setAddress(),e.style.left=o-i>=0&&o-i<=t?String(e.offsetLeft-i)+"px":String(e.offsetLeft)+"px",e.style.top=n-s>=130&&n-s<=630?String(e.offsetTop-s)+"px":String(e.offsetTop)+"px"})(r),window.form.setAddress()},s=e=>{e.preventDefault(),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",s)};window.pin={initApp:()=>{e.addEventListener("mousedown",(t=>{window.state.isActiveState()||window.state.onActivation(t,e),r(t)})),e.addEventListener("keydown",(t=>{window.state.isActiveState()||window.state.onActivation(t,e)}))},create:(e,t)=>{const o=t.cloneNode(!0),n=o.querySelector("img");return o.style.left=String(e.location.x-25)+"px",o.style.top=String(e.location.y-70)+"px",n.src=e.author.avatar,n.alt=e.offer.title,o},getCoordinate:()=>((()=>{const t=e.offsetLeft,r=e.offsetTop,d=e.offsetWidth,i=e.clientHeight,s=parseInt(getComputedStyle(e,":after").height,10);o=Math.floor(t+d/2),n=window.map.checkMapActivity()?Math.floor(r+i+s):Math.floor(r+i/2)})(),`${o}, ${n}`),onMoveMainMapPin:r,resetPosition:()=>{e.style.left=String(Math.floor(t/2)-30)+"px",e.style.top=String(375)+"px"}}}(),function(){let e,t,o,n;const r=(e="1")=>{const t=document.querySelector("#capacity"),o=t.cloneNode(!0);for(let t=o.children.length-1;t>=0;t--)o.children[t].disabled="100"===e?"0"!==o.children[t].value:o.children[t].value>e||"0"===o.children[t].value;t.innerHTML=null,t.insertAdjacentHTML("beforeend",o.innerHTML),t.value="100"!==e?e:"0"},d=e=>{(e=>{const t=String(window.data.getTypeValue(e,"price"));window.form.setPriceRange(t)})(e.target.value)},i=e=>{var n;n=e.target.value,"timein"===e.target.id?o.value=n:t.value=n},s=e=>{r(e.target.value)};window.validation={start:()=>{e=document.querySelector("#type"),t=document.querySelector("#timein"),o=document.querySelector("#timeout"),n=document.querySelector("#room_number"),e.addEventListener("input",d),t.addEventListener("input",i),o.addEventListener("input",i),n.addEventListener("input",s)},stop:()=>{e.removeEventListener("input",d),t.removeEventListener("input",i),o.removeEventListener("input",i),n.removeEventListener("input",s)},setNumPlaces:r}}(),function(){const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pins"),o=document.querySelector("main"),n=()=>{const e=t.querySelectorAll(".map__pin:not(.map__pin--main)");for(let o=0;o<e.length;o++)t.removeChild(e[o])},r=o=>{const r=document.createDocumentFragment();o.forEach((t=>{if(t.offer){const o=window.pin.create(t,e);r.appendChild(o)}})),n(),t.appendChild(r)};window.render={renderData:()=>{window.data.getData((e=>{window.data.adsData=e,r(window.filter.limitQuantity())}))},renderCard:(e,t)=>{const o=document.querySelector("#card").content.querySelector(".map__card"),n=document.querySelector(".map__filters-container"),r=document.createDocumentFragment(),d=window.card.create(e,o);r.appendChild(d),t.insertBefore(r,n)},renderMapPins:r,removePins:n,renderSuccessMessage:()=>{const e=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),t=document.createDocumentFragment();t.appendChild(e),o.appendChild(t)},renderErrorMessage:()=>{const e=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),t=document.createDocumentFragment();t.appendChild(e),o.appendChild(t)},removeMessage:e=>{o.removeChild(e)},renderCustomErrorMessage:e=>{const t=document.querySelector("#error").content.querySelector(".error").cloneNode(),n=document.createElement("p");n.innerHTML=e,n.classList.add("error__message"),t.appendChild(n),o.appendChild(t)}}}(),function(){const e="any",t=document.querySelector(".map__filters");let o;const n=(e=window.data.adsData)=>e.slice(0,5),r=()=>{o&&window.clearTimeout(o),o=window.setTimeout((function(){(()=>{const o=t.querySelector("#housing-type"),r=t.querySelector("#housing-price"),d=t.querySelector("#housing-rooms"),i=t.querySelector("#housing-guests"),s=t.querySelector("#filter-wifi"),a=t.querySelector("#filter-dishwasher"),c=t.querySelector("#filter-parking"),u=t.querySelector("#filter-washer"),l=t.querySelector("#filter-elevator"),w=t.querySelector("#filter-conditioner"),m=window.data.adsData.filter((t=>{return(o.value===e||o.value===t.offer.type)&&(r.value===e||(n=t.offer.price,!("middle"===r.value&&(n<1e4||n>5e4)||"low"===r.value&&n>=1e4||"high"===r.value&&n<=5e4)))&&(d.value===e||parseInt(d.value,10)===t.offer.rooms)&&(i.value===e||parseInt(i.value,10)===t.offer.guests)&&(s.checked&&t.offer.features.includes(s.value)||!s.checked)&&(a.checked&&t.offer.features.includes(a.value)||!a.checked)&&(c.checked&&t.offer.features.includes(c.value)||!c.checked)&&(u.checked&&t.offer.features.includes(u.value)||!u.checked)&&(l.checked&&t.offer.features.includes(l.value)||!l.checked)&&(w.checked&&t.offer.features.includes(w.value)||!w.checked);var n}));window.card.close(window.map.get()),window.render.renderMapPins(n(m))})()}),500)};window.filter={getFilterElement:()=>t,limitQuantity:n,change:()=>{t.addEventListener("change",r)},stopChange:()=>{t.removeEventListener("change",r)}}}(),function(){const e="json",t=e=>{e.removeEventListener("load",o),e.removeEventListener("error",r),e.removeEventListener("timeout",n)},o=(e,o,n)=>{200===e.status?o(e.response):n(`Статус ответа: ${e.status} ${e.statusText}`),t(e)},n=(e,o)=>{o(`Запрос не успел выполниться за ${e.timeout} мс`),t(e)},r=(e,o)=>{o("Произошла ошибка соединения"),t(e)};window.network={uploadFormData:(o,d,i)=>{const s=new XMLHttpRequest;s.timeout=1e4,s.responseType=e,s.addEventListener("load",(()=>{((e,o)=>{o(e.response),t(e)})(s,d)})),s.addEventListener("error",(()=>{r(s,i)})),s.addEventListener("timeout",(()=>{n(s,i)})),s.open("POST","https://21.javascript.pages.academy/keksobooking"),s.send(o)},loadData:(t,d)=>{const i=new XMLHttpRequest;i.timeout=1e4,i.responseType=e,i.addEventListener("load",(()=>{o(i,t,d)})),i.addEventListener("error",(()=>{r(i,d)})),i.addEventListener("timeout",(()=>{n(i,d)})),i.open("GET","https://21.javascript.pages.academy/keksobooking/data"),i.send()}}}(),function(){const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form");let o,n;const r=()=>{const e=document.querySelector(".error");window.render.removeMessage(e),document.removeEventListener("mousedown",d),n.removeEventListener("keydown",d),document.removeEventListener("keydown",d)},d=e=>{"keydown"===e.type?e.target.classList.contains("error__button")?window.util.isEnterEvent(e,r):window.util.isEscapeEvent(e,r):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,r)},i=()=>{window.render.renderErrorMessage(),n=document.querySelector(".error__button"),document.addEventListener("mousedown",d),n.addEventListener("keydown",d),document.addEventListener("keydown",d)},s=()=>{const e=document.querySelector(".success");window.render.removeMessage(e),document.removeEventListener("mousedown",a),document.removeEventListener("keydown",a)},a=e=>{"keydown"===e.type?window.util.isEscapeEvent(e,s):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,s)},c=()=>{window.state.deactivate(),window.render.renderSuccessMessage(),document.addEventListener("mousedown",a),document.addEventListener("keydown",a)},u=e=>{e.preventDefault(),window.network.uploadFormData(new FormData(t),c,i)},l=()=>{window.state.deactivate(),o.removeEventListener("mousedown",w),o.removeEventListener("keydown",w)},w=e=>{"keydown"===e.type?window.util.isEnterEvent(e,l):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,l)},m=(e,t)=>{((e,t)=>{if("IMG"===t.tagName)t.src=e.result;else{const o=document.createElement("img");o.src=e.result,o.width=70,o.height=70,t.appendChild(o)}e.removeEventListener("load",(()=>{m(e,t)}))})(e,t)},p=()=>{const e=document.querySelector(".error");window.render.removeMessage(e),document.removeEventListener("mousedown",f),document.removeEventListener("keydown",f)},f=e=>{"keydown"===e.type?window.util.isEscapeEvent(e,p):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,p)},v=(t,o)=>{const n=t.files[0],r=n.name.toLowerCase(),d=e.some((e=>r.endsWith(e)));try{if(!d)throw new Error("Загружать можно только картинки, следующих форматов: gif, jpg, jpeg, png");{const e=new FileReader;e.addEventListener("load",(()=>{m(e,o)})),e.readAsDataURL(n)}}catch(e){window.render.renderCustomErrorMessage(e.message),document.addEventListener("mousedown",f),document.addEventListener("keydown",f)}};window.form={switchForm:()=>{t.classList.toggle("ad-form--disabled")},toggleForm:e=>{const t=e.cloneNode(!0);for(let e of t.children)e.disabled=!e.disabled;e.innerHTML=null,e.insertAdjacentHTML("beforeend",t.innerHTML)},setAddress:()=>{document.querySelector("#address").value=window.pin.getCoordinate()},toggleForms:()=>{window.form.toggleForm(t),window.form.toggleForm(window.filter.getFilterElement())},submissionHandler:()=>{t.addEventListener("submit",u)},stopSubmissionHandler:()=>{t.addEventListener("submit",u)},clear:()=>{o=t.querySelector(".ad-form__reset"),o.addEventListener("mousedown",w),o.addEventListener("keydown",w)},setPriceRange:(e=1e3)=>{const t=document.querySelector("#price");t.placeholder=e,t.min=e},setAvatar:()=>{const e=t.querySelector(".ad-form-header__input"),o=t.querySelector(".ad-form-header__preview img");e.addEventListener("change",(()=>{v(e,o)}))},setPhoto:()=>{const e=t.querySelector(".ad-form__input"),o=t.querySelector(".ad-form__photo");e.addEventListener("change",(()=>{v(e,o)}))},resetPhotos:()=>{const e=t.querySelector(".ad-form-header__preview img"),o=t.querySelector(".ad-form__photo");e.src="img/muffin-grey.svg",o.innerHTML=""}}}(),window.form.toggleForms(),window.pin.initApp(),window.form.setAddress(),window.map.click()})();