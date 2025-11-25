/* ----------------------------------------
   Smooth Scroll para los Botones Rápidos y Enlaces de Navegación
----------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const navbarHeight = document.querySelector('.navbar').offsetHeight; // Obtener la altura de la navbar

  // Función para desplazamiento suave
  function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - navbarHeight - 10, // Ajuste por navbar fija y un pequeño margen extra
        behavior: "smooth"
      });
    }
  }

  // Manejar clics en enlaces de navegación internos
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
      smoothScrollTo(link.getAttribute('href'));
    });
  });

  // Manejar clics en botones con data-scroll-to
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevenir el comportamiento por defecto si es un enlace
      smoothScrollTo(btn.getAttribute('data-scroll-to'));
    });
  });

  /* ----------------------------------------
     Efecto Hover Lift en Botones
  ----------------------------------------- */
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("mouseover", () => {
      btn.style.transform = "translateY(-3px)";
    });

    btn.addEventListener("mouseout", () => {
      btn.style.transform = "translateY(0)";
    });
  });

  /* ----------------------------------------
     Sistema de Alerta para "Ver Más" (en botones genéricos)
  ----------------------------------------- */
  // Este script se aplica a botones que no tienen una acción específica de scroll.
  // Asegúrate de que no interfiera con los botones de scroll.
  document.querySelectorAll(".card button:not([data-scroll-to])").forEach(button => {
    button.addEventListener("click", () => {
      alert("Aquí puedes cargar un modal con información ampliada.");
    });
  });

/* ----------------------------------------
   Navbar - Cambio de Opacidad al Desplazar
----------------------------------------- */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    // Fondo más sólido al bajar
    navbar.style.background = "rgba(0, 0, 0, 0.85)";
  } else {
    // Fondo negro con 75% de transparencia (tu preferido)
    navbar.style.background = "rgba(0, 0, 0, 0.75)";
  }
});


  /* ----------------------------------------
     Resaltar sección activa al hacer scroll
  ----------------------------------------- */
  const sections = document.querySelectorAll("section[id], .card[id]"); // Incluye cards con ID
  const menuLinks = document.querySelectorAll(".nav-links a[href^='#']");

  const observerOptions = {
    root: null,
    rootMargin: `-${navbarHeight + 10}px 0px -40% 0px`, // Ajusta el rootMargin para la navbar
    threshold: 0.1 // Un umbral bajo para detectar cuando la sección entra en vista
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        menuLinks.forEach(link => {
          link.classList.remove("active"); // Usamos 'active' como en tu CSS
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Asegurar que el enlace de portafolio se active correctamente en portfolio.html
  // Este script ya está en portfolio.html, pero si quieres que funcione en index.html
  // para el enlace a portfolio.html, necesitarías un enfoque diferente (ej. verificar la URL).
  // Para index.html, solo se resaltan las secciones internas.

  /* ----------------------------------------
     Accessible keyboard support for quick buttons
  ----------------------------------------- */
  document.querySelectorAll('.quick-btn, .btn').forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') el.click();
    });
  });

  // Eliminar el script de estilo para active-nav, ya que usamos la clase 'active' de styles.css
  // const style = document.createElement("style");
  // style.innerHTML = `
  //   .active-nav {
  //     color: var(--primary-light) !important;
  //     text-decoration: underline;
  //   }
  // `;
  // document.head.appendChild(style);

});

// Mover la función populateDemo fuera del DOMContentLoaded si se usa globalmente
window.populateDemo = function(payload = {}) {
  console.log('populateDemo called', payload);
};
