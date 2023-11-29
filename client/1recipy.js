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

window.onload = function() {
    let myButton = document.getElementById("bab");
    myButton.addEventListener('click', () => {
        const url = 'http://openapi.foodsafetykorea.go.kr/api/5b7901c3f715449faeb8/COOKRCP01/json/1/1000';
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            Category(data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });
}

function Category(maindata) {
    
    let category = maindata
    let mainmenu = []
    let babmenu = []        // 밥 타입
    let gugmenu = []        // 국 타입
    let banchanmenu = []    // 반찬 타입
    let gitamenu = []       // 기타 타입
    
    console.log(mainmenu);

    // 메뉴의 타입을 나누는 과정
    for(let i=0; i<1000; i++ ) {
        dic = {
            'name': category.COOKRCP01.row[i].RCP_NM, 
            'type': category.COOKRCP01.row[i].RCP_PAT2,
            'kalory' : category.COOKRCP01.row[i].INFO_ENG,      // 칼로리
            'danbek' : category.COOKRCP01.row[i].INFO_PRO,      // 단백질
            'jibang' : category.COOKRCP01.row[i].INFO_FAT,      // 지방
            'tansu' : category.COOKRCP01.row[i].INFO_CAR       // 탄수화물
        } 
        mainmenu.push(dic)

        if(dic.type == '밥') {
            babmenu.push(dic)
        }
        else if(dic.type == '국&찌개') {
            gugmenu.push(dic)
        }
        else if(dic.type == '반찬') {
            banchanmenu.push(dic)
        }
        else if(dic.type == '일품','기타','후식') {
            gitamenu.push(dic)
        }
    }
}


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