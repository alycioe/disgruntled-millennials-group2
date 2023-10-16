
//handles SIGNUP in

const loginFormHandler = async (event) => {

    event.preventDefault();

      window.location.href = '/login';
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

      const info = {
        username: username ,
        email : email ,
        password : password ,
        animalChoice : Animal
      }

      fetch('/signIn/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      })
      
    }

  };

// listeners

document
.querySelector('#toggle-form')
.addEventListener('click', loginFormHandler);

document
.querySelector('#signup-form')
.addEventListener('submit', signupFormHandler);

  
