document.addEventListener("DOMContentLoaded", () => {
  // Referencias DOM
  const contenedor = document.getElementById("tarjetas-container");
  const buscadores = document.querySelectorAll(".buscador"); // ambos inputs
  const botones = document.querySelectorAll(".filtro-btn");
  const tituloTarjetas = document.getElementById("titulo-tarjetas");

  if (!contenedor || !buscadores.length || !tituloTarjetas) {
    console.error('Faltan elementos clave en el DOM');
    return;
  }

  let empresas = [];
  let filtroCategoria = "todas";

 // Función para mostrar tarjetas
function mostrarTarjetas(empresasFiltradas) {
  contenedor.innerHTML = "";
  tituloTarjetas.textContent = `Mostrando ${empresasFiltradas.length} emprendedor${empresasFiltradas.length !== 1 ? "es" : ""}`;

  // 🔹 Botón "Limpiar filtros"
  let btnLimpiar = document.getElementById("btn-limpiar-filtros");
  if (!btnLimpiar) {
    btnLimpiar = document.createElement("button");
    btnLimpiar.id = "btn-limpiar-filtros";
    btnLimpiar.textContent = "Limpiar filtros";
    btnLimpiar.style.marginLeft = "10px"; // opcional: espaciado
    tituloTarjetas.insertAdjacentElement("afterend", btnLimpiar);

    btnLimpiar.addEventListener("click", () => {
      // Limpiar inputs
      buscadores.forEach(input => input.value = '');
      // Resetear categoría
      filtroCategoria = "todas";
      // Mostrar todas las empresas
      mostrarTarjetas(empresas);

      // Quitar estado activo de botones de categoría
      botones.forEach(b => b.classList.remove("activo"));
    });
  }

  // Mostrar el botón solo si hay filtros aplicados
  if (empresasFiltradas.length !== empresas.length) {
    btnLimpiar.style.display = "inline-block";
  } else {
    btnLimpiar.style.display = "none";
  }

  // Mezclar aleatoriamente
  const mezcladas = [...empresasFiltradas];
  for (let i = mezcladas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mezcladas[i], mezcladas[j]] = [mezcladas[j], mezcladas[i]];
  }

  mezcladas.forEach(empresa => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.dataset.categoria = empresa.categoria ? empresa.categoria.toLowerCase() : "";

    const img = document.createElement("img");
    img.src = empresa.fotoPerfil || 'img/default.jpg';
    img.alt = empresa.nombre || 'Sin nombre';

    const tag = document.createElement("span");
    tag.classList.add("categoria-tag");
    tag.textContent = empresa.categoria || 'Sin categoría';

    const titulo = document.createElement("h2");
    titulo.classList.add("titulo");
    titulo.textContent = empresa.nombre || 'Sin nombre';

    const desc = document.createElement("p");
    desc.textContent = empresa.descripcionCorta || '';

    const boton = document.createElement("button");
    boton.textContent = "Ver Más";
    boton.addEventListener("click", () => {
      window.location.href = `empresa.html?id=${empresa.id}`;
    });

    tarjeta.append(img, tag, titulo, desc, boton);
    contenedor.appendChild(tarjeta);
  });
}


  // Función de filtrado por texto y categoría
  function aplicarFiltros(valorInput) {
    const texto = valorInput.toLowerCase();
    const filtradas = empresas.filter(emp => {
      const coincideCategoria = filtroCategoria === "todas" || (emp.categoria && emp.categoria.toLowerCase() === filtroCategoria);
      const coincideTexto = Object.values(emp).some(valor => {
        if (typeof valor === "string" || typeof valor === "number" || typeof valor === "boolean") {
          return valor.toString().toLowerCase().includes(texto);
        }
        return false;
      });
      return coincideCategoria && coincideTexto;
    });
    mostrarTarjetas(filtradas);
  }

  // Cargar JSON
  fetch("json/empresas.json")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar el JSON");
      return response.json();
    })
    .then(data => {
      empresas = data;
      mostrarTarjetas(empresas);

      // Filtrado en tiempo real para ambos buscadores
      buscadores.forEach(input => {
        input.addEventListener("input", e => aplicarFiltros(e.target.value));
      });

      // Filtrado por botones de categoría
      botones.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          filtroCategoria = btn.dataset.categoria ? btn.dataset.categoria.toLowerCase() : "todas";
          // Aplicar filtros usando el valor del primer buscador (o vacío si no escribieron)
          const valor = buscadores[0].value || "";
          aplicarFiltros(valor);
        });
      });
    })
    .catch(error => {
      console.error("Error al cargar el JSON:", error);
      tituloTarjetas.textContent = "No se pudieron cargar los emprendedores.";
    });
});
