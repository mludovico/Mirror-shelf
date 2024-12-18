const video = document.getElementById('video');
const copyYear = document.getElementById('year');
const mirrorButton = document.getElementById('mirror');

function requestCameraPermission() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error('Error accessing media devices.', error);
        });
}

function loadProducts() {
    fetch('/data.json').then(response => {
        console.log(response);
        return response.json();
    }).then(products => {
        const productsContainer = document.getElementById('shelf');
        console.log(products);
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                        <img class="product-image" src="${product.image}" alt="${product.name}">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">R$${product.price}</div>
                    `;
            productsContainer.appendChild(productElement);
        });
    });

}

function setMirrorListener() {
    mirrorButton.addEventListener('click', () => {
        const shelf = document.getElementById('content');
        shelf.classList.toggle('mirror');
    });
}

function init() {
    requestCameraPermission();
    setMirrorListener();
    copyYear.innerHTML = new Date().getFullYear().toString();
    loadProducts();
}

init();