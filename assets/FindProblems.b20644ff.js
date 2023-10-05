import{j as e,F as d,a as n,c as y,R as g,r as m,d as v,e as k,f as P}from"./jsx-runtime.29fd2640.js";import{P as x}from"./ProblemLabel.3d6ef5c6.js";/* empty css            */import{B as N}from"./back_arrow.a8ae2f91.js";function B({searchType:c}){if(c=="problemName")return e(d,{children:e("input",{type:"text",id:"search",class:"name",placeholder:"Problem Name"})});if(c=="problemCategory")return n(d,{children:[e("button",{onClick:function(h){const l=document.querySelector(".dropdown");l.classList.contains("hidden")?(l.classList.remove("hidden"),l.classList.add("visible")):(l.classList.remove("visible"),l.classList.add("hidden"))},class:"menu-btn",type:"button",children:"Categories"}),n("div",{className:"dropdown hidden category",id:"search",children:[e("span",{class:"menu-option",children:n("label",{children:[e("input",{type:"checkbox"}),"Numbers"]})}),e("br",{}),e("span",{class:"menu-option",children:n("label",{children:[e("input",{type:"checkbox"}),"Words"]})}),e("br",{}),e("span",{class:"menu-option",children:n("label",{children:[e("input",{type:"checkbox"}),"Misc"]})}),e("br",{}),e("span",{class:"menu-option",children:n("label",{children:[e("input",{type:"checkbox"}),"Integers"]})}),e("br",{}),e("span",{class:"menu-option",children:n("label",{children:[e("input",{type:"checkbox"}),"Averages"]})}),e("br",{}),e("span",{class:"menu-option",children:n("label",{children:[e("input",{type:"checkbox"}),"Triangles"]})}),e("br",{}),e("span",{class:"menu-option",children:n("label",{children:[e("input",{type:"checkbox"}),"Print"]})}),e("br",{}),e("span",{class:"menu-option",children:n("label",{children:[e("input",{type:"checkbox"}),"Medians"]})})]})]});if(c=="problemDifficulty")return n("select",{name:"difficulty",class:"difficultyChoice",id:"search",children:[e("option",{value:"Easy",children:"Easy"}),e("option",{value:"Medium",children:"Medium"}),e("option",{value:"Hard",children:"Hard"})]});console.log(c)}y.createRoot(document.getElementById("root")).render(e(g.StrictMode,{children:e(C,{})}));function C(){const[c,t]=m.exports.useState([]),[h,l]=m.exports.useState("problemName");async function p(o){const r=document.getElementById("search");if(console.log(r.className),r.className=="name"){console.log("name");const s=await v(r.value);t(s)}if(r.classList.contains("category")){console.log("category");const s=r.getElementsByTagName("input");let a=[];for(let i=0;i<s.length;i++)s[i].checked&&a.push(s[i].parentNode.textContent);console.log(a);const f=await k(a);t(f)}if(r.className=="difficultyChoice"){console.log("difficulty");const s=await P(r.value);t(s)}}function u(o){l(o.target.value)}function b(o){window.location.href="/TechFestTraining/"}return e(d,{children:n("div",{class:"ProblemSearch",children:[e("img",{src:N,className:"backArrow",onClick:b}),e("h1",{children:"Search for Problem"}),e("br",{}),n("select",{name:"searchBy",id:"searchBy",onChange:u,children:[e("option",{value:"problemName",children:"Problem Name"}),e("option",{value:"problemCategory",children:"Problem Category"}),e("option",{value:"problemDifficulty",children:"Problem Difficulty"})]}),e(B,{searchType:h}),e("button",{id:"searchBtn",onClick:p,children:"Search"}),e("h2",{children:"Search Results"}),n("div",{class:"searchResults",children:[console.log(c,"PROBLEMS"),c.map(o=>(console.log(o),e(x,{problem:o,folderName:o.folder},o.id)))]})]})})}