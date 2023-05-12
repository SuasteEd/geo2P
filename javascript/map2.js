const urlParams = new URLSearchParams(window.location.search);
const latitud = urlParams.get("latitud");
const longitud = urlParams.get("longitud");
const nombre = urlParams.get("name");

if (latitud && longitud) {
  const userLatLng = new google.maps.LatLng(latitud, longitud);

  // Obtenemos los datos de la sucursal desde el servidor
  fetch("http://172.18.70.94:4001/api/branches/all")
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
        const tiempo = (distancia / 1000 / 30) * 60;
        return { ...sucursal, distancia, tiempo };
      });

      // Ordenar las sucursales por tiempo de menor a mayor
      sucursales.sort((a, b) => a.distancia - b.distancia);

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

      // Mostrar la información de las sucursales en la lista
      const output = document.querySelector("#output");
      output.innerHTML +=
        "<div class='wlc'>Hola " +
        nombre +
        " tu tienda más cercana es " +
        sucursalMasCercana.name +
        "</div><br />";
      for (let i = 0; i < sucursales.length; i++) {
        const sucursal = sucursales[i];
        output.innerHTML +=
          "<div class='alert-info'>Desde tu ubicación " +
          " a " +
          sucursal.name +
          "<br /> Distancia en auto<i class='fas fa-road'></i> :" +
          sucursal.distancia.toFixed(2) +
          " metros. <br />Duración<i class='fas fa-hourglass-start'></i> : " +
          sucursal.tiempo.toFixed(0) +
          " minutes.</div>" +
          "<br />";
      }

      // Calcular la ruta desde la ubicación del usuario hasta la sucursal más cercana
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLatLng,
          destination: sucursalLatLng,
          travelMode: "DRIVING",
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
        fetch("http://172.18.70.160:4001/api/branches/all")
          .then((response) => response.json())
          .then((data) => {
            // Calcular la distancia y tiempo entre la ubicación del usuario y cada sucursal
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
              const tiempo = (distancia / 1000 / 30) * 60; // Suponiendo una velocidad promedio de 40 km/h y convirtiendo a minutos
              return { ...sucursal, distancia, tiempo };
            });

            // Ordenar las sucursales por tiempo de menor a mayor
            sucursales.sort((a, b) => a.distancia - b.distancia);

            // Mostrar la información de las sucursales en la lista
            const output = document.querySelector("#output");
            output.innerHTML +=
            "<div class='wlc'>Hola " +
            nombre +
            " tu tienda más cercana es :" +
            "</div><br />";
            for (let i = 0; i < sucursales.length; i++) {
              const sucursal = sucursales[i];
              output.innerHTML +=
                "<div class='alert-info'>Desde tu ubicación " +
                " a " +
                sucursal.name +
                "<br /> Distancia en auto<i class='fas fa-road'></i> :" +
                sucursal.distancia.toFixed(2) +
                " metros. <br />Duración<i class='fas fa-hourglass-start'></i> : " +
                sucursal.tiempo.toFixed(0) +
                " minutes.</div>" +
                "<br />";
            }

            // Mostrar la información de la sucursal más cercana en el mapa
            const sucursalMasCercana = sucursales[0];
            const map = new google.maps.Map(document.getElementById("map"), {
              center: userLatLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
            });
            const userMarker = new google.maps.Marker({
              position: userLatLng,
              map: map,
              title: "Tu ubicación actual",
            });
            const directionsService = new google.maps.DirectionsService();
            directionsService.route(
              {
                origin: userLatLng,
                destination: new google.maps.LatLng(
                  sucursalMasCercana.latitude,
                  sucursalMasCercana.longitude
                ),
                travelMode: "DRIVING",
              },
              (response, status) => {
                if (status === "OK") {
                  new google.maps.DirectionsRenderer({
                    suppressMarkers: true,
                    directions: response,
                    map: map,
                  });
                  const sucursalMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(
                      sucursalMasCercana.latitude,
                      sucursalMasCercana.longitude
                    ),
                    map: map,
                    title: sucursalMasCercana.name,
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
