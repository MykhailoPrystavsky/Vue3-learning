// створюємо глобальне сховище
import { createStore } from "vuex"
import { postModule } from "@/store/postModule"

// export default createStore({
//     state:{
//         //стан тут ми описуємо дані які будуть в нашому додатку
        
//         likes:2,
//         isAuth: false,
    
//     },
//     getters:{
//         // деякі computed властивості вираховуюмі значення  змінити стан на пряму ми неможемо але можемо змінувати за допомогою мутації
    
        
//         doubleLikes(state){
//             return state.likes*2
//         }
    
//     },
//     mutations:{
//         // ф-ції  в середині яких ми змінюємо значення  певного поля в стані
    
//         incrementLikes(state){
//             state.likes +=1;
//         },
//         decrementLikes(state){
//             state.likes -=1;
//         }
        
//     },
//     actions:{
//         //ф-ції які в середині себе використовують мутації тут ми робимо  сайт ефекти наприклад отримуєму дані з сервера, викликаємо мутацію і зберігаємо ці дані в стані
//     },
//     modules:{
//         //   пердставляє з себе  ізольвану частинку зі своїми  гетерема , мутаціями і екшинами , всі ці модуль піключаються в один глобальний стор
//     }
// })

export default createStore({
    state:{
        isAuth: false,
    },
    modules:{
        post: postModule
    }

})