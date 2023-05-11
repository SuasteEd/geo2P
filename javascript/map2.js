// const urlParams = new URLSearchParams(window.location.search);
// const latitud = urlParams.get("latitud");
// const longitud = urlParams.get("longitud");
// const nombre = urlParams.get("nombre");

// if (!latitud  && !longitud) {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const userLat = position.coords.latitude;
//             const userLong = position.coords.longitude;
//             const userLatLng = new google.maps.LatLng(userLat, userLong);

//             // Obtenemos los datos de las sucursales desde el servidor
//             fetch("http://192.168.1.101:4001/api/branches/all")
//               .then((response) => response.json())
//               .then((sucursales) => {

//                 // Calcular la distancia entre cada sucursal y la ubicación del usuario
//                 sucursales.forEach(function (sucursal) {
//                   var distancia = google.maps.geometry.spherical.computeDistanceBetween(
//                     userLatLng,
//                     new google.maps.LatLng(sucursal.latitud, sucursal.longitud)
//                   );

//                   sucursal.distancia = distancia;
//                 });

//                 // Ordenar la lista de sucursales por distancia
//                 sucursales.sort(function (a, b) {
//                   return a.distancia - b.distancia;
//                 });

//                 // Obtener la sucursal más cercana
//                 const sucursalMasCercana = sucursales[0];

//                 // Crear el objeto LatLng correspondiente a la ubicación de la sucursal
//                 const sucursalLatLng = new google.maps.LatLng(
//                   sucursalMasCercana.latitud,
//                   sucursalMasCercana.longitud
//                 );

//                 // Crear el mapa y centrarlo en la ubicación del usuario
//                 const map = new google.maps.Map(document.getElementById("map"), {
//                   center: userLatLng,
//                   zoom: 15,
//                   mapTypeId: google.maps.MapTypeId.ROADMAP,
//                 });

//                 // Crear marcadores y agregarlos al mapa
//                 const userMarker = new google.maps.Marker({
//                   position: userLatLng,
//                   map: map,
//                   title: "Tu ubicación actual",
//                 });

//                 const sucursalMarker = new google.maps.Marker({
//                   position: sucursalLatLng,
//                   map: map,
//                   title: sucursalMasCercana.nombre,
//                 });

//                 // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
//                 const directionsService = new google.maps.DirectionsService();
//                 directionsService.route(
//                   {
//                     origin: userLatLng,
//                     destination: sucursalLatLng,
//                     travelMode: "DRIVING",
//                   },
//                   (response, status) => {
//                     if (status === "OK") {
//                       new google.maps.DirectionsRenderer({
//                         suppressMarkers: true,
//                         directions: response,
//                         map: map,
//                       });
//                     }
//                   }
//                 );
//               })
//               .catch((error) => {
//                 console.error("Error:", error);
//                 alert("No se pudo obtener la ubicación de la sucursal");
//               });
//           },
//           () => {
//             // Si el usuario no otorga permiso para acceder a su ubicación, mostrar un mensaje de error
//             alert("No se pudo obtener tu ubicación actual");
//           }
//         );
//       } else {
//         // Si el navegador no admite la geolocalización, mostrar un mensaje de error
//         alert("Tu navegador no admite la geolocalización");
//       }

// } else {

// }

const urlParams = new URLSearchParams(window.location.search);
const latitud = urlParams.get("latitud");
const longitud = urlParams.get("longitud");
const nombre = urlParams.get("nombre");

if (latitud && longitud) {
  const userLatLng = new google.maps.LatLng(latitud, longitud);

  // Obtenemos los datos de la sucursal desde el servidor
  fetch("http://192.168.18.10:4001/api/branches/all")
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
      });

      // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLatLng,
          destination: sucursalLatLng,
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
    });
} else {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLong = position.coords.longitude;
        const userLatLng = new google.maps.LatLng(userLat, userLong);

        // Obtenemos los datos de la sucursal desde el servidor
        fetch("http://192.168.18.10:4001/api/branches/all")
          .then((response) => response.json())
          .then((data) => {
            // Calcular la distancia entre la ubicación del usuario y cada sucursal
            const sucursales = data.map((sucursal) => {
              const sucursalLatLng = new google.maps.LatLng(
                sucursal.latitude,
                sucursal.longitude
              );
              const distancia =
                google.maps.geometry.spherical.computeDistanceBetween(
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
            });

            // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
            const directionsService = new google.maps.DirectionsService();
            directionsService.route(
              {
                origin: userLatLng,
                destination: sucursalLatLng,
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
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("No se pudo obtener la ubicación de la sucursal");
          });
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
}
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const userLat = position.coords.latitude;
//       const userLong = position.coords.longitude;
//       const userLatLng = new google.maps.LatLng(userLat, userLong);

//       // Obtenemos los datos de las sucursales desde el servidor
//       fetch("http://192.168.1.101:4001/api/branches/all")
//         .then((response) => response.json())
//         .then((data) => {
//           // Agregamos la distancia a cada sucursal
//           const sucursales = data.map((sucursal) => {
//             const sucursalLatLng = new google.maps.LatLng(
//               sucursal.latitude,
//               sucursal.longitude
//             );
//             const distancia =
//               google.maps.geometry.spherical.computeDistanceBetween(
//                 userLatLng,
//                 sucursalLatLng
//               );
//             return {
//               ...sucursal,
//               distancia,
//             };
//           });

//           // Ordenamos las sucursales por distancia
//           const sucursalesOrdenadas = sucursales.sort(
//             (a, b) => a.distancia - b.distancia
//           );

//           // Creamos el objeto LatLng correspondiente a la ubicación de la sucursal más cercana
//           const sucursalMasCercanaLatLng = new google.maps.LatLng(
//             sucursalesOrdenadas[0].latitude,
//             sucursalesOrdenadas[0].longitude
//           );

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
//             position: sucursalMasCercanaLatLng,
//             map: map,
//             title: sucursalesOrdenadas[0].name,
//           });

//           // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
//           const directionsService = new google.maps.DirectionsService();
//           directionsService.route(
//             {
//               origin: userLatLng,
//               destination: sucursalMasCercanaLatLng,
//               travelMode: "WALKING",
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

//           // Agregamos la lista de sucursales ordenadas por distancia
//           const sucursalesList = document.getElementById("sucursales-list");
//           sucursalesOrdenadas.forEach((sucursal) => {
//             const sucursalItem = document.createElement("li");
//             sucursalItem.textContent = `${sucursal.name} - ${sucursal.distancia} metros`;
//             sucursalesList.appendChild(sucursalItem);
//           });
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           alert("No se pudo obtener la ubicación de las sucursales");
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
