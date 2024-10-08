// Registro
const dniV=document.getElementById("dniv")
const btnDni=document.getElementById("btnDni")
const form=document.getElementById("Formulario")
const dateI=document.getElementById("fechaEntrega")
const libroPresta=document.getElementById("libro")
let idAlum="";
form.hidden=true

async function validarDni(){
     let validador= false
    resp = await axios.get("http://localhost:3000/Alumnos")
    resp.data.forEach(element =>{
            if(element.dni == dniV.value) 
            {
                validador=true
                idAlum=(element.id);
            }
    });
    if (validador == true){
        btnDni.hidden=true;
        form.hidden=false;
    }
    else if (validador == false)
    {
        alert ("El Alumno no se encuentra Registrado en la Base de Datos");
        window.open("./alumnos.html")
    }
}

async function registrarPrestamo(){
    try{
        resp = await axios.post("http://localhost:3000/Permisos", {fechaPrestamo: dateI.value, fechaDevolución: "",idAlumnos: idAlum, idLibros:parseInt(libroPresta.value)})
        alert("Se Listo Correctamente el Prestamo")
    }
    catch{
        alert("Error al Listar los datos del Alumno")
    }
}