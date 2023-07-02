<template>
  <div id="map" style="height: 90vh; width: 100%;"></div>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 300px"
      title="Deseja iniciar uma trilha?"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div class="buttons">
        <n-button @click="confirmStartTrail(trilhaA, 'A')"> Trilha A </n-button>
        <n-button @click="confirmStartTrail(trilhaB, 'B')"> Trilha B </n-button>
        <n-button @click="showModal = false">Não</n-button>
      </div>
    </n-card>
  </n-modal>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-minimap/dist/Control.MiniMap.min.js";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";
import man from "@/assets/man.png";
import tashaBlack from "@/assets/taxablack.png";
import tashaViolet from "@/assets/tashaViolet.png";
import tashaRed from "@/assets/tacha.png";
import jardimBotanico from "@/assets/jardim-botanico.jpg";
import { NCard, NModal, NButton } from "naive-ui";

export default {
  components: {
    NModal,
    NButton,
    NCard,
  },
  data() {
    return {
      map: null,
      pontos: [],
      turist: null,
      trilhaCoordsA: [],
      trilhaCoordsB: [],
      trilhaA: [],
      trilhaB: [],
      currentIndex: 0,
      animationInterval: null,
      showModal: false,
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        "https://sheetdb.io/api/v1/jvyo4l3l29obu?sheet=pontos"
      );
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
      const zoom = 17;
      const map = L.map("map").setView([-29.718, -53.729359], zoom);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a>',
      }).addTo(map);

      const user = L.icon({
        iconUrl: man,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const tashaB = L.icon({
        iconUrl: tashaBlack,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const tashaR = L.icon({
        iconUrl: tashaRed,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const tashaV = L.icon({
        iconUrl: tashaViolet,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const pontosA = [];
      const pontosB = [];
      const pontosC = [];

      for (let i = 0; i < pontos.length; i++) {
        const customPopup = `
          <div class="customPopup">
            <h3>${pontos[i].nome}</h3>
            <img src="${jardimBotanico}" style="max-width: 100%; max-height: 200px;margin-top:10px; margin-bottom: 10px;">
            <p>${pontos[i].descricao}</p>
          </div>
        `;

        const customOptions = {
          minWidth: "200",
          keepInView: true,
        };

        if (pontos[i].categoria === "Edificações") {
          pontosA.push(
            L.marker([pontos[i].latitude, pontos[i].longitude], {
              icon: tashaB,
            }).bindPopup(customPopup, customOptions)
          );
          this.trilhaA.push({
            latitude: pontos[i].latitude,
            longitude: pontos[i].longitude,
          });
        } else if (pontos[i].categoria === "Coleções") {
          pontosB.push(
            L.marker([pontos[i].latitude, pontos[i].longitude], {
              icon: tashaV,
            }).bindPopup(customPopup, customOptions)
          );
          this.trilhaB.push({
            latitude: pontos[i].latitude,
            longitude: pontos[i].longitude,
          });
        } else if (pontos[i].categoria === "Espaço de lazer") {
          pontosC.push(
            L.marker([pontos[i].latitude, pontos[i].longitude], {
              icon: tashaR,
            }).bindPopup(customPopup, customOptions)
          );
        }
      }

      const edificios = L.layerGroup(pontosA);
      const colecao = L.layerGroup(pontosB);
      const lazer = L.layerGroup(pontosC);

      const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      });

      const baseMaps = {
        OpenStreetMap: osm,
      };

      osm.addTo(map);

      const overlayMaps = {
        Edificios: edificios,
        Coleções: colecao,
        Lazer: lazer,
      };

      const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

      edificios.addTo(map);
      colecao.addTo(map);
      lazer.addTo(map);

      const miniMapLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      });

      const miniMap = new L.Control.MiniMap(miniMapLayer, {
        toggleDisplay: true,
      }).addTo(map);

      const fullscreenControl = L.control.fullscreen();
      map.addControl(fullscreenControl);

      this.turist = L.marker([-29.7181, -53.730359], { icon: user })
        .on("click", () => {
          console.log("Iniciando trilha");
          this.showModal = true;
        })
        .addTo(map);

      this.trilhaCoordsA = this.trilhaA.map(
        ({ latitude, longitude }) => L.latLng(latitude, longitude)
      );
      this.trilhaCoordsB = this.trilhaB.map(
        ({ latitude, longitude }) => L.latLng(latitude, longitude)
      );

      const trilhaPolylineA = L.polyline([], { color: "red" });
      trilhaPolylineA.addTo(map);
      this.polylineA = trilhaPolylineA;

      const trilhaPolylineB = L.polyline([], { color: "blue" });
      trilhaPolylineB.addTo(map);
      this.polylineB = trilhaPolylineB;

      console.log(layerControl, miniMap);

      return map;
    },
    confirmStartTrail(trilha, letra) {
      this.letraL = letra;
      console.log(this.letraL);
      this.showModal = false;
      this.animateMarker(trilha);
    },
    animateMarker(trilha) {
      console.log(trilha);
      this.currentIndex = 0;
      const polylineCoords = [];
      const trilhaCoords = this.letraL === "A" ? this.trilhaCoordsA : this.trilhaCoordsB;
      const polyline = this.letraL === "A" ? this.polylineA : this.polylineB;

      this.animationInterval = setInterval(() => {
        polylineCoords.push(trilhaCoords[this.currentIndex]);
        polyline.setLatLngs(polylineCoords);

        this.turist.setLatLng(trilhaCoords[this.currentIndex]);

        this.currentIndex++;
        if (this.currentIndex >= trilhaCoords.length) {
          clearInterval(this.animationInterval);
          this.turist.setLatLng([-29.7181, -53.730359]);
          confirm("Trilha finalizada!");
        }
      }, 1000);
    },
  },
};
</script>
<style scoped>
.buttons {
  justify-content: space-between;
  display: flex;
  gap: 5px;
}

.customPopup img {
  display: block;
  max-width: 100%;
  max-height: 200px;
  margin-bottom: 10px;
}
</style>
