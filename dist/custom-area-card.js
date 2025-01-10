/*! For license information please see custom-area-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,t,i)},a=(i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,m=globalThis,f=m.trustedTypes,_=f?f.emptyScript:"",g=m.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return s?.call(this)},set(e){const o=s?.call(this);n.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return a(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s,this[s]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??b)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[v("elementProperties")]=new Map,A[v("finalized")]=new Map,g?.({ReactiveElement:A}),(m.reactiveElementVersions??=[]).push("2.0.4");const w=globalThis,x=w.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+C,P=`<${O}>`,k=document,z=()=>k.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,M=t=>R(t)||"function"==typeof t?.[Symbol.iterator],N="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,D=/>/g,T=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,F=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=F(1),q=(F(2),F(3),Symbol.for("lit-noChange")),W=Symbol.for("lit-nothing"),K=new WeakMap,Y=k.createTreeWalker(k,129);function Z(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",a=U;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,h=0;for(;h<i.length&&(a.lastIndex=h,c=a.exec(i),null!==c);)h=a.lastIndex,a===U?"!--"===c[1]?a=H:void 0!==c[1]?a=D:void 0!==c[2]?(B.test(c[2])&&(n=RegExp("</"+c[2],"g")),a=T):void 0!==c[3]&&(a=T):a===T?">"===c[0]?(a=n??U,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?T:'"'===c[3]?I:L):a===I||a===L?a=T:a===H||a===D?a=U:(a=T,n=void 0);const d=a===T&&t[e+1].startsWith("/>")?" ":"";o+=a===U?i+P:l>=0?(s.push(r),i.slice(0,l)+E+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const a=t.length-1,r=this.parts,[c,l]=J(t,e);if(this.el=Q.createElement(c,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[o++],i=s.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?st:"@"===a[1]?nt:et}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),Y.nextNode(),r.push({type:2,index:++n});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===O)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===q)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=j(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);Y.currentNode=s;let n=Y.nextNode(),o=0,a=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new tt(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new ot(n,this,t)),this._$AV.push(e),r=i[++a]}o!==r?.index&&(n=Y.nextNode(),o++)}return Y.currentNode=k,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),j(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):M(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Q(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new tt(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=G(this,t,e,0),o=!j(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const s=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=G(this,s[i+a],e,a),r===q&&(r=this._$AH[a]),o||=!j(r)||r!==this._$AH[a],r===W?t=W:t!==W&&(t+=(r??"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class nt extends et{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??W)===q)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const at={M:E,P:C,A:O,C:1,L:J,R:X,D:M,V:G,I:tt,H:et,N:st,U:nt,B:it,F:ot},rt=w.litHtmlPolyfillSupport;rt?.(Q,tt),(w.litHtmlVersions??=[]).push("3.2.1");class ct extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new tt(e.insertBefore(z(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ct._$litElement$=!0,ct.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ct});const lt=globalThis.litElementPolyfillSupport;lt?.({LitElement:ct}),(globalThis.litElementVersions??=[]).push("4.1.1");const ht=t=>(...e)=>({_$litDirective$:t,values:e});class dt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const ut=ht(class extends dt{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return q}}),pt=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)},mt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},ft=(t=mt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.P(s,void 0,t),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function _t(t){return(e,i)=>"object"==typeof i?ft(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,s?{...t,wrapped:!0}:t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return _t({...t,state:!0,attribute:!1})}var vt,yt,bt,$t=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function At(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(!((s=t[i])===(n=e[i])||$t(s)&&$t(n)))return!1;var s,n;return!0}function wt(t,e){void 0===e&&(e=At);var i=null;function s(){for(var s=[],n=0;n<arguments.length;n++)s[n]=arguments[n];if(i&&i.lastThis===this&&e(s,i.lastArgs))return i.lastResult;var o=t.apply(this,s);return i={lastResult:o,lastArgs:s,lastThis:this},o}return s.clear=function(){i=null},s}function xt(){return(xt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}function St(t){return t.substr(0,t.indexOf("."))}(bt=vt||(vt={})).language="language",bt.system="system",bt.comma_decimal="comma_decimal",bt.decimal_comma="decimal_comma",bt.space_comma="space_comma",bt.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(yt||(yt={}));var Et=function(t,e){var i=xt({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var s=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=s,i.maximumFractionDigits=s}return i},Ct=(new Set(["fan","input_boolean","light","switch","group","automation"]),function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n}),Ot=(new Set(["call-service","divider","section","weblink","cast","select"]),function(t,e,i){var s;return void 0===i&&(i=!1),function(){var n=[].slice.call(arguments),o=this,a=i&&!s;clearTimeout(s),s=setTimeout((function(){s=null,i||t.apply(o,n)}),e),a&&t.apply(o,n)}});const Pt=t=>{let e=[];function i(i,s){t=s?i:Object.assign(Object.assign({},t),i);let n=e;for(let e=0;e<n.length;e++)n[e](t)}return{get state(){return t},action(e){function s(t){i(t,!1)}return function(){let i=[t];for(let t=0;t<arguments.length;t++)i.push(arguments[t]);let n=e.apply(this,i);if(null!=n)return n instanceof Promise?n.then(s):s(n)}},setState:i,subscribe:t=>(e.push(t),()=>{!function(t){let i=[];for(let s=0;s<e.length;s++)e[s]===t?t=null:i.push(e[s]);e=i}(t)})}},kt=(t,e,i,s,n)=>((t,e,i,s)=>{if(t[e])return t[e];let n,o=0,a=Pt();const r=()=>i(t).then((t=>a.setState(t,!0))),c=()=>r().catch((e=>{if(t.connected)throw e}));return t[e]={get state(){return a.state},refresh:r,subscribe(e){o++,1===o&&(s&&(n=s(t,a)),t.addEventListener("ready",c),c());const i=a.subscribe(e);return void 0!==a.state&&setTimeout((()=>e(a.state)),0),()=>{i(),o--,o||(n&&n.then((t=>{t()})),t.removeEventListener("ready",r))}}},t[e]})(s,t,e,i).subscribe(n);var zt=function(t,e,i,s){return new(i||(i=Promise))((function(n,o){function a(t){try{c(s.next(t))}catch(t){o(t)}}function r(t){try{c(s.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}c((s=s.apply(t,e||[])).next())}))};const jt=["light","switch","fan","media_player","lock","vacuum"],Rt={battery:{consumer:!0,icon:"mdi:battery-outline",name:"battery",producer:!0},car_charger:{consumer:!0,icon:"mdi:car-electric",name:"car"},consumer:{consumer:!0,icon:"mdi:lightbulb",name:"consumer"},grid:{icon:"mdi:transmission-tower",name:"grid"},home:{consumer:!0,icon:"mdi:home-assistant",name:"home"},hydro:{icon:"mdi:hydro-power",name:"hydro",producer:!0},pool:{consumer:!0,icon:"mdi:pool",name:"pool"},producer:{icon:"mdi:lightning-bolt-outline",name:"producer",producer:!0},solar:{icon:"mdi:solar-power",name:"solar",producer:!0},wind:{icon:"mdi:wind-turbine",name:"wind",producer:!0},heating:{icon:"mdi:radiator",name:"heating",consumer:!0},placeholder:{name:"placeholder"}};var Mt,Nt,Ut,Ht,Dt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Mt||(Mt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Nt||(Nt={})),function(t){t.local="local",t.server="server"}(Ut||(Ut={})),function(t){t.language="language",t.system="system",t.DMY="DMY",t.MDY="MDY",t.YMD="YMD"}(Ht||(Ht={})),function(t){t.language="language",t.monday="monday",t.tuesday="tuesday",t.wednesday="wednesday",t.thursday="thursday",t.friday="friday",t.saturday="saturday",t.sunday="sunday"}(Dt||(Dt={}));const Tt=wt((t=>new Intl.Collator(t))),Lt=wt((t=>new Intl.Collator(t,{sensitivity:"accent"}))),It=(t,e)=>t<e?-1:t>e?1:0;let Bt;const Ft=t=>t.sendMessagePromise({type:"config/area_registry/list"}).then((t=>t.sort(((t,e)=>((t,e)=>(null===Intl||void 0===Intl?void 0:Intl.Collator)?Tt(void 0).compare(t,e):It(t,e))(t.name,e.name))))),Vt=(t,e)=>t.subscribeEvents(Ot((()=>Ft(t).then((t=>e.setState(t,!0)))),500,!0),"area_registry_updated"),qt=(t,e)=>kt("_areaRegistry",Ft,Vt,t,e),Wt=t=>t.sendMessagePromise({type:"config/device_registry/list"}),Kt=(t,e)=>t.subscribeEvents(Ot((()=>Wt(t).then((t=>e.setState(t,!0)))),500,!0),"device_registry_updated"),Yt=t=>t.sendMessagePromise({type:"config/entity_registry/list"}),Zt=(t,e)=>t.subscribeEvents(Ot((()=>Yt(t).then((t=>e.setState(t,!0)))),500,!0),"entity_registry_updated"),Jt=(t,e)=>kt("_entityRegistry",Yt,Zt,t,e),Qt=t=>{class e extends t{connectedCallback(){super.connectedCallback(),this._checkSubscribed()}disconnectedCallback(){if(super.disconnectedCallback(),this.__unsubs){for(;this.__unsubs.length;){const t=this.__unsubs.pop();t instanceof Promise?t.then((t=>t())):t()}this.__unsubs=void 0}}updated(t){if(super.updated(t),t.has("hass"))this._checkSubscribed();else if(this.hassSubscribeRequiredHostProps)for(const e of t.keys())if(this.hassSubscribeRequiredHostProps.includes(e))return void this._checkSubscribed()}hassSubscribe(){return[]}_checkSubscribed(){var t;void 0===this.__unsubs&&this.isConnected&&void 0!==this.hass&&!(null===(t=this.hassSubscribeRequiredHostProps)||void 0===t?void 0:t.some((t=>void 0===this[t])))&&(this.__unsubs=this.hassSubscribe())}}return function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);o>3&&a&&Object.defineProperty(e,i,a)}([_t({attribute:!1})],e.prototype,"hass",void 0),e};function Gt(t,e,i){const s=new CustomEvent(e,{bubbles:!1,composed:!1,detail:i});t.dispatchEvent(s)}var Xt=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};const te=["unavailable","unknown"],ee=["closed","locked","off","docked","idle","standby","paused","auto","not_home","disarmed"],ie=["sensor"],se=["binary_sensor"],ne=["climate"],oe=["light","switch","fan","media_player","lock","vacuum"],ae={sensor:["temperature","humidity"],binary_sensor:["motion","window"]},re={light:{on:"mdi:lightbulb-multiple",off:"mdi:lightbulb-multiple-off"},switch:{on:"mdi:toggle-switch",off:"mdi:toggle-switch-off"},fan:{on:"mdi:fan",off:"mdi:fan-off"},climate:{on:"mdi:fan",off:"mdi:fan-off"},media_player:{on:"mdi:cast",off:"mdi:cast-off"},lock:{on:"mdi:lock",off:"mdi:lock-open"},vacuum:{on:"mdi:robot-vacuum",off:"mdi:robot-vacuum-off"},binary_sensor:{motion:"mdi:motion-sensor",moisture:"mdi:water-alert",window:"mdi:window-open",door:"mdi:door-open",lock:"mdi:lock",presence:"mdi:home",occupancy:"mdi:seat",vibration:"mdi:vibrate",opening:"mdi:shield-lock-open",garage_door:"mdi:garage-open",problem:"mdi:alert-circle",smoke:"mdi:smoke-detector"}};let ce=class extends(Qt(ct)){constructor(){super(...arguments),this._deviceClasses=ae,this._entitiesByDomain=wt(((t,e,i,s,n)=>{const o=i.filter((i=>!i.hidden_by&&(i.area_id?i.area_id===t:i.device_id&&e.has(i.device_id)))).map((t=>t.entity_id)),a={};for(const t of o){const e=St(t);if(!(oe.includes(e)||ie.includes(e)||se.includes(e)||ne.includes(e)))continue;const i=n[t];i&&(!se.includes(e)&&!ie.includes(e)||s[e].includes(i.attributes.device_class||""))&&(e in a||(a[e]=[]),a[e].push(i))}return a})),this._area=wt(((t,e)=>e.find((e=>e.area_id===t))||null)),this._devicesInArea=wt(((t,e)=>new Set(t?e.filter((e=>e.area_id===t)).map((t=>t.id)):[])))}static getConfigElement(){return document.createElement("custom-area-card-editor")}static getStubConfig(t){var e;return function(t,e,i,s){return new(i||(i=Promise))((function(n,o){function a(t){try{c(s.next(t))}catch(t){o(t)}}function r(t){try{c(s.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}c((s=s.apply(t,e||[])).next())}))}(this,void 0,void 0,(function*(){const i=yield(s=t.connection,n=qt,zt(void 0,void 0,void 0,(function*(){return new Promise((t=>{const e=n(s,(i=>{e(),t(i)}))}))})));var s,n;return{type:"custom:custom-area-card",area:(null===(e=i[0])||void 0===e?void 0:e.area_id)||""}}))}_isOn(t,e){const i=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states)[t];if(i)return(e?i.filter((t=>t.attributes.device_class===e)):i).find((t=>!te.includes(t.state)&&!ee.includes(t.state)))}_average(t,e){const i=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states)[t].filter((t=>!e||t.attributes.device_class===e));if(!i)return;let s;const n=i.filter((t=>{return!(e=t.attributes,!(e.unit_of_measurement||e.state_class||(i||[]).includes(e.device_class||""))||isNaN(Number(t.state))||(s?t.attributes.unit_of_measurement!==s:(s=t.attributes.unit_of_measurement,0)));var e,i}));if(!n.length)return;return`${function(t,e,i){var s=e?function(t){switch(t.number_format){case vt.comma_decimal:return["en-US","en"];case vt.decimal_comma:return["de","es","it"];case vt.space_comma:return["fr","sv","cs"];case vt.system:return;default:return t.language}}(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==vt.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(s,Et(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,Et(t,i)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")}(n.reduce(((t,e)=>t+Number(e.state)),0)/n.length,this.hass.locale,{maximumFractionDigits:1})}${s?(o=s,a=this.hass.locale,"°"===o?"":a&&"%"===o?(t=>{switch(t.language){case"cs":case"de":case"fi":case"fr":case"sk":case"sv":return" ";default:return""}})(a):" "):""}${s||""}`;var o,a}hassSubscribe(){return[qt(this.hass.connection,(t=>{this._areas=t})),(t=this.hass.connection,e=t=>{this._devices=t},kt("_dr",Wt,Kt,t,e)),Jt(this.hass.connection,(t=>{this._entities=t}))];var t,e}getCardSize(){return 3}setConfig(t){if(!t.area)throw new Error("Area Required");this._config=t,this._deviceClasses=Object.assign({},ae),t.sensor_classes&&(this._deviceClasses.sensor=t.sensor_classes),t.alert_classes&&(this._deviceClasses.binary_sensor=t.alert_classes)}shouldUpdate(t){if(t.has("_config")||!this._config)return!0;if(t.has("_devicesInArea")||t.has("_areas")||t.has("_entities"))return!0;if(!t.has("hass"))return!1;const e=t.get("hass");if(!e||e.themes!==this.hass.themes||e.locale!==this.hass.locale)return!0;if(!this._devices||!this._devicesInArea(this._config.area,this._devices)||!this._entities)return!1;const i=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states);for(const t of Object.values(i))for(const i of t)if(e.states[i.entity_id]!==i)return!0;return!1}render(){var t,e,i,s,n;if(!(this._config&&this.hass&&this._areas&&this._devices&&this._entities))return W;const o=this._entitiesByDomain(this._config.area,this._devicesInArea(this._config.area,this._devices),this._entities,this._deviceClasses,this.hass.states),a=this._area(this._config.area,this._areas);if(null===a)return V`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;const r=[];return ie.forEach((t=>{t in o&&this._deviceClasses[t].forEach((e=>{if(o[t].some((t=>t.attributes.device_class===e))){const i=this._average(t,e);r.length>0?r.push(` - ${i}`):r.push(i)}}))})),V`
      <ha-card>
          <div class="icon-container">
            <ha-icon style=${(null===(t=this._config)||void 0===t?void 0:t.area_icon_color)?`color: var(--${this._config.area_icon_color}-color);`:W} icon=${this._config.area_icon||a.icon}></ha-icon>
          </div>
          <div
            class="container ${ut({navigate:void 0!==this._config.navigation_path&&""!==this._config.navigation_path})}"
            @click=${this._handleNavigation}>
          <div class="right">

          <div class="alerts">
            ${se.map((t=>t in o?this._deviceClasses[t].map((e=>{var i;const s=o[t].filter((t=>(t.attributes.device_class||"default")===e&&"on"===t.state)).length;return s>0?V`
                      <div class="icon-with-count">
                        <ha-state-icon
                          class="alert" style=${(null===(i=this._config)||void 0===i?void 0:i.alert_color)?`color: var(--${this._config.alert_color}-color);`:W}
                          .icon=${this._getIcon(t,s>0,e)}
                        ></ha-state-icon>
                        <span class="active-count  text-small${s>0?"on":"off"}">${s}</span>
                      </div>
                    `:W})):W))}
          </div>          

<div class="buttons">
  ${this._config.show_active?null===(e=this._config.toggle_domains)||void 0===e?void 0:e.map((t=>{var e,i;if(!(t in o))return W;const s=null===(i=null===(e=this._config)||void 0===e?void 0:e.customization)||void 0===i?void 0:i.find((e=>e.domain===t)),n=null==s?void 0:s.color,a=null==s?void 0:s.icon,r=o[t].filter((t=>!te.includes(t.state)&&!ee.includes(t.state))).length;return r>0?V`
            <div class="icon-with-count hover">
              <ha-state-icon
                style=${n?`color: var(--${n}-color);`:W}
                class=${r>0?"toggle-on":"toggle-off"}
                .domain=${t}
                .icon=${a||this._getIcon(t,r>0)}
                @click=${this._toggle}
              ></ha-state-icon>
              <span class="active-count text-small ${r>0?"on":"off"}">${r}</span>
            </div>
          `:W})):null===(i=this._config.toggle_domains)||void 0===i?void 0:i.map((t=>{var e,i;if(!(t in o))return W;const s=null===(i=null===(e=this._config)||void 0===e?void 0:e.customization)||void 0===i?void 0:i.find((e=>e.domain===t)),n=null==s?void 0:s.color,a=null==s?void 0:s.icon,r=o[t].filter((t=>!te.includes(t.state)&&!ee.includes(t.state))).length;return V`
          <div class="icon-with-count hover">
            <ha-state-icon
              style=${n?`color: var(--${n}-color);`:W}
              class=${r>0?"toggle-on":"toggle-off"}
              .domain=${t}
              .icon=${a||this._getIcon(t,r>0)}
              @click=${this._toggle}
            ></ha-state-icon>
            <span class="active-count text-small ${r>0?"on":"off"}">${r}</span>
          </div>
        `}))}
</div>





          </div>
          <div class="bottom">
            <div>
              <div style=${(null===(s=this._config)||void 0===s?void 0:s.area_name_color)?`color: var(--${this._config.area_name_color}-color);`:W} class="name text-large on">${this._config.area_name||a.name}</div>
              ${r.length?V`<div class="sensor text-medium off" style=${(null===(n=this._config)||void 0===n?void 0:n.sensor_color)?`color: var(--${this._config.sensor_color}-color);`:W}>${r}</div>`:""}
            </div>
            <div class="climate text-small off">
            ${ne.map((t=>{if(!(t in o))return"";const e=o[t].filter((t=>{const e=t.attributes.hvac_action;return!te.includes(t.state)&&!ee.includes(t.state)||e&&("idle"!==e||"off"===e)})).map((t=>`${t.attributes.temperature||"N/A"}°C`));return 0===e.length?"":V`
                (${e.join(", ")})
              `}))}
            </div>
          </div>
          </div>
        </div>

      </ha-card>
    `}updated(t){if(super.updated(t),!this._config||!this.hass)return;const e=t.get("hass"),i=t.get("_config");(!t.has("hass")||e&&e.themes===this.hass.themes)&&(!t.has("_config")||i&&i.theme===this._config.theme)||function(t,e,i,s){void 0===s&&(s=!1),t._themes||(t._themes={});var n=e.default_theme;("default"===i||i&&e.themes[i])&&(n=i);var o=xt({},t._themes);if("default"!==n){var a=e.themes[n];Object.keys(a).forEach((function(e){var i="--"+e;t._themes[i]="",o[i]=a[e]}))}if(t.updateStyles?t.updateStyles(o):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,o),s){var r=document.querySelector("meta[name=theme-color]");if(r){r.hasAttribute("default-content")||r.setAttribute("default-content",r.getAttribute("content"));var c=o["--primary-color"]||r.getAttribute("default-content");r.setAttribute("content",c)}}}(this,this.hass.themes,this._config.theme)}_handleNavigation(){this._config.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),Ct(window,"location-changed",{replace:i})}(0,this._config.navigation_path)}_toggle(t){t.stopPropagation();const e=t.currentTarget.domain;"media_player"===e?this.hass.callService(e,this._isOn(e)?"media_pause":"media_play",void 0,{area_id:this._config.area}):"lock"===e?this.hass.callService(e,this._isOn(e)?"lock":"unlock",void 0,{area_id:this._config.area}):"vacuum"===e?this.hass.callService(e,this._isOn(e)?"stop":"start",void 0,{area_id:this._config.area}):oe.includes(e)&&this.hass.callService(e,this._isOn(e)?"turn_off":"turn_on",void 0,{area_id:this._config.area})}_getIcon(t,e,i){if(t in re){const s=re[t];if(i&&"object"==typeof s&&!s.on&&i in s)return s[i];if("object"==typeof s&&"on"in s&&"off"in s)return e?s.on:s.off}return""}static get styles(){return o`
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
    `}};Xt([_t({attribute:!1})],ce.prototype,"hass",void 0),Xt([gt()],ce.prototype,"_config",void 0),Xt([gt()],ce.prototype,"_areas",void 0),Xt([gt()],ce.prototype,"_devices",void 0),Xt([gt()],ce.prototype,"_entities",void 0),ce=Xt([pt("custom-area-card")],ce);const{I:le}=at,he=()=>document.createComment(""),de=(t,e,i)=>{const s=t._$AA.parentNode,n=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=s.insertBefore(he(),n),o=s.insertBefore(he(),n);i=new le(e,o,t,t.options)}else{const e=i._$AB.nextSibling,o=i._$AM,a=o!==t;if(a){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==o._$AU&&i._$AP(e)}if(e!==n||a){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;s.insertBefore(t,n),t=e}}}return i},ue=(t,e,i=t)=>(t._$AI(e,i),t),pe={},me=t=>{t._$AP?.(!1,!0);let e=t._$AA;const i=t._$AB.nextSibling;for(;e!==i;){const t=e.nextSibling;e.remove(),e=t}},fe=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},_e=ht(class extends dt{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],o=[];let a=0;for(const e of t)n[a]=s?s(e,a):a,o[a]=i(e,a),a++;return{values:o,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){const n=(t=>t._$AH)(t),{values:o,keys:a}=this.dt(e,i,s);if(!Array.isArray(n))return this.ut=a,o;const r=this.ut??=[],c=[];let l,h,d=0,u=n.length-1,p=0,m=o.length-1;for(;d<=u&&p<=m;)if(null===n[d])d++;else if(null===n[u])u--;else if(r[d]===a[p])c[p]=ue(n[d],o[p]),d++,p++;else if(r[u]===a[m])c[m]=ue(n[u],o[m]),u--,m--;else if(r[d]===a[m])c[m]=ue(n[d],o[m]),de(t,c[m+1],n[d]),d++,m--;else if(r[u]===a[p])c[p]=ue(n[u],o[p]),de(t,n[d],n[u]),u--,p++;else if(void 0===l&&(l=fe(a,p,m),h=fe(r,d,u)),l.has(r[d]))if(l.has(r[u])){const e=h.get(a[p]),i=void 0!==e?n[e]:null;if(null===i){const e=de(t,n[d]);ue(e,o[p]),c[p]=e}else c[p]=ue(i,o[p]),de(t,n[d],i),n[e]=null;p++}else me(n[u]),u--;else me(n[d]),d++;for(;p<=m;){const e=de(t,c[m+1]);ue(e,o[p]),c[p++]=e}for(;d<=u;){const t=n[d++];null!==t&&me(t)}return this.ut=a,((t,e=pe)=>{t._$AH=e})(t,c),q}});var ge=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};let ve=class extends ct{constructor(){super(...arguments),this._entityKeys=new WeakMap}_getKey(t){return this._entityKeys.has(t)||this._entityKeys.set(t,Math.random().toString()),this._entityKeys.get(t)}render(){return this.hass?V`
      <h3>Editor</h3>
      <div class="customization">
        ${this.customization&&_e(this.customization,(t=>this._getKey(t)),((t,e)=>V`
            <div class="entity">
              <div class="handle">
                <ha-icon icon="mdi:drag"></ha-icon>
              </div>

              <ha-select
                label="Preset"
                name="preset"
                class="select-preset"
                naturalMenuWidth
                fixedMenuPosition
                .value=${t.domain}
                @closed=${t=>t.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${jt.map((t=>V`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
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
      </div>

      <div class="add-item row">
        <ha-select
          label="Preset"
          name="preset"
          class="add-preset"
          naturalMenuWidth
          fixedMenuPosition
          @closed=${t=>t.stopPropagation()}
        >
          ${jt.map((t=>V`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
        </ha-select>

        <ha-icon-button
          .label="Add"
          .path=${"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"}
          class="add-icon"
          @click="${this._addRow}"
        ></ha-icon-button>
      </div>
    `:W}_valueChanged(t){if(!this.customization||!this.hass)return;const e=t.detail.value,i=t.target.index,s=this.customization.concat();s[i]=Object.assign(Object.assign({},s[i]),{entity:e||""}),Gt(this,"config-changed",s)}_removeRow(t){t.stopPropagation();const e=t.currentTarget.index;if(null!=e){const t=this.customization.concat();t.splice(e,1),Gt(this,"config-changed",t)}}_editRow(t){t.stopPropagation();const e=t.target.index;null!=e&&Gt(this,"edit-item",e)}_addRow(t){if(t.stopPropagation(),!this.customization||!this.hass)return;const e=this.shadowRoot.querySelector(".add-preset");if(!e||!e.value)return;const i=e.value,s=Object.assign({},Rt[i],{domain:i});Gt(this,"config-changed",[...this.customization,s]),e.value=""}static get styles(){return o`
      #sortable a:nth-of-type(2n) paper-icon-item {
        animation-name: keyframes1;
        animation-iteration-count: infinite;
        transform-origin: 50% 10%;
        animation-delay: -0.75s;
        animation-duration: 0.25s;
      }
      #sortable a:nth-of-type(2n-1) paper-icon-item {
        animation-name: keyframes2;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        transform-origin: 30% 5%;
        animation-delay: -0.5s;
        animation-duration: 0.33s;
      }
      #sortable a {
        height: 48px;
        display: flex;
      }
      #sortable {
        outline: none;
        display: block !important;
      }
      .hidden-panel {
        display: flex !important;
      }
      .sortable-fallback {
        display: none;
      }
      .sortable-ghost {
        opacity: 0.4;
      }
      .sortable-fallback {
        opacity: 0;
      }
      @keyframes keyframes1 {
        0% {
          transform: rotate(-1deg);
          animation-timing-function: ease-in;
        }
        50% {
          transform: rotate(1.5deg);
          animation-timing-function: ease-out;
        }
      }
      @keyframes keyframes2 {
        0% {
          transform: rotate(1deg);
          animation-timing-function: ease-in;
        }
        50% {
          transform: rotate(-1.5deg);
          animation-timing-function: ease-out;
        }
      }
      .show-panel,
      .hide-panel {
        display: none;
        position: absolute;
        top: 0;
        right: 4px;
        --mdc-icon-button-size: 40px;
      }
      :host([rtl]) .show-panel {
        right: initial;
        left: 4px;
      }
      .hide-panel {
        top: 4px;
        right: 8px;
      }
      :host([rtl]) .hide-panel {
        right: initial;
        left: 8px;
      }
      :host([expanded]) .hide-panel {
        display: block;
      }
      :host([expanded]) .show-panel {
        display: inline-flex;
      }
      paper-icon-item.hidden-panel,
      paper-icon-item.hidden-panel span,
      paper-icon-item.hidden-panel ha-icon[slot='item-icon'] {
        color: var(--secondary-text-color);
        cursor: pointer;
      }
      .entity,
      .add-item {
        display: flex;
        align-items: center;
      }
      .entity {
        display: flex;
        align-items: center;
      }
      .entity .handle {
        padding-right: 8px;
        cursor: move;
        padding-inline-end: 8px;
        padding-inline-start: initial;
        direction: var(--direction);
      }
      .entity .handle > * {
        pointer-events: none;
      }
      .entity ha-entity-picker,
      .add-item ha-entity-picker {
        flex-grow: 1;
      }
      .entities {
        margin-bottom: 8px;
      }
      .add-preset, .select-preset {
        padding-right: 8px;
        width: 100%;
      }
      .remove-icon,
      .edit-icon,
      .add-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
      }
    `}};ge([_t({attribute:!1})],ve.prototype,"customization",void 0),ge([_t({attribute:!1})],ve.prototype,"hass",void 0),ve=ge([pt("distribution-card-items-editor")],ve);var ye=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};let be=class extends ct{constructor(){super(...arguments),this._schema=wt((()=>[{name:"color",selector:{ui_color:{default_color:"state",include_state:!0}}},{name:"icon",selector:{icon:{}}}]))}render(){var t,e;if(!this.hass||!this.config)return V``;const i=this.config;let s=[];i.entity&&Object.keys(Object.assign({},null===(t=this.hass)||void 0===t?void 0:t.states[i.entity||0].attributes));let n=[];i.secondary_info_entity&&Object.keys(Object.assign({},null===(e=this.hass)||void 0===e?void 0:e.states[i.secondary_info_entity].attributes));const o=this._schema(),a=Object.assign({},this._config);return V`

      <ha-form
        .hass=${this.hass}
        .data=${a}
        .schema=${o}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>

    `}_valueChangedSchema(t){if(!this.config)return;const e=Object.assign(Object.assign({},this.config),t.detail.value);this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:e}))}static get styles(){return o`
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
    `}};ye([_t({attribute:!1})],be.prototype,"config",void 0),ye([_t({attribute:!1})],be.prototype,"hass",void 0),ye([gt()],be.prototype,"_config",void 0),be=ye([pt("distribution-card-item-editor")],be);var $e=function(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a},Ae=function(t,e,i,s){return new(i||(i=Promise))((function(n,o){function a(t){try{c(s.next(t))}catch(t){o(t)}}function r(t){try{c(s.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}c((s=s.apply(t,e||[])).next())}))};let we=class extends ct{constructor(){super(...arguments),this._schema=wt(((t,e,i)=>[{name:"area",selector:{area:{}}},{name:"icon_appearance",flatten:!0,type:"expandable",icon:"mdi:palette",schema:[{name:"area_icon",selector:{icon:{}}},{name:"area_icon_color",selector:{ui_color:{default_color:"state",include_state:!0}}}]},{name:"name_appearance",flatten:!0,type:"expandable",icon:"mdi:palette",schema:[{name:"area_name",selector:{text:{}}},{name:"area_name_color",selector:{ui_color:{default_color:"state",include_state:!0}}}]},{name:"",type:"grid",schema:[{name:"navigation_path",required:!1,selector:{navigation:{}}},{name:"theme",required:!1,selector:{theme:{}}}]},{name:"alert_classes",flatten:!0,type:"expandable",icon:"mdi:palette",schema:[{name:"alert_classes",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:t}}},{name:"alert_color",selector:{ui_color:{default_color:"state",include_state:!0}}}]},{name:"sensor_classes",flatten:!0,type:"expandable",icon:"mdi:palette",schema:[{name:"sensor_classes",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:e}}},{name:"sensor_color",selector:{ui_color:{default_color:"state",include_state:!0}}}]},{name:"toggle_domains",flatten:!0,type:"expandable",icon:"mdi:palette",schema:[{name:"show_active",selector:{boolean:{}}},{name:"toggle_domains",selector:{select:{reorder:!0,multiple:!0,custom_value:!0,options:i}}},{name:"toggle_color",selector:{ui_color:{default_color:"state",include_state:!0}}}]}])),this._binaryClassesForArea=wt((t=>this._classesForArea(t,"binary_sensor"))),this._sensorClassesForArea=wt(((t,e)=>this._classesForArea(t,"sensor",e))),this._toggleDomainsForArea=wt((t=>this._classesForArea(t,"toggle"))),this._buildBinaryOptions=wt(((t,e)=>this._buildOptions("binary_sensor",t,e))),this._buildSensorOptions=wt(((t,e)=>this._buildOptions("sensor",t,e))),this._buildToggleOptions=wt(((t,e)=>this._buildOptions("toggle",t,e))),this._computeLabelCallback=t=>{switch(t.name){case"theme":return`${this.hass.localize("ui.panel.lovelace.editor.card.generic.theme")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.optional")})`;case"area":return this.hass.localize("ui.panel.lovelace.editor.card.area.name");case"navigation_path":return this.hass.localize("ui.panel.lovelace.editor.action-editor.navigation_path");case"aspect_ratio":return this.hass.localize("ui.panel.lovelace.editor.card.generic.aspect_ratio");case"area_name":return this.hass.localize("ui.panel.lovelace.editor.card.generic.name");case"area_icon":return this.hass.localize("ui.panel.lovelace.editor.card.generic.icon");case"icon_appearance":return this.hass.localize("ui.panel.lovelace.editor.card.generic.icon")+" "+this.hass.localize("ui.panel.lovelace.editor.card.tile.appearance");case"name_appearance":return this.hass.localize("ui.panel.lovelace.editor.card.generic.name")+" "+this.hass.localize("ui.panel.lovelace.editor.card.tile.appearance");case"toggle_domains":return this.hass.localize("ui.panel.lovelace.editor.cardpicker.domain");case"show_active":return this.hass.localize("ui.common.hide")+" "+this.hass.localize("ui.components.entity.entity-state-picker.state")+" "+this.hass.localize("component.binary_sensor.entity_component._.state.off");case"color":case"icon_tap_action":case"show_entity_picture":case"vertical":case"hide_state":case"state_content":case"appearance":case"interactions":return this.hass.localize(`ui.panel.lovelace.editor.card.tile.${t.name}`);default:return this.hass.localize(`ui.panel.lovelace.editor.card.area.${t.name}`)}},this._subElementEditor=void 0}firstUpdated(){var t,e;return Ae(this,void 0,void 0,(function*(){customElements.get("ha-form")&&customElements.get("hui-action-editor")||null===(t=customElements.get("hui-button-card"))||void 0===t||t.getConfigElement(),customElements.get("ha-entity-picker")||null===(e=customElements.get("hui-entities-card"))||void 0===e||e.getConfigElement(),console.log(this.hass)}))}_classesForArea(t,e,i){let s;if("toggle"===e)return s=Object.values(this.hass.entities).filter((e=>{var i;return oe.includes(St(e.entity_id))&&!e.hidden&&(e.area_id===t||e.device_id&&(null===(i=this.hass.devices[e.device_id])||void 0===i?void 0:i.area_id)===t)})),[...new Set(s.map((t=>St(t.entity_id))))];{s=Object.values(this.hass.entities).filter((i=>{var s;return St(i.entity_id)===e&&!i.entity_category&&!i.hidden&&(i.area_id===t||i.device_id&&(null===(s=this.hass.devices[i.device_id])||void 0===s?void 0:s.area_id)===t)}));const n=s.map((t=>{var e;return(null===(e=this.hass.states[t.entity_id])||void 0===e?void 0:e.attributes.device_class)||""})).filter((t=>t&&("sensor"!==e||!i||i.includes(t))));return[...new Set(n)]}}_buildOptions(t,e,i){let s;s=[...new Set([...e,...i])];const n=s.map((e=>({value:e,label:"toggle"===t?this.hass.localize(`component.${e}.entity_component._.name`)||e:this.hass.localize(`component.${t}.entity_component.${e}.name`)||e})));return n.sort(((t,e)=>((t,e,i)=>(null===Intl||void 0===Intl?void 0:Intl.Collator)?Lt(i).compare(t,e):It(t.toLowerCase(),e.toLowerCase()))(t.label,e.label,this.hass.locale.language))),n}setConfig(t){this._config=Object.assign(Object.assign({},t),{customization:t.customization||[]})}updated(t){const e=Object.create(null,{updated:{get:()=>super.updated}});return Ae(this,void 0,void 0,(function*(){if(e.updated.call(this,t),this.hass&&this._config){if(t.has("_config")){const e=t.get("_config"),i=null==e?void 0:e.area,s=this._config.area;if(i!==s&&void 0!==i){const t=this._toggleDomainsForArea(s).sort(((t,e)=>oe.indexOf(t)-oe.indexOf(e)));this._config.toggle_domains=[...t],this.requestUpdate()}}if(!this._numericDeviceClasses){const{numeric_device_classes:t}=yield(i=this.hass,zt(void 0,void 0,void 0,(function*(){return Bt||(Bt=i.callWS({type:"sensor/numeric_device_classes"}),Bt)})));this._numericDeviceClasses=t}var i}}))}_valueChanged(t){this._config=t.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_edit_item(t){if(t.stopPropagation(),!this._config||!this.hass)return;const e=t.detail;this._subElementEditor={index:e}}_customizationChanged(t){t.stopPropagation(),this._config&&this.hass&&Gt(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{customization:t.detail})})}_renderSubElementEditor(){var t,e,i,s,n;return V`
        <div class="header">
            <div class="back-title">
                <mwc-icon-button @click=${this._goBack}>
                    <ha-icon icon="mdi:arrow-left"></ha-icon>
                </mwc-icon-button>
            </div>
        </div>
        <distribution-card-item-editor
            .hass=${this.hass}
            .config=${null!==(n=null===(e=null===(t=this._config)||void 0===t?void 0:t.customization)||void 0===e?void 0:e[null!==(s=null===(i=this._subElementEditor)||void 0===i?void 0:i.index)&&void 0!==s?s:0])&&void 0!==n?n:{}}
            @config-changed=${this._itemChanged}
        >
        </distribution-card-item-editor>
    `}_goBack(){this._subElementEditor=void 0}_itemChanged(t){var e;if(t.stopPropagation(),!this._config||!this.hass)return;const i=null===(e=this._subElementEditor)||void 0===e?void 0:e.index;if(null!=i){const e=[...this._config.customization];e[i]=t.detail,Gt(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{customization:e})})}}render(){if(!this.hass||!this._config)return W;const t=this._binaryClassesForArea(this._config.area||""),e=this._sensorClassesForArea(this._config.area||"",this._numericDeviceClasses),i=this._toggleDomainsForArea(this._config.area||""),s=this._buildBinaryOptions(t,this._config.alert_classes||ae.binary_sensor),n=this._buildSensorOptions(e,this._config.sensor_classes||ae.sensor),o=this._buildToggleOptions(i,this._config.toggle_domains||i),a=this._schema(s,n,o),r=Object.assign({alert_classes:ae.binary_sensor,sensor_classes:ae.sensor,toggle_domains:i},this._config);return this._subElementEditor?this._renderSubElementEditor():V`
      <ha-form
        .hass=${this.hass}
        .data=${r}
        .schema=${a}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>
        <div class="card-config">
            <distribution-card-items-editor
                .hass=${this.hass}
                .customization=${this._config.customization}
                @edit-item=${this._edit_item}
                @config-changed=${this._customizationChanged}
            >
            </distribution-card-items-editor>
        </div>
        
    `}};we.styles=o`
    :host {
      display: block;
    }
    select {
      padding: 5px;
      font-size: 14px;
    }
  `,$e([_t({attribute:!1})],we.prototype,"hass",void 0),$e([gt()],we.prototype,"_config",void 0),$e([gt()],we.prototype,"_numericDeviceClasses",void 0),$e([gt()],we.prototype,"_subElementEditor",void 0),we=$e([pt("custom-area-card-editor")],we),console.info("%c AREA-CARD %c 0.0.1 ","color: steelblue; background: black; font-weight: bold;","color: white ; background: dimgray; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"custom-area-card",name:"Custom Area Card",preview:!0,description:"A custom card to display area information."})})();
//# sourceMappingURL=custom-area-card.js.map