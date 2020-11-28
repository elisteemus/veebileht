//Kaardi ja asukoha tähistuse kuvamiseks kasutatud js pärineb siit: https://developers.google.com/maps/documentation/javascript/adding-a-google-map#javascript

//Kaardi lähtestamine
function initMap() {
    //kohviku koordinaadid
    const kohvik = { lat: 59.441070, lng: 24.736325 };
    //kaart, keskkohaks on kohvik 
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      //kohviku asukoht on kaardi kuvamisel keskpunktiks
      center: kohvik, 
    });
    //kohviku asukoha tähistus
    const marker = new google.maps.Marker({
      position: kohvik, 
      map: map,
    });
  }