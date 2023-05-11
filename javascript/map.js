//Despliegue de inputs
var combo = document.getElementById("Cbox");
var nombre = document.getElementById("name");
const latitud = document.getElementById("latitud");
const longitud = document.getElementById("longitud");
nombre.style.display = "none";
latitud.style.display = "none";
longitud.style.display = "none";

function mostrarBoton() {
  if (combo.value !== "") {
    nombre.style.display = "block";
    latitud.style.display = "block";
    longitud.style.display = "block";
  } else {
    nombre.style.display = "none";
    latitud.style.display = "none";
    longitud.style.display = "none";
    enviar();
  }
}

function enviar() {
  if (combo.value !== "") {
    window.location.href =
      "mapa.html?latitud=" + latitud.value + "&longitud=" + longitud.value;
  }
}
//Obtener la ubicación actual del usuario
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;

  // Crear el mapa
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 13,
  });

  // Crear el marcador de la ubicación actual
  const currentPosition = new google.maps.LatLng(latitude, longitude);
  const currentLocationMarker = new google.maps.Marker({
    position: currentPosition,
    map: map,
    title: "Tu ubicación actual",
    icon: {
      //url: "https://i.gifer.com/6os.gif",",
      //url: "https://media.tenor.com/Z6sMOpVRG78AAAAj/searching-loading.gif",
      url: "https://media.tenor.com/-4g25E-JtEIAAAAj/your-mom-is-a-hoe-kys.gif",
      scaledSize: new google.maps.Size(80, 80),
    },
  });

  // Hacer una petición GET a la API
  fetch('http://192.168.18.10:4001/api/branches/all')
    .then(response => response.json())
    .then(data => {
      // Iterar sobre los datos recibidos
      data.forEach((branch) => {
        // Obtener la ubicación de la sucursal
        const position = new google.maps.LatLng(
          branch.latitude,
          branch.longitude
        );

        // Crear el marcador de la sucursal
        const marker = new google.maps.Marker({
          position: position,
          map: map,
          title: branch.name,
          icon: {
            //url: "https://cdn.iconscout.com/icon/free/png-512/free-store-297-729039.png?f=avif&w=512",
            //url: "https://media.tenor.com/-0lktyAgFDsAAAAi/cookie-sweet.gif",
            url: "https://media.tenor.com/VJNNkbWE3H4AAAAi/yoshi-mario.gif",
            scaledSize: new google.maps.Size(80, 80),
          },
        });
      });
    })
    .catch((error) => console.log(error));
});
