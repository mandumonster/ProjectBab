var category;
var userid;
try{
    const response = await fetch(`http://localhost:8080/me`, {
                method: 'GET'
            });
    const data = await response.json();
    userid=data.username;
}
catch (error) {
    console.error('Error fetching data:', error.message);
}

async function fetchDataBasedOnCategory() {
    var urlParams = new URLSearchParams(window.location.search);
    category = urlParams.get('data');
    
    if (category) {
        try {
            const response = await fetch(`http://localhost:8080/detail/${category}`, {
                method: 'GET'
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            const recipeData = data[0];
    
            const titleElement = document.getElementById('title');
            titleElement.textContent = recipeData.RCP_NM;
    
            const ingredientsList = document.getElementById('howtocook');
            const listItem = document.createElement('li');
            listItem.innerHTML = `${recipeData.RCP_NM}<br>재료:${recipeData.RCP_PARTS_DTLS} <br>레시피 <br>${recipeData.MANUAL01}<br>${recipeData.MANUAL02}<br>${recipeData.MANUAL03}<br>${recipeData.MANUAL04}<br>${recipeData.MANUAL05}<br>${recipeData.MANUAL06}<br>${recipeData.MANUAL07}<br>${recipeData.MANUAL08}<br>${recipeData.MANUAL09}<br>${recipeData.MANUAL10} <br>${recipeData.MANUAL11}<br>${recipeData.MANUAL12}<br>${recipeData.MANUAL13}<br>${recipeData.MANUAL14}<br>${recipeData.MANUAL15}<br>${recipeData.MANUAL16}<br>${recipeData.MANUAL17}<br>${recipeData.MANUAL18}<br>${recipeData.MANUAL19}<br>${recipeData.MANUAL20}`;
            ingredientsList.appendChild(listItem);
    
            // Attach event listener here if needed
            attachEventListener();
    
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
}

// Call fetchDataBasedOnCategory when the page is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await fetchDataBasedOnCategory();
    attachEventListener(); // Call attachEventListener after fetching data
});

async function attachEventListener() {
    const dataButton = document.getElementById('savebtn');

    if (!category) {
        return;
    }

    try {
        // Add 'await' before 'fetch' to ensure it resolves before moving to the next line
        const response = await fetch(`http://localhost:8080/my/detail/?id=${encodeURIComponent(category)}&userid=${encodeURIComponent(userid)}`);
        const dataExists = await response.json();

        if (dataExists.length != 0) {
            dataButton.innerText = '삭제';
            dataButton.addEventListener('click', deleteData);
        } else {
            dataButton.innerText = '저장';
            dataButton.addEventListener('click', saveData);
        }
    } catch (error) {
        console.error('Error checking data:', error.message);
    }

    // Add any additional code here as needed
    // For example, you can perform other actions based on the data or response
}

// Function to save data
async function saveData() {
    try {
        const response = await fetch(`http://localhost:8080/detail/${category}`);
        const dataExists = await response.json();
        var howToCook = dataExists[0];
        howToCook.userid = userid;
        // console.log(howToCook)

        if (!howToCook) {
            return;
        }

        try {
            await fetch('http://localhost:8080/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(howToCook),
            });

            alert('Data saved to the database.');
        } catch (error) {
            console.error('Error saving data:', error.message);
        }
    } catch (error) {
        console.error('Error fetching data before saving:', error.message);
    }
}

// Function to delete data
async function deleteData() {
    try {
        await fetch(`http://localhost:8080/deleteData/?id=${encodeURIComponent(category)}`, {
            method: 'DELETE',
        });

        alert('Data deleted from the database.');
    } catch (error) {
        console.error('Error deleting data:', error.message);
    }
}