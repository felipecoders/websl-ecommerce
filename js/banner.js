function initBanner(selector, banners) {
  let index = 0;
  let intervalSlide = 0;
  const elements = {
    banners: [],
    details: [],
    comands: [],
  };

  const parent = document.getElementById(selector);
  const container = document.createElement("div");
  container.className = "banners";
  const comands = document.createElement("div");
  comands.className = "banner-comanders";
  parent.innerHTML = "";
  parent.append(container, comands);

  for (let i = 0; i < banners.length; i += 1) {
    const banner = banners[i];
    const img = document.createElement("img");
    img.hidden = i > 0;
    img.src = banner.image_url;

    const detail = document.createElement("div");
    detail.className = "banner-product-info";
    detail.hidden = i > 0;
    detail.append(banner.description);

    container.append(img, detail);

    const comand = document.createElement("span");
    comand.className = "comand-item";
    comand.onclick = function () {
      go(i);
    };

    comands.append(comand);

    if (i == 0) {
      comand.classList.add("active");
    }

    elements.banners.push(img);
    elements.details.push(detail);
    elements.comands.push(comand);
  }

  function go(to, isClearSlide = true) {
    const currentBanner = elements.banners[index];
    const currentDetail = elements.details[index];
    const currentComander = elements.comands[index];
    currentBanner.hidden = true;
    currentDetail.hidden = true;
    currentComander.classList.remove("active");

    index = to;

    const nextBanner = elements.banners[index];
    const nextDetail = elements.details[index];
    const nextComander = elements.comands[index];
    nextBanner.hidden = false;
    nextDetail.hidden = false;
    nextComander.classList.add("active");

    if (isClearSlide) {
      initSlide();
    }
  }

  function initSlide() {
    clearInterval(intervalSlide);

    intervalSlide = setInterval(function () {
      const next = index + 1 >= banners.length ? 0 : index + 1;
      go(next, false);
    }, 5 * 1000);
  }

  initSlide()
}

initBanner("banner-container", bannerImages);
