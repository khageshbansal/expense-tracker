
let token=localStorage.getItem('token');

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
console.log(res.data)
    if(res.data.ispremiumuser==true){
      document.body.style.background = "black";
      document.body.style.color = "white";
      document.querySelector('#buyPremium').innerHTML='Congrats You are a Premium User';
  }
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
  




  document.getElementById('rzp-button1').onclick = async function (e) {
    
    const response  = await axios.get('http://localhost:3000/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "9632698526"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}