console.log('Happy developing ✨')
// Where you want to render the map.
var element = document.getElementById('osm-map');

var raccoonIcon = L.icon({
    iconUrl: 'raccoon.png',

    iconSize:     [100, 100], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const map = L.map(element).setView([51.16, 10.45], 6); // roughly centered on Germany
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const addressString = "Thomasstraße 1<br>42857 Remscheid"
L.marker([51.1707612, 7.1820499], {icon: raccoonIcon}).addTo(map).bindPopup('Mapfe<br>' + addressString);
