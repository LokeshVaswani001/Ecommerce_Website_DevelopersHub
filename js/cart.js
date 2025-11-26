function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" value="${item.quantity}" min="1" readonly>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartSummary();
}

let appliedDiscount = 0;

function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discountAmount = subtotal * appliedDiscount;
    const subtotalAfterDiscount = subtotal - discountAmount;
    const shipping = subtotalAfterDiscount > 100 ? 0 : 15;
    const tax = subtotalAfterDiscount * 0.1;
    const total = subtotalAfterDiscount + shipping + tax;
    
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.getElementById('itemCount').textContent = itemCount;
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    if (appliedDiscount > 0) {
        const discountRow = document.querySelector('.discount-row');
        if (!discountRow) {
            const shippingRow = document.querySelector('.summary-row:nth-child(2)');
            const newRow = document.createElement('div');
            newRow.className = 'summary-row discount-row';
            newRow.innerHTML = `
                <span>Discount (${(appliedDiscount * 100).toFixed(0)}%):</span>
                <span style="color: #198754;">-$${discountAmount.toFixed(2)}</span>
            `;
            shippingRow.insertAdjacentElement('afterend', newRow);
        } else {
            discountRow.innerHTML = `
                <span>Discount (${(appliedDiscount * 100).toFixed(0)}%):</span>
                <span style="color: #198754;">-$${discountAmount.toFixed(2)}</span>
            `;
        }
    }
}

function applyPromo() {
    const promoInput = document.getElementById('promoInput');
    const promoCode = promoInput.value.toUpperCase();
    
    if (promoCode === 'SAVE10') {
        appliedDiscount = 0.10;
        updateCartSummary();
        showNotification('Promo code applied! 10% discount added.');
        promoInput.value = '';
        promoInput.disabled = true;
    } else if (promoCode === 'SAVE20') {
        appliedDiscount = 0.20;
        updateCartSummary();
        showNotification('Promo code applied! 20% discount added.');
        promoInput.value = '';
        promoInput.disabled = true;
    } else if (promoCode === '') {
        showNotification('Please enter a promo code.');
    } else {
        showNotification('Invalid promo code.');
    }
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
