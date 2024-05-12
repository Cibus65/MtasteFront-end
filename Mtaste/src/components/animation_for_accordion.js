

export default function() {
   
    document.querySelectorAll('.accordion').forEach((el) =>{
        el.addEventListener('click', () => {
            
            let content = el.nextElementSibling;
            

            if(content.style.opacity){
                document.querySelectorAll('.content').forEach((el) => el.style.opacity = null)
            } else{
                document.querySelectorAll('.content').forEach((el) => el.style.opacity = null)
                content.style.opacity = content.opacity + 1;
            }
        })
    })

    

}