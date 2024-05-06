<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>Результаты поиска</h2>
      <div v-if="searchResults.length > 0" class="card-container">
        <div v-for="(card, index) in searchResults" :key="index" class="card">
          <img :src="img__error" alt="Изображение блюда">
          <h3>{{ card.name }}</h3>
          <button @click="openRecipeModal(card)">Готовить</button>
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
    img__error: String
  },
  data() {
    return {
      searchResults: []
    };
  },
  methods: {
    openRecipeModal(card) {
      this.$emit('open-recipe', card);
    },
    searchRecipes(words) {
      axios.get(`http://localhost:8082/Mtaste/API/findRecipe/${words}`)
          .then(response => {
            this.searchResults = response.data.map(cardData => ({
              name: cardData.name,
              img: cardData.img,
              id: cardData.ID
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
  width: calc(50% - 20px); /* Уменьшаем ширину карточки, чтобы вместить две в ряд */
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