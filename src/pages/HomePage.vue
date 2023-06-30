<template>
  <div class="home">
    <main>
      <div class="hero">
        <div class="hero-content">
          <h2>Bem-vindo ao Jardim Botânico UFSM</h2>
          <p class="subtitle">Um lugar de beleza natural e preservação da flora.</p>
          <a href="https://www.ufsm.br/orgaos-suplementares/jardim-botanico" class="button">Saiba Mais</a>
        </div>
      </div>
      <div class="about">
        <h2>Sobre</h2>
        <p>O Jardim Botânico da Universidade Federal de Santa Maria (UFSM) é um espaço dedicado à pesquisa, conservação e educação ambiental. Fundado em 1986, abrange uma área de 13 hectares e possui uma grande diversidade de espécies vegetais nativas e exóticas.</p>
        <p>O jardim oferece uma experiência única para os visitantes, combinando belas paisagens com informações sobre a flora regional e a importância da preservação ambiental.</p>
      </div>
      <div class="section">
        <div class="visit">
          <h2>Visitação</h2>
          <p>O Jardim Botânico UFSM está aberto ao público de terça-feira a domingo, das 9h às 17h. Durante a visita, os visitantes podem desfrutar de trilhas autoguiadas, áreas de descanso e observação de aves.</p>
          <p>Para garantir a preservação do ambiente, é solicitado que os visitantes sigam as regras de conduta, como não pisar nas áreas de vegetação e não alimentar os animais.</p>
        </div>
        <div class="projects">
          <h2>Projetos</h2>
          <p>O Jardim Botânico UFSM está envolvido em diversos projetos de pesquisa e conservação. Alguns dos principais projetos em andamento incluem:</p>
          <ul>
            <li>Estudo da flora nativa da região;</li>
            <li>Preservação de espécies ameaçadas;</li>
            <li>Educação ambiental para escolas e comunidade;</li>
            <li>Pesquisas sobre a relação entre plantas e animais;</li>
          </ul>
        </div>
      </div> 
    </main>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  // Component options
}
</script>

<style>
.home {
  background-color: #f2f2f2;
  padding: 20px;
}

.hero {
  background-color: #449f75;
  color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero-content {
  text-align: center;
}

.about{
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  width: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.visit, .projects {
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  width: 560px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333333;
  font-size: 24px;
  margin-bottom: 10px;
}

.subtitle{
  color: #666666;
  line-height: 1.5;
  margin-bottom: 10px;
  font-weight: bold;
}

p {
  color: #666666;
  line-height: 1.5;
  margin-bottom: 10px;
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
