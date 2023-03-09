<template>
  <form @submit.prevent>
    <h4>Створення банера</h4>
    <my-input  
    v-focus
     v-model="post.title" 
     type="text" 
     placeholder="Назва" />
    <my-input v-model="post.body"  type="text" placeholder="Опис" />
    <my-button style="align-self:flex-end; margin-top:15px" @click="createPost">Створити</my-button>
  </form>
</template>

<script>
import MyButton from './UI/MyButton.vue';

export default {
  components: { MyButton },
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id= Date.now();
      this.$emit('create', this.post );
      this.post={
        title: '',
        body: ''
      }
    },
  },
  // watch: {
  //     post:{
  //       handler(newValue){
  //         console.log(newValue);
  //       },
  //       deep:true
  //     }
  //   },  
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}




</style>
