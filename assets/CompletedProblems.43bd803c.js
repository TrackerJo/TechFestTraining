import{r as t,j as e,a as i,w as m,x as n,c as d,R as b}from"./jsx-runtime.29fd2640.js";/* empty css            */import{P}from"./ProblemLabel.3d6ef5c6.js";import{B as f}from"./back_arrow.a8ae2f91.js";/* empty css              */function g(){const[a,c]=t.exports.useState([]);new URLSearchParams(window.location.search).get("folderName"),t.exports.useEffect(()=>{async function o(){console.log("Getting Problems");const s=await n();console.log(s,"Problems"),c(s)}function r(){m()==1?o():setTimeout(r,500)}r()},[]);function l(o){window.location.href="/TechFestTraining/"}return e("div",{className:"ProblemList",children:i("div",{children:[e("img",{src:f,className:"backArrow",onClick:l}),e("h1",{children:"Completed Problems"}),e("br",{}),e("div",{class:"Problems",children:a.map(o=>e(P,{problem:o,folderName:o.folderName},o.id))})]})})}d.createRoot(document.getElementById("root")).render(e(b.StrictMode,{children:e(g,{})}));
