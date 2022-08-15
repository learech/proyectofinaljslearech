
import { actualizarCarrito } from "./actualizarCarrito.js";
import { productos } from "./stock.js";

const contenedorCarrito = document.getElementById('carrito-contenedor');
let carritoDeCompras = [];

export const carritoIndex = (productoId) => {
  if (localStorage.getItem("carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
  }
  console.log(carritoDeCompras)
  let productoRepetido = carritoDeCompras.find(producto => producto.id == productoId);
  contarProductosRepetidos(productoRepetido, productoId);
  eliminarProductoCarrito(productoId);
}

export const eliminarProductoCarrito = (productoId) => {
  if (localStorage.getItem("carrito")) {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito"));
  }
  let botonEliminar = document.getElementById(`eliminar${productoId}`);
  botonEliminar.addEventListener('click', () => {   
    swal({
      title: `¿Quiere eliminar el producto del carrito?`,      
      icon: `warning`,
      buttons: true,
      dangerMode: true
    }).then ((result) => {
      if (result) {
        botonEliminar.parentElement.remove();        
        carritoDeCompras = carritoDeCompras.filter(el => el.id != productoId);        
        actualizarCarrito(carritoDeCompras);
      }
    })
  });
}

const contarProductosRepetidos = (prodRepetido, productoId) => {
  if (prodRepetido) {
    prodRepetido.cantidad++
    document.getElementById(`cantidad${prodRepetido.id}`).innerHTML = `<p id=cantidad${prodRepetido.id}>Cantidad: ${prodRepetido.cantidad}</p>`;
    actualizarCarrito(carritoDeCompras);
  } else {
    renderProductosCarrito(productoId);
  }
}    

const renderProductosCarrito = (productoId) => {
  let producto = productos.find(producto => producto.id == productoId);  
  carritoDeCompras.push(producto);

  producto.cantidad = 1;

  let div = document.createElement('div');
  div.classList.add('productoEnCarrito');
  div.innerHTML = `<p>${producto.nombre}</p>
                   <p>Precio: ${producto.precio}</p>
                   <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                   <button id=eliminar${producto.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                  `

  contenedorCarrito.appendChild(div);
  actualizarCarrito(carritoDeCompras);       
}


function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
  while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}


const finalizarCompra = document.getElementById('finalizar');
finalizarCompra.addEventListener('click', () => {
  if (carritoDeCompras == "") {
    swal({
      title: '¡El carrito está vacío!',
      text: `No se agregaron productos para comprar`,
      icon: `warning`,
      button: `Cerrar`,
      time: 2000
    })       
  }else{    
    swal({      
      title: '¡Felicitaciones!',
      text: `Su compra se realizó con éxito`,
      icon: `success`,
      button: `Cerrar`,
      time: 2000
    }) 
  limpiarCarrito();
  }
   
});


const borrarProd = document.getElementById("borrarProd");
const cantidadCarrito = document.getElementById('contador-carrito');
const limpiarCarrito = () => {
  if (carritoDeCompras == "") {
    swal({
      title: '¡El carrito está vacío!',
      text: `No hay productos para borrar`,
      icon: `warning`,
      button: `Cerrar`,
      time: 2000
    })       
  }  
  if (carritoDeCompras.length > 0) {   
      localStorage.clear();
      carritoDeCompras = [];
      cantidadCarrito.innerText = 0;
      precioTotal.innerHTML = "";
      limpiarHTML();   
  }
};
borrarProd.addEventListener("click", limpiarCarrito)