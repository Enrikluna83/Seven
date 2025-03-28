document.addEventListener('DOMContentLoaded', function() {
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  
  // Clonar primer y último slide para efecto infinito
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  
  firstClone.id = 'first-clone';
  lastClone.id = 'last-clone';
  
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);
  
  const allSlides = document.querySelectorAll('.carousel-slide');
  const slideCount = slides.length;
  let currentIndex = 1;
  let autoPlayInterval;
  let isTransitioning = false;
  
  // Configurar track
  track.style.width = `${allSlides.length * 100}%`;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  // Crear puntos indicadores
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index + 1));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  // Iniciar autoplay
  startAutoPlay();
  
  // Funciones
  function goToSlide(index) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    currentIndex = index;
    updateSlider();
    updateDots();
    
    // Reiniciar autoplay al interactuar
    resetAutoPlay();
  }
  
  function updateSlider() {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  function updateDots() {
    let dotIndex;
    if (currentIndex === 0) {
      dotIndex = slideCount - 1;
    } else if (currentIndex === allSlides.length - 1) {
      dotIndex = 0;
    } else {
      dotIndex = currentIndex - 1;
    }
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === dotIndex);
    });
  }
  
  function nextSlide() {
    if (isTransitioning) return;
    currentIndex++;
    updateSlider();
    updateDots();
  }
  
  function prevSlide() {
    if (isTransitioning) return;
    currentIndex--;
    updateSlider();
    updateDots();
  }
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }
  
  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }
  
  // Event listeners
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    
    // Efecto infinito
    if (currentIndex === 0) {
      track.style.transition = 'none';
      currentIndex = slideCount;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      setTimeout(() => track.style.transition = 'transform 0.5s ease');
    } else if (currentIndex === allSlides.length - 1) {
      track.style.transition = 'none';
      currentIndex = 1;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      setTimeout(() => track.style.transition = 'transform 0.5s ease');
    }
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });
  
  // Pausar al interactuar
  track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
  track.addEventListener('mouseleave', startAutoPlay);
  
  // Redimensionar
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    setTimeout(() => track.style.transition = 'transform 0.5s ease');
  });
});