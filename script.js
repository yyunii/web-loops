/* ================================================= */
/* DATA CART */
/* ================================================= */

let cart = [];


/* ================================================= */
/* FORMAT RUPIAH */
/* ================================================= */

function formatRupiah(number) {

    return "Rp" + number.toLocaleString("id-ID");

}
/* ================================================= */
/* TAMBAH KE KERANJANG */
/* ================================================= */

function addToCart(name, price) {

    const existing =
        cart.find(item => item.name === name);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();


    // Pindah ke bagian keranjang
    document
        .getElementById("cart")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================================================= */
/* UPDATE CART */
/* ================================================= */

function updateCart() {

    let totalQuantity = 0;

    let subtotal = 0;


    cart.forEach(item => {

        totalQuantity += item.quantity;

        subtotal +=
            item.price * item.quantity;

    });


    document.getElementById("cartCount")
        .innerText = totalQuantity;


    document.getElementById("cartSubtotal")
        .innerText = formatRupiah(subtotal);


    if (cart.length === 0) {

        document.getElementById("cartShipping")
            .innerText = "Rp0";

        document.getElementById("cartGrandTotal")
            .innerText = "Rp0";

    } else {

        let shipping = 10000;

        document.getElementById("cartShipping")
            .innerText = formatRupiah(shipping);


        document.getElementById("cartGrandTotal")
            .innerText =
            formatRupiah(subtotal + shipping);

    }


    displayCart();

    updateCheckout();

}


/* ================================================= */
/* TAMPILKAN CART */
/* ================================================= */

function displayCart() {

    const container =
        document.getElementById("cartItems");


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <i class="bi bi-bag"></i>

                <p>
                    Keranjang masih kosong.
                </p>

                <a
                    href="#shop"
                    class="btn btn-loop">

                    Belanja Sekarang

                </a>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    cart.forEach((item, index) => {

        const subtotal =
            item.price * item.quantity;


        container.innerHTML += `

            <div class="cart-item">

                <div
                    class="cart-item-image"
                    style="
                    background:#f5e8d8;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:28px;
                    ">

                    🧶

                </div>


                <div>

                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-price">
                        ${formatRupiah(item.price)}
                    </div>

                </div>


                <div class="quantity-control">

                    <button
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>


                <strong>
                    ${formatRupiah(subtotal)}
                </strong>


                <button
                    class="delete-btn"
                    onclick="removeItem(${index})">

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `;

    });

}


/* ================================================= */
/* TAMBAH JUMLAH */
/* ================================================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


/* ================================================= */
/* KURANG JUMLAH */
/* ================================================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();

}


/* ================================================= */
/* HAPUS PRODUK */
/* ================================================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ================================================= */
/* CHECKOUT */
/* ================================================= */

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Keranjang masih kosong. Silakan pilih produk terlebih dahulu."
        );

        return;

    }


    document
        .getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================================================= */
/* UPDATE CHECKOUT */
/* ================================================= */

function updateCheckout() {

    const container =
        document.getElementById("checkoutItems");


    let subtotal = 0;


    if (cart.length === 0) {

        container.innerHTML = `

            <p class="text-muted">
                Belum ada produk.
            </p>

        `;

    } else {

        container.innerHTML = "";


        cart.forEach(item => {

            const itemTotal =
                item.price * item.quantity;


            subtotal += itemTotal;


            container.innerHTML += `

                <div class="checkout-product">

                    <div>

                        <div class="checkout-product-name">

                            ${item.name}

                        </div>

                        <small>
                            ${item.quantity} ×
                            ${formatRupiah(item.price)}
                        </small>

                    </div>


                    <div class="checkout-product-price">

                        ${formatRupiah(itemTotal)}

                    </div>

                </div>

            `;

        });

    }


    let shipping = 0;


    const selectedShipping =
        document.querySelector(
            'input[name="shipping"]:checked'
        );


    if (selectedShipping && cart.length > 0) {

        shipping =
            parseInt(selectedShipping.value);

    }


    const grandTotal =
        subtotal + shipping;


    document.getElementById("checkoutSubtotal")
        .innerText = formatRupiah(subtotal);


    document.getElementById("checkoutShipping")
        .innerText = formatRupiah(shipping);


    document.getElementById("checkoutGrandTotal")
        .innerText = formatRupiah(grandTotal);

}


/* ================================================= */
/* FILTER PRODUK */
/* ================================================= */

function filterProduct(category, button) {

    const products =
        document.querySelectorAll(".product-item");


    const buttons =
        document.querySelectorAll(".filter-btn");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    products.forEach(product => {

        const productCategory =
            product.dataset.category;


        if (
            category === "all" ||
            category === productCategory
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


/* ================================================= */
/* PROSES PEMBAYARAN */
/* ================================================= */

function processPayment() {

    if (cart.length === 0) {

        alert(
            "Keranjang kamu masih kosong."
        );

        return;

    }


    const name =
        document.getElementById("customerName").value;


    const address =
        document.getElementById("customerAddress").value;


    const phone =
        document.getElementById("customerPhone").value;


    if (
        name === "" ||
        address === "" ||
        phone === ""
    ) {

        alert(
            "Silakan lengkapi informasi pengiriman terlebih dahulu."
        );

        return;

    }


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    alert(

        "Pesanan berhasil dibuat! 💗\n\n" +

        "Nama: " + name + "\n" +

        "Pembayaran: " + payment + "\n\n" +

        "Terima kasih sudah berbelanja di LOOPS."

    );


    cart = [];

    updateCart();


    document.getElementById("customerName").value = "";

    document.getElementById("customerAddress").value = "";

    document.getElementById("customerPhone").value = "";


    document
        .getElementById("home")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================================================= */
/* INITIAL */
/* ================================================= */

updateCart();