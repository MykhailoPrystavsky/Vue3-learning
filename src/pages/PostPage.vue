<template>
    <div >
      <h1>Сторінка з постами</h1>
      <my-input v-focus v-model="searchQuery" placeholder="Search..." />
      <div class="app__btns">
        <my-button @click="showDialog">Створити користувача</my-button>
        <my-select v-model="selectedSort" :options="sortOptions" />
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
  
      <!--динамічна навігація  -->
      <!-- <div ref="observer" class="observer"></div> -->
  
      <!--  -->

      <div v-intersection="loadMorePosts" class="observer"></div>


  
      <!-- <div class="page__wrapper">
        <div  
         v-for="pageNumber in totalPages" 
         :key="pageNumber" 
         class="page"  
         :class="{
          'current-page':page === pageNumber
         }"
         @click="changePage(pageNumber)"
         >
         {{ pageNumber }}
       </div>
      </div>  -->
    </div>
  </template> 
  
  <script>
  import PostForm from "@/components/PostForm";
  import PostList from "@/components/PostList";
  import MyButton from "@/components/UI/MyButton";
  import MySelect from "@/components/UI/MySelect";
  import axios from "axios";
  import MyInput from "@/components/UI/MyInput";
  
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
        posts: [],
        dialogVisible: false,
        isPostsLoaning: false,
        selectedSort: "",
        searchQuery: "",
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
          { value: "title", name: "За назвою" },
          { value: "body", name: "За вмістом" },
        ],
      };
    },
    methods: {
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
      // changePage(pageNumber){
      //   this.page = pageNumber
  
      // },
      async fetchPosts() {
        try {
          //Індикатор завантаження
          // this.isPostsLoaning = true;
          //   setTimeout( async() => {
          //     const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
          //     this.posts=response.data;
          //     this.isPostsLoaning = false;
          //    }, 1000);
  
          this.isPostsLoaning = true;
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPages = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          this.posts = response.data;
        } catch (e) {
          alert("Error");
        } finally {
          this.isPostsLoaning = false;
        }
      },
  
  
      // Нескінченна стріча
      async loadMorePosts() {
        try {
          this.page += 1;
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPages = Math.ceil(
            response.headers["x-total-count"] / this.limit
          );
          // додаємо пости в кінець масиву
          this.posts = [...this.posts, ...response.data];
        } catch (e) {
          alert("Error");
        }
      },
    },
  
    mounted() {
      this.fetchPosts();
      console.log(this.$refs.observer);
      //  const options = {
      //   rootMargin: "0px",
      //   threshold: 1.0,
      // };
      // const callback = (entries, observer) => {
      //   /* Content excerpted, show below */
      //   if(entries[0].isIntersecting && this.page < this.totalPages){
      //     this.loadMorePosts()
      //   }
  
      // };
      // const observer = new IntersectionObserver(callback, options);
      // observer.observe(this.$refs.observer)
    },
  
  
    //сортування масиву
    computed: {
      sortedPosts() {
        return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        );
      },
      sortedAndSearchedPosts() {
        return this.sortedPosts.filter((post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
  
    // watch:{
    //   selectedSort(newValue){
    //     this.posts.sort((post1,post2)=>{
    //       return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
    //     })
    //   },
    // }
  
    //Функція що спостерігає за зміною сторінки
  
    // watch:{
    //   page(){
    //     this.fetchPosts()
    //   }
    // }
  };
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
  
  //single file comment
  