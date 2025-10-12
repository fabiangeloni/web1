document.addEventListener("DOMContentLoaded", () => {

    /* === MENÚ HAMBURGUESA === */
    const btnHamburger = document.getElementById('btnHamburger');
    const headerNav = document.getElementById('headerNav');
    const menuOverlay = document.getElementById('menuOverlay');

    if (btnHamburger) {
        btnHamburger.addEventListener('click', () => {
            btnHamburger.classList.toggle('active');
            headerNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            btnHamburger.classList.remove('active');
            headerNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            btnHamburger.classList.remove('active');
            headerNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    /* === HEADER STICKY CON EFECTO SCROLL === */
    const header = document.querySelector('.header-profesional');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    /* === VARIABLES TARJETAS Y BUSQUEDA === */
    const contenedor = document.getElementById("tarjetas-container");
    const buscadorDesktop = document.getElementById("buscador");
    const formDesktop = document.getElementById("form-buscador");
    const botonesCategoria = document.querySelectorAll(".filtro-btn");
    const tituloTarjetas = document.getElementById("titulo-tarjetas");

    if (!contenedor || !buscadorDesktop || !formDesktop || !tituloTarjetas) {
        console.error('Faltan elementos clave en el DOM');
        return;
    }

    let empresas = [];
    let filtroCategoria = "todas";

    // Mostrar tarjetas
    function mostrarTarjetas(empresasFiltradas) {
        contenedor.innerHTML = "";
        tituloTarjetas.textContent = `Mostrando ${empresasFiltradas.length} emprendedor${empresasFiltradas.length !== 1 ? "es" : ""}`;

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

            // Botón Ver Más
            const botonVer = document.createElement("button");
            botonVer.textContent = "Ver Más";
            botonVer.addEventListener("click", () => {
                window.location.href = `empresa.html?id=${empresa.id}`;
            });

            tarjeta.append(img, tag, titulo, desc, botonVer);
            contenedor.appendChild(tarjeta);
        });
    }

    // Filtrado
    function aplicarFiltros(textoInput) {
        const texto = textoInput.toLowerCase();
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
        .then(res => {
            if (!res.ok) throw new Error("No se pudo cargar el JSON");
            return res.json();
        })
        .then(data => {
            empresas = data;
            mostrarTarjetas(empresas);

            // Filtrado en vivo desktop
            buscadorDesktop.addEventListener("input", () => aplicarFiltros(buscadorDesktop.value));
            formDesktop.addEventListener("submit", e => {
                e.preventDefault();
                aplicarFiltros(buscadorDesktop.value);
            });

            // Botones de categoría
            botonesCategoria.forEach(btn => {
                btn.addEventListener("click", e => {
                    e.preventDefault();
                    filtroCategoria = btn.dataset.categoria ? btn.dataset.categoria.toLowerCase() : "todas";
                    aplicarFiltros(buscadorDesktop.value);

                    botonesCategoria.forEach(b => b.classList.remove('activo'));
                    btn.classList.add('activo');
                });
            });
        })
        .catch(err => {
            console.error("Error al cargar JSON:", err);
            tituloTarjetas.textContent = "No se pudieron cargar los emprendedores.";
        });

    /* === FUNCIÓN BÚSQUEDA GENERAL === */
    function realizarBusqueda(input) {
        const termino = input.value.trim();
        const eventoInput = new Event('input');
        input.value = termino;
        input.dispatchEvent(eventoInput);
    }

    /* === BÚSQUEDA MÓVIL === */
    const searchInputMobile = document.querySelector('.search-input-mobile');
    const searchMobilePanel = document.getElementById('searchMobile');
    const searchBtnInsideMobile = document.querySelector('.search-btn-mobile');
    const btnCloseMobile = document.getElementById('btnCloseMobile');

    if (searchInputMobile && searchMobilePanel && searchBtnInsideMobile) {
        searchBtnInsideMobile.type = 'button';
        searchBtnInsideMobile.addEventListener('click', () => {
            realizarBusqueda(searchInputMobile);
            searchMobilePanel.classList.remove('active'); // cerrar panel automáticamente
        });

        searchInputMobile.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                realizarBusqueda(searchInputMobile);
                searchMobilePanel.classList.remove('active'); // cerrar panel automáticamente
            }
        });
    }

    if (btnCloseMobile) {
        btnCloseMobile.addEventListener('click', () => searchMobilePanel.classList.remove('active'));
    }

    /* === BÚSQUEDA DESKTOP BOTÓN === */
    const searchBtnDesktop = document.querySelector('.header-search-desktop .search-btn');
    const searchInputDesktopField = document.querySelector('.header-search-desktop .search-input');

    if (searchBtnDesktop && searchInputDesktopField) {
        searchBtnDesktop.type = 'button';
        searchBtnDesktop.addEventListener('click', () => realizarBusqueda(searchInputDesktopField));
        searchInputDesktopField.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                realizarBusqueda(searchInputDesktopField);
            }
        });
    }

});
