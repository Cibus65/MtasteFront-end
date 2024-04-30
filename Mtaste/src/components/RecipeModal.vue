<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <h2>{{ card.name }}</h2>
      <img :src="card.img" alt="Изображение блюда">
      <p v-if="card.description">{{ card.description }}</p>
      <button @click="closeModal">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    card: Object
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.modal-content {
  position: fixed;
  background: white;
  width: 80%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
</style>