function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = thumbnail.src;
    
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function addToCartFromDetail() {
    const productName = document.getElementById('detailProductName').textContent;
    const priceText = document.getElementById('detailPrice').textContent;
    const price = parseFloat(priceText.replace('$', ''));
    const quantity = parseInt(document.getElementById('quantity').value);
    const image = document.getElementById('mainImage').src;
    
    const productId = 1;
    addToCart(productId, productName, price, image, quantity);
}

const colorBtns = document.querySelectorAll('.color-btn');
colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

const quantityInput = document.getElementById('quantity');
if (quantityInput) {
    quantityInput.addEventListener('change', (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) {
            e.target.value = 1;
        } else if (value > 10) {
            e.target.value = 10;
        }
    });
}
