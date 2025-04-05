// Typing animation
const textArray = ["SOC Analyst.", "Problem Solver.", "SOC Analyst Business Analyst."];
let typingText = document.getElementById("typing-text");
let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  let currentText = textArray[index];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      index = (index + 1) % textArray.length;
    }
  } else {
    typingText.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type();

// Back-to-top button
const backToTopBtn = document.getElementById("back-to-top");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
