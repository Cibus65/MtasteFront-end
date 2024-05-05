<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Результаты поиска</h4>
        <button type="button" class="close" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <div v-if="results.length > 0" class="card-container">
          <div v-for="(result, index) in results" :key="index" class="card">
            <img :src="img__error" alt="Изображение блюда">
            <h3>{{ result.name }}</h3>
            <button @click="openRecipeModal(result)">Готовить</button>
          </div>
        </div>
        <div v-else>
          <p>Ничего по вашему запросу не найдено</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img__error from '@/assets/img/img_error.jpg'; // Путь к изображению ошибки

export default {
  props: {
    show: Boolean,
    results: Array,
  },
  data() {
    return {
      img__error: img__error, // Импортированное изображение ошибки
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    openRecipeModal(card) {
      this.$emit('openRecipeModal', card);
    },
  },
};
</script>

<style scoped>
.modal {
  display: block;
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
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px; /* Максимальная ширина модального окна */
  box-sizing: border-box; /* Включаем box-sizing для правильного расчета ширины */
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box; /* Включаем box-sizing для правильного расчета ширины */
  flex: 1 0 100%; /* Разрешаем карточке занимать всю ширину контейнера */
}

.card img {
  max-width: 100%;
  height: auto;
}

.card h3 {
  margin: 10px 0;
  text-align: center;
}

.card button {
  padding: 5px 10px;
  border: none;
  background-color: #007BFF;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.card button:hover {
  background-color: #0056b3;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.modal-title {
  margin: 0;
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.modal-body {
  padding-top: 10px;
}

@media (min-width: 600px) {
  .card {
    flex: 1 0 48%; /* Разрешаем карточке занимать половину ширины контейнера */
  }
}
</style>