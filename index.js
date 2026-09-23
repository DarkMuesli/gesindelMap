const addresses = [
    {
        "name": "Matze, Lucy",
        "city": "Remscheid",
        "postalcode": 42857,
    },
    {
        "name": "Jasmin",
        "city": "Bad Salzdetfurth",
    },
    {
        "name": "Toby-Wan",
        "city": "Wadersloh",
    },
    {
        "name": "Elria",
        "city": "Hamm",
    },
    {
        "name": "Malu",
        "city": "Moers",
    }
]

var element = document.getElementById('osm-map');
var raccoonIcon = L.icon({
    iconUrl: 'raccoon.png',

    iconSize: [100, 100], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
const map = L.map(element).setView([51.16, 10.45], 6); // roughly centered on Germany
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function buildQuery(addr) {
    let result = `https://nominatim.openstreetmap.org/search?country=germany&city=${addr.city}`
    if (addr.postalcode) result += `&postalcode=${addr.postalcode}`
    if (addr.street) result += `&street=${addr.street}`
    result += '&format=json'
    return result;
}

async function getCoords(addr) {
    const query = buildQuery(addr);
    const res = await fetch(query)
    const data = await res.json();
    if (!data.length) throw new Error("Address not found");

    return {lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon)};
}

const markers = []; // {name, marker}

async function addPins() {
    for (let addr of addresses) {
        const coords = await getCoords(addr)

        let tooltip = `${addr.name}<br>`
        if (addr.street) tooltip += `${addr.street}<br>`
        if (addr.postalcode) tooltip += `${addr.postalcode} `
        tooltip += `${addr.city}`

        const marker = L.marker([coords.lat, coords.lon], {icon: raccoonIcon}).addTo(map).bindPopup(tooltip);
        markers.push({name: addr.name, marker});
    }
}

function filterMarkers(query) {
    const q = query.trim().toLowerCase();
    for (const {name, marker} of markers) {
        const matches = q === '' || name.toLowerCase().includes(q);
        marker.setOpacity(matches ? 1 : 0.35);
    }
}

document.getElementById('search').addEventListener('input', (e) => {
    filterMarkers(e.target.value);
});

addPins()

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#search').value = '';
});
