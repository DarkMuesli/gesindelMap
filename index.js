console.log('Happy developing ✨')
// Where you want to render the map.
var element = document.getElementById('osm-map');

const map = L.map(element).setView([51.16, 10.45], 6); // roughly centered on Germany
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([51.1707612, 7.1820499]).addTo(map).bindPopup('mapfe')
