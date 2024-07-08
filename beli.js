document.addEventListener("DOMContentLoaded", function() {
    const beliButtons = document.querySelectorAll('.katalog-item button:nth-of-type(1)'); // Memilih semua tombol "Beli"

    beliButtons.forEach(button => {
        button.addEventListener('click', function() {
            let namaProduk = this.parentNode.querySelector('h4').innerText.trim(); // Mendapatkan nama produk
            let hargaProduk = this.parentNode.querySelector('p').innerText.trim(); // Mendapatkan harga produk

            // Ganti nomor WhatsApp dan pesan sesuai kebutuhan
            let nomorWhatsApp = '+6281234567890'; // Ganti dengan nomor WhatsApp yang diinginkan
            let pesanWhatsApp = `Halo, saya tertarik dengan produk ${namaProduk} yang dijual seharga ${hargaProduk}. Mohon informasi lebih lanjut.`;

            // Membuat URL WhatsApp dengan nomor dan pesan
            let urlWhatsApp = `https://wa.me/${nomorWhatsApp}/?text=${encodeURIComponent(pesanWhatsApp)}`;

            // Mengarahkan ke WhatsApp saat tombol diklik
            window.open(urlWhatsApp, '_blank');
        });
    });
});