//Libros
const titulo= document.getElementById("titulo")
const autor= document.getElementById("autor")
const genero= document.getElementById("genero")
const lista= document.getElementById("list")
const btnAct=document.getElementById("act")
const btnGrd=document.getElementById("grd")
btnAct.hidden= true
let valido=true;

listar()
async function guardar() {
    try {
        resp = await axios.post("http://localhost:3000/Libros", {titulo: titulo.value, autor: autor.value, genero: genero.value})
    }
    catch {
        alert("No se guardaron los datos correctamente")
    }
}

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

async function borrar(id) {
    let respaldo=id;
    resp = await axios.get("http://localhost:3000/Permisos")
    resp.data.forEach(element => {
        if (element.idLibros == respaldo) {
            valido=false
        }
    })
    if (valido == true) {
        await axios.delete("http://localhost:3000/Libros/" + id);
    }
    else if (valido == false) {
        alert("No se puede eliminar un libro ya prestado")
        valido=true;
        
    }
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