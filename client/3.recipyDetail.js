// const url = 'http://openapi.foodsafetykorea.go.kr/api/5b7901c3f715449faeb8/COOKRCP01/json/1/1000'
// function getAllData(){
//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             Category(data)
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// }
let datum=[];
const apiUrl = 'http://openapi.foodsafetykorea.go.kr/api/5b7901c3f715449faeb8/COOKRCP01/json/1/1000'
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        datum.push(data)
        console.log(datum[0]);
        return datum
    })
    .then(datum=>{
            let category = datum[0]
            let babmenu = []        // 밥 타입
            
        
            // 메뉴의 타입을 나누는 과정
            for(let i=0; i<1000; i++ ) {
                dic = {
                    'name': category.COOKRCP01.row[i].RCP_NM, 
                    'type': category.COOKRCP01.row[i].RCP_PAT2
                } 
         
        
                if(dic.type == '밥') {
                    babmenu.push(dic)
                }
                // else if(dic.type == '국&찌개') {
                //     gugmenu.push(dic)
                // }
                // else if(dic.type == '반찬') {
                //     banchanmenu.push(dic)
                // }
                // else if(dic.type == '일품','기타','후식') {
                //     gitamenu.push(dic)
                // }
            }
            console.log(babmenu)
        return babmenu
        })
    .then(datum=>{
        for(let i=0;i<babmenu.length;i++){
            document.getElementById('renamelist').innerHTML=`<div id="menu${i+1}">${datum[i].name}<div>`
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// "RCP_PAT2": 대분류
// "RCP_PAT2":"국"

// function Category(datum) {
//     let category = datum
//     let babmenu = []        // 밥 타입
    

//     // 메뉴의 타입을 나누는 과정
//     for(let i=0; i<1000; i++ ) {
//         dic = {
//             'name': category.COOKRCP01.row[i].RCP_NM, 
//         } 

//         if(dic.type == '밥') {
//             babmenu.push(dic)
//         }
//         // else if(dic.type == '국&찌개') {
//         //     gugmenu.push(dic)
//         // }
//         // else if(dic.type == '반찬') {
//         //     banchanmenu.push(dic)
//         // }
//         // else if(dic.type == '일품','기타','후식') {
//         //     gitamenu.push(dic)
//         // }
//         console.log(babmenu)
//     }
// }
// Category(datum)
// let myButton = document.getElementById("renamelist")

// window.onload=function(){
//     const ssn1=document.getElementById('ssn1');
//     ssn1.addEventListener('keyup',()=>{ 
//         if(ssn1.value.length>=6){
//             document.getElementById('ssn2').focus();
//         }
//     })
//     const ssn=document.querySelectorAll('.ssn');
//     ssn.forEach((s)=>{
//         s.addEventListener('input',()=>{
//             document.getElementById('isssn').value='n';
//         })
//     })}