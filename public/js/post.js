const postHandler = async (event) => {

    event.preventDefault();

    const username = "jack";// get session user name 

    const text = document.querySelector('#TextBox').value.trim();

    console.log(text + `
    
    here

    `
    );

        const info = {

            userName : username,

            text : text
        }
  
        fetch('/post/create-text-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(info),
        })
  
    // fetch('../../controllers/api/postRoutes/create-text-posts' , {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ text: postText }),
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         // Handle the response from the server, e.g., display the new post
    //         console.log(data);
    //         // You can update the UI with the new post if needed
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
};

document
.querySelector('#postButton')
.addEventListener('click', postHandler);
