//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener("click",agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    //Vaciar carrito 
    vaciarCarritoBtn.addEventListener("click", ()=>{
        articulosCarrito = [];//Reseteamos el arreglo

        limpiarHTML();//Eliminar todo el html
    } )
}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }   
}

//Eliminar cursos del carrito
function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        //Elimina del arreglo de articulos carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML();//Iterar sobre el carrito y mostrar su html
    }
}

//Lee el contenido de html al que se le dio click extrayendo informacion 
function leerDatosCurso(curso){
    //console.log(curso);

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //revisa si un elemnto ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
    //actualizamos
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){  
                curso.cantidad++;
                return curso; //retorna el objeto actualizado            
            }else{
                return curso; //retorna los objetos que no son duplicados
            }
        });

        articulosCarrito = [...cursos];
    }else{
    //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();

}

//Muestra el carrito de compras en el html  

function carritoHTML(){

    //limiarp html

    limpiarHTML();
    //recorre y genera el html
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${curso.imagen}" width=100></td>

        <td>${curso.titulo}</td>

        <td>${curso.precio}</td>

        <td>${curso.cantidad}</td>

        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>

        `;
        //agrga el html del carrito en el tbody
        contenedorCarrito.appendChild(row);

    })
}

function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML= "";
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}