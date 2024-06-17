<template>
  <div class="app">
    <header class="header">
      <div class="intro">
        <div class="container">
          <div class="header__inner" id="headerInner">
            <div class="logo">
              <img :src="imagePath" alt="Logo" id="change_img">
              <div class="name">Mtaste</div>
              <div class="button-top" v-if="isAuthenticated">
                <div class="dropdown" @click="toggleDropdown">
                  <button class="user-info">
                    <i class="fas fa-user-circle"></i>
                    <span class="username-text">{{ username }}</span>
                  </button>
                  <div class="dropdown-content" v-show="dropdownOpen">
                    <button @click.stop="ShowFavorites">Избранное</button>
                    <button @click.stop="exit">Выйти</button>
                  </div>
                </div>
              </div>
              <div class="button-top" v-else>
                <button class="btn btn-outline-secondary enter__button" @click="openModal">Войти</button>
              </div>
            </div>
            <nav class="navigation">

              <nav class="navbar navbar-light bg-light">
                <form class="form-inline" @submit.prevent="openSearchModal">
                  <input class="form-control mr-sm-2 search__engin" type="text" placeholder="Найти рецепт..." v-model="searchQuery">
                  <button type="submit" class="btn btn-outline-secondary search__button">Найти</button>
                </form>
              </nav>
            </nav>
          </div>
        </div>
      </div>

    </header>

    <div class="card-container" ref="cardContainer">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <img :src="card.imgwindowurl" alt="Изображение блюда" class="width_height_card">
        <h3>{{ card.name }}</h3>
        <div class="ingrid_btn">
          <button
              class="btn btn-outline-secondary favorite-btn" @click="toggleFavorite(card)" :class="{ 'favorited': card.isFavorite, 'not-favorited': !card.isFavorite }"><i class="fas" :class="{ 'fa-heart': !card.isFavorite, 'fa-heart-broken': card.isFavorite }"></i>
          </button>

          <button class="btn btn-outline-secondary ingredients-btn" @click="openIngredientsModal(card)">
            <i class="fas fa-utensils"></i>
          </button>
          <button class="btn btn-outline-secondary cook-btn" @click="openRecipeModal(card)">Готовить</button>
        </div>
      </div>

      <button v-if="cards.length % 20 === 0 && cards.length < 2000" @click="loadMoreCards" class="btn btn-outline-secondary load-more-button">Показать еще</button>
    </div>

    <favorites-modal
        ref="favoritesModal"
        :show="showFavoritesModal"
        :img__error="img__error"
        @close="closeFavoritesModal"
        @open-recipe="openRecipeModal"
        @open-ingredients="openIngredientsModal"
        :addToFavorites="addToFavorites"
        :removeFromFavorites="removeFromFavorites"
        :toggleFavorite="toggleFavorite"
        :openIngredientsModal="openIngredientsModal"
        :favoriteRecipes="favoriteRecipes"
        :cards="cards"
    />

    <recipe-modal :show="showRecipeModal" :card="selectedCard" @close="closeRecipeModal"></recipe-modal>
    <ingredients-modal :show="showIngredientsModal" :card="selectedCard" @close="closeIngredientsModal"></ingredients-modal>
    <auth-modal :show="showModal" @close="closeModal" @update-username="updateUsername"></auth-modal>
    <search-modal
        :show="showSearchModal"
        :img__error="img__error"
        @close="closeSearchModal"
        @open-recipe="openRecipeModal"
        @open-ingredients="openIngredientsModal"
        :addToFavorites="addToFavorites"
        :removeFromFavorites="removeFromFavorites"
        @toggleFavorite="toggleFavorite"
        :openIngredientsModal="openIngredientsModal"
    />
  </div>

</template>

<script>

import axios from 'axios';
import AuthModal from './components/AuthModal.vue';
import RecipeModal from './components/RecipeModal.vue';
import SearchModal from './components/SearchModal.vue';
import IngredientsModal from './components/IngredientsModal.vue';
import FavoritesModal from './components/FavoritesModal.vue';
import image from '@/assets/img/logo.jpg';
import img__error from '@/assets/img/img_error.jpg';
import animation from './animation';
import animation_for_first_4_card from './animation_for_4_card';




animation_for_first_4_card();

animation();


