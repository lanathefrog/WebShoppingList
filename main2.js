document.addEventListener('DOMContentLoaded', () => {

    
    // Get all necessary elements via their classes
    const addProductInput = document.querySelector('.add-product input');
    const addProductButton = document.querySelector('.add-product button');
    const productsList = document.querySelector('.products-list');
    const notBoughtSection = document.querySelector('.not-bought-products');
    const boughtSection = document.querySelector('.bought-products');

    // Add a new product
    addProductButton.addEventListener('click', () => {
        const productName = addProductInput.value.trim();
        if (productName) {
            if (!isDuplicateProduct(productName)) {
                addProduct(productName, 1); 
                addProductInput.value = ''; // Clear the input field
            } else { // If there's another product with the same name, throw an alert
                alert('Цей товар вже існує у списку.');
            }
        }
    });

    // If enter pressed
    addProductInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addProductButton.click(); // Simulate addButton click
        }
    });
    
    // Check for duplicate product names
function isDuplicateProduct(name) {
    // Get all products' names
    const productItems = document.querySelectorAll('.product-name-left-panel');
    for (const item of productItems) {
        if (item.textContent.trim().toLowerCase() === name.toLowerCase()) { 
            return true;
        }
    }
    return false;
}

    // Add product to the list
    function addProduct(name, amount) {
        const productHTML = `
        <hr>
            <section class="product-in-left-panel">
                <div class="product-name-left-panel">${name}</div>
                <div class="amount-block">
                    <span class="tooltip red-minus2" data-tooltip="remove product">-</span>
                    <span class="amount-left-panel">${amount}</span>
                    <span class="tooltip plus" data-tooltip="add product">+</span>
                </div>
                <div class="buttons-left-panel">
                    <button class="buy tooltip" data-tooltip="bought">Куплено</button>
                    <span class="tooltip cross" data-tooltip="delete">x</span>
                </div>
            </section>`;
        
        productsList.insertAdjacentHTML('beforeend', productHTML);
        updateRightPanel();
    }

    // Update right panel
    function updateRightPanel() {
        notBoughtSection.innerHTML = ''; 
        boughtSection.innerHTML = '';
        
        const productItems = document.querySelectorAll('.product-in-left-panel');
        
        productItems.forEach(item => {
            // Build a product to add it in the right pannel
            const name = item.querySelector('.product-name-left-panel').textContent;
            const amount = item.querySelector('.amount-left-panel').textContent;
            const isBought = item.querySelector('.buy').textContent === 'Не куплено';

            // Build an HYML-code
            const productRightHTML = `
                <div class="product_in_right_panel">
                    ${name}<span class="amount_right_pannel">${amount}</span>
                </div>`;
            
            // Choose in which section a product goes
            if (isBought) {
                boughtSection.insertAdjacentHTML('beforeend', productRightHTML);
            } else {
                notBoughtSection.insertAdjacentHTML('beforeend', productRightHTML);
            }
        });
    }

    let currentInput = null;  // Used to edit only one name

// Handle click events on product names
productsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('product-name-left-panel')) {
        if (currentInput) {
            saveName(currentInput);
        }

        const productName = event.target;
        const productInput = document.createElement('input');
        productInput.value = productName.textContent;
        productInput.setAttribute('maxlength', '30'); // Limit input to 30 characters
         // Replace the product name element with the input element
        productName.replaceWith(productInput);
        productInput.focus();
        currentInput = productInput;

        // Define a function to save the name of a product
        const saveName = (inputField) => {
            const newName = inputField.value.trim();
            const maxLength = 25;
            if (newName && !isDuplicateProduct(newName) && newName.length <= maxLength) {
                productName.textContent = newName;
                inputField.replaceWith(productName);
                updateRightPanel();
            }
        };

        // Save name when Enter is pressed
        productInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                saveName(productInput);
                currentInput = null;
            }
        });

        // Save name if input isn't in focus anymore
        productInput.addEventListener('blur', () => {
            saveName(productInput);
            currentInput = null;
        });
    }
});


    // Handle click events on products list
    productsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('red-minus')) {
            const amountElement = event.target.nextElementSibling; 
            let amount = parseInt(amountElement.textContent);
            if (amount > 1) {
                amountElement.textContent = --amount;
                if (amount === 1) { // if a product's quantity is 1, change minus button
                    event.target.classList.remove('red-minus');
                    event.target.classList.add('red-minus2');
                    event.target.classList.add('disabled');
                }
            }
        }

        if (event.target.classList.contains('plus')) { // Increase amount of the product
            const amountElement = event.target.previousElementSibling;
            const minusButton = amountElement.previousElementSibling;
            let amount = parseInt(amountElement.textContent);
            amountElement.textContent = ++amount;
            if (amount > 1) {
                minusButton.classList.remove('red-minus2');
                minusButton.classList.add('red-minus');
                minusButton.classList.remove('disabled');
            }
        }

        if (event.target.classList.contains('buy')) {
            const productSection = event.target.closest('.product-in-left-panel');
            const amountBlock = productSection.querySelector('.amount-block');
            const plusButton = amountBlock.querySelector('.plus');
            const minusButton = amountBlock.querySelector('.red-minus') || amountBlock.querySelector('.red-minus2');
            const crossButton = productSection.querySelector('.cross');
            const productName = productSection.querySelector('.product-name-left-panel');

            if (event.target.textContent === 'Куплено') {
                event.target.textContent = 'Не куплено';
                plusButton.style.display = 'none';
                minusButton.style.display = 'none';
                crossButton.style.display = 'none';
                productName.classList.add('bought'); // Cross the name of the product
            } else {
                event.target.textContent = 'Куплено';
                plusButton.style.display = 'inline-block';
                minusButton.style.display = 'inline-block';
                crossButton.style.display = 'inline-block';
                productName.classList.remove('bought');
            }
        }
        if (event.target.classList.contains('cross')) { // Delete a product
            const productSection = event.target.closest('.product-in-left-panel');
            const productName = productSection.querySelector('product-name-left-panel');
            const nextElement = productSection.nextElementSibling;
            if (!nextElement || nextElement.tagName !== 'SECTION' || !nextElement.classList.contains('product-in-left-panel')) {
                const hrElement = productSection.nextElementSibling;
                if (hrElement && hrElement.tagName === 'HR') {
                    hrElement.remove();
                }
            }
            const previousElement = productSection.previousElement;
            if (!previousElement || previousElement.tagName !== 'SECTION' || !previousElement.classList.contains('product-in-left-panel')) {
                const hrElement = productSection.previousElement;
                if (hrElement && hrElement.tagName === 'HR') {
                    hrElement.remove();
                }
            }

            productSection.remove();
            removeFromRightPannel(productName);
            
        }
        updateRightPanel();
    });

    // Initial check for existing products
    document.querySelectorAll('.amount-left-panel').forEach(amountElement => {
        const amount = parseInt(amountElement.textContent);
        const minusButton = amountElement.previousElementSibling;
        if (amount === 1) {
            minusButton.classList.remove('red-minus');
            minusButton.classList.add('red-minus2');
            minusButton.classList.add('disabled');
        }
    });
    
    // Remove deleted product from right pannel
    function removeFromRightPannel(name){
        const productItems = document.querySelectorAll('.product_in_right_panel');
        for (const item of productItems) {
            if (item.textContent.trim() === name) { 
                item.remove;
            }
        }
    }

     // Add three products right after the webpage is loaded
     addProduct('Печиво', 1);
     addProduct('Молоко', 1);
     addProduct('Джем', 1);
});

