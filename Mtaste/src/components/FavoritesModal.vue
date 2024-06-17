<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Избранное</h2>
      <div v-if="favoritesRecipes.length > 0" class="card-container">
        <div v-for="(card, index) in favoritesRecipes" :key="index" class="card">
          <img class="card_img" :src="card.imgwindowurl" alt="Изображение блюда">
          <h3>{{ card.name }}</h3>
          <div class="ingrid_btn">
            <button class="btn btn-outline-secondary favorite-btn" @click="toggleFavorite(card)" :class="{ favorited: card.isFavorite }">
              <i class="fas" :class="card.isFavorite ? 'fa-heart' : 'fa-heart-broken'"></i>
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
    toggleFavorite: Function,
    openIngredientsModal: Function,
    openRecipeModal: Function,
    favoriteRecipes: {
      type: Array,
      default: () => []
    },
    cards: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      favoritesRecipes: [],
      userID: localStorage.getItem('userID') || ''
    };
  },
  watch: {
    show(newValue) {
      if (newValue) {
        this.fetchFavouriteRecipes();
      }
    },
    favoriteRecipes: {
      handler(newVal) {
        this.favoritesRecipes = newVal.map(id => this.cards.find(card => card.id === id));
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    updateFavorites(newFavorites) {
      this.favoritesRecipes = this.cards.filter(card => newFavorites.includes(card.id)).map(card => ({
        ...card,
        isFavorite: true
      }));
    },
    openRecipeModal(card) {
      this.$emit('open-recipe', card);
    },
    fetchFavouriteRecipes() {
      const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8082';
      const url = `${baseURL}/Mtaste/API/user/getFavouriteRecipes/${this.userID}`;

      axios.get(url)
        .then(response => {
          if (response.status === 200) {
            const recipes = response.data.recipes;
            if (Array.isArray(recipes)) {
              this.favoritesRecipes = recipes.map(recipe => ({
                name: recipe.name,
                imgwindowurl: recipe.imgwindowurl,
                id: recipe.ID
              }));
            } else {
              console.error('Ожидался массив рецептов, но получен другой тип данных:', recipes);
            }
          } else {
            console.error('Ошибка при получении избранных рецептов:', response.status);
          }
        })
        .catch(error => {
          console.error('Ошибка при получении избранных рецептов:', error);
        });
    }
  }
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

.card_img {
  width: 100%;
  height: 80%;
  border-bottom: 1px solid #818181;
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

.card {
  padding-bottom: 5px;
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

.ingrid_btn {
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
  margin-left: 50px;
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
  margin-left: 230px;
  margin-right: 5px;
}

.cook-btn {
  width: 150px;
  height: 40px;
  box-shadow: 5px 5px 5px 1.5px rgb(221, 221, 221);
}

@media (max-width:1420px){
  .ingredients-btn {
    margin-left: 140px;
  }
}

@media (max-width:1250px){
  .ingredients-btn {
    margin-left: 50px;
  }
}

@media (max-width: 1000px) {
  .ingredients-btn {
    margin-left: 50px;
  }
}

@media (max-width: 900px) {
  .modal-content {
    width: 90%;
  }

  .card {
    width: calc(100% - 20px); /* Одна карточка в ряд */
  }

  .cook-btn {
    width: 100px;
  }

  .ingredients-btn {
    margin-left: 10px;
  }
}

@media (max-width:960px){
  .ingredients-btn {
    margin-left: 30px;
  }
}
@media (max-width:912px){
  .ingredients-btn {
    margin-left: 20px;
  }
}
@media (max-width:853px) {
    .ingredients-btn {
        margin-left: 300px;
    }
    .cook-btn {
        width: 150px;
    }
    .ingrid_btn {
    display: flex;
    margin-top: 15px;
    margin-bottom: 20px;
  }
}
@media (max-width:820px){
  .ingredients-btn {
        margin-left: 300px;
    }
    .cook-btn {
        width: 150px;
    }
    .ingrid_btn {
    display: flex;
    margin-top: 15px;
    margin-bottom: 20px;
  }
}
@media (max-width:800px) {
  .ingredients-btn {
    margin-left: 25px;
  }
}
@media (max-width: 768px){
  .ingredients-btn {
        margin-left: 300px;
    }
    .cook-btn {
        width: 150px;
    }
    .ingrid_btn {
    display: flex;
    margin-top: 15px;
    margin-bottom: 20px;
  }
}
@media (max-width: 540px){
  .ingredients-btn {
        margin-left: 150px;
    }
}
@media (max-width: 430px){
  .ingredients-btn {
        margin-left: 80px;
    }
}
@media (max-width: 414px){
  .ingredients-btn {
        margin-left: 60px;
    }
}
@media (max-width: 412px){
  .ingredients-btn {
        margin-left: 70px;
    }
}
@media (max-width: 390px){
  .ingredients-btn {
        margin-left: 50px;
    }
}
@media (max-width: 375px){
  .ingredients-btn {
        margin-left: 30px;
    }
    .favorite-btn {
    color: #fff;
    background-color: #9f0101;
    max-width: 44px;
    max-height: 40px;
    align-items: center;
    border-color: #9f0101;
    margin-left: 30px;
}
}
@media (max-width: 360px){
  .ingredients-btn {
        margin-left: 30px;
    }
    .favorite-btn {
    color: #fff;
    background-color: #9f0101;
    max-width: 44px;
    max-height: 40px;
    align-items: center;
    border-color: #9f0101;
    margin-left: 20px;
}
}
@media (max-width:344px){
  .ingredients-btn {
        margin-left: 10px;
    }
    .favorite-btn {
    color: #fff;
    background-color: #9f0101;
    max-width: 44px;
    max-height: 40px;
    align-items: center;
    border-color: #9f0101;
    margin-left: 30px;
}
}
</style>
