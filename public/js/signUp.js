
//handles SIGNUP in

const loginFormHandler = async (event) => {

    event.preventDefault();

      console.log ("login"); // send user to login form
      
  };


  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collects SIGNUP info

    const email = document.querySelector('#signup-email').value.trim();

    const username = document.querySelector('#signup-username').value.trim();

    const password = document.querySelector('#signup-password').value.trim();

    const Animal = document.querySelector('#animal-choice').value.trim();

    if (email && password && username && Animal) {

      console.log(email + password + username + Animal + "login"); // sign up user in here

    }

  };

// listeners

document
.querySelector('#toggle-form')
.addEventListener('click', loginFormHandler);

document
.querySelector('#signup-form')
.addEventListener('submit', signupFormHandler);

  