export default {
  components: {
    AuthModal,
    RecipeModal,
    SearchModal,
    IngredientsModal,
    FavoritesModal,

  },

  data() {
    return {
      imagePath: image,
      img__error: img__error,
      showModal: false,
      cards: [],
      totalCards: 0,
      currentPage: 1,
      searchQuery: '',
      showRecipeModal: false,
      selectedCard: null,
      showSearchModal: false,
      showIngredientsModal: false,
      isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
      username: localStorage.getItem('username') || '',
      dropdownOpen: false,
      showFavoritesModal: false,
      favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
    };
  },
  mounted() {
    this.loadMoreCards();
    this.adjustCardContainerMargin();
    window.addEventListener('resize', this.adjustCardContainerMargin);
    this.updateFavoriteStatus();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustCardContainerMargin);
  },
  methods: {
    searchRecipes(words) {
      const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';

      axios.get(`${baseURL}/Mtaste/API/findRecipe/${words}`)
          .then(response => {
            const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
            this.searchResults = response.data.map(cardData => ({
              name: cardData.name,
              imgwindowurl: cardData.imgwindowurl,
              id: cardData.ID,
              isFavorite: favoriteRecipes.includes(cardData.ID)
            }));
          })
          .catch(error => {
            console.error('Ошибка при поиске рецептов:', error);
          });
    },
    updateFavoriteStatus() {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      this.cards.forEach(card => {
        card.isFavorite = favoriteRecipes.includes(card.id);
      });
    },
    addToFavorites(card) {
      if (!this.isAuthenticated) {
        this.openModal();
      } else {
        const userID = localStorage.getItem('userID');
        const recipeID = card.id;
        const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';

        axios.post(`${baseURL}/Mtaste/API/user/favourite`, {
          userID: userID,
          recipeID: recipeID,
        })
            .then(response => {
              card.isFavorite = true;
              const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
              if (!favoriteRecipes.includes(card.id)) {
                favoriteRecipes.push(card.id);
                localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
                this.favoriteRecipes = favoriteRecipes;
                this.updateFavoriteStatus();
              } else {
                console.warn('Рецепт уже в избранном:', card.id);
              }
            })
            .catch(error => {
              console.error('Ошибка при добавлении рецепта в избранное:', error);
            });
      }
    },

    removeFromFavorites(card) {
      if (!this.isAuthenticated) {
        this.openModal();
      } else {
        const userID = localStorage.getItem('userID');
        const recipeID = card.id;
        const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';

        axios.post(`${baseURL}/Mtaste/API/user/favourite`, {
          userID: userID,
          recipeID: recipeID,
        })
            .then(response => {
              if (response.data.flag) {
                card.isFavorite = false;
                let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
                if (favoriteRecipes.includes(card.id)) {
                  favoriteRecipes = favoriteRecipes.filter(id => id !== card.id);
                  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
                  this.favoriteRecipes = favoriteRecipes;
                  this.$refs.favoritesModal.updateFavorites(favoriteRecipes); // Добавьте эту строку
                  this.updateFavoriteStatus();
                } else {
                  console.warn('Рецепт не найден в избранном:', card.id);
                }
              } else {
                console.error('Ошибка при удалении рецепта из избранного:', response.data.error);
              }
            })
            .catch(error => {
              console.error('Ошибка при удалении рецепта из избранного:', error);
            });
      }
    },
    logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('isAuthenticated');

      this.isAuthenticated = false;
      this.username = '';
      this.dropdownOpen = false;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    ShowFavorites() {
      this.showFavoritesModal = true;
      this.dropdownOpen = false;
    },
    closeFavoritesModal() {
      this.showFavoritesModal = false;
    },
    exit() {
      this.logout();
      this.dropdownOpen = false;
    },
    toggleFavorite(card) {
      if (!this.isAuthenticated) {
        this.openModal();
      } else {
        const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
        const isFavorite = favoriteRecipes.includes(card.id);

        if (isFavorite) {
          this.removeFromFavorites(card);
        } else {
          this.addToFavorites(card);
        }

        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        this.updateFavoriteStatus();
      }
    },
    openSearchModal() {
      this.showSearchModal = true;
      this.searchRecipes(this.searchQuery);
    },
    closeSearchModal() {
      this.showSearchModal = false;
    },
    adjustCardContainerMargin() {
      const headerInner = document.getElementById('headerInner');
      const cardContainer = document.querySelector('.card-container');
      if (headerInner && cardContainer) {
        const headerHeight = headerInner.offsetHeight;
        cardContainer.style.marginTop = `${headerHeight}px`;
      }
    },
    getRandomCards(card) {
      const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';
      axios.get(`${baseURL}/Mtaste/API/getRandomRecipe/${card.id}`)
          .then(response => {
            const additionalCardsData = response.data;
            const newCards = additionalCardsData.map(cardData => ({
              name: cardData.name,
              imgwindowurl: cardData.imgwindowurl,
              id: cardData.ID,
            }));
            this.cards.push(...newCards);
            this.totalCards = response.headers['x-total-count'];

          })
          .catch(error => {
            console.error('Ошибка при загрузке карточек:', error);
          });
    },


    loadMoreCards() {
      const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';

      axios.get(`${baseURL}/Mtaste/API/getRecipeByPage/${this.currentPage}`)
          .then(response => {
            const additionalCardsData = response.data;
            const newCards = additionalCardsData.map(cardData => ({
              name: cardData.name,
              imgwindowurl: cardData.imgwindowurl,
              id: cardData.ID,
              isFavorite: false // По умолчанию считаем, что новые карточки не в избранном
            }));

            // Загружаем избранные рецепты из локального хранилища
            const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

            // Обновляем состояние isFavorite для новых карточек
            newCards.forEach(card => {
              card.isFavorite = favoriteRecipes.includes(card.id);
            });

            this.cards.push(...newCards);
            this.totalCards = response.headers['x-total-count'];
            this.currentPage++; // Переходим на следующую страницу
          })
          .catch(error => {
            console.error('Ошибка при загрузке карточек:', error);
          });
    },

    openIngredientsModal(card) {
      const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';

      axios.get(`${baseURL}/Mtaste/API/getRecipeByID/${card.id}`)
          .then(response => {
            const recipeData = response.data;
            this.selectedCard = {
              ...card,
              ingredients: recipeData.ingredients,
            };
            this.showIngredientsModal = true;
          })
          .catch(error => {
            console.error('Ошибка при загрузке описания рецепта:', error);
          });
    },
    closeIngredientsModal() {
      this.showIngredientsModal = false;
    },
    openRecipeModal(card) {
      const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';

      axios.get(`${baseURL}/Mtaste/API/getRecipeByID/${card.id}`)
          .then(response => {
            const recipeData = response.data;
            this.selectedCard = {
              ...card,
              description: recipeData.description,
              ingredients: recipeData.ingredients,
              imgwindowurl: recipeData.imgwindowurl,
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
    },

    closeModal(username) {
      this.showModal = false;
      this.isAuthenticated = true;
      this.username = username;
      localStorage.setItem('username', username);
      localStorage.setItem('isAuthenticated', true);
    },

    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } = this.$refs.cardContainer;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        this.loadMoreCards();
      }
    },
  }

};
</script>

