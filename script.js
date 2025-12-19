document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. ANIMACIONES SCROLL (Reveal) --- */
    const elements = document.querySelectorAll('.reveal');

    const show = () => {
        elements.forEach(el => {
            // Se activa cuando el elemento entra en pantalla
            if (el.getBoundingClientRect().top < window.innerHeight - 80) {
                el.classList.add('active');
            }
        });
    };

    show();
    window.addEventListener('scroll', show);


    /* --- 2. IDIOMA (Traducción Inteligente) --- */
    let lang = 'es';
    const btn = document.getElementById('langBtn');

    btn.addEventListener('click', () => {
        // Cambiar estado (es/en)
        lang = lang === 'es' ? 'en' : 'es';
        btn.textContent = lang === 'es' ? 'EN' : 'ES';

        // Buscar elementos con traducción
        document.querySelectorAll('[data-es]').forEach(el => {
            el.style.opacity = '0'; // Desvanecer
            
            setTimeout(() => {
                // IMPORTANTE: Usamos innerHTML para no borrar las negritas ni <br>
                el.innerHTML = el.getAttribute(`data-${lang}`);
                el.style.opacity = '1'; // Aparecer
            }, 200);
        });
    });


    /* --- 3. LÓGICA DEL ASISTENTE DE RESERVA (MODAL) --- */
    const modal = document.getElementById('modalReserva');
    const closeBtn = document.querySelector('.close-btn');
    
    // Seleccionamos TODOS los botones que llevan a #reservas
    const openBtns = document.querySelectorAll('a[href="#reservas"]'); 

    // Abrir Modal al hacer clic en "Reservar"
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita el salto brusco
            modal.style.display = 'flex'; // Muestra la ventana oscura
        });
    });

    // Cerrar Modal con la X
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        resetModal();
    });

    // Cerrar Modal si hacen clic fuera del cuadro
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            resetModal();
        }
    }
});


/* --- FUNCIONES GLOBALES (Para que el HTML las encuentre) --- */

let personas = 0; // Variable para guardar el número

// Paso 1: Eligen cantidad de personas
function selectPeople(numero) {
    personas = numero;
    
    // Ocultar paso 1 y mostrar paso 2
    document.getElementById('step1').classList.remove('active-step');
    document.getElementById('step2').classList.add('active-step');
}

// Paso 2: Enviar a WhatsApp
function goToWhatsApp() {
    const fecha = document.getElementById('dateInput').value;
    
    if (!fecha) {
        alert("Por favor selecciona una fecha / Please select a date");
        return;
    }

    // --- ¡AQUÍ PONES TU NÚMERO DE PERÚ! ---
    const telefono = "51925021288"; 
    
    // Creamos el mensaje automático
    const mensaje = `Hola El Buen Sabor, deseo una reserva:%0A%0A👤 Personas: ${personas}%0A📅 Fecha: ${fecha}%0A%0A(Enviado desde la web)`;

    // Abrir WhatsApp en nueva pestaña
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
    
    // Cerrar ventana
    document.getElementById('modalReserva').style.display = 'none';
    resetModal();
}

// Función para reiniciar el modal al cerrarlo
function resetModal() {
    document.getElementById('step1').classList.add('active-step');
    document.getElementById('step2').classList.remove('active-step');
    document.getElementById('dateInput').value = '';
    personas = 0;
}