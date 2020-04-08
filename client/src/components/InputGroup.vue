<template>
    <div class="input_group">
        <label :for="name">{{label}}</label>
        <input 
          :type="type"
          :value="value"
          :placeholder="placeholder"
          :name='name'
          @input="$emit('input', $event.target.value)" />
    </div>
</template>

<script>
export default {
  name: "input_group",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    label: String
  }
};
</script>

<style scoped>
.input_group {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 0;
  line-height: 60px;
}
.input_group label {
  display: inline-block;
  width: 30%;
  font-size: 16px;
}
.input_group input {
  display: inline-block;
  width: 65%;
  font-size: 16px;
  border: none;
  outline: none;
}
</style>