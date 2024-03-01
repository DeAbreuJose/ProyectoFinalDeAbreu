class Paciente {
  constructor(apellido, edad, areaDesignada) {
    this.apellido = apellido;
    this.edad = edad;
    this.areaDesignada = areaDesignada;
  }
}

const evaluarEdad = (edad) => {
  if (edad >= 18) {
    return "Área Especialista.";
  } else {
    return "Área de Pediatría, por favor concurrir con su representante.";
  }
};

let citas = JSON.parse(localStorage.getItem('citas')) || [];


document.getElementById("iniciarCitas").addEventListener("click", () => {
  let apellido = document.getElementById("apellido").value;
  let edad = Number(document.getElementById("edad").value);

  let areaDesignada = evaluarEdad(edad);

  let nuevoPaciente = new Paciente(apellido, edad, areaDesignada);

  citas.push(nuevoPaciente);

  Swal.fire({
    title: `Cita Agendada`,
    text: `Apellido: ${apellido}, Área designada: ${areaDesignada}`,
    icon: 'info',
    confirmButtonText: 'OK'
  });

  document.getElementById("apellido").value = "";
  document.getElementById("edad").value = "";

  localStorage.setItem('citas', JSON.stringify(citas));
});

const buscarPorApellido = () => {
  const apellido = document.getElementById("apellidoBusqueda").value;
  const pacienteEncontrado = citas.find(paciente => paciente.apellido === apellido);
  
  if (pacienteEncontrado) {
    Swal.fire({
      title: `Paciente encontrado`,
      text: `Apellido: ${pacienteEncontrado.apellido}, Edad: ${pacienteEncontrado.edad}, Área designada: ${pacienteEncontrado.areaDesignada}`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      title: `Paciente no encontrado`,
      text: `Paciente con apellido ${apellido} no encontrado`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};

const filtrarPorEdad = () => {
  const edad = Number(document.getElementById("edadFiltro").value);
  const pacientesFiltrados = citas.filter(paciente => paciente.edad === edad);
  
  if (pacientesFiltrados.length > 0) {
    Swal.fire({
      title: "Pacientes encontrados",
      html: `<ul>${pacientesFiltrados.map(paciente => `<li>Apellido: ${paciente.apellido}, Edad: ${paciente.edad}, Área designada: ${paciente.areaDesignada}</li>`).join('')}</ul>`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      title: "No hay pacientes con la edad proporcionada",
      text: `No hay pacientes con la edad ${edad}`,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }
  
};



/******************************/


const apiKey = "08ae93b10979d64cb462f5f30d9a186a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await response.json();

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

}

searchBtn.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
})


if (window.location.pathname === '/html/work.html') {
 
  document.addEventListener('DOMContentLoaded', function() {
    Swal.fire({
      title: '¡Bienvenido al Simulador!',
      text: ' JavaScript desempeña un papel crucial en el desarrollo de aplicaciones web modernas al proporcionar capacidades de interactividad, manipulación del DOM, comunicación con el servidor, validación de datos y muchas otras funcionalidades que son esenciales para crear experiencias de usuario dinámicas e intuitivas, y Aca podemos ver simuladores varios, tanto agenda de citas como el clima en tiempo real.',
      icon: 'info',
      confirmButtonText: 'Aceptar'

    });
  });
}