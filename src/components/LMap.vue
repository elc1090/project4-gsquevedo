<template>
  <div id="map" style="height: 90vh; width: 100%;"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-minimap/dist/Control.MiniMap.min.js';
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";

export default {
  data() {
    return {
      map: null,
      layer: null,
      edificios: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch("https://sheetdb.io/api/v1/jvyo4l3l29obu?sheet=pontos");
      if (!response.ok) {
        throw new Error("Erro ao obter os dados da API");
      }
      const data = await response.json();
      this.pontos = data;
      this.map = this.createMap(this.pontos);
    } catch (error) {
      console.error(error);
    }

  },
  methods: {
    createMap(pontos){
      const zoom = 20
      var markerIconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
      var markerIconRetinaUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";

      const map = L.map("map").setView([-29.718000, -53.729359], zoom);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a>'
      }).addTo(map);

      // ícone dos marcadores
      var littletonIcon = L.icon({
        iconUrl: markerIconUrl,
        iconRetinaUrl: markerIconRetinaUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });

      let pontosA = [];
      let pontosB = [];
      let pontosC = [];

      for(let i=0;i<pontos.length;i++){
        const customPopup =
          `<div class="customPopup">
            <h3>${pontos[i].nome}</h3>
            <p>${pontos[i].descricao}</p>
          </div>`;

        const customOptions = {
          minWidth: "150",
          keepInView: true,
        };

        if(pontos[i].categoria=='Edificações'){
          pontosA.push(L.marker([pontos[i].latitude, pontos[i].longitude], { icon: littletonIcon }).bindPopup(customPopup, customOptions))
        }else if(pontos[i].categoria=='Coleções'){
          pontosB.push(L.marker([pontos[i].latitude, pontos[i].longitude], { icon: littletonIcon }).bindPopup(customPopup, customOptions))
        }else if(pontos[i].categoria=='Espaço de lazer'){
          pontosC.push(L.marker([pontos[i].latitude, pontos[i].longitude], { icon: littletonIcon }).bindPopup(customPopup, customOptions))
        }
      }

      var edificios = L.layerGroup(pontosA);
      var colecao = L.layerGroup(pontosB);
      var lazer = L.layerGroup(pontosC);

      var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      });

      var baseMaps = {
        "OpenStreetMap": osm,
      };

      var overlayMaps = {
        "Edificios": edificios,
        "Coleções": colecao,
        "Lazer": lazer
      };

      var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
      console.log(layerControl)
      
      edificios.addTo(map);
      colecao.addTo(map);
      lazer.addTo(map);

      const miniMapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      });

      const miniMap = new L.Control.MiniMap(miniMapLayer, { toggleDisplay: true }).addTo(map);
      console.log(miniMap)
      const fullscreenControl = L.control.fullscreen();
      map.addControl(fullscreenControl);

      return map;
    }
  }
};
</script>