
const listaCarrito = document.querySelector('#lista-carrito tbody');
const totalHTML = document.getElementById('total');
const vaciarCarrito = document.getElementById('vaciar-carrito');

let carrito = [];

document.addEventListener('click', function(e) {
    const boton = e.target.closest('.agregar-carrito');

    if (!boton) return;

    e.preventDefault();

    const producto = boton.closest('.box');

    const nombre = producto.querySelector('h3').textContent;
    const precioTexto = producto.querySelector('.precio').textContent;
    const precio = Number(precioTexto.replace(/[^\d]/g, ''));
    const imagen = producto.querySelector('img').getAttribute('src');
    const id = boton.dataset.id;

    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            id,
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }

    mostrarCarrito();
});

function mostrarCarrito() {
    listaCarrito.innerHTML = '';

    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        listaCarrito.innerHTML += `
            <tr>
                <td><img src="${item.imagen}" width="50"></td>
                <td>${item.nombre}</td>
                <td>L. ${item.precio}</td>
               <td>${item.cantidad}</td>
                <td>L. ${subtotal}</td>
                <td>
    <button class="eliminar-producto" data-id="${item.id}">
        Eliminar
    </button>
</td>
            </tr>
        `;
    });

    totalHTML.textContent = `Total: L. ${total}`;
}

vaciarCarrito.addEventListener('click', function(e) {
    e.preventDefault();

    carrito = [];
    mostrarCarrito();
});
document.addEventListener('click', function(e) {
    const boton = e.target.closest('.eliminar-producto');

    if (!boton) return;

    const id = boton.dataset.id;

    carrito = carrito.filter(item => item.id !== id);

    mostrarCarrito();
});