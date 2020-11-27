function initMap() {
    const kohvik = { lat: 59.441070, lng: 24.736325 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: kohvik,
    });
    const marker = new google.maps.Marker({
      position: kohvik,
      map: map,
    });
  }