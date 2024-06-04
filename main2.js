// document.addEventListener('DOMContentLoaded', () => {
//     const addProductInput = document.querySelector('.add-product input');
//     const addProductButton = document.querySelector('.add-product button');
//     const productsList = document.querySelector('.products-list');
//     const notBoughtSection = document.querySelector('.not-bought-products');
//     const boughtSection = document.querySelector('.bought-products');

//     // Add a new product
//     addProductButton.addEventListener('click', () => {
//         const productName = addProductInput.value.trim();
//         if (productName) {
//             addProduct(productName, 1);
//             addProductInput.value = '';
//         }
//     });

//     // Add product to the list
//     function addProduct(name, amount) {
//         const productHTML = `
//         <hr>
//             <section class="product-in-left-panel">
//                 <div class="product-name-left-panel">${name}</div>
//                 <div class="amount-block">
//                     <span class="tooltip red-minus2" data-tooltip="remove product">-</span>
//                     <span class="amount-left-panel">${amount}</span>
//                     <span class="tooltip plus" data-tooltip="add product">+</span>
//                 </div>
//                 <div class="buttons-left-panel">
//                     <button class="buy tooltip" data-tooltip="bought">Куплено</button>
//                     <span class="tooltip cross" data-tooltip="delete">x</span>
//                 </div>
//             </section>`;
        
//         productsList.insertAdjacentHTML('beforeend', productHTML);
//         updateRightPanel();
//     }

//     // Update right panel
//     function updateRightPanel() {
//         notBoughtSection.innerHTML = '';
//         boughtSection.innerHTML = '';
        
//         const productItems = document.querySelectorAll('.product-in-left-panel');
        
//         productItems.forEach(item => {
//             const name = item.querySelector('.product-name-left-panel').textContent;
//             const amount = item.querySelector('.amount-left-panel').textContent;
//             const isBought = item.querySelector('.buy').textContent === 'Не куплено';

//             const productRightHTML = `
//                 <div class="product_in_right_panel">
//                     ${name}<span class="amount_right_pannel">${amount}</span>
//                 </div>`;
            
//             if (isBought) {
//                 boughtSection.insertAdjacentHTML('beforeend', productRightHTML);
//             } else {
//                 notBoughtSection.insertAdjacentHTML('beforeend', productRightHTML);
//             }
//         });
//     }
//  // Handle click events on products list
//  productsList.addEventListener('click', (event) => {
//     if (event.target.classList.contains('red-minus')) {
//         const amountElement = event.target.nextElementSibling;
//         let amount = parseInt(amountElement.textContent);
//         if (amount > 1) {
//             amountElement.textContent = --amount;
//         }
//     }

//     if (event.target.classList.contains('plus')) {
//         const amountElement = event.target.previousElementSibling;
//         let amount = parseInt(amountElement.textContent);
//         amountElement.textContent = ++amount;
//     }

//     if (event.target.classList.contains('buy')) {
//         if (event.target.textContent === 'Куплено') {
//             event.target.textContent = 'Не куплено';
//         } else {
//             event.target.textContent = 'Куплено';
//         }
//     }

//     if (event.target.classList.contains('cross')) {
//         event.target.closest('.product-in-left-panel').nextElementSibling.remove();
//         event.target.closest('.product-in-left-panel').remove();
//     }

//     updateRightPanel();
// });
// });

let obj = {};
obj.level1.value = 5;
console.log(obj.level1.value); // 5
