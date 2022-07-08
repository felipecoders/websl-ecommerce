function initProductsCard(selector, products) {
  const parent = document.getElementById(selector);
  parent.innerHTML = "";

  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    const card = document.createElement("div");
    card.className = "product-card";

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = product.image_url;
    img.setAttribute("alt", product.name);
    figure.append(img);
    card.append(figure);

    const info = document.createElement("div");
    info.className = "product-info";
    const name = document.createElement("strong");
    name.innerText = product.name;
    const detail = document.createElement("p");
    detail.innerText = product.detail;
    const price = document.createElement("span");
    price.className = "product-price";
    price.innerText = format(product.price);
    const footer = document.createElement("footer");
    const add = document.createElement("button");
    add.innerText = "Adicionar";
    //   add.onclick = function() {
    //     cart.addProduct(product)
    //   }

    footer.append(add);
    info.append(name, detail, price);
    card.append(info, footer);

    parent.append(card);
  }
}

initProductsCard("products-container", products);
