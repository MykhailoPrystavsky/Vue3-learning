<template>
    <div >

            <!-- <h1>{{ $store.state.isAuth ? "user is logged in" : "please log in"}}</h1>
      <h1>{{$store.getters.doubleLikes}}</h1>
      <div>
        <my-button @click="$store.commit('incrementLikes')">Likes</my-button>
        <my-button @click="$store.commit('decrementLikes')">DisLikes</my-button>
      </div> -->



      

      <h1>Сторінка з постами</h1>
      <my-input v-focus :model-value="searchQuery"  @click:model-value ="setSearchQuery" />
      <div class="app__btns">
        <my-button @click="showDialog">Створити користувача</my-button>
        <my-select :model-value="selectedSort"
        @update:model-value="setSelectedSort" 
        :options="sortOptions" />
      </div>
  
      <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost" />
      </my-dialog>
  
      <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoaning"
      />
      <div v-else>Йде завантаження...</div>
  
  

      <div v-intersection="loadMorePosts" class="observer"></div>


  
     
    </div>
  </template> 
  
  <script>
  import PostForm from "@/components/PostForm";
  import PostList from "@/components/PostList";
  import MyButton from "@/components/UI/MyButton";
  import MySelect from "@/components/UI/MySelect";
  import axios from "axios";
  import MyInput from "@/components/UI/MyInput";
  import {mapState,mapGetters, mapActions,mapMutations} from'vuex'
  
  // import { is } from "@babel/types";
  
  export default {
    components: {
      MySelect,
      PostForm,
      PostList,
      MyButton,
      MyInput,
    },
  
    data() {
      return {
        dialogVisible: false,
      
      };
    },
    methods: {
      //робота з мутаціями і екшинами
      
      ...mapMutations({
        setPage:'post/setPage',
        setSearchQuery:'post/setSearchQuery',
        setSelectedSort:'post/setSelectedSort'
      }),
      ...mapActions({
        //тут ми вказуємо які екшини і які мутації нам потрібні
        loadMorePosts:'post/loadMorePosts',
        fetchPosts:'post/fetchPosts'
      }),




      createPost(post) {
        this.posts.push(post);
        this.dialogVisible = false;
      },
      removePost(post) {
        this.posts = this.posts.filter((p) => p.id !== post.id);
      },
      showDialog() {
        this.dialogVisible = true;
      },
  
  },
  
    mounted() {
    this.fetchPosts();
    },
  
  

  



//мапінг стану і гетерів
computed:{
  ...mapState({
        posts: state=> state.post.posts,
        isPostsLoaning: state=> state.post.isPostsLoaning,
        selectedSort:state=> state.post.selectedSort, 
        searchQuery: state=> state.post.searchQuery,
        page:state=> state.post.page,
        limit: state=> state.post.limit,
        totalPages:state=> state.post.totalPages,
        sortOptions: state=> state.post.sortOptions,
  }),
  ...mapGetters({
    sortedPosts:'post/sortedPosts',
    sortedAndSearchedPosts:'post/sortedAndSearchedPosts',
  }),
}
    
  }
  </script>
  
  <style>

  .app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
  
  .page__wrapper {
    margin-top: 15px;
    display: flex;
  }
  
  .page {
    border: 1px solid black;
    padding: 10px;
  }
  
  .current-page {
    border: 2px solid teal;
  }
  
  .observer {
    height: 30px;
    background: tomato;
  }
  </style>
  
