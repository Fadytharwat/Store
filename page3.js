// page3.js

// دالة لإضافة منتج إلى السلة
function goToCheckout(productName, price, image) {
    // الحصول على السلة من التخزين المحلي
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // البحث عن المنتج في السلة بناءً على الاسم والصورة
    let productIndex = cart.findIndex(item => item.name === productName && item.image === image);

    if (productIndex > -1) {
        // إذا كان المنتج موجودًا، قم بزيادة الكمية
        cart[productIndex].quantity += 1;
    } else {
        // إذا لم يكن المنتج موجودًا، أضفه إلى السلة
        cart.push({ name: productName, price: price, image: image, quantity: 1 });
    }

    // تخزين السلة المعدلة في التخزين المحلي
    localStorage.setItem('cart', JSON.stringify(cart));

    // تحديث عدد المنتجات في السلة
    updateCartCount();
}

// دالة لتحديث عدد المنتجات في السلة
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// دالة لعرض محتويات السلة عند تحميل الصفحة
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = ''; // مسح المحتوى الحالي

    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>سعر: ${item.price} $</p>
                <p>الكمية: ${item.quantity}</p>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// تنفيذ التحديث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (window.location.href.includes('cart.html')) {
        displayCart();
    }
});
