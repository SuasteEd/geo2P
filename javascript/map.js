// const urlParams = new URLSearchParams(window.location.search);
// //const dato = urlParams.get("name");
// const latitud = urlParams.get("latitud");
// const longitud = urlParams.get("longitud");
// var userLat;
// var userLong;

// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         userLat = position.coords.latitude;
//         userLong = position.coords.longitude;
//         const pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };

//         // Crear objeto LatLng con la posición del usuario
//         const userLatLng = new google.maps.LatLng(pos);

//         // Crear marcador y agregarlo al mapa
//         const marker = new google.maps.Marker({
//           position: userLatLng,
//           map: map,
//           title: "Tu ubicación actual",
//         });

//         // Centrar mapa en la ubicación del usuario
//         map.setCenter(userLatLng);
//       },
//       () => {
//         // Si el usuario no otorga permiso para acceder a su ubicación, mostrar un mensaje de error
//         alert("No se pudo obtener tu ubicación actual");
//       }
//     );
//   } else {
//     // Si el navegador no admite la geolocalización, mostrar un mensaje de error
//     alert("Tu navegador no admite la geolocalización");
//   }

// const map = new google.maps.Map(document.getElementById("map"), {
//   center: new google.maps.LatLng(parseFloat(longitud), parseFloat(latitud)),
//   zoom: 15,
//   mapTypeId: google.maps.MapTypeId.ROADMAP,
// });
// const directionsService = new google.maps.DirectionsService();
// directionsService.route(
//   {
//     // origin: "272 Bronson Ave, Ottawa, Canada",
//     // destination: "1385 Woodroffe Ave, Nepean, Canada",
//     origin: latitud + "," + longitud,
//     destination: userLat.toString() + "," + userLong.toString(),
//     // travelMode: "DRIVING",
//     travelMode: "WALKING",
//   },
//   (response, status) => {
//     if (status === "OK") {
//       new google.maps.DirectionsRenderer({
//         suppressMarkers: true,
//         directions: response,
//         map: map,
//       });
//     }
//   }
// );

// var sucursales = [
//     {lat: 37.782263, lng: -122.400344, nombre: "Sucursal 1", direccion: "123 Main St"},
//     {lat: 37.785032, lng: -122.407450, nombre: "Sucursal 2", direccion: "456 Market St"},
//     {lat: 37.789988, lng: -122.402710, nombre: "Sucursal 3", direccion: "789 1st St"}
//   ];

//   // Calcular la distancia entre tu ubicación y cada sucursal
//   sucursales.forEach(function(sucursal) {
//     var distancia = google.maps.geometry.spherical.computeDistanceBetween(
//       new google.maps.LatLng(lat, lng),
//       new google.maps.LatLng(sucursal.lat, sucursal.lng)
//     );

//     sucursal.distancia = distancia;
//   });

//   // Encontrar la sucursal más cercana
//   var sucursalMasCercana = sucursales.reduce(function(prev, curr) {
//     return (prev.distancia < curr.distancia) ? prev : curr;
//   });

// if (navigator.geolocation) {

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         userLat = position.coords.latitude;
//         userLong = position.coords.longitude;
//         const pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };

//         // Crear objeto LatLng con la posición del usuario
//         const userLatLng = new google.maps.LatLng(pos);

//         // Centrar mapa en la ubicación del usuario
//         const map = new google.maps.Map(document.getElementById("map"), {
//           center: userLatLng,
//           zoom: 15,
//           mapTypeId: google.maps.MapTypeId.ROADMAP,
//         });

//         // Crear marcador y agregarlo al mapa
//         const marker = new google.maps.Marker({
//           position: userLatLng,
//           map: map,
//           title: "Tu ubicación actual",
//         });

//         const directionsService = new google.maps.DirectionsService();
//         directionsService.route(
//           {
//             origin: userLatLng,
//             destination: latitud + "," + longitud,
//             //destination: sucursalMasCercana.lat.toString() + "," + sucursalMasCercana.lng.toString(),
//             travelMode: "WALKING",
//           },
//           (response, status) => {
//             if (status === "OK") {
//               new google.maps.DirectionsRenderer({
//                 suppressMarkers: true,
//                 directions: response,
//                 map: map,
//               });
//             }
//           }
//         );
//       },
//       () => {
//         // Si el usuario no otorga permiso para acceder a su ubicación, mostrar un mensaje de error
//         alert("No se pudo obtener tu ubicación actual");
//       }
//     );
//   } else {
//     // Si el navegador no admite la geolocalización, mostrar un mensaje de error
//     alert("Tu navegador no admite la geolocalización");
//   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const urlParams = new URLSearchParams(window.location.search);
// const latitud = urlParams.get("latitud");
// const longitud = urlParams.get("longitud");
// var userLat;
// var userLong;

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const userLat = position.coords.latitude;
//       const userLong = position.coords.longitude;
//       const userLatLng = new google.maps.LatLng(userLat, userLong);

