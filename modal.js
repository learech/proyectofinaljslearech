const modalContenedor = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const modalCarrito = document.querySelector('.modal-carrito');
const vaciarCarrito = document.getElementById('finalizar');
const vaciarProductos = document.getElementById('borrarProd');

abrirCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active');
})

cerrarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active');
})

vaciarCarrito.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active');
})

vaciarProductos.addEventListener('click', () => {
    modalContenedor.classList.toggle('modal-active');
})

modalContenedor.addEventListener('click', () => {
    cerrarCarrito.click()
})

modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
})




