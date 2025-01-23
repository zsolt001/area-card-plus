/*! For license information please see custom-area-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,t,i)},a=(i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,_=globalThis,p=_.trustedTypes,f=p?p.emptyScript:"",g=_.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return s?.call(this)},set(e){const n=s?.call(this);o.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return a(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s,this[s]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??y)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[v("elementProperties")]=new Map,A[v("finalized")]=new Map,g?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.0.4");const w=globalThis,x=w.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+C,z=`<${O}>`,P=document,k=()=>P.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,j=Array.isArray,R=t=>j(t)||"function"==typeof t?.[Symbol.iterator],M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,L=/>/g,T=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,H=/"/g,B=/^(?:script|style|textarea|title)$/i,F=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=F(1),W=(F(2),F(3),Symbol.for("lit-noChange")),V=Symbol.for("lit-nothing"),K=new WeakMap,Y=P.createTreeWalker(P,129);function Z(t,e){if(!j(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=N;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,h=0;for(;h<i.length&&(a.lastIndex=h,c=a.exec(i),null!==c);)h=a.lastIndex,a===N?"!--"===c[1]?a=U:void 0!==c[1]?a=L:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=T):void 0!==c[3]&&(a=T):a===T?">"===c[0]?(a=o??N,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?T:'"'===c[3]?H:I):a===H||a===I?a=T:a===U||a===L?a=N:(a=T,o=void 0);const d=a===T&&t[e+1].startsWith("/>")?" ":"";n+=a===N?i+z:l>=0?(s.push(r),i.slice(0,l)+E+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[Z(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[c,l]=J(t,e);if(this.el=Q.createElement(c,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[n++],i=s.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?st:"@"===a[1]?ot:et}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),Y.nextNode(),r.push({type:2,index:++o});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===O)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=D(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);Y.currentNode=s;let o=Y.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new tt(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new nt(o,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),D(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):R(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Q(t)),e}k(t){j(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new tt(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=G(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=G(this,s[i+a],e,a),r===W&&(r=this._$AH[a]),n||=!D(r)||r!==this._$AH[a],r===V?t=V:t!==V&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class ot extends et{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===W)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const at={M:E,P:C,A:O,C:1,L:J,R:X,D:R,V:G,I:tt,H:et,N:st,U:ot,B:it,F:nt},rt=w.litHtmlPolyfillSupport;rt?.(Q,tt),(w.litHtmlVersions??=[]).push("3.2.1");class ct extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new tt(e.insertBefore(k(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ct._$litElement$=!0,ct.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ct});const lt=globalThis.litElementPolyfillSupport;lt?.({LitElement:ct}),(globalThis.litElementVersions??=[]).push("4.1.1");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ut=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.P(s,void 0,t),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};function mt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,s?{...t,wrapped:!0}:t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return mt({...t,state:!0,attribute:!1})}var pt,ft,gt,vt=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function bt(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(!((s=t[i])===(o=e[i])||vt(s)&&vt(o)))return!1;var s,o;return!0}function yt(t,e){void 0===e&&(e=bt);var i=null;function s(){for(var s=[],o=0;o<arguments.length;o++)s[o]=arguments[o];if(i&&i.lastThis===this&&e(s,i.lastArgs))return i.lastResult;var n=t.apply(this,s);return i={lastResult:n,lastArgs:s,lastThis:this},n}return s.clear=function(){i=null},s}function $t(){return($t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}function At(t){return t.substr(0,t.indexOf("."))}(gt=pt||(pt={})).language="language",gt.system="system",gt.comma_decimal="comma_decimal",gt.decimal_comma="decimal_comma",gt.space_comma="space_comma",gt.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ft||(ft={}));var wt=function(t,e){var i=$t({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var s=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=s,i.maximumFractionDigits=s}return i},xt=(new Set(["fan","input_boolean","light","switch","group","automation"]),function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o}),St=(new Set(["call-service","divider","section","weblink","cast","select"]),function(t,e,i){var s;return void 0===i&&(i=!1),function(){var o=[].slice.call(arguments),n=this,a=i&&!s;clearTimeout(s),s=setTimeout((function(){s=null,i||t.apply(n,o)}),e),a&&t.apply(n,o)}});const Et=t=>{let e=[];function i(i,s){t=s?i:Object.assign(Object.assign({},t),i);let o=e;for(let e=0;e<o.length;e++)o[e](t)}return{get state(){return t},action(e){function s(t){i(t,!1)}return function(){let i=[t];for(let t=0;t<arguments.length;t++)i.push(arguments[t]);let o=e.apply(this,i);if(null!=o)return o instanceof Promise?o.then(s):s(o)}},setState:i,subscribe:t=>(e.push(t),()=>{!function(t){let i=[];for(let s=0;s<e.length;s++)e[s]===t?t=null:i.push(e[s]);e=i}(t)})}},Ct=(t,e,i,s,o)=>((t,e,i,s)=>{if(t[e])return t[e];let o,n=0,a=Et();const r=()=>i(t).then((t=>a.setState(t,!0))),c=()=>r().catch((e=>{if(t.connected)throw e}));return t[e]={get state(){return a.state},refresh:r,subscribe(e){n++,1===n&&(s&&(o=s(t,a)),t.addEventListener("ready",c),c());const i=a.subscribe(e);return void 0!==a.state&&setTimeout((()=>e(a.state)),0),()=>{i(),n--,n||(o&&o.then((t=>{t()})),t.removeEventListener("ready",r))}}},t[e]})(s,t,e,i).subscribe(o);var Ot=function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{c(s.next(t))}catch(t){n(t)}}function r(t){try{c(s.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}c((s=s.apply(t,e||[])).next())}))};var zt,Pt,kt,Dt,jt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(zt||(zt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Pt||(Pt={})),function(t){t.local="local",t.server="server"}(kt||(kt={})),function(t){t.language="language",t.system="system",t.DMY="DMY",t.MDY="MDY",t.YMD="YMD"}(Dt||(Dt={})),function(t){t.language="language",t.monday="monday",t.tuesday="tuesday",t.wednesday="wednesday",t.thursday="thursday",t.friday="friday",t.saturday="saturday",t.sunday="sunday"}(jt||(jt={}));const Rt=yt((t=>new Intl.Collator(t))),Mt=yt((t=>new Intl.Collator(t,{sensitivity:"accent"}))),Nt=(t,e)=>t<e?-1:t>e?1:0;let Ut;const Lt=t=>t.sendMessagePromise({type:"config/area_registry/list"}).then((t=>t.sort(((t,e)=>((t,e)=>(null===Intl||void 0===Intl?void 0:Intl.Collator)?Rt(void 0).compare(t,e):Nt(t,e))(t.name,e.name))))),Tt=(t,e)=>t.subscribeEvents(St((()=>Lt(t).then((t=>e.setState(t,!0)))),500,!0),"area_registry_updated"),It=(t,e)=>Ct("_areaRegistry",Lt,Tt,t,e),Ht=t=>t.sendMessagePromise({type:"config/device_registry/list"}),Bt=(t,e)=>t.subscribeEvents(St((()=>Ht(t).then((t=>e.setState(t,!0)))),500,!0),"device_registry_updated"),Ft=t=>t.sendMessagePromise({type:"config/entity_registry/list"}),qt=(t,e)=>t.subscribeEvents(St((()=>Ft(t).then((t=>e.setState(t,!0)))),500,!0),"entity_registry_updated"),Wt=(t,e)=>Ct("_entityRegistry",Ft,qt,t,e),Vt=t=>{class e extends t{connectedCallback(){super.connectedCallback(),this._checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const t=this.__unsubs.pop();t instanceof Promise?t.then((t=>t())):t()}this.__unsubs=void 0}}updated(t){if(super.updated(t),t.has("hass"))this._checkSubscribed();else if(this.hassSubscribeRequiredHostProps)for(const e of t.keys())if(this.hassSubscribeRequiredHostProps.includes(e))return void this._checkSubscribed()}hassSubscribe(){return[]}_checkSubscribed(){var t;void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&!(null===(t=this.hassSubscribeRequiredHostProps)||void 0===t?void 0:t.some((t=>void 0===this[t])))&&(this.__unsubs=this.hassSubscribe())}}return function(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);n>3&&a&&Object.defineProperty(e,i,a)}([mt({attribute:!1})],e.prototype,"hass",void 0),e};function Kt(t,e,i){const s=new CustomEvent(e,{bubbles:!1,composed:!1,detail:i});t.dispatchEvent(s)}var Yt="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",Zt="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",Jt=function(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};const Qt=["unavailable","unknown"],Gt=["closed","locked","off","docked","idle","standby","paused","auto","not_home","disarmed"],Xt=["sensor"],te=["binary_sensor"],ee=["climate"],ie=["light","switch","fan","media_player","lock","vacuum"],se=["alarm_control_panel","siren","light","switch","media_player","climate","air_quality","humdifier","vacuum","lawn_mower","cover","lock","camera","fan","valve","water_heater","person","calendar","remote","scene","device_tracker","update","notifications","binary_sensor","sensor","script","tags","select","automation","button","number","conversation","assist_satellite","counter","event","group","image","image_processing","input_boolean","input_datetime","input_number","input_select","input_text","stt","sun","text","date","datetime","time","timer","todo","tts","wake_word","weather","zone","geo_location"],oe={sensor:["temperature","humidity"],binary_sensor:["motion","window"]},ne={light:{on:"mdi:lightbulb-multiple",off:"mdi:lightbulb-multiple-off"},switch:{on:"mdi:toggle-switch",off:"mdi:toggle-switch-off"},fan:{on:"mdi:fan",off:"mdi:fan-off"},climate:{on:"mdi:fan",off:"mdi:fan-off"},media_player:{on:"mdi:cast",off:"mdi:cast-off"},lock:{on:"mdi:lock",off:"mdi:lock-open"},vacuum:{on:"mdi:robot-vacuum",off:"mdi:robot-vacuum-off"},binary_sensor:{motion:"mdi:motion-sensor",moisture:"mdi:water-alert",window:"mdi:window-open",door:"mdi:door-open",lock:"mdi:lock",presence:"mdi:home",occupancy:"mdi:seat",vibration:"mdi:vibrate",opening:"mdi:shield-lock-open",garage_door:"mdi:garage-open",problem:"mdi:alert-circle",smoke:"mdi:smoke-detector"}};let ae=class extends(Vt(ct)){constructor(){super(...arguments),this._showPopup=!1,this._deviceClasses=oe,this._entitiesByDomain=yt(((t,e,i,s,o)=>{var n;const a=(null===(n=this._config)||void 0===n?void 0:n.hidden_entities)||[],r=i.filter((i=>!i.hidden_by&&(i.area_id?i.area_id===t:i.device_id&&e.has(i.device_id)))).map((t=>t.entity_id)).filter((t=>!a.includes(t))),c={};for(const t of r){const e=At(t);if(!(ie.includes(e)||Xt.includes(e)||te.includes(e)||ee.includes(e)))continue;const i=o[t];i&&(!te.includes(e)&&!Xt.includes(e)||s[e].includes(i.attributes.device_class||""))&&(e in c||(c[e]=[]),c[e].push(i))}return c})),this._entitiesByArea=yt(((t,e,i,s)=>{var o,n;const a=(null===(o=this._config)||void 0===o?void 0:o.popup_settings)||[],r=(null===(n=this._config)||void 0===n?void 0:n.hidden_entities)||[],c=i.filter((i=>!i.hidden_by&&(i.area_id?i.area_id===t:i.device_id&&e.has(i.device_id)))).map((t=>t.entity_id)).filter((t=>!r.includes(t))).filter((t=>{var e,i;return!(null===(e=this._config)||void 0===e?void 0:e.hide_unavailable)||!Qt.includes(null===(i=s[t])||void 0===i?void 0:i.state)})),l={};for(const t of c){const e=At(t);if(a.length>0&&!a.includes(e))continue;const i=s[t];i&&(e in l||(l[e]=[]),l[e].push(i))}const h=a.length>0?a:se,d=Object.entries(l).sort((([t],[e])=>{const i=h.indexOf(t),s=h.indexOf(e);return(-1===i?h.length:i)-(-1===s?h.length:s)})).reduce(((t,[e,i])=>{const s=i.sort(((t,e)=>{const i=t.state,s=e.state,o=t=>Gt.includes(t)||Qt.includes(t)?Gt.includes(t)&&!Qt.includes(t)?1:2:0,n=o(i),a=o(s);return n!==a?n-a:t.entity_id.localeCompare(e.entity_id)}));return t[e]=s,t}),{});return d})),this._area=yt(((t,e)=>e.find((e=>e.area_id===t))||null)),this._devicesInArea=yt(((t,e)=>new Set(t?e.filter((e=>e.area_id===t)).map((t=>t.id)):[])))}static getConfigElement(){return document.createElement("custom-area-card-editor")}static getStubConfig(t){var e;return function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{c(s.next(t))}catch(t){n(t)}}function r(t){try{c(s.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}c((s=s.apply(t,e||[])).next())}))}(this,void 0,void 0,(function*(){const i=yield(s=t.connection,o=It,Ot(void 0,void 0,void 0,(function*(){return new Promise((t=>{const e=o(s,(i=>{e(),t(i)}))}))})));var s,o;return{type:"custom:custom-area-card",area:(null===(e=i[0])||void 0===e?void 0:e.area_id)||""}}))}_isOn(t,e){const i=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states)[t];if(i)return(e?i.filter((t=>t.attributes.device_class===e)):i).find((t=>!Qt.includes(t.state)&&!Gt.includes(t.state)))}_average(t,e){const i=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states)[t].filter((t=>!e||t.attributes.device_class===e));if(!i)return;let s;const o=i.filter((t=>{return!(e=t.attributes,!(e.unit_of_measurement||e.state_class||(i||[]).includes(e.device_class||""))||isNaN(Number(t.state))||(s?t.attributes.unit_of_measurement!==s:(s=t.attributes.unit_of_measurement,0)));var e,i}));if(!o.length)return;return`${function(t,e,i){var s=e?function(t){switch(t.number_format){case pt.comma_decimal:return["en-US","en"];case pt.decimal_comma:return["de","es","it"];case pt.space_comma:return["fr","sv","cs"];case pt.system:return;default:return t.language}}(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==pt.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(s,wt(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,wt(t,i)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")}(o.reduce(((t,e)=>t+Number(e.state)),0)/o.length,this.hass.locale,{maximumFractionDigits:1})}${s?(n=s,a=this.hass.locale,"°"===n?"":a&&"%"===n?(t=>{switch(t.language){case"cs":case"de":case"fi":case"fr":case"sk":case"sv":return" ";default:return""}})(a):" "):""}${s||""}`;var n,a}hassSubscribe(){return[It(this.hass.connection,(t=>{this._areas=t})),(t=this.hass.connection,e=t=>{this._devices=t},Ct("_dr",Ht,Bt,t,e)),Wt(this.hass.connection,(t=>{this._entities=t}))];var t,e}getCardSize(){return 3}setConfig(t){if(!t.area)throw new Error("Area Required");this._config=t,this._deviceClasses=Object.assign({},oe),t.sensor_classes&&(this._deviceClasses.sensor=t.sensor_classes),t.alert_classes&&(this._deviceClasses.binary_sensor=t.alert_classes)}shouldUpdate(t){if(t.has("_config")||!this._config)return!0;if(t.has("_devicesInArea")||t.has("_areas")||t.has("_entities"))return!0;if(t.has("_showPopup"))return!0;if(!t.has("hass"))return!1;const e=t.get("hass");if(!e||e.themes!==this.hass.themes||e.locale!==this.hass.locale)return!0;if(!this._devices||!this._devicesInArea(this._config.area,this._devices)||!this._entities)return!1;const i=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states);for(const t of Object.values(i))for(const i of t)if(e.states[i.entity_id]!==i)return!0;return!1}render(){var t,e,i,s;if(!(this._config&&this.hass&&this._areas&&this._devices&&this._entities))return V;const o=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states),n=this._area(this._config.area,this._areas);return null===n?q`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `:q`
      <ha-card>
          <div class="icon-container">
            <ha-icon style=${(null===(t=this._config)||void 0===t?void 0:t.area_icon_color)?`color: var(--${this._config.area_icon_color}-color);`:V} icon=${this._config.area_icon||n.icon}></ha-icon>
          </div>
<div class="container" @click="${()=>this._handleClick()}">

          <div class="right">

          <div class="alerts">
            ${te.map((t=>t in o?this._deviceClasses[t].map((e=>{var i,s,n;const a=o[t].filter((t=>(t.attributes.device_class||"default")===e&&"on"===t.state)),r=null===(s=null===(i=this._config)||void 0===i?void 0:i.customization_alert)||void 0===s?void 0:s.find((t=>t.type===e)),c=null==r?void 0:r.color,l=null==r?void 0:r.icon,h=a.length;return h>0?q`
                      <div class="icon-with-count">
                        <ha-state-icon
                          class="alert" style=${c?`color: var(--${c}-color);`:(null===(n=this._config)||void 0===n?void 0:n.alert_color)?`color: ${this._config.alert_color};`:V}
                          .icon=${l||this._getIcon(t,h>0,e)}
                        ></ha-state-icon>
                        <span class="active-count  text-small${h>0?"on":"off"}">${h}</span>
                      </div>
                    `:V})):V))}
          </div>          

<div class="buttons">
  ${this._config.show_active?null===(e=this._config.toggle_domains)||void 0===e?void 0:e.map((t=>{var e,i,s;if(!(t in o))return V;const n=null===(i=null===(e=this._config)||void 0===e?void 0:e.customization_domain)||void 0===i?void 0:i.find((e=>e.type===t)),a=null==n?void 0:n.color,r=null==n?void 0:n.icon,c=o[t].filter((t=>!Qt.includes(t.state)&&!Gt.includes(t.state))).length;return c>0?q`
            <div class="icon-with-count hover">
              <ha-state-icon
                style=${a?`color: var(--${a}-color);`:(null===(s=this._config)||void 0===s?void 0:s.domain_color)?`color: ${this._config.domain_color};`:V}
                class=${c>0?"toggle-on":"toggle-off"}
                .domain=${t}
                .icon=${r||this._getIcon(t,c>0)}
                @click=${this._toggle}
              ></ha-state-icon>
              <span class="active-count text-small ${c>0?"on":"off"}">${c}</span>
            </div>
          `:V})):null===(i=this._config.toggle_domains)||void 0===i?void 0:i.map((t=>{var e,i,s;if(!(t in o))return V;const n=null===(i=null===(e=this._config)||void 0===e?void 0:e.customization_domain)||void 0===i?void 0:i.find((e=>e.type===t)),a=null==n?void 0:n.color,r=null==n?void 0:n.icon,c=o[t].filter((t=>!Qt.includes(t.state)&&!Gt.includes(t.state))).length;return q`
          <div class="icon-with-count hover">
            <ha-state-icon
              style=${a?`color: var(--${a}-color);`:(null===(s=this._config)||void 0===s?void 0:s.domain_color)?`color: ${this._config.domain_color};`:V}
              class=${c>0?"toggle-on":"toggle-off"}
              .domain=${t}
              .icon=${r||this._getIcon(t,c>0)}
              @click=${this._toggle}
            ></ha-state-icon>
            <span class="active-count text-small ${c>0?"on":"off"}">${c}</span>
          </div>
        `}))}
</div>
          </div>
          <div class="bottom">
            <div>
              <div style=${(null===(s=this._config)||void 0===s?void 0:s.area_name_color)?`color: var(--${this._config.area_name_color}-color);`:V} class="name text-large on">${this._config.area_name||n.name}</div>
              <div class="sensors">
                ${Xt.map((t=>{if(!(t in o))return V;const e=this._deviceClasses[t].map(((e,i,s)=>{var n,a,r;if(0===o[t].filter((t=>t.attributes.device_class===e)).length)return V;const c=this._average(t,e),l=null===(a=null===(n=this._config)||void 0===n?void 0:n.customization_sensor)||void 0===a?void 0:a.find((t=>t.type===e)),h=(null==l?void 0:l.color)||(null===(r=this._config)||void 0===r?void 0:r.sensor_color);return q`
                        <span
                          class="sensor-value"
                          style=${h?`color: var(--${h}-color);`:V}
                        >
                          ${i>0?" - ":""}${c}
                        </span>
                      `})).filter((t=>t!==V));return 0===e.length?V:q`
                    <div class="sensor text-medium off">
                      ${e}
                    </div>
                  `}))}
              </div>
            </div>
            <div class="climate text-small off">
            ${ee.map((t=>{if(!(t in o))return"";const e=o[t].filter((t=>{const e=t.attributes.hvac_action;return!Qt.includes(t.state)&&!Gt.includes(t.state)||e&&("idle"!==e||"off"===e)})).map((t=>`${t.attributes.temperature||"N/A"}°C`));return 0===e.length?"":q`
                (${e.join(", ")})
              `}))}
            </div>
          </div>
          </div>
        </div>
        ${(()=>(console.log("Render State:",this._showPopup),this._showPopup?this.renderPopup():V))()}
        

      </ha-card>
    `}updated(t){if(super.updated(t),!this._config||!this.hass)return;const e=t.get("hass"),i=t.get("_config");(!t.has("hass")||e&&e.themes===this.hass.themes)&&(!t.has("_config")||i&&i.theme===this._config.theme)||function(t,e,i,s){void 0===s&&(s=!1),t._themes||(t._themes={});var o=e.default_theme;("default"===i||i&&e.themes[i])&&(o=i);var n=$t({},t._themes);if("default"!==o){var a=e.themes[o];Object.keys(a).forEach((function(e){var i="--"+e;t._themes[i]="",n[i]=a[e]}))}if(t.updateStyles?t.updateStyles(n):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,n),s){var r=document.querySelector("meta[name=theme-color]");if(r){r.hasAttribute("default-content")||r.setAttribute("default-content",r.getAttribute("content"));var c=n["--primary-color"]||r.getAttribute("default-content");r.setAttribute("content",c)}}}(this,this.hass.themes,this._config.theme),t.has("_showPopup")&&this._showPopup&&this.renderPopup()}_handleNavigation(){this._config.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),xt(window,"location-changed",{replace:i})}(0,this._config.navigation_path)}_toggle(t){t.stopPropagation();const e=t.currentTarget.domain;"media_player"===e?this.hass.callService(e,this._isOn(e)?"media_pause":"media_play",void 0,{area_id:this._config.area}):"lock"===e?this.hass.callService(e,this._isOn(e)?"lock":"unlock",void 0,{area_id:this._config.area}):"vacuum"===e?this.hass.callService(e,this._isOn(e)?"stop":"start",void 0,{area_id:this._config.area}):ie.includes(e)&&this.hass.callService(e,this._isOn(e)?"turn_off":"turn_on",void 0,{area_id:this._config.area})}_getIcon(t,e,i){if(t in ne){const s=ne[t];if(i&&"object"==typeof s&&!s.on&&i in s)return s[i];if("object"==typeof s&&"on"in s&&"off"in s)return e?s.on:s.off}return""}_getDomainName(t){return"scene"===t?"Scene":this.hass.localize(`component.${t}.entity_component._.name`)}createCard(t){const e=document.createElement(`hui-${t.type}-card`);return e?(e.hass=this.hass,e.setConfig(t),e):q`<p>Invalid Configuration for card type: ${t.type}</p>`}_handleClick(){var t;(null===(t=this._config)||void 0===t?void 0:t.navigation_path)?this._handleNavigation():(this._showPopup=!0,this.requestUpdate())}_closeDialog(){this._showPopup=!1}renderPopup(){var t,e;const i=this._entitiesByArea(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this.hass.states),s=this._area(this._config.area,this._areas),o=(null===(t=this._config)||void 0===t?void 0:t.columns)?this._config.columns:4;return q`
      <ha-dialog id="more-info-dialog" style="--columns: ${o};" open @closed="${this._closeDialog}">
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${Yt}
            @click=${this._closeDialog}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${(null===(e=this._config)||void 0===e?void 0:e.area_name)||(null==s?void 0:s.name)}</h3>
          </div>
        </div>

        <div class="tile-container">
          ${Object.entries(i).map((([t,e])=>q`
            <div class="domain-group">
              <h4>${this._getDomainName(t)}</h4>
              <div class="domain-entities">
                ${e.map((e=>q`
                  <div class="entity-card">
                    ${this.createCard(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({type:"tile",entity:e.entity_id},"alarm_control_panel"===t&&{features:[{type:"alarm-modes",modes:["armed_home","armed_away","armed_night","armed_vacation","armed_custom_bypass","disarmed"]}]}),"light"===t&&{features:[{type:"light-brightness"}]}),"cover"===t&&{features:[{type:"cover-open-close"},{type:"cover-position"}]}),"vacuum"===t&&{features:[{type:"vacuum-commands",commands:["start_pause","stop","clean_spot","locate","return_home"]}]}),"climate"===t&&{features:[{type:"climate-hvac-modes",hvac_modes:["auto","heat_cool","heat","cool","dry","fan_only","off"]}]}),"media_player"===t&&{features:[{type:"media-player-volume-slider"}]}),"lock"===t&&{features:[{type:"lock-commands"}]}),"fan"===t&&{features:[{type:"fan-speed"}]}),"update"===t&&{features:[{type:"update-actions",backup:"ask"}]}))}
                  </div>
                `))}
              </div>
            </div>
          `))}
        </div>
      </ha-dialog>
    `}static get styles(){return n`
      ha-card {
        overflow: hidden;
        position: relative;
        background-size: cover;
        height: auto;
        min-height: 180px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .icon-container {
        position: absolute;
        top: 16px;
        left: 16px;
        font-size: 64px; 
        color: var(--primary-color);
      }
      .icon-container ha-icon {
        --mdc-icon-size: 60px;
        color: var(--sidebar-selected-icon-color);
      }    
      .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
      .right {
        display: flex;
        flex-direction: row; 
        justify-content: flex-end; 
        align-items: flex-start; 
        position: absolute;
        top: 8px;
        right: 8px;
        gap: 7px; 
      }
      .alerts {
        display: flex;
        flex-direction: column;
        align-items: center; 
        justify-content: center; 
        margin-right: -3px;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 2px; 
      }
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: absolute;
        bottom: 8px;
        left: 16px;
      }
      .name {
        font-weight: bold;
        margin-bottom: 8px;
      }
      .icon-with-count {
        display: flex;
        align-items: center; 
        gap: 5px; 
        background: none;
          border: solid 0.025rem rgba(var(--rgb-primary-text-color), 0.15);
          padding: 1px;
          border-radius: 5px;
          --mdc-icon-size: 20px;
      }
      .toggle-on {
        color: var(--primary-text-color);
      }
      .toggle-off {
        color: var(--secondary-text-color) !important;
      }          
      .off {
        color: var(--secondary-text-color);
      }            
      .navigate {
        cursor: pointer;
      }   
      .hover:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
      }    
      .text-small {
        font-size: 0.9em; 
      }
      .text-medium {
        font-size: 1em;
      }
      .text-large {
        font-size: 1.3em;
      }  
      .dialog-header { 
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        align-items: center;
      } 
      .dialog-header ha-icon-button { 
        margin-right: 10px;  
      }
      ha-dialog#more-info-dialog {
        --mdc-dialog-max-width: auto;
        width: 100%;
        max-width: 90vw; 
        overflow: hidden; 
      }

      .tile-container {
        display: flex;
        flex-direction: column; 
        gap: 16px; 
      }

      .domain-group {
        display: flex;
        flex-direction: column; 
        gap: 8px; 
      }

      .domain-group h4 {
        margin: 0;
        font-size: 1.2em;
      }

      .domain-entities {
        display: grid;
        grid-template-columns: repeat(var(--columns), 1fr);
        gap: 8px; 
      }

      .entity-card {
        width: 22.5vw;
      }

      @media (max-width: 768px) {
        ha-dialog#more-info-dialog {
          --columns: 1; 
          max-width: 100%;
          padding: 16px;
        }

        .domain-entities {
          grid-template-columns: 1fr; 
        }

        .entity-card {
          flex-basis: 100%; 
          width: 100%;
          overflow: hidden; 
        }
}


    `}};Jt([mt({attribute:!1})],ae.prototype,"hass",void 0),Jt([_t()],ae.prototype,"_config",void 0),Jt([_t()],ae.prototype,"_areas",void 0),Jt([_t()],ae.prototype,"_devices",void 0),Jt([_t()],ae.prototype,"_entities",void 0),Jt([_t()],ae.prototype,"_showPopup",void 0),ae=Jt([ht("custom-area-card")],ae);class re{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const{I:ce}=at,le=()=>document.createComment(""),he=(t,e,i)=>{const s=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=s.insertBefore(le(),o),n=s.insertBefore(le(),o);i=new ce(e,n,t,t.options)}else{const e=i._$AB.nextSibling,n=i._$AM,a=n!==t;if(a){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==n._$AU&&i._$AP(e)}if(e!==o||a){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;s.insertBefore(t,o),t=e}}}return i},de=(t,e,i=t)=>(t._$AI(e,i),t),ue={},me=t=>{t._$AP?.(!1,!0);let e=t._$AA;const i=t._$AB.nextSibling;for(;e!==i;){const t=e.nextSibling;e.remove(),e=t}},_e=(t,e,i)=>{const s=new Map;for(let o=e;o<=i;o++)s.set(t[o],o);return s},pe=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends re{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const o=[],n=[];let a=0;for(const e of t)o[a]=s?s(e,a):a,n[a]=i(e,a),a++;return{values:n,keys:o}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){const o=(t=>t._$AH)(t),{values:n,keys:a}=this.dt(e,i,s);if(!Array.isArray(o))return this.ut=a,n;const r=this.ut??=[],c=[];let l,h,d=0,u=o.length-1,m=0,_=n.length-1;for(;d<=u&&m<=_;)if(null===o[d])d++;else if(null===o[u])u--;else if(r[d]===a[m])c[m]=de(o[d],n[m]),d++,m++;else if(r[u]===a[_])c[_]=de(o[u],n[_]),u--,_--;else if(r[d]===a[_])c[_]=de(o[d],n[_]),he(t,c[_+1],o[d]),d++,_--;else if(r[u]===a[m])c[m]=de(o[u],n[m]),he(t,o[d],o[u]),u--,m++;else if(void 0===l&&(l=_e(a,m,_),h=_e(r,d,u)),l.has(r[d]))if(l.has(r[u])){const e=h.get(a[m]),i=void 0!==e?o[e]:null;if(null===i){const e=he(t,o[d]);de(e,n[m]),c[m]=e}else c[m]=de(i,n[m]),he(t,o[d],i),o[e]=null;m++}else me(o[u]),u--;else me(o[d]),d++;for(;m<=_;){const e=he(t,c[_+1]);de(e,n[m]),c[m++]=e}for(;d<=u;){const t=o[d++];null!==t&&me(t)}return this.ut=a,((t,e=ue)=>{t._$AH=e})(t,c),W}});var fe=function(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};class ge extends ct{constructor(){super(...arguments),this.SelectOptions=[],this._entityKeys=new WeakMap}_getKey(t){return this._entityKeys.has(t)||this._entityKeys.set(t,Math.random().toString()),this._entityKeys.get(t)}render(){return this.hass?q`
        <div class="customization">
          ${this.customization&&pe(this.customization,(t=>this._getKey(t)),((t,e)=>q`
                <div class="customize-item">
                  <ha-select
                    label="Customize"
                    name="Customize"
                    class="select-customization"
                    naturalMenuWidth
                    fixedMenuPosition
                    .value=${t.type}
                    @closed=${t=>t.stopPropagation()}
                    @value-changed=${this._valueChanged}
                  >
                    ${this.SelectOptions.map((t=>q`<mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>`))}
                  </ha-select>
  
                  <ha-icon-button
                    .label="Remove"
                    .path=${Yt}
                    class="remove-icon"
                    .index=${e}
                    @click=${this._removeRow}
                  ></ha-icon-button>
  
                  <ha-icon-button
                    .label="Edit"
                    .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}
                    class="edit-icon"
                    .index=${e}
                    @click="${this._editRow}"
                  ></ha-icon-button>
                </div>
              `))}
  
          <div class="add-item row">
            <ha-select
              label="Customize"
              name="Customize"
              class="add-customization"
              naturalMenuWidth
              fixedMenuPosition
              @closed=${t=>t.stopPropagation()}
              @click=${this._addRow}
            >
              ${this.SelectOptions.map((t=>q`<mwc-list-item .value=${t.value}>${t.label}</mwc-list-item>`))}
            </ha-select>
          </div>
        </div>
      `:V}_valueChanged(t){if(!this.customization||!this.hass)return;const e=t.detail.value,i=t.target.index,s=this.customization.concat();s[i]=Object.assign(Object.assign({},s[i]),{type:e||""}),Kt(this,this.customizationChangedEvent,s)}_removeRow(t){t.stopPropagation();const e=t.currentTarget.index;if(null!=e){const t=this.customization.concat();t.splice(e,1),Kt(this,this.customizationChangedEvent,t)}}_editRow(t){t.stopPropagation();const e=t.target.index;null!=e&&Kt(this,"edit-item",e)}_addRow(t){if(t.stopPropagation(),!this.customization||!this.hass)return;const e=this.shadowRoot.querySelector(".add-customization");if(!e||!e.value)return;const i={type:e.value};Kt(this,this.customizationChangedEvent,[...this.customization,i]),e.value=""}static get styles(){return n`
        .customize-item, .add-item {
          display: flex;
          align-items: center;
        }
        .add-customization, .select-customization {
          padding-right: 8px;
          width: 100%;
          margin-top: 8px;
        }
        .remove-icon, .edit-icon {
          --mdc-icon-button-size: 36px;
          color: var(--secondary-text-color);
        }
      `}}fe([mt({attribute:!1})],ge.prototype,"hass",void 0),fe([mt({type:Array})],ge.prototype,"SelectOptions",void 0);let ve=class extends ge{constructor(){super(...arguments),this.customizationChangedEvent="config-changed"}get customization(){return this.customization_domain}};fe([mt({attribute:!1})],ve.prototype,"customization_domain",void 0),ve=fe([ht("domain-items-editor")],ve);let be=class extends ge{constructor(){super(...arguments),this.customizationChangedEvent="config-changed"}get customization(){return this.customization_alert}};fe([mt({attribute:!1})],be.prototype,"customization_alert",void 0),be=fe([ht("alert-items-editor")],be);let ye=class extends ge{constructor(){super(...arguments),this.customizationChangedEvent="config-changed"}get customization(){return this.customization_sensor}};fe([mt({attribute:!1})],ye.prototype,"customization_sensor",void 0),ye=fe([ht("sensor-items-editor")],ye);var $e=function(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Ae=class extends ct{constructor(){super(...arguments),this.useSensorSchema=!1,this._schema=yt((()=>[{name:"color",selector:{ui_color:{default_color:"state",include_state:!0}}},{name:"icon",selector:{icon:{}}}])),this._schemasensor=yt((()=>[{name:"color",selector:{ui_color:{default_color:"state",include_state:!0}}}]))}render(){if(!this.hass||!this.config)return q``;const t=this.useSensorSchema?this._schemasensor():this._schema(),e=Object.assign({},this._config);return q`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `}_valueChangedSchema(t){if(!this.config)return;const e=Object.assign(Object.assign({},this.config),t.detail.value);this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:e}))}static get styles(){return n`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
    `}};$e([mt({attribute:!1})],Ae.prototype,"config",void 0),$e([mt({attribute:!1})],Ae.prototype,"hass",void 0),$e([mt({type:Boolean})],Ae.prototype,"useSensorSchema",void 0),$e([_t()],Ae.prototype,"_config",void 0),Ae=$e([ht("item-editor")],Ae);var we=function(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a},xe=function(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{c(s.next(t))}catch(t){n(t)}}function r(t){try{c(s.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}c((s=s.apply(t,e||[])).next())}))};let Se=class extends ct{constructor(){super(...arguments),this._subElementEditorDomain=void 0,this._subElementEditorAlert=void 0,this._subElementEditorSensor=void 0,this._schema=yt((()=>[{name:"area",selector:{area:{}}},{name:"icon_appearance",flatten:!0,type:"expandable",icon:"mdi:palette",schema:[{name:"area_icon",selector:{icon:{}}},{name:"area_icon_color",selector:{ui_color:{default_color:"state",include_state:!0}}}]},{name:"name_appearance",flatten:!0,type:"expandable",icon:"mdi:palette",schema:[{name:"area_name",selector:{text:{}}},{name:"area_name_color",selector:{ui_color:{default_color:"state",include_state:!0}}}]},{name:"",type:"grid",schema:[{name:"navigation_path",required:!1,selector:{navigation:{}}},{name:"theme",required:!1,selector:{theme:{}}}]}])),this._binaryschema=yt((t=>[{name:"alert_classes",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:t}}},{name:"alert_color",selector:{ui_color:{default_color:"state",include_state:!0}}}])),this._sensorschema=yt((t=>[{name:"sensor_classes",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:t}}},{name:"sensor_color",selector:{ui_color:{default_color:"state",include_state:!0}}}])),this._toggleschema=yt((t=>[{name:"show_active",selector:{boolean:{}}},{name:"toggle_domains",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:t}}},{name:"domain_color",selector:{ui_color:{default_color:"state",include_state:!0}}}])),this._popupschema=yt((t=>[{name:"columns",selector:{number:{min:1,max:4,mode:"box"}}},{name:"popup_settings",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:t}}},{name:"hidden_entities",selector:{entity:{multiple:!0}}},{name:"hide_unavailable",selector:{boolean:{}}}])),this._binaryClassesForArea=yt((t=>this._classesForArea(t,"binary_sensor"))),this._sensorClassesForArea=yt(((t,e)=>this._classesForArea(t,"sensor",e))),this._toggleDomainsForArea=yt((t=>this._classesForArea(t,"toggle"))),this._allDomainsForArea=yt((t=>this._classesForArea(t,"all"))),this._buildBinaryOptions=yt(((t,e)=>this._buildOptions("binary_sensor",t,e))),this._buildSensorOptions=yt(((t,e)=>this._buildOptions("sensor",t,e))),this._buildToggleOptions=yt(((t,e)=>this._buildOptions("toggle",t,e))),this._buildAllOptions=yt(((t,e)=>this._buildOptions("all",t,e))),this._computeLabelCallback=t=>{switch(t.name){case"theme":return`${this.hass.localize("ui.panel.lovelace.editor.card.generic.theme")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`;case"area":return this.hass.localize("ui.panel.lovelace.editor.card.area.name");case"navigation_path":return this.hass.localize("ui.panel.lovelace.editor.action-editor.navigation_path");case"aspect_ratio":return this.hass.localize("ui.panel.lovelace.editor.card.generic.aspect_ratio");case"area_name":return this.hass.localize("ui.panel.lovelace.editor.card.generic.name");case"area_icon":return this.hass.localize("ui.panel.lovelace.editor.card.generic.icon");case"icon_appearance":return this.hass.localize("ui.panel.lovelace.editor.card.generic.icon")+" "+this.hass.localize("ui.panel.lovelace.editor.card.tile.appearance");case"name_appearance":return this.hass.localize("ui.panel.lovelace.editor.card.generic.name")+" "+this.hass.localize("ui.panel.lovelace.editor.card.tile.appearance");case"toggle_domains":return this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain");case"popup_settings":return"Popup Settings";case"hide_unavailable":return this.hass.localize("ui.common.hide")+" "+this.hass.localize("state.default.unavailable");case"show_active":return this.hass.localize("ui.common.hide")+" "+this.hass.localize("ui.components.entity.entity-state-picker.state")+" "+this.hass.localize("component.binary_sensor.entity_component._.state.off");case"color":case"icon_tap_action":case"show_entity_picture":case"vertical":case"hide_state":case"state_content":case"appearance":case"interactions":return this.hass.localize(`ui.panel.lovelace.editor.card.tile.${t.name}`);default:return this.hass.localize(`ui.panel.lovelace.editor.card.area.${t.name}`)}}}firstUpdated(){var t,e;return xe(this,void 0,void 0,(function*(){customElements.get("ha-form")&&customElements.get("hui-action-editor")||null===(t=customElements.get("hui-button-card"))||void 0===t||t.getConfigElement(),customElements.get("ha-entity-picker")||null===(e=customElements.get("hui-entities-card"))||void 0===e||e.getConfigElement()}))}_classesForArea(t,e,i){let s;if("toggle"===e)return s=Object.values(this.hass.entities).filter((e=>{var i;return ie.includes(At(e.entity_id))&&!e.hidden&&(e.area_id===t||e.device_id&&(null===(i=this.hass.devices[e.device_id])||void 0===i?void 0:i.area_id)===t)})),[...new Set(s.map((t=>At(t.entity_id))))];if("all"===e)return s=Object.values(this.hass.entities).filter((e=>{var i;return!e.hidden&&(e.area_id===t||e.device_id&&(null===(i=this.hass.devices[e.device_id])||void 0===i?void 0:i.area_id)===t)})),[...new Set(s.map((t=>At(t.entity_id))))];{s=Object.values(this.hass.entities).filter((i=>{var s;return At(i.entity_id)===e&&!i.entity_category&&!i.hidden&&(i.area_id===t||i.device_id&&(null===(s=this.hass.devices[i.device_id])||void 0===s?void 0:s.area_id)===t)}));const o=s.map((t=>{var e;return(null===(e=this.hass.states[t.entity_id])||void 0===e?void 0:e.attributes.device_class)||""})).filter((t=>t&&("sensor"!==e||!i||i.includes(t))));return[...new Set(o)]}}_buildOptions(t,e,i){const s=[...new Set([...e,...i])].map((e=>({value:e,label:"toggle"===t||"all"===t?this.hass.localize(`component.${e}.entity_component._.name`)||e:this.hass.localize(`component.${t}.entity_component.${e}.name`)||e})));return s.sort(((t,e)=>((t,e,i)=>(null===Intl||void 0===Intl?void 0:Intl.Collator)?Mt(i).compare(t,e):Nt(t.toLowerCase(),e.toLowerCase()))(t.label,e.label,this.hass.locale.language))),s}setConfig(t){this._config=Object.assign(Object.assign({},t),{customization_domain:t.customization_domain||[],customization_alert:t.customization_alert||[],customization_sensor:t.customization_sensor||[]})}updated(t){const e=Object.create(null,{updated:{get:()=>super.updated}});return xe(this,void 0,void 0,(function*(){if(e.updated.call(this,t),this.hass&&this._config){if(t.has("_config")){const e=t.get("_config"),i=null==e?void 0:e.area,s=this._config.area;if(i!==s&&void 0!==i){const t=this._toggleDomainsForArea(s),e=this._allDomainsForArea(s),i=t.sort(((t,e)=>ie.indexOf(t)-ie.indexOf(e))),o=e.sort(((t,e)=>se.indexOf(t)-se.indexOf(e)));this._config.toggle_domains=[...i],this._config.popup_settings=[...o],this.requestUpdate()}}if(!this._numericDeviceClasses){const{numeric_device_classes:t}=yield(i=this.hass,Ot(void 0,void 0,void 0,(function*(){return Ut||(Ut=i.callWS({type:"sensor/numeric_device_classes"}),Ut)})));this._numericDeviceClasses=t}var i}}))}_valueChanged(t){this._config=t.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_editItem(t,e){if(t.stopPropagation(),!this._config||!this.hass)return;const i=t.detail;this[`_subElementEditor${e}`]={index:i}}_edit_itemDomain(t){this._editItem(t,"Domain")}_edit_itemAlert(t){this._editItem(t,"Alert")}_edit_itemSensor(t){this._editItem(t,"Sensor")}_customizationChanged(t,e){t.stopPropagation(),this._config&&this.hass&&Kt(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{[`customization_${e}`]:t.detail})})}_customizationChangedDomain(t){this._customizationChanged(t,"domain")}_customizationChangedAlert(t){this._customizationChanged(t,"alert")}_customizationChangedSensor(t){this._customizationChanged(t,"sensor")}_renderSubElementEditor(t,e,i){var s,o,n,a;const r=this[`_subElementEditor${t.charAt(0).toUpperCase()+t.slice(1)}`],c="sensor"===t;return q`
    <div class="header">
      <div class="back-title">
        <mwc-icon-button @click=${e}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </mwc-icon-button>
      </div>
    </div>
    <item-editor
      .hass=${this.hass}
      .config=${null!==(a=null===(o=null===(s=this._config)||void 0===s?void 0:s[`customization_${t}`])||void 0===o?void 0:o[null!==(n=null==r?void 0:r.index)&&void 0!==n?n:0])&&void 0!==a?a:{}}
      .useSensorSchema=${c} 
      @config-changed=${i}
    >
    </item-editor>
  `}_renderSubElementEditorDomain(){return this._renderSubElementEditor("domain",this._goBackDomain,this._itemChangedDomain)}_renderSubElementEditorAlert(){return this._renderSubElementEditor("alert",this._goBackAlert,this._itemChangedAlert)}_renderSubElementEditorSensor(){return this._renderSubElementEditor("sensor",this._goBackSensor,this._itemChangedSensor)}_goBackDomain(){this._subElementEditorDomain=void 0}_goBackAlert(){this._subElementEditorAlert=void 0}_goBackSensor(){this._subElementEditorSensor=void 0}_itemChanged(t,e,i){if(t.stopPropagation(),!this._config||!this.hass)return;const s=null==e?void 0:e.index;if(null!=s){const e=[...this._config[i]];e[s]=t.detail,Kt(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{[i]:e})})}}_itemChangedDomain(t){this._itemChanged(t,this._subElementEditorDomain,"customization_domain")}_itemChangedAlert(t){this._itemChanged(t,this._subElementEditorAlert,"customization_alert")}_itemChangedSensor(t){this._itemChanged(t,this._subElementEditorSensor,"customization_sensor")}get toggleSelectOptions(){var t;return this._buildToggleOptions(this._toggleDomainsForArea(this._config.area||""),(null===(t=this._config)||void 0===t?void 0:t.toggle_domains)||this._toggleDomainsForArea(this._config.area||""))}get AllSelectOptions(){var t;return this._buildAllOptions(this._allDomainsForArea(this._config.area||""),(null===(t=this._config)||void 0===t?void 0:t.popup_settings)||this._allDomainsForArea(this._config.area||""))}get binarySelectOptions(){var t;return this._buildBinaryOptions(this._binaryClassesForArea(this._config.area||""),(null===(t=this._config)||void 0===t?void 0:t.alert_classes)||this._binaryClassesForArea(this._config.area||""))}get sensorSelectOptions(){var t;return this._buildSensorOptions(this._sensorClassesForArea(this._config.area||""),(null===(t=this._config)||void 0===t?void 0:t.sensor_classes)||this._sensorClassesForArea(this._config.area||""))}render(){if(!this.hass||!this._config)return V;const t=this._toggleDomainsForArea(this._config.area||""),e=this._allDomainsForArea(this._config.area||""),i=this._schema(),s=this._binaryschema(this.binarySelectOptions),o=this._sensorschema(this.sensorSelectOptions),n=this._toggleschema(this.toggleSelectOptions),a=this._popupschema(this.AllSelectOptions),r=Object.assign({alert_classes:oe.binary_sensor,sensor_classes:oe.sensor,toggle_domains:t,popup_settings:e},this._config);return this._subElementEditorDomain?this._renderSubElementEditorDomain():this._subElementEditorAlert?this._renderSubElementEditorAlert():this._subElementEditorSensor?this._renderSubElementEditorSensor():q`
      <ha-form
        .hass=${this.hass}
        .data=${r}
        .schema=${i}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Zt}></ha-svg-icon>
          ${this._computeLabelCallback({name:"alert_classes"})}
        </div>
        <div class="content">
          <ha-form
          .hass=${this.hass}
          .data=${r}
          .schema=${s}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          ></ha-form>
          <alert-items-editor
            .hass=${this.hass}
            .customization_alert=${this._config.customization_alert}
            .SelectOptions=${this.binarySelectOptions}
            @edit-item=${this._edit_itemAlert}
            @config-changed=${this._customizationChangedAlert}>
          </alert-items-editor>          
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Zt}></ha-svg-icon>
          ${this._computeLabelCallback({name:"sensor_classes"})}
        </div>
        <div class="content">
          <ha-form
          .hass=${this.hass}
          .data=${r}
          .schema=${o}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          ></ha-form>
          <sensor-items-editor
            .hass=${this.hass}
            .customization_sensor=${this._config.customization_sensor}
            .SelectOptions=${this.sensorSelectOptions}
            @edit-item=${this._edit_itemSensor}
            @config-changed=${this._customizationChangedSensor}>
          </sensor-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main" .name="toggle_domains">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Zt}></ha-svg-icon>
            ${this._computeLabelCallback({name:"toggle_domains"})}
        </div>
        <div class="content">
          <ha-form
          .hass=${this.hass}
          .data=${r}
          .schema=${n}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          ></ha-form>
          <domain-items-editor
            .hass=${this.hass}
            .customization_domain=${this._config.customization_domain}
            .SelectOptions=${this.toggleSelectOptions}
            @edit-item=${this._edit_itemDomain}
            @config-changed=${this._customizationChangedDomain}>
          </domain-items-editor>
        </div>
      </ha-expansion-panel>      
   
      <ha-expansion-panel outlined class="main" .name="popup_settings">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${Zt}></ha-svg-icon>
            ${this._computeLabelCallback({name:"popup_settings"})}
        </div>
        <div class="content">
          <ha-form
            .hass=${this.hass}
            .data=${r}
            .schema=${a}
            .computeLabel=${this._computeLabelCallback}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>
      </ha-expansion-panel>     
    `}};Se.styles=n`
  :host {
    display: block;
  }
  select {
    padding: 5px;
    font-size: 14px;
  } 
  ha-svg-icon {
    color: var(--secondary-text-color);
  }
  .main {
    --ha-card-border-radius: 6px;
    border-radius: 6px;
    margin-top: 24px;
  }   
  ha-svg-icon {
    color: var(--secondary-text-color);
  }
`,we([mt({attribute:!1})],Se.prototype,"hass",void 0),we([_t()],Se.prototype,"_config",void 0),we([_t()],Se.prototype,"_numericDeviceClasses",void 0),we([_t()],Se.prototype,"_subElementEditorDomain",void 0),we([_t()],Se.prototype,"_subElementEditorAlert",void 0),we([_t()],Se.prototype,"_subElementEditorSensor",void 0),Se=we([ht("custom-area-card-editor")],Se),console.info("%c AREA-CARD %c 0.0.1 ","color: steelblue; background: black; font-weight: bold;","color: white ; background: dimgray; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"custom-area-card",name:"Custom Area Card",preview:!0,description:"A custom card to display area information."})})();
//# sourceMappingURL=custom-area-card.js.map