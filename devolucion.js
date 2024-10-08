// Devoluciones
const dniV = document.getElementById("dniv");
const form2 = document.getElementById("Form2");
const dateO = document.getElementById("fechaDevolucion");
const dnib = document.getElementById("btnDnib");
const libroPresta = document.getElementById("libro");
let idAlum = "";
form2.hidden = true;

let valido = true;


    async function validarDniDev() {
        let validador = false;
        let alumnoEncontrado = false;
    
        try {
            const resp = await axios.get("http://localhost:3000/Alumnos");
            const respa = await axios.get("http://localhost:3000/Permisos");
    
            resp.data.forEach(alumno => {
                if (alumno.dni == dniV.value) {
                    alumnoEncontrado = true;
                    idAlum = alumno.id;
    
                    const prestamosPendientes = respa.data.filter(prestamo => prestamo.idAlumnos == idAlum && prestamo.fechaDevolución == "");
    
                    if (prestamosPendientes.length > 0) {
                        validador = true;
                        dnib.hidden = true;  
                        form2.hidden = false; 
                        
                        const libroId = prestamosPendientes[0].idLibros;
                        mostrarDetallesLibro(libroId); 
                    } else {
                        alert("El Alumno no posee libros pendientes de devolución.");
                    }
                }
            });
    
            if (!alumnoEncontrado) {
                alert("El Alumno no se encuentra registrado en la base de datos.");
                window.open("../CrudAlumnos.html");
            }
    
        } catch (error) {
            console.error("Error al validar el DNI del alumno: ", error);
        }
    }
    
    // Función para mostrar detalles del libro
    async function mostrarDetallesLibro(libroId) {
        try {
            const respLibro = await axios.get(`http://localhost:3000/Libros/${libroId}`);
            const libro = respLibro.data;
            document.getElementById("libro").textContent = `Libro a devolver: ${libro.titulo} (${libro.autor})`;
        } catch (error) {
            console.error("Error al obtener los detalles del libro: ", error);
        }
    }



    async function registrarDevolucion() {
        try {
            // Obtener el préstamo pendiente
            const resp3 = await axios.get(`http://localhost:3000/Permisos?fechaDevolución=&idAlumnos=${idAlum}`);
    
            if (resp3.data.length > 0) {
                const prestamo = resp3.data[0];
    
                const fechaDevolucion = dateO.value;
                if (!fechaDevolucion) {
                    alert("Debe ingresar una fecha de devolución válida.");
                    return;
                }
    
                // Actualizar la devolución con la fecha ingresada
                await axios.put(`http://localhost:3000/Permisos/${prestamo.id}`, {
                    fechaPrestamo: prestamo.fechaPrestamo,
                    fechaDevolución: fechaDevolucion,
                    idAlumnos: prestamo.idAlumnos,
                    idLibros: prestamo.idLibros
                });
    
                alert("Devolución registrada correctamente.");
            } else {
                alert("No se encontró préstamo pendiente para este alumno.");
            }
    
        } catch (error) {
            console.error("Error al registrar la devolución: ", error);
        }
    }