/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");
console.log(sections);
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

/*===== Form=====*/

let form = document.getElementById("form");
let btn = document.getElementById("submit");
console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  btn.value = "Sending";

  let name = form.elements["name"];
  let email = form.elements["email"];
  let msg = form.elements["message"];

  var formData = new FormData();
  formData.append("name", name);

  formData.append("message", msg);
  formData.append("email", email);
  formData.formGoogleSendEmail = email;

  fetch(
    "https://script.google.com/macros/s/AKfycbyNU2QxtsHbsp8pA_08c-XDYE1AW6ZJDuB9OKT3o4kEiJ8ddtI_OYZ0EDck5iA887N1/exec",
    {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "success") {
        btn.classList.add("button__success");
        btn.value = "Sent";
        console.log(res.data);

        setTimeout(() => {
          btn.classList.remove("button__success");
          btn.value = "Send";
        }, 2000);
      } else {
        btn.classList.add("button__error");
        btn.value = "Error";
        console.log(res.data);

        setTimeout(() => {
          btn.classList.remove("button__error");
          btn.value = "Send";
        }, 2000);
      }
    })
    .catch((err) => {
      alert("Sorry Something went wrong");
    });
});
