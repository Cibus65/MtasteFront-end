<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Избранное</h2>
      <div v-if="favoritesRecipes.length > 0" class="card-container">
        <div v-for="(card, index) in favoritesRecipes" :key="index" class="card">
          <img class="card-img" :src="card.imgwindowurl" alt="Изображение блюда">
          <h3>{{ card.name }}</h3>
          <div class="ingrid-btn">
            <button class="btn btn-outline-secondary favorite-btn" @click="toggleFavorite(card)"
                    :class="{ 'favorited': card.isFavorite }">
              <i class="fas" :class="{ 'fa-heart-broken': !card.isFavorite, 'fa-heart': card.isFavorite }"></i>
            </button>
            <button class="btn btn-outline-secondary ingredients-btn" @click="openIngredientsModal(card)">
              <i class="fas fa-utensils"></i>
            </button>
            <button class="btn btn-outline-secondary cook-btn" @click="openRecipeModal(card)">Готовить</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Нет избранных рецептов</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  emits: ['close'],
  props: {
    show: Boolean,
    favoritesRecipes: Array,
    cards: Array,
    toggleFavorite: Function,
    openIngredientsModal: Function,
    openRecipeModal: Function,
  },
  data() {
    return {
      userID: localStorage.getItem('userID') || '',
    };
  },
  watch: {
    show(newValue) {
      if (newValue) {
        this.fetchFavouriteRecipes();
      }
    },
  },
  methods: {
    async fetchFavouriteRecipes() {
      const baseURL = "http://80.78.242.57:8082";
      const url = `${baseURL}/Mtaste/API/user/getFavouriteRecipes/${this.userID}`;

      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const recipes = response.data.recipes;
          if (Array.isArray(recipes)) {
            this.updateFavorites(recipes);
          } else {
            console.error('Ожидался массив рецептов, но получен другой тип данных:', recipes);
          }
        } else {
          console.error('Ошибка при получении избранных рецептов:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении избранных рецептов:', error);
      }
    },
    updateFavorites(newFavorites) {
      this.favoritesRecipes = this.cards.filter(card => newFavorites.includes(card.id)).map(card => ({
        ...card,
        isFavorite: true,
      }));
    },
    openRecipeModal(card) {
      this.$emit('open-recipe', card);
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
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

.card {
  padding-bottom: 5px;
  border: 1px solid #6e6e6e;
  border-radius: 5px;
  text-align: center;
  box-shadow: 5px 5px 5px 1.5px rgb(206, 206, 206);
  width: calc(50% - 20px);
  margin: 10px;
}

.card h3 {
  margin-top: 15px;
  font-size: 18px;
}

.card-img {
  width: 100%;
  height: 80%;
  border-bottom: 1px solid #818181;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  object-fit: cover;
}

.ingrid-btn {
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
}

.btn {
  color: white;
  background-color: rgba(2, 96, 74, 1);
  border-color: rgba(2, 96, 74, 1);
  font-family: "Gilda Display", serif;
}

.btn:hover {
  background-color: rgb(1, 76, 59);
}

.btn:focus {
  box-shadow: 0 0 10px rgb(3, 97, 75);
}

.favorite-btn {
  color: #ffffff;
  background-color: #9f0101;
  max-width: 44px;
  max-height: 40px;
  align-items: center;
  border-color: #9f0101;
  margin-left: 40px;
}

.favorite-btn.favorited {
  background-color: rgb(236, 195, 1);
  border-color: rgb(218, 180, 0);
}

.favorite-btn.favorited:hover {
  background-color: rgb(236, 195, 1);
}

.favorite-btn:hover {
  background-color: #af0000;
}

.ingredients-btn {
  margin-left: 240px;
}

.cook-btn {
  text-align: center;
  width: 150px;
  height: 40px;
  box-shadow: 5px 5px 5px 1.5px rgb(221, 221, 221);
  margin-top: -110px;
  margin-left: 10px;
}

@media screen and (max-width: 600px) {
  .modal-content {
    width: 90%;
  }

  .card {
    width: calc(100% - 20px);
  }
}

@media (max-width: 800px) {
  .cook-btn {
    width: 100px;
    height: 40px;
    margin-left: 10px;
  }

  .ingredients-btn {
    margin-left: 25px;
  }
}

@media (max-width: 700px) {
  .favorite-btn {
    margin-left: 10px;
  }
}

@media (max-width: 640px) {
  .ingredients-btn {
    margin-left: 5px;
  }
}

@media (max-width: 450px) {
  .ingredients-btn {
    margin-left: 100px;
  }
}
</style>