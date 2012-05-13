var gMapThumbExample = {};
(function ($) {
    var map, map2;
    function loadScript(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    }
    loadScript('http://maps.google.com/maps/api/js?sensor=false&callback=gMapThumbExample.mapLoaded');
    gMapThumbExample.mapLoaded = function () {
        var mapOptions = {
            zoom: 19,
            center: new google.maps.LatLng(34.0796167, -118.2585096),
            mapTypeId: 'hybrid'
        };
        map = new google.maps.Map($('#map')[0], mapOptions);
        map2 = new google.maps.Map($('#map2')[0], mapOptions);
        map2.setCenter(new google.maps.LatLng(30.3375956, -97.7892168))
        $('#map,#map2').gmapthumb([map,map2]);
    }
}(jQuery));