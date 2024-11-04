// TODO: Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
    // Toggle the dark-mode class on the body element
    document.body.classList.toggle("dark-mode");
}

// TODO: Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);



const signNowButton = document.getElementById("sign-now-button");
let count = 3;

// Define the counter element
const counterElement = document.getElementById("counter");
counterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

// Append the counter element to the signatures section
const signaturesSection = document.querySelector(".signatures");

// Define the addSignature function
const addSignature = () => {
    // Create the person object inside the function
    const person = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        hometown: document.getElementById("hometown").value.trim()
    };

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate form fields
  if (person.name === "" || person.name.length <= 2 || !emailRegex.test(person.email) || person.hometown === "" || person.hometown.length <= 2) {
      // Invalid signature: Don't add to list
      console.log("Please fill out all fields correctly before signing.");
      // Highlight invalid fields in red
      if (person.name === "" || person.name.length <= 2) document.getElementById("name").style.borderColor = "red";
      if (!emailRegex.test(person.email)) document.getElementById("email").style.borderColor = "red";
      if (person.hometown === "" || person.hometown.length <= 2) document.getElementById("hometown").style.borderColor = "red";
      return;
  }

    // Reset input field borders to default
    document.getElementById("name").style.borderColor = "";
    document.getElementById("email").style.borderColor = "";
    document.getElementById("hometown").style.borderColor = "";

    // Create a new signature element
    const signatureElement = document.createElement("p");
    signatureElement.textContent = `💜 ${person.name} from ${person.hometown} supports this.`;

    // Append the signature element to the signatures section
    signaturesSection.appendChild(signatureElement);

    // Update the signature count
    count++;
    counterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
  toggleModal(person);
};

// Add event listener to the sign button
signNowButton.addEventListener("click", addSignature);


let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '1s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

// Step 1: Select all elements with the class 'revealable'
let revealableContainers = document.querySelectorAll('.revealable');

// Step 2: Define the reveal function
function reveal() {
  // Step 3: Loop through each revealable container
  for (let i = 0; i < revealableContainers.length; i++) {
    // Step 4: Get the height of the window
    let windowHeight = window.innerHeight;

    // Step 5: Get the top position of the revealable container
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    // Step 6: Check if the container should be revealed
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      // Add the 'active' class to reveal the container
      revealableContainers[i].classList.add('active');
    } else {
      // Remove the 'active' class to hide the container
      revealableContainers[i].classList.remove('active');
    }
  }
}

// Step 7: Call the reveal function when the window is scrolled
window.addEventListener('scroll', reveal);



/*
function reduceMotion() {

    // Define animation properties to be modified
    const reducedAnimation = {
        transitionDuration: "0s", // Set transition duration to 0 seconds
        transitionProperty: "none", // Disable all transition properties
        transitionTimingFunction: "unset", // Reset transition timing function
    };

    // Get all revealable containers
    const revealableContainers = document.querySelectorAll(".revealable");

    // Loop through revealable containers and update their styles
    for (let i = 0; i < revealableContainers.length; i++) {
        // Update animation properties for each container
        revealableContainers[i].style.transitionDuration = reducedAnimation.transitionDuration;
        revealableContainers[i].style.transitionProperty = reducedAnimation.transitionProperty;
        revealableContainers[i].style.transitionTimingFunction = reducedAnimation.transitionTimingFunction;
    }
}
*/
let reduceMotionBtn = document.getElementById("reduce-motion-button");
let reduceMotionEnabled = true;
const reduceMotion = () => {
    if (!reduceMotionEnabled) {
        animation.transitionDuration = '1s';
        animation.transitionTimingFunction = 'ease';
        for (let i = 0; i < revealableContainers.length; i++) {
            revealableContainers[i].style.transitionDelay = animation.transitionDelay;
            revealableContainers[i].style.transitionDuration = animation.transitionDuration;
            revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
        }
    } else {
        animation.transitionDuration = '0s';
        animation.transitionTimingFuction = 'none';
        for (let i= 0; i < revealableContainers.length; i++) {
            revealableContainers[i].style.transitionDelay = animation.transitionDelay;
            revealableContainers[i].style.transitionDuration = animation.transitionDuration;
            revealableContainers[i].style.transitionTimingFuction = animation.transitionTimingFuction;
        };
        console.log("`Reduce Motion is in: " + reduceMotionEnabled);
    }
    reduceMotionEnabled =!reduceMotionEnabled;
};
reduceMotionBtn.addEventListener("click", reduceMotion);



// Define the scaleFactor variable
let scaleFactor = 1;

// Select the modal image
const modalImage = document.getElementById("modal-img");

// Define the scaleImage function
const scaleImage = () => {
    // Toggle the scaleFactor between 1 and 0.8
    if (scaleFactor === 1) {
        scaleFactor = 0.8;
    } else {
        scaleFactor = 1;
    }
    // Apply the scaleFactor to the modal image
    modalImage.style.transform = `scale(${scaleFactor})`;
};

// Modify the toggleModal function
const toggleModal = (person) => {
    // Select the modal and modal content elements
    const modal = document.getElementById('thanks-modal');
    const modalContent = document.getElementById('thanks-modal-content');

    // Set the display property of the modal to flex to show it
    modal.style.display = 'flex';

    // Set the content of the modal based on the person object
    modalContent.textContent = `Thank you ${person.name} for signing 😁`;

    // Call the scaleImage function to animate the image
    const intervalId = setInterval(scaleImage, 500);

    // Set a timeout to hide the modal after a few seconds (e.g., 3 seconds)
    setTimeout(() => {
        modal.style.display = 'none';
        clearInterval(intervalId); // Stop the image animation
    }, 4000); // Adjust the timeout duration as needed (in milliseconds)
};

// Close Modal function
const closeModal = () => {
    document.getElementById("thanks-modal").style.display = "none";
};

// Select the close button
const closeButton = document.getElementById("modal-button");

// Add event listener to the close button
closeButton.addEventListener("click", closeModal);