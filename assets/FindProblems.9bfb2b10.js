import{j as e,F as d,a as o,c as y,R as g,r as m,d as v,e as k,f as P}from"./jsx-runtime.29fd2640.js";import{P as x}from"./ProblemLabel.2ff808bf.js";/* empty css            */import{B as N}from"./back_arrow.a8ae2f91.js";function B({searchType:c}){if(c=="problemName")return e(d,{children:e("input",{type:"text",id:"search",class:"name",placeholder:"Problem Name"})});if(c=="problemCategory")return o(d,{children:[e("button",{onClick:function(h){const l=document.querySelector(".dropdown");l.classList.contains("hidden")?(l.classList.remove("hidden"),l.classList.add("visible")):(l.classList.remove("visible"),l.classList.add("hidden"))},class:"menu-btn",type:"button",children:"Categories"}),o("div",{className:"dropdown hidden category",id:"search",children:[e("span",{class:"menu-option",children:o("label",{children:[e("input",{type:"checkbox"}),"Numbers"]})}),e("br",{}),e("span",{class:"menu-option",children:o("label",{children:[e("input",{type:"checkbox"}),"Words"]})}),e("br",{}),e("span",{class:"menu-option",children:o("label",{children:[e("input",{type:"checkbox"}),"Misc"]})}),e("br",{}),e("span",{class:"menu-option",children:o("label",{children:[e("input",{type:"checkbox"}),"Integers"]})}),e("br",{}),e("span",{class:"menu-option",children:o("label",{children:[e("input",{type:"checkbox"}),"Averages"]})}),e("br",{}),e("span",{class:"menu-option",children:o("label",{children:[e("input",{type:"checkbox"}),"Triangles"]})}),e("br",{}),e("span",{class:"menu-option",children:o("label",{children:[e("input",{type:"checkbox"}),"Print"]})}),e("br",{}),e("span",{class:"menu-option",children:o("label",{children:[e("input",{type:"checkbox"}),"Medians"]})})]})]});if(c=="problemDifficulty")return o("select",{name:"difficulty",class:"difficultyChoice",id:"search",children:[e("option",{value:"Easy",children:"Easy"}),e("option",{value:"Medium",children:"Medium"}),e("option",{value:"Hard",children:"Hard"})]});console.log(c)}y.createRoot(document.getElementById("root")).render(e(g.StrictMode,{children:e(C,{})}));function C(){const[c,t]=m.exports.useState([]),[h,l]=m.exports.useState("problemName");async function p(n){const r=document.getElementById("search");if(console.log(r.className),r.className=="name"){console.log("name");const s=await v(r.value);t(s)}if(r.classList.contains("category")){console.log("category");const s=r.getElementsByTagName("input");let i=[];for(let a=0;a<s.length;a++)s[a].checked&&i.push(s[a].parentNode.textContent);console.log(i);const f=await k(i);t(f)}if(r.className=="difficultyChoice"){console.log("difficulty");const s=await P(r.value);t(s)}}function u(n){l(n.target.value)}function b(n){}return e(d,{children:o("div",{class:"ProblemSearch",children:[e("img",{src:N,className:"backArrow",onClick:b}),e("h1",{children:"Search for Problem"}),e("br",{}),o("select",{name:"searchBy",id:"searchBy",onChange:u,children:[e("option",{value:"problemName",children:"Problem Name"}),e("option",{value:"problemCategory",children:"Problem Category"}),e("option",{value:"problemDifficulty",children:"Problem Difficulty"})]}),e(B,{searchType:h}),e("button",{id:"searchBtn",onClick:p,children:"Search"}),e("h2",{children:"Search Results"}),o("div",{class:"searchResults",children:[console.log(c,"PROBLEMS"),c.map(n=>(console.log(n),e(x,{problem:n,folderName:n.folder},n.id)))]})]})})}
