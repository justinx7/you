
/* ==========================================
   PRESENTACIÓN ROMÁNTICA
   JAVASCRIPT PRINCIPAL
========================================== */


/* ==========================================
   1. CONFIGURACIÓN PERSONALIZABLE
========================================== */

const CONFIG = {

  // Nombre de tu novia
  nombreDeElla: "yurii",

  // Tu nombre
  nombreDeEl: "yo",

  // Fecha especial
  // Formato: AAAA-MM-DDTHH:mm:ss
fechaEspecial: "2026-10-21T00:00:00",

  // Carta romántica
  mensaje: `Desde que llegaste a mi vida, muchas cosas tienen un brillo diferente.

Me encanta compartir mis días contigo, escucharte, reír a tu lado y crear recuerdos que quiero guardar para siempre.

No necesito que todo sea perfecto; solo quiero seguir eligiéndote, cuidándote y demostrando lo mucho que significas para mí.

Eres una personita maravillosa y me siento muy afortunado de tenerte en mi vida.

Gracias por ser tú.`

};


/* ==========================================
   2. INICIAR PROYECTO
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const openButton = document.getElementById("openSurprise");

  const musicButton = document.getElementById("musicToggle");

  const music = document.getElementById("backgroundMusic");

  const musicLabel = document.getElementById("musicLabel");

  const musicIcon = document.getElementById("musicIcon");

  const typedMessage = document.getElementById("typedMessage");

  const dialog = document.getElementById("reasonDialog");

  const dialogMessage = document.getElementById("dialogMessage");


  /* ==========================================
     3. ACTUALIZAR NOMBRES
  ========================================== */

  document.title = `Para ${CONFIG.nombreDeElla} ♡`;

  document.querySelector(".brand").innerHTML =
    `<span class="brand-bow">🎀</span> para ${escapeHTML(CONFIG.nombreDeElla)}`;

  document.querySelector(".letter-signature").textContent =
    `Con amor, ${CONFIG.nombreDeEl} ♡`;


  /* ==========================================
     4. BOTÓN DE BIENVENIDA
  ========================================== */

  openButton.addEventListener("click", () => {

    document
      .getElementById("mensaje")
      .scrollIntoView({
        behavior: "smooth"
      });

    createHeartBurst(18);

    startTyping();

  });


  /* ==========================================
     5. EFECTO DE ESCRITURA
  ========================================== */

  let typingStarted = false;

  function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    const text = CONFIG.mensaje;

    let index = 0;

    function type() {

      typedMessage.textContent = text.slice(0, index);

      index++;

      if (index <= text.length) {

        const character = text[index - 2];

        const delay =
          character === "." ||
          character === "," ||
          character === "\n"
            ? 230
            : 27;

        setTimeout(type, delay);

      }

    }

    type();

  }


  /* ==========================================
     6. DETECTAR CUANDO APARECE LA CARTA
  ========================================== */

  const messageObserver = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          startTyping();

        }

      });

    },

    {
      threshold: 0.25
    }

  );

  messageObserver.observe(
    document.getElementById("mensaje")
  );


  /* ==========================================
     7. ANIMACIONES AL DESPLAZARSE
  ========================================== */

  const revealObserver = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  document.querySelectorAll(".reveal").forEach(element => {

    revealObserver.observe(element);

  });


  /* ==========================================
     8. CONTADOR DE TIEMPO
  ========================================== */

  const startDate = new Date(CONFIG.fechaEspecial);

  const updateCounter = () => {

    const now = new Date();

    let difference = Math.max(0, now - startDate);

    const days = Math.floor(
      difference / 86400000
    );

    difference %= 86400000;

    const hours = Math.floor(
      difference / 3600000
    );

    difference %= 3600000;

    const minutes = Math.floor(
      difference / 60000
    );

    const seconds = Math.floor(
      (difference % 60000) / 1000
    );


    document.getElementById("days").textContent =
      days.toLocaleString("es");

    document.getElementById("hours").textContent =
      String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
      String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
      String(seconds).padStart(2, "0");

  };


  if (!Number.isNaN(startDate.getTime())) {

    updateCounter();

    setInterval(updateCounter, 1000);

  } else {

    document.getElementById("loveCounter").textContent =
      "Configura una fecha válida en script.js";

  }


  /* ==========================================
     9. TARJETAS DE MENSAJES SECRETOS
  ========================================== */

  document.querySelectorAll(".reason-card").forEach(card => {

    card.addEventListener("click", () => {

      dialogMessage.textContent = card.dataset.message;

      if (typeof dialog.showModal === "function") {

        dialog.showModal();

      } else {

        alert(card.dataset.message);

      }

      createHeartBurst(8);

    });

  });


  /* ==========================================
     10. CERRAR VENTANA DE MENSAJES
  ========================================== */

  document
    .getElementById("closeDialog")
    .addEventListener("click", () => {

      dialog.close();

    });


  dialog.addEventListener("click", event => {

    if (event.target === dialog) {

      dialog.close();

    }

  });


  /* ==========================================
     11. MÚSICA DE FONDO
  ========================================== */

  musicButton.addEventListener("click", async () => {

    if (music.paused) {

      try {

        await music.play();

        musicLabel.textContent = "Desactivar música";

        musicIcon.textContent = "♫";

        musicButton.setAttribute(
          "aria-pressed",
          "true"
        );

      } catch (error) {

        musicLabel.textContent = "Añade musica.mp3";

        console.warn(
          "No se pudo reproducir el audio:",
          error
        );

      }

    } else {

      music.pause();

      musicLabel.textContent = "Activar música";

      musicIcon.textContent = "♫";

      musicButton.setAttribute(
        "aria-pressed",
        "false"
      );

    }

  });


  /* ==========================================
     12. CREAR BRILLOS
  ========================================== */

  createSparkles();


  /* ==========================================
     13. CORAZONES FLOTANTES AUTOMÁTICOS
  ========================================== */

  setInterval(() => {

    createFloatingHeart();

  }, 1100);


  /* ==========================================
     14. SORPRESA FINAL
  ========================================== */

  document
    .getElementById("moreHearts")
    .addEventListener("click", () => {

      createHeartBurst(45);

    });

});


