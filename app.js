```javascript
const checklist = [

"แจ้ง ICN ทันทีเมื่อมีผู้ป่วยติดเชื้อดื้อยามาใช้บริการ โทร 102",
"แจ้งบุคลากรทุกคนในหอผู้ป่วยทราบ",
"แยกผู้ป่วยในห้องแยกหรือโซนติดเชื้อชนิดเดียวกัน",
"ติดป้าย Contact precautions ที่เตียงหรือหน้าห้องผู้ป่วย",
"ไม่วางสิ่งของและอุปกรณ์ของใช้บนเตียงผู้ป่วย",
"แยกอุปกรณ์ของใช้ เช่น ปรอทวัดไข้ เครื่องวัดความดัน หูฟัง รวมทั้งอุปกรณ์ทำความสะอาดเฉพาะรายต่อราย",
"จัดเตรียม Alcohol gel hand rub ไว้ที่หน้าห้องผู้ป่วย/ปลายเตียงผู้ป่วย",
"ล้างมือทุกครั้งก่อนและหลังสัมผัสผู้ป่วย",
"สวม PPE ถูกต้อง",
"แยกผ้าและขยะเป็นประเภทติดเชื้อ",
"ทำความสะอาดสิ่งแวดล้อมด้วย POSEQUAT 5G",
"เคลื่อนย้ายผู้ป่วยแจ้งหน่วยงานที่เกี่ยวข้อง",
"พนักงานเปลสวม PPE ถูกต้อง",
"จำกัดบุคลากร/ผู้เฝ้าไข้",
"ให้คำแนะนำผู้ป่วยและญาติ",
"ทำการเพาะเชื้อเพื่อยุติ Contact Precautions"

];

const div = document.getElementById("checklist");

checklist.forEach((item,index)=>{

div.innerHTML += `
<div class="card mb-2">
<div class="card-body">

<b>${index+1}. ${item}</b>

<div class="mt-2">

<label class="me-4">
<input type="radio"
name="q${index}"
value="YES">
ปฏิบัติ
</label>

<label>
<input type="radio"
name="q${index}"
value="NO">
ไม่ปฏิบัติ
</label>

</div>

</div>
</div>
`;

});

function saveData(){

let record = {

date:document.getElementById("auditDate").value,
ward:document.getElementById("ward").value,
auditor:document.getElementById("auditor").value,
organism:document.getElementById("organism").value,
answers:[]

};

for(let i=0;i<16;i++){

let ans =
document.querySelector(
`input[name="q${i}"]:checked`
);

record.answers.push(
ans ? ans.value : ""
);

}

let data =
JSON.parse(
localStorage.getItem("mdroData") || "[]"
);

data.push(record);

localStorage.setItem(
"mdroData",
JSON.stringify(data)
);

alert("บันทึกข้อมูลเรียบร้อย");

location.reload();

}
```
