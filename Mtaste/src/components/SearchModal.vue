<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Результаты поиска</h2>
      <div v-if="searchResults.length > 0" class="card-container">
        <div v-for="(card, index) in searchResults" :key="index" class="card">
          <img class="card_img" :src="card.imgwindowurl" alt="Изображение блюда">
          <h3>{{ card.name }}</h3>
          <div class="ingrid_btn">
            <button class="btn btn-outline-secondary favorite-btn" @click="toggleFavorite(card)" :class="{'not-favorited': !card.isFavorite, 'favorited': card.isFavorite }">
              <i class="fas" :class="{ 'fa-heart-broken': card.isFavorite, 'fa-heart': !card.isFavorite }"></i>
            </button>
            <button class="btn btn-outline-secondary ingredients-btn" @click="openIngredientsModal(card)">
              <i class="fas fa-utensils"></i>
            </button>
            <button class="btn btn-outline-secondary cook-btn" @click="openRecipeModal(card)">Готовить</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Рецептов не найдено</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    show: Boolean,
    img__error: String,
    toggleFavorite: Function,
    openIngredientsModal: Function,
    openRecipeModal: Function,
    addToFavorites: Function,
    removeFromFavorites: Function,
  },
  data() {
    return {
      searchResults: []
    };
  },
  methods: {
    toggleFavorite(card) {
      console.log('toggleFavorite called', card);
      this.$emit('toggleFavorite', card);
    },

    openRecipeModal(card) {
      this.$emit('open-recipe', card);
    },
    openIngredientsModal(card) {
      this.$emit('open-ingredients', card);
    },
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
    }
  },
  watch: {
    show(newValue) {
      if (newValue) {
        this.searchRecipes(this.$parent.searchQuery);
      }
    }
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 1200px;
  box-sizing: border-box;

}

.card_img{
  width: 100%;
  height: 80%;
  border-bottom: 1px solid;
  border-color:#818181;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  object-fit: cover;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

h2 {
  margin-top: 0;
  color: #333;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;

}
.enter__button{
  margin-top: 50px;
  margin-left: 300px;
  width: 100px;

}
.btn_style{
  margin-top: 10px;
}
.btn {

  color: white;
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
.card {

  padding-bottom:5px;
  border: 1px solid #6e6e6e;
  border-radius: 5px;
  text-align: center;
  box-shadow: 5px 5px 5px 1.5px rgb(206, 206, 206);
  width: calc(50% - 20px);
  margin: 10px;
  max-height: 500px;

}

.card h3 {
  margin-top: 15px;
  font-size: 18px;
}

.card img {

  max-height: 900px;
}

.card button {
  margin-top: auto;
}

@media screen and (max-width: 600px) {
  .modal-content {
    width: 90%;
  }

  .card {
    width: calc(100% - 20px); /* При маленьком экране одна карточка в ряд */
  }
}
.btn_style {
  display: flex;
  justify-content: space-around;
  margin-top: auto;
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

.favorite-btn {
  color: #ffffff;
  background-color: #ecc301;
  max-width: 44px;
  max-height: 40px;
  align-items: center;
  border-color: #dab818;
  margin-left: 20px;
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
.ingredients-btn {
  margin-left:250px;
  
}
.ingrid_btn{
  display: flex;
  
}
.cook-btn {
  text-align: center;
  margin-left: 5px;
  
  width: 150px;
  height: 40px;
  box-shadow: 5px 5px 5px 1.5px rgb(221, 221, 221);
  margin-top: -110px;
}
@media (max-width:615px) {
.cook-btn[data-v-6c566dde] {
  margin-bottom:0px;
  margin-left:-30%;
  margin-top:0px;
  }
}
@media (max-width:830px) {
.cook-btn[data-v-6c566dde] {
  margin-bottom:20px;
  margin-top:20px;
  margin-left:1%;
  }
}

@media (min-width:830px) {
.cook-btn[data-v-6c566dde]{
margin-bottom:0px;
margin-left:10px;

  }
}
@media (max-width:850px) {
.cook-btn[data-v-6c566dde][data-v-6c566dde] {
margin-left: 10px;
margin-top: 20px;
}
}
@media (min-width:1000px) {
  .ingredients-btn[data-v-6c566dde] {
  margin-left:200px;
  }
}

@media (max-width:1220px) {
.ingredients-btn[data-v-6c566dde][data-v-6c566dde] {
  margin-left:40px;
  }
}
@media (max-width:600px) {
.ingredients-btn[data-v-6c566dde][data-v-6c566dde] {
  margin-left:100px;
  }
}
</style>