/* ==========================================
   15. GENERAR PARTÍCULAS BRILLANTES
========================================== */

function createSparkles() {

  const layer = document.getElementById("sparkleLayer");

  const symbols = ["✦", "✧", "·", "✿"];

  for (let i = 0; i < 28; i++) {

    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";

    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.left =
      `${Math.random() * 100}%`;

    sparkle.style.top =
      `${Math.random() * 100}%`;

    sparkle.style.fontSize =
      `${8 + Math.random() * 13}px`;

    sparkle.style.animationDelay =
      `${Math.random() * 3}s`;

    layer.appendChild(sparkle);

  }

}


/* ==========================================
   16. CREAR CORAZONES FLOTANTES
========================================== */

function createFloatingHeart() {

  const layer = document.getElementById("floatingLayer");

  const heart = document.createElement("span");

  heart.className = "float-heart";

  heart.textContent =
    Math.random() > 0.5 ? "♥" : "♡";

  heart.style.left =
    `${Math.random() * 100}%`;

  heart.style.fontSize =
    `${12 + Math.random() * 18}px`;

  heart.style.animationDuration =
    `${7 + Math.random() * 6}s`;

  layer.appendChild(heart);

  setTimeout(() => {

    heart.remove();

  }, 14000);

}


/* ==========================================
   17. EXPLOSIÓN DE CORAZONES
========================================== */

function createHeartBurst(amount = 20) {

  const layer = document.getElementById("floatingLayer");

  for (let i = 0; i < amount; i++) {

    const heart = document.createElement("span");

    heart.className = "float-heart";

    heart.textContent = [
      "♥",
      "♡",
      "💗",
      "💕"
    ][Math.floor(Math.random() * 4)];

    heart.style.left =
      `${10 + Math.random() * 80}%`;

    heart.style.bottom =
      `${Math.random() * 25}%`;

    heart.style.fontSize =
      `${15 + Math.random() * 23}px`;

    heart.style.animationDuration =
      `${3 + Math.random() * 3}s`;

    layer.appendChild(heart);

    setTimeout(() => {

      heart.remove();

    }, 7000);

  }

}


/* ==========================================
   18. PROTEGER TEXTO PERSONALIZADO
========================================== */

function escapeHTML(value) {

  return String(value).replace(/[&<>"']/g, char => ({

    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"

  })[char]);

}
