document.addEventListener('DOMContentLoaded', () => {
  // 1. Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // 2. Product Image Gallery
  let currentIndex = 0;
  // Currently utilizing empty src, so let's rely on array of images when available.
  // We'll mock the active classes.
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const dots = document.querySelectorAll(".dot");
  
  // Since we don't have real images yet, we will just toggle the active class on thumbnails.
  function showImage(index) {
    thumbnails.forEach(thumb => thumb.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    if (thumbnails[index]) thumbnails[index].classList.add("active");
    if (dots[index % dots.length]) dots[index % dots.length].classList.add("active");
    
    // Update main image src if we had an array
    // mainImage.src = imagesData[index];
  }

  window.nextImage = function() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    showImage(currentIndex);
  }

  window.prevImage = function() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    showImage(currentIndex);
  }

  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      currentIndex = i;
      showImage(i);
    });
  });

  // 3. Dynamic Cart Link & Subscription UI Expansion
  const cartBtn = document.getElementById("addToCart");
  const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
  const fragranceRadios = document.querySelectorAll('input[name="fragrance1"]');
  
  function updateCartLink() {
    // Only one fragrance group implemented visually, assume it's fragrance1
    const fragrance = document.querySelector('input[name="fragrance1"]:checked')?.value || 'rose';
    const purchase = document.querySelector('input[name="purchase"]:checked')?.value || 'single';

    const link = `https://dummy.com/cart?fragrance=${fragrance}&type=${purchase}`;
    cartBtn.href = link;
  }

  purchaseRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      // Toggle Box logic
      const singleBox = document.getElementById("singleBox");
      if (radio.value === "single") {
        singleBox.style.display = "block";
      } else {
        singleBox.style.display = "none";
      }
      updateCartLink();
    });
  });

  fragranceRadios.forEach(radio => {
    radio.addEventListener("change", updateCartLink);
  });

  updateCartLink();

  // 4. Percentage Counter Animation using Intersection Observer
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute("data-target");

        let count = 0;
        const interval = setInterval(() => {
          count++;
          el.innerText = count + "%";

          if (count >= target) {
            clearInterval(interval);
            el.innerText = target + "%"; // ensure exactly target
          }
        }, 15);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
  
  // 5. Accordion Logic
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach(item => {
    const title = item.querySelector(".accordion-title");
    title.addEventListener("click", () => {
      // close all others
      accordionItems.forEach(otherItem => {
         if (otherItem !== item) {
           otherItem.classList.remove("active");
           otherItem.querySelector("span").innerText = "+";
         }
      });
      // toggle current
      item.classList.toggle("active");
      const icon = item.querySelector("span");
      icon.innerText = item.classList.contains("active") ? "-" : "+";
    });
  });
});
