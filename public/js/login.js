
//handles loging in

const loginFormHandler = async (event) => {

    event.preventDefault();
  
    // Collects login info

    const username = document.querySelector('#login-identifier').value.trim();

    const password = document.querySelector('#login-password').value.trim();


    if (username && password) {

      console.log (username + password + " login"); // log user in here

    }

  };


  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    window.location.href = '/signup';
    console.log("sign up"); // send user to sign up page 
    
  };

// listeners

document
.querySelector('#login-form')
.addEventListener('submit', loginFormHandler);

document
.querySelector('#toggle-form')
.addEventListener('click', signupFormHandler);

  
