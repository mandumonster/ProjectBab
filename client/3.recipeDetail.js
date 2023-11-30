async function fetchDataBasedOnCategory() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('data');
    if (category) {
        try {
            const response = await fetch(`http://localhost:8080/${category}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            data.forEach(recipe => {
                const recipeList = document.getElementById('list');
                const listItem = document.createElement('li');
                listItem.innerHTML = `${recipe.RCP_NM}`;
                recipeList.appendChild(listItem);})
            // Now you can work with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const ingredientsList = document.getElementById('list');

    // 페이지 로딩 시 기본 데이터 출력
    fetchDataBasedOnCategory();

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // 검색어를 가져와서 URL에 추가
        const searchTerm = input.value;

        // Get category from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('data');

        if (!category) {
            console.error('Category is not defined.');
            return;
        }

        const url = `http://localhost:8080/${category}/?search=${encodeURIComponent(searchTerm)}`;

        try {
            // fetch 요청
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            // 리스트 초기화
            ingredientsList.innerHTML = '';

            if (Array.isArray(data)) {
                data.forEach(ingredient => {
                    // 검색어가 비어있거나, 검색어와 일치하는 경우에만 출력
                    if (!searchTerm || ingredient.PRDLST_NM.toLowerCase().includes(searchTerm.toLowerCase())) {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `${ingredient.PRDLST_NM}`;
                        listItem.addEventListener('click', () => {
                            clickname(ingredient.PRDLST_NM)
                          });
                        ingredientsList.appendChild(listItem);
                    }
                });
            } else {
                console.error('Data row is not an array.');
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    });
});

function clickname(name) {
    window.location.href = 'detail.html?data=' + encodeURIComponent(name);
}