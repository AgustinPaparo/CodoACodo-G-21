const boton_menu = document.querySelector(".button_menu");
const navbar = document.querySelector(".navbar");
const container_navegation = document.querySelector(".container_navegation");
const body = document.body;

let posActual = 0;
let status_button = true;

/* EVENTOS */

boton_menu.addEventListener("click", function () {
  container_navegation.classList.toggle("active_button_menu");

  if (status_button) {
    body.setAttribute("style", "overflow: hidden;");
    navbar.setAttribute("style", "backdrop-filter: none;");
    status_button = false;
  } else {
    body.setAttribute("style", "overflow: visible;");
    navbar.setAttribute("style", "backdrop-filter:blur(10px)");
    status_button = true;
  }
});

/* Para que desaparezca y aparezca el nav cuando hacemos scroll */

window.addEventListener("scroll", function () {
  if (this.window.scrollY > posActual) {
    // bajando scroll
    navbar.classList.remove("active_navbar");
    navbar.classList.add("desactive_navbar");
  } else {
    // subiendo scroll
    navbar.classList.remove("desactive_navbar");
    navbar.classList.add("active_navbar");
  }
  if (this.window.scrollY === 0) {
    navbar.setAttribute("style", "backdrop-filter:none");
    navbar.classList.add("ocultar_box_shadow");
  } else {
    navbar.removeAttribute("style", "backdrop-filter:blur(10px)");
    navbar.classList.remove("ocultar_box_shadow");
  }
  posActual = this.window.scrollY;
});

/* GET a mi db.. */

const db = "/db.json";
fetch(db)
  .then((response) => response.json())
  .then((data) => showData(data))
  .catch((error) => console.log(error));

const showData = (data) => {
  let container = document.getElementById("container_card");
  let container_proyect = document.querySelector(".container_card_proyect");
  for (let i = 0; i < data.actividades_destacadas.length; i++) {
    let actividad = data.actividades_destacadas[i];
    container.innerHTML += `
            <li key=${data.actividades_destacadas[0]}>
                <div class="card">
                    <img src="${actividad.fs_path}" alt=${actividad.title}>
                    <h4>${actividad.title}</h4>
                </div>
            </li>
        `;
  }

  container_proyect.innerHTML = "";
  data.projects.forEach((project, index) => {
    const oddOrEven = index % 2 === 0 ? "even" : "odd"; // Resto de index/2 = 0 ?
    container_proyect.innerHTML += `
          <div class="container_card_proyect ${oddOrEven}">
            <div class="img_effect_proyect">
                <img src="${project.picture}" alt="${project.title}" title="${project.title}">
            </div>

            <div class="description_card_proyect">
                <p class="text_proyect_import">Proyectos Destacado</p>
                <h3 class="name_card_proyect">${project.title}</h3>
                <div class="information_card_proyect">
                    <p>${project.description}</p>
                </div>
                <div class="container_languages_programing">
                    <ul>
                        ${project.lenguajes
                          .map((tecnology) => `<li>#${tecnology}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="container_links_proyect">
                    <i class="fa-brands fa-github"></i>
                </div>
            </div>
          </div>
        `;
  });
};

// Botón to-top

window.addEventListener("scroll", function () {
  let btnToTop = document.getElementById("btn-to-top");

  if (window.scrollY > 0) {
    console.log("NO BUTTON");
    btnToTop.style.display = "flex";
  } else {
    btnToTop.style.display = "none";
  }
});
// validacion formulario datos
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        // Borrar
        document.getElementById('firstNameError').textContent = '';
        document.getElementById('lastNameError').textContent = '';
        document.getElementById('emailError').textContent = '';

        let valid = true;

        // Valida nombre
        const nombre = document.getElementById('firstName').value.trim();
        if (nombre === '' || !/^[a-zA-Z\s]+$/.test(nombre)) {
            document.getElementById('firstNameError').textContent = 'Por favor, ingrese un nombre válido.';
            valid = false;
        }

        // Validate apellido
        const apellido = document.getElementById('lastName').value.trim();
        if (apellido === '' || !/^[a-zA-Z\s]+$/.test(apellido)) {
            document.getElementById('lastNameError').textContent = 'Por favor, ingrese un apellido válido.';
            valid = false;
        }

        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || !emailPattern.test(email)) {
            document.getElementById('emailError').textContent = 'Por favor, ingrese un email válido.';
            valid = false;
        }

        // If not valid, prevent form submission
        if (!valid) {
            event.preventDefault();
        }
    });
