 // Variables
 let inventory = [];

 // Funciones
 function addProduct(name, quantity) {
   const existingProduct = inventory.find(product => product.name === name);
   if (existingProduct) {
     existingProduct.quantity += quantity;
   } else {
     inventory.push({ name, quantity });
   }
   updateTable();
 }

 function showAllProducts() {
   updateTable();
 }

 function updateProductQuantity(name, newQuantity) {
   const product = inventory.find(product => product.name === name);
   if (product) {
     product.quantity = newQuantity;
     updateTable();
   }
 }

 function removeOutOfStockProducts() {
   inventory = inventory.filter(product => product.quantity > 0);
   updateTable();
 }

 function updateTable() {
   const tableBody = document.querySelector('#inventory-table tbody');
   tableBody.innerHTML = '';
   
   if (inventory.length === 0) {
     const row = tableBody.insertRow();
     const cell = row.insertCell();
     cell.colSpan = 3;
     cell.textContent = 'No hay productos en el inventario';
   } else {
     inventory.forEach(product => {
       const row = tableBody.insertRow();
       row.insertCell().textContent = product.name;
       row.insertCell().textContent = product.quantity;
       const actionsCell = row.insertCell();
       
       const updateButton = document.createElement('button');
       updateButton.textContent = 'Actualizar';
       updateButton.onclick = () => {
         const newQuantity = prompt(`Nueva cantidad para\ ${product.name}:\ `);
         if (newQuantity !== null) {
           updateProductQuantity(product.name, parseInt(newQuantity, 10));
         }
       };
       actionsCell.appendChild(updateButton);
     });
   }
 }

 // Event Listeners
 document.getElementById('product-form').addEventListener('submit', function(e) {
   e.preventDefault();
   const name = document.getElementById('product-name').value;
   const quantity = parseInt(document.getElementById('product-quantity').value, 10);
   
   if (name && !isNaN(quantity) && quantity > 0) {
     addProduct(name, quantity);
     this.reset();
   } else {
     alert('Por favor, ingrese un nombre de producto válido y una cantidad positiva.');
   }
 });

 // Inicialización
 showAllProducts();