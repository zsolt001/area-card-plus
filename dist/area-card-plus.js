/*! For license information please see area-card-plus.js.LICENSE.txt */
(()=>{"use strict";const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}}const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce(((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1]),e[0]);return new o(s,e,i)},a=(i,s)=>{if(t)i.adoptedStyleSheets=s.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const t of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,p=globalThis,_=p.trustedTypes,f=_?_.emptyScript:"",g=p.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;class A extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return s?.call(this)},set(t){const n=s?.call(this);o.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...d(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return a(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=s,this[s]=o.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){if(i??=this.constructor.getPropertyOptions(e),!(i.hasChanged??y)(this[e],t))return;this.P(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e)!0!==i.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],i)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach((e=>this._$EC(e,this[e]))),this._$EU()}updated(e){}firstUpdated(e){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[v("elementProperties")]=new Map,A[v("finalized")]=new Map,g?.({ReactiveElement:A}),(p.reactiveElementVersions??=[]).push("2.0.4");const w=globalThis,x=w.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,O=`<${z}>`,P=document,k=()=>P.createComment(""),D=e=>null===e||"object"!=typeof e&&"function"!=typeof e,M=Array.isArray,j=e=>M(e)||"function"==typeof e?.[Symbol.iterator],H="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,R=/>/g,U=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,I=/"/g,F=/^(?:script|style|textarea|title)$/i,B=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),V=B(1),q=(B(2),B(3),Symbol.for("lit-noChange")),W=Symbol.for("lit-nothing"),K=new WeakMap,Z=P.createTreeWalker(P,129);function Y(e,t){if(!M(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",a=L;for(let t=0;t<i;t++){const i=e[t];let r,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===L?"!--"===l[1]?a=N:void 0!==l[1]?a=R:void 0!==l[2]?(F.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=U):void 0!==l[3]&&(a=U):a===U?">"===l[0]?(a=o??L,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?U:'"'===l[3]?I:T):a===I||a===T?a=U:a===N||a===R?a=L:(a=U,o=void 0);const d=a===U&&e[t+1].startsWith("/>")?" ":"";n+=a===L?i+O:c>=0?(s.push(r),i.slice(0,c)+C+i.slice(c)+E+d):i+E+(-2===c?t:d)}return[Y(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Q{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const a=e.length-1,r=this.parts,[l,c]=J(e,t);if(this.el=Q.createElement(l,i),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=Z.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=c[n++],i=s.getAttribute(e).split(E),a=/([.?@])?(.*)/.exec(t);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?ie:"?"===a[1]?se:"@"===a[1]?oe:te}),s.removeAttribute(e)}else e.startsWith(E)&&(r.push({type:6,index:o}),s.removeAttribute(e));if(F.test(s.tagName)){const e=s.textContent.split(E),t=e.length-1;if(t>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],k()),Z.nextNode(),r.push({type:2,index:++o});s.append(e[t],k())}}}else if(8===s.nodeType)if(s.data===z)r.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(E,e+1));)r.push({type:7,index:o}),e+=E.length-1}o++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function G(e,t,i=e,s){if(t===q)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=D(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=G(e,o._$AS(e,t.values),o,s)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);Z.currentNode=s;let o=Z.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new ee(o,o.nextSibling,this,e):1===r.type?t=new r.ctor(o,r.name,r.strings,this,e):6===r.type&&(t=new ne(o,this,e)),this._$AV.push(t),r=i[++a]}n!==r?.index&&(o=Z.nextNode(),n++)}return Z.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),D(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):j(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new X(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new Q(e)),t}k(e){M(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new ee(this.O(k()),this.O(k()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=G(this,e,t,0),n=!D(e)||e!==this._$AH&&e!==q,n&&(this._$AH=e);else{const s=e;let a,r;for(e=o[0],a=0;a<o.length-1;a++)r=G(this,s[i+a],t,a),r===q&&(r=this._$AH[a]),n||=!D(r)||r!==this._$AH[a],r===W?e=W:e!==W&&(e+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class oe extends te{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??W)===q)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const ae={M:C,P:E,A:z,C:1,L:J,R:X,D:j,V:G,I:ee,H:te,N:se,U:oe,B:ie,F:ne},re=w.litHtmlPolyfillSupport;re?.(Q,ee),(w.litHtmlVersions??=[]).push("3.2.1");class le extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new ee(t.insertBefore(k(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}le._$litElement$=!0,le.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:le});const ce=globalThis.litElementPolyfillSupport;ce?.({LitElement:le}),(globalThis.litElementVersions??=[]).push("4.1.1");const he=e=>(t,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)},de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ue=(e=de,t,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),n.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e)},init(t){return void 0!==t&&this.P(s,void 0,e),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e)}}throw Error("Unsupported decorator location: "+s)};function me(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,s?{...e,wrapped:!0}:e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function pe(e){return me({...e,state:!0,attribute:!1})}var _e,fe,ge,ve=Number.isNaN||function(e){return"number"==typeof e&&e!=e};function be(e,t){if(e.length!==t.length)return!1;for(var i=0;i<e.length;i++)if(!((s=e[i])===(o=t[i])||ve(s)&&ve(o)))return!1;var s,o;return!0}function ye(e,t){void 0===t&&(t=be);var i=null;function s(){for(var s=[],o=0;o<arguments.length;o++)s[o]=arguments[o];if(i&&i.lastThis===this&&t(s,i.lastArgs))return i.lastResult;var n=e.apply(this,s);return i={lastResult:n,lastArgs:s,lastThis:this},n}return s.clear=function(){i=null},s}function $e(){return($e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s])}return e}).apply(this,arguments)}function Ae(e){return e.substr(0,e.indexOf("."))}(ge=_e||(_e={})).language="language",ge.system="system",ge.comma_decimal="comma_decimal",ge.decimal_comma="decimal_comma",ge.space_comma="space_comma",ge.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(fe||(fe={}));var we=function(e,t){var i=$e({maximumFractionDigits:2},t);if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var s=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=s,i.maximumFractionDigits=s}return i},xe=(new Set(["fan","input_boolean","light","switch","group","automation"]),function(e,t,i,s){s=s||{},i=null==i?{}:i;var o=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,e.dispatchEvent(o),o}),Se=(new Set(["call-service","divider","section","weblink","cast","select"]),function(e,t,i){var s;return void 0===i&&(i=!1),function(){var o=[].slice.call(arguments),n=this,a=i&&!s;clearTimeout(s),s=setTimeout((function(){s=null,i||e.apply(n,o)}),t),a&&e.apply(n,o)}});const Ce=e=>{let t=[];function i(i,s){e=s?i:Object.assign(Object.assign({},e),i);let o=t;for(let t=0;t<o.length;t++)o[t](e)}return{get state(){return e},action(t){function s(e){i(e,!1)}return function(){let i=[e];for(let e=0;e<arguments.length;e++)i.push(arguments[e]);let o=t.apply(this,i);if(null!=o)return o instanceof Promise?o.then(s):s(o)}},setState:i,subscribe:e=>(t.push(e),()=>{!function(e){let i=[];for(let s=0;s<t.length;s++)t[s]===e?e=null:i.push(t[s]);t=i}(e)})}},Ee=(e,t,i,s,o)=>((e,t,i,s)=>{if(e[t])return e[t];let o,n=0,a=Ce();const r=()=>i(e).then((e=>a.setState(e,!0))),l=()=>r().catch((t=>{if(e.connected)throw t}));return e[t]={get state(){return a.state},refresh:r,subscribe(t){n++,1===n&&(s&&(o=s(e,a)),e.addEventListener("ready",l),l());const i=a.subscribe(t);return void 0!==a.state&&setTimeout((()=>t(a.state)),0),()=>{i(),n--,n||(o&&o.then((e=>{e()})),e.removeEventListener("ready",r))}}},e[t]})(s,e,t,i).subscribe(o);var ze=function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function a(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,r)}l((s=s.apply(e,t||[])).next())}))};var Oe,Pe,ke,De,Me;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Oe||(Oe={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Pe||(Pe={})),function(e){e.local="local",e.server="server"}(ke||(ke={})),function(e){e.language="language",e.system="system",e.DMY="DMY",e.MDY="MDY",e.YMD="YMD"}(De||(De={})),function(e){e.language="language",e.monday="monday",e.tuesday="tuesday",e.wednesday="wednesday",e.thursday="thursday",e.friday="friday",e.saturday="saturday",e.sunday="sunday"}(Me||(Me={}));const je=ye((e=>new Intl.Collator(e))),He=ye((e=>new Intl.Collator(e,{sensitivity:"accent"}))),Le=(e,t)=>e<t?-1:e>t?1:0;let Ne;const Re=e=>e.sendMessagePromise({type:"config/area_registry/list"}).then((e=>e.sort(((e,t)=>((e,t)=>(null===Intl||void 0===Intl?void 0:Intl.Collator)?je(void 0).compare(e,t):Le(e,t))(e.name,t.name))))),Ue=(e,t)=>e.subscribeEvents(Se((()=>Re(e).then((e=>t.setState(e,!0)))),500,!0),"area_registry_updated"),Te=(e,t)=>Ee("_areaRegistry",Re,Ue,e,t),Ie=e=>e.sendMessagePromise({type:"config/device_registry/list"}),Fe=(e,t)=>e.subscribeEvents(Se((()=>Ie(e).then((e=>t.setState(e,!0)))),500,!0),"device_registry_updated"),Be=e=>e.sendMessagePromise({type:"config/entity_registry/list"}),Ve=(e,t)=>e.subscribeEvents(Se((()=>Be(e).then((e=>t.setState(e,!0)))),500,!0),"entity_registry_updated"),qe=(e,t)=>Ee("_entityRegistry",Be,Ve,e,t),We=e=>{class t extends e{connectedCallback(){super.connectedCallback(),this._checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const e=this.__unsubs.pop();e instanceof Promise?e.then((e=>e())):e()}this.__unsubs=void 0}}updated(e){if(super.updated(e),e.has("hass"))this._checkSubscribed();else if(this.hassSubscribeRequiredHostProps)for(const t of e.keys())if(this.hassSubscribeRequiredHostProps.includes(t))return void this._checkSubscribed()}hassSubscribe(){return[]}_checkSubscribed(){var e;void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&!(null===(e=this.hassSubscribeRequiredHostProps)||void 0===e?void 0:e.some((e=>void 0===this[e])))&&(this.__unsubs=this.hassSubscribe())}}return function(e,t,i,s){var o,n=arguments.length,a=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);n>3&&a&&Object.defineProperty(t,i,a)}([me({attribute:!1})],t.prototype,"hass",void 0),t};function Ke(e,t,i){const s=new CustomEvent(t,{bubbles:!1,composed:!1,detail:i});e.dispatchEvent(s)}var Ze="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",Ye=function(e,t,i,s){var o,n=arguments.length,a=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};const Je=["unavailable","unknown"],Qe=["closed","locked","off","docked","idle","standby","paused","auto","not_home","disarmed"],Ge=["sensor"],Xe=["binary_sensor"],et=["climate"],tt=["light","switch","fan","media_player","lock","vacuum"],it=["alarm_control_panel","siren","light","switch","media_player","climate","air_quality","humdifier","vacuum","lawn_mower","cover","lock","camera","fan","valve","water_heater","person","calendar","remote","scene","device_tracker","update","notifications","binary_sensor","sensor","script","tags","select","automation","button","number","conversation","assist_satellite","counter","event","group","image","image_processing","input_boolean","input_datetime","input_number","input_select","input_text","stt","sun","text","date","datetime","time","timer","todo","tts","wake_word","weather","zone","geo_location"],st={sensor:["temperature","humidity"],binary_sensor:["motion","window"]},ot={light:{on:"mdi:lightbulb-multiple",off:"mdi:lightbulb-multiple-off"},switch:{on:"mdi:toggle-switch",off:"mdi:toggle-switch-off"},fan:{on:"mdi:fan",off:"mdi:fan-off"},climate:{on:"mdi:fan",off:"mdi:fan-off"},media_player:{on:"mdi:cast",off:"mdi:cast-off"},lock:{on:"mdi:lock",off:"mdi:lock-open"},vacuum:{on:"mdi:robot-vacuum",off:"mdi:robot-vacuum-off"},binary_sensor:{motion:"mdi:motion-sensor",moisture:"mdi:water-alert",window:"mdi:window-open",door:"mdi:door-open",lock:"mdi:lock",presence:"mdi:home",occupancy:"mdi:seat",vibration:"mdi:vibrate",opening:"mdi:shield-lock-open",garage_door:"mdi:garage-open",problem:"mdi:alert-circle",smoke:"mdi:smoke-detector"}};let nt=class extends(We(le)){constructor(){super(...arguments),this._showPopup=!1,this._deviceClasses=st,this._entitiesByDomain=ye(((e,t,i,s,o)=>{var n;const a=(null===(n=this._config)||void 0===n?void 0:n.hidden_entities)||[],r=i.filter((i=>!i.hidden_by&&(i.area_id?i.area_id===e:i.device_id&&t.has(i.device_id)))).map((e=>e.entity_id)).filter((e=>!a.includes(e))),l={};for(const e of r){const t=Ae(e);if(!(tt.includes(t)||Ge.includes(t)||Xe.includes(t)||et.includes(t)))continue;const i=o[e];i&&(!Xe.includes(t)&&!Ge.includes(t)||s[t].includes(i.attributes.device_class||""))&&(t in l||(l[t]=[]),l[t].push(i))}return l})),this._entitiesByArea=ye(((e,t,i,s)=>{var o,n,a;const r=(null===(o=this._config)||void 0===o?void 0:o.popup_domains)||[],l=(null===(n=this._config)||void 0===n?void 0:n.hidden_entities)||[],c=(null===(a=this._config)||void 0===a?void 0:a.extra_entities)||[],h=i.filter((i=>!i.hidden_by&&(i.area_id?i.area_id===e:i.device_id&&t.has(i.device_id)))).map((e=>e.entity_id)).filter((e=>!l.includes(e))).filter((e=>{var t,i;return!(null===(t=this._config)||void 0===t?void 0:t.hide_unavailable)||!Je.includes(null===(i=s[e])||void 0===i?void 0:i.state)})),d={};for(const e of h){const t=Ae(e);if(r.length>0&&!r.includes(t))continue;const i=s[e];i&&(t in d||(d[t]=[]),d[t].push(i))}for(const e of c){const t=Ae(e);t in d||(d[t]=[]);const i=s[e];i&&d[t].push(i)}const u=r.length>0?r:it,m=Object.entries(d).sort((([e],[t])=>{const i=u.indexOf(e),s=u.indexOf(t);return(-1===i?u.length:i)-(-1===s?u.length:s)})).reduce(((e,[t,i])=>{const s=i.sort(((e,t)=>{const i=e.state,s=t.state,o=e=>Qe.includes(e)||Je.includes(e)?Qe.includes(e)&&!Je.includes(e)?1:2:0,n=o(i),a=o(s);return n!==a?n-a:e.entity_id.localeCompare(t.entity_id)}));return e[t]=s,e}),{});return m})),this._area=ye(((e,t)=>t.find((t=>t.area_id===e))||null)),this._devicesInArea=ye(((e,t)=>new Set(e?t.filter((t=>t.area_id===e)).map((e=>e.id)):[])))}static getConfigElement(){return document.createElement("area-card-plus-editor")}static getStubConfig(e){var t;return function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function a(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,r)}l((s=s.apply(e,t||[])).next())}))}(this,void 0,void 0,(function*(){const i=yield(s=e.connection,o=Te,ze(void 0,void 0,void 0,(function*(){return new Promise((e=>{const t=o(s,(i=>{t(),e(i)}))}))})));var s,o;return{type:"custom:area-card-plus",area:(null===(t=i[0])||void 0===t?void 0:t.area_id)||""}}))}_isOn(e,t){const i=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states)[e];if(i)return(t?i.filter((e=>e.attributes.device_class===t)):i).find((e=>!Je.includes(e.state)&&!Qe.includes(e.state)))}_average(e,t){const i=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states)[e].filter((e=>!t||e.attributes.device_class===t));if(!i)return;let s;const o=i.filter((e=>{return!(t=e.attributes,!(t.unit_of_measurement||t.state_class||(i||[]).includes(t.device_class||""))||isNaN(Number(e.state))||(s?e.attributes.unit_of_measurement!==s:(s=e.attributes.unit_of_measurement,0)));var t,i}));if(!o.length)return;return`${function(e,t,i){var s=t?function(e){switch(e.number_format){case _e.comma_decimal:return["en-US","en"];case _e.decimal_comma:return["de","es","it"];case _e.space_comma:return["fr","sv","cs"];case _e.system:return;default:return e.language}}(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==_e.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(s,we(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,we(e,i)).format(Number(e))}return"string"==typeof e?e:function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)}(e,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")}(o.reduce(((e,t)=>e+Number(t.state)),0)/o.length,this.hass.locale,{maximumFractionDigits:1})}${s?(n=s,a=this.hass.locale,"°"===n?"":a&&"%"===n?(e=>{switch(e.language){case"cs":case"de":case"fi":case"fr":case"sk":case"sv":return" ";default:return""}})(a):" "):""}${s||""}`;var n,a}hassSubscribe(){return[Te(this.hass.connection,(e=>{this._areas=e})),(e=this.hass.connection,t=e=>{this._devices=e},Ee("_dr",Ie,Fe,e,t)),qe(this.hass.connection,(e=>{this._entities=e}))];var e,t}getCardSize(){return 3}setConfig(e){if(!e.area)throw new Error("Area Required");this._config=e,this._deviceClasses=Object.assign({},st),e.sensor_classes&&(this._deviceClasses.sensor=e.sensor_classes),e.alert_classes&&(this._deviceClasses.binary_sensor=e.alert_classes)}shouldUpdate(e){if(e.has("_config")||!this._config)return!0;if(e.has("_devicesInArea")||e.has("_areas")||e.has("_entities"))return!0;if(e.has("_showPopup"))return!0;if(!e.has("hass"))return!1;const t=e.get("hass");if(!t||t.themes!==this.hass.themes||t.locale!==this.hass.locale)return!0;if(!this._devices||!this._devicesInArea(this._config.area,this._devices)||!this._entities)return!1;const i=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states);for(const e of Object.values(i))for(const i of e)if(t.states[i.entity_id]!==i)return!0;return!1}render(){var e,t,i,s,o,n;if(!(this._config&&this.hass&&this._areas&&this._devices&&this._entities))return W;const a=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states),r=this._area(this._config.area,this._areas);return null===r?V`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `:V`
      <ha-card>
          <div class="icon-container">
            <ha-icon style=${(null===(e=this._config)||void 0===e?void 0:e.area_icon_color)?`color: var(--${this._config.area_icon_color}-color);`:W} icon=${this._config.area_icon||r.icon}></ha-icon>
          </div>
<div class="container" @click="${()=>this._handleClick()}">

          <div class="right">

          <div class="alerts">
            ${Xe.map((e=>e in a?this._deviceClasses[e].map((t=>{var i,s,o;const n=a[e].filter((e=>(e.attributes.device_class||"default")===t&&"on"===e.state)),r=null===(s=null===(i=this._config)||void 0===i?void 0:i.customization_alert)||void 0===s?void 0:s.find((e=>e.type===t)),l=null==r?void 0:r.color,c=null==r?void 0:r.icon,h=n.length;return h>0?V`
                      <div class="icon-with-count" @click=${i=>this._toggle(i,e,t)}>
                        <ha-state-icon
                          class="alert" style=${l?`color: var(--${l}-color);`:(null===(o=this._config)||void 0===o?void 0:o.alert_color)?`color: ${this._config.alert_color};`:W}
                          .icon=${c||this._getIcon(e,h>0,t)}
                        ></ha-state-icon>
                        <span class="active-count  text-small${h>0?"on":"off"}">${h}</span>
                      </div>
                    `:W})):W))}
          </div>          

          <div class="buttons">
            ${this._config.show_active?null===(t=this._config.toggle_domains)||void 0===t?void 0:t.map((e=>{var t,i,s;if(!(e in a))return W;if("climate"===e)return W;const o=null===(i=null===(t=this._config)||void 0===t?void 0:t.customization_domain)||void 0===i?void 0:i.find((t=>t.type===e)),n=null==o?void 0:o.color,r=null==o?void 0:o.icon,l=a[e].filter((e=>!Je.includes(e.state)&&!Qe.includes(e.state))).length;return l>0?V`
                    <div
                      class="icon-with-count hover"
                      @click=${t=>this._toggle(t,e)}

                    >
                      <ha-state-icon
                        style=${n?`color: var(--${n}-color);`:(null===(s=this._config)||void 0===s?void 0:s.domain_color)?`color: ${this._config.domain_color};`:W}
                        class=${l>0?"toggle-on":"toggle-off"}
                        .domain=${e}
                        .icon=${r||this._getIcon(e,l>0)}
                      ></ha-state-icon>
                      <span class="active-count text-small ${l>0?"on":"off"}">
                        ${l}
                      </span>
                    </div>
                  `:W})):null===(i=this._config.toggle_domains)||void 0===i?void 0:i.map((e=>{var t,i,s;if(!(e in a))return W;if("climate"===e)return W;const o=null===(i=null===(t=this._config)||void 0===t?void 0:t.customization_domain)||void 0===i?void 0:i.find((t=>t.type===e)),n=null==o?void 0:o.color,r=null==o?void 0:o.icon,l=a[e].filter((e=>!Je.includes(e.state)&&!Qe.includes(e.state))).length;return V`
                  <div
                    class="icon-with-count hover"
                    @click=${t=>this._toggle(t,e)}
                  >
                    <ha-state-icon
                      style=${n?`color: var(--${n}-color);`:(null===(s=this._config)||void 0===s?void 0:s.domain_color)?`color: ${this._config.domain_color};`:W}
                      class=${l>0?"toggle-on":"toggle-off"}
                      .domain=${e}
                      .icon=${r||this._getIcon(e,l>0)}
                    ></ha-state-icon>
                    <span class="active-count text-small ${l>0?"on":"off"}">
                      ${l}
                    </span>
                  </div>
                `}))}
          </div>

          </div>
          <div class="bottom">
            <div>
              <div style=${(null===(s=this._config)||void 0===s?void 0:s.area_name_color)?`color: var(--${this._config.area_name_color}-color);`:W} class="name text-large on">${this._config.area_name||r.name}</div>
              <div class="sensors">
                ${Ge.map((e=>{if(!(e in a))return W;const t=this._deviceClasses[e].map(((t,i,s)=>{var o,n,r;if(0===a[e].filter((e=>e.attributes.device_class===t)).length)return W;const l=this._average(e,t),c=null===(n=null===(o=this._config)||void 0===o?void 0:o.customization_sensor)||void 0===n?void 0:n.find((e=>e.type===t)),h=(null==c?void 0:c.color)||(null===(r=this._config)||void 0===r?void 0:r.sensor_color);return V`
                        <span
                          class="sensor-value" @click=${i=>this._toggle(i,e,t)}
                          style=${h?`color: var(--${h}-color);`:W}
                        >
                          ${i>0?" - ":""}${l}
                        </span>
                      `})).filter((e=>e!==W));return 0===t.length?W:V`
                    <div class="sensor text-medium off">
                      ${t}
                    </div>
                  `}))}
              </div>
            </div>
            <div class="climate text-small off" >
            ${(null===(n=null===(o=this._config)||void 0===o?void 0:o.toggle_domains)||void 0===n?void 0:n.includes("climate"))?et.map((e=>{if(!(e in a))return"";const t=a[e].filter((e=>{const t=e.attributes.hvac_action;return!Je.includes(e.state)&&!Qe.includes(e.state)||t&&("idle"!==t||"off"===t)})).map((e=>`${e.attributes.temperature||"N/A"}°C`));return 0===t.length?"":V`
                <div class="climate" @click=${t=>this._toggle(t,e)}>
                  (${t.join(", ")})
                </div>
              `})):""}
            
            </div>
          </div>
          </div>
        </div>
        ${(()=>this._showPopup?this.renderPopup():W)()}
        

      </ha-card>
    `}updated(e){if(super.updated(e),!this._config||!this.hass)return;const t=e.get("hass"),i=e.get("_config");(!e.has("hass")||t&&t.themes===this.hass.themes)&&(!e.has("_config")||i&&i.theme===this._config.theme)||function(e,t,i,s){void 0===s&&(s=!1),e._themes||(e._themes={});var o=t.default_theme;("default"===i||i&&t.themes[i])&&(o=i);var n=$e({},e._themes);if("default"!==o){var a=t.themes[o];Object.keys(a).forEach((function(t){var i="--"+t;e._themes[i]="",n[i]=a[t]}))}if(e.updateStyles?e.updateStyles(n):window.ShadyCSS&&window.ShadyCSS.styleSubtree(e,n),s){var r=document.querySelector("meta[name=theme-color]");if(r){r.hasAttribute("default-content")||r.setAttribute("default-content",r.getAttribute("content"));var l=n["--primary-color"]||r.getAttribute("default-content");r.setAttribute("content",l)}}}(this,this.hass.themes,this._config.theme),e.has("_showPopup")&&this._showPopup&&this.renderPopup()}_handleNavigation(){this._config.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),xe(window,"location-changed",{replace:i})}(0,this._config.navigation_path)}_toggle(e,t,i){var s,o,n,a,r,l;e.stopPropagation();const c=null===(o=null===(s=this._config)||void 0===s?void 0:s.customization_domain)||void 0===o?void 0:o.find((e=>e.type===t)),h=null==c?void 0:c.tap_action,d=null===(a=null===(n=this._config)||void 0===n?void 0:n.customization_alert)||void 0===a?void 0:a.find((e=>e.type===i)),u=null==d?void 0:d.tap_action,m=null===(l=null===(r=this._config)||void 0===r?void 0:r.customization_sensor)||void 0===l?void 0:l.find((e=>e.type===i)),p=null==m?void 0:m.tap_action;if("toggle"===h)"media_player"===t?this.hass.callService(t,this._isOn(t)?"media_pause":"media_play",void 0,{area_id:this._config.area}):"lock"===t?this.hass.callService(t,this._isOn(t)?"lock":"unlock",void 0,{area_id:this._config.area}):"vacuum"===t?this.hass.callService(t,this._isOn(t)?"stop":"start",void 0,{area_id:this._config.area}):tt.includes(t)&&this.hass.callService(t,this._isOn(t)?"turn_off":"turn_on",void 0,{area_id:this._config.area});else if("popup"===h||void 0===h)"binary_sensor"!==t&&"sensor"!==t&&"climate"!==t&&this._showPopupForDomain(t),"climate"===t&&"popup"===h&&this._showPopupForDomain(t);else if("none"===h)return;if("popup"===u||void 0===u)"binary_sensor"===t&&this._showPopupForDomain(t,i);else if("none"===u)return;if("popup"===p)"sensor"===t&&this._showPopupForDomain(t,i);else if("none"===p||void 0===p)return}_showPopupForDomain(e,t){this._selectedDomain=e,this._selectedDeviceClass=t,this._showPopup=!0,this.updateComplete.then((()=>{this.requestUpdate()}))}_getIcon(e,t,i){if(e in ot){const s=ot[e];if(i&&"object"==typeof s&&!s.on&&i in s)return s[i];if("object"==typeof s&&"on"in s&&"off"in s)return t?s.on:s.off}return""}_getDomainName(e,t){return"scene"===e?"Scene":"binary_sensor"!==e&&"sensor"!==e||!t?this.hass.localize(`component.${e}.entity_component._.name`):this.hass.localize(`component.${e}.entity_component.${t}.name`)}createCard(e){const t=document.createElement(`hui-${e.type}-card`);return t?(t.hass=this.hass,t.setConfig(e),t):V`<p>Invalid Configuration for card type: ${e.type}</p>`}_handleClick(){var e;(null===(e=this._config)||void 0===e?void 0:e.navigation_path)?this._handleNavigation():(this._showPopup=!0,this._selectedDomain=void 0,this._selectedDeviceClass=void 0,this.requestUpdate())}_closeDialog(){this._showPopup=!1}renderPopup(){var e,t;const i=this._entitiesByArea(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this.hass.states),s=this._area(this._config.area,this._areas);let o=(null===(e=this._config)||void 0===e?void 0:e.columns)?this._config.columns:4;const n=this._selectedDeviceClass?{[this._selectedDomain]:(i[this._selectedDomain]||[]).filter((e=>e.attributes.device_class===this._selectedDeviceClass))}:this._selectedDomain?{[this._selectedDomain]:i[this._selectedDomain]||[]}:i;let a=0;return Object.entries(n).forEach((([e,t])=>{const i=t.length;i>a&&(a=i)})),o=1===a?1:2===a?Math.min(o,2):3===a?Math.min(o,3):Math.min(o,4),this.style.setProperty("--columns",o.toString()),V`
      <ha-dialog id="more-info-dialog" style="--columns: ${o};" open @closed="${this._closeDialog}">
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${Ze}
            @click=${this._closeDialog}
            .label=${this.hass.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${(null===(t=this._config)||void 0===t?void 0:t.area_name)||(null==s?void 0:s.name)}</h3>
          </div>
        </div>
  
        <div class="tile-container">
          ${Object.entries(n).map((([e,t])=>V`
            <div class="domain-group">
              <h4>
                ${"binary_sensor"===e||"sensor"===e?this._getDomainName(e,this._selectedDeviceClass):this._getDomainName(e)}
              </h4>
              <div class="domain-entities">
                ${t.map((t=>V`
                  <div class="entity-card">
                    ${this.createCard(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({type:"tile",entity:t.entity_id},"alarm_control_panel"===e&&{features:[{type:"alarm-modes",modes:["armed_home","armed_away","armed_night","armed_vacation","armed_custom_bypass","disarmed"]}]}),"light"===e&&{features:[{type:"light-brightness"}]}),"cover"===e&&{features:[{type:"cover-open-close"},{type:"cover-position"}]}),"vacuum"===e&&{features:[{type:"vacuum-commands",commands:["start_pause","stop","clean_spot","locate","return_home"]}]}),"climate"===e&&{features:[{type:"climate-hvac-modes",hvac_modes:["auto","heat_cool","heat","cool","dry","fan_only","off"]}]}),"media_player"===e&&{features:[{type:"media-player-volume-slider"}]}),"lock"===e&&{features:[{type:"lock-commands"}]}),"fan"===e&&{features:[{type:"fan-speed"}]}),"update"===e&&{features:[{type:"update-actions",backup:"ask"}]}))}
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
        --mdc-dialog-max-width: calc(22.5vw * var(--columns) + 3vw); }
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


    `}};Ye([me({attribute:!1})],nt.prototype,"hass",void 0),Ye([pe()],nt.prototype,"_config",void 0),Ye([pe()],nt.prototype,"_areas",void 0),Ye([pe()],nt.prototype,"_devices",void 0),Ye([pe()],nt.prototype,"_entities",void 0),Ye([pe()],nt.prototype,"_showPopup",void 0),nt=Ye([he("area-card-plus")],nt);class at{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:rt}=ae,lt=()=>document.createComment(""),ct=(e,t,i)=>{const s=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=s.insertBefore(lt(),o),n=s.insertBefore(lt(),o);i=new rt(t,n,e,e.options)}else{const t=i._$AB.nextSibling,n=i._$AM,a=n!==e;if(a){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==n._$AU&&i._$AP(t)}if(t!==o||a){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;s.insertBefore(e,o),e=t}}}return i},ht=(e,t,i=e)=>(e._$AI(t,i),e),dt={},ut=e=>{e._$AP?.(!1,!0);let t=e._$AA;const i=e._$AB.nextSibling;for(;t!==i;){const e=t.nextSibling;t.remove(),t=e}},mt=(e,t,i)=>{const s=new Map;for(let o=t;o<=i;o++)s.set(e[o],o);return s},pt=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends at{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let s;void 0===i?i=t:void 0!==t&&(s=t);const o=[],n=[];let a=0;for(const t of e)o[a]=s?s(t,a):a,n[a]=i(t,a),a++;return{values:n,keys:o}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,s]){const o=(e=>e._$AH)(e),{values:n,keys:a}=this.dt(t,i,s);if(!Array.isArray(o))return this.ut=a,n;const r=this.ut??=[],l=[];let c,h,d=0,u=o.length-1,m=0,p=n.length-1;for(;d<=u&&m<=p;)if(null===o[d])d++;else if(null===o[u])u--;else if(r[d]===a[m])l[m]=ht(o[d],n[m]),d++,m++;else if(r[u]===a[p])l[p]=ht(o[u],n[p]),u--,p--;else if(r[d]===a[p])l[p]=ht(o[d],n[p]),ct(e,l[p+1],o[d]),d++,p--;else if(r[u]===a[m])l[m]=ht(o[u],n[m]),ct(e,o[d],o[u]),u--,m++;else if(void 0===c&&(c=mt(a,m,p),h=mt(r,d,u)),c.has(r[d]))if(c.has(r[u])){const t=h.get(a[m]),i=void 0!==t?o[t]:null;if(null===i){const t=ct(e,o[d]);ht(t,n[m]),l[m]=t}else l[m]=ht(i,n[m]),ct(e,o[d],i),o[t]=null;m++}else ut(o[u]),u--;else ut(o[d]),d++;for(;m<=p;){const t=ct(e,l[p+1]);ht(t,n[m]),l[m++]=t}for(;d<=u;){const e=o[d++];null!==e&&ut(e)}return this.ut=a,((e,t=dt)=>{e._$AH=t})(e,l),q}});var _t=function(e,t,i,s){var o,n=arguments.length,a=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};class ft extends le{constructor(){super(...arguments),this.SelectOptions=[],this._entityKeys=new WeakMap}_getKey(e){return this._entityKeys.has(e)||this._entityKeys.set(e,Math.random().toString()),this._entityKeys.get(e)}render(){return this.hass?V`
        <div class="customization">
          ${this.customization&&pt(this.customization,(e=>this._getKey(e)),((e,t)=>V`
                <div class="customize-item">
                  <ha-select
                    label=${this.hass.localize("ui.panel.lovelace.editor.features.edit")}
                    name="Customize"
                    class="select-customization"
                    naturalMenuWidth
                    fixedMenuPosition
                    .value=${e.type}
                    @closed=${e=>e.stopPropagation()}
                    @value-changed=${this._valueChanged}
                  >
                    ${this.SelectOptions.map((e=>V`<mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`))}
                  </ha-select>
  
                  <ha-icon-button
                    .label="Remove"
                    .path=${Ze}
                    class="remove-icon"
                    .index=${t}
                    @click=${this._removeRow}
                  ></ha-icon-button>
  
                  <ha-icon-button
                    .label="Edit"
                    .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}
                    class="edit-icon"
                    .index=${t}
                    @click="${this._editRow}"
                  ></ha-icon-button>
                </div>
              `))}
  
          <div class="add-item row">
            <ha-select
              label=${this.hass.localize("ui.panel.lovelace.editor.features.add")}
              name="Customize"
              class="add-customization"
              naturalMenuWidth
              fixedMenuPosition
              @closed=${e=>e.stopPropagation()}
              @click=${this._addRow}
            >
              ${this.SelectOptions.map((e=>V`<mwc-list-item .value=${e.value}>${e.label}</mwc-list-item>`))}
            </ha-select>
          </div>
        </div>
      `:W}_valueChanged(e){if(!this.customization||!this.hass)return;const t=e.detail.value,i=e.target.index,s=this.customization.concat();s[i]=Object.assign(Object.assign({},s[i]),{type:t||""}),Ke(this,this.customizationChangedEvent,s)}_removeRow(e){e.stopPropagation();const t=e.currentTarget.index;if(null!=t){const e=this.customization.concat();e.splice(t,1),Ke(this,this.customizationChangedEvent,e)}}_editRow(e){e.stopPropagation();const t=e.target.index;null!=t&&Ke(this,"edit-item",t)}_addRow(e){if(e.stopPropagation(),!this.customization||!this.hass)return;const t=this.shadowRoot.querySelector(".add-customization");if(!t||!t.value)return;const i={type:t.value};Ke(this,this.customizationChangedEvent,[...this.customization,i]),t.value=""}static get styles(){return n`
        .customization {
          margin-top: 16px;
        }
        .customize-item, .add-item {
          display: flex;
          align-items: center;
        }
        .add-customization, .select-customization {        
          width: 100%;
          margin-top: 8px;
        }
        .remove-icon, .edit-icon {
          --mdc-icon-button-size: 36px;
          color: var(--secondary-text-color);
          padding-left: 4px;
        }
      `}}_t([me({attribute:!1})],ft.prototype,"hass",void 0),_t([me({type:Array})],ft.prototype,"SelectOptions",void 0);let gt=class extends ft{constructor(){super(...arguments),this.customizationChangedEvent="config-changed"}get customization(){return this.customization_domain}};_t([me({attribute:!1})],gt.prototype,"customization_domain",void 0),gt=_t([he("domain-items-editor")],gt);let vt=class extends ft{constructor(){super(...arguments),this.customizationChangedEvent="config-changed"}get customization(){return this.customization_alert}};_t([me({attribute:!1})],vt.prototype,"customization_alert",void 0),vt=_t([he("alert-items-editor")],vt);let bt=class extends ft{constructor(){super(...arguments),this.customizationChangedEvent="config-changed"}get customization(){return this.customization_sensor}};_t([me({attribute:!1})],bt.prototype,"customization_sensor",void 0),bt=_t([he("sensor-items-editor")],bt);var yt=function(e,t,i,s){var o,n=arguments.length,a=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let $t=class extends le{constructor(){super(...arguments),this.useSensorSchema=!1,this._schemadomain=ye((()=>[{name:"tap_action",selector:{select:{options:[{label:"None",value:"none"},{label:"Toggle",value:"toggle"},{label:"Popup",value:"popup"}]}}},{name:"color",selector:{ui_color:{default_color:"state",include_state:!0}}},{name:"icon",selector:{icon:{}}}])),this._schemaalert=ye((()=>[{name:"tap_action",selector:{select:{options:[{label:"None",value:"none"},{label:"Popup",value:"popup"}]}}},{name:"color",selector:{ui_color:{default_color:"state",include_state:!0}}},{name:"icon",selector:{icon:{}}}])),this._schemasensor=ye((()=>[{name:"tap_action",selector:{select:{options:[{label:"None",value:"none"},{label:"Popup",value:"popup"}]}}},{name:"color",selector:{ui_color:{default_color:"state",include_state:!0}}}])),this._computeLabelCallback=e=>{switch(e.name){case"icon":return this.hass.localize("ui.panel.lovelace.editor.card.generic.icon");case"color":return this.hass.localize("ui.panel.lovelace.editor.card.tile.color");case"enable_popup_view":return this.hass.localize("ui.common.enable")+" "+this.hass.localize("ui.panel.lovelace.editor.action-editor.actions.more-info");case"disable_toggle_action":return this.hass.localize("ui.common.disable")+" "+this.hass.localize("ui.panel.lovelace.editor.card.generic.tap_action");case"tap_action":return this.hass.localize("ui.panel.lovelace.editor.card.generic.tap_action");default:return this.hass.localize(`ui.panel.lovelace.editor.card.area.${e.name}`)}}}render(){if(!this.hass||!this.config)return V``;let e;switch(this.getSchema){case"sensor":e=this._schemasensor();break;case"domain":e=this._schemadomain();break;case"alert":e=this._schemaalert()}const t=Object.assign({},this._config);return V`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${e}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `}_valueChangedSchema(e){if(!this.config)return;const t=Object.assign(Object.assign({},this.config),e.detail.value);this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:t}))}static get styles(){return n`
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
    `}};yt([me({attribute:!1})],$t.prototype,"config",void 0),yt([me({attribute:!1})],$t.prototype,"hass",void 0),yt([me({type:Boolean})],$t.prototype,"useSensorSchema",void 0),yt([pe()],$t.prototype,"getSchema",void 0),yt([pe()],$t.prototype,"_config",void 0),$t=yt([he("item-editor")],$t);var At=function(e,t,i,s){var o,n=arguments.length,a=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,s);else for(var r=e.length-1;r>=0;r--)(o=e[r])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a},wt=function(e,t,i,s){return new(i||(i=Promise))((function(o,n){function a(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(a,r)}l((s=s.apply(e,t||[])).next())}))};let xt=class extends le{constructor(){super(...arguments),this._subElementEditorDomain=void 0,this._subElementEditorAlert=void 0,this._subElementEditorSensor=void 0,this._schema=ye((()=>[{name:"area",selector:{area:{}}},{name:"",type:"grid",schema:[{name:"navigation_path",required:!1,selector:{navigation:{}}},{name:"theme",required:!1,selector:{theme:{}}}]},{name:"appearance",flatten:!0,type:"expandable",icon:"mdi:palette",schema:[{name:"area_icon",selector:{icon:{}}},{name:"area_icon_color",selector:{ui_color:{default_color:"state",include_state:!0}}},{name:"area_name",selector:{text:{}}},{name:"area_name_color",selector:{ui_color:{default_color:"state",include_state:!0}}}]}])),this._binaryschema=ye((e=>[{name:"alert_classes",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:e}}},{name:"alert_color",selector:{ui_color:{default_color:"state",include_state:!0}}}])),this._sensorschema=ye((e=>[{name:"sensor_classes",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:e}}},{name:"sensor_color",selector:{ui_color:{default_color:"state",include_state:!0}}}])),this._toggleschema=ye((e=>[{name:"toggle_domains",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:e}}},{name:"domain_color",selector:{ui_color:{default_color:"state",include_state:!0}}},{name:"show_active",selector:{boolean:{}}}])),this._popupschema=ye((e=>[{name:"columns",selector:{number:{min:1,max:4,mode:"box"}}},{name:"popup_domains",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:e}}},{name:"hidden_entities",selector:{entity:{multiple:!0}}},{name:"extra_entities",selector:{entity:{multiple:!0}}},{name:"hide_unavailable",selector:{boolean:{}}}])),this._binaryClassesForArea=ye((e=>this._classesForArea(e,"binary_sensor"))),this._sensorClassesForArea=ye(((e,t)=>this._classesForArea(e,"sensor",t))),this._toggleDomainsForArea=ye((e=>this._classesForArea(e,"toggle"))),this._allDomainsForArea=ye((e=>this._classesForArea(e,"all"))),this._buildBinaryOptions=ye(((e,t)=>this._buildOptions("binary_sensor",e,t))),this._buildSensorOptions=ye(((e,t)=>this._buildOptions("sensor",e,t))),this._buildToggleOptions=ye(((e,t)=>this._buildOptions("toggle",e,t))),this._buildAllOptions=ye(((e,t)=>this._buildOptions("all",e,t))),this._computeLabelCallback=e=>{switch(e.name){case"theme":return`${this.hass.localize("ui.panel.lovelace.editor.card.generic.theme")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`;case"area":return this.hass.localize("ui.panel.lovelace.editor.card.area.name");case"navigation_path":return this.hass.localize("ui.panel.lovelace.editor.action-editor.navigation_path");case"area_name":return this.hass.localize("ui.panel.lovelace.editor.card.area.name")+" "+this.hass.localize("ui.panel.lovelace.editor.card.generic.name");case"area_icon":return this.hass.localize("ui.panel.lovelace.editor.card.area.name")+" "+this.hass.localize("ui.panel.lovelace.editor.card.generic.icon");case"area_name_color":return this.hass.localize("ui.panel.lovelace.editor.card.area.name")+" "+this.hass.localize("ui.panel.lovelace.editor.card.generic.name")+" "+this.hass.localize("ui.panel.lovelace.editor.card.tile.color");case"area_icon_color":return this.hass.localize("ui.panel.lovelace.editor.card.area.name")+" "+this.hass.localize("ui.panel.lovelace.editor.card.generic.icon")+" "+this.hass.localize("ui.panel.lovelace.editor.card.tile.color");case"alert_color":case"sensor_color":case"domain_color":return this.hass.localize("ui.panel.lovelace.editor.card.tile.color");case"columns":return this.hass.localize("ui.components.grid-size-picker.columns");case"appearance":return this.hass.localize("ui.panel.lovelace.editor.card.tile.appearance");case"toggle_domains":return this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain");case"popup":return"Popup";case"popup_domains":return"Popup "+this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain");case"extra_entities":return this.hass.localize("ui.common.add")+" "+this.hass.localize("ui.panel.lovelace.editor.card.generic.entities")+":";case"hidden_entities":return this.hass.localize("ui.common.hide")+" "+this.hass.localize("ui.panel.lovelace.editor.card.generic.entities")+":";case"hide_unavailable":return this.hass.localize("ui.common.hide")+" "+this.hass.localize("state.default.unavailable");case"show_active":return this.hass.localize("ui.common.hide")+" "+this.hass.localize("ui.components.entity.entity-state-picker.state")+" "+this.hass.localize("component.binary_sensor.entity_component._.state.off");default:return this.hass.localize(`ui.panel.lovelace.editor.card.area.${e.name}`)}}}firstUpdated(){var e,t;return wt(this,void 0,void 0,(function*(){customElements.get("ha-form")&&customElements.get("hui-action-editor")||null===(e=customElements.get("hui-button-card"))||void 0===e||e.getConfigElement(),customElements.get("ha-entity-picker")||null===(t=customElements.get("hui-entities-card"))||void 0===t||t.getConfigElement()}))}_classesForArea(e,t,i){var s;let o;if("toggle"===t)return o=Object.values(this.hass.entities).filter((t=>{var i;return(tt.includes(Ae(t.entity_id))||et.includes(Ae(t.entity_id)))&&!t.hidden&&(t.area_id===e||t.device_id&&(null===(i=this.hass.devices[t.device_id])||void 0===i?void 0:i.area_id)===e)})),[...new Set(o.map((e=>Ae(e.entity_id))))];if("all"===t){const t=(null===(s=this._config)||void 0===s?void 0:s.extra_entities)||[];let i=Object.values(this.hass.entities).filter((t=>{var i;return!t.hidden&&(t.area_id===e||t.device_id&&(null===(i=this.hass.devices[t.device_id])||void 0===i?void 0:i.area_id)===e)}));const o=t.map((e=>this.hass.states[e])).filter((e=>void 0!==e));return i=[...i,...o],[...new Set(i.map((e=>Ae(e.entity_id))))]}{o=Object.values(this.hass.entities).filter((i=>{var s;return Ae(i.entity_id)===t&&!i.entity_category&&!i.hidden&&(i.area_id===e||i.device_id&&(null===(s=this.hass.devices[i.device_id])||void 0===s?void 0:s.area_id)===e)}));const s=o.map((e=>{var t;return(null===(t=this.hass.states[e.entity_id])||void 0===t?void 0:t.attributes.device_class)||""})).filter((e=>e&&("sensor"!==t||!i||i.includes(e))));return[...new Set(s)]}}_buildOptions(e,t,i){const s=[...new Set([...t,...i])].map((t=>({value:t,label:"scene"===t?"Scene":"toggle"===e||"all"===e?this.hass.localize(`component.${t}.entity_component._.name`)||t:this.hass.localize(`component.${e}.entity_component.${t}.name`)||t})));return s.sort(((e,t)=>((e,t,i)=>(null===Intl||void 0===Intl?void 0:Intl.Collator)?He(i).compare(e,t):Le(e.toLowerCase(),t.toLowerCase()))(e.label,t.label,this.hass.locale.language))),s}setConfig(e){this._config=Object.assign(Object.assign({},e),{columns:e.columns||4,customization_domain:e.customization_domain||[],customization_alert:e.customization_alert||[],customization_sensor:e.customization_sensor||[]})}updated(e){const t=Object.create(null,{updated:{get:()=>super.updated}});return wt(this,void 0,void 0,(function*(){if(t.updated.call(this,e),this.hass&&this._config){if(e.has("_config")){const t=e.get("_config"),i=null==t?void 0:t.area,s=this._config.area,o=(null==t?void 0:t.extra_entities)||[],n=this._config.extra_entities||[],a=o.length!==n.length||!o.every((e=>n.includes(e)));if(i!==s){const e=this._toggleDomainsForArea(s),t=this._allDomainsForArea(s),i=e.sort(((e,t)=>tt.indexOf(e)-tt.indexOf(t))),o=t.sort(((e,t)=>it.indexOf(e)-it.indexOf(t)));this._config.toggle_domains=[...i],this._config.popup_domains=[...o],this.requestUpdate()}if(a){for(const e of n){const t=Ae(e);this._config.popup_domains.includes(t)||this._config.popup_domains.push(t)}this.requestUpdate()}}if(!this._numericDeviceClasses){const{numeric_device_classes:e}=yield(i=this.hass,ze(void 0,void 0,void 0,(function*(){return Ne||(Ne=i.callWS({type:"sensor/numeric_device_classes"}),Ne)})));this._numericDeviceClasses=e}var i}}))}_valueChanged(e){this._config=e.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_editItem(e,t){if(e.stopPropagation(),!this._config||!this.hass)return;const i=e.detail;this[`_subElementEditor${t}`]={index:i}}_edit_itemDomain(e){this._editItem(e,"Domain")}_edit_itemAlert(e){this._editItem(e,"Alert")}_edit_itemSensor(e){this._editItem(e,"Sensor")}_customizationChanged(e,t){e.stopPropagation(),this._config&&this.hass&&Ke(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{[`customization_${t}`]:e.detail})})}_customizationChangedDomain(e){this._customizationChanged(e,"domain")}_customizationChangedAlert(e){this._customizationChanged(e,"alert")}_customizationChangedSensor(e){this._customizationChanged(e,"sensor")}_renderSubElementEditor(e,t,i){var s,o,n,a;const r=this[`_subElementEditor${e.charAt(0).toUpperCase()+e.slice(1)}`];return V`
      <div class="header">
        <div class="back-title">
          <mwc-icon-button @click=${t}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </mwc-icon-button>
        </div>
      </div>
      <item-editor
        .hass=${this.hass}
        .config=${null!==(a=null===(o=null===(s=this._config)||void 0===s?void 0:s[`customization_${e}`])||void 0===o?void 0:o[null!==(n=null==r?void 0:r.index)&&void 0!==n?n:0])&&void 0!==a?a:{}}
        .getSchema=${e} 
        @config-changed=${i}
      >
      </item-editor>
    `}_renderSubElementEditorDomain(){return this._renderSubElementEditor("domain",this._goBackDomain,this._itemChangedDomain)}_renderSubElementEditorAlert(){return this._renderSubElementEditor("alert",this._goBackAlert,this._itemChangedAlert)}_renderSubElementEditorSensor(){return this._renderSubElementEditor("sensor",this._goBackSensor,this._itemChangedSensor)}_goBackDomain(){this._subElementEditorDomain=void 0}_goBackAlert(){this._subElementEditorAlert=void 0}_goBackSensor(){this._subElementEditorSensor=void 0}_itemChanged(e,t,i){if(e.stopPropagation(),!this._config||!this.hass)return;const s=null==t?void 0:t.index;if(null!=s){const t=[...this._config[i]];t[s]=e.detail,Ke(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{[i]:t})})}}_itemChangedDomain(e){this._itemChanged(e,this._subElementEditorDomain,"customization_domain")}_itemChangedAlert(e){this._itemChanged(e,this._subElementEditorAlert,"customization_alert")}_itemChangedSensor(e){this._itemChanged(e,this._subElementEditorSensor,"customization_sensor")}get toggleSelectOptions(){var e;return this._buildToggleOptions(this._toggleDomainsForArea(this._config.area||""),(null===(e=this._config)||void 0===e?void 0:e.toggle_domains)||this._toggleDomainsForArea(this._config.area||""))}get AllSelectOptions(){var e;return this._buildAllOptions(this._allDomainsForArea(this._config.area||""),(null===(e=this._config)||void 0===e?void 0:e.popup_domains)||this._allDomainsForArea(this._config.area||""))}get binarySelectOptions(){var e;return this._buildBinaryOptions(this._binaryClassesForArea(this._config.area||""),(null===(e=this._config)||void 0===e?void 0:e.alert_classes)||this._binaryClassesForArea(this._config.area||""))}get sensorSelectOptions(){var e;return this._buildSensorOptions(this._sensorClassesForArea(this._config.area||""),(null===(e=this._config)||void 0===e?void 0:e.sensor_classes)||this._sensorClassesForArea(this._config.area||""))}render(){if(!this.hass||!this._config)return W;const e=this._toggleDomainsForArea(this._config.area||""),t=this._allDomainsForArea(this._config.area||""),i=this._schema(),s=this._binaryschema(this.binarySelectOptions),o=this._sensorschema(this.sensorSelectOptions),n=this._toggleschema(this.toggleSelectOptions),a=this._popupschema(this.AllSelectOptions),r=Object.assign({alert_classes:st.binary_sensor,sensor_classes:st.sensor,toggle_domains:e,popup_domains:t},this._config);return this._subElementEditorDomain?this._renderSubElementEditorDomain():this._subElementEditorAlert?this._renderSubElementEditorAlert():this._subElementEditorSensor?this._renderSubElementEditorSensor():V`
      <ha-form
        .hass=${this.hass}
        .data=${r}
        .schema=${i}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${"M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"}></ha-svg-icon>
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
          <ha-svg-icon .path=${"M4 20H16V22H4C2.9 22 2 21.1 2 20V7H4M22 4V16C22 17.1 21.1 18 20 18H8C6.9 18 6 17.1 6 16V4C6 2.9 6.9 2 8 2H20C21.1 2 22 2.9 22 4M12 8H10V14H12M15 6H13V14H15M18 11H16V14H18Z"}></ha-svg-icon>
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
          <ha-svg-icon .path=${"M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15Z"}></ha-svg-icon>
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
   
      <ha-expansion-panel outlined class="main" .name="popup">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${"M2,5V19H8V5H2M9,5V10H15V5H9M16,5V14H22V5H16M9,11V19H15V11H9M16,15V19H22V15H16Z"}></ha-svg-icon>
            ${this._computeLabelCallback({name:"popup"})}
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
    `}};xt.styles=n`
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
  .content { 
    padding: 12px 4px;
  }  
`,At([me({attribute:!1})],xt.prototype,"hass",void 0),At([pe()],xt.prototype,"_config",void 0),At([pe()],xt.prototype,"_numericDeviceClasses",void 0),At([pe()],xt.prototype,"_subElementEditorDomain",void 0),At([pe()],xt.prototype,"_subElementEditorAlert",void 0),At([pe()],xt.prototype,"_subElementEditorSensor",void 0),xt=At([he("area-card-plus-editor")],xt),console.info("%c AREA-CARD %c 0.0.1 ","color: steelblue; background: black; font-weight: bold;","color: white ; background: dimgray; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"area-card-plus",name:"Area Card Plus",preview:!0,description:"A custom card to display area information."})})();
//# sourceMappingURL=area-card-plus.js.map