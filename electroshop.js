const block = document.querySelector('.textContent');
const count = document.querySelector('.count');
const spanCounts = document.querySelector('.spanCounts');


function quntityPrice() {
   let total = data.reduce((pre, item) => {
       return pre + parseInt(item.price.replace(/\s/g, ''), 10) * item.quantity;
   },0)

   let totalPrice = total.toLocaleString('ru-RU', {
      style: `currency`,
      currency: `RUB`,
      minimumFractionDigits: 0
   })

   count.textContent = `${totalPrice}`;
}

function renderCart() {
      block.innerHTML = ``;
      spanCounts.textContent = data.length;

      if(data.length <= 0) {
         let span = document.createElement('span');
         span.setAttribute('class', 'spanTitle');
         span.textContent = `Пусто!!!`;
         block.append(span);
      }
      
   data.forEach((item, index) => {
     let {id, name, price, image, quantity = 1} = item;
     let numbPrice = parseInt(price.replace(/\s/g, ''), 10);
     let quntityPrice = numbPrice * quantity;
     let stringPrice = quntityPrice.toLocaleString('ru-RU', {
      style: `currency`,
      currency: `RUB`,
      minimumFractionDigits: 0
     });
     
     let newcart = document.createElement('div');
     newcart.setAttribute('class', 'newcart');
     newcart.innerHTML = `
     <img class="productImg" src="${image}">
     <p class="title">${name}<p/>
     <span class="price">${stringPrice}</span>
     <div class="quntity">
     <span data-index="${index}" class="btMinus">-</span>
     <input type="text" value="${quantity}">
     <span data-index="${index}" class="btPlus">+</span>
     </div>
     <button data-index="${index}" class="closed">X</button>
     `
     block.append(newcart);

}) 

quntityPrice();

}

block.addEventListener('click', (e) => {
   const index = e.target.dataset.index;
   if(e.target.classList.contains('btPlus')) {
     data[index].quantity++;
   }
   else if(e.target.classList.contains('btMinus')) {
     data[index].quantity--;
     if(data[index].quantity <= 0) {
       data.splice(index, 1);
     }
   }

   renderCart();
});

renderCart();


                  // Удаление товаров

block.onclick = (e) => {
   const position = e.target.getAttribute('data-index');
   if(e.target.classList.contains('closed') && position !== null) {
      data.splice(position, 1);
   }
   renderCart();
}


