<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>{{ card.name }}</h2>
      <img :src="card.imgwindowurl" alt="Изображение блюда" class="img_modal">


      <div class="accordion" >
        <div class="accordion-item">
          <div class="accordion-header" @click="toggleDetails('ingredients')" >
            Ингредиенты
          </div>
          <div class="accordion-content" :class="{ 'is-open': isIngredientsOpen }"  >
            <div class="ingredients">
              <div v-for="(amount, ingredient) in card.ingredients" :key="ingredient">
                <strong>{{ ingredient }}:</strong> {{ amount }}
              </div>
            </div>
          </div>
        </div>
        <div v-for="(step, index) in card.description" :key="index"  class="accordion-item" >
          <div class="accordion-header" @click="toggleDetails('description', index)" >
            Шаг {{ index }}
          </div>
          <div class="accordion-content" :class="{ 'is-open': openedDescriptionIndex === index }">
            <div class="description" v-text="step"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>




export default {
  props: {
    show: Boolean,
    card: Object
  },
  data() {
    return {
      isIngredientsOpen: false,
      openedDescriptionIndex: null
    };
  },
  methods: {
    toggleDetails(detailType, index) {
      if (detailType === 'ingredients') {
        this.isIngredientsOpen = !this.isIngredientsOpen;
      } else if (detailType === 'description') {
        this.openedDescriptionIndex = this.openedDescriptionIndex === index ? null : index;
      }
    }
  }
};
</script>

<style scoped>
.accordion {
  
  border-radius: 4px;
}

.accordion-item {
  margin-top: 10px;
  margin-bottom: 12px;
}


.accordion-header {
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 2px 20px 2px rgba(3, 97, 75, 0.466);
}

.accordion-content {
  padding: 10px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
}
.accordion-content.is-open {
  max-height: 500px;
  transition: max-height 0.4s ease-in;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4); /* Чуть прозрачнее, чтобы контент под ним был видимым */
}

.modal-content {
  background-color: #ffffff;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 900px;
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
  margin-bottom: 20px;
 
}

p {
  color: #666;
}
@media screen and (max-width: 600px) {
  .modal-content {
    width: 90%;
  }
}
@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
    transition: opacity 1.5s;
  }
}
details {
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

summary {
  padding: 10px;
  cursor: pointer;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
}

.ingredients,
.description {
  padding: 10px;
  
}

.img_modal{
  border-radius: 7px;
  margin-bottom: 20px;
  max-height: 350px;
  max-width:calc(50%);
}






</style>