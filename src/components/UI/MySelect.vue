<template>
   <select :v-model="modelValue" @change="changeOption">
    <option disabled value="">Виберіть що небудь зі списку</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
   </select>
</template>

<script>
    export default {
        name: 'my-select',
        props:{
            modelValue: {
                type: String
            },
            options:{
                type: Array,
                default: () => [],   //пустий масив
            }
        },
        methods:{
            changeOption(event) {
                this.$emit('update:modelValue', event.target.value )
            }
        }
        
    }
</script>


<style scoped>

</style>