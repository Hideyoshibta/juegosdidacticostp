(function () {
  var raiz = document.documentElement;
  raiz.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    var barra = document.getElementById('barra');
    var boton = document.getElementById('menuBoton');
    var menu = document.getElementById('menu');

    function cerrarMenu() {
      barra.classList.remove('menu-abierto');
      boton.setAttribute('aria-expanded', 'false');
      boton.setAttribute('aria-label', 'Abrir menú');
    }

    if (barra && boton && menu) {
      boton.addEventListener('click', function () {
        var abierto = barra.classList.toggle('menu-abierto');
        boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
      });
      menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) cerrarMenu();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && barra.classList.contains('menu-abierto')) {
          cerrarMenu();
          boton.focus();
        }
      });
      var marcar = function () { barra.classList.toggle('con-borde', window.scrollY > 8); };
      marcar();
      window.addEventListener('scroll', marcar, { passive: true });
    }

    var elementos = document.querySelectorAll('.aparece');
    var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sinMovimiento || !('IntersectionObserver' in window)) {
      elementos.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    elementos.forEach(function (el) { observador.observe(el); });
    setTimeout(function () {
      elementos.forEach(function (el) { el.classList.add('visible'); });
    }, 2500);
  });
})();
