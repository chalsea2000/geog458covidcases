mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    zoom: 3.2, // starting zoom
    center: [-100, 40], // starting center
    projection: 'albers'
}
);


map.on('load', () => {
map.addSource('us-covid-2020-rates', {
    type: 'geojson',
    data: 'assets/us-covid-2020-rates.geojson'
});

map.addLayer({
    'id': 'covid-layer',
    'type': 'fill',
    'source': 'us-covid-2020-rates',
    'paint': {
        'fill-color': [
            'step',
            ['get', 'rates'],
            '#FFEDA0',   // stop_output_0
            38,          // stop_input_0
            '#FED976',   // stop_output_1
            48,          // stop_input_1
            '#FEB24C',   // stop_output_2
            58,          // stop_input_2
            '#FD8D3C',   // stop_output_3
            65,         // stop_input_3
            '#FC4E2A',   // stop_output_4
            72,         // stop_input_4
            '#E31A1C',   // stop_output_5
            82,         // stop_input_5
            '#BD0026',   // stop_output_6
            95,        // stop_input_6
            "#800026"    // stop_output_7
        ],
        'fill-outline-color': '#BBBBBB',
        'fill-opacity': 0.7,
    }
});
});

const layers = [
    '0-37',
    '38-47',
    '48-57',
    '58-64',
    '65-71',
    '72-81',
    '82-94',
    '95 and more'
];
const colors = [
    '#FFEDA070',
    '#FED97670',
    '#FEB24C70',
    '#FD8D3C70',
    '#FC4E2A70',
    '#E31A1C70',
    '#BD002670',
    '#80002670'
];

const legend = document.getElementById('legend');
legend.innerHTML = "<b>Rates (in cases per thousand residents)</b><br><br>";

layers.forEach((layer, i) => {
const color = colors[i];
const item = document.createElement('div');
const key = document.createElement('span');
key.className = 'legend-key';
key.style.backgroundColor = color;

const value = document.createElement('span');
value.innerHTML = `${layer}`;
item.appendChild(key);
item.appendChild(value);
legend.appendChild(item);
});

legend.innerHTML =  legend.innerHTML + '<p style = "font-size:8pt">*Legend in Equal Quantile</p>';

map.on('mousemove', ({point}) => {
const state = map.queryRenderedFeatures(point, {
    layers: ['covid-layer']
});
document.getElementById('text-description').innerHTML = state.length ?
    `<h3>${state[0].properties.county}, ${state[0].properties.state}</h3><p><strong><em>${state[0].properties.rates}</strong> cases per thousand residents</em></p>` :
    `<p>Hover over a county!</p>`;
});