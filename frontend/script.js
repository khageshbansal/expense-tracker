async function login(e){
    if(e.target.tagName=='BUTTON'){
        let form= e.target.parentElement;
                let obj={
                    email: form.email.value,
                    password: form.password.value
                };
                
           let res= await axios.post('http://localhost:3000/user/login',obj);
           if(res.data.success==true){ alert(res.data.message); 
            window.location.replace("file:///C:/Users/Dell/Desktop/sharpner/expense%20tracker/frontend/expense.html"); }
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
   alert('user created successfully');
  
    }
}






// function to run when page loads
(function () {
    listItems();
  })();
  
  async function listItems() {
    let res = await axios.get("http://localhost:3000/expense");
    let items = res.data;
    var list = "";
    for (var i in items) {
      list += `<li class="list-group-item"> ${items[i].amount} / ${items[i].description} / ${items[i].category}
      
  <button type="button" class="btn btn-success btn-sm" onclick='editItem("${items[i].id}")' >Edit</button>
  <button type="button" class="btn btn-danger btn-sm" onclick='deleteItem("${items[i].id}")' >Delete</button>
  </li>`;
    }
    document.querySelector("#ul").innerHTML = list;
  }
  
  async function addItem() {
    var amount = document.querySelector("#amount");
    var description = document.querySelector("#description");
    var category = document.getElementById("category");
  
    if (amount.value === "" || description.value === "" || category.value === "")
      return alert("Enter all values");
  
    let obj = {
      amount: amount.value,
      description: description.value,
      category: category.value,
    };
  
    await axios.post("http://localhost:3000/expense", obj);
    listItems();
  
    // clear input box
    amount.value = "";
    description.value = "";
    category.value = "";
  }
  
  async function deleteItem(index) {
    await axios.delete(`http://localhost:3000/expense/${index}`);
    listItems();
  }
  
  async function editItem(index) {
    var amount = document.querySelector("#amount");
    var description = document.querySelector("#description");
    var category = document.getElementById("category");
  
    let res = await axios.get(`http://localhost:3000/expense/${index}`);
  
    amount.value = res.data.amount;
    description.value = res.data.description;
    category.value = res.data.category;
  
    deleteItem(index);
  }
  