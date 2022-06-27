const slider = document.querySelector(".slider"),
  sliderInner = document.querySelector(".slider__inner"),
  sliderPrev = document.querySelector(".slider__arrow_prev"),
  sliderNext = document.querySelector(".slider__arrow_next"),
  sliderItem = document.querySelector(".slider__item"),
  burger = document.querySelector(".burger"),
  mobileMenu = document.querySelector(".nav__drawer"),
  menuLinks = document.querySelectorAll(".nav__link_mobile"),
  temps = document.querySelectorAll(".template__item"),
  modal = document.querySelector(".modal"),
  modalBox = document.querySelector(".modal__box");

let isBurgerActive = false,
  sliderWidth = slider.offsetWidth,
  sliderCurrent = 0;

// SCROLL
const anchors = document.querySelectorAll('a[href*="#"]');
const scrollArrow = document.querySelector(".scroll-to-top");

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const blockID = anchor.getAttribute("href").substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function checkSroll() {
  if (
    window.scrollY > window.innerHeight &&
    !modal.classList.contains("modal_active")
  ) {
    scrollArrow.classList.add("scroll-to-top_active");
  } else {
    scrollArrow.classList.remove("scroll-to-top_active");
  }
}

window.addEventListener("scroll", () => {
  checkSroll();
});

scrollArrow.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// SLIDER
const dataWorks = {
  photos: [
    "photos/photo2.webp",
    "photos/photo1.png",
    "photos/photo3.png",
    "photos/photo4.png",
    "photos/photo5.png",
  ],
  anims: [
    "animations/an1.gif",
    "animations/an2.gif",
    "animations/an3.gif",
    "animations/an4.gif",
    "animations/an5.gif",
  ],
  logos: [
    "logos/logo1.png",
    "logos/logo2.png",
    "logos/logo3.png",
    "logos/logo4.png",
  ],
  visuals: ["visuals/vis1.png", "visuals/vis2.png"],
};

function moveSlide(method) {
  sliderWidth = slider.offsetWidth;
  if (method === "prev") sliderCurrent += sliderWidth;
  else if (method === "next") sliderCurrent -= sliderWidth;
  else sliderCurrent = 0;
  sliderInner.style.transform = `translateX(${sliderCurrent}px)`;
  checkWidth();
}

function checkWidth() {
  let sliderInnerWidth = sliderInner.scrollWidth;

  if (sliderCurrent > -sliderInnerWidth + slider.offsetWidth)
    sliderNext.classList.remove("slider__arrow_disable");
  else sliderNext.classList.add("slider__arrow_disable");

  if (sliderCurrent >= 0) sliderPrev.classList.add("slider__arrow_disable");
  else sliderPrev.classList.remove("slider__arrow_disable");
}

checkWidth();

sliderPrev.addEventListener("click", () => {
  moveSlide("prev");
});

sliderNext.addEventListener("click", () => {
  moveSlide("next");
});

// BURGER
burger.addEventListener("click", () => {
  isBurgerActive = !isBurgerActive;

  if (isBurgerActive) {
    mobileMenu.classList.add("nav__drawer_open");
    burger.classList.add("burger_active");
  } else {
    mobileMenu.classList.add("nav__drawer_close");
    burger.classList.remove("burger_active");
    setTimeout(() => {
      mobileMenu.classList.remove("nav__drawer_open");
      mobileMenu.classList.remove("nav__drawer_close");
    }, 480);
  }
});

menuLinks.forEach((item) => {
  item.addEventListener("click", () => {
    isBurgerActive = false;
    mobileMenu.classList.add("nav__drawer_close");
    burger.classList.remove("burger_active");
    setTimeout(() => {
      mobileMenu.classList.remove("nav__drawer_open");
      mobileMenu.classList.remove("nav__drawer_close");
    }, 480);
  });
});

// MODAL
function clearSlider() {
  while (sliderInner.firstChild) {
    sliderInner.removeChild(sliderInner.firstChild);
  }
}

function addElementSlide(path) {
  let elem = document.createElement("div");
  elem.classList.add("slider__item");
  elem.style.backgroundImage = `url(./img/works/${path})`;
  sliderInner.appendChild(elem);
  checkWidth();
}

temps.forEach((item) => {
  item.addEventListener("click", () => {
    modal.classList.add("modal_active");
    sliderWidth = slider.scrollWidth;
    clearSlider();
    checkWidth();
    checkSroll();

    let arr = dataWorks[item.dataset.type];
    for (index in arr) {
      addElementSlide(arr[index]);
    }
  });
});

modal.addEventListener("click", (e) => {
  if (!e.path.includes(modalBox)) {
    modal.classList.remove("modal_active");
    checkSroll();
    moveSlide();
  }
});
