let categorias = [];
data.events.forEach(evento =>{
  if(!categorias.includes(evento.category)){
    categorias.push(evento.category);
  }
});
console.log(categorias);


let upcomingEvent = "";
let contenedor = document.getElementById('ContenedorCard');
let listaup = [];

for (let event of data.events) {    
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);
    if(eventDate > currentDate){
     upcomingEvent += createCard(event);
     listaup.push(event);
    }
    
}
console.log(upcomingEvent);
contenedor.innerHTML += upcomingEvent;


let indexEvent1 = "";
let checkbox = document.getElementById("categoria");
let buscandoCard = [];
for (let category of categorias) {
  indexEvent1 += createcheckbox(category);
}

checkbox.innerHTML = indexEvent1;

let inputBuscar = document.getElementById("search");

document.querySelector("#buscar").onsubmit = (e) =>{
  e.preventDefault();
  Resultado = "";
  let categoriascheck = [];
  cadaCheckbox.forEach(checkbox =>{
    if(checkbox.checked){
      categoriascheck.push(checkbox.value);
    }
  });

  console.log(categoriascheck);

  let ingresoTexto  = inputBuscar.value.toLowerCase().trim();
  Resultado = buscando(categoriascheck,ingresoTexto);
  document.querySelector('div.cardEvent').innerHTML = Resultado;

}


let cadaCheckbox = document.querySelectorAll(".form-check-input");
console.log(cadaCheckbox);

cadaCheckbox.forEach(checkbox => checkbox.onchange = () =>{
  let Resultado = "";
  let categoriascheck = [];
  cadaCheckbox.forEach(checkbox =>{
    if(checkbox.checked){
      categoriascheck.push(checkbox.value);
    }
  });
  console.log(categorias);

  let ingresoTexto = inputBuscar.value.toLowerCase().trim();
  Resultado = buscando(categoriascheck,ingresoTexto)

  document.querySelector('div.cardEvent').innerHTML = Resultado;
});

function buscando(categorias,ingresoTexto){
    let Resultado ="";
    if(categorias.length > 0 && ingresoTexto == ""){
     listaup.filter(event => categorias.includes(event.category)).forEach(event =>{
        Resultado += createCard(event)
      });
  
      console.log(Resultado);
    }else if(categorias.length > 0 && ingresoTexto != ""){
        listaup.filter(event => categorias.includes(event.category)).filter(event => event.name.toLowerCase().includes(ingresoTexto)|| event.description.toLowerCase().includes(ingresoTexto)).forEach(event =>{
          Resultado += createCard(event)
        });
        if(Resultado == ""){
            Resultado += `<div class="respuesta"><h2>No se encontraron resultados, por favor intente nuevamente</h2></div>;`
        };
        console.log(Resultado);
    }else if(categorias.length == 0 && ingresoTexto == ""){
        listaup.forEach(event => {
            Resultado += createCard(event)
        });
    } ;
    return Resultado;
}
