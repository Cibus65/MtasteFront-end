<template>
  <div v-if="showModal" class="modal" @click.self="closeModal">
    <div class="modal-content" @click.stop="">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-title">Авторизация</h2>
      <form @submit.prevent="handleSubmit" class="auth-form">
        <input type="text" v-model="login" placeholder="Имя пользователя" required>
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
        <input type="text" v-model="login" placeholder="Имя пользователя" required>
        <input type="password" v-model="password" placeholder="Пароль" required>
        <input type="password" v-model="retry_password" placeholder="Подтвердите пароль" required>
        <button type="submit" class="auth-button">Зарегистрироваться</button>
      </form>
      <p class="register-link" @click="showRegisterModal = false">Уже есть аккаунт? Войдите</p>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {

  
  data() {
    return {
      showModal: false,
      showRegisterModal: false,
      login: '',
      password: '',
      retry_password: '',
      errorMessage: '',
    };
  },
  methods: {
    handleSubmit() {
      const baseURL ="http://80.78.242.57:8082";

      axios.post(`${baseURL}/Mtaste/API/auth/signIn`, {
        login: this.login,
        password: this.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            // Проверяем, если сервер вернул ошибку с кодом 3
            if (response.data.errorCode === 4) {
              // Обрабатываем ошибку, например, показывая сообщение
              Swal.fire({
                icon: "error",
                title: "Ой..",
                text: "Неверный логин или пароль!",
              });
            } else if (response.data.errorCode === 3) {
              // Обрабатываем ошибку, например, показывая сообщение
              Swal.fire({
                icon: "error",
                title: "Ой..",
                text: "Пользователь с таким именем не существует!",
              });
            } else {
              // Сохраняем токен, если авторизация прошла успешно
              const token = response.data.token;
              const userID = response.data.userID;
              localStorage.setItem('token', token);
              localStorage.setItem('userID', userID);
              this.$emit('close', this.login);
            }
          })

    },


    handleRegister() {
      const baseURL ="http://80.78.242.57:8082";
      axios.post(`${baseURL}/Mtaste/API/auth/signUp`, {
        login: this.login,
        password: this.password,
        retry_password: this.retry_password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            if (response.data.errorCode === 2) {
              Swal.fire({
                icon: "error",
                title: "Ой..",
                text: "Пользователь с таким именем уже существует!",
              });

          } else if (response.data.errorCode === 5) {
        Swal.fire({
          icon: "error",
          title: "Ой..",
          text: "Пароли должны совпадать!",
        });
      }else if (response.data.errorCode === 9) {
              Swal.fire({
                icon: "error",
                title: "Ой..",
                text: "Логин должен содержать не менее 6 символов, не быть длиннее 12, иметь хотя бы одну латинскую букву, и не содержать другие спец.символы кроме _ и цифр."
              });
            } else if (response.data.errorCode === 8) {
              Swal.fire({
                icon: "error",
                title: "Ой..",
                text: "Пароль должен быть не короче 8 символов, не длиннее 50, содержать хотя бы одну цифру и латинскую букву!",
              });
      }else {
        const token = response.data.token;
        localStorage.setItem('token', token);
        this.closeRegisterModal();
      }
    });
    },
    closeModal() {
      this.$emit('input', false);
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
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 28px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
}

@media (max-width:615px) {
.modal-title[data-v-c3c6d662] {
  font-size:50px;
}
.auth-form[data-v-c3c6d662] {
  width:70%;
}
.modal-content[data-v-c3c6d662] {
  width:450px;
  }
}

@media (max-width:500px) {
.modal-title[data-v-c3c6d662] {
  font-size:40px;
}
.auth-form[data-v-c3c6d662] {
  width:50%;
}
.modal-content[data-v-c3c6d662] {
  width:350px;
  }
}
</style>