//       const sucursales = [
//         {
//           lat: 21.1470306,
//           lng: -101.7063292,
//           nombre: "Sucursal 1",
//           direccion: "123 Main St",
//         },
//         {
//           lat: 37.785032,
//           lng: -122.40745,
//           nombre: "Sucursal 2",
//           direccion: "456 Market St",
//         },
//         {
//           lat: 37.789988,
//           lng: -122.40271,
//           nombre: "Sucursal 3",
//           direccion: "789 1st St",
//         },
//       ];

//       // Calcular la distancia entre tu ubicación y cada sucursal
//       sucursales.forEach(function (sucursal) {
//         var distancia = google.maps.geometry.spherical.computeDistanceBetween(
//           userLatLng,
//           new google.maps.LatLng(sucursal.lat, sucursal.lng)
//         );

//         sucursal.distancia = distancia;
//       });

//       // Encontrar la sucursal más cercana
//       var sucursalMasCercana = sucursales.reduce(function (prev, curr) {
//         return prev.distancia < curr.distancia ? prev : curr;
//       });

//       // Crear objeto LatLng con la posición de la sucursal más cercana
//       const sucursalLatLng = new google.maps.LatLng(
//         sucursalMasCercana.lat,
//         sucursalMasCercana.lng
//       );

//       // Crear el mapa y centrarlo en la ubicación del usuario
//       const map = new google.maps.Map(document.getElementById("map"), {
//         center: userLatLng,
//         zoom: 15,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//       });

//       // Crear marcadores y agregarlos al mapa
//       const userMarker = new google.maps.Marker({
//         position: userLatLng,
//         map: map,
//         title: "Tu ubicación actual",
//       });

//       const sucursalMarker = new google.maps.Marker({
//         position: sucursalLatLng,
//         map: map,
//         title: sucursalMasCercana.nombre,
//       });

//       // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
//       const directionsService = new google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: userLatLng,
//           destination: sucursalLatLng,
//           travelMode: "WALKING",
//         },
//         (response, status) => {
//           if (status === "OK") {
//             new google.maps.DirectionsRenderer({
//               suppressMarkers: true,
//               directions: response,
//               map: map,
//             });
//           }
//         }
//       );
//     },
//     () => {
//       // Si el usuario no otorga permiso para acceder a su ubicación, mostrar un mensaje de error
//       alert("No se pudo obtener tu ubicación actual");
//     }
//   );
// } else {
//   // Si el navegador no admite la geolocalización, mostrar un mensaje de error
//   alert("Tu navegador no admite la geolocalización");
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

function enviar(){
  if (combo.value !== "") {
    window.location.href = "mapa.html?latitud=" + latitud.value + "&longitud=" + longitud.value;
  }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const urlParams = new URLSearchParams(window.location.search);
// var userLat;
// var userLong;

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const userLat = position.coords.latitude;
//       const userLong = position.coords.longitude;
//       const userLatLng = new google.maps.LatLng(userLat, userLong);

//       // Obtenemos los datos de la sucursal desde el servidor
//       fetch('http://172.18.70.94:4001/api/branches/all')
//         .then(response => response.json())
//         .then(data => {

//           // Creamos el objeto LatLng correspondiente a la ubicación de la sucursal
//           const sucursalLatLng = new google.maps.LatLng(data.latitude, data.longitude);

//           // Crear el mapa y centrarlo en la ubicación del usuario
//           const map = new google.maps.Map(document.getElementById("map"), {
//             center: userLatLng,
//             zoom: 15,
//             mapTypeId: google.maps.MapTypeId.ROADMAP,
//           });

//           // Crear marcadores y agregarlos al mapa
//           const userMarker = new google.maps.Marker({
//             position: userLatLng,
//             map: map,
//             title: "Tu ubicación actual",
//           });

//           const sucursalMarker = new google.maps.Marker({
//             position: sucursalLatLng,
//             map: map,
//             title: data.name,
//           });

//           // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
//           const directionsService = new google.maps.DirectionsService();
//           directionsService.route(
//             {
//               origin: userLatLng,
//               destination: sucursalLatLng,
//               travelMode: "DRIVING",
//             },
//             (response, status) => {
//               if (status === "OK") {
//                 new google.maps.DirectionsRenderer({
//                   suppressMarkers: true,
//                   directions: response,
//                   map: map,
//                 });
//               }
//             }
//           );

//         })
//         .catch(error => {
//           console.error('Error:', error);
//           alert("No se pudo obtener la ubicación de la sucursal");
//         });
//     },
//     () => {
//       // Si el usuario no otorga permiso para acceder a su ubicación, mostrar un mensaje de error
//       alert("No se pudo obtener tu ubicación actual");
//     }
//   );
// } else {
//   // Si el navegador no admite la geolocalización, mostrar un mensaje de error
//   alert("Tu navegador no admite la geolocalización");
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Obtener la ubicación actual del usuario
navigator.geolocation.getCurrentPosition(position => {
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
     }
  });

  // Hacer una petición GET a la API
  fetch('http://192.168.1.101:4001/api/branches/all')
    .then(response => response.json())
    .then(data => {
      // Iterar sobre los datos recibidos
      data.forEach(branch => {
        // Obtener la ubicación de la sucursal
        const position = new google.maps.LatLng(branch.latitude, branch.longitude);

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
          }
        });
      });
    })
    .catch(error => console.log(error));
});

