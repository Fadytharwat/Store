let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = ''; 
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>سلة التسوق فارغة.</p>';
    } else {
        cart.forEach((item, index) => {
            const { image = '', name = 'اسم غير معروف', price = 0, size = 'غير محدد', quantity = 1 } = item;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${image}" alt="${name}">
                <div class="cart-item-details">
                    <h3>${name}</h3>
                    <p>السعر: ${price}$</p>
                    <p>المقاس: ${size}</p>
                    <div class="cart-item-quantity">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <span>${quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeItem(${index})">إزالة</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += price * quantity;
        });
    }

    cartTotal.innerText = `المجموع الكلي: ${total}$`;
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCart(); 
}

function checkout() {
    if (cart.length === 0) {
        alert('السلة فارغة، لا يمكنك إتمام الشراء.');
        return;
    }
    window.location.href = 'payment.html'; 
}
window.onload = updateCart;
