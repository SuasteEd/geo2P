// function obtenerSucursalCercana(userLatLng) {
//   return fetch("http://172.18.70.94:4001/api/branches/all")
//     .then((response) => response.json())
//     .then((data) => {
//       // Calcular la distancia entre la ubicación del usuario y cada sucursal
//       const sucursales = data.map((sucursal) => {
//         const sucursalLatLng = new google.maps.LatLng(
//           sucursal.latitude,
//           sucursal.longitude
//         );
//         const distancia = google.maps.geometry.spherical.computeDistanceBetween(
//           userLatLng,
//           sucursalLatLng
//         );
//         return { ...sucursal, distancia };
//       });

//       // Encontrar la sucursal más cercana
//       const sucursalMasCercana = sucursales.reduce(function (prev, curr) {
//         return prev.distancia < curr.distancia ? prev : curr;
//       });

//       // Crear el objeto LatLng correspondiente a la ubicación de la sucursal
//       const sucursalLatLng = new google.maps.LatLng(
//         sucursalMasCercana.latitude,
//         sucursalMasCercana.longitude
//       );

//       const sucursalesList = sucursales.sort(
//         (a, b) => a.distancia - b.distancia
//       );

//       return { sucursalMasCercana, sucursalLatLng, sucursalesList };
//     });
// }

// const urlParams = new URLSearchParams(window.location.search);
// const latitud = urlParams.get("latitud");
// const longitud = urlParams.get("longitud");
// const nombre = urlParams.get("nombre");

// if (latitud && longitud) {
//   const userLatLng = new google.maps.LatLng(latitud, longitud);

//   obtenerSucursalCercana(userLatLng).then(
//     ({ sucursalMasCercana, sucursalLatLng, sucursalesList }) => {
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
//         title: sucursalMasCercana.name,
//         icon: {
//           url: "https://media.tenor.com/-4g25E-JtEIAAAAj/your-mom-is-a-hoe-kys.gif",
//           scaledSize: new google.maps.Size(50, 50),
//         },
//       });

//       // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
//       const directionsService = new google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: userLatLng,
//           destination: sucursalLatLng,
//           travelMode: "DRIVING",
//         },
//         (response, status) => {
//           if (status === "OK") {
//             new google.maps.DirectionsRenderer({
//               suppressMarkers: true,
//               directions: response,
//               map: map,
//             });

//             const output = document.getElementById("output");
//             console.log(response.routes[0].legs[0].duration.text);
//             for (let i = 0; i < sucursalesList.length; i++) {
//               const sucursal = sucursalesList[i];
//               output.innerHTML +=
//                 "<div class='alert-info'>From: " +
//                 userLatLng +
//                 ". <br />To: " +
//                 sucursal.latitude +
//                 ", " +
//                 sucursal.longitude +
//                 ". <br />Driving distance <i class='fas fa-road'></i> :" +
//                 sucursal.distancia.toFixed(2) +
//                 " meters. <br />Duration <i class='fas fa-hourglass-start'></i> :" +
//                 response.routes[0].legs[0].duration.text +
//                 " minutes.</div>";
//             }
//           }
//         }
//       );
//     }
//   );
// } else {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const userLat = position.coords.latitude;
//       const userLong = position.coords.longitude;
//       const userLatLng = new google.maps.LatLng(userLat, userLong);

//       obtenerSucursalCercana(userLatLng).then(
//         ({ sucursalMasCercana, sucursalLatLng, sucursalesList }) => {
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
//             title: sucursalMasCercana.name,
//           });
//           // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
//           const directionsService = new google.maps.DirectionsService();
//           directionsService.route(
//             {
//               origin: userLatLng,
//               destination: sucursalLatLng,
//               travelMode: "WALKING",
//             },
//             (response, status) => {
//               if (status === "OK") {
//                 new google.maps.DirectionsRenderer({
//                   suppressMarkers: true,
//                   directions: response,
//                   map: map,
//                 });
//                 const output = document.getElementById("output");
//                 console.log(response.routes[0].legs[0].duration.text);
//                 for (let i = 0; i < sucursalesList.length; i++) {
//                   const sucursal = sucursalesList[i];
//                   output.innerHTML +=
//                     "<div class='alert-info'>From: " +
//                     userLatLng +
//                     ". <br />To: " +
//                     sucursal.latitude +
//                     ", " +
//                     sucursal.longitude +
//                     ". <br />Driving distance <i class='fas fa-road'></i> :" +
//                     response.routes[0].legs[0].distance.text +
//                     " meters. <br />Duration <i class='fas fa-hourglass-start'></i> :" +
//                     response.routes[0].legs[0].duration.text +
//                     " minutes.</div>";
//                 }
//               }
//             }
//           );
//         }
//       );
//     });
//   }
// }

