async function fetchDataBasedOnCategory() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('data');
    
    if (category) {
        try {
            const response = await fetch(`http://localhost:8080/detail/${category}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            // Assuming there is only one item in the data array
            const recipeData = data[0];

            // Update the title in your HTML
            const titleElement = document.getElementById('title');
            titleElement.textContent = recipeData.RCP_NM;

            // Update the howtocook section
            const ingredientsList = document.getElementById('howtocook');
            const listItem = document.createElement('li');
            listItem.innerHTML = `${recipeData.RCP_NM}<br>재료:${recipeData.RCP_PARTS_DTLS} <br>레시피 <br>${recipeData.MANUAL01}<br>${recipeData.MANUAL02}<br>${recipeData.MANUAL03}<br>${recipeData.MANUAL04}<br>${recipeData.MANUAL05}<br>${recipeData.MANUAL06}<br>${recipeData.MANUAL07}<br>${recipeData.MANUAL08}<br>${recipeData.MANUAL09}<br>${recipeData.MANUAL10} <br>${recipeData.MANUAL11}<br>${recipeData.MANUAL12}<br>${recipeData.MANUAL13}<br>${recipeData.MANUAL14}<br>${recipeData.MANUAL15}<br>${recipeData.MANUAL16}<br>${recipeData.MANUAL17}<br>${recipeData.MANUAL18}<br>${recipeData.MANUAL19}<br>${recipeData.MANUAL20}`;
            ingredientsList.appendChild(listItem);

            // Call checkDataInDB to set the button value based on data existence
            checkDataInDB();

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
}

// Call fetchDataBasedOnCategory when the page is loaded
fetchDataBasedOnCategory();

document.addEventListener('DOMContentLoaded', async () => {
    const dataButton = document.getElementById('savebtn');

    // Get the recipe title
    var title = urlParams.get('data');
    var userid= 'apple';    // 로그인하고 고쳐야함 ㄷㄷ
    if (!title) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/my/detail/id=${encodeURIComponent(title)}&userid=${userid}`);
        const dataExists = await response.json();

        if (dataExists) {
            // If data exists, change the button to 'Delete'
            dataButton.innerText = 'Delete Data';
            dataButton.addEventListener('click', deleteData);
        } else {
            // If data doesn't exist, change the button to 'Save'
            dataButton.innerText = 'Save Data';
            dataButton.addEventListener('click', saveData);
        }
    } catch (error) {
        console.error('Error checking data:', error.message);
    }

    // Function to save data
    // 내일할거 userid와 위의 dataExists를 받아와서 저것들을 하나의 json으로 묶은 다움 post로 보내버리고 그 json채로 저장하기
    async function saveData() {
        const howToCook = prompt('Enter how to cook:');
        if (!howToCook) {
            return;
        }

        try {
            await fetch('http://localhost:8080/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, howToCook }),
            });

            alert('Data saved to the database.');
        } catch (error) {
            console.error('Error saving data:', error.message);
        }
    }

    // Function to delete data
    async function deleteData() {
        try {
            await fetch(`http://localhost:8080/deleteData?title=${encodeURIComponent(title)}`, {
                method: 'DELETE',
            });

            alert('Data deleted from the database.');
        } catch (error) {
            console.error('Error deleting data:', error.message);
        }
    }
});