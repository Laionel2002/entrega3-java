const stockProductos = [
    {id: 1, nombre: "Remera", precio: 12000, descripcion: "Remera de algodon lisa", oferta: true, imagen: "../img/p1.jpg"},
    {id: 2, nombre: "Remera", precio: 16000, descripcion: "Remera de laicra", oferta: false, imagen: "../img/p6.jpg"},
    {id: 3, nombre: "Remera", precio: 10000, descripcion: "Remera corte simple", oferta: true, imagen: "../img/p7.jpeg"},
    {id: 4, nombre: "Pantalon", precio: 45000, descripcion: "Pantalon baggy", oferta: false, imagen: "../img/p3.jpeg"},
    {id: 5, nombre: "Pantalon", precio: 60000, descripcion: "Pantalon de jean estampado", oferta: false, imagen: "../img/p4.jpeg"},
    {id: 6, nombre: "Pantalon", precio: 40000, descripcion: "Pantalon de jean", oferta: true, imagen: "../img/p3.jpeg"},
    {id: 7, nombre: "Buzo", precio: 80000, descripcion: "buzo Lacoste", oferta: false, imagen: "../img/p2.jpg"},
    {id: 8, nombre: "Buzo", precio: 85000, descripcion: "Buzo boxy fit", oferta: false, imagen: "../img/p4.jpeg"},
    {id: 9, nombre: "Buzo", precio: 60000, descripcion: "Buzo liso", oferta: true, imagen: "../img/p2.jpg"},
    {id: 10, nombre: "Buzo", precio: 95000, descripcion: "Buzo DUkI", oferta: false, imagen: "../img/p4.jpeg"},
    {id: 11, nombre: "Calzado", precio: 240000, descripcion: "VANS", oferta: true, imagen: "../img/p5.jpeg"},
    {id: 12, nombre: "Calzado", precio: 350000, descripcion: "Jordan 4", oferta: false, imagen: "./img/p8.jpg"},
    {id: 13, nombre: "Calzado", precio: 300000, descripcion: "Air max 1", oferta: false, imagen: "./img/p9.jpg"},
    {id: 14, nombre: "Calzado", precio: 320000, descripcion: "Nike TN", oferta: false, imagen: "./img/p10.jpeg"},
    {id: 15, nombre: "Calzado", precio: 290000, descripcion: "47 street", oferta: false, imagen: "./img/p5.jpeg"}
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalCarrito = document.getElementById("total-carrito");
const botonOfertas = document.getElementById("ofertas");
const botonTodos = document.getElementById("todos");
const barraBusqueda = document.getElementById("busqueda");

const renderizarProductos = (array) => {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = "";
    array.forEach((prd) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${prd.imagen}" style="width: 100%; height: auto;">
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

const actualizarCarrito = () => {
    if (!contenedorCarrito || !totalCarrito) return;

    contenedorCarrito.innerHTML = "";

    carrito.forEach((elm) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${elm.imagen}" alt="${elm.nombre}" style="width: 100px; height: auto;">
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
const borrarDelCarrito = (id) => {
    const index = carrito.findIndex((prod) => prod.id === id);
    if (index > -1) {
        carrito.splice(index, 1);
        guardarCarrito();
        actualizarCarrito();
    }
};

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

// Inicialización
renderizarProductos(stockProductos);
actualizarCarrito();
