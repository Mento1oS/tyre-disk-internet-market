document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".image-slider").classList.remove("hidden");
  new Swiper(".image-slider", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    //   dynamicBullets: true,
    // },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    touchRatio: 2,
    grabCursor: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    slidesPerView: 1,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 500000,
      stopOnLastSlide: true,
      disableOnInteraction: false,
    },
    speed: 500,
    effect: "cube",
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  });
  const scrollerCat = (e) => {
    e.preventDefault();
    window.scrollTo({
      top:
        document.querySelector(".cat").getBoundingClientRect().top +
        window.pageYOffset -
        150,
      left: 0,
      behavior: "smooth",
    });
  };
  const scrollerMap = (e) => {
    e.preventDefault();
    window.scrollTo({
      top:
        document.querySelector(".map").getBoundingClientRect().top +
        window.pageYOffset -
        150,
      left: 0,
      behavior: "smooth",
    });
  };
  const popupLink = document.querySelector(".popup__link");
  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock-padding");
  let unlock = true;
  const timeout = 500;
  popupLink.addEventListener("click", function (e) {
    const popupName = popupLink.getAttribute("href").replace("#", "");
    const currentPopup = document.getElementById(popupName);
    popupOpen(currentPopup);
    e.preventDefault();
  });
  const popupCloseIcon = document.querySelector(".cart__close");
  popupCloseIcon.addEventListener("click", function (e) {
    popupClose(popupCloseIcon.closest(".cart__menu"));
    e.preventDefault();
  });
  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      bodyLock();
      currentPopup.classList.add("open");
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest(".cart__content")) {
          popupClose(e.target.closest(".cart__menu"));
        }
      });
    }
  }
  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }
  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth -
      document.querySelector(".container").offsetWidth +
      "px";
    if (window.innerWidth > 1199) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
  function bodyUnlock() {
    setTimeout(function () {
      if (window.innerWidth > 1199) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = "0px";
        }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
    }, timeout);
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
  const headNavLink = document.querySelector(".nav__catalogue");
  const headMapLink = document.querySelector(".nav__map");
  headNavLink.addEventListener("click", scrollerCat);
  headMapLink.addEventListener("click", scrollerMap);
  const linksContainer = document.querySelector(".cat__sections");
  let activeForm = document.querySelectorAll(".form")[0];
  let activeSection = document.querySelectorAll(".cat__section")[0];
  const catNavClickHandler = (event) => {
    window.scrollTo({
      top:
        document.querySelector(".cat__sections").getBoundingClientRect()
          .bottom +
        window.pageYOffset -
        150,
      left: 0,
      behavior: "smooth",
    });
    const target = event.target;
    const index = Array.from(target.parentElement.children).indexOf(target);
    const corrForm = target.closest(".cat").querySelectorAll(".form")[index];
    if (activeForm === corrForm) {
      return;
    }
    activeSection.classList.remove("active__section");
    activeForm.classList.add("hidden");
    activeForm = corrForm;
    activeSection = target;
    activeSection.classList.add("active__section");
    activeForm.classList.remove("hidden");
    activeForm.parentElement.lastElementChild.innerHTML = "";
  };
  // const catNavTyresClickHandler = (event) => {
  //     const target = event.target;
  //     const index = Array.from(target.parentElement.children).indexOf(target);
  //     const corrForm = target.closest('.tyres__form').querySelectorAll('.tyres__elem')[index];
  //     if (activeTyresForm === corrForm) {
  //         return;
  //     }
  //     activeTyresSection.classList.remove('active__section');
  //     activeTyresForm.classList.add('hidden');
  //     activeTyresForm = corrForm;
  //     activeTyresSection = target;
  //     activeTyresSection.classList.add('active__section');
  //     activeTyresForm.classList.remove('hidden');
  //     activeForm.parentElement.lastElementChild.innerHTML = '';
  // }
  linksContainer.addEventListener("click", catNavClickHandler);
  // linksTyresContainer.addEventListener('click', catNavTyresClickHandler);
});
