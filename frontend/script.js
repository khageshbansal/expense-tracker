async function login(e){
    await axios.get('localhost:3000/user');
}

async function signup(e){
    if(e.target.tagName=='BUTTON'){
let form= e.target.parentElement;
        let obj={
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        };
        
   let res= await axios.post('http://localhost:3000/user',obj);
   console.log(res);
    }
}