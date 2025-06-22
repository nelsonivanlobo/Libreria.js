//Libros
const titulo= document.getElementById("titulo")
const autor= document.getElementById("autor")
const genero= document.getElementById("genero")
const lista= document.getElementById("list")
const btnAct=document.getElementById("act")
const btnGrd=document.getElementById("grd")
btnAct.hidden= true
let valido=true;

listar() //se pone listar antes que lo demas para que sea lo primero que haga el codigo al cargar
// la pagina y de esa manera ver lo que hay. recordar que el codigo se lee de arriba a abajo.


async function listar() {
    resp = await axios.get("http://localhost:3000/Libros")
    lista.innerHTML= ""
    resp.data.forEach(element => {
        lista.innerHTML +=
        '<button class="btn btn-secondary" onclick="borrar(' + element.id + ')"> Eliminar</button> ' + " " +
        " <b> Titulo: </b>" + element.titulo + " <b> Autor: </b> " + element.autor + " <b> Genero: </b> " + element.genero + " " + '<button class="btn btn-dark" onclick="editar(' + element.id + ')"> Editar</button>' +
         "<br><br>"
    });
}


async function editar(id) {
    btnAct.hidden=false   
    btnGrd.hidden=true    
    auxiliar=id           
    resp = await axios.get("http://localhost:3000/Libros/" + id)
    titulo.value = resp.data.titulo   
    autor.value = resp.data.autor
    genero.value = resp.data.genero
}

async function actualizar() {
    btnAct.hidden= true
    btnGrd.hidden= false
    resp = await axios.put("http://localhost:3000/Libros/" + auxiliar, {titulo: titulo.value, autor: autor.value, genero: genero.value})
}