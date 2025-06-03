function t(t,e,i,s){var n,a=arguments.length,r=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(r=(a<3?n(r):a>3?n(e,i,r):n(e,i))||r);return a>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new a(i,t,s)},o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:h,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,g=_.trustedTypes,f=g?g.emptyScript:"",m=_.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!h(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...c(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s,this[s]=n.fromAttribute(e,t.type)??this._$Ej?.get(s)??null,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,m?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.0");const x=globalThis,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+S,P=`<${k}>`,M=document,H=()=>M.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,I="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,N=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,V=/"/g,D=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),F=new WeakMap,W=M.createTreeWalker(M,129);function G(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",r=L;for(let e=0;e<i;e++){const i=t[e];let o,h,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,h=r.exec(i),null!==h);)d=r.lastIndex,r===L?"!--"===h[1]?r=R:void 0!==h[1]?r=z:void 0!==h[2]?(D.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=N):void 0!==h[3]&&(r=N):r===N?">"===h[0]?(r=n??L,l=-1):void 0===h[1]?l=-2:(l=r.lastIndex-h[2].length,o=h[1],r=void 0===h[3]?N:'"'===h[3]?V:T):r===V||r===T?r=N:r===R||r===z?r=L:(r=N,n=void 0);const c=r===N&&t[e+1].startsWith("/>")?" ":"";a+=r===L?i+P:l>=0?(s.push(o),i.slice(0,l)+C+i.slice(l)+S+c):i+S+(-2===l?e:c)}return[G(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const r=t.length-1,o=this.parts,[h,l]=Y(t,e);if(this.el=K.createElement(h,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[a++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:n}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],H()),W.nextNode(),o.push({type:2,index:++n});s.append(t[e],H())}}}else if(8===s.nodeType)if(s.data===k)o.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)o.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===q)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=X(t,n._$AS(t,e.values),n,s)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);W.currentNode=s;let n=W.nextNode(),a=0,r=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new Z(n,n.nextSibling,this,t):1===o.type?e=new o.ctor(n,o.name,o.strings,this,t):6===o.type&&(e=new st(n,this,t)),this._$AV.push(e),o=i[++r]}a!==o?.index&&(n=W.nextNode(),a++)}return W.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new J(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new K(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Z(this.O(H()),this.O(H()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=X(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==q,a&&(this._$AH=t);else{const s=t;let r,o;for(t=n[0],r=0;r<n.length-1;r++)o=X(this,s[i+r],e,r),o===q&&(o=this._$AH[r]),a||=!O(o)||o!==this._$AH[r],o===B?t=B:t!==B&&(t+=(o??"")+n[r+1]),this._$AH[r]=o}a&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends Q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??B)===q)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(K,Z),(x.litHtmlVersions??=[]).push("3.3.0");const at=globalThis;class rt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Z(e.insertBefore(H(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}rt._$litElement$=!0,rt.finalized=!0,at.litElementHydrateSupport?.({LitElement:rt});const ot=at.litElementPolyfillSupport;ot?.({LitElement:rt}),(at.litElementVersions??=[]).push("4.2.0");const ht={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},lt=(t=ht,e,i)=>{const{kind:s,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ct(t){return dt({...t,state:!0,attribute:!1})}function ut(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var pt={exports:{}};!function(){function t(e){if(!(this instanceof t))return new t(e);this._canvas=e="string"==typeof e?document.getElementById(e):e,this._ctx=e.getContext("2d"),this._width=e.width,this._height=e.height,this._max=1,this._data=[]}pt.exports=t,t.prototype={defaultRadius:25,defaultGradient:{.4:"blue",.6:"cyan",.7:"lime",.8:"yellow",1:"red"},data:function(t){return this._data=t,this},max:function(t){return this._max=t,this},add:function(t){return this._data.push(t),this},clear:function(){return this._data=[],this},radius:function(t,e){e=void 0===e?15:e;var i=this._circle=this._createCanvas(),s=i.getContext("2d"),n=this._r=t+e;return i.width=i.height=2*n,s.shadowOffsetX=s.shadowOffsetY=2*n,s.shadowBlur=e,s.shadowColor="black",s.beginPath(),s.arc(-n,-n,t,0,2*Math.PI,!0),s.closePath(),s.fill(),this},resize:function(){this._width=this._canvas.width,this._height=this._canvas.height},gradient:function(t){var e=this._createCanvas(),i=e.getContext("2d"),s=i.createLinearGradient(0,0,0,256);for(var n in e.width=1,e.height=256,t)s.addColorStop(+n,t[n]);return i.fillStyle=s,i.fillRect(0,0,1,256),this._grad=i.getImageData(0,0,1,256).data,this},draw:function(t){this._circle||this.radius(this.defaultRadius),this._grad||this.gradient(this.defaultGradient);var e=this._ctx;e.clearRect(0,0,this._width,this._height);for(var i,s=0,n=this._data.length;s<n;s++)i=this._data[s],e.globalAlpha=Math.max(i[2]/this._max,void 0===t?.05:t),e.drawImage(this._circle,i[0]-this._r,i[1]-this._r);var a=e.getImageData(0,0,this._width,this._height);return this._colorize(a.data,this._grad),e.putImageData(a,0,0),this},_colorize:function(t,e){for(var i,s=0,n=t.length;s<n;s+=4)(i=4*t[s+3])&&(t[s]=e[i],t[s+1]=e[i+1],t[s+2]=e[i+2])},_createCanvas:function(){return"undefined"!=typeof document?document.createElement("canvas"):new this._canvas.constructor}}}();var _t,gt=ut(pt.exports);class ft{static validate(t){const e=[];if(t.background||e.push("Background image is required"),t.points&&Array.isArray(t.points)?0===t.points.length?e.push("At least one point is required"):t.points.forEach(((t,i)=>{const s=this.validatePoint(t,i);e.push(...s)})):e.push("Points array is required"),void 0!==t.radius&&t.radius<1&&e.push("Radius must be at least 1"),void 0!==t.blur&&t.blur<0&&e.push("Blur must be at least 0 pixels"),void 0!==t.opacity&&(t.opacity<0||t.opacity>1)&&e.push("Opacity must be between 0 and 1"),void 0!==t.scale_margin&&(t.scale_margin<0||t.scale_margin>50)&&e.push("Scale margin must be between 0 and 50"),void 0!==t.update_interval&&(t.update_interval<5||t.update_interval>3600)&&e.push("Update interval must be between 5 and 3600 seconds"),void 0!==t.min_value&&t.min_value<0&&e.push("Min value must be greater than or equal to 0"),void 0!==t.max_value&&t.max_value<=0&&e.push("Max value must be greater than 0"),void 0!==t.min_value&&void 0!==t.max_value&&t.min_value>=t.max_value&&e.push("Min value must be less than max value"),t.gradient){const i=this.validateGradient(t.gradient);e.push(...i)}return{valid:0===e.length,errors:e}}static validatePoint(t,e){const i=[],s=`Point ${e+1}:`;return void 0!==t.x&&"number"==typeof t.x||i.push(`${s} x coordinate is required and must be a number`),void 0!==t.y&&"number"==typeof t.y||i.push(`${s} y coordinate is required and must be a number`),t.entity_id||void 0!==t.value||i.push(`${s} must have either entity_id or value`),t.entity_id&&void 0!==t.value&&i.push(`${s} cannot have both entity_id and value`),void 0!==t.weight&&(t.weight<.1||t.weight>2)&&i.push(`${s} weight must be between 0.1 and 2.0`),i}static validateGradient(t){const e=[];if("object"!=typeof t)return e.push("Gradient must be an object"),e;return Object.keys(t).forEach((i=>{const s=parseFloat(i);(isNaN(s)||s<0||s>1)&&e.push(`Gradient position ${i} must be a number between 0 and 1`);const n=t[i];"string"==typeof n&&this.isValidColor(n)||e.push(`Gradient color at position ${i} is not a valid color`)})),e}static isValidColor(t){return/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(t)||["red","green","blue","yellow","orange","purple","black","white","gray","grey"].includes(t.toLowerCase())}static getDefaultConfig(){return{radius:40,blur:15,opacity:.6,auto_scale:!1,scale_margin:0,update_interval:30,show_legend:!1,legend_unit:"",show_labels:!1,gradient:{0:"#d3d3d3",.5:"#ffff00",1:"#ff0000"}}}}console.log("simpleheat imported:",typeof gt),window.customCards=window.customCards||[],window.customCards.push({type:"heatmap-card",name:"Heatmap Card",preview:!0,description:"A custom card for displaying heatmaps on background images"});let mt=_t=class extends rt{constructor(){super(...arguments),this._error=null,this._loading=!0,this._imageLoaded=!1,this._currentValues=new Map,this._heatmapInstance=null,this._container=null,this._updateInterval=null,this._resizeObserver=null,this._entities=new Set,this._canvasElement=null}static async getConfigElement(){const t=document.createElement("div");return t.innerHTML="This card is configured using YAML. Please use the YAML editor.",t}static getStubConfig(){return{type:"custom:heatmap-card",background:"/local/heatmap-card/map_test.png",points:[{x:100,y:150,entity_id:"sensor.your_temperature_sensor",label:"Living Room (Example)"},{x:200,y:50,value:65,label:"kitchen",weight:.8},{x:300,y:220,value:25,label:"Office (Example Static)",weight:.8}],radius:50,blur:40,opacity:.7,auto_scale:!0,scale_margin:10,update_interval:30,show_legend:!0,legend_position:"bottom",legend_unit:"",show_labels:!0,error_message:"Error loading heatmap data.",gradient:ft.getDefaultConfig().gradient}}static get styles(){return r`
      :host {
        display: block;
        position: relative;
        line-height: 0; /* Attempt to fix extra space */
      }

      .card-container {
        position: relative;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--ha-card-background, var(--card-background-color, white));
        line-height: 0; /* Attempt to fix extra space */
      }

      .heatmap-wrapper {
        position: relative;
        display: block; /* Changed from inline-block to prevent extra space */
        line-height: 0; /* Remove line-height spacing */
        overflow: hidden; /* Prevent any internal overflow from adding space */
      }

      .background-image {
        display: block; /* Default state, will be made visible on load */
        max-width: 100%;
        height: auto;
        vertical-align: top;
        opacity: 0; /* Hidden until loaded */
        transition: opacity 0.3s ease-in-out;
      }

      .background-image.loaded {
        opacity: 1;
      }

      #heatmap-canvas-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5; /* Ensure it's above the image but below labels/legend */
        pointer-events: none; /* Allow mouse events to pass through for tooltips */
      }

      #heatmap-canvas-container canvas {
        position: absolute;
        top: 0;
        left: 0;
      }

      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
        color: var(--primary-text-color);
        z-index: 10; /* Ensure it's above the (initially invisible) image */
      }

      .loading-overlay.hidden {
        display: none;
      }

      .heatmap-canvas {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
      }
      
      .error-container {
        padding: 16px;
        background-color: var(--error-background-color, #fdecea);
        border-radius: var(--ha-card-border-radius, 4px);
      }

      .error-title {
        font-weight: bold;
        color: var(--error-color, var(--primary-text-color));
        margin-bottom: 8px;
        font-size: 1.2em;
      }
      
      .error-message {
        color: var(--error-color, var(--primary-text-color));
        white-space: pre-wrap;
      }

      .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 150px;
        padding: 16px;
        color: var(--primary-text-color);
      }
      .loading p {
        margin-top: 10px;
      }

      .legend {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
        font-size: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 20;
        display: flex;
        align-items: flex-end;
      }

      .legend-gradient {
        width: 20px;
        height: 100px;
        border: 1px solid #ccc;
      }

      .legend-labels {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        height: 100px;
        justify-content: space-between;
        text-align: left;
        width: auto;
      }

      .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.2s;
        white-space: nowrap;
      }

      .tooltip.visible {
        opacity: 1;
      }

      .point-label {
        position: absolute;
        font-size: 11px;
        color: var(--primary-text-color);
        background: transparent;
        padding: 2px 4px;
        border-radius: 2px;
        pointer-events: none;
        transform: translate(-50%, -150%);
        white-space: nowrap;
        z-index: 20; /* Ensure labels are above heatmap */
      }
    `}setConfig(t){let e;if(!t.background||!t.points||Object.keys(t).length<=2){e={..._t.getStubConfig(),...t}}else{e={...ft.getDefaultConfig(),...t}}this._config=e;const i=ft.validate(this._config);if(!i.valid)return this._error=`Configuration Error:\n- ${i.errors.join("\n- ")}`,console.error("HeatmapCard Configuration Errors:",i.errors),void this.requestUpdate();this._error=null,this._loading=!0,this._imageLoaded=!1,this._entities.clear(),this._config.points.forEach((t=>{t.entity_id&&this._entities.add(t.entity_id)})),this.hass&&this._updateEntityValues(),this._startUpdateInterval(),this.requestUpdate()}getCardSize(){return this._config?.height?Math.round(this._config.height/50):4}firstUpdated(t){super.firstUpdated(t),this._config?(this._imageLoaded&&this.shadowRoot?(this._setupHeatmap(),this._updateHeatmap()):!this._config.background&&this.shadowRoot?(this._loading=!1,this._imageLoaded=!0,this._setupHeatmap(),this._updateHeatmap()):this._config.background||(this._loading=!1,this._imageLoaded=!0),this._startUpdateInterval()):this._error||(this._error="Card configuration not loaded."),this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.hass&&this._config&&this._entities.size>0&&(this._updateEntityValues(),this._imageLoaded&&this._updateHeatmap())}disconnectedCallback(){super.disconnectedCallback(),this._stopUpdateInterval(),this._resizeObserver&&this._resizeObserver.disconnect()}updated(t){super.updated(t),t.has("hass")&&this.hass&&this._config&&(this._updateEntityValues(),this._imageLoaded&&this._heatmapInstance&&this._updateHeatmap()),t.has("_config")&&void 0!==t.get("_config")&&this._imageLoaded&&(this.shadowRoot&&this._setupHeatmap(),this._updateHeatmap())}render(){return this._config||this._error?this._error?j`
        <ha-card .header="${this._config?.title||"Heatmap Card"}">
          <div class="error-container">
            <div class="error-title">${this._error.startsWith("Configuration Error:")?"Configuration Error":"Error"}</div>
            <pre class="error-message">${this._error.startsWith("Configuration Error:")?this._error.substring(21):this._error}</pre>
          </div>
        </ha-card>
      `:j`
      <ha-card .header="${this._config.title||"Heatmap Card"}">
        <div class="card-container">
          <div class="heatmap-wrapper" id="heatmap-wrapper">
            ${this._config.background?j`
              <img
                class="background-image ${this._imageLoaded?"loaded":""}"
                src="${this._config.background}"
                @load="${this._onImageLoad}"
                @error="${this._onImageError}"
                alt="Heatmap Background"
                style="${this._imageLoaded?"":"display: block; visibility: hidden;"}" /* Keep in layout, but hidden */
              />
              ${this._loading&&!this._imageLoaded?j`
                <div class="loading-overlay ${this._imageLoaded?"hidden":""}">
                  <ha-circular-progress indeterminate></ha-circular-progress>
                  <p>Loading Background Image...</p>
                  ${this._config.width&&this._config.height?j`<div style="width: ${this._config.width}px; height: ${this._config.height}px; position:absolute; top:0; left:0; z-index:-1;"></div>`:""}
                </div>
              `:""}
            `:""}
            
            ${!this._config.show_labels||!this._imageLoaded&&this._config.background?"":this._renderLabels()}
            ${!this._config.show_legend||!this._imageLoaded&&this._config.background?"":this._renderLegend()}
          </div>
          <div class="tooltip" id="tooltip"></div>
        </div>
      </ha-card>
    `:j`
            <ha-card header="Heatmap Card">
                <div class="loading-overlay">
                    <ha-circular-progress indeterminate></ha-circular-progress>
                    <p>Initializing Card...</p>
                </div>
            </ha-card>
        `}_renderLabels(){return this._config&&this._config.show_labels?j`
      ${this._config.points.map((t=>{if(!t.label)return"";const e=this._getPointValue(t);return"number"!=typeof t.x||"number"!=typeof t.y?"":j`
          <div
            class="point-label"
            style="left: ${t.x}px; top: ${t.y}px;"
          >
            ${t.label}: ${null!==e?e.toFixed(1):"N/A"}${this._config.legend_unit||""}
          </div>
        `}))}
    `:""}_renderLegend(){if(!this._config||!this._config.show_legend)return"";const t=this._getMinValue(),e=this._getMaxValue(),i=this._createGradientString();return console.log(`HeatmapLegend: minValue = ${t}, maxValue = ${e}`),null===t||null===e?"":j`
      <div class="legend">
        <div
          class="legend-gradient"
          style="background: linear-gradient(${this._getLegendGradientDirection()}, ${i});"
        ></div>
        <div class="legend-labels">
          <span>${e.toFixed(1)}${this._config.legend_unit||""}</span>
          <span>${t.toFixed(1)}${this._config.legend_unit||""}</span>
        </div>
      </div>
    `}_getLegendGradientDirection(){return"to top"}_createGradientString(){const t=this._config.gradient||ft.getDefaultConfig().gradient||{},e=Object.keys(t).map((t=>parseFloat(t))).sort(((t,e)=>t-e));return e.map((e=>`${t[e]} ${100*e}%`)).join(", ")}_onImageLoad(){this._config&&(this._imageLoaded=!0,this._loading=!1,this.requestUpdate(),requestAnimationFrame((()=>{this.shadowRoot&&(this._setupHeatmap(),this._updateHeatmap())})))}_onImageError(){this._config&&(console.error("HeatmapCard _onImageError: Failed to load background image at",this._config.background),this._loading=!1,this._imageLoaded=!1,this._error=this._config.error_message||`Failed to load background image: ${this._config.background}`,this.requestUpdate())}_setupHeatmap(){if(!this.shadowRoot)return;const t=this.shadowRoot.getElementById("heatmap-wrapper");if(!t||!this._imageLoaded&&this._config.background||!this._config)return;let e,i;if(this._container||(this._container=this.shadowRoot.getElementById("heatmap-canvas-container"),this._container||(this._container=document.createElement("div"),this._container.id="heatmap-canvas-container",t&&t.appendChild(this._container))),this._container&&!this._container.parentElement&&t&&t.appendChild(this._container),this._config.background){const s=t.querySelector(".background-image");if(s&&s.complete&&s.naturalWidth&&s.naturalHeight)e=this._config.width||s.naturalWidth,i=this._config.height||s.naturalHeight;else{if(!this._config.width||!this._config.height)return this._error=`Background image ('${this._config.background||""}') invalid & no card dimensions.`,this._imageLoaded=!1,void this.requestUpdate();e=this._config.width,i=this._config.height}}else e=this._config.width||t.clientWidth||300,i=this._config.height||t.clientHeight||200;if(!e||!i)return this._error="Failed to determine dimensions for heatmap.",this._config.background&&(this._imageLoaded=!1),void this.requestUpdate();this._container.style.width=`${e}px`,this._container.style.height=`${i}px`,this._canvasElement||(this._canvasElement=this.shadowRoot.querySelector("#heatmap-canvas-element"),this._canvasElement||(this._canvasElement=document.createElement("canvas"),this._canvasElement.id="heatmap-canvas-element",this._container.appendChild(this._canvasElement))),this._canvasElement.parentElement!==this._container&&this._container.appendChild(this._canvasElement),this._canvasElement.width=e,this._canvasElement.height=i;try{this._heatmapInstance=gt(this._canvasElement),this._heatmapInstance.radius(this._config.radius||25,this._config.blur||15);const t=this._config.gradient||ft.getDefaultConfig().gradient;t&&this._heatmapInstance.gradient(t)}catch(t){return console.error("Error creating simpleheat instance:",t),this._error="Failed to create heatmap instance (simpleheat). Check console.",void this.requestUpdate()}this._setupMouseEvents(),this._setupResizeObserver(t)}_setupMouseEvents(){const t=this.shadowRoot?.getElementById("heatmap-wrapper");if(!t)return;const e=this.shadowRoot?.getElementById("tooltip");e&&(t.onmousemove=i=>{const s=t.getBoundingClientRect(),n=i.clientX-s.left,a=i.clientY-s.top,r=this._findNearestPoint(n,a);if(r&&this._config.radius&&this._getDistance(n,a,r.x,r.y)<(this._config.radius||40)){const t=this._getPointValue(r);e.innerHTML=`${r.label||"Value"}: ${null!==t?t.toFixed(1):"N/A"}${this._config.legend_unit||""}`,e.style.left=`${i.clientX+15}px`,e.style.top=i.clientY-30+"px",e.classList.add("visible")}else e.classList.remove("visible")},t.onmouseleave=()=>{e.classList.remove("visible")})}_findNearestPoint(t,e){if(!this._config||!this._config.points)return null;let i=null,s=1/0;return this._config.points.forEach((n=>{if("number"!=typeof n.x||"number"!=typeof n.y)return;const a=this._getDistance(t,e,n.x,n.y);a<s&&(s=a,i=n)})),i}_getDistance(t,e,i,s){return Math.sqrt(Math.pow(i-t,2)+Math.pow(s-e,2))}_setupResizeObserver(t){this._resizeObserver&&this._resizeObserver.disconnect(),this._resizeObserver=new ResizeObserver((t=>{this.shadowRoot&&this._imageLoaded&&this._config&&(this._setupHeatmap(),this._updateHeatmap())})),t?this._resizeObserver.observe(t):console.warn("HeatmapCard ResizeObserver: observeTarget is null, cannot observe.")}_updateEntityValues(){if(!this.hass||!this._config||!this._entities)return;let t=!1;this._entities.forEach((e=>{const i=this.hass.states[e],s=this._currentValues.get(e);if(i&&"unavailable"!==i.state&&"unknown"!==i.state){const n=parseFloat(i.state);isNaN(n)?void 0!==s&&(this._currentValues.delete(e),t=!0):this._currentValues.get(e)!==n&&(this._currentValues.set(e,n),t=!0)}else void 0!==s&&(this._currentValues.delete(e),t=!0)})),t&&this._imageLoaded&&this._heatmapInstance&&this._updateHeatmap()}_getPointValue(t){if(void 0!==t.value)return t.value;if(t.entity_id&&this.hass){if(this._currentValues.has(t.entity_id))return this._currentValues.get(t.entity_id);const e=this.hass.states[t.entity_id];if(e&&"unavailable"!==e.state&&"unknown"!==e.state){const t=parseFloat(e.state);return isNaN(t)?null:t}}return null}_updateHeatmap(){if(!this._heatmapInstance||!this._config||!this._config.points)return;const t=[],e=[];if(this._config.points.forEach((i=>{const s=this._getPointValue(i);if(null!==s&&"number"==typeof i.x&&"number"==typeof i.y){e.push(s);const n=s*(void 0!==i.weight?i.weight:1);t.push([Math.round(i.x),Math.round(i.y),n])}})),0===t.length&&this._config.points.length>0)return this._heatmapInstance.clear(),void this._heatmapInstance.draw(0);const i=this._getMinValue(e),s=this._getMaxValue(e);if(null===i||null===s)return this._heatmapInstance.clear(),void this._heatmapInstance.draw(0);let n=0;n=this._config.auto_scale&&t.length>0?t.reduce(((t,e)=>Math.max(t,e[2])),0):void 0!==this._config.max_value?this._config.max_value:100,t.length>0&&0===n&&e.some((t=>0!==t))?n=Math.max(...e.map((t=>Math.abs(t))),1):0===n&&t.length>0&&(n=1),this._heatmapInstance.clear(),this._heatmapInstance.data(t),this._heatmapInstance.max(n),this._heatmapInstance.radius(this._config.radius||25,this._config.blur||15);const a=this._config.gradient||ft.getDefaultConfig().gradient;a&&this._heatmapInstance.gradient(a);const r=void 0!==this._config.opacity?this._config.opacity/2:.05;this._heatmapInstance.draw(r)}_getMinValue(t){if(void 0!==this._config.min_value)return this._config.min_value;const e=t||this._config.points.map((t=>this._getPointValue(t))).filter((t=>null!==t));if(0===e.length)return 0;if(this._config.auto_scale){const t=Math.min(...e);if(!isFinite(t))return 0;const i=Math.max(...e);if(!isFinite(i))return t;const s=void 0!==this._config.scale_margin?this._config.scale_margin:0,n=i-t;return 0===n?t:t-n*s/100}return 0}_getMaxValue(t){if(void 0!==this._config.max_value)return this._config.max_value;const e=t||this._config.points.map((t=>this._getPointValue(t))).filter((t=>null!==t));if(0===e.length)return 100;if(this._config.auto_scale){const t=Math.min(...e),i=Math.max(...e);if(!isFinite(i))return 100;if(!isFinite(t)&&isFinite(i))return i;if(!isFinite(t)&&!isFinite(i))return 100;const s=void 0!==this._config.scale_margin?this._config.scale_margin:0,n=i-t;return 0===n?i:i+n*s/100}return 100}_startUpdateInterval(){if(this._stopUpdateInterval(),!this._config||void 0===this._config.update_interval)return;const t=this._config.update_interval;t>=5&&t<=3600?this._updateInterval=window.setInterval((()=>{this._updateEntityValues()}),1e3*t):console.warn(`HeatmapCard: Invalid update_interval (${t}s), not starting timer.`)}_stopUpdateInterval(){this._updateInterval&&(window.clearInterval(this._updateInterval),this._updateInterval=null)}};t([dt({attribute:!1})],mt.prototype,"hass",void 0),t([ct()],mt.prototype,"_config",void 0),t([ct()],mt.prototype,"_error",void 0),t([ct()],mt.prototype,"_loading",void 0),t([ct()],mt.prototype,"_imageLoaded",void 0),t([ct()],mt.prototype,"_currentValues",void 0),mt=_t=t([(t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)})("heatmap-card")],mt);export{mt as HeatmapCard};
