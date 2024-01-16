<template>
    <div class="modal-overlay">
      <div class="modal">
        <p>Are you sure to proceed?</p>
        <button @click="onConfirm" style="margin-right: 30px;">Confirm</button>
        <button @click="onCancel">Cancel</button>
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    onConfirm: Function,
    onCancel: Function,
  },
  methods: {
  },
};
</script>

<style scoped>
/* Add your modal styles here */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>