<style scoped>

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
}

.dropdown-content button {
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  border: none;
  background-color: transparent;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-content button:hover {
  background-color: #e9e9e9;
}

.dropdown:hover .dropdown-content,
.dropdown-content:hover {
  display: block;
}

.dropdown:hover .dropbtn,
.dropbtn:focus {
  background-color: #f1f1f1;
}

.dropbtn {
  background-color: #fff;
  color: #333;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.dropbtn:hover,
.dropbtn:focus {
  background-color: #f1f1f1;
}

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

  -webkit-background-size: cover;
  background-size: cover;
}

.load-more-button{
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 18px;
  width: 50%;
  cursor: pointer;
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
  user-select: none;

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
  background-color: #ffffff;
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
  user-select: none;
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
  background-color: #ffffff00;
  font-family: "Gilda Display", serif;
  width: 700px;




}
.enter__button{
  margin-top: 30px;
  position: absolute; left: 80%;
  width: 100px;


}



.search__button{
  margin-top: 5px;
  width: 140px;
  height: 50px;
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
  height: 50px;
}

.bg-light{
  --bs-bg-opacity: 0;
  margin:auto;
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



.card-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  opacity: 0;
  width: calc(50% - 20px);
  margin: 10px;
  padding-bottom:5px;
  border: 1px solid #6e6e6e;
  border-radius: 5px;
  text-align: center;
  box-shadow: 5px 5px 5px 1.5px rgb(206, 206, 206);

  -webkit-transform: translateX(-50px);
  -ms-transform: translateX(-50px);
  transform: translateX(-20px);
}

.visible{
  opacity: 1;

  transition: opacity 1.5s;
}


.card h3 {
  margin-top: 20px;
  font-size: 18px;

}

.card img {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid;
  border-color:#818181;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  object-fit: cover;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card.visible  {
  -webkit-transform: translateX(0px);
  -ms-transform: translateX(0px);
  transform: translateX(0px);
  -webkit-transition: all 1.5s;
  -o-transition: all 1.5s;
  transition: all 1.5s;


}

.cook-btn{

  text-align: center;
  margin-top: 15px;
  margin-left: 5px;
  margin-bottom: 15px;
  width: 150px;
  height: 40px;
  box-shadow: 5px 5px 5px 1.5px rgb(221, 221, 221);
}

.width_height_card {
  max-width:900px;
  max-height:350px;
}

.ingredients-btn {
  text-align: center;
  font-size: 16px;
  color: #fff;
  background-color: #02604a;
  border-color: #02604a;
  max-width: 40px;
  max-height: 40px;
  margin-left: 250px;
}

.ingredients-btn i {
  margin-right: 5px;
}
.logo {
  display: flex;
  align-items: center;
}

.button-top {
  display: flex;
  align-items: center;
  position: absolute;
  left: 80%;
}

.enter__button {
  margin-top: 0;
  margin-left: 10px;
  width: 100px;
}


.user-info i {
  font-size: 60px;
  margin-right: 5px;
}

.username-text {
  font-size: 32px;
}

.user-info {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;
  margin-left:-100px;
}

.favorite-btn {
  color: #ffffff;
  background-color: #ecc301;
  max-width: 44px;
  max-height: 40px;
  align-items: center;
  border-color: #dab818;
}

.favorite-btn.favorited {
  color: #ffffff;
  background-color: rgb(175, 0, 0);
  border-color: rgb(159, 1, 1);

}
.favorite-btn.favorited:hover {
  background-color: rgb(159, 1, 1);
}
.favorite-btn:hover {
  background-color: #dab400;

}

.random_carusel{
  margin-top: 200px;
  max-height: 500px;
  max-width: 1000px;
  margin-left: calc(19%);

}

@media (max-width:1080px) {
  .ingredients-btn {
    margin-left:50px;
  }
  .username-text {
    font-size:20px;
  }
  .user-info {
    font-size:60px;

  }
  #change_img {
    height:70px;
  }
  .form-control {
    width:33%;
  }
  .bg-light {
    margin-left:20%;
  }
}
@media (max-width:912px) {
  .bg-light {
    margin-left:15%;
  }
}
@media (max-width:720px) {
  .bg-light {
    margin-left:7%;
  }

}
@media (max-width:615px) {
  .favorite-btn {
    color: #ffffff;
    background-color: #ecc301;
    max-width: 44px;
    max-height: 40px;
    align-items: center;
    border-color: #ecc301;
    margin-top: 55px;
  }


  .ingredients-btn {
    margin-left: 50px;
    margin-top: 55px;
  }
  .cook-btn {
    text-align: center;
    margin-left: 5px;
    margin-bottom: 50px;
    width: 150px;
    height: 40px;
    box-shadow: 5px 5px 5px 1.5px rgb(221, 221, 221);
    margin-top: -110px;
  }
  .name {
    font-size:30px;
  }

  #change_img {
    height:70px;
  }

 
  .form-control {
    width:30%;
  }
  .bg-light {
    margin-left:0%;
  }
  .user-info {
    padding-left:20%;
  }
  .logo {
    padding-left:0%;
  }
  .modal-content {
    width:450px;
  }

  .auth-button {
    width:50%;
  }
  .auth-form {
    width:50%;
  }
  
  .modal-title {
    font-size:50px;
  }
  .enter__button {
    margin-left: -100px;
  }
}


