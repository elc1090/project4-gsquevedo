<template>
  <div>
    <div class="pontos-controls">
      <div class="controls">
        <label for="sort">Ordenar por:</label>
        <select id="sort" v-model="sortOption">
          <option value="nome">Nome</option>
          <option value="data">Data</option>
          <option value="popularidade">Popularidade</option>
        </select>
      </div>
    </div>

    <ul class="pontos-list">
      <li v-for="ponto in pontosOrdenados" :key="ponto.id" class="ponto-item">
        <img :src="ponto.imagem" :alt="ponto.nome" class="ponto-imagem" />
        <div class="ponto-content">
          <h2 class="ponto-titulo">{{ ponto.nome }}</h2>
          <div class="ponto-descricao">{{ ponto.descricao }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import photo1 from '@/assets/photo2.jpg'

export default {
  data() {
    return {
      pontos: [
        {
          id: 1,
          nome: 'Ponto A',
          descricao: 'Este ponto turístico é conhecido por sua impressionante arquitetura e história fascinante. Localizado no coração da cidade, o Ponto A atrai visitantes de todo o mundo. Explore os corredores majestosos, maravilhe-se com os detalhes intricados e aprenda sobre as lendas e mitos que cercam esse lugar icônico.',
          imagem: photo1,
          data: '2023-06-26',
          popularidade: 10
        },
        {
          id: 2,
          nome: 'Ponto B',
          descricao: 'Descubra a beleza natural do Ponto B, um local deslumbrante com vistas panorâmicas de tirar o fôlego. Caminhe por trilhas pitorescas, passeie por jardins exuberantes e aproveite a tranquilidade da natureza. Com sua atmosfera serena e paisagens deslumbrantes, o Ponto B é um refúgio perfeito para os amantes da natureza.',
          imagem: photo1,
          data: '2023-06-27',
          popularidade: 8
        },
        {
          id: 3,
          nome: 'Ponto C',
          descricao: 'O Ponto C é um lugar mágico cheio de cultura e tradições. Explore as ruas estreitas repletas de lojas encantadoras, experimente a culinária local e mergulhe na rica história desse ponto turístico. Com festivais vibrantes e eventos culturais ao longo do ano, o Ponto C oferece uma experiência única e inesquecível aos visitantes.',
          imagem: photo1,
          data: '2023-02-27',
          popularidade: 10
        },
        {
          id: 4,
          nome: 'Ponto D',
          descricao: 'O Ponto D é um local histórico que remonta a séculos passados. Com suas ruínas impressionantes e histórias antigas, esse ponto turístico transporta os visitantes para uma época distante. Explore os vestígios arqueológicos, aprenda sobre a civilização que habitou esse lugar e deixe-se maravilhar com a grandiosidade desse tesouro histórico.',
          imagem: photo1,
          data: '2022-06-27',
          popularidade: 2
        },
        {
          id: 5,
          nome: 'Ponto E',
          descricao: 'Se você é um amante da arte e da criatividade, o Ponto E é um destino imperdível. Esse ponto turístico é conhecido por sua vibrante cena artística, galerias de renome e exposições inspiradoras. Explore as diferentes formas de expressão artística, participe de workshops interativos e mergulhe na atmosfera artística única do Ponto E.',
          imagem: photo1,
          data: '2023-03-07',
          popularidade: 1
        },
      ],
      sortOption: 'nome'
    };
  },
  
  computed: {
    pontosOrdenados() {
      const pontosCopiados = [...this.pontos];

      // Realiza a ordenação com base na opção selecionada
      pontosCopiados.sort((pontoA, pontoB) => {
        if (this.sortOption === 'data') {
          return new Date(pontoA.data) - new Date(pontoB.data);
        } else if (this.sortOption === 'popularidade') {
          return pontoB.popularidade - pontoA.popularidade;
        } else {
          return pontoA.nome.localeCompare(pontoB.nome);
        }
      });

      return pontosCopiados;
    }
  }
};
</script>

<style>
.pontos-list {
  margin: 20px;
  list-style-type: none;
  padding: 0;
}

.ponto-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.ponto-imagem {
  width: auto;
  height: 250px;
  margin-right: 20px;
}

.ponto-titulo {
  font-size: 18px;
  margin-bottom: 10px;
}

.ponto-content {
  flex: 1;
}

.ponto-descricao {
  font-size: 14px;
} 

.pontos-controls {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 10px;
}

.controls {
  width: auto;
  height: auto;
  align-items: flex-end;
}

label {
  margin-right: 10px;
  font-weight: bold;
}

select {
  padding: 5px;
  border-radius: 4px;
  font-size: 14px;
}
</style>
