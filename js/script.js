let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = cartCount;
    });
}

function addToCart(id, name, price, image, quantity = 1) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: quantity
        });
    }
    
    saveCart();
    const qtyText = quantity > 1 ? `${quantity} x ` : '';
    showNotification(`${qtyText}${name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    if (typeof renderCart === 'function') {
        renderCart();
    }
}

function updateQuantity(id, newQuantity) {
    const item = cart.find(item => item.id === id);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        saveCart();
        if (typeof renderCart === 'function') {
            renderCart();
        }
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #198754;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainMenu = document.querySelector('.main-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mainMenu.classList.toggle('active');
    });
}

const wishlistBtns = document.querySelectorAll('.wishlist-btn, .wishlist-btn-large');
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('Added to wishlist!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('Removed from wishlist!');
        }
    });
});

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        showNotification('Thank you for subscribing!');
        newsletterForm.reset();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
        loadCart();
    }
});