function obtenerSucursalCercana(userLatLng) {
  return fetch("http://172.18.70.94:4001/api/branches/all")
    .then((response) => response.json())
    .then((data) => {
      // Calcular la distancia entre la ubicación del usuario y cada sucursal
      const sucursales = data.map((sucursal) => {
        const sucursalLatLng = new google.maps.LatLng(
          sucursal.latitude,
          sucursal.longitude
        );
        const distancia = google.maps.geometry.spherical.computeDistanceBetween(
          userLatLng,
          sucursalLatLng
        );
        return { ...sucursal, distancia };
      });

      // Encontrar la sucursal más cercana
      const sucursalMasCercana = sucursales.reduce(function (prev, curr) {
        return prev.distancia < curr.distancia ? prev : curr;
      });

      // Crear el objeto LatLng correspondiente a la ubicación de la sucursal
      const sucursalLatLng = new google.maps.LatLng(
        sucursalMasCercana.latitude,
        sucursalMasCercana.longitude
      );

      const sucursalesList = sucursales.sort(
        (a, b) => a.distancia - b.distancia
      );

      // Calcular la ruta y el tiempo de viaje desde la ubicación del usuario hasta cada sucursal
      const directionsService = new google.maps.DirectionsService();
      const promises = sucursalesList.map((sucursal) => {
        return new Promise((resolve) => {
          directionsService.route(
            {
              origin: userLatLng,
              destination: new google.maps.LatLng(
                sucursal.latitude,
                sucursal.longitude
              ),
              travelMode: "DRIVING",
            },
            (response, status) => {
              if (status === "OK") {
                sucursal.tiempo = response.routes[0].legs[0].duration.text;
              }
              resolve(sucursal);
            }
          );
        });
      });

      // Retornar la lista de sucursales con la distancia y el tiempo de viaje
      return Promise.all(promises).then((sucursalesList) => {
        return { sucursalMasCercana, sucursalLatLng, sucursalesList };
      });
    });
}

const urlParams = new URLSearchParams(window.location.search);
const latitud = urlParams.get("latitud");
const longitud = urlParams.get("longitud");
const nombre = urlParams.get("nombre");

if (latitud && longitud) {
  const userLatLng = new google.maps.LatLng(latitud, longitud);

  obtenerSucursalCercana(userLatLng).then(
    ({ sucursalMasCercana, sucursalLatLng, sucursalesList }) => {
      // Crear el mapa y centrarlo en la ubicación del usuario
      const map = new google.maps.Map(document.getElementById("map"), {
        center: userLatLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      // Crear marcadores y agregarlos al mapa
      const userMarker = new google.maps.Marker({
        position: userLatLng,
        map: map,
        title: "Tu ubicación actual",
      });

      const sucursalMarker = new google.maps.Marker({
        position: sucursalLatLng,
        map: map,
        title: sucursalMasCercana.name,
        icon: {
          url: "https://media.tenor.com/-4g25E-JtEIAAAAj/your-mom-is-a-hoe-kys.gif",
          scaledSize: new google.maps.Size(50, 50),
        },
      });

      sucursalesList.forEach((sucursal) => {
        const sucursal1 = sucursal;
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: userLatLng,
            destination: new google.maps.LatLng(
              sucursal1.latitude,
              sucursal1.longitude
            ),
            travelMode: "DRIVING",
          },
          (response, status) => {
            if (status === "OK") {
              const output = document.getElementById("output");
              output.innerHTML +=
                "<div class='alert-info'>From: " +
                "Tu ubicación" +
                ". <br />To: " +
                sucursal1.name +
                ". <br />Duration <i class='fas fa-hourglass-start'></i> :" +
                response.routes[0].legs[0].duration.text +
                " minutes.</div>";
            }
          }
        );
      });

      // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
      // const directionsService = new google.maps.DirectionsService();
      // directionsService.route(
      //   {
      //     origin: userLatLng,
      //     destination: sucursalLatLng,
      //     travelMode: "DRIVING",
      //   },
      //   (response, status) => {
      //     if (status === "OK") {
      //       new google.maps.DirectionsRenderer({
      //         suppressMarkers: true,
      //         directions: response,
      //         map: map,
      //       });

      //       const output = document.getElementById("output");
      //       console.log(response.routes[0].legs[0].duration.text);
      //       for (let i = 0; i < sucursalesList.length; i++) {
      //         const sucursal = sucursalesList[i];
      //         output.innerHTML +=
      //           "<div class='alert-info'>From: " +
      //           userLatLng +
      //           ". <br />To: " +
      //           sucursal.latitude +
      //           ", " +
      //           sucursal.longitude +
      //           ". <br />Driving distance <i class='fas fa-road'></i> :" +
      //           sucursal.distancia.toFixed(2) +
      //           " meters. <br />Duration <i class='fas fa-hourglass-start'></i> :" +
      //           response.routes[0].legs[0].duration.text +
      //           " minutes.</div>";
      //       }
      //     }
      //   }
      // );
    }
  );
}
