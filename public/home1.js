document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#smooth-scroll"),
    smooth: true
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#smooth-scroll", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: document.querySelector("#smooth-scroll").style.transform
      ? "transform"
      : "fixed"
  });
  const aboutItems = document.querySelectorAll(".about");
const images = [
  document.getElementById("img1"),
  document.getElementById("img2"),
  document.getElementById("img3")
];
const indicator = document.getElementById("border-indicator");

images.forEach((img, i) => {
  img.style.opacity = i === 0 ? "1" : "0";
});

function updateImage(index) {
  images.forEach((img, i) => {
    img.style.opacity = i === index ? "1" : "0";
  });
}

function updateIndicator(index, item) {
  if (window.innerWidth > 768) {
    const rect = item.getBoundingClientRect();
    const parentRect = item.parentElement.getBoundingClientRect();
    const offsetTop = rect.top - parentRect.top;
    indicator.style.top = `${offsetTop}px`;
  }
}
aboutItems.forEach((item, index) => {
  const action = () => {
    updateImage(index);
    updateIndicator(index, item);
  };

  if (window.innerWidth <= 768) {
    item.addEventListener("click", action);
  } else {
    item.addEventListener("mouseenter", action);
  }
});

const divs1 = gsap.utils.toArray(".small_div");
divs1.forEach(div => {
  div.addEventListener("mouseenter", () => {
    divs1.forEach(d => {
      gsap.to(d, {
        flexGrow: d === div ? 2.6 : 1,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });

  div.addEventListener("mouseleave", () => {
    divs1.forEach(d => {
      gsap.to(d, { flexGrow: 1, duration: 0.5, ease: "power2.out" });
    });
  });
});

divs1.forEach((div, index) => {
  div.addEventListener('mouseenter', () => {
    document.querySelectorAll('.description').forEach(desc => {
      gsap.to(desc, { opacity: 0, duration: 0.3 });
    });
    const desc = div.querySelector('.description');
    if (desc) {
      gsap.to(desc, { opacity: 1, duration: 0.3 });
    }
  });

  div.addEventListener('mouseleave', () => {
    const desc = div.querySelector('.description');
    if (desc) {
      gsap.to(desc, { opacity: 0, duration: 0.3 });
    }
  });
});

// ✅ Your same scroll animation logic
const steps = document.querySelectorAll(".all-step");

steps.forEach((step, index) => {
  if (index === 0) return;

  gsap.to(step, {
    yPercent: -100 * index,
    scrollTrigger: {
      trigger: step,
      start: "top center",
      end: "+=30%",
      scrub: true,
      scroller: "#smooth-scroll" // ✅ added
    }
  });

  step.style.zIndex = 10 + index;
});

ScrollTrigger.create({
  trigger: "#step",
  start: "top top",
  end: "bottom+=50% 100%",
  pin: true,
  scrub: true,
  pinSpacing: true,
  // markers: true,
  scroller: "#smooth-scroll" // ✅ added
});
gsap.to("#div", {
  y: "-20vh",
  ease: "none",
  scrollTrigger: {
    trigger: "#step",
    end: "bottom+=50% 60%", 
    end: "bottom center",
    scrub: true,
    // markers: true
  }
});


// ✅ Sync updates
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

  const openBtn = document.querySelector('.menu-toggle');
  const closeBtn = document.querySelector('.close-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  openBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });



  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
});


