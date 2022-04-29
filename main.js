mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 2, // starting zoom
    center: [-100, 4] // starting center
});


map.on('load', () => {
    
    map.addSource('covidDData', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.geojson'
    });

    map.addLayer({
        'id': 'covid-rates',
        'type': 'fill',
        'source': 'covidData',
    });

});