export const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
export function toast(m){const e=document.querySelector("#toast");e.textContent=m;e.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display="none",2600)}
export function imageUrl(obj){if(!obj)return "";if(obj.startsWith("data:")||obj.startsWith("blob:")||obj.startsWith("http")||obj.startsWith("./"))return obj;return ""}
