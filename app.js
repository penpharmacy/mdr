// ===============================
// Google Apps Script URL
// ===============================

const API_URL =
"https://script.google.com/macros/s/AKfycbxFWuCunHJGn05HQRGd7L5bwZ23QDIpT4ZrqYWuqVhvqXdex8SZr6IVym5EltmTW5WSPg/exec";


// ===============================
// Checklist
// ===============================

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


// ===============================
// สร้างรายการประเมิน
// ===============================

const div = document.getElementById("checklist");

if(div){

    checklist.forEach((item,index)=>{

        div.innerHTML += `

        <div class="card mb-2 shadow-sm">

            <div class="card-body">

                <div class="fw-bold mb-2">
                    ${index+1}. ${item}
                </div>

                <label class="me-4">

                    <input
                        type="radio"
                        name="q${index}"
                        value="YES">

                    ปฏิบัติ

                </label>

                <label>

                    <input
                        type="radio"
                        name="q${index}"
                        value="NO">

                    ไม่ปฏิบัติ

                </label>

            </div>

        </div>

        `;

    });

}


// ===============================
// Save Data
// ===============================

async function saveData(){

    try{

        const auditDate =
        document.getElementById("auditDate").value;

        const ward =
        document.getElementById("ward").value;

        const auditor =
        document.getElementById("auditor").value;

        const organism =
        document.getElementById("organism").value;

        if(!auditDate){

            alert("กรุณาระบุวันที่ประเมิน");

            return;

        }

        let record = {

            audit_date : auditDate,
            ward : ward,
            auditor : auditor,
            organism : organism

        };

        let yes = 0;
        let no = 0;

        for(let i=0;i<16;i++){

            let answer = document.querySelector(
                `input[name="q${i}"]:checked`
            );

            if(!answer){

                alert(
                    "กรุณาเลือกคำตอบข้อที่ " +
                    (i+1)
                );

                return;

            }

            let value = answer.value;

            record["check"+(i+1)] = value;

            if(value==="YES") yes++;

            if(value==="NO") no++;

        }

        record.score_yes = yes;
        record.score_no = no;

        record.compliance_percent =
        ((yes/16)*100).toFixed(2);

        console.log(record);

        await fetch(API_URL,{

            method:"POST",

            mode:"no-cors",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(record)

        });

        alert("บันทึกข้อมูลเรียบร้อย");

        setTimeout(()=>{
            location.reload();
        },1000);

    }
    catch(error){

        console.error(error);

        alert(
            "เกิดข้อผิดพลาดในการเชื่อมต่อ"
        );

    }

}


