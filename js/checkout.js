function renderCheckoutSummary() {
    const summaryItems = document.getElementById('summaryItems');
    
    if (cart.length === 0) {
        summaryItems.innerHTML = '<div class="empty-summary"><p>No items in cart</p></div>';
        return;
    }
    
    summaryItems.innerHTML = '';
    
    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="summary-item-image">
            <div class="summary-item-details">
                <h4>${item.name}</h4>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        summaryItems.appendChild(summaryItem);
    });
    
    updateCheckoutTotals();
}

function updateCheckoutTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(checkoutForm);
        const data = Object.fromEntries(formData);
        
        console.log('Order submitted:', data);
        console.log('Cart:', cart);
        
        showNotification('Order placed successfully! Thank you for your purchase.');
        
        setTimeout(() => {
            cart = [];
            saveCart();
            window.location.href = 'index.html';
        }, 2000);
    });
}

const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
const cardDetails = document.getElementById('cardDetails');

paymentMethods.forEach(method => {
    method.addEventListener('change', (e) => {
        if (e.target.value === 'card') {
            cardDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutSummary();
});
