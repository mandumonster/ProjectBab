var userid='apple'; // userid

// 데이터를 링크에서 받아와서 fetch하는 함수
async function fetchDataBasedOnCategory() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('data');
    console.log(category)
    if (category) {
        try {
            const response = await fetch(`http://localhost:8080/my/category/?id=${encodeURIComponent(category)}&userid=${userid}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // console.log(data);
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
    const input = document.querySelector('#searchInput');
    const ingredientsList = document.getElementById('list');

    // 페이지 로딩 시 기본 데이터 출력
    fetchDataBasedOnCategory();

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        await handleFormSubmission();
    });

    ingredientsList.addEventListener('click', async function (event) {
        // Check if the clicked element is an li element
        if (event.target.tagName.toLowerCase() === 'li') {
            const ingredientName = event.target.textContent;
            clickname(ingredientName);
        }
    });

    async function handleFormSubmission() {
        // 검색어를 가져와서 URL에 추가
        const searchTerm = input.value;

        // Get category from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('data');

        if (!category) {
            console.error('Category is not defined.');
            return;
        }

        const url = `http://localhost:8080/my/category/?id=${encodeURIComponent(category)}&userid=${userid}&search=${encodeURIComponent(searchTerm)}`;

        try {
            // fetch 요청
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // console.log(data);

            // 리스트 초기화
            ingredientsList.innerHTML = '';

            if (Array.isArray(data)) {
                data.forEach(ingredient => {
                    // 검색어가 비어있거나, 검색어와 일치하는 경우에만 출력
                    if (!searchTerm || ingredient.RCP_NM.toLowerCase().includes(searchTerm.toLowerCase())) {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = `${ingredient.RCP_NM}`;
                        ingredientsList.appendChild(listItem);
                    }
                });
            } else {
                console.error('Data row is not an array.');
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    function clickname(name) {
        window.location.href = '4.onerecipe.html?data=' + encodeURIComponent(name);
    }
});