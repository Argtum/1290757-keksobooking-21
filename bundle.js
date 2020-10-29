(()=>{"use strict";!function(){const e=["12:00","13:00","14:00"],t=["wifi","dishwasher","parking","washer","elevator","conditioner"],o=["http://o0.github.io/assets/images/tokyo/hotel1.jpg","http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg"],n=[{palace:{name:"Дворец",price:1e4}},{flat:{name:"Квартира",price:1e3}},{house:{name:"Дом",price:5e3}},{bungalow:{name:"Бунгало",price:0}}];window.data={getRandomData:()=>{const r=[],i=(e,t=0)=>Math.floor(Math.random()*Math.floor(e)+t),d=e=>{let t="";const o="абвгдеёжзийклмнопрстуфхцчшщъыьэюя ";for(let n=0;n<e;n++)t+=o.charAt(i(o.length));return t},a=()=>{const e=document.querySelector(".map").clientWidth;return i(e+1)},s=()=>i(501,130),c=e=>e[i(e.length)],u=e=>e.filter((()=>i(2)));for(let l=1;l<=8;l++){const m={author:{avatar:`img/avatars/user0${l}.png`},offer:{title:d(8),address:`${a()}, ${s()}`,price:i(1e4),type:Object.keys(c(n))[0],rooms:i(10,1),guests:i(100,1),checkin:c(e),checkout:c(e),features:u(t),description:d(200),photos:u(o)},location:{x:a(),y:s()}};r.push(m)}return r},getTypeValue:(e,t)=>n.filter((t=>t.hasOwnProperty(e)))[0][e][t],getData:e=>{window.network.load("https://21.javascript.pages.academy/keksobooking/data",e,(e=>{const t=document.querySelector("main"),o=document.createElement("p");o.innerHTML=e,t.appendChild(o)}))},adsData:void 0}}(),window.util={isEnterEvent:(e,t)=>{"Enter"===e.key&&(e.preventDefault(),t(e))},isLeftMouseButtonEvent:(e,t)=>{0===e.button&&t(e)},isInputEvent:(e,t)=>{"timein"===e.target.id||"timeout"===e.target.id?t(e.target.value,e.target.id):t(e.target.value)},isEscapeEvent:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())}},function(){const e=document.querySelector(".map"),t=e.querySelector(".map__pin--main"),o=e.clientWidth;let n,r;window.pin={createMapPin:(e,t,o)=>{const n=t.cloneNode(!0),r=n.querySelector("img");return n.style.left=String(e.location.x-25)+"px",n.style.top=String(e.location.y-70)+"px",n.dataset.index=o,r.src=e.author.avatar,r.alt=e.offer.title,n},getMapPinCoordinate:()=>((()=>{const o=t.offsetLeft,i=t.offsetTop,d=t.offsetWidth,a=t.clientHeight,s=parseInt(getComputedStyle(t,":after").height,10);n=Math.floor(o+d/2),r=e.classList.contains("map--faded")?Math.floor(i+a/2):Math.floor(i+a+s)})(),`${n}, ${r}`),onMoveMainMapPin:e=>{let i={x:e.clientX,y:e.clientY};const d=e=>{e.preventDefault(),(e=>{const d=i.x-e.clientX,a=i.y-e.clientY;i={x:e.clientX,y:e.clientY},window.form.setAddress(),t.style.left=n-d>=0&&n-d<=o?String(t.offsetLeft-d)+"px":String(t.offsetLeft)+"px",t.style.top=r-a>=130&&r-a<=630?String(t.offsetTop-a)+"px":String(t.offsetTop)+"px"})(e),window.form.setAddress()},a=e=>{e.preventDefault(),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",a)},resetPinPosition:()=>{t.style.left=String(Math.floor(e.clientWidth/2)-30)+"px",t.style.top=String(375)+"px"}}}(),function(){const e=document.querySelector(".map"),t=()=>{const t=e.querySelector(".map__card");t&&e.removeChild(t)},o=e=>{const o=e.target.dataset.index?e.target.dataset.index:e.target.parentNode.dataset.index;t(),window.render.renderCard(window.data.adsData[o])};window.card={createCard:(e,t)=>{const o=t.cloneNode(!0);return o.querySelector(".popup__title").textContent=e.offer.title,o.querySelector(".popup__text--address").textContent=e.offer.address,o.querySelector(".popup__text--price").textContent=e.offer.price+"₽/ночь",o.querySelector(".popup__type").textContent=window.data.getTypeValue(e.offer.type,"name"),o.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`,o.querySelector(".popup__text--time").innerHTML=`${e.offer.checkin}, выезд&nbsp;до ${e.offer.checkout}`,(e=>{const t=o.querySelector(".popup__features"),n=t.cloneNode();e.forEach((e=>{n.appendChild(t.querySelector(".popup__feature--"+e))}));for(let e=t.children.length-1;e>=0;e--)t.children[e].classList.add("hidden");for(let e=n.children.length-1;e>=0;e--)t.appendChild(n.children[e])})(e.offer.features),o.querySelector(".popup__description").textContent=e.offer.description,(e=>{const t=o.querySelector(".popup__photos"),n=t.querySelector(".popup__photo");e.forEach((e=>{const o=n.cloneNode();o.src=e,t.appendChild(o)})),t.removeChild(n)})(e.offer.photos),o.querySelector(".popup__avatar").src=e.author.avatar,o},mapClick:()=>{const n=e=>{e.target.closest(".map__pin")&&!e.target.closest(".map__pin--main")&&("keydown"===e.type?window.util.isEnterEvent(e,o):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,o))},r=e=>{"keydown"===e.type?window.util.isEscapeEvent(e,t):"mousedown"===e.type&&"popup__close"===e.target.className&&window.util.isLeftMouseButtonEvent(e,t)};e.addEventListener("mousedown",(e=>{n(e),r(e)})),e.addEventListener("keydown",(e=>{n(e)})),document.addEventListener("keydown",(e=>{r(e)}))},closeCard:t}}(),window.validation={validation:()=>{const e=document.querySelector("#type"),t=document.querySelector("#timein"),o=document.querySelector("#timeout"),n=document.querySelector("#room_number"),r=e=>{const t=String(window.data.getTypeValue(e,"price"));window.form.setPriceRange(t)},i=(e,n)=>{"timein"===n?o.value=e:t.value=e},d=e=>{const t=document.querySelector("#capacity"),o=t.cloneNode(!0);for(let t=o.children.length-1;t>=0;t--)o.children[t].disabled="100"===e?"0"!==o.children[t].value:o.children[t].value>e||"0"===o.children[t].value;t.innerHTML=null,t.insertAdjacentHTML("beforeend",o.innerHTML),t.value="100"!==e?e:"0"},a=e=>{window.util.isInputEvent(e,i)};e.addEventListener("input",(e=>{window.util.isInputEvent(e,r)})),t.addEventListener("input",a),o.addEventListener("input",a),n.addEventListener("input",(e=>{window.util.isInputEvent(e,d)}))}},function(){const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pins"),o=()=>{const e=t.querySelectorAll(".map__pin:not(.map__pin--main)");for(let o=0;o<e.length;o++)t.removeChild(e[o])},n=n=>{const r=document.createDocumentFragment();n.forEach(((t,o)=>{if(t.offer){const n=window.pin.createMapPin(t,e,o);r.appendChild(n)}})),o(),t.appendChild(r)};window.render={renderData:()=>{window.data.getData((e=>{window.data.adsData=e,n(window.filter.limitQuantity()),window.card.mapClick(),window.filter.changeFilter(),window.form.send(),window.form.clear(),window.form.setAvatar(),window.form.setPhoto()}))},renderCard:e=>{const t=document.querySelector("#card").content.querySelector(".map__card"),o=document.querySelector(".map"),n=document.querySelector(".map__filters-container"),r=document.createDocumentFragment(),i=window.card.createCard(e,t);r.appendChild(i),o.insertBefore(r,n)},renderMapPins:n,removePins:o,renderSuccessMessage:()=>{const e=document.querySelector("main"),t=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),o=document.createDocumentFragment();o.appendChild(t),e.appendChild(o)},renderErrorMessage:()=>{const e=document.querySelector("main"),t=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),o=document.createDocumentFragment();o.appendChild(t),e.appendChild(o)}}}(),function(){const e=()=>window.data.adsData.slice(0,5);window.filter={limitQuantity:e,changeFilter:()=>{const t=document.querySelector(".map__filters");let o;t.addEventListener("change",(()=>{o&&window.clearTimeout(o),o=window.setTimeout((function(){(()=>{const o=t.querySelector("#housing-type"),n=t.querySelector("#housing-price"),r=t.querySelector("#housing-rooms"),i=t.querySelector("#housing-guests"),d=t.querySelector("#filter-wifi"),a=t.querySelector("#filter-dishwasher"),s=t.querySelector("#filter-parking"),c=t.querySelector("#filter-washer"),u=t.querySelector("#filter-elevator"),l=t.querySelector("#filter-conditioner"),m=e=>{return Number("any"===o.value||o.value===e.offer.type)+Number("any"===n.value||(t=e.offer.price,!("middle"===n.value&&(t<1e4||t>5e4)||"low"===n.value&&t>=1e4||"high"===n.value&&t<=5e4)))+Number("any"===r.value||parseInt(r.value,10)===e.offer.rooms)+Number("any"===i.value||parseInt(i.value,10)===e.offer.guests)+Number(d.checked&&e.offer.features.includes(d.value))+Number(a.checked&&e.offer.features.includes(a.value))+Number(s.checked&&e.offer.features.includes(s.value))+Number(c.checked&&e.offer.features.includes(c.value))+Number(u.checked&&e.offer.features.includes(u.value))+Number(l.checked&&e.offer.features.includes(l.value));var t};window.data.adsData.sort(((e,t)=>m(t)-m(e))),window.card.closeCard(),window.render.renderMapPins(e())})()}),500)}))}}}(),function(){const e=new XMLHttpRequest;e.timeout=1e4,e.responseType="json",window.network={upload:function(t,o,n){const r=()=>{e.removeEventListener("load",i),e.removeEventListener("error",a),e.removeEventListener("timeout",d)},i=()=>{o(e.response),r()},d=()=>{n(),r()},a=()=>{n(),r()};e.addEventListener("load",i),e.addEventListener("error",a),e.addEventListener("timeout",d),e.open("POST","https://21.javascript.pages.academy/keksobooking"),e.send(t)},load:(t,o,n)=>{const r=()=>{e.removeEventListener("load",i),e.removeEventListener("error",a),e.removeEventListener("timeout",d)},i=()=>{200===e.status?o(e.response):n(`Статус ответа: ${e.status} ${e.statusText}`),r()},d=()=>{n(`Запрос не успел выполниться за ${e.timeout} мс`),r()},a=()=>{n("Произошла ошибка соединения"),r()};e.addEventListener("load",i),e.addEventListener("error",a),e.addEventListener("timeout",d),e.open("GET",t),e.send()}}}(),function(){const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form"),o=document.querySelector(".map__filters"),n=(t,o)=>{const n=t.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{if("IMG"===o.tagName)o.src=e.result;else{const t=document.createElement("img");t.src=e.result,t.alt=r,t.width=70,t.height=70,o.appendChild(t)}})),e.readAsDataURL(n)}};window.form={toggleForm:e=>{const t=e.cloneNode(!0);for(let e of t.children)e.disabled=!e.disabled;e.innerHTML=null,e.insertAdjacentHTML("beforeend",t.innerHTML)},setAddress:()=>{document.querySelector("#address").value=window.pin.getMapPinCoordinate()},toggleForms:()=>{window.form.toggleForm(t),window.form.toggleForm(o)},send:()=>{const e=()=>{window.render.renderErrorMessage();const e=document.querySelector(".error__button"),t=()=>{const e=document.querySelector("main"),t=e.querySelector(".error");e.removeChild(t),document.removeEventListener("mousedown",o),document.removeEventListener("keydown",o)},o=e=>{"keydown"===e.type?e.target.classList.contains("error__button")?window.util.isEnterEvent(e,t):window.util.isEscapeEvent(e,t):"mousedown"===e.type&&window.util.isLeftMouseButtonEvent(e,t)};document.addEventListener("mousedown",o),e.addEventListener("mousedown",o),document.addEventListener("keydown",o)},o=()=>{window.state.deactivation(),window.render.renderSuccessMessage();const e=()=>{const e=document.querySelector("main"),o=e.querySelector(".success");e.removeChild(o),document.removeEventListener("mousedown",t),document.removeEventListener("keydown",t)},t=t=>{"keydown"===t.type?window.util.isEscapeEvent(t,e):"mousedown"===t.type&&window.util.isLeftMouseButtonEvent(t,e)};document.addEventListener("mousedown",t),document.addEventListener("keydown",t)};t.addEventListener("submit",(n=>{n.preventDefault(),window.network.upload(new FormData(t),o,e)}))},clear:()=>{const e=t.querySelector(".ad-form__reset"),o=()=>{window.state.deactivation(),e.removeEventListener("click",n)},n=e=>{e.preventDefault(),window.util.isLeftMouseButtonEvent(e,o)};e.addEventListener("click",n)},setPriceRange:(e=1e3)=>{const t=document.querySelector("#price");t.placeholder=e,t.min=e},setAvatar:()=>{const e=t.querySelector(".ad-form-header__input"),o=t.querySelector(".ad-form-header__preview img");e.addEventListener("change",(()=>{n(e,o)}))},setPhoto:()=>{const e=t.querySelector(".ad-form__input"),o=t.querySelector(".ad-form__photo");e.addEventListener("change",(()=>{n(e,o)}))}}}(),function(){const e=document.querySelector(".map"),t=document.querySelector(".ad-form");let o=!1;window.state={deactivation:()=>{o=!1,e.classList.add("map--faded"),t.classList.add("ad-form--disabled"),window.form.toggleForms(),window.render.removePins(),window.card.closeCard(),window.form.setPriceRange(),window.pin.resetPinPosition(),window.form.setAddress()},init:()=>{const n=document.querySelector(".map__pin--main"),r=()=>{o=!0,e.classList.remove("map--faded"),t.classList.remove("ad-form--disabled"),window.form.toggleForms(),window.form.setAddress(),window.validation.validation(),window.render.renderData(),n.removeEventListener("mousedown",i),n.removeEventListener("keydown",i)},i=e=>{window.util.isLeftMouseButtonEvent(e,r)};n.addEventListener("mousedown",(e=>{o||i(e),window.pin.onMoveMainMapPin(e)})),n.addEventListener("keydown",(e=>{o||i(e),i(e)}))}}}(),window.form.toggleForms(),window.state.init(),window.form.setAddress()})();