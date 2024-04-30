<template>
  <!DOCTYPE html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gilda+Display&display=swap" rel="stylesheet">
    <title>Mtaste</title>

  </head>
  <header class="header">
    <div class="intro">
      <div class="container">
        <div class="header__inner">
          <div class="logo"><img :src="imagePath">
            <div class="name">Mtaste</div>
            <div class="button-top">

              <button class="btn btn-outline-secondary enter__button" v-if="!isAuthenticated" @click="openModal">Войти</button>
              <auth-modal :show="showModal" @close="closeModal"></auth-modal>


            </div>
          </div>

          <nav class="navigation">
            <a class="nav-link"  aria-disabled="false" href="#">Основное меню</a>
            <a class="nav-link"  aria-disabled="false" href="#">Ингредиенты</a>
            <a class="nav-link"  aria-disabled="false" href="#">Праздничное меню</a>
            <nav class="navbar navbar-light bg-light">
              <form class="form-inline">
                <input class="form-control mr-sm-2 search__engin" type="text" placeholder="Найти рецепт...">
                <button type="button" class="btn btn-outline-secondary search__button">Найти</button>
              </form>

            </nav>
          </nav>
        </div>

        <div class="card-container">
          <div v-for="(card, index) in cards" :key="index" class="card">
            <img :src="img__error" alt="Изображение блюда">
            <h3>{{ card.name }}</h3>
            <button @click="openRecipeModal(card)">Готовить</button>
            <recipe-modal :show="showRecipeModal" :card="selectedCard" @close="closeRecipeModal"></recipe-modal>
          </div>
          <!-- Добавление контейнера для центрирования кнопки -->
          <div class="load-more-container">
            <button v-if="cards.length < totalCards" @click="loadMoreCards" class="load-more-button">Показать еще</button>
          </div>
        </div>

      </div>
    </div>





  </header>

</template>



<script>

import anim from './animation';
import VueScrollTo from 'vue-scrollto';
import image from '@/assets/img/logo.jpg';
import img__error from  '@/assets/img/img_error.jpg';
import AuthModal from './components/AuthModal.vue';
import axios from 'axios';
import RecipeModal from './components/RecipeModal.vue';

anim()


export default {
  components: {
    AuthModal,
    RecipeModal,
  },
  data() {
    return {
      imagePath: image,
      img__error: img__error,

      isAuthenticated: false,
      showModal: false,
      cards: [],
      totalCards: 0, // Новое свойство для хранения общего количества карточек
      batchCount: 10, // Количество карточек, которые будут загружаться при каждом нажатии на "Показать еще"
      currentPage: 1,
      showRecipeModal: false,
      selectedCard: null,
    };

  },
  name: 'App',
  directives: {
    scrollTo: VueScrollTo.directive

  },
  mounted() {
    this.loadMoreCards();
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    openRecipeModal(card) {
      // Делаем запрос к серверу для получения описания рецепта
      axios.get(`http://0.0.0.0:8080/Mtaste/API/getRecipeDescription/${card.id}`)
          .then(response => {
            // Обновляем текущую карточку с описанием
            this.selectedCard = {
              ...card,
              description: response.data.description
            };
            this.showRecipeModal = true;
          })
          .catch(error => {
            console.error('Ошибка при загрузке описания рецепта:', error);
          });
    },
    closeRecipeModal() {
      this.showRecipeModal = false;
    },
    openModal() {
      this.showModal = false; // Сбрасываем состояние модального окна
      this.$nextTick(() => {
        this.showModal = true; // Устанавливаем состояние модального окна
        this.isAuthenticated = false;
      });
    },
    closeModal() {
      this.showModal = false; // Сбрасываем состояние модального окна
      this.isAuthenticated = true;
    },
    scrollToElement() {
      // id элемента, к которому нужно перейти
      const elementId = '#elementToScrollTo';
      // Прокрутка к элементу с заданным id
      this.$scrollTo.scrollTo(elementId, 1500); // 1500 - это длительность анимации скролла в миллисекундах
    },
    handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.currentPage += 1
        this.loadMoreCards();
      }
    },
    loadMoreCards() {
      axios.get(`http://0.0.0.0:8080/Mtaste/API/getRecipeByPage/${this.currentPage}`)
          .then(response => {
            const additionalCardsData = response.data;
            const newCards = additionalCardsData.map(cardData => ({
              name: cardData.name,
              img: cardData.img
            }));
            this.cards.push(...newCards);
            this.currentPage += 1;
            this.totalCards = response.headers['x-total-count']; // Обновление общего количества карточек из заголовка ответа
          })
          .catch(error => {
            console.error('Ошибка при загрузке карточек:', error);
          });
    }
  }
}

</script>


<style scoped>

body{
  margin: 0;
  font-family: "Gilda Display", serif;
  max-width: 1440px;
  font-size: 15px;
  color: #fff;
  width: 100%;
  height: 100%;


}

*, *:before, *:after{
  box-sizing: border-box;
}
.intro{
  width:100%;
  height: 100vh;
  -webkit-background-size: cover;
  background-size: cover;
}

.header{
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.logo{
  display: flex;
  font-size: 40px;
  font-family: "Gilda Display", serif;
  color:rgba(2, 96, 74, 1);
  font-weight: 700;
  border-bottom: 1px solid;

}
.name{
  justify-content: center;
  margin-top: 20px;
  margin-left: 5px;
}
.navigation{
  font-size: 30px;
  font-family: "Gilda Display", serif;
  display: flex;
  color: rgba(2, 96, 74, 1);

  border-bottom: 1px solid;

}
.nav-link{
  margin-top: 15px;
  margin-right: 70px;
  margin-left: 15px;

}

.form-inline{
  display: flex;
  background-color: #fff;
  font-family: "Gilda Display", serif;
  width: 281px;



}
.enter__button{
  margin-top: 30px;
  position: absolute; left: 75%;
  width: 100px;


}



.search__button{
  margin-top: 5px;
  width: 140px;
  height: 45px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.search__engin{
  margin-top: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.bg-light{
  --bs-bg-opacity: 0;

}
.btn-outline-secondary{
  color:#fff;
}
input:focus {
  box-shadow: 0 0 10px rgba(2, 96, 74, 1);
}
.btn {
  background-color: rgba(2, 96, 74, 1);
  border-color: rgba(2, 96, 74, 1);
  font-family: "Gilda Display", serif;


}
.btn:hover{
  background-color: rgb(1, 76, 59);
}

.btn:focus{
  box-shadow: 0 0 10px rgb(3, 97, 75);
}

.card{

}

.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: 300px;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.card img {
  max-width: 100%;
  height: auto;
}

.card button {
  margin-top: 10px;
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
}

.load-more-button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-more-button:hover {
  background-color: #0056b3;
}
</style>