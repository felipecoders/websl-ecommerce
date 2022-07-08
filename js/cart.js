class Cart {
  constructor() {
    this.badge = document.getElementById("cart-badge");
    this.list = [];

    if (!localStorage.cart) {
      this.list = JSON.parse(localStorage.getItem("cart"));
      this.reloadBadge();
    }
  }

  getList() {
    return this.list;
  }

  reloadBadge() {
    this.badge.innerText = this.list.length;

    if (this.list.length > 0) {
      this.badge.style.display = "flex";
    } else {
      this.badge.style.display = "none";
    }
  }

  addProduct(product) {
    this.list.push(product);
    this.reloadBadge();
    this.updateStorage();
  }

  removeProduct(product) {
    const index = this.list.findIndex(function (item) {
      return item.id === product.id;
    });
    this.list.splice(index, 1);
    this.reloadBadge();
    this.updateStorage();
  }

  getAmountProducts() {
    return this.list.length;
  }

  updateStorage() {
    localStorage.setItem("cart", JSON.stringify(this.list));
  }
}

const cart = new Cart();
