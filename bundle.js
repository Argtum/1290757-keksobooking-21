(()=>{"use strict";!function(){const e=[{palace:{name:"Дворец",price:1e4}},{flat:{name:"Квартира",price:1e3}},{house:{name:"Дом",price:5e3}},{bungalow:{name:"Бунгало",price:0}}];window.data={getTypeValue:(t,n)=>e.filter((e=>e.hasOwnProperty(t)))[0][t][n],getData:e=>{window.network.loadData(e,(e=>{(e=>{window.render.renderCustomErrorMessage(e),document.addEventListener("mousedown",window.form.onErrorMsgClose),document.addEventListener("keydown",window.form.onErrorMsgClose)})(e)}))},adsData:void 0}}(),window.util={pressEnter:(e,t)=>{"Enter"===e.key&&(e.preventDefault(),t(e))},pressLeftMouseButton:(e,t)=>{0===e.button&&(e.preventDefault(),t(e))},pressEscape:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())}},function(){const e=document.querySelector(".map");window.map={get:()=>e,toggle:()=>{e.classList.toggle("map--faded")},checkActivity:()=>!e.classList.contains("map--faded")}}(),function(){const e=window.map.get();let t;const n=()=>{const n=e.querySelector(".map__card");n&&(t.removeEventListener("mousedown",d),t.removeEventListener("keydown",d),document.removeEventListener("keydown",d),e.removeChild(n),window.pin.deactivate())},o=o=>{n(),window.pin.activate(o.target),window.render.renderCard((e=>{const t=e.alt?e.alt:e.querySelector("img").alt;return window.data.adsData.filter((e=>e.offer.title===t))})(o.target)[0],e),t=document.querySelector(".popup__close"),t.addEventListener("mousedown",d),t.addEventListener("keydown",d),document.addEventListener("keydown",d)},r=e=>{e.target.closest(".map__pin")&&!e.target.closest(".map__pin--main")&&("keydown"===e.type?window.util.pressEnter(e,(()=>{o(e)})):"mousedown"===e.type&&window.util.pressLeftMouseButton(e,(()=>{o(e)})))},d=e=>{"keydown"===e.type?"popup__close"===e.target.className?window.util.pressEnter(e,n):window.util.pressEscape(e,n):"mousedown"===e.type&&window.util.pressLeftMouseButton(e,n)};window.card={clickOnMapHandler:()=>{e.addEventListener("mousedown",r),e.addEventListener("keydown",r)},stopClickOnMapHandler:()=>{e.removeEventListener("mousedown",r),e.removeEventListener("keydown",r)},create:(e,t)=>{const n=t.cloneNode(!0);return n.querySelector(".popup__title").textContent=e.offer.title,n.querySelector(".popup__text--address").textContent=e.offer.address,n.querySelector(".popup__text--price").textContent=e.offer.price+"₽/ночь",n.querySelector(".popup__type").textContent=window.data.getTypeValue(e.offer.type,"name"),n.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`,n.querySelector(".popup__text--time").innerHTML=`${e.offer.checkin}, выезд&nbsp;до ${e.offer.checkout}`,((e,t)=>{const n=t.querySelector(".popup__features"),o=n.cloneNode();e.forEach((e=>{o.appendChild(n.querySelector(".popup__feature--"+e))}));for(let e=n.children.length-1;e>=0;e--)n.children[e].classList.add("hidden");for(let e=o.children.length-1;e>=0;e--)n.appendChild(o.children[e])})(e.offer.features,n),n.querySelector(".popup__description").textContent=e.offer.description,((e,t)=>{const n=t.querySelector(".popup__photos"),o=n.querySelector(".popup__photo");e.forEach((e=>{const t=o.cloneNode();t.src=e,n.appendChild(t)})),n.removeChild(o)})(e.offer.photos,n),n.querySelector(".popup__avatar").src=e.author.avatar,n},close:n}}(),function(){let e=!1;const t=t=>{e=!0,window.map.toggle(),window.form.switchState(),window.form.toggle(),window.form.toggle(window.filter.getElement()),window.form.setAddress(),window.validation.setNumPlaces(),window.validation.start(),window.render.renderData(),window.filter.change(),window.form.clear(),window.form.setAvatar(),window.form.setPhoto(),window.form.startHandling(),window.card.clickOnMapHandler(),t.removeEventListener("mousedown",n),t.removeEventListener("keydown",n)},n=(e,n)=>{"keydown"===e.type?window.util.pressEnter(e,(()=>{t(n)})):"mousedown"===e.type&&window.util.pressLeftMouseButton(e,(()=>{t(n)}))};window.state={deactivate:()=>{e=!1,window.map.toggle(),window.form.switchState(),window.form.reset(),window.form.reset(window.filter.getElement()),window.form.toggle(),window.form.toggle(window.filter.getElement()),window.validation.stop(),window.render.removePins(),window.card.close(),window.pin.resetPosition(),window.form.setAddress(),window.form.setPriceRange(),window.filter.stopChange(),window.form.stopHandling(),window.form.resetPhotos(),window.card.stopClickOnMapHandler()},onAppActivation:n,isActive:()=>e}}(),function(){const e=document.querySelector(".map__pin--main"),t=window.map.get().clientWidth;let n,o;window.pin={initApp:()=>{e.addEventListener("mousedown",(r=>{window.state.isActive()||window.state.onAppActivation(r,e),(r=>{let d={x:r.clientX,y:r.clientY};const i=r=>{r.preventDefault(),(r=>{const i=d.x-r.clientX,s=d.y-r.clientY;d={x:r.clientX,y:r.clientY},window.form.setAddress(),e.style.left=n-i>=0&&n-i<=t?String(e.offsetLeft-i)+"px":String(e.offsetLeft)+"px",e.style.top=o-s>=130&&o-s<=630?String(e.offsetTop-s)+"px":String(e.offsetTop)+"px"})(r),window.form.setAddress()},s=e=>{e.preventDefault(),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",s)})(r)})),e.addEventListener("keydown",(t=>{window.state.isActive()||window.state.onAppActivation(t,e)}))},create:(e,t)=>{const n=t.cloneNode(!0),o=n.querySelector("img");return n.style.left=String(e.location.x-25)+"px",n.style.top=String(e.location.y-70)+"px",o.src=e.author.avatar,o.alt=e.offer.title,n},getCoordinate:()=>((()=>{const t=e.offsetLeft,r=e.offsetTop,d=e.offsetWidth,i=e.clientHeight,s=parseInt(getComputedStyle(e,":after").height,10);n=Math.floor(t+d/2),o=window.map.checkActivity()?Math.floor(r+i+s):Math.floor(r+i/2)})(),`${n}, ${o}`),resetPosition:()=>{e.style.left=String(Math.floor(t/2)-30)+"px",e.style.top=String(375)+"px"},activate:e=>{e.classList.contains("map__pin")?e.classList.add("map__pin--active"):e.parentElement.classList.add("map__pin--active")},deactivate:()=>{document.querySelector(".map__pin--active").classList.remove("map__pin--active")}}}(),function(){let e,t,n,o;const r=(e="1")=>{const t=document.querySelector("#capacity");for(let n=t.children.length-1;n>=0;n--)t.children[n].disabled="100"===e?"0"!==t.children[n].value:t.children[n].value>e||"0"===t.children[n].value;t.value="100"!==e?e:"0"},d=e=>{(e=>{const t=String(window.data.getTypeValue(e,"price"));window.form.setPriceRange(t)})(e.target.value)},i=e=>{var o;o=e.target.value,"timein"===e.target.id?n.value=o:t.value=o},s=e=>{r(e.target.value)};window.validation={start:()=>{e=document.querySelector("#type"),t=document.querySelector("#timein"),n=document.querySelector("#timeout"),o=document.querySelector("#room_number"),e.addEventListener("input",d),t.addEventListener("input",i),n.addEventListener("input",i),o.addEventListener("input",s)},stop:()=>{e.removeEventListener("input",d),t.removeEventListener("input",i),n.removeEventListener("input",i),o.removeEventListener("input",s)},setNumPlaces:r}}(),function(){const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pins"),n=document.querySelector("main"),o=()=>{const e=t.querySelectorAll(".map__pin:not(.map__pin--main)");for(let n=0;n<e.length;n++)t.removeChild(e[n])},r=n=>{const r=document.createDocumentFragment();n.forEach((t=>{if(t.offer){const n=window.pin.create(t,e);r.appendChild(n)}})),o(),t.appendChild(r)};window.render={renderData:()=>{window.data.getData((e=>{window.data.adsData=e,r(window.filter.limitQuantity())}))},renderCard:(e,t)=>{const n=document.querySelector("#card").content.querySelector(".map__card"),o=document.querySelector(".map__filters-container"),r=document.createDocumentFragment(),d=window.card.create(e,n);r.appendChild(d),t.insertBefore(r,o)},renderMapPins:r,removePins:o,renderSuccessMessage:()=>{const e=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),t=document.createDocumentFragment();t.appendChild(e),n.appendChild(t)},renderErrorMessage:()=>{const e=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),t=document.createDocumentFragment();t.appendChild(e),n.appendChild(t)},removeMessage:e=>{n.removeChild(e)},renderCustomErrorMessage:e=>{const t=document.querySelector("#error").content.querySelector(".error").cloneNode(),o=document.createElement("p");o.innerHTML=e,o.classList.add("error__message"),t.appendChild(o),n.appendChild(t)}}}(),function(){const e="any",t=document.querySelector(".map__filters");let n;const o=(e=window.data.adsData)=>e.slice(0,5),r=()=>{n&&window.clearTimeout(n),n=window.setTimeout((function(){(()=>{const n=t.querySelector("#housing-type"),r=t.querySelector("#housing-price"),d=t.querySelector("#housing-rooms"),i=t.querySelector("#housing-guests"),s=t.querySelector("#filter-wifi"),a=t.querySelector("#filter-dishwasher"),c=t.querySelector("#filter-parking"),u=t.querySelector("#filter-washer"),l=t.querySelector("#filter-elevator"),w=t.querySelector("#filter-conditioner"),p=window.data.adsData.filter((t=>{return(n.value===e||n.value===t.offer.type)&&(r.value===e||(o=t.offer.price,!("middle"===r.value&&(o<1e4||o>5e4)||"low"===r.value&&o>=1e4||"high"===r.value&&o<=5e4)))&&(d.value===e||parseInt(d.value,10)===t.offer.rooms)&&(i.value===e||parseInt(i.value,10)===t.offer.guests)&&(s.checked&&t.offer.features.includes(s.value)||!s.checked)&&(a.checked&&t.offer.features.includes(a.value)||!a.checked)&&(c.checked&&t.offer.features.includes(c.value)||!c.checked)&&(u.checked&&t.offer.features.includes(u.value)||!u.checked)&&(l.checked&&t.offer.features.includes(l.value)||!l.checked)&&(w.checked&&t.offer.features.includes(w.value)||!w.checked);var o}));window.card.close(),window.render.renderMapPins(o(p))})()}),500)};window.filter={getElement:()=>t,limitQuantity:o,change:()=>{t.addEventListener("change",r)},stopChange:()=>{t.removeEventListener("change",r)}}}(),function(){const e="json",t=e=>{e.removeEventListener("load",n),e.removeEventListener("error",r),e.removeEventListener("timeout",o)},n=(e,n,o)=>{200===e.status?n(e.response):o(`Статус ответа: ${e.status} ${e.statusText}`),t(e)},o=(e,n)=>{n(`Запрос не успел выполниться за ${e.timeout} мс`),t(e)},r=(e,n)=>{n("Произошла ошибка соединения"),t(e)};window.network={uploadFormData:(n,d,i)=>{const s=new XMLHttpRequest;s.timeout=1e4,s.responseType=e,s.addEventListener("load",(()=>{((e,n)=>{n(e.response),t(e)})(s,d)})),s.addEventListener("error",(()=>{r(s,i)})),s.addEventListener("timeout",(()=>{o(s,i)})),s.open("POST","https://21.javascript.pages.academy/keksobooking"),s.send(n)},loadData:(t,d)=>{const i=new XMLHttpRequest;i.timeout=1e4,i.responseType=e,i.addEventListener("load",(()=>{n(i,t,d)})),i.addEventListener("error",(()=>{r(i,d)})),i.addEventListener("timeout",(()=>{o(i,d)})),i.open("GET","https://21.javascript.pages.academy/keksobooking/data"),i.send()}}}(),function(){const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form");let n,o,r,d,i,s;const a=()=>{const e=document.querySelector(".error");window.render.removeMessage(e),document.removeEventListener("mousedown",c),o.removeEventListener("keydown",c),document.removeEventListener("keydown",c)},c=e=>{"keydown"===e.type?e.target.classList.contains("error__button")?window.util.pressEnter(e,a):window.util.pressEscape(e,a):"mousedown"===e.type&&window.util.pressLeftMouseButton(e,a)},u=()=>{window.render.renderErrorMessage(),o=document.querySelector(".error__button"),document.addEventListener("mousedown",c),o.addEventListener("keydown",c),document.addEventListener("keydown",c)},l=()=>{const e=document.querySelector(".success");window.render.removeMessage(e),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",w)},w=e=>{"keydown"===e.type?window.util.pressEscape(e,l):"mousedown"===e.type&&window.util.pressLeftMouseButton(e,l)},p=()=>{window.state.deactivate(),window.render.renderSuccessMessage(),document.addEventListener("mousedown",w),document.addEventListener("keydown",w)},m=e=>{e.preventDefault(),window.network.uploadFormData(new FormData(t),p,u)},f=()=>{window.state.deactivate(),n.removeEventListener("mousedown",v),n.removeEventListener("keydown",v)},v=e=>{"keydown"===e.type?window.util.pressEnter(e,f):"mousedown"===e.type&&window.util.pressLeftMouseButton(e,f)},y=(e,t)=>{((e,t)=>{if("IMG"===t.tagName)t.src=e.result;else{const n=document.createElement("img");t.innerHTML="",n.src=e.result,n.width=70,n.height=70,t.appendChild(n)}e.removeEventListener("load",(()=>{y(e,t)}))})(e,t)},g=()=>{const e=document.querySelector(".error");window.render.removeMessage(e),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",h)},h=e=>{"keydown"===e.type?window.util.pressEscape(e,g):"mousedown"===e.type&&window.util.pressLeftMouseButton(e,g)},E=(t,n)=>{const o=t.files[0],r=o.name.toLowerCase(),d=e.some((e=>r.endsWith(e)));try{if(!d)throw new Error("Загружать можно только картинки, следующих форматов: gif, jpg, jpeg, png");{const e=new FileReader;e.addEventListener("load",(()=>{y(e,n)})),e.readAsDataURL(o)}}catch(e){window.render.renderCustomErrorMessage(e.message),document.addEventListener("mousedown",h),document.addEventListener("keydown",h)}},L=()=>{E(i,r)},S=()=>{E(s,d)};window.form={switchState:()=>{t.classList.toggle("ad-form--disabled")},toggle:(e=t)=>{for(let t of e.children)t.disabled=!t.disabled},setAddress:()=>{document.querySelector("#address").value=window.pin.getCoordinate()},startHandling:()=>{t.addEventListener("submit",m)},stopHandling:()=>{t.addEventListener("submit",m)},clear:()=>{n=t.querySelector(".ad-form__reset"),n.addEventListener("mousedown",v),n.addEventListener("keydown",v)},setPriceRange:(e=1e3)=>{const t=document.querySelector("#price");t.placeholder=e,t.min=e},setAvatar:()=>{i=t.querySelector(".ad-form-header__input"),r=t.querySelector(".ad-form-header__preview img"),i.addEventListener("change",L)},setPhoto:()=>{s=t.querySelector(".ad-form__input"),d=t.querySelector(".ad-form__photo"),s.addEventListener("change",S)},resetPhotos:()=>{r.src="img/muffin-grey.svg",d.textContent="",i.removeEventListener("change",L),s.removeEventListener("change",S)},onErrorMsgClose:h,reset:(e=t)=>{e.reset()}}}(),window.form.toggle(),window.form.toggle(window.filter.getElement()),window.pin.initApp(),window.form.setAddress()})();