@media (max-width:500px) {
  .card {
    width:100%;
  }
  .cook-btn{
    margin-top:10px;
    margin-left:-140px;
  }
  .form-control {
    width:20%;
  }
  .bg-light {
    margin-left:0%;
  }
  .user-info {
    padding-left:20%;
  }
  .logo {
    padding-left:0%;
  }
  .modal-content {
    width:450px;
  }
  .auth-button {
    width:50%;
  }
  
  .modal-title {
    font-size:50px;
  }
  .enter__button {
    margin-left: -100px;
  }
  
}
@media (max-width:1080px) {
  .ingredients-btn {
    margin-left:50px;
  }
  .username-text {
    font-size:20px;
  }
  .user-info {
    font-size:60px;

  }
  #change_img {
    height:70px;
  }
  .form-control {
    width:33%;
  }
  .bg-light {
    margin-left:20%;
  }
}
@media (max-width:912px) {
  .bg-light {
    margin-left:15%;
  }
}
@media (max-width:720px) {
  .bg-light {
    margin-left:7%;
  }

}
@media (max-width:615px) {
  .favorite-btn {
    color: #ffffff;
    background-color: #ecc301;
    max-width: 44px;
    max-height: 40px;
    align-items: center;
    border-color: #ecc301;
    margin-top: 55px;
  }


  .ingredients-btn {
    margin-left: 50px;
    margin-top: 55px;
  }
  .cook-btn {
    text-align: center;
    margin-left: 5px;
    margin-bottom: 50px;
    width: 150px;
    height: 40px;
    box-shadow: 5px 5px 5px 1.5px rgb(221, 221, 221);
    margin-top: -110px;
  }
  .name {
    font-size:30px;
  }

  #change_img {
    height:70px;
  }

 
  .form-control {
    width:30%;
  }
  .bg-light {
    margin-left:0%;
  }
  .user-info {
    padding-left:20%;
  }
  .logo {
    padding-left:0%;
  }
  .modal-content {
    width:450px;
  }

  .auth-button {
    width:50%;
  }
  .auth-form {
    width:50%;
  }
 
  .modal-title {
    font-size:50px;
  }
  .enter__button {
    margin-left: -60px;
  }
  
  .search__button {
    width:80px;
    }
}


