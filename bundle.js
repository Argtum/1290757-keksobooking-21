(()=>{"use strict";!function(){const e=[{palace:{name:"Дворец",price:1e4}},{flat:{name:"Квартира",price:1e3}},{house:{name:"Дом",price:5e3}},{bungalow:{name:"Бунгало",price:0}}];window.data={getTypeValue:(t,n)=>e.filter((e=>e.hasOwnProperty(t)))[0][t][n],getData:e=>{window.network.load(e,(e=>{window.render.renderLoadErrorMessage(e)}))},adsData:void 0}}(),window.util={isEnterEvent:(e,t)=>{"Enter"===e.key&&(e.preventDefault(),t(e))},isLeftMouseButtonEvent:(e,t)=>{0===e.button&&t(e)},isInputEvent:(e,t)=>{"timein"===e.target.id||"timeout"===e.target.id?t(e.target.value,e.target.id):t(e.target.value)},isEscapeEvent:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())}},function(){const e=e=>{const t=e.querySelector(".map__card");t&&e.removeChild(t)},t=(t,n)=>{var o;e(n),window.render.renderCard((o=t.target,window.data.adsData.filter((e=>e.offer.title===o.alt?o.alt:o.querySelector("img").alt)))[0],n)};window.card={createCard:(e,t)=>{const n=t.cloneNode(!0);return n.querySelector(".popup__title").textContent=e.offer.title,n.querySelector(".popup__text--address").textContent=e.offer.address,n.querySelector(".popup__text--price").textContent=e.offer.price+"₽/ночь",n.querySelector(".popup__type").textContent=window.data.getTypeValue(e.offer.type,"name"),n.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`,n.querySelector(".popup__text--time").innerHTML=`${e.offer.checkin}, выезд&nbsp;до ${e.offer.checkout}`,((e,t)=>{const n=t.querySelector(".popup__features"),o=n.cloneNode();e.forEach((e=>{o.appendChild(n.querySelector(".popup__feature--"+e))}));for(let e=n.children.length-1;e>=0;e--)n.children[e].classList.add("hidden");for(let e=o.children.length-1;e>=0;e--)n.appendChild(o.children[e])})(e.offer.features,n),n.querySelector(".popup__description").textContent=e.offer.description,((e,t)=>{const n=t.querySelector(".popup__photos"),o=n.querySelector(".popup__photo");e.forEach((e=>{const t=o.cloneNode();t.src=e,n.appendChild(t)})),n.removeChild(o)})(e.offer.photos,n),n.querySelector(".popup__avatar").src=e.author.avatar,n},closeCard:e,onCardOpen:(e,n)=>{e.target.closest(".map__pin")&&!e.target.closest(".map__pin--main")&&("keydown"===e.type?window.util.isEnterEvent(e,(()=>{t(e,n)})):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,(()=>{t(e,n)})))},onCardClose:(t,n)=>{"keydown"===t.type?window.util.isEscapeEvent(t,(()=>{e(n)})):"mousedown"===t.type&&"popup__close"===t.target.className&&window.util.isLeftMouseButtonEvent(t,(()=>{e(n)}))}}}(),function(){const e=document.querySelector(".map");window.map={mapClick:()=>{e.addEventListener("mousedown",(t=>{window.card.onCardOpen(t,e),window.card.onCardClose(t,e)})),e.addEventListener("keydown",(t=>{window.card.onCardOpen(t,e)})),document.addEventListener("keydown",(t=>{window.card.onCardClose(t,e)}))},getMap:()=>e,switchMap:()=>{e.classList.toggle("map--faded")},isMapActive:()=>!e.classList.contains("map--faded")}}(),function(){let e=!1;const t=t=>{e=!0,window.map.switchMap(),window.form.switchAddForm(),window.form.toggleForms(),window.form.setAddress(),window.validation.validation(),window.render.renderData(),window.map.mapClick(),window.filter.changeFilter(),window.form.send(),window.form.clear(),window.form.setAvatar(),window.form.setPhoto(),t.removeEventListener("mousedown",n),t.removeEventListener("keydown",n)},n=(e,n)=>{"keydown"===e.type?window.util.isEnterEvent(e,(()=>{t(n)})):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,(()=>{t(n)}))};window.state={deactivate:()=>{e=!1,window.map.switchMap(),window.form.switchAddForm(),window.form.toggleForms(),window.render.removePins(),window.card.closeCard(window.map.getMap()),window.form.setPriceRange(),window.pin.resetPinPosition(),window.form.setAddress()},onMapActivation:n,isActiveState:()=>e}}(),function(){const e=document.querySelector(".map__pin--main"),t=window.map.getMap().clientWidth;let n,o;const r=r=>{let i={x:r.clientX,y:r.clientY};const d=r=>{r.preventDefault(),(r=>{const d=i.x-r.clientX,a=i.y-r.clientY;i={x:r.clientX,y:r.clientY},window.form.setAddress(),e.style.left=n-d>=0&&n-d<=t?String(e.offsetLeft-d)+"px":String(e.offsetLeft)+"px",e.style.top=o-a>=130&&o-a<=630?String(e.offsetTop-a)+"px":String(e.offsetTop)+"px"})(r),window.form.setAddress()},a=e=>{e.preventDefault(),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",a)};window.pin={init:()=>{e.addEventListener("mousedown",(t=>{window.state.isActiveState()||window.state.onMapActivation(t,e),r(t)})),e.addEventListener("keydown",(t=>{window.state.isActiveState()||window.state.onMapActivation(t,e)}))},createMapPin:(e,t)=>{const n=t.cloneNode(!0),o=n.querySelector("img");return n.style.left=String(e.location.x-25)+"px",n.style.top=String(e.location.y-70)+"px",o.src=e.author.avatar,o.alt=e.offer.title,n},getMapPinCoordinate:()=>((()=>{const t=e.offsetLeft,r=e.offsetTop,i=e.offsetWidth,d=e.clientHeight,a=parseInt(getComputedStyle(e,":after").height,10);n=Math.floor(t+i/2),o=window.map.isMapActive()?Math.floor(r+d+a):Math.floor(r+d/2)})(),`${n}, ${o}`),onMoveMainMapPin:r,resetPinPosition:()=>{e.style.left=String(Math.floor(t/2)-30)+"px",e.style.top=String(375)+"px"}}}(),window.validation={validation:()=>{const e=document.querySelector("#type"),t=document.querySelector("#timein"),n=document.querySelector("#timeout"),o=document.querySelector("#room_number"),r=e=>{const t=String(window.data.getTypeValue(e,"price"));window.form.setPriceRange(t)},i=(e,o)=>{"timein"===o?n.value=e:t.value=e},d=e=>{const t=document.querySelector("#capacity"),n=t.cloneNode(!0);for(let t=n.children.length-1;t>=0;t--)n.children[t].disabled="100"===e?"0"!==n.children[t].value:n.children[t].value>e||"0"===n.children[t].value;t.innerHTML=null,t.insertAdjacentHTML("beforeend",n.innerHTML),t.value="100"!==e?e:"0"},a=e=>{window.util.isInputEvent(e,i)};e.addEventListener("input",(e=>{window.util.isInputEvent(e,r)})),t.addEventListener("input",a),n.addEventListener("input",a),o.addEventListener("input",(e=>{window.util.isInputEvent(e,d)}))}},function(){const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pins"),n=document.querySelector("main"),o=()=>{const e=t.querySelectorAll(".map__pin:not(.map__pin--main)");for(let n=0;n<e.length;n++)t.removeChild(e[n])},r=n=>{const r=document.createDocumentFragment();n.forEach((t=>{if(t.offer){const n=window.pin.createMapPin(t,e);r.appendChild(n)}})),o(),t.appendChild(r)};window.render={renderData:()=>{window.data.getData((e=>{window.data.adsData=e,r(window.filter.limitQuantity())}))},renderCard:(e,t)=>{const n=document.querySelector("#card").content.querySelector(".map__card"),o=document.querySelector(".map__filters-container"),r=document.createDocumentFragment(),i=window.card.createCard(e,n);r.appendChild(i),t.insertBefore(r,o)},renderMapPins:r,removePins:o,renderSuccessMessage:()=>{const e=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),t=document.createDocumentFragment();t.appendChild(e),n.appendChild(t)},renderErrorMessage:()=>{const e=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),t=document.createDocumentFragment();t.appendChild(e),n.appendChild(t)},removeMessage:e=>{n.removeChild(e)},renderLoadErrorMessage:e=>{const t=document.createElement("p");t.innerHTML=e,n.appendChild(t)}}}(),function(){const e="any",t=document.querySelector(".map__filters"),n=(e=window.data.adsData)=>e.slice(0,5);window.filter={getFilterElement:()=>t,limitQuantity:n,changeFilter:()=>{let o;t.addEventListener("change",(()=>{o&&window.clearTimeout(o),o=window.setTimeout((function(){(()=>{const o=t.querySelector("#housing-type"),r=t.querySelector("#housing-price"),i=t.querySelector("#housing-rooms"),d=t.querySelector("#housing-guests"),a=t.querySelector("#filter-wifi"),s=t.querySelector("#filter-dishwasher"),c=t.querySelector("#filter-parking"),l=t.querySelector("#filter-washer"),u=t.querySelector("#filter-elevator"),w=t.querySelector("#filter-conditioner"),p=window.data.adsData.filter((t=>{return(o.value===e||o.value===t.offer.type)&&(r.value===e||(n=t.offer.price,!("middle"===r.value&&(n<1e4||n>5e4)||"low"===r.value&&n>=1e4||"high"===r.value&&n<=5e4)))&&(i.value===e||parseInt(i.value,10)===t.offer.rooms)&&(d.value===e||parseInt(d.value,10)===t.offer.guests)&&(a.checked&&t.offer.features.includes(a.value)||!a.checked)&&(s.checked&&t.offer.features.includes(s.value)||!s.checked)&&(c.checked&&t.offer.features.includes(c.value)||!c.checked)&&(l.checked&&t.offer.features.includes(l.value)||!l.checked)&&(u.checked&&t.offer.features.includes(u.value)||!u.checked)&&(w.checked&&t.offer.features.includes(w.value)||!w.checked);var n}));window.card.closeCard(window.map.getMap()),window.render.renderMapPins(n(p))})()}),500)}))}}}(),window.network={upload:(e,t,n)=>{const o=new XMLHttpRequest;o.timeout=1e4,o.responseType="json";const r=()=>{o.removeEventListener("load",i),o.removeEventListener("error",a),o.removeEventListener("timeout",d)},i=()=>{t(o.response),r()},d=()=>{n(),r()},a=()=>{n(),r()};o.addEventListener("load",i),o.addEventListener("error",a),o.addEventListener("timeout",d),o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(e)},load:(e,t)=>{const n=new XMLHttpRequest;n.timeout=1e4,n.responseType="json";const o=()=>{n.removeEventListener("load",r),n.removeEventListener("error",d),n.removeEventListener("timeout",i)},r=()=>{200===n.status?e(n.response):t(`Статус ответа: ${n.status} ${n.statusText}`),o()},i=()=>{t(`Запрос не успел выполниться за ${n.timeout} мс`),o()},d=()=>{t("Произошла ошибка соединения"),o()};n.addEventListener("load",r),n.addEventListener("error",d),n.addEventListener("timeout",i),n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()}},function(){const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form"),n=t.querySelector(".ad-form__reset"),o=()=>{window.state.deactivate(),n.removeEventListener("click",r)},r=e=>{e.preventDefault(),window.util.isLeftMouseButtonEvent(e,o)},i=(t,n)=>{const o=t.files[0],r=o.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{if("IMG"===n.tagName)n.src=e.result;else{const t=document.createElement("img");t.src=e.result,t.alt=r,t.width=70,t.height=70,n.appendChild(t)}})),e.readAsDataURL(o)}};window.form={switchAddForm:()=>{t.classList.toggle("ad-form--disabled")},toggleForm:e=>{const t=e.cloneNode(!0);for(let e of t.children)e.disabled=!e.disabled;e.innerHTML=null,e.insertAdjacentHTML("beforeend",t.innerHTML)},setAddress:()=>{document.querySelector("#address").value=window.pin.getMapPinCoordinate()},toggleForms:()=>{window.form.toggleForm(t),window.form.toggleForm(window.filter.getFilterElement())},send:()=>{const e=()=>{window.render.renderErrorMessage();const e=document.querySelector(".error__button"),t=()=>{const e=document.querySelector(".error");window.render.removeMessage(e),document.removeEventListener("mousedown",n),document.removeEventListener("keydown",n)},n=e=>{"keydown"===e.type?e.target.classList.contains("error__button")?window.util.isEnterEvent(e,t):window.util.isEscapeEvent(e,t):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,t)};document.addEventListener("mousedown",n),e.addEventListener("mousedown",n),document.addEventListener("keydown",n)},n=()=>{window.pin.deactivate(),window.render.renderSuccessMessage();const e=()=>{const e=document.querySelector(".success");window.render.removeMessage(e),document.removeEventListener("mousedown",t),document.removeEventListener("keydown",t)},t=t=>{"keydown"===t.type?window.util.isEscapeEvent(t,e):"mousedown"===t.type&&window.util.isLeftMouseButtonEvent(t,e)};document.addEventListener("mousedown",t),document.addEventListener("keydown",t)};t.addEventListener("submit",(o=>{o.preventDefault(),window.network.upload(new FormData(t),n,e)}))},clear:()=>{n.addEventListener("click",r)},setPriceRange:(e=1e3)=>{const t=document.querySelector("#price");t.placeholder=e,t.min=e},setAvatar:()=>{const e=t.querySelector(".ad-form-header__input"),n=t.querySelector(".ad-form-header__preview img");e.addEventListener("change",(()=>{i(e,n)}))},setPhoto:()=>{const e=t.querySelector(".ad-form__input"),n=t.querySelector(".ad-form__photo");e.addEventListener("change",(()=>{i(e,n)}))}}}(),window.form.toggleForms(),window.pin.init(),window.form.setAddress()})();