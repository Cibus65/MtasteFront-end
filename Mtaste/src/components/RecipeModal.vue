<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>{{ card.name }}</h2>
      <h3>Ингредиенты</h3>
      <p v-html="formattedIngredients"></p>
      <h3>Рецепт</h3>
      <p v-html="formattedDescription"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    card: Object
  },
  computed: {
    formattedIngredients() {
      if (!this.card.ingredients) return '';
      return Object.entries(this.card.ingredients)
          .map(([ingredient, amount]) => `<strong>${ingredient}:</strong> ${amount}`)
          .join('<br>');
    },
    formattedDescription() {
      if (!this.card.description) return '';
      if (typeof this.card.description === 'object') {
        return Object.entries(this.card.description)
            .map(([step, text]) => `<strong>${step}.</strong> ${text}`)
            .join('<br>');
      }
      return this.card.description;
    }
  }
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
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

p {
  color: #666;
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
</style>