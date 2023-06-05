var sesion=localStorage.getItem("nombre");

const checarSesion=()=>{
if(sesion==null){
    window.location.href="index.html";
}
document.querySelector("#usuario").innerHTML=sesion;
}

const cerrarSesion=()=>{
    localStorage.clear();
    window.location.href="index.html";
}


const agregarContacto=async()=>{
    var nombre=document.querySelector("#nombre").value;
    var ap=document.querySelector("#ap").value;
    var am=document.querySelector("#am").value;
    var telefono=document.querySelector("#telefono").value;
    var correo=document.querySelector("#correo").value;
   

    if(nombre.trim()===''||
    ap.trim()===''||
    am.trim()===''||
    telefono.trim()===''||
    correo.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS!',
            footer: 'CRUD CONTACTOS'
          })
          return;
 }
   
   
//Insertar a la BASE DE ATOS
    const datos=new FormData();
    datos.append("nombre",nombre);
    datos.append("ap",ap);
    datos.append("am",am);
    datos.append("telefono",telefono);
    datos.append("correo",correo);

    var respuesta=await fetch("php/contacto/agregarC.php",{
        method:'POST',
        body:datos
      });
    
    var resultado=await respuesta.json();

    if(resultado.success===true){
        Swal.fire({
            icon: 'success',
            title: 'EXITOOO',
            text: resultado.mensaje,
            footer: 'CRUD CONTACTOS'
        })
        document.querySelector("#formAgregar").reset();

    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD CONTACTOS'
    })

}
document.querySelector("#agregarModal").click();

}