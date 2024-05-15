//BOTON CREAR PRODUCTO
let btnAbrirCrearProducto = document.querySelector("#btn-crearProducto");
let btnCerrarCrearProducto = document.querySelector("#btn-regresar-producto");
let formularioCrearProducto = document.querySelector("#formulario-crear");

btnAbrirCrearProducto.addEventListener("click", ()=>{
    formularioCrearProducto.showModal();
});

btnCerrarCrearProducto.addEventListener("click", ()=>{
    formularioCrearProducto.close();
});

//BOTON INCREMENTAR PRODUCTO
let btnAbrirAumentarProducto = document.querySelector("#btn-incrementar");
let btnCerrarAumentarProducto = document.querySelector("#btn-regresar-aumentar");
let formularioAumentarProducto = document.querySelector("#formulario-aumentar");

btnAbrirAumentarProducto.addEventListener("click", ()=>{
    formularioAumentarProducto.showModal();
})

btnCerrarAumentarProducto.addEventListener("click", ()=>{
    formularioAumentarProducto.close();
})

//BOTON DECREMENTAR PRODUCTO
let btnAbrirQuitarProducto = document.querySelector("#btn-decrementar");
let btnCerrarQuitarProducto = document.querySelector("#btn-regresar-quitar");
let formularioQuitarProducto = document.querySelector("#formulario-quitar");

btnAbrirQuitarProducto.addEventListener("click", ()=>{
    formularioQuitarProducto.showModal();
});

btnCerrarQuitarProducto.addEventListener("click", ()=>{
    formularioQuitarProducto.close();
});

//BOTON ELIMINAR PRODUCTO
let btnAbrirEliminarProducto = document.querySelector("#btn-eliminar");
let btnCerrarEliminarProducto = document.querySelector("#btn-regresar-eliminar");
let formularioEliminarProducto = document.querySelector("#formulario-eliminar");

btnAbrirEliminarProducto.addEventListener("click", ()=>{
    formularioEliminarProducto.showModal();
});

btnCerrarEliminarProducto.addEventListener("click", ()=>{
    formularioEliminarProducto.close();
});

let btnPaginaPrincipal = document.querySelector("#btn-inicio");

btnPaginaPrincipal.addEventListener("click", ()=>{
    window.location = "index.html";
})

cargarTabla = () => {
    console.log('DOM fully loaded and parsed');

    // Obtener referencia al tbody
    const tbody = document.querySelector('table tbody');

    // Eliminar todos los hijos de tbody excepto el primer hijo (los encabezados de la tabla)
    while (tbody.childNodes.length > 1) {
        tbody.removeChild(tbody.lastChild);
    }

    // Ahora puedes cargar los datos de la API y agregar las filas a tbody
    fetch('http://localhost:8080/api/productos')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const table = document.querySelector('table tbody');
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.codigoProducto}</td>
                    <td>${product.productDescription}</td>
                    <td>${product.uniPrice}</td>
                    <td>${product.cantidad}</td>
                    <td>${product.total}</td>
                `;
                table.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
};

document.addEventListener("DOMContentLoaded", function() {
   cargarTabla();
});


document.getElementById('btn-agregar-producto').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    // Crear objeto con los datos del nuevo producto
    const nuevoProducto = {
        productDescription: nombre,
        uniPrice: parseFloat(precio),
        cantidad: parseInt(cantidad),
        total: parseFloat(precio) * parseInt(cantidad)
    };

    // Enviar los datos al servidor
    fetch('http://localhost:8080/api/Crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto creado:', data);
        // Aquí puedes hacer algo con la respuesta, como mostrar un mensaje de éxito o redireccionar a otra página
        cargarTabla();
    })
    .catch(error => {
        console.error('Error al crear el producto:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
    });
});
