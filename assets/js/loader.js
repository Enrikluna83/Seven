  // Simular carga de la página (en producción quita esto y usa el evento real)
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('loader').classList.add('loaded');
      setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
      }, 500);
    }, 2000); // Ajusta este tiempo según necesites
  });