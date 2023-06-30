<template>
  <div>
    <div class="search-bar">
      <n-space vertical>
        <n-input v-model:value="searchTerm" type="text" placeholder="Pesquisar fotos">
          <template #suffix>
            <n-icon size="15"><search-sharp/></n-icon>
          </template>
        </n-input>
      </n-space>
    </div>
    <div class="card-container">
      <n-card title="">
        <n-tabs type="line" animated v-model:selectedTab="selectedTab">
          <n-tab-pane v-for="(tab, index) in tabs" :key="index" :name="tab.name" :tab="tab.tab">
            <div class="photo-wall">
              <div v-if="filteredPhotosByTab(tab).length === 0">
                <div class="no-photos">Não há fotos</div>
              </div>
              <div v-else v-for="(photo, index) in filteredPhotosByTab(tab)" :key="index" class="photo">
                <img :src="photo.url" :alt="photo.categoria" class="photo-image" />
                <div class="photo-caption">{{ photo.categoria }}</div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script>
import { NInput, NIcon, NCard, NTabs, NTabPane, NSpace } from 'naive-ui'
import { SearchSharp } from '@vicons/ionicons5';
import { ref } from 'vue'

export default {
  components: {
    NCard,
    NTabs,
    NTabPane,
    NIcon,
    SearchSharp,
    NInput,
    NSpace,
  },
  data() {
    const photos = ref([{ categoria: '', url: ''}])

    return {
      isLoading: true,
      searchTerm: '', // Termo de pesquisa
      selectedTab: 'Todas as fotos',
      tabs: [
        { name: 'Todas as fotos', tab: 'Todas' },
        { name: 'Flora', tab: 'Flora' },
        { name: 'Paisagens', tab: 'Paisagem' },
        { name: 'Arvores', tab: 'Árvores' },
      ],
      photos
    };
  },
  computed: {
    filteredPhotos() {
      // Filtra as fotos com base no termo de pesquisa
      if (!this.searchTerm) {
        return this.photos;
      }
      const searchTermLower = this.searchTerm.toLowerCase();
      return this.photos.filter(photo =>
        photo.categoria.toLowerCase().includes(searchTermLower)
      );
    },
  },
  methods: {
    filteredPhotosByTab(tab) {
      const filteredPhotos = this.filteredPhotos;
      if (tab.name === 'Todas as fotos') {
        return filteredPhotos;
      } else {
        return filteredPhotos.filter(photo => photo.categoria === tab.name);
      }
    },
  },
  async mounted() {
    // try {
    //   const response = await fetch("https://sheetdb.io/api/v1/jvyo4l3l29obu?sheet=fotos");
    //   if (!response.ok) {
    //     throw new Error("Erro ao obter os dados da API");
    //   }
    //   const data = await response.json();
    //   this.photos = data;
    //   setTimeout(() => {
    //     this.isLoading = false;
    //   }, 2000);
    //   this.map = this.createMap(this.pontos);
    // } catch (error) {
    //   console.error(error);
    // }
  },
};
</script>


<style scoped>

.photo-wall {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px;
}

.search-bar {
  margin: 20px;
  width: auto;
  height: auto;
}

.photo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.photo-caption {
  margin-top: 10px;
  text-align: center;
}

.no-photos {
  display: flex;
  padding: 40px;
  height: 100vh;
  font-size: 20px;
  color: black;
}
</style>
