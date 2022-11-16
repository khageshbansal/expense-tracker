async function login(e){
    if(e.target.tagName=='BUTTON'){
        let form= e.target.parentElement;
                let obj={
                    email: form.email.value,
                    password: form.password.value
                };
                
           let res= await axios.post('http://localhost:3000/user/login',obj);
           if(res.data.success==true)alert(res.data.message);
           else alert(res.data.message);
            }
}

async function signup(e){
    if(e.target.tagName=='BUTTON'){
let form= e.target.parentElement;
        let obj={
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        };
       
        
   let res= await axios.post('http://localhost:3000/user/signup',obj);
   console.log(res);
    }
}