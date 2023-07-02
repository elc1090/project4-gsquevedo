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
            <n-form-item class="form-item" path="user.password" label="Senha">
              <n-input 
                type="password"
                placeholder="Informe sua senha" 
                show-password-on="click"
                v-model:value="user.password">
              </n-input>
            </n-form-item>
            <n-button class="btn-login" @click="handleSubmitForm">Acessar uma conta</n-button>
          </n-form>
        </n-config-provider>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { NConfigProvider, NIcon, NButton, NForm, NInput } from 'naive-ui';
import { MailOutline } from '@vicons/ionicons5';

export default {
  components: {
    MailOutline,
    NIcon,
    NConfigProvider,
    NButton,
    NForm,
    NInput
  },
  data() {
    const user = {
      email: '',
      password: ''
    };

    return {
      user,
    };
  },
  methods: {
    async handleSubmitForm() {
      let apiURL = 'https://project4-gsquevedo-api.vercel.app/api/login';
                
      axios.post(apiURL, this.user).then(() => {
        this.$router.push('/home')
      }).catch(error => {
          console.log(error)
      });
    }
  }
};
</script>

<style>
.container {
  display: flex;
  height: 100vh;
}

.router-user {
  text-decoration: none;
  color: black;
  display: flex;
}

.form-item{
  margin-bottom: 10px;
}

.btn-login {
  border-radius: 50px;
  width: 100%;
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
</style>
