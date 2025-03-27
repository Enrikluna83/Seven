// assets/js/slider.js

document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  let currentIndex = 0;
  let slideInterval;
  
  // Crear puntos indicadores
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
    resetAutoSlide();
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  track.addEventListener('mouseenter', () => clearInterval(slideInterval));
  track.addEventListener('mouseleave', startAutoSlide);
  
  // Iniciar
  startAutoSlide();
});