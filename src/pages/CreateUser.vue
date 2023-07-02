<template>
  <div class="container">
    <div class="layout-right">
      <div class="login">
        <div class="logo">
          <img src="@/assets/jardim.png" alt="Logo" class="logo" />
        </div>
        <n-config-provider>
          <n-form class="form">
            <n-form-item class="item" path="user.name" label="Nome">
              <n-input placeholder="Informe seu nome" v-model:value="user.name">
                <template #suffix>
                  <n-icon size="15"> <person-outline/> </n-icon>
                </template>
              </n-input>  
            </n-form-item>
            <n-form-item class="item" path="user.email" label="Email">
              <n-input placeholder="Informe seu email" v-model:value="user.email">
                <template #suffix>
                  <n-icon size="15"> <mail-outline/> </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item class="item" path="user.password" label="Senha">
              <n-input 
                type="password"
                placeholder="Informe sua senha" 
                show-password-on="click"
                v-model:value="user.password">
              </n-input>
            </n-form-item>
            <div class="btn">
              <n-button class="btn-login" @click="handleSubmitForm">Criar uma conta</n-button>
            </div>
          </n-form>
        </n-config-provider>
      </div>
    </div>
  </div>
</template>
  
<script scoped>
import axios from "axios";
import { NConfigProvider, NIcon, NButton, NForm, NInput } from 'naive-ui';
import { MailOutline, PersonOutline } from '@vicons/ionicons5';

export default {
  components: {
    MailOutline,
    PersonOutline,
    NIcon,
    NConfigProvider,
    NButton,
    NForm,
    NInput
  },
  data() {
    const user = {
      name: '',
      email: '',
      password: ''
    };
    return {
      user,
    };
  },
  methods: {
    async handleSubmitForm() {
      let apiURL = 'https://project4-gsquevedo-api.vercel.app/api/create-user';

      const { data } = await axios.post(apiURL, this.user);
      if(data) {  
        this.$router.push({ path: '/' })
      }
    }
  }
};
</script>

<style>
.link-container {
  justify-content: center;
  text-transform: uppercase;
  display: flex;
}
.container {
  display: flex;
  height: 100vh;
}

.router-login {
  text-decoration: none;
  color: black;
  display: flex;
}


.btn-login {
  border-radius: 50px;
  width: 460px;
  margin-top: 10px;
}

.account {
  display: flex;
  justify-content: space-between;
  margin: 5px;
}

.layout-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout-right {
  background-color:rgba(234, 234, 234, 1);
  flex-direction: column;
}

.logo {
  margin-bottom: 10px;
  display: flex; 
  justify-content: center;
}

.form {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
}

.login {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 30px;
  align-items: center;
}

.ref-label{
  color: #717984;
  text-decoration: none;
}

.ref-label:hover{
  color: #232343;
  text-decoration: none;
}
</style>