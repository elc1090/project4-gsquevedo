<template>
  <nav-bar />
  <div class="home">
    <main>
      <n-card>
        <n-card-content>
          <div class="hero">
            <div class="hero-content">
              <h2 class="animate__animated animate__slideInLeft">Bem-vindo ao Jardim Botânico UFSM</h2>
              <p class="subtitle animate__animated animate__slideInRight">Um lugar de beleza natural e preservação da flora.</p>
              <a href="https://www.ufsm.br/orgaos-suplementares/jardim-botanico" class="button">Saiba Mais</a>
            </div>
          </div>
          <n-card class="about animate__animated animate__fadeInUp">
            <n-card-content>
              <h2>Apresentação</h2>
              <p>O Jardim Botânico da Universidade Federal de Santa Maria (UFSM) é um espaço dedicado à pesquisa, conservação e educação ambiental. Fundado em 1986, abrange uma área de 13 hectares e possui uma grande diversidade de espécies vegetais nativas e exóticas.</p>
              <p>O jardim oferece uma experiência única para os visitantes, combinando belas paisagens com informações sobre a flora regional e a importância da preservação ambiental.</p>
              <img src="https://www.ufsm.br/app/uploads/sites/363/2023/06/Sem-nome-1200-%C3%97-444-px-4-1024x325.jpg"/> 
            </n-card-content>
          </n-card>
          <div class="section">
            <n-card class="visit animate__animated animate__fadeInUp">
              <n-card-content>
                <n-carousel autoplay autoplay-speed="3000">
                  <img class="carousel-img" src="https://www.ufsm.br/app/uploads/sites/363/2023/06/IMG_7318-272x182.jpg">
                  <img class="carousel-img" src="https://www.ufsm.br/app/uploads/sites/363/2023/06/IMG_6732-272x182.jpg">
                  <img class="carousel-img" src="https://www.ufsm.br/app/uploads/sites/363/2023/06/fb5e836e-20cf-480e-9514-134c429925ac-1-272x182.jpg">
                  <img class="carousel-img" src="https://www.ufsm.br/app/uploads/sites/363/2023/06/ddfb8a6c-7db6-4214-9c6f-cbdfc51e5a11-1-272x182.jpg">
                  <img class="carousel-img" src="https://www.ufsm.br/app/uploads/sites/363/2023/06/c0cad6ca-4dc3-4d58-a855-3b517ad4a3d2-272x182.jpg">
                </n-carousel>
              </n-card-content>
            </n-card>
            <n-card class="projects animate__animated animate__fadeInUp">
              <n-card-content>
                <h2>Projetos</h2>
                <p>O Jardim Botânico UFSM está envolvido em diversos projetos de pesquisa e conservação. Alguns dos principais projetos em andamento incluem:</p>
                <ul>
                  <li>Estudo da flora nativa da região;</li>
                  <li>Preservação de espécies ameaçadas;</li>
                  <li>Educação ambiental para escolas e comunidade;</li>
                  <li>Pesquisas sobre a relação entre plantas e animais;</li>
                </ul>
              </n-card-content>
            </n-card>
          </div>
        </n-card-content>
      </n-card>
    </main>
  </div>
  <footer-page />
</template>

<script>
import { NCarousel, NCard, NCardContent } from 'naive-ui';
import NavBar from '@/components/NavBar.vue';
import FooterPage from '@/components/FooterPage.vue';

export default {
  name: 'HomePage',
  components: {
    NCarousel,
    NCard,
    NCardContent,
    NavBar,
    FooterPage
  }
}
</script>

<style>
@import 'animate.css';

.home {
  background-color: #f2f2f2;
  padding: 20px;
}

.carousel-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.hero {
  background-color: rgb(69, 161, 118, 0.8);
  color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-content {
  text-align: center;
}

.about {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  width: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  padding: 10px 80px;
  font-size: 16px;
}

.visit {
  background-color: #ffffff;
  margin-bottom: 20px;
  border-radius: 5px;
  width: 560px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.projects {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.projects h2 {
  color: #333333;
  font-size: 24px;
  margin-bottom: 10px;
}

.projects p {
  color: #666666;
  line-height: 1.5;
  margin-bottom: 10px;
  text-align: justify;
}

.projects ul {
  list-style-type: disc;
  margin-left: 20px;
  color: #666666;
  padding-left: 20px;
}

.projects li {
  margin-bottom: 5px;
}

h2 {
  color: #333333;
  font-size: 24px;
  margin-bottom: 10px;
}

.subtitle {
  color: #666666;
  line-height: 1.5;
  margin-bottom: 10px;
  text-align: center;
}

p {
  color: #666666;
  line-height: 1.5;
  margin-bottom: 10px;
  text-align: justify;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
  color: #666666;
}

.button {
  display: inline-block;
  background-color: #449f75;
  color: #ffffff;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #388762;
}

.section {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

</style>
