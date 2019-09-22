import React from 'react';
import {Map} from '@esri/react-arcgis';
import {loadModules} from 'esri-loader'
const makemap = (props) => {
  loadModules(['esri/views/MapView', 'esri/Map', 'esri/layers/FeatureLayer']).then(([MapView, Map, FeatureLayer]) => {
    var map = new Map({
      basemap: 'topo-vector'
    });

    var view = new MapView({
      center: [ -121.9896, 47.1704],
      zoom: 8,
      container: 'viewDiv',
      map: map
    });

    var schoolLayer = new FeatureLayer({
      url: 'https://services7.arcgis.com/1Q2JactmDiGmRn7Q/arcgis/rest/services/PublicSchools_0/FeatureServer/0?token=ZSFHSOncScL5Si_MsRUp139MP8wGQO1hlv1yHjdjXDBKqmQjrKZ1vLI1GZCpxU7JfD9l3NcWxwQZioE1aLrRQ4IENltQ--Dq9RpbpG_joxrkqZ22RjHRNJ79RbTwDwHAFX7jjIVN-eJJEAuuH61xFehKP2xwMpgF2WcMkTLZgkHd3m8eaEClAiNJZrCOqHBez2BlT4Lm98rmoU-d22f_u3zKKNj5ckdJHV3OQL26VaJdEsVQQ3w6DyYYtMwNamWc'
    });

    var parkLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Parks/FeatureServer/0'
    })

    var libraryLayer = new FeatureLayer({
      url: 'https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Enriched%20PLS_FY2016_Outlet_puout16a/FeatureServer/0'
    })

    map.add(schoolLayer,0);
    map.add(libraryLayer,0);
    map.add(parkLayer,0);
  });
  return(
    <div id="viewDiv"> </div>
  )
}
export default makemap;