@media (max-width:500px) {
  .card {
    width:100%;
  }
  .cook-btn{
    margin-top:10px;
    margin-left:-140px;
  }
  .form-control {
    width:20%;
  }
  .bg-light {
    margin-left:0%;
  }
  .user-info {
    padding-left:20%;
  }
  .logo {
    padding-left:0%;
  }
  .modal-content {
    width:450px;
  }
  .auth-button {
    width:50%;
  }
  
  .modal-title {
    font-size:50px;
  }
  .enter__button {
    margin-left: -40px;
  }
  input[type="text"], input[type="password"] {
    width:25%;
    margin-left: 40px;
  }
  input[type="text"], input[type="password"] {
    width:17%;
  }
  .search__button {
    width:80px;
    }
}
@media screen and (max-width:1280px){
  input[type="text"], input[type="password"] {
      width: 450px !important;
      margin-left: 85px !important;
    }
}
@media screen and (max-width:1024px){
  input[type="text"], input[type="password"] {
      width: 350px !important;
      margin-left: -45px !important;
    }
}
@media screen and (max-width:853px){
  input[type="text"], input[type="password"] {
      width: 300px !important;
      margin-left: -25px !important;
    }
}
@media screen and (max-width:820px){
  input[type="text"], input[type="password"] {
      width: 300px !important;
      margin-left: -25px !important;
    }
}
@media screen and (max-width:768px){
  input[type="text"], input[type="password"] {
      width: 300px !important;
      margin-left: -35px !important;
    }
}
@media screen and (max-width:540px){
  input[type="text"], input[type="password"] {
      width: 200px !important;
      margin-left: 10px !important;
    }
}
@media screen and (max-width:430px){
  input[type="text"], input[type="password"] {
      width: 200px !important;
      margin-left: -25px !important;
    }
}
@media screen and (max-width:414px){
  input[type="text"], input[type="password"] {
        width: 150px !important;
        margin-left: 0px !important;
    }
}
@media screen and (max-width:412px){
  input[type="text"], input[type="password"] {
        width: 150px !important;
        margin-left: 0px !important;
    }
}
@media screen and (max-width:412px){
  input[type="text"], input[type="password"] {
        width: 150px !important;
        margin-left: 0px !important;
    }
}
@media screen and (max-width:375px){
  input[type="text"], input[type="password"] {
        width: 150px !important;
        margin-left: -5px !important;
    }
}
@media screen and (max-width:375px){
  input[type="text"], input[type="password"] {
        width: 150px !important;
        margin-left: -15px !important;
    }
}
</style>