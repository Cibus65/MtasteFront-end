<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Избранное</h2>
      <div v-if="favoritesRecipes.length > 0" class="card-container">
        <div v-for="(card, index) in favoritesRecipes" :key="index" class="card">
          <img class="card_img" :src="card.imgwindowurl" alt="Изображение блюда">
          <h3>{{ card.name }}</h3>
          <div class="btn_style">
            <button class="btn btn-outline-secondary enter__button" @click="openRecipeModal(card)">Готовить</button>
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
    userID: {
      type: Number,
      required: true
    },
    img__error: String,
  },
  data() {
    return {
      favoritesRecipes: [],
      userID: localStorage.getItem('userID') || '' // Получение userID из локального хранилища
    };
  },
  watch: {
    show(newValue) {
      if (newValue) {
        this.fetchFavouriteRecipes();
      }
    }
  },
  methods: {
    openRecipeModal(card) {
      this.$emit('open-recipe', card);
    },
    
    fetchFavouriteRecipes() {
      const url = `http://localhost:8082/Mtaste/API/user/getFavouriteRecipes/${this.userID}`;

      
      axios.get(url)
      .then(response => {
        if (response.status === 200) {
          // Извлекаем массив рецептов из ответа
          const recipes = response.data.recipes;
          // Проверяем, является ли recipes массивом
          if (Array.isArray(recipes)) {
            // Если recipes является массивом, то используем map для преобразования данных
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
  
  margin-left: 300px;
  width: 100px;
  margin-bottom: 15px;

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
  
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  max-height: 500px;
  
}

.card h3 {
  margin-top: 15px;
  font-size: 18px;
}

.card img {
  
  max-height: 700px;
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
</style>