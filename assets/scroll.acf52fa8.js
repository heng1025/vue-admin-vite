import{bb as R,b2 as b,al as _,aJ as v,bc as $}from"./index.07bb648d.js";var A=/\s/;function H(e){for(var n=e.length;n--&&A.test(e.charAt(n)););return n}var L=/^\s+/;function M(e){return e&&e.slice(0,H(e)+1).replace(L,"")}var W=0/0,P=/^[-+]0x[0-9a-f]+$/i,F=/^0b[01]+$/i,j=/^0o[0-7]+$/i,D=parseInt;function C(e){if(typeof e=="number")return e;if(R(e))return W;if(b(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=b(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=M(e);var t=F.test(e);return t||j.test(e)?D(e.slice(2),t?2:8):P.test(e)?W:+e}var J=function(){return _.Date.now()};const w=J;var U="Expected a function",V=Math.max,X=Math.min;function G(e,n,t){var i,o,f,l,s,a,u=0,x=!1,d=!1,g=!0;if(typeof e!="function")throw new TypeError(U);n=C(n)||0,b(t)&&(x=!!t.leading,d="maxWait"in t,f=d?V(C(t.maxWait)||0,n):f,g="trailing"in t?!!t.trailing:g);function y(r){var c=i,m=o;return i=o=void 0,u=r,l=e.apply(m,c),l}function N(r){return u=r,s=setTimeout(p,n),x?y(r):l}function k(r){var c=r-a,m=r-u,E=n-c;return d?X(E,f-m):E}function I(r){var c=r-a,m=r-u;return a===void 0||c>=n||c<0||d&&m>=f}function p(){var r=w();if(I(r))return S(r);s=setTimeout(p,k(r))}function S(r){return s=void 0,g&&i?y(r):(i=o=void 0,l)}function B(){s!==void 0&&clearTimeout(s),u=0,i=a=o=s=void 0}function O(){return s===void 0?l:S(w())}function T(){var r=w(),c=I(r);if(i=arguments,o=this,a=r,c){if(s===void 0)return N(a);if(d)return clearTimeout(s),s=setTimeout(p,n),y(a)}return s===void 0&&(s=setTimeout(p,n)),l}return T.cancel=B,T.flush=O,T}const q=(e,n)=>{if(!v)return!1;const t={undefined:"overflow",true:"overflow-y",false:"overflow-x"}[String(n)],i=$(e,t);return["scroll","auto","overlay"].some(o=>i.includes(o))},K=(e,n)=>{if(!v)return;let t=e;for(;t;){if([window,document,document.documentElement].includes(t))return window;if(q(t,n))return t;t=t.parentNode}return t};let h;const Q=e=>{var n;if(!v)return 0;if(h!==void 0)return h;const t=document.createElement("div");t.className=`${e}-scrollbar__wrap`,t.style.visibility="hidden",t.style.width="100px",t.style.position="absolute",t.style.top="-9999px",document.body.appendChild(t);const i=t.offsetWidth;t.style.overflow="scroll";const o=document.createElement("div");o.style.width="100%",t.appendChild(o);const f=o.offsetWidth;return(n=t.parentNode)==null||n.removeChild(t),h=i-f,h};function Y(e,n){if(!v)return;if(!n){e.scrollTop=0;return}const t=[];let i=n.offsetParent;for(;i!==null&&e!==i&&e.contains(i);)t.push(i),i=i.offsetParent;const o=n.offsetTop+t.reduce((a,u)=>a+u.offsetTop,0),f=o+n.offsetHeight,l=e.scrollTop,s=l+e.clientHeight;o<l?e.scrollTop=o:f>s&&(e.scrollTop=f-e.clientHeight)}export{Q as a,G as d,K as g,Y as s};
