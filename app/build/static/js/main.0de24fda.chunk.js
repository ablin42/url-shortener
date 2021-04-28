(this["webpackJsonpurl-shortener"]=this["webpackJsonpurl-shortener"]||[]).push([[0],{35:function(e,t,a){e.exports=a(64)},64:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),l=a(28),c=a.n(l),o=(a(8),a(29)),s=a(30),i=a(34),m=a(33),u=a(15),d=a(1),p=a(7),h=a.n(p),f=a(12),E=a(9),v=a(13),b=a.n(v);var g=function(){return n.a.createElement("form",{action:"/"},n.a.createElement("button",{className:"btn-404"},n.a.createElement("i",{className:"fas fa-home fa-2x"})))};var y=function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",{className:"not-found"},"404"),n.a.createElement(g,null))};function w(e,t){var a=document.createElement("div"),r=document.getElementById("alert"),n=document.querySelector(t);a.setAttribute("id","alert"),a.setAttribute("class","alert alert-".concat(e.alertType)),a.setAttribute("role","alert"),r&&r.remove(),a.innerHTML+=e.content,n&&n.after(a)}function k(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info";return{alertType:t,content:'<button onclick="dismissAlert(this)" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">\xd7</span></button>'.concat(e)}}function N(e){e.id;var t=e.longUrl,a=e.shortUrl;function r(e){e.preventDefault();var t=document.querySelector("#clipper").value,a=document.querySelector(".tooltiptext");a&&!a.classList.contains("tooltip-visible")&&(a.classList.add("tooltipAnim"),a.classList.add("tooltip-visible"),setTimeout((function(){a&&(a.classList.remove("tooltip-visible"),a.classList.remove("tooltipAnim"))}),1e3)),function(e){var t=document.createElement("input");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}(t)}return n.a.createElement("div",{className:"url-container"},n.a.createElement("div",{className:"clipboard-wrapper"},n.a.createElement("div",{className:"tooltip"},n.a.createElement("h2",{"data-clipboard":"",onClick:r},"Copy to clipboard"),n.a.createElement("a",{"data-clipboard":"",onClick:r,href:"./#"},n.a.createElement("i",{className:"fas fa-copy"})),n.a.createElement("span",{className:"tooltiptext"},"Copied!"))),n.a.createElement("a",{target:"_blank",href:t,rel:"noopener noreferrer",className:"shortened-link heroAnim"},"xs-url.fr/",a),n.a.createElement("input",{type:"hidden",value:"http://"+a,id:"clipper"}),n.a.createElement(g,null))}function x(){var e=Object(r.useState)({_id:"",longUrl:"",shortUrl:"",urlCode:"",date:"",createdAt:"",updatedAt:"",__v:0}),t=Object(E.a)(e,2),a=t[0],l=t[1],c=Object(r.useState)({message:"Loading..."}),o=Object(E.a)(c,2),s=o[0],i=o[1],m=Object(d.f)().id;return Object(r.useEffect)((function(){Object(f.a)(h.a.mark((function e(){var t,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t="/api/url/"+m,e.next=4,b.a.get(t);case 4:(a=e.sent).data.error?(w(k(a.data.message,"error"),"#alert-wrapper"),i({message:"This URL does not exist"})):l(a.data),e.next=13;break;case 8:e.prev=8,e.t0=e.catch(0),w(k("An error occured while fetching this URL","error"),"#alert-wrapper"),i({message:"This URL does not exist"});case 13:case"end":return e.stop()}}),e,null,[[0,8]])})))()}),[m]),a._id.length?n.a.createElement(N,{id:a._id,longUrl:a.longUrl,shortUrl:a.shortUrl}):n.a.createElement("div",{className:"hero-text"},n.a.createElement("h1",null,s.message),n.a.createElement("h2",null,"Press this button to go home"),n.a.createElement(g,null))}var O=function(){var e=Object(d.g)();return n.a.createElement(d.c,null,n.a.createElement(d.a,{exact:!0,path:"".concat(e.url,"/:id")},n.a.createElement(x,null)),n.a.createElement(d.a,{path:e.path},n.a.createElement(y,null)))};var S=function(){var e=Object(r.useState)({isDarkMode:!1}),t=Object(E.a)(e,2),a=t[0],l=t[1];Object(r.useEffect)((function(){var e=null!==localStorage.getItem("themeSwitch")&&"dark"===localStorage.getItem("themeSwitch"),t=document.querySelector("input[name=theme]");t&&(t.checked=e),e?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.removeAttribute("data-theme")}));var c=function(){document.documentElement.classList.add("transition"),window.setTimeout((function(){document.documentElement.classList.remove("transition")}),750)};return n.a.createElement("div",{className:"toggle-container"},n.a.createElement("input",{onChange:function(){l({isDarkMode:!a.isDarkMode}),a.isDarkMode?(c(),localStorage.setItem("themeSwitch","dark"),document.documentElement.setAttribute("data-theme","dark")):(c(),localStorage.removeItem("themeSwitch"),document.documentElement.setAttribute("data-theme","light"))},type:"checkbox",id:"toggler",name:"theme"}),n.a.createElement("label",{htmlFor:"toggler"},"Toggle"))},j=a(32),A=a.n(j);var U=function(){var e=Object(r.useState)({value:"",errorMsg:""}),t=Object(E.a)(e,2),a=t[0],l=t[1];function c(e){return o.apply(this,arguments)}function o(){return(o=Object(f.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="",t.length>0&&(A.a.isWebUri(t)||(a="URL not properly formatted")),e.abrupt("return",a);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function s(){return(s=Object(f.a)(h.a.mark((function e(t){var a,r,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target.value.trim(),r=document.querySelector(".search-btn"),a.length>0&&r?(r.style.opacity="1",r.style.transform="rotate(0deg)"):(r.style.opacity="0",r.style.transform="rotate(45deg)"),e.next=5,c(a);case 5:n=e.sent,l({value:a,errorMsg:n});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"hero-text"},n.a.createElement("h1",{className:"heroAnim"},"Dead simple URL shortener"),n.a.createElement("h2",{className:"heroAnim"},"Copy and paste your link below")),n.a.createElement("h1",{className:"errorMsg"},a.errorMsg),n.a.createElement("div",{className:"form-wrapper"},n.a.createElement("form",{method:"POST",action:"/",onSubmit:function(e){var t;e.preventDefault(),t=a.value,b.a.post("/api/url/shorten",{longUrl:t}).then((function(e){e.data.error?w(k(e.data.message,"error"),"#alert-wrapper"):window.location.href="/link/"+e.data.urlCode})).catch((function(e){w(k("An error occured while processing your request","error"),"#alert-wrapper")}))},className:"shorten-form"},n.a.createElement("input",{onChange:function(e){return s.apply(this,arguments)},name:"longUrl",type:"text",className:"search-txt",placeholder:"Your link here...",value:a.value,required:!0}),n.a.createElement("button",{type:"submit",className:"search-btn"},n.a.createElement("i",{className:"fas fa-arrow fa-arrow-right"})))))},C=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return n.a.createElement(u.a,null,n.a.createElement(S,null),n.a.createElement("div",{id:"alert-wrapper"}),n.a.createElement("div",{className:"container"},n.a.createElement(d.c,null,n.a.createElement(d.a,{path:"/link/"},n.a.createElement(O,null)),n.a.createElement(d.a,{exact:!0,path:"/"},n.a.createElement(U,null)),n.a.createElement(d.a,{component:y}))),n.a.createElement("footer",{className:"invert"},n.a.createElement("p",{className:"footer-text"},n.a.createElement("a",{target:"_blank",href:"https://www.ablin.dev"},"@ablin42"))))}}]),a}(r.Component);c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(C,null)),document.getElementById("root"))},8:function(e,t,a){}},[[35,1,2]]]);
//# sourceMappingURL=main.0de24fda.chunk.js.map