<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="redes-sociais">
        <a v-for="(c, index) in contatos" :key="index" :href="c.info" class="icon-link">
          <n-icon size="40" v-if="c.contato === 'facebook'">
            <logo-facebook/>
          </n-icon>
          <n-icon size="40" v-if="c.contato === 'instagram'">
            <logo-instagram/>
          </n-icon>
          <n-icon size="40" v-if="c.contato === 'youtube'">
            <logo-youtube/>
          </n-icon>
          <n-icon size="40" v-if="c.contato === 'site'">
            <globe/>
          </n-icon>
        </a>
      </div>
      <div class="contatos">
        <div class="contato" v-for="(c, index) in contatos" :key="index" >
          <div v-if="c.contato === 'telefone' || c.contato === 'horario'">
            <span class="contato-label" v-if="c.contato === 'telefone'">Telefone:</span>
            <span class="contato-label" v-if="c.contato === 'horario'">Horário:</span>
            <span class="contato-info">{{ c.info }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { NIcon } from 'naive-ui';
import { LogoFacebook, LogoInstagram, LogoYoutube, Globe } from '@vicons/ionicons5';

export default {
  components: {
    NIcon,
    LogoFacebook,
    LogoInstagram,
    Globe,
    LogoYoutube
  },
  data() {
    return {
      contatos: []
    };
  },
  async mounted() {
    try {
      const response = await fetch("https://sheetdb.io/api/v1/jvyo4l3l29obu?sheet=institucional");
      if (!response.ok) {
        throw new Error("Erro ao obter os dados da API");
      }
      const data = await response.json();
      this.contatos = data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style>
.footer {
  background-color: #448a4e;
  padding: 10px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.redes-sociais {
  display: flex;
}

.icon-link {
  color: #fff;
  margin-right: 5px;
}

.icon-link:hover {
  opacity: 0.8;
}

.contatos {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  color: #fff;
}

.contato {
  margin-bottom: 5px;
}

.contato-label {
  font-weight: bold;
}

.contato-info {
  margin-left: 5px;
}
</style>