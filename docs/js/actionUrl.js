/* minified */
(function(){var n,e,t,u,r,c,i,l,o,a,f;n=(n="animate")||"animate",o="?party=",r='input[name="'+n+'"]',t=document.querySelectorAll(r),c=document.querySelectorAll("label"),(l=window.location.href).includes(o)?(a=l.split(o).pop(),f=o<a?a.split("&"):[]):f=[],u=0,t.forEach((function(){return f.includes(t[u].value)&&(t[u].checked=!0),u++})),u=0,c.forEach((function(){return c[u].addEventListener("click",(function(){return i()})),u++})),e=function(n,e){return n.filter((function(n){return n!==e}))},i=function(){return setTimeout((function(){var n,r,c;return u=0,t.forEach((function(){return t[u].checked?f.includes(t[u].value)||f.push(t[u].value):f.includes(t[u].value)&&(f=e(f,t[u].value)),u++})),r=f.join("&"),c=o,r||(c="."),n=c+r,window.history.pushState(n,"CACUPA",n)}),0)}}).call(this);