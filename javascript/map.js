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

const urlParams = new URLSearchParams(window.location.search);
const latitud = urlParams.get("latitud");
const longitud = urlParams.get("longitud");
var userLat;
var userLong;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        // Crear objeto LatLng con la posición del usuario
        const userLatLng = new google.maps.LatLng(pos);
        
        // Centrar mapa en la ubicación del usuario
        const map = new google.maps.Map(document.getElementById("map"), {
          center: userLatLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
        
        // Crear marcador y agregarlo al mapa
        const marker = new google.maps.Marker({
          position: userLatLng,
          map: map,
          title: "Tu ubicación actual",
        });
        
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: userLatLng,
            destination: latitud + "," + longitud,
            travelMode: "WALKING",
          },
          (response, status) => {
            if (status === "OK") {
              new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                directions: response,
                map: map,
              });
            }
          }
        );
      },
      () => {
        // Si el usuario no otorga permiso para acceder a su ubicación, mostrar un mensaje de error
        alert("No se pudo obtener tu ubicación actual");
      }
    );
  } else {
    // Si el navegador no admite la geolocalización, mostrar un mensaje de error
    alert("Tu navegador no admite la geolocalización");
  }
