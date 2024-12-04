const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCarrito = document.getElementById("total-carrito");
const botonOfertas = document.getElementById("ofertas");
const botonTodos = document.getElementById("todos");
const barraBusqueda = document.getElementById("busqueda");

let stockProductos = [];

// Obtener productos desde el archivo JSON
const getData = async () => {
    try {
        const respuesta = await fetch("./js/stock.json");
        stockProductos = await respuesta.json();
        renderizarProductos(stockProductos);
    } catch (e) {
        console.log(e);
    }
};

// Renderizar productos
const renderizarProductos = (array) => {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = "";
    array.forEach((prd) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${prd.img}" style="width: 100%; height: auto;">
            <h3>${prd.nombre}</h3>
            <p>$${prd.precio}</p>
            <button id="agregar${prd.id}">Comprar</button>
        `;

        contenedorProductos.appendChild(div);

        const boton = document.getElementById(`agregar${prd.id}`);
        boton.addEventListener("click", () => {
            agregarCarrito(prd.id);
        });
    });
};

// Agregar productos al carrito
const agregarCarrito = (id) => {
    const producto = stockProductos.find((prod) => prod.id === id);

    if (producto) {
        const productoEnCarrito = carrito.find((prod) => prod.id === id);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            producto.cantidad = 1;
            carrito.push(producto);
        }

        guardarCarrito();
        actualizarCarrito();
    }
};

// Actualizar carrito
const actualizarCarrito = () => {
    if (!contenedorCarrito || !totalCarrito) return;

    contenedorCarrito.innerHTML = "";

    carrito.forEach((elm) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${elm.img}" alt="${elm.nombre}" style="width: 100px; height: auto;">
            <h3>${elm.nombre}</h3>
            <p>$${elm.precio}</p>
            <p>Cantidad: 
                <button id="incrementar${elm.id}"> + </button> 
                <span>${elm.cantidad}</span> 
                <button id="decrementar${elm.id}"> - </button>
            </p>
            <button id="borrar${elm.id}">Borrar</button>
        `;

        contenedorCarrito.append(div);

        const botonIncrementar = document.getElementById(`incrementar${elm.id}`);
        botonIncrementar.addEventListener("click", () => {
            elm.cantidad++;
            guardarCarrito();
            actualizarCarrito();
        });

        const botonDecrementar = document.getElementById(`decrementar${elm.id}`);
        botonDecrementar.addEventListener("click", () => {
            if (elm.cantidad > 1) {
                elm.cantidad--;
                guardarCarrito();
                actualizarCarrito();
            }
        });

        const botonBorrar = document.getElementById(`borrar${elm.id}`);
        botonBorrar.addEventListener("click", () => {
            borrarDelCarrito(elm.id);
        });
    });

    totalCarrito.textContent = `Total: $${carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)}`;
};

// Eliminar producto del carrito
const borrarDelCarrito = (id) => {
    const index = carrito.findIndex((prod) => prod.id === id);
    if (index > -1) {
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarCarrito();
    }
};

// Guardar carrito en localStorage
const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Eventos para filtros y búsqueda
if (botonOfertas) {
    botonOfertas.addEventListener("click", () => {
        const productosOfertas = stockProductos.filter((prd) => prd.oferta === true);
        renderizarProductos(productosOfertas);
    });
}

if (botonTodos) {
    botonTodos.addEventListener("click", () => {
        renderizarProductos(stockProductos);
    });
}

if (barraBusqueda) {
    barraBusqueda.addEventListener("input", () => {
        const textoBusqueda = barraBusqueda.value.toLowerCase();
        const productosFiltrados = stockProductos.filter(prd => prd.nombre.toLowerCase().includes(textoBusqueda));
        renderizarProductos(productosFiltrados);
    });
}

// Redirigir a la página de compra con los datos del carrito
const botonComprar = document.getElementById("comprar");
if (botonComprar) {
    botonComprar.addEventListener("click", () => {
        localStorage.setItem("compra", JSON.stringify(carrito));
        window.location.href = "./compra.html";
    });
}

// Cargar resumen de compra en compra.html
const cargarResumenCompra = () => {
    const resumenCompra = document.getElementById("resumen-compra");
    const totalCompra = document.getElementById("total-compra");

    if (resumenCompra && totalCompra) {
        const compra = JSON.parse(localStorage.getItem("compra")) || [];

        resumenCompra.innerHTML = "";
        compra.forEach((prod) => {
            const div = document.createElement("div");
            div.classList.add("producto");

            div.innerHTML = `
                <img src="${prod.img}" alt="${prod.nombre}" style="width: 100px; height: auto;">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio}</p>
                <p>Cantidad: ${prod.cantidad}</p>
            `;

            resumenCompra.appendChild(div);
        });

        totalCompra.textContent = `Total: $${compra.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)}`;
    }
};

// Confirmar compra
const botonConfirmarCompra = document.getElementById("confirmar-compra");
if (botonConfirmarCompra) {
    botonConfirmarCompra.addEventListener("click", () => {
        localStorage.removeItem("compra");
        localStorage.removeItem("carrito");
        alert("¡Gracias por tu compra!");
        window.location.href = "../index.html";
    });
}

// Inicialización
window.addEventListener("DOMContentLoaded", getData);
actualizarCarrito();
if (document.body.contains(document.getElementById("resumen-compra"))) {
    cargarResumenCompra();
}
