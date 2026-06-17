const checklist = Array(16).fill("");

const data =
JSON.parse(
localStorage.getItem("mdroData") || "[]"
);

let totalYes = 0;
let totalNo = 0;

let result = [];

for(let i=0;i<16;i++){

let yes = 0;
let no = 0;

data.forEach(r=>{

if(r.answers[i]=="YES") yes++;

if(r.answers[i]=="NO") no++;

});

result.push({
yes,
no
});

totalYes += yes;
totalNo += no;

}

const overall =
(totalYes + totalNo)==0
? 0
: ((totalYes/(totalYes+totalNo))*100);

document.getElementById(
"overallRate"
).innerHTML =

overall.toFixed(1) +
"%<br>("+
totalYes+
"/"+
(totalYes+totalNo)+
")";

const tbody =
document.getElementById(
"resultTable"
);

result.forEach((r,index)=>{

const total =
r.yes + r.no;

const yesPct =
total==0
? 0
: (r.yes/total*100);

const noPct =
total==0
? 0
: (r.no/total*100);

tbody.innerHTML += `
<tr>

<td>${index+1}</td>

<td>
${yesPct.toFixed(1)}%
(${r.yes}/${total})
</td>

<td>
${noPct.toFixed(1)}%
(${r.no}/${total})
</td>

</tr>
`;

});

new Chart(
document.getElementById("pieChart"),
{
type:"pie",
data:{
labels:["ปฏิบัติ","ไม่ปฏิบัติ"],
datasets:[{
data:[
totalYes,
totalNo
]
}]
}
}
);

new Chart(
document.getElementById("barChart"),
{
type:"bar",
data:{
labels:[
"1","2","3","4","5","6","7","8",
"9","10","11","12","13","14","15","16"
],
datasets:[{
label:"% การปฏิบัติ",
data:result.map(r=>{

let t=r.yes+r.no;

return t==0
? 0
: (r.yes/t*100);

})
}]
}
}
);
