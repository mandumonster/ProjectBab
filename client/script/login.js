document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var userid = document.getElementById('userid').value;
    var password = document.getElementById('password').value;

    var data = {
        userid: userid,
        userpassword: password
    };

    fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
    localStorage.setItem('token',data.token);
    const storedToken = localStorage.getItem('token');

    console.log(storedToken); // 저장된 토큰 출력
})
.catch((error) => {
    console.error('Error:', error);
});
})