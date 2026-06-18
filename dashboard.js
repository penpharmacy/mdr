const API_URL =
"https://script.google.com/macros/s/AKfycbxFWuCunHJGn05HQRGd7L5bwZ23QDIpT4ZrqYWuqVhvqXdex8SZr6IVym5EltmTW5WSPg/exec";

async function loadDashboard(){

    const response =
    await fetch(API_URL);

    const data =
    await response.json();

    let totalYes = 0;
    let totalNo = 0;

    let result = [];

    for(let i=1;i<=16;i++){

        let yes = 0;
        let no = 0;

        data.forEach(row=>{

            if(row["check"+i]=="YES")
                yes++;

            if(row["check"+i]=="NO")
                no++;

        });

        result.push({
            yes,
            no
        });

        totalYes += yes;
        totalNo += no;

    }

    const overall =
    (totalYes+totalNo)==0
    ? 0
    : (totalYes/(totalYes+totalNo)*100);

    document.getElementById(
        "overallRate"
    ).innerHTML =

    overall.toFixed(1) +
    "%<br>(" +
    totalYes +
    "/" +
    (totalYes+totalNo) +
    ")";

    const tbody =
    document.getElementById(
        "resultTable"
    );

    tbody.innerHTML = "";

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
                labels:[
                    "ปฏิบัติ",
                    "ไม่ปฏิบัติ"
                ],
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
                    "1","2","3","4",
                    "5","6","7","8",
                    "9","10","11","12",
                    "13","14","15","16"
                ],
                datasets:[{
                    label:
                    "% การปฏิบัติ",

                    data:
                    result.map(r=>{

                        let total =
                        r.yes+r.no;

                        return total==0
                        ? 0
                        : (r.yes/total*100);

                    })
                }]
            }
        }
    );

}

loadDashboard();
```
