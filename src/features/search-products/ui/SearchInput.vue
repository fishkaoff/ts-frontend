<template>
  <input
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
    class="search-input"
  />
</template>

<script setup lang="ts">
defineProps<{
  placeholder: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped lang="scss">
.search-input {
  outline: none;
  border: none;

  width: 100%;
  padding: 15px;

  background-color: transparent;
  border: 1px solid variables.$color-accent;
  border-radius: 7px;

  @include mixins.text(18px);
}
</style>
