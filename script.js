let products_container = document.querySelector('.products');
let btns = document.querySelectorAll('.btn');

async function fetchProduct() {
    try {
        let data = await fetch('./product.json');
        let { products } = await data.json();

        products_container.innerHTML = ''; // Clear existing content

        products.forEach(({ image, name, price, description, tags }) => {
            products_container.innerHTML += `
                <div class="product">
                    <div class="product-img">
                        <img src="images/${image}" alt="Product" />
                    </div>
                    <div class="product-details">
                        <div>
                            <h2 class="product-heading">${name}</h2>
                            <h3 class="product-price">${tags}</h3>
                        </div>
                        ${getDescriptionHTML(description)}
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error('Error fetching products:', error);
    }

    function getDescriptionHTML(description) {
        return products_container.classList.contains('list-view') ? '' : `
            <div>
                <span class="review">${description}</span>
            </div>
        `;
    }

    function btn_active(btn) {
        btns.forEach((btn) => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');
    }

    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            let match = btn.classList;
            if (match.contains('list_view')) {
                products_container.classList.add('list-view');
                products_container.classList.remove('grid-view');
                btn_active(btn);
            } else {
                products_container.classList.add('grid-view');
                products_container.classList.remove('list-view');
                btn_active(btn);
            }
        });
    });
}

fetchProduct();
