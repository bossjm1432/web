
        const products = [
            {
                id: 1,
                name: "Classic White Shirt",
                price: 799,
                image: "1.jpg"
            },
            {
                id: 2,
                name: "Striped Cotton Shirt",
                price: 899,
                image: "2.jpg"
            },
            {
                id: 3,
                name: "Casual Denim Shirt",
                price: 1299,
                image: "3.jpg"
            },
            {
                id: 4,
                name: "Floral Print Shirt",
                price: 999,
                image: "4.jpg"
            },
            {
                id: 5,
                name: "Linen Summer Shirt",
                price: 1499,
                image: "5.jpg"
            },
            {
                id: 6,
                name: "Oxford Button-Down",
                price: 1199,
                image: "6.jpg"
            },
            {
                id: 7,
                name: "Manfinity RebelGame",
                price: 1199,
                image: "7.jpg"
            },
            {
                id: 8,
                name: "Patchwork Short-sleeved Eyes Shirt",
                price: 1199,
                image: "8.jpg"
            }
        ];

        let cart = [];
        let isDarkMode = false;

        // DOM Elements
        const productsGrid = document.getElementById('productsGrid');
        const cartBtn = document.getElementById('cartBtn');
        const cartSidebar = document.getElementById('cartSidebar');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartCount = document.querySelector('.cart-count');
        const themeToggle = document.getElementById('themeToggle');

        // Initialize products
        function initializeProducts() {
            productsGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">₱${product.price.toLocaleString()}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Add to cart function
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const cartItem = cart.find(item => item.id === productId);

            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({...product, quantity: 1});
            }

            createAddToCartAnimation(event);
            updateCart();
        }

        // Create add to cart animation
        function createAddToCartAnimation(event) {
            const circle = document.createElement('div');
            circle.className = 'add-to-cart-animation';
            circle.style.left = `${event.clientX}px`;
            circle.style.top = `${event.clientY}px`;
            document.body.appendChild(circle);

            setTimeout(() => circle.remove(), 800);
        }

        // Update cart display
        function updateCart() {
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <div class="product-name">${item.name}</div>
                        <div class="product-price">₱${item.price.toLocaleString()}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `Total: ₱${total.toLocaleString()}`;
        }

        // Update item quantity
        function updateQuantity(productId, change) {
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += change;
                if (cartItem.quantity <= 0) {
                    cart = cart.filter(item => item.id !== productId);
                }
                updateCart();
            }
        }

        // Toggle dark mode
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode');
            themeToggle.innerHTML = isDarkMode ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
        }

        // Event Listeners
        cartBtn.addEventListener('click', () => cartSidebar.classList.add('active'));
        closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));
        themeToggle.addEventListener('click', toggleTheme);

        // Initialize
        initializeProducts();
        updateCart();
   