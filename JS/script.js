document.addEventListener('DOMContentLoaded', function () {

    /* === MENÚ HAMBURGUESA === */
    const btnHamburger = document.getElementById('btnHamburger');
    const headerNav = document.getElementById('headerNav');
    const menuOverlay = document.getElementById('menuOverlay');

    if (btnHamburger) {
        btnHamburger.addEventListener('click', function () {
            btnHamburger.classList.toggle('active');
            headerNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function () {
            btnHamburger.classList.remove('active');
            headerNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            btnHamburger.classList.remove('active');
            headerNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    /* === BÚSQUEDA MÓVIL === */
    const btnSearchMobile = document.getElementById('btnSearchMobile');
    const searchMobile = document.getElementById('searchMobile');
    const btnCloseMobile = document.getElementById('btnCloseMobile');

    if (btnSearchMobile) {
        btnSearchMobile.addEventListener('click', function () {
            searchMobile.classList.add('active');
            setTimeout(() => {
                document.querySelector('.search-input-mobile').focus();
            }, 300);
        });
    }

    if (btnCloseMobile) {
        btnCloseMobile.addEventListener('click', function () {
            searchMobile.classList.remove('active');
        });
    }

    /* === HEADER STICKY CON EFECTO SCROLL === */
    const header = document.querySelector('.header-profesional');
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* === FUNCIÓN DE BÚSQUEDA === */
    function realizarBusqueda(input) {
        const termino = input.value.trim().toLowerCase();

        // Simular el filtrado dinámico (mismo que el input ya hace en vivo)
        const eventoInput = new Event('input');
        input.value = termino;
        input.dispatchEvent(eventoInput);
    }

    // === BÚSQUEDA DESKTOP ===
    const searchBtnDesktop = document.querySelector('.header-search-desktop .search-btn');
    const searchInputDesktop = document.querySelector('.header-search-desktop .search-input');

    if (searchBtnDesktop && searchInputDesktop) {
        searchBtnDesktop.type = 'button';
        searchBtnDesktop.addEventListener('click', () => realizarBusqueda(searchInputDesktop));
        searchInputDesktop.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                realizarBusqueda(searchInputDesktop);
            }
        });
    }

    // === BÚSQUEDA MÓVIL ===
    const searchBtnMobile = document.querySelector('.search-btn-mobile');
    const searchInputMobile = document.querySelector('.search-input-mobile');

    if (searchBtnMobile && searchInputMobile) {
        searchBtnMobile.type = 'button';
        searchBtnMobile.addEventListener('click', () => realizarBusqueda(searchInputMobile));
        searchInputMobile.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                realizarBusqueda(searchInputMobile);
            }
        });
    }
});
