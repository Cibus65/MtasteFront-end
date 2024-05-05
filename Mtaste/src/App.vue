<template>
  <div class="app">
    <header class="header">
      <div class="intro">
        <div class="container">
          <div class="header__inner" id="headerInner">
            <div class="logo">
              <img :src="imagePath" alt="Logo">
              <div class="name">Mtaste</div>
              <div class="button-top">
                <button class="btn btn-outline-secondary enter__button" v-if="!isAuthenticated" @click="openModal">Войти</button>
              </div>
            </div>
            <nav class="navigation">
              <a class="nav-link" href="#">Основное меню</a>
              <a class="nav-link" href="#">Ингредиенты</a>
              <a class="nav-link" href="#">Праздничное меню</a>
              <nav class="navbar navbar-light bg-light">
                <form class="form-inline">
                  <input class="form-control mr-sm-2 search__engin" type="text" placeholder="Найти рецепт...">
                  <button type="button" class="btn btn-outline-secondary search__button">Найти</button>
                </form>
              </nav>
            </nav>
          </div>
        </div>
      </div>
    </header>

    <div class="card-container" ref="cardContainer" @scroll="handleScroll">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <img :src="img__error" alt="Изображение блюда">
        <h3>{{ card.name }}</h3>
        <button @click="openRecipeModal(card)">Готовить</button>
      </div>
    </div>

    <recipe-modal :show="showRecipeModal" :card="selectedCard" @close="closeRecipeModal"></recipe-modal>

    <auth-modal :show="showModal" @close="closeModal"></auth-modal>

  </div>
</template>

<script>
import axios from 'axios';
import AuthModal from './components/AuthModal.vue';
import RecipeModal from './components/RecipeModal.vue';
import image from '@/assets/img/logo.jpg';
import img__error from '@/assets/img/img_error.jpg';

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
      totalCards: 0,
      currentPage: 1,
      showRecipeModal: false,
      selectedCard: null,
    };
  },
  mounted() {
    this.loadMoreCards();
    this.adjustCardContainerMargin();
    window.addEventListener('resize', this.adjustCardContainerMargin);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustCardContainerMargin);
  },
  methods: {
    adjustCardContainerMargin() {
      const headerInner = document.getElementById('headerInner');
      const cardContainer = document.querySelector('.card-container');
      if (headerInner && cardContainer) {
        const headerHeight = headerInner.offsetHeight;
        cardContainer.style.marginTop = `${headerHeight}px`;
      }
    },
    openRecipeModal(card) {
      axios.get(`http://localhost:8080/Mtaste/API/getRecipeByID/${card.id}`)
          .then(response => {
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
      this.showModal = true;
      this.isAuthenticated = false;
    },
    closeModal() {
      this.showModal = false;
      this.isAuthenticated = true;
    },

    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = this.$refs.cardContainer;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        this.loadMoreCards();
      }
    },
    loadMoreCards() {
      return axios.get(`http://localhost:8080/Mtaste/API/getRecipeByPage/${this.currentPage}`)
          .then(response => {
            const additionalCardsData = response.data;
            const newCards = additionalCardsData.map(cardData => ({
              name: cardData.name,
              img: cardData.img,
              id: cardData.ID,
            }));
            this.cards.push(...newCards);
            this.totalCards = response.headers['x-total-count'];
          })
          .catch(error => {
            console.error('Ошибка при загрузке карточек:', error);
          });
    }
  }
};
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
.header__inner {
  width: 100%;
}
.header__inner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
}
.logo{
  display: flex;
  font-size: 40px;
  font-family: "Gilda Display", serif;
  color:rgba(2, 96, 74, 1);
  font-weight: 700;
  border-bottom: 1px solid;
  padding-left: 15%;
  padding-right: 15%;

}
.name{
  justify-content: center;
  margin-top: 20px;
  margin-left: 5px;
}
.navigation {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20%;
  align-items: center;
}

.nav-link {
  flex: 1;
  margin: 5px;
  padding: 10px;
  color: rgba(2, 96, 74, 1);
  font-family: "Gilda Display", serif;
  font-size: 20px;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(2, 96, 74, 0.1);
}

/* Медиазапросы для адаптивности */
@media screen and (max-width: 768px) {
  .nav-link {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  .nav-link {
    font-size: 14px;
  }
}

.form-inline{
  display: flex;
  background-color: #fff;
  font-family: "Gilda Display", serif;
  width: 281px;



}
.enter__button{
  margin-top: 30px;
  position: absolute; left: 80%;
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
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  width: calc(50% - 20px);
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
.card h3 {
  font-size: 18px;
}

.card img {
  max-width: 100%;
  height: auto;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card button {
  margin-top: auto;
}
</style>