import { actualizarCarrito } from "./actualizarCarrito.js";
import { mostrarProductos } from "./App.js";
import { eliminarProductoCarrito } from "./carritoIndex.js";


const contenedorCarrito = document.getElementById('carrito-contenedor');
let carritoStorage = [];

document.addEventListener("DOMContentLoaded", () => {
  swal({
    title: 'Bienvenido a tienda EL ENVASE',
    text: `Tenemos los mejores productos de limpieza`,
    icon: `./public/images/jl_08.jpg`,
    button: `Entrar`,    
    time: 1000
  })

  mostrarProductos();

  if (localStorage.getItem("carrito")) {
    carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    carritoStorage.map((producto) => {
      let div = document.createElement('div');
      div.classList.add('productoEnCarrito');
      div.innerHTML = ` <p>${producto.nombre}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                        <button id=eliminar${producto.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button> 
                      `
      contenedorCarrito.appendChild(div);

      actualizarCarrito(carritoStorage);
      console.log(producto.id)
      eliminarProductoCarrito(producto.id, producto.nombre)
    })
  }
})