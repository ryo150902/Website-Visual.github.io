document.addEventListener('DOMContentLoaded', () => {
    const itemList = document.querySelector('#item-list');
    const totalElement = document.querySelector('#total');

    function loadReceipt() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        itemList.innerHTML = ''; // Membersihkan item-list sebelum memuat item baru

        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('item');
            listItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price} x ${item.quantity}</span>
            `;
            itemList.appendChild(listItem);
        });

        const totalPrice = calculateTotalPrice(cartItems);
        totalElement.textContent = `Total: ${formatCurrency(totalPrice)}`;
    }

    function calculateTotalPrice(cartItems) {
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price);
            const itemQuantity = item.quantity;

            if (!isNaN(itemPrice)) {
                return total + (itemPrice * itemQuantity);
            } else {
                console.error(`Harga tidak valid untuk item: ${item.name}`);
                return total;
            }
        }, 0);
    }

    function formatCurrency(amount) {
        return `Rp ${amount.toFixed(2)}`;
    }

    loadReceipt(); // Memuat receipt saat DOM siap

    // Pastikan Anda memuat ulang receipt setelah menambah item baru
    // Misalnya, jika ada fungsi atau tombol untuk menambah item baru, tambahkan loadReceipt() setelah itu.
});