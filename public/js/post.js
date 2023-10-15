document.getElementById('post-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const postText = document.getElementById('post-text').value;

    fetch('../../controllers/api/postRoutes/create-text-posts' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: postText }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response from the server, e.g., display the new post
            console.log(data);
            // You can update the UI with the new post if needed
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
