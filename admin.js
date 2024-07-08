document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.querySelector('#cart-items');
    const addItemButton = document.querySelector('#add-item');

    // Function to load cart items from localStorage
    function loadCartItems() {
        // Clear existing items
        cartItemsList.innerHTML = '';

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button class="hapus-item" data-index="${index}">Hapus</button>
                <button class="tambah-item" data-index="${index}">Tambah</button>
                <button class="kurang-item" data-index="${index}">Kurang</button>
            `;
            cartItemsList.appendChild(listItem);
        });

        // Function to handle purchase button click
        function handlePurchase() {
        // You can customize this to redirect to your receipt printing page
        window.location.href = 'receipt-page.html';
    }

        // Create purchase button
        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Beli';
        purchaseButton.addEventListener('click', handlePurchase);

        // Append purchase button to cart items list or any appropriate container
        cartItemsList.appendChild(purchaseButton);

        // Add event listeners to buttons
        addEventListeners();
    }

    // Function to add event listeners to buttons
    function addEventListeners() {
        const deleteButtons = cartItemsList.querySelectorAll('.hapus-item');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                deleteCartItem(index);
            });
        });

        const addButtons = cartItemsList.querySelectorAll('.tambah-item');
        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                modifyCartItemQuantity(index, 1);
            });
        });

        const subtractButtons = cartItemsList.querySelectorAll('.kurang-item');
        subtractButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                modifyCartItemQuantity(index, -1);
            });
        });
    }

    // Function to delete item from cart list
    function deleteCartItem(index) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1); // Remove item from array

        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save updated array to localStorage
        loadCartItems(); // Reload cart items
    }

    // Function to modify item quantity in cart list
    function modifyCartItemQuantity(index, amount) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems[index].quantity += amount;

        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1); // Remove item if quantity is 0 or less
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save updated array to localStorage
        loadCartItems(); // Reload cart items
    }

    // Function to add a new item to the cart list
    function addNewItem() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const newItem = {
            name: "New Item",
            price: "1000",
            image: "path/to/foto",
            quantity: 1
        };

        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
    }

    // Add event listener to the "Tambah Item" button
    addItemButton.addEventListener('click', addNewItem);

    // Load cart items when DOM content is loaded
    loadCartItems();
});