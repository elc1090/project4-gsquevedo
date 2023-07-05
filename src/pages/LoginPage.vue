<template>
  <div class="container">
    <div class="layout-right">
      <div class="login">
        <div class="logo">
          <img src="@/assets/jardim.png" alt="Logo" class="logo" />
        </div>
        <n-config-provider>
          <n-form class="form">
            <n-form-item class="form-item" path="user.email" label="Email">
              <n-input placeholder="Informe seu email" v-model:value="user.email">
                <template #suffix>
                  <n-icon size="15"> <mail-outline/> </n-icon>
                </template>
              </n-input>
            </n-form-item>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <n-form-item class="form-item" path="user.password" label="Senha">
              <n-input 
                type="password"
                placeholder="Informe sua senha" 
                show-password-on="click"
                v-model:value="user.password">
              </n-input>
            </n-form-item>
            <n-button class="btn-login" @click="handleSubmitForm">Acessar uma conta</n-button>
            <a class="create" href="/create" style="color: #6a9a69; text-decoration: none;">Criar conta</a>
            
          </n-form>
        </n-config-provider>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { NConfigProvider, NIcon, NButton, NForm, NInput, NFormItem } from 'naive-ui';
import { MailOutline } from '@vicons/ionicons5';

export default {
  components: {
    MailOutline,
    NIcon,
    NConfigProvider,
    NButton,
    NForm,
    NInput,
    NFormItem
  },
  data() {
    const user = {
      email: '',
      password: ''
    };

    return {
      user,
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmitForm() {
      let apiURL = 'https://project4-gsquevedo-api.vercel.app/api/login';

      try {
        const { data } = await axios.post(apiURL, this.user);
        if(data){
          this.$router.push('/home')
        }
      } catch (error) {
        this.errorMessage = error.response.data.error;
      }      
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.router-user {
  text-decoration: none;
  color: black;
  display: flex;
}

.btn-login {
  border-radius: 50px;
  width: 460px;
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
  background-color: rgba(234, 234, 234, 1);
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
  width: 500px;
}

.ref-label{
  color: #717984;
  text-decoration: none;
}

.create {
  margin-top: 10px;
}

.error-message {
  color: red;
}
</style>
