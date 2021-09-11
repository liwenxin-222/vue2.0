<template>
  <div id="map"></div>
</template>

<script>
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import { XYZ, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import View from 'ol/View';
import { Style, Stroke, Fill, Text, Icon } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import Select from 'ol/interaction/Select';
import * as olExtent from 'ol/extent';

export default {
  name: 'MMap',
  props: {
    msg: String
  },
  mounted() {
    this.initMap();

    this.setMapLayer2d();
    // this.setMapLayerSatellite();
  },
  methods: {
    initMap() {
      // 天地图底图
      this.raster = new TileLayer({
        visible: false,
        source: new XYZ({
          url: 'https://t4.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6adf2a455c367f63b949c4f46ed86e36',
        }),
      });
      this.raster.layerName = 'tiandituLayer';
      this.raster.setVisible(false);

      // 标注图层
      this.raster1 = new TileLayer({
        source: new XYZ({
          url: 'https://t3.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=6adf2a455c367f63b949c4f46ed86e36',
        }),
      });
      this.raster1.layerName = 'tiandituMark';

      // 天地图卫星图像
      this.raster2 = new TileLayer({
        source: new XYZ({
          url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=6adf2a455c367f63b949c4f46ed86e36',
        }),
      });
      this.raster2.layerName = 'tiandituLayer';
      this.raster2.setVisible(false);

      this.layers = [this.raster, this.raster1, this.raster2];
      this.map = new Map({
        layers: this.layers,
        target: 'map',
        controls: [],
        view: new View({
          center: [116.676635, 39.895231],
          zoom: 12,
          projection: 'EPSG:4326',
        }),
      });

      this.elementDialog = new Overlay({
        element: this.$refs.popup, // 弹窗标签，在html里
        autoPan: true, // 如果弹窗在底图边缘时，底图会移动
        autoPanAnimation: {
          // 底图移动动画
          duration: 250,
        },
      });
      this.map.addOverlay(this.elementDialog);

      const selectSingleClick = new Select();
      this.map.addInteraction(selectSingleClick);
      selectSingleClick.on('select', this.selectFeature);

      const lays = 'xingdaoshu21,dikuai21';
      const rd = lays.split(',');

      return;

      for (let i = 0; i < rd.length; i++) {
        const l = new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON({
              geometryName: 'the_geom',
            }),
            url: 'http://47.92.28.118:8080/geoserver/tzyl/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=tzyl:' +
              rd[i] + '&outputFormat=application/json&srsname=EPSG:4326',
          }),
        });
        const styled = new Style({
          stroke: new Stroke({
            color: '#00CC00',
            width: 1,
          }),
          fill: new Fill({
            color: '#009966',
          }),
          text: new Text({
            text: '',
          }),
        });
        l.setStyle(styled);

        this.map.addLayer(l);
      }
    },
    hideMapLayer() {
      this.layers.forEach(layer => void layer.setVisible(false));
    },
    setMapLayer2d() {
      this.hideMapLayer();
      this.raster1.setVisible(true);
    },
    setMapLayerSatellite() {
      this.hideMapLayer();
      this.raster2.setVisible(true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
