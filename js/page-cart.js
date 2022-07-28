class PageClient {
  constructor() {
    this.elementTarget = document.getElementById("products-list");
    this.init();

    const target = document.getElementById("loading");
    "loading"
      .split("")
      .map((p) => {
        const s = document.createElement("span"); // <span></span>
        s.innerText = p.toUpperCase(); // <span>L</span>
        return s;
      })
      .forEach((s) => target.append(s));

    document.getElementById("go-to-register").onclick = () => {
      document.getElementById("cart").style.display = "none";
      document.getElementById("register").style.display = "flex";
    };

    document.getElementById("client").onsubmit = (event) => {
      event.preventDefault();
      const value = document.getElementById("name").value.trim();

      if (!value) {
        alert("Preencha o nome corretamente!");
        return;
      }

      target.classList.add("active");
      anime({
        targets: target.children,
        translateY: -150,
        direction: "alternate",
        easing: "easeInOutSine",
        duration: 400,
        delay: anime.stagger(100),
        loop: true,
      });
      localStorage.removeItem("cart");
      setTimeout(() => {
        alert("compra efetuada com sucesso!");
        location.href = "/";
      }, 3000);
    };
  }

  init() {
    const list = cart.getList();
    const products = [];

    for (let index = 0; index < list.length; index += 1) {
      const item = list[index];
      const exists = products.find(function (product) {
        return product.id === item.id;
      });

      if (exists) {
        exists.amount += 1;
      } else {
        item.amount = 1;
        products.push(item);
      }
    }

    this.render(products);
  }

  render(products) {
    this.elementTarget.innerHTML = "";
    let total = 0;

    for (let index = 0; index < products.length; index += 1) {
      const product = products[index];
      total += product.price * product.amount;

      const item = document.createElement("li");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = product.image_url;
      img.setAttribute("alt", product.name);
      figure.append(img);
      item.append(figure);

      const name = document.createElement("div");
      name.className = "name";
      name.innerText = product.name;
      item.append(name);

      const info = document.createElement("div");
      info.className = "info";
      const amount = document.createElement("span");
      amount.className = "amount";
      amount.innerText = `${product.amount}x`;
      const price = document.createElement("span");
      price.className = "price";
      price.innerText = format(product.price);
      info.append(amount, price);
      item.append(info);

      const commands = document.createElement("div");
      commands.className = "commands";
      const removeButton = document.createElement("button");
      removeButton.className = "remove";
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-circle-xmark";
      removeButton.append(icon);
      commands.append(removeButton);
      item.append(commands);

      this.elementTarget.append(item);

      removeButton.onclick = () => {
        cart.removeProduct(product);
        this.init();
      };
    }

    document.getElementById("total-price").innerText = format(total);
    if (products.length === 0) {
      document.getElementById("go-to-register").style.display = "none";
    }
  }
}

const pageClient = new PageClient();
