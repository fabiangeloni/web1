// Script de filtrado para la barra lateral
document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.filtro-btn');
    const tarjetas = document.querySelectorAll('.tarjeta');
    const aliasTodas = new Set(['todas', 'todos', 'all']);

    // Si no hay botones o tarjetas, salir
    if (!botones.length || !tarjetas.length) return;

    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();

            // Tomo la categor�a desde data-categoria 
            const rawCat = (boton.dataset.categoria || boton.getAttribute('href') || '').toString().toLowerCase().trim();
            const categoria = rawCat.replace('#', ''); // quita posible #
            const mostrarTodas = aliasTodas.has(categoria);

            tarjetas.forEach(tarjeta => {
                // Leo la categor�a de la tarjeta (dataset)
                const tRaw = (tarjeta.dataset.categoria || '').toString().toLowerCase().trim();
                const tCat = tRaw.replace('#', '');

                if (mostrarTodas || tCat === categoria) {
                    // mostrar
                    tarjeta.style.display = '';
                } else {
                    // ocultar
                    tarjeta.style.display = 'none';
                }
            });

            // Resaltar bot�n activo
            botones.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
        });
    });
});


// Bot�n volver arriba
document.addEventListener('DOMContentLoaded', function () {
    const btnVolverArriba = document.getElementById('btnVolverArriba');

    // Mostrar/ocultar bot�n seg�n scroll
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            btnVolverArriba.classList.add('visible');
        } else {
            btnVolverArriba.classList.remove('visible');
        }
    });

    // Scroll suave al hacer clic
    btnVolverArriba.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animaci�n de entrada para elementos del footer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animado');
            }
        });
    }, observerOptions);

    // Observar columnas del footer
    const footerColumnas = document.querySelectorAll('.footer-columna');
    footerColumnas.forEach(columna => {
        observer.observe(columna);
    });
});

// Esperar a que cargue el DOM
        document.addEventListener('DOMContentLoaded', function() {
    
    /* === MEN� HAMBURGUESA === */
    const btnHamburger = document.getElementById('btnHamburger');
        const headerNav = document.getElementById('headerNav');
        const menuOverlay = document.getElementById('menuOverlay');

        // Abrir/cerrar men�
        if (btnHamburger) {
            btnHamburger.addEventListener('click', function () {
                btnHamburger.classList.toggle('active');
                headerNav.classList.toggle('active');
                menuOverlay.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
    }

        // Cerrar al hacer clic en overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function () {
                btnHamburger.classList.remove('active');
                headerNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
    }

        // Cerrar al hacer clic en un link
        const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
            link.addEventListener('click', function () {
                btnHamburger.classList.remove('active');
                headerNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
    });

        /* === B�SQUEDA M�VIL === */
        const btnSearchMobile = document.getElementById('btnSearchMobile');
        const searchMobile = document.getElementById('searchMobile');
        const btnCloseMobile = document.getElementById('btnCloseMobile');

        // Abrir b�squeda m�vil
        if (btnSearchMobile) {
            btnSearchMobile.addEventListener('click', function () {
                searchMobile.classList.add('active');
                setTimeout(() => {
                    document.querySelector('.search-input-mobile').focus();
                }, 300);
            });
    }

        // Cerrar b�squeda m�vil
        if (btnCloseMobile) {
            btnCloseMobile.addEventListener('click', function () {
                searchMobile.classList.remove('active');
            });
    }

        /* === HEADER STICKY CON EFECTO SCROLL === */
        const header = document.querySelector('.header-profesional');
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Agregar clase cuando se hace scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

        /* === REALIZAR B�SQUEDA === 
        function realizarBusqueda(input) {
        const termino = input.value.trim();
        if (termino !== '') {
            console.log('Buscando:', termino);
        // Aqu� puedes redirigir o filtrar
        window.location.href = `index2.html?buscar=${encodeURIComponent(termino)}`;
        }
    }

        // B�squeda desktop
        const searchBtnDesktop = document.querySelector('.header-search-desktop .search-btn');
        const searchInputDesktop = document.querySelector('.header-search-desktop .search-input');

        if (searchBtnDesktop && searchInputDesktop) {
            searchBtnDesktop.addEventListener('click', () => realizarBusqueda(searchInputDesktop));
        searchInputDesktop.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') realizarBusqueda(searchInputDesktop);
        });
    }*/

        // B�squeda m�vil
        const searchBtnMobile = document.querySelector('.search-btn-mobile');
        const searchInputMobile = document.querySelector('.search-input-mobile');

        if (searchBtnMobile && searchInputMobile) {
            searchBtnMobile.addEventListener('click', () => realizarBusqueda(searchInputMobile));
        searchInputMobile.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') realizarBusqueda(searchInputMobile);
        });
    }
    
});

// STAFF
function abrirModal(nombre, descripcion, personas) {
    document.getElementById('modal-nombre').textContent = nombre;
    document.getElementById('modal-descripcion').textContent = descripcion;

    const galeria = document.getElementById('modal-galeria');
    galeria.innerHTML = ''; // limpiar contenido anterior

    personas.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('persona');
        div.innerHTML = `
        <img src="${p.img}" alt="${p.nombre}">
        <p>${p.nombre}</p>
      `;
        galeria.appendChild(div);
    });

    document.getElementById('modal').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}