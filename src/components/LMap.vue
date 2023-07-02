<!-- 
<template>
  <div id="map" style="height: 90vh; width: 100%;"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-minimap/dist/Control.MiniMap.min.js";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";
import man from "@/assets/man.png";

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
    createMap(pontos) {
      const zoom = 20;
      const markerIconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
      const markerIconRetinaUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";

      const map = L.map("map").setView([-29.718000, -53.729359], zoom);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a>'
      }).addTo(map);

      const littletonIcon = L.icon({
        iconUrl: markerIconUrl,
        iconRetinaUrl: markerIconRetinaUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });

      const user = L.icon({
        iconUrl: man,
        iconRetinaUrl: markerIconRetinaUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });

      const pontosA = [];
      const pontosB = [];
      const pontosC = [];
      const trilha = [];

      for (let i = 0; i < pontos.length; i++) {
        const customPopup = `
          <div class="customPopup">
            <h3>${pontos[i].nome}</h3>
            <p>${pontos[i].descricao}</p>
          </div>
        `;

        const customOptions = {
          minWidth: "150",
          keepInView: true,
        };

        if (pontos[i].categoria == "Edificações") {
          pontosA.push(L.marker([pontos[i].latitude, pontos[i].longitude], { icon: littletonIcon }).bindPopup(customPopup, customOptions));
          trilha.push({
            latitude: pontos[i].latitude,
            longitude: pontos[i].longitude,
          });
        } else if (pontos[i].categoria == "Coleções") {
          pontosB.push(L.marker([pontos[i].latitude, pontos[i].longitude], { icon: littletonIcon }).bindPopup(customPopup, customOptions));
        } else if (pontos[i].categoria == "Espaço de lazer") {
          pontosC.push(L.marker([pontos[i].latitude, pontos[i].longitude], { icon: littletonIcon }).bindPopup(customPopup, customOptions));
        }
      }

      const edificios = L.layerGroup(pontosA);
      const colecao = L.layerGroup(pontosB);
      const lazer = L.layerGroup(pontosC);

      const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      });

      const baseMaps = {
        "OpenStreetMap": osm,
      };

      const overlayMaps = {
        "Edificios": edificios,
        "Coleções": colecao,
        "Lazer": lazer
      };

      const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

      edificios.addTo(map);
      colecao.addTo(map);
      lazer.addTo(map);

      const miniMapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      });

      const miniMap = new L.Control.MiniMap(miniMapLayer, { toggleDisplay: true }).addTo(map);

      const fullscreenControl = L.control.fullscreen();
      map.addControl(fullscreenControl);

      const turist = L.marker([-29.718100, -53.730359], { icon: user })
        .on("click", () => {
          console.log("Iniciando trilha")
          animateMarker()
        })
        .addTo(map);

      const trilhaCoords = trilha.map(({ latitude, longitude }) => L.latLng(latitude, longitude));
      let currentIndex = 0;

      function animateMarker() {
        turist.setLatLng(trilhaCoords[currentIndex]);

        currentIndex++;
        if (currentIndex < trilhaCoords.length) {
          setTimeout(animateMarker, 1000);
        }
      }

      console.log(miniMap, layerControl)
      return map;
    },
  },
};
</script> -->
<template>
  <div id="map" style="height: 90vh; width: 100%;"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-minimap/dist/Control.MiniMap.min.js";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";
import man from "@/assets/man.png";

export default {
  data() {
    return {
      map: null,
      layer: null,
      pontos: [],
      turist: null,
      trilhaCoords: [],
      currentIndex: 0,
      polygon: null,
      animationInterval: null,
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
    createMap(pontos) {
      const zoom = 20;
      const markerIconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
      const markerIconRetinaUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";

      const map = L.map("map").setView([-29.718000, -53.729359], zoom);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a>'
      }).addTo(map);

      const littletonIcon = L.icon({
        iconUrl: markerIconUrl,
        iconRetinaUrl: markerIconRetinaUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });

      const user = L.icon({
        iconUrl: man,
        iconRetinaUrl: markerIconRetinaUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });

      const pontosA = [];
      const pontosB = [];
      const pontosC = [];
      const trilha = [];

      for (let i = 0; i < pontos.length; i++) {
        const customPopup = `
          <div class="customPopup">
            <h3>${pontos[i].nome}</h3>
            <p>${pontos[i].descricao}</p>
          </div>
        `;

        const customOptions = {
          minWidth: "150",
          keepInView: true,
        };

        if (pontos[i].categoria == "Edificações") {
          pontosA.push(L.marker([pontos[i].latitude, pontos[i].longitude], { icon: littletonIcon }).bindPopup(customPopup, customOptions));
          trilha.push({
            latitude: pontos[i].latitude,
            longitude: pontos[i].longitude,
          });
        } else if (pontos[i].categoria == "Coleções") {
          pontosB.push(L.marker([pontos[i].latitude, pontos[i].longitude], { icon: littletonIcon }).bindPopup(customPopup, customOptions));
        } else if (pontos[i].categoria == "Espaço de lazer") {
          pontosC.push(L.marker([pontos[i].latitude, pontos[i].longitude], { icon: littletonIcon }).bindPopup(customPopup, customOptions));
        }
      }

      const edificios = L.layerGroup(pontosA);
      const colecao = L.layerGroup(pontosB);
      const lazer = L.layerGroup(pontosC);

      const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      });

      const baseMaps = {
        "OpenStreetMap": osm,
      };

      const overlayMaps = {
        "Edificios": edificios,
        "Coleções": colecao,
        "Lazer": lazer
      };

      const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

      edificios.addTo(map);
      colecao.addTo(map);
      lazer.addTo(map);

      const miniMapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      });

      const miniMap = new L.Control.MiniMap(miniMapLayer, { toggleDisplay: true }).addTo(map);

      const fullscreenControl = L.control.fullscreen();
      map.addControl(fullscreenControl);

      this.turist = L.marker([-29.718100, -53.730359], { icon: user })
        .on("click", () => {
          console.log("Iniciando trilha");
          this.animateMarker();
          this.drawPolygon();
        })
        .addTo(map);

      this.trilhaCoords = trilha.map(({ latitude, longitude }) => L.latLng(latitude, longitude));

      console.log(miniMap, layerControl);
      return map;
    },
    animateMarker() {
      this.currentIndex = 0;
      this.animationInterval = setInterval(() => {
        this.turist.setLatLng(this.trilhaCoords[this.currentIndex]);

        this.currentIndex++;
        if (this.currentIndex >= this.trilhaCoords.length) {
          clearInterval(this.animationInterval);
        }
      }, 1000);
    },
    drawPolygon() {
      const latLngs = this.trilhaCoords.slice(0, this.currentIndex);
      if (this.polygon) {
        this.map.removeLayer(this.polygon);
      }
      this.polygon = L.polygon(latLngs, { color: 'blue', weight: 3, fill: false }).addTo(this.map);
    },
  },
};
</script>
