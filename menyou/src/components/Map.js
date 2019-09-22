import React from 'react';
import {Map} from '@esri/react-arcgis';
import {loadModules} from 'esri-loader'

const options = {version: 4.12}
const MyMap = (props) => {
  loadModules([
    'esri/views/MapView',
    'esri/Map',
    'esri/layers/FeatureLayer',
    'esri/widgets/Search',
    "esri/geometry/Polyline",
    "esri/geometry/Point",
    "esri/core/watchUtils",
    "esri/widgets/Sketch/SketchViewModel",
    "esri/Graphic",
    "esri/geometry/Extent",
  ]).then(([MapView, Map, FeatureLayer, Search,
    Polyline, Point, watchUtils, SketchViewModel,
    Extent, Graphic
  ]) => {

    let sketchViewModel, featureLayerView, featureLayerView1, pausableWatchHandle, chartExpand;

    const statDefinitionsSchools = [
      "ObjectId2",
    ].map(function(fieldName) {
      return {
        onStatisticField: fieldName,
        outStatisticFieldName: fieldName + "_TOTAL",
        statisticType: "count"
      };
    });

    const statDefinitionsParks = [
      "NAME",
    ].map(function(fieldName) {
      return {
        onStatisticField: fieldName,
        outStatisticFieldName: fieldName + "_TOTAL",
        statisticType: "count"
      };
    });

    let centerGraphic,
      edgeGraphic,
      polylineGraphic,
      bufferGraphic,
      centerGeometryAtStart,
      myExtent,
      labelGraphic;

    const unit = "kilometers";

    var map = new Map({
      basemap: 'topo-vector'
    });

    var polySym = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: [140, 140, 222, 0.5],
      outline: {
        color: [0, 0, 0, 0.5],
        width: 2
      }
    };

    var pointSym = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [255, 0, 0],
      outline: {
        color: [255, 255, 255],
        width: 1
      },
      size: 7
    };

    var view = new MapView({
      center: [ -112.4400, 33.4255 ],
      zoom: 14,
      container: 'viewDiv',
      map: map
    });
    const search = new Search({
      view: view,
      resultGraphicEnabled: false,
      popupEnabled: false
    });
    view.ui.add(search, "top-right");

    var schoolRenderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url:"https://i.imgur.com/64RIDz7.png",
        width: "24px",
        height: "24px"
      }
    }

    var libraryRenderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url:"https://i.imgur.com/4uk9NKY.png",
        width: "24px",
        height: "24px"
      }
    }


    var schoolPopup = {
      "title": "{NAME}",
      "content": "<b>Address: </b>{ADDRESS}<br/><b>County: </b>{COUNTY}<br/><b>Website: </b>{WEBSITE}<br/><b>Phone: </b>{TELEPHONE}"
    }

    var parkPopup = {
      "title":"{NAME}",
      "content":"<b>Type:</b> {FCC}<br/><b>Square Miles:</b> {SQMI}"
    }

    var libraryPopup = {
      "title":"{LIBNAME}",
      "content":"<b>Address: </b>{ADDRESS}<br/><b>Weeks Open:</b> {WKS_OPEN}<br/><b>Hours: </b>{HOURS}"
    }

    var schoolLayer = new FeatureLayer({
      url: 'https://services7.arcgis.com/1Q2JactmDiGmRn7Q/arcgis/rest/services/PublicSchools_0/FeatureServer/0?token=ZSFHSOncScL5Si_MsRUp139MP8wGQO1hlv1yHjdjXDBKqmQjrKZ1vLI1GZCpxU7JfD9l3NcWxwQZioE1aLrRQ4IENltQ--Dq9RpbpG_joxrkqZ22RjHRNJ79RbTwDwHAFX7jjIVN-eJJEAuuH61xFehKP2xwMpgF2WcMkTLZgkHd3m8eaEClAiNJZrCOqHBez2BlT4Lm98rmoU-d22f_u3zKKNj5ckdJHV3OQL26VaJdEsVQQ3w6DyYYtMwNamWc',
      renderer: schoolRenderer,
      outField:["NAME", "ADDRESS", "COUNTY", "WEBSITE", "TELEPHONE"],
      popupTemplate: schoolPopup
    });

    var parkLayer = new FeatureLayer({
      url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Parks/FeatureServer/0',
      opacity: 0.4,
      outField:["NAME","FCC","FID","SQMI"],
      popupTemplate: parkPopup,

    });

    var libraryLayer = new FeatureLayer({
      url: 'https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/Enriched%20PLS_FY2016_Outlet_puout16a/FeatureServer/0',
      renderer: libraryRenderer,
      outField:["ADDRESS", "CITY", "WKS_OPEN","HOURS"],
      popupTemplate: libraryPopup
    });

    map.add(schoolLayer,0);
    map.add(libraryLayer,0);
    map.add(parkLayer,0);

    setupSchool()
    function setupSchool() {
      view.whenLayerView(schoolLayer).then(function(layerView) {
        featureLayerView = layerView;
        pausableWatchHandle = watchUtils.pausable(
          layerView,
          "updating",
          function(val) {
            if (!val) {
              drawBufferPolygonSchool();
            }
          }
        );
      });
      view.when(function() {
        // Display the chart in an Expand widget
        search.on("search-complete", function() {
          console.log('here')
          pausableWatchHandle.resume();
        });
      });
    }

    function setupPark() {
      view.whenLayerView(parkLayer).then(function(layerView) {
        featureLayerView1 = layerView;
        pausableWatchHandle = watchUtils.pausable(
          layerView,
          "updating",
          function(val) {
            if (!val) {
              drawBufferPolygonPark();
            }
          }
        );
      });

      view.when(function() {
        // Display the chart in an Expand widget
        search.on("search-complete", function() {
          console.log('here')
          pausableWatchHandle.resume();
        });
      });
    }


    function querySchools() {
      // Data storage for the chart
      let schoolCount = 0;

      // Client-side spatial query:
      // Get a sum of age groups for census tracts that intersect the polygon buffer
      const query = featureLayerView.layer.createQuery();
      query.geometry = myExtent;
      query.outStatistics = statDefinitionsSchools;

      // Query the features on the client using FeatureLayerView.queryFeatures
      return featureLayerView
        .queryFeatures(query)
        .then(function(results) {
          const attributes = results.features[0].attributes;
          for (var key in attributes) {
            schoolCount = (attributes[key])
          }
          return schoolCount;
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function queryParks() {
      // Data storage for the chart
      let parkCount = 0;

      // Client-side spatial query:
      // Get a sum of age groups for census tracts that intersect the polygon buffer
      const query = featureLayerView1.layer.createQuery();
      query.geometry = myExtent;
      // query.outStatistics = statDefinitionsParks;

      // Query the features on the client using FeatureLayerView.queryFeatures
      return featureLayerView
        .queryFeatures(query)
        .then(function(results) {
          console.log(results)
          const attributes = results.features[0].attributes;
          for (var key in attributes) {
            parkCount = (attributes[key])
          }
          return parkCount;
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    function drawBufferPolygonSchool() {
      // When pause() is called on the watch handle, the callback represented by the
      // watch is no longer invoked, but is still available for later use
      // this watch handle will be resumed when user searches for a new location
      pausableWatchHandle.pause();

      // Initial location for the center, edge and polylines on the view
      const viewCenter = view.center.clone();
      const centerScreenPoint = view.toScreen(viewCenter);
      const centerPoint = view.toMap({
        x: centerScreenPoint.x,
        y: centerScreenPoint.y
      });
      var minx = centerPoint.x
      var miny = centerPoint.y
      var maxx = centerPoint.x
      var maxy = centerPoint.y
      myExtent = new Extent({
        xmin: minx,
        ymin: miny,
        xmax: maxx,
        ymax: maxy})

      // Create center, edge, polyline and buffer graphics for the first time
      var schoolCount = querySchools().then(function(results) {
        console.log(results)
        props.saveSchools(results, centerPoint.x, centerPoint.y)
      })

    }

    function drawBufferPolygonPark() {
      // When pause() is called on the watch handle, the callback represented by the
      // watch is no longer invoked, but is still available for later use
      // this watch handle will be resumed when user searches for a new location
      pausableWatchHandle.pause();

      // Initial location for the center, edge and polylines on the view
      const viewCenter = view.center.clone();
      const centerScreenPoint = view.toScreen(viewCenter);
      const centerPoint = view.toMap({
        x: centerScreenPoint.x,
        y: centerScreenPoint.y
      });
      console.log(centerPoint.x,centerPoint.y)
      var minx = centerPoint.x
      var miny = centerPoint.y
      var maxx = centerPoint.x
      var maxy = centerPoint.y
      myExtent = new Extent({
        xmin: minx,
        ymin: miny,
        xmax: maxx,
        ymax: maxy})

      var parkCount = queryParks().then(function(results) {
        console.log(results)
        props.saveParks(results)
      })
    }


  });
  return(
    <div id="viewDiv"> </div>
  )
}
export default MyMap;
