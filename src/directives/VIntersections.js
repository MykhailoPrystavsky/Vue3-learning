export default{
    mounted(el, binding){
       
    
        // цей код відповідає за пересічееня якгось об'єкта певної межі
          const options = {
              rootMargin: "0px",
              threshold: 1.0,
            };
            const callback = (entries, observer) => {
              /* Content excerpted, show below */
              if(entries[0].isIntersecting ){
                binding.value()
              }
        
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(el)
    },
    name:'intersection'
}