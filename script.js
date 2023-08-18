const btnCart=document.querySelector('#toCart');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('.close-btn');
const buynow=document.querySelector('.buy-now')

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active')
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
});


document.addEventListener('DOMContentLoaded',addcart);

function addcart(){
    loadcontent();
}

function loadcontent(){
    // to remove items from cart
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeitem);
    })

    // product
    let qtyelement=document.querySelectorAll('.cart-quantity');
    qtyelement.forEach((input)=>{
        input.addEventListener('change', changeQty);
    })


    // product to cart
    let btnaddcart=document.querySelectorAll('.add-to-cart');
    console.log(btnaddcart)
    btnaddcart.forEach((btn)=>{
        btn.addEventListener('click', addtoCart);
    })

    updatetotal();

}

// remove
function removeitem(){
    if(confirm("Are you Sure to remove this item from cart ?"));
    let title=this.parentElement.querySelector('.cart-book-title').innerHTML;
    itemlist=itemlist.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadcontent();
}

//  change quantity

function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }

    loadcontent();
}

let itemlist=[];

//  add to cart

function addtoCart(){
  let book=this.parentElement.parentElement;
  let title=book.querySelector('.card-title').innerHTML;
  let price=book.querySelector('.card-price').innerHTML;
  let img=book.querySelector('.card-img-top').src;
//   console.log(title,price,img);

let newproductel={title,price,img}

// condition to check if product exist or not

if(itemlist.find((el)=>el.title == newproductel.title))
{
    alert("This book is already added to your cart");
    return
}else{
    itemlist.push(newproductel)
}


let newproduct=createcart(title,price,img);

let element=document.createElement('div')

element.innerHTML=newproduct;

let cartbasket=document.querySelector('.cart-content');
cartbasket.append(element)
loadcontent();

}


function createcart(title,price,img){

    return `
    <div class="cart-box">
    <img src="${img}" class="cart-img">
    <div class="detail-box">
      <div class="cart-book-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="1" id="cart-quantity" class="cart-quantity">
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" class="cart-remove"  width="15" height="15" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
    </svg>
  </div>
    `
}

function updatetotal(){

    const cartItems=document.querySelectorAll('.cart-box');
    const totalvalue=document.querySelector('.total-price');

    let total=0;

    cartItems.forEach(products=>{
        let bookPrice=products.querySelector('.cart-price')
        let price=parseFloat(bookPrice.innerHTML.replace("₹",""));
        let qty=products.querySelector('.cart-quantity').value;

        total+=(price*qty)

        products.querySelector('.cart-amt').innerText="₹" +price*qty;
    });

    totalvalue.innerHTML="₹ "+ total;

}