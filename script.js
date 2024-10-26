alert("Bienvenido a mi tienda virtual")

function validarEntrada(dato){
    return dato !== "" && dato !== null && isNaN(dato)
}

let nombre, apellido

let opciones, opcion

const carrito = []

do {
    let nombreApellido = prompt("Por favor ingrese su nombre y apellido")
    let partes = nombreApellido.split(" ")

    nombre = partes[0]
    apellido = partes[1] || ""

    if(!validarEntrada(nombre) || !validarEntrada(apellido) || nombre.length < 2 || apellido.length < 2) {
        alert("Error, nombre o apellido incorrecto. Por favor intente nuevamente")
    }
} while (!validarEntrada(nombre) || !validarEntrada(apellido) || nombre.length < 2 || apellido.length < 2)

const arrayProductos = [
    {nombre: "Remera", precio: 12000, descripcion: "Remera de algodon lisa"},
    {nombre: "Remera", precio: 16000, descripcion: "Remera de laicra"},
    {nombre: "Remera", precio: 10000, descripcion: "Remera corte simple"},
    {nombre: "Pantalon", precio: 45000, descripcion: "Pantalon baggy"},
    {nombre: "Pantalon", precio: 60000, descripcion: "Pantalon de jean estampado"},
    {nombre: "Pantalon", precio: 40000, descripcion: "Pantalon de jean"},
    {nombre: "Buzo", precio: 80000, descripcion: "buzo Lacoste"},
    {nombre: "Buzo", precio: 85000, descripcion: "Buzo boxy fit"},
    {nombre: "Buzo", precio: 60000, descripcion: "Buzo liso"},
    {nombre: "Buzo", precio: 95000, descripcion: "Buzo DUkI"},
    {nombre: "Calzado", precio: 240000, descripcion: "VANS"} ,
    {nombre: "Calzado", precio: 350000, descripcion: "Jordan 4"},
    {nombre: "Calzado", precio: 300000, descripcion: "Air max 1"},
    {nombre: "Calzado", precio: 320000, descripcion: "Nike TN"},
    {nombre: "Calzado", precio: 290000, descripcion: "47 street"},
]

do {
    opciones = prompt(nombre + " " + apellido + " seleccione el tipo de prenda que esta buscando \n1. Remeras \n2. Pantalones \n3. Buzos \n4. Calzados \n5. Salir")

    if (opciones === "5") {
        alert ("Saliendo...")
        break;
    }

    if (!["1", "2", "3", "4"].includes(opciones)) {
        alert("Opcion no valida. Por favor intente nuevamente")
        continue

    } else if (opciones === "1") {
        const remeras = arrayProductos.filter((elm) => elm.nombre === "Remera").map((elm, indice) => indice + 1 + ". " + elm.nombre + " " + elm.precio + "$ " + elm.descripcion); 

        let opcion;

        let remeraSeleccionada;

        while(true){
            opcion = parseInt(prompt("Seleccione el numero de la prenda deseada:\n" + remeras.join("\n")));

            if (opcion > 0 && opcion <= remeras.length){
                remeraSeleccionada = arrayProductos.filter((elm) => elm.nombre === "Remera")[opcion - 1];
                carrito.push(remeraSeleccionada);
                alert("Prenda agregada al carrito exitosamente.")
                break;

            } else {
                alert("Opcion no valida.")
            }
        }

    } else if (opciones === "2") {
        const pantalones = arrayProductos.filter((elm) => elm.nombre === "Pantalon").map((elm, indice) => indice + 1 + ". " + elm.nombre + " " + elm.precio + "$ " + elm.descripcion); 

        let opcion;

        let pantalonSeleccionado;

        while(true){
            opcion = parseInt(prompt("Seleccione el numero de la prenda deseada:\n" + pantalones.join("\n")));

            if (opcion > 0 && opcion <= pantalones.length){
                pantalonSeleccionado = arrayProductos.filter((elm) => elm.nombre === "Pantalon")[opcion - 1];
                carrito.push(pantalonSeleccionado);
                alert("Prenda agregada al carrito exitosamente.")
                break;
    
            } else {
                alert("Opcion no valida.")
            }
        }

    } else if (opciones === "3") {
        const buzos = arrayProductos.filter((elm) => elm.nombre === "Buzo").map((elm, indice) => indice + 1 + ". " + elm.nombre + " " + elm.precio + "$ " + elm.descripcion); 

        let opcion;

        let buzoSeleccionado;

        while(true){
            opcion = parseInt(prompt("Seleccione el numero de la prenda deseada:\n" + buzos.join("\n")));

            if (opcion > 0 && opcion <= buzos.length){
                buzoSeleccionado = arrayProductos.filter((elm) => elm.nombre === "Buzo")[opcion - 1];
                carrito.push(buzoSeleccionado);
                alert("Prenda agregada al carrito exitosamente.")
                break;
    
            } else {
                alert("Opcion no valida.")
            }
        }

    } else if (opciones === "4") {
        const calzados = arrayProductos.filter((elm) => elm.nombre === "Calzado").map((elm, indice) => indice + 1 + ". " + elm.nombre + " " + elm.precio + "$ " + elm.descripcion); 

        let opcion;

        let calzadoSeleccionado;

        while(true){
            opcion = parseInt(prompt("Seleccione el numero de la prenda deseada:\n" + calzados.join("\n")));

            if (opcion > 0 && opcion <= calzados.length){
                calzadoSeleccionado = arrayProductos.filter((elm) => elm.nombre === "Calzado")[opcion - 1];
                carrito.push(calzadoSeleccionado);
                alert("Prenda agregada al carrito exitosamente.")
                break;
    
            } else {
                alert("Opcion no valida.")
            }
        }
    }

    

} while (true)

const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

alert("El valor total de las prendas seleccionadas es de: " + total)