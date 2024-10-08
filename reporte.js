// Reporte
let libro = "";
let alumno = "";
const prestados = document.getElementById("prestados");
const devueltos = document.getElementById("devueltos");

mostrarPrestados();
async function mostrarPrestados() {
  resp = await axios.get("http://localhost:3000/Permisos");
  resp2 = await axios.get("http://localhost:3000/Libros");
  resp3 = await axios.get("http://localhost:3000/Alumnos");
  prestados.innerHTML = "";
  devueltos.innerHTML = "";
  let dato;
  let dato2;
  resp.data.forEach((element) => {
    if (element.fechaDevolución == "") {
      alumno = element.idAlumnos;
      libro = element.idLibros;
      resp2.data.forEach((element) => {
        if (element.id == libro) {
          dato = element.titulo;
        }
      });
      resp3.data.forEach((element) => {
        if (element.id == alumno) {
          dato2 = element.nombre;
        }
      });
      prestados.innerHTML +=
        "<b> Fecha de prestamo: </b>" +
        element.fechaPrestamo +
        "<b> Alumno: </b>" +
        element.idAlumnos +
        "  <b>Libro: </b>" +
        element.idLibros +
        "<b> Titulo del libro: </b>" +
        dato +
        "<b> Nombre del alumno: </b>" +
        dato2 +
        ' <button class="btn btn-dark" onclick="dev(' +
        element.id +
        ')"> Editar</button>' +
        "<br>";
    } else if (element.fechaDevolución != "") {
      alumno = element.idAlumnos;
      libro = element.idLibros;
      resp2.data.forEach((element) => {
        if (element.id == libro) {
          dato = element.titulo;
        }
      });
      resp3.data.forEach((element) => {
        if (element.id == alumno) {
          dato2 = element.nombre;
        }
      });
      devueltos.innerHTML +=
        "<b> Fecha de prestamo: </b>" +
        element.fechaPrestamo +
        " <b>Devuelto el: </b>" +
        element.fechaDevolución +
        "<b> Alumno: </b>" +
        element.idAlumnos +
        " <b> Libro: </b>" +
        element.idLibros +
        "<b> Titulo del libro: </b>" +
        dato +
        "<b> Nombre del alumno: </b>" +
        dato2 + 
        "<br>"
    }
  });
}
async function dev(id){
  let aux=id
  resp =await axios.get("http://localhost:3000/Permisos/")
  let date=prompt("Ingrese Fecha Devolucion","2022-12-30")
  resp.data.forEach(element=>{
      if(element.id==aux){
          let fecha=element.fechaPrestamo
          let alumnoID=element.idAlumnos;
          let libroID=element.idLibros;
          let idPrestamo=element.id
          axios.put("http://localhost:3000/Permisos/" +aux, {fechaPrestamo: fecha, fechaDevolución: date, idAlumnos: alumnoID, idLibros: libroID,id:idPrestamo})
      }
  })

}