let cart = [];

const cartCountElement = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('order-modal');
const modalTotalPrice = document.getElementById('modal-total-price');


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        cart.push({ name, price });
        updateCartUI();
    });
});

function updateCartUI() {
    cartCountElement.innerText = cart.length;
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="empty-msg">Кошик порожній</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            cartItemsList.appendChild(li);
            total += item.price;
        });
    }
    totalPriceElement.innerText = total;
    modalTotalPrice.innerText = total;
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const title = product.getAttribute('data-title').toLowerCase();
        if (title.includes(term)) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
});


document.querySelector('.btn-checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        modal.style.display = "block";
    } else {
        alert("Кошик порожній!");
    }
});

document.querySelector('.close-btn').onclick = () => modal.style.display = "none";

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};


document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Дякуємо! Ваше замовлення прийнято.");
    cart = []; 
    updateCartUI();
    modal.style.display = "none";
});

document.getElementById('search-input').addEventListener('input', (e) => {
    let val = e.target.value.toLowerCase();
    let cards = document.querySelectorAll('.product-card'); 

    cards.forEach(card => {
        let title = card.getAttribute('data-title').toLowerCase(); 
        

        if (title.includes(val)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});
