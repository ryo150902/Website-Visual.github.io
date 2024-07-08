document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('#cart-icon');
    const cartItemCount = document.querySelector('#cart-item-count');
    const cartContainer = document.querySelector('#keranjang-belanja');
    const cartItemsList = document.querySelector('#item-keranjang');

    // Function to update cart count
    function updateCartCount() {
        const itemCount = cartItemsList.children.length;
        cartItemCount.textContent = itemCount;

        // Save cart data to localStorage
        saveCartToLocalStorage();
    }

    // Function to save cart items to localStorage
    function saveCartToLocalStorage() {
        const items = [];
        cartItemsList.querySelectorAll('li').forEach(item => {
            const itemName = item.querySelector('h4').textContent;
            const itemPrice = item.querySelector('p').textContent;
            const itemImage = item.querySelector('img').getAttribute('src');
            const itemQuantity = parseInt(item.querySelector('.quantity').textContent); // Get quantity as integer
            items.push({ name: itemName, price: itemPrice, image: itemImage, quantity: itemQuantity });
        });
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    // Function to remove item from cart list
    function removeCartItem(itemName) {
        const items = cartItemsList.querySelectorAll('li');
        items.forEach(item => {
            if (item.textContent.includes(itemName)) {
                item.remove();
            }
        });
        updateCartCount();
        saveCartToLocalStorage();
    }

    // Event listener for add to cart buttons
    document.querySelectorAll('.tambah-ke-keranjang').forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.closest('.katalog-item');
            const itemName = item.querySelector('h4').textContent;
            const itemPrice = item.querySelector('p').textContent;
            const itemImage = item.querySelector('img').getAttribute('src');

            // Load existing cart items from localStorage
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Check if item already exists in cart
            let existingItem = cartItems.find(item => item.name === itemName);

            if (existingItem) {
                // If item already exists, increment its quantity
                existingItem.quantity = existingItem.quantity ? existingItem.quantity + 1 : 1;
            } else {
                // If item does not exist, add it with quantity set to 1
                existingItem = {
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1
                };
                cartItems.push(existingItem);
            }

            // Save updated cart items to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Reload cart items list or update UI
            loadCartFromLocalStorage();
        });
    });

    // Toggle cart container visibility
    cartIcon.addEventListener('click', () => {
        cartContainer.classList.toggle('d-none');
    });

    // Load cart items from localStorage when DOM content is loaded
    function loadCartFromLocalStorage() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsList.innerHTML = ''; // Clear existing items

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                    <p class="quantity">${item.quantity}</p>
                </div>
                <button class="hapus-item">Hapus</button>
            `;
            cartItemsList.appendChild(listItem);

            // Add event listener to the remove button
            listItem.querySelector('.hapus-item').addEventListener('click', () => {
                listItem.remove();
                updateCartCount();
                saveCartToLocalStorage();
            });
        });

        // Update cart count
        updateCartCount();
    }

    // Load cart items from localStorage when DOM content is loaded
    document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);

    // Exporting functions for external use
    window.removeCartItem = removeCartItem;
});