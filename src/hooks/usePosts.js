// // після того як компонент буде вмонтований виконується ф ція fetching
// import { onMounted, ref, watch } from "vue";
// import axios from "axios";

// export  function usePosts(limit){

// //реактивна змінна
//     const posts = ref([])
//     const totalPages = ref(0)
//     const isPostsLoading = ref(true)

//     const fetching = async() => {
//         try {        
//             const response = await axios.get(
//               "https://jsonplaceholder.typicode.com/posts",
//               {
//                 params: {
//                   _page:1,
//                   _limit: limit,
//                 },
//               }
//             );
//             totalPages.value = Math.ceil(
//               response.headers["x-total-count"] / limit
//             );
//             posts.value = response.data;
//           } catch (e) {
//             alert("Error");
//           } finally {
//             isPostsLoaning.value = false;
//           }
//     }     


//     // після того як компонент буде вмонтований виконується ф ція fetching
//     onMounted(fetching)
//     return{
//         posts, isPostsLoading, totalPages
//     }



//     // onCreated()
//     // computed() 
//     // watch() 
// }
 

import axios from "axios";
import {ref, onMounted} from 'vue';

export function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostsLoading = ref(true)
    const fetching = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: 1,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = response.data;
        } catch (e) {
            alert('Ошибка')
        } finally {
            isPostsLoading.value = false;
        }
    }

    onMounted(fetching)

    return {
        posts, isPostsLoading, totalPages
    }
}