const allProducts = [
    { id: 1, name: 'Smart Watch Pro', price: 299.99, oldPrice: 399.99, image: 'assets/tech/image 23.png', category: 'tech', rating: 4.0, isNew: false },
    { id: 2, name: 'Wireless Headphones', price: 199.99, oldPrice: null, image: 'assets/tech/image 29.png', category: 'tech', rating: 5.0, isNew: false },
    { id: 3, name: 'Designer Shirt', price: 89.99, oldPrice: 129.99, image: 'assets/alibaba/cloth/Bitmap.png', category: 'clothing', rating: 4.2, isNew: false },
    { id: 4, name: 'Modern Lamp', price: 149.99, oldPrice: null, image: 'assets/interior/image 93.png', category: 'interior', rating: 4.5, isNew: false },
    { id: 5, name: 'Latest Smartphone', price: 899.99, oldPrice: null, image: 'assets/tech/image 32.png', category: 'tech', rating: 4.8, isNew: true },
    { id: 6, name: 'Casual Wear Set', price: 79.99, oldPrice: 119.99, image: 'assets/alibaba/cloth/image 24.png', category: 'clothing', rating: 4.1, isNew: false },
    { id: 7, name: 'Decorative Vase', price: 59.99, oldPrice: null, image: 'assets/interior/1.png', category: 'interior', rating: 4.7, isNew: false },
    { id: 8, name: 'Tablet Pro', price: 599.99, oldPrice: 799.99, image: 'assets/tech/image 33.png', category: 'tech', rating: 4.6, isNew: false },
    { id: 9, name: 'Wireless Speaker', price: 129.99, oldPrice: null, image: 'assets/tech/image 34.png', category: 'tech', rating: 4.3, isNew: false },
    { id: 10, name: 'Premium Gadget', price: 249.99, oldPrice: null, image: 'assets/tech/image 85.png', category: 'tech', rating: 4.2, isNew: false },
    { id: 11, name: 'Fashion Jacket', price: 159.99, oldPrice: null, image: 'assets/alibaba/cloth/image 26.png', category: 'clothing', rating: 4.5, isNew: false },
    { id: 12, name: 'Elegant Decor', price: 89.99, oldPrice: null, image: 'assets/interior/3.png', category: 'interior', rating: 4.9, isNew: false },
    { id: 13, name: 'Tech Accessory', price: 49.99, oldPrice: null, image: 'assets/tech/6.png', category: 'tech', rating: 4.1, isNew: false },
    { id: 14, name: 'Stylish Outfit', price: 139.99, oldPrice: null, image: 'assets/alibaba/cloth/image 30.png', category: 'clothing', rating: 4.4, isNew: false },
    { id: 15, name: 'Home Furniture', price: 399.99, oldPrice: null, image: 'assets/interior/6.png', category: 'interior', rating: 4.6, isNew: false },
    { id: 16, name: 'Smart Device', price: 179.99, oldPrice: null, image: 'assets/tech/8.png', category: 'tech', rating: 4.3, isNew: true }
];

let filteredProducts = [...allProducts];

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    productCount.textContent = `${filteredProducts.length} items`;
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const stars = generateStars(product.rating);
        const oldPriceHTML = product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : '';
        const newBadge = product.isNew ? '<span class="badge-new">New</span>' : '';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                ${newBadge}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${stars}
                    <span>(${product.rating})</span>
                </div>
                <div class="product-price">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    ${oldPriceHTML}
                </div>
                <button class="btn btn-add-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = btn.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function filterProducts() {
    const categoryCheckboxes = document.querySelectorAll('.filter-checkbox input[value="tech"], .filter-checkbox input[value="clothing"], .filter-checkbox input[value="interior"]');
    const priceCheckboxes = document.querySelectorAll('.filter-checkbox input[value^="0-"], .filter-checkbox input[value^="100-"], .filter-checkbox input[value^="300-"], .filter-checkbox input[value="600+"]');
    const ratingCheckboxes = document.querySelectorAll('.filter-checkbox input[value="5"], .filter-checkbox input[value="4"], .filter-checkbox input[value="3"]');
    
    const selectedCategories = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const selectedPrices = Array.from(priceCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const selectedRatings = Array.from(ratingCheckboxes).filter(cb => cb.checked).map(cb => parseFloat(cb.value));
    
    filteredProducts = allProducts.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        let priceMatch = selectedPrices.length === 0;
        if (!priceMatch) {
            priceMatch = selectedPrices.some(range => {
                if (range === '0-100') return product.price <= 100;
                if (range === '100-300') return product.price > 100 && product.price <= 300;
                if (range === '300-600') return product.price > 300 && product.price <= 600;
                if (range === '600+') return product.price > 600;
                return false;
            });
        }
        
        let ratingMatch = selectedRatings.length === 0;
        if (!ratingMatch) {
            ratingMatch = selectedRatings.some(minRating => product.rating >= minRating);
        }
        
        return categoryMatch && priceMatch && ratingMatch;
    });
    
    renderProducts();
}

function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    const sortValue = sortSelect.value;
    
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.isNew - a.isNew);
            break;
        default:
            filteredProducts = [...allProducts];
    }
    
    renderProducts();
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts();
    });
}

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
if (category) {
    const categoryCheckbox = document.querySelector(`.filter-checkbox input[value="${category}"]`);
    if (categoryCheckbox) {
        categoryCheckbox.checked = true;
        filterProducts();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
