

// function to run when page loads
(function () {
    listItems();
    user();
  })();

 async function user(){
    let res = await axios.get("http://localhost:3000/loggedInUser", {headers: {Authorization: localStorage.getItem('token') } } );

    document.querySelector("#user").innerHTML=`Hello <bold>${res.data.name}</bold>! Your Email Id is <bold>${res.data.email}</bold> 
    and userid is <bold>${res.data.id}</bold>. 
    <a onclick='localStorage.setItem("token","")' href='login.html' >click here </a>to logout`
  }
  
  async function listItems() {
    let res = await axios.get("http://localhost:3000/expense", {headers: {Authorization: localStorage.getItem('token') } } );
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
  
    await axios.post("http://localhost:3000/expense", obj, {headers: {Authorization: localStorage.getItem('token') } } );
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
  