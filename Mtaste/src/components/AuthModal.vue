<template>
  <div v-if="showModal" class="modal" @click.self="closeModal">
    <div class="modal-content" @click.stop="">
      <h2 class="modal-title">Авторизация</h2>
      <form @submit.prevent="handleSubmit" class="auth-form">
        <input type="text" v-model="username" placeholder="Имя пользователя" required>
        <input type="password" v-model="password" placeholder="Пароль" required>
        <button type="submit" class="auth-button">Войти</button>
      </form>
      <p class="register-link" @click="showRegisterModal = true">У вас еще нет аккаунта? Зарегистрируйтесь</p>
    </div>
  </div>
  <!-- Окно регистрации -->
  <div v-if="showRegisterModal" class="modal" @click.self="closeRegisterModal">
    <div class="modal-content" @click.stop="">
      <h2 class="modal-title">Регистрация</h2>
      <form @submit.prevent="handleRegister" class="auth-form">
        <input type="text" v-model="registerUsername" placeholder="Имя пользователя" required>
        <input type="password" v-model="registerPassword" placeholder="Пароль" required>
        <input type="password" v-model="registerConfirmPassword" placeholder="Подтвердите пароль" required>
        <button type="submit" class="auth-button">Зарегистрироваться</button>
      </form>
      <p class="register-link" @click="showRegisterModal = false">Уже есть аккаунт? Войдите</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      showRegisterModal: false,
      username: '',
      password: '',
      registerUsername: '',
      registerPassword: '',
      registerConfirmPassword: ''
    };
  },
  methods: {
    handleSubmit() {
      // Логика отправки формы на сервер для авторизации
      console.log('Имя пользователя:', this.username);
      console.log('Пароль:', this.password);
      // После успешной авторизации закрываем модальное окно
      this.$emit('close');
    },
    handleRegister() {
      // Логика отправки формы на сервер для регистрации
      console.log('Имя пользователя:', this.registerUsername);
      console.log('Пароль:', this.registerPassword);
      console.log('Подтверждение пароля:', this.registerConfirmPassword);
      // После успешной регистрации закрываем модальное окно регистрации
      this.closeRegisterModal();
    },
    closeModal() {
      this.showModal = false;
    },
    closeRegisterModal() {
      this.showRegisterModal = false;
    },
    openModal() {
      this.showModal = true;
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(newVal) {
      this.showModal = newVal;
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-title {
  text-align: center;
  color: rgb(2, 96, 74);
  font-size: 70px;
  user-select: none;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

input[type="text"],
input[type="password"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 100%;
}

.auth-button {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: rgb(2, 96, 74);
  color: white;
  cursor: pointer;
  width: 100%;
}

.auth-button:hover {
  opacity: 0.8;
}

.register-link {
  margin-top: 20px;
  color: #007bff;
  cursor: pointer;
  font-size: 15px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>