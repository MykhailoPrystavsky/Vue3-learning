<template>
    <div v-if="posts.length>0">
      <h3>Список користувачів</h3>
      <transition-group name="post-list">
        <post-item 
        :post="post"
        v-for="post in posts" 
        :key="post.id"
        @remove="$emit('remove', post)"
      />        
      </transition-group>

    </div>
    <h2 v-else style="color: red">
      Список постів пустий
    </h2>
  
</template>

<script>
import PostItem from './PostItem.vue'

    export default {
  components: { PostItem },
   
      props:{
        posts:{
          type:Array,
          required:true 
        }
      }
        
    }
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, 
.post-list-leave-active {
  transition: all 0.7s;
}
.post-list-enter, .post-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: transform 0.8s ease;
}
</style>