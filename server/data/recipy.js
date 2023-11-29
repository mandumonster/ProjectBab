const apiUrl = 'http://openapi.foodsafetykorea.go.kr/api/5b7901c3f715449faeb8/COOKRCP01/json/1/1000'
function getAllData(){
    fetch(apiUrl)
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
}
// "RCP_PAT2": 대분류
// "RCP_PAT2":"국"