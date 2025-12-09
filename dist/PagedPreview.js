/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),o$5=new WeakMap;class n$4{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$5.set(s,t));}return t}toString(){return this.cssText}}const r$3=t=>new n$4("string"==typeof t?t:t+"",void 0,s$3),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$4(o,t,s$3)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$3=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$3,defineProperty:e$3,getOwnPropertyDescriptor:h$3,getOwnPropertyNames:r$2,getOwnPropertySymbols:o$4,getPrototypeOf:n$3}=Object,a$1=globalThis,c$2=a$1.trustedTypes,l$1=c$2?c$2.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$3=(t,s)=>!i$3(t,s),b={attribute:!0,type:String,converter:u$1,reflect:!1,useDefault:!1,hasChanged:f$3};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class y$1 extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$3(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$3(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$2(t),...o$4(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$3(s));}else void 0!==s&&i.push(c$3(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){const e=this.constructor,h=this[t];if(i??=e.getPropertyOptions(t),!((i.hasChanged??f$3)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(e._$Eu(t,i))))return;this.C(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EM();}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM();}updated(t){}firstUpdated(t){}}y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$2=t$1.trustedTypes,s$2=i$2?i$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$2="$lit$",h$2=`lit$${Math.random().toFixed(9).slice(2)}$`,o$3="?"+h$2,n$2=`<${o$3}>`,r$1=document,l=()=>r$1.createComment(""),c$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f$2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$1.createTreeWalker(r$1,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s$2?s$2.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f$2;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f$2?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f$2,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f$2:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f$2?s+n$2:d>=0?(o.push(a),s.slice(0,d)+e$2+s.slice(d)+h$2+x):s+h$2+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e$2)){const i=v[a++],s=r.getAttribute(t).split(h$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h$2)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h$2),s=t.length-1;if(s>0){r.textContent=i$2?i$2.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$3)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h$2,t+1));)d.push({type:7,index:c}),t+=h$2.length-1;}c++;}}static createElement(t,i){const s=r$1.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c$1(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$1).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$1,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c$1(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c$1(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$1.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c$1(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c$1(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$1.litHtmlPolyfillSupport;j?.(N,R),(t$1.litHtmlVersions??=[]).push("3.3.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s$1=globalThis;class i$1 extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}}i$1._$litElement$=!0,i$1["finalized"]=!0,s$1.litElementHydrateSupport?.({LitElement:i$1});const o$2=s$1.litElementPolyfillSupport;o$2?.({LitElement:i$1});(s$1.litElementVersions??=[]).push("4.2.1");

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f$1=o=>void 0===o.strings;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=(i,t)=>{const e=i._$AN;if(void 0===e)return !1;for(const i of e)i._$AO?.(t,!1),s(i,t);return !0},o$1=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===e?.size)},r=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),c(t);}};function h$1(i){void 0!==this._$AN?(o$1(this),this._$AM=i,r(this)):this._$AM=i;}function n$1(i,t=!1,e=0){const r=this._$AH,h=this._$AN;if(void 0!==h&&0!==h.size)if(t)if(Array.isArray(r))for(let i=e;i<r.length;i++)s(r[i],!1),o$1(r[i]);else null!=r&&(s(r,!1),o$1(r));else s(this,i);}const c=i=>{i.type==t.CHILD&&(i._$AP??=n$1,i._$AQ??=h$1);};class f extends i{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),r(this),this.isConnected=i._$AU;}_$AO(i,t=!0){i!==this.isConnected&&(this.isConnected=i,i?this.reconnected?.():this.disconnected?.()),t&&(s(this,i),o$1(this));}setValue(t){if(f$1(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=()=>new h;class h{}const o=new WeakMap,n=e$1(class extends f{render(i){return E}update(i,[s]){const e=s!==this.G;return e&&void 0!==this.G&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=s,this.ht=i.options?.host,this.rt(this.ct=i.element)),E}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){const i=this.ht??globalThis;let s=o.get(i);void 0===s&&(s=new WeakMap,o.set(i,s)),void 0!==s.get(this.G)&&this.G.call(this.ht,void 0),s.set(this.G,t),void 0!==t&&this.G.call(this.ht,t);}else this.G.value=t;}get lt(){return "function"==typeof this.G?o.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});

const cross = x`<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  version="1.1"
  id="Layer_1"
  x="0px"
  y="0px"
  width="32.537px"
  height="32.537px"
  viewBox="0.104 0.104 32.537 32.537"
  enable-background="new 0.104 0.104 32.537 32.537"
  xml:space="preserve"
>
  <path
    fill="none"
    stroke="#FFFFFF"
    stroke-width="3.3893"
    stroke-miterlimit="10"
    d="M29.931,16.373c0,7.489-6.068,13.56-13.558,13.56c-7.483,0-13.557-6.072-13.557-13.56c0-7.486,6.074-13.554,13.557-13.554C23.862,2.819,29.931,8.887,29.931,16.373z"
  />
  <line
    fill="none"
    stroke="#FFFFFF"
    stroke-width="3.3893"
    stroke-miterlimit="10"
    x1="0.104"
    y1="16.373"
    x2="32.642"
    y2="16.373"
  />
  <line
    fill="none"
    stroke="#FFFFFF"
    stroke-width="3.3893"
    stroke-miterlimit="10"
    x1="16.373"
    y1="0.104"
    x2="16.373"
    y2="32.642"
  />
  <path
    fill="none"
    stroke="#FFFFFF"
    stroke-width="3.3893"
    stroke-miterlimit="10"
    d="M24.508,16.373c0,4.496-3.638,8.135-8.135,8.135c-4.491,0-8.135-3.638-8.135-8.135c0-4.489,3.644-8.135,8.135-8.135C20.869,8.239,24.508,11.884,24.508,16.373z"
  />
  <path
    fill="none"
    stroke="#000000"
    stroke-width="0.6778"
    stroke-miterlimit="10"
    d="M29.931,16.373c0,7.489-6.068,13.56-13.558,13.56c-7.483,0-13.557-6.072-13.557-13.56c0-7.486,6.074-13.554,13.557-13.554C23.862,2.819,29.931,8.887,29.931,16.373z"
  />
  <line
    fill="none"
    stroke="#000000"
    stroke-width="0.6778"
    stroke-miterlimit="10"
    x1="0.104"
    y1="16.373"
    x2="32.642"
    y2="16.373"
  />
  <line
    fill="none"
    stroke="#000000"
    stroke-width="0.6778"
    stroke-miterlimit="10"
    x1="16.373"
    y1="0.104"
    x2="16.373"
    y2="32.642"
  />
  <path
    d="M24.508,16.373c0,4.496-3.638,8.135-8.135,8.135c-4.491,0-8.135-3.638-8.135-8.135c0-4.489,3.644-8.135,8.135-8.135C20.869,8.239,24.508,11.884,24.508,16.373"
  />
  <line
    fill="none"
    stroke="#FFFFFF"
    stroke-width="0.6778"
    stroke-miterlimit="10"
    x1="8.239"
    y1="16.373"
    x2="24.508"
    y2="16.373"
  />
  <line
    fill="none"
    stroke="#FFFFFF"
    stroke-width="0.6778"
    stroke-miterlimit="10"
    x1="16.373"
    y1="8.239"
    x2="16.373"
    y2="24.508"
  />
</svg>`;

/**
 * `<paged-page>` — A printable, CSS-controlled page component with support for
 * margins, bleed, full-page grid layout, and print sizing via the `@page` rule.
 *
 * This element:
 * - Auto-assigns a unique page name when none is provided, ensuring consistent
 *   print and preview rendering.
 * - Reflects the `name`, `width`, and `height` properties to attributes so
 *   CSS selectors like `[name="..."]` work on both screen and print.
 * - Injects a dynamic `@page <name>` rule using `adoptedStyleSheets` so each
 *   page instance can have unique print dimensions.
 *
 * @element paged-page
 *
 * @slot - Main content of the page, placed inside the page-area grid region.
 *
 * @csspart page-area - The main printable content area.
 *
 * @cssprop --paged-width - Internal CSS width used for layout.
 * @cssprop --paged-height - Internal CSS height used for layout.
 * @cssprop --paged-bleed - Extra print bleed size.
 * @cssprop --paged-margin-top - Size of the top margin.
 * @cssprop --paged-margin-bottom - Size of the bottom margin.
 * @cssprop --paged-margin-left - Size of the left margin.
 * @cssprop --paged-margin-right - Size of the right margin.
 */
class PagedPage extends i$1 {
  /**
   * Lit properties for the component.
   *
   * @property {string} name
   *  The name of the page used in the `@page` rule and exposed as an attribute.
   *  Auto-generated if not provided.
   *
   * @property {number|null} index
   *  Optional index for multi-page contexts.
   *
   * @property {string} width
   *  Page width, e.g. `"210mm"`. Reflected so CSS `[width="..."]` selectors
   *  and internal sizing work consistently.
   *
   * @property {string} height
   *  Page height, e.g. `"297mm"`. Reflected so CSS `[height="..."]` selectors
   *  and internal sizing work consistently.
   */
  static properties = {
    name: { type: String, reflect: true },
    index: { type: Number },
    width: { type: String, reflect: true },
    height: { type: String, reflect: true },
    bleed: { type: String },
    marks: { type: String },
  };

  /**
   * Component-wide stylesheet defining layout, grid tracks, default margins,
   * print behavior, and preview appearance.
   */
  static styles = i$4`
    body {
      margin: 0;
      padding: 0;
    }
    *,
    * * {
      box-sizing: border-box;
    }

    :host {

      --paged-mark-color: black;
      --paged-bleed: 0mm;
      --paged-width: 210mm;
      --paged-height: 297mm;

      /* margins are part of the geometry */
      --paged-margin-left: 15mm;
      --paged-margin-right: 15mm;
      --paged-margin-top: 15mm;
      --paged-margin-bottom: 15mm;

      width: calc(var(--paged-bleed) + var(--paged-width) + var(--paged-bleed));
      height: calc(var(--paged-bleed) + var(--paged-height) + var(--paged-bleed));
      overflow: hidden;
      break-after: page;
      display: grid;
      margin: 0;
      padding: 0;

      grid-template-rows:
        [bleed-top-start] var(--paged-bleed)
        [bleed-top-end margin-top-start] var(--paged-margin-top)
        [margin-top-end page-area-start] minmax(1px, 1fr)
        [page-area-end margin-bottom-start] var(--paged-margin-bottom)
        [margin-bottom-end bleed-bottom-start] var(--paged-bleed)
        [bleed-bottom-end];

      grid-template-columns:
        [bleed-left-start] var(--paged-bleed)
        [bleed-left-end margin-left-start] var(--paged-margin-left)
        [margin-left-end page-area-start] 1fr
        [page-area-end margin-right-start] var(--paged-margin-right)
        [margin-right-end bleed-right-start] var(--paged-bleed)
        [bleed-right-end];

      /*  ==> dont need template area with template columns. (we should keep either one or the other
      //   grid-template-areas:
      //     "bleed-top bleed-top bleed-top bleed-top bleed-top"
      //     "bleed-left margin-top-left-corner margin-top margin-top-right-corner bleed-right"
      //     "bleed-left margin-left page-area margin-right bleed-right"
      //     "bleed-left margin-bottom-left-corner margin-bottom margin-bottom-right-corner bleed-right";
      //     "bleed-bottom bleed-bottom bleed-bottom bleed-bottom bleed-bottom ";
      //     */
    }

    // ::target(top) {
    // grid-area: margin-top;
    // }

    .page-area {
      grid-column: page-area-start / page-area-end;
      grid-row: page-area-start / page-area-end;
    }

    @media screen {
      :host {
        outline: 1px solid gainsboro;
        margin: 2rem auto;
      }
    }

    .page-margins, 
    .page-marks {
      display: contents;
    }

    .paged-crop {
      width: 100%;
      heigth:100%
      background: black;
    }

    #paged-crop-t,
    #paged-crop-b {
        grid-column: 2/5;
        grid-row: 1;
        height: 10px;
        border-left: 2px solid var(--paged-mark-color);
        border-right: 2px solid var(--paged-mark-color);
    }

    #paged-crop-b {
      grid-row: 5;
      align-self: end;
    }

    #paged-crop-r,
    #paged-crop-l {
        grid-row: 2/5;
        grid-column: 1;
        width: 10px;
        height: 100%;
        border-top: 2px solid var(--paged-mark-color);
        border-bottom: 2px solid var(--paged-mark-color);
    }

    #paged-crop-r {
      grid-column: 5;
      align-self: end;
      justify-self: end;
    }

    .paged-cross {
      width: 4mm;
      height: auto;
      align-self: center;
      justify-self: center;
      svg {
        width: 100%;
        height: auto;
      }
    }

    #paged-cross-t {
      grid-column: 3;
      grid-row: 1;
    }
    #paged-cross-b {
      grid-column: 3;
      grid-row: 5;
    }
    #paged-cross-l {
      grid-column: 1;
      grid-row: 3;
    }
    #paged-cross-r {
      grid-column: 5;
      grid-row: 3;
    }

    /*
      Make slotted content of page-margins, and default content
      render as a subgrid;
     */
    .page-margins slot *,
    .page-margins ::slotted(*) {
      grid-template-columns: subgrid;
      grid-template-rows: subgrid;
      grid-column: margin-left-start / margin-right-end;
      grid-row: margin-top-start / margin-bottom-end;
    }
  `;

  /**
   * Constructor initializes defaults.
   */
  constructor() {
    super();
    this.index = null;
    this.width = "210mm";
    this.height = "297mm";
    this.name = ""; // auto-filled in connectedCallback
    this.bleed = "0mm";
    this.marks = "";
  }

  /**
   * Lifecycle: Runs when component is added to the DOM.
   *
   * - Ensures the element has a valid `name` attribute.
   * - Injects a dynamic `@page` rule to ensure print sizing matches preview.
   */
  connectedCallback() {
    super.connectedCallback();

    // Auto-assign name if missing
    if (!this.hasAttribute("name") || !this.name?.trim()) {
      const autoName = `page-${crypto.randomUUID()}`;
      this.name = autoName; // reflect:true ensures the attribute is written on the parent object so CSS can use it.
    }

    // validate value for width and height
    console.log(this.width);
    console.log(CSS.supports(this.width));
    if ((this.width && !CSS.supports("width", this.width)) || !this.width) {
      console.log("there is no width for the page, using 210mm");
      this.width = "210mm";
    }
    if ((this.height && !CSS.supports("height", this.height)) || !this.height) {
      console.log("there is no height for the page, using 210mm");
      this.height = "297mm";
    }
    // if there is no bleed or bleed = 0, then set the bleed to 0
    // chrome seems to have issue with calc when one of the number is 0 without any value
    if (!this.bleed || this.bleed == "0") {
      this.bleed = "0mm";
    }

    // cropsmark

    // check if marks="crop cross"

    // Inject the @page rules
    this.#injectPageStyles();

    // Inject the  default printing rule
    this.#injectGlobalPrintStyles();
  }

  static globalPrintStylesApplied = false;

  /**
   * Injects global @media print rules into the document.
   * Ensures it only runs once.
   *
   * @private
   */
  #injectGlobalPrintStyles() {
    if (PagedPage.globalPrintStylesApplied) return;
    PagedPage.globalPrintStylesApplied = true;

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
    @media print {
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
    }
  `);

    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }

  /**
   * Injects a dynamic stylesheet that defines a unique `@page <name>` rule
   * and binds the host element to that page context.
   *
   * This is required because:
   * - CSS variables cannot be used in `@page`
   * - browsers do not always apply unnamed @page rules consistently
   *
   * @private
   */
  #injectPageStyles() {
    const sheet = new CSSStyleSheet();

    sheet.replaceSync(`
      @page ${this.name} {
        margin: 0;
        size: calc(var(--paged-bleed, 0mm) + ${this.width} + var(--paged-bleed, 0mm))
              calc(var(--paged-bleed, 0mm) + ${this.height} + var(--paged-bleed, 0mm));
      }

 
      [name="${this.name}"] {
        page: ${this.name};
        --paged-bleed: ${this.bleed};
        --paged-width: calc(var(--paged-bleed, 0mm) + ${this.width} + var(--paged-bleed, 0mm));
        --paged-height: calc(var(--paged-bleed, 0mm) + ${this.height} + var(--paged-bleed, 0mm));
      }
    `);

    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  }

  /**
   * Renders the content area of the page.
   *
   * @returns {import("lit").TemplateResult}
   */
  render() {
    const crossMarks = [];
    const cropMarks = [];

    if (this.marks?.includes("cross") && this.bleed != "0mm") {
      crossMarks.push(
        x`<div class="paged-cross" id="paged-cross-t">${cross}</div>`,
      );
      crossMarks.push(
        x`<div class="paged-cross" id="paged-cross-r">${cross}</div>`,
      );
      crossMarks.push(
        x`<div class="paged-cross" id="paged-cross-b">${cross}</div>`,
      );
      crossMarks.push(
        x`<div class="paged-cross" id="paged-cross-l">${cross}</div>`,
      );
    }

    if (this.marks?.includes("crop") && this.bleed != "0mm") {
      cropMarks.push(x`<div class="paged-crop" id="paged-crop-t"></div>`);
      cropMarks.push(x`<div class="paged-crop" id="paged-crop-r"></div>`);
      cropMarks.push(x`<div class="paged-crop" id="paged-crop-b"></div>`);
      cropMarks.push(x`<div class="paged-crop" id="paged-crop-l"></div>`);
    }

    return x`
      <div class="page-marks">
        ${crossMarks} ${cropMarks}
      </div>
      <div class="page-margins">
        <slot name="margins">
          <paged-margins
            exportparts="margin-box, top, right, bottom, left,
            margin-box-group, margin-box-group-top, margin-box-group-right,
            margin-box-group-bottom, margin-box-group-left,
            top-left-corner, top-left, top-center, top-right, top-right-corner,
            left-top, left-middle, left-bottom,
            right-top, right-middle, right-bottom,
            bottom-left-corner, bottom-left, bottom-center, bottom-right,
            bottom-right-corner">
          </paged-margins>
        </slot>
      </div>
      <div class="page-area" part="page-area">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("paged-page", PagedPage);

class PagedDocument extends i$1 {
  static properties = {
    pages: { type: Array },
  };

  constructor() {
    super();
    this.pages = new Array();
    this.pagesTemplate = Array();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  addPage() {
    let newPage = {
      ref: e(),
    };
    this.pages.push(newPage);
    this.pagesTemplate.push(
      x`<paged-page
        ${n(newPage.ref)}
        index="${this.pagesTemplate.length + 1}"
      ></paged-page>`,
    );
    this.requestUpdate();
  }

  render() {
    return x` <slot> ${this.pagesTemplate} </slot> `;
  }
}

customElements.define("paged-document", PagedDocument);

/**
 * Essentially a no-op wrapper.
 * Should make it easier to style of select with javascript.
 */
class PagedMarginContent extends i$1 {
  constructor() {
    super();
  }

  render () {
    return x`<slot></slot>`;
  }
}


/**
 * No-op wrapper. Makes the code a little more legible?
 * And easier to write the selector in the component.
 */
class PagedMarginBox extends i$1 {
  constructor() {
    super();
  }

  /**
   * Returns the nodes assigned to the slot of the marginBox
   * 
   * @returns Array<Node>|null Array of assigned nodes, or null
   * @question, does it make sens to include this?
   * 
   * Convenience, in that it shortens:
   * marginBox.querySelector('slot').assignedNodes({flatten: true})
   * 
   * to:
   * marginBox.contentNodes
   * 
   * But could achieve a comparable result by exposing the slot through a 
   * shortcut?
   */
  get contentNodes () {
    return this.renderRoot.querySelector('slot').assignedNodes({ flatten: true }) ?? null;
  }

  get contentElements () {
    return this.renderRoot.querySelector('slot').assignedElements({ flatten: true }) ?? null;
  }


  render () {
    return x`<slot></slot>`;
  }
}


class PagedMargins extends i$1 {
  constructor () {
    super();
  }

  static styles = i$4`
    :host {
      --paged-margin-top: 15mm;
      --paged-margin-right: 15mm;
      --paged-margin-bottom: 15mm;
      --paged-margin-left: 15mm;

      display: grid;

      grid-template-columns: 
        [margin-left-start] var(--paged-margin-left)
        [margin-left-end page-area-start] 1fr
        [margin-right-start page-area-end] var(--paged-margin-right)
        [margin-right-end];
      
      grid-template-rows:
        [margin-top-start] var(--paged-margin-top)
        [margin-top-end page-area-start] 1fr
        [margin-bottom-start page-area-end] var(--paged-margin-bottom)
        [margin-bottom-end];
    }

    #top-left-corner {
      grid-row: margin-top-start;
      grid-column: margin-left-start;
    }

    #top {
      grid-row: margin-top-start;
      grid-column: page-area-start;
    }

    #top-right-corner {
      grid-row: margin-top-start;
      grid-column: margin-right-start;
    }

    #right {
      grid-row: page-area-start;
      grid-column: margin-right-start;
    }

    #bottom-left-corner {
      grid-row: margin-bottom-start;
      grid-column: margin-left-start;
    }

    #bottom {
      grid-row: margin-bottom-start;
      grid-column: page-area-start;
    }

    #bottom-right-corner {
      grid-row: margin-bottom-start;
      grid-column: margin-right-start;
    }

    #left {
      grid-row: page-area-start;
      grid-column: margin-left-start;
    }

    paged-margin-box {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #top,
    #bottom {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
    
    #left,
    #right {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
    }

    #top-left,
    #bottom-left {
      text-align: left;
      justify-content: start;
    }

    #top-right,
    #bottom-right {
      text-align: right;
      justify-content: end;
    }

    #left-top,
    #right-top {
      align-items: start;
    }

    #left-bottom,
    #right-bottom {
      align-items: end;
    }
  `

  get marginBoxes () {
    if (this.renderRoot) {
      return {
        topLeftCorner: this.renderRoot.querySelector('#top-left-corner') ?? null,
        topLeft: this.renderRoot.querySelector('#top-left') ?? null,
        topCenter: this.renderRoot.querySelector('#top-center') ?? null,
        topRight: this.renderRoot.querySelector('#top-right') ?? null,
        topRightCorner: this.renderRoot.querySelector('#top-right-corner') ?? null,
        leftTop: this.renderRoot.querySelector('#left-top') ?? null,
        leftMiddle: this.renderRoot.querySelector('#left-middle') ?? null,
        leftBottom: this.renderRoot.querySelector('#left-bottom') ?? null,
        rightTop: this.renderRoot.querySelector('#right-top') ?? null,
        rightMiddle: this.renderRoot.querySelector('#right-middle') ?? null,
        rightBottom: this.renderRoot.querySelector('#right-bottom') ?? null,
        bottomLeftCorner: this.renderRoot.querySelector('#bottom-left-corner') ?? null,
        bottomLeft: this.renderRoot.querySelector('#bottom-left') ?? null,
        bottomCenter: this.renderRoot.querySelector('#bottom-center') ?? null,
        bottomRight: this.renderRoot.querySelector('#bottom-right') ?? null,
        bottomRightCorner: this.renderRoot.querySelector('#bottom-right-corner') ?? null
      }
    }

    return null;
  }

  render () {
    return x`
      <paged-margin-box id="top-left-corner" part="margin-box top left corner top-left-corner">
        <slot name="top-left-corner"></slot>
      </paged-margin-box>

      <div id="top" part="margin-box-group margin-box-group-top">
        <paged-margin-box id="top-left" part="margin-box top top-left">
          <slot name="top-left"></slot>
        </paged-margin-box>
        <paged-margin-box id="top-center" part="margin-box top top-center">
          <slot name="top-center"></slot>
        </paged-margin-box>
        <paged-margin-box id="top-right" part="margin-box top top-right">
          <slot name="top-right"></slot>
        </paged-margin-box>
      </div>

      <paged-margin-box id="top-right-corner" part="margin-box top right corner top-right-corner">
        <slot name="top-right-corner"></slot>
      </paged-margin-box>
      
      <div id="left" part="margin-box-group margin-box-group-left">
        <paged-margin-box id="left-top" part="margin-box left left-top">
          <slot name="left-top"></slot>
        </paged-margin-box>
        <paged-margin-box id="left-middle" part="margin-box left left-middle">
          <slot name="left-middle"></slot>
        </paged-margin-box>
        <paged-margin-box id="left-bottom" part="margin-box left left-bottom">
          <slot name="left-bottom"></slot>
        </paged-margin-box>
      </div>

      <div id="right" part="margin-box-group margin-box-group-right">
        <paged-margin-box id="right-top" part="margin-box right right-top">
          <slot name="right-top"></slot>
        </paged-margin-box>
        <paged-margin-box id="right-middle" part="margin-box right right-middle">
          <slot name="right-middle"></slot>
        </paged-margin-box>
        <paged-margin-box id="right-bottom" part="margin-box right right-bottom">
          <slot name="right-bottom"></slot>
        </paged-margin-box>
      </div>
      
      <paged-margin-box id="bottom-left-corner" part="margin-box bottom left corner bottom-left-corner">
        <slot name="bottom-left-corner"></slot>
      </paged-margin-box>
      
      <div id="bottom" part="margin-box-group margin-box-group-bottom">
        <paged-margin-box id="bottom-left" part="margin-box bottom bottom-left">
          <slot name="bottom-left"></slot>
        </paged-margin-box>
        <paged-margin-box id="bottom-center" part="margin-box bottom bottom-center">
          <slot name="bottom-center"></slot>
        </paged-margin-box>
        <paged-margin-box id="bottom-right" part="margin-box bottom bottom-right">
          <slot name="bottom-right"></slot>
        </paged-margin-box>
      </div>

      <paged-margin-box id="bottom-right-corner" part="margin-box bottom right corner bottom-right-corner">
        <slot name="bottom-right-corner"></slot>
      </paged-margin-box>
    `;
  }
}

customElements.define("paged-margin-content", PagedMarginContent);
customElements.define("paged-margin-box", PagedMarginBox);
customElements.define("paged-margins", PagedMargins);

// import { pagedjs } from 'pagedjs';

class PagedPreview extends i$1 {
  static styles = i$4`
    body {
      margin: 0;
      padding: 0;
    }
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    //pagedjs.preview(this);
  }

  render() {
    return x`
      <slot>
        <paged-document></paged-document>
      </slot>
    `;
  }
}

customElements.define("paged-preview", PagedPreview);

export { PagedPreview };
