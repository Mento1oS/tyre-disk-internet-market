import {
  html,
  Component,
  render,
  useState,
  useEffect,
} from "./js/src/htm-preact.min.js";
import "./js/src/shim.min.js";
import "./js/src/xlsx.min.js";

const NUMBER__PATTERN = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const productNames = [];
const productsContainer = document.querySelector(".cart__products");
const sumBlock = document.querySelector(".cart__sum");
const cartForm = document
  .querySelector(".cart__content")
  .querySelector(".phone__form");
let multySeason = {};
const purchaseEvent = (event) => {
  event.preventDefault();
  if (
    event.target.querySelector(".phone__input").value.match(NUMBER__PATTERN) &&
    productNames.length > 0
  ) {
    event.target
      .querySelector(".phone__input")
      .classList.remove("input__error");
    formSubmitCart(event.target);
  } else {
    event.target.querySelector(".phone__input").classList.add("input__error");
  }
};
const formFill = () => {
  document.querySelector(".product__input").value = "";
  for (let index = 0; index < productNames.length; index++) {
    const elem = productNames[index];
    document.querySelector(".product__input").value =
      document.querySelector(".product__input").value +
      elem +
      ", " +
      window[`${elem}Amount`] +
      " items" +
      `; `;
    document.querySelector(".sum__price").value = sumBlock.textContent.replace(
      "₽",
      ""
    );
  }
};
cartForm.addEventListener("submit", purchaseEvent);
const increment = (event) => {
  const product = event.target.closest(".product");
  const name = product.querySelector(".product__name").textContent;
  const price = product.querySelector(".product__price");
  window[`${name}Amount`]++;
  product.querySelector(".product__amount").textContent =
    window[`${name}Amount`] + " шт.";
  price.textContent =
    (
      Number(price.textContent.replace("₽", "")) +
      Number(window[`${name}Price`].replace("₽", ""))
    ).toString() + "₽";
  sumBlock.textContent =
    (
      Number(sumBlock.textContent.replace("₽", "")) +
      Number(window[`${name}Price`].replace("₽", ""))
    ).toString() + "₽";
  window.cartAmount ? window.cartAmount++ : (window.cartAmount = 1);
  document.querySelector(".cart__amount").textContent = window.cartAmount;
  formFill();
};
const decrement = (event) => {
  const product = event.target.closest(".product");
  const name = product.querySelector(".product__name").textContent;
  const price = product.querySelector(".product__price");
  window[`${name}Amount`]--;
  if (window[`${name}Amount`] === 0) {
    product.remove();
  } else if (window[`${name}Amount`] > 0) {
    product.querySelector(".product__amount").textContent =
      window[`${name}Amount`] + " шт.";
    price.textContent =
      (
        Number(price.textContent.replace("₽", "")) -
        Number(window[`${name}Price`].replace("₽", ""))
      ).toString() + "₽";
  }
  if (Number(sumBlock.textContent.replace("₽", "")) === 0) {
    sumBlock.textContent = "";
  } else if (Number(sumBlock.textContent.replace("₽", "")) > 0) {
    sumBlock.textContent =
      (
        Number(sumBlock.textContent.replace("₽", "")) -
        Number(window[`${name}Price`].replace("₽", ""))
      ).toString() + "₽";
  }
  window.cartAmount--;
  document.querySelector(".cart__amount").textContent = window.cartAmount;
  const index = productNames.indexOf(name);
  productNames.splice(index, 1);
  formFill();
};
const brickTireBuyHandler = (event) => {
  const brick = event.target.closest(".brick");
  const name = brick.querySelector(".brick__heading");
  const price = brick.querySelector(".brick__price");
  if (sumBlock.textContent !== "") {
    sumBlock.textContent =
      (
        Number(sumBlock.textContent.replace("₽", "")) +
        Number(price.textContent.replace("₽", ""))
      ).toString() + "₽";
  } else {
    sumBlock.textContent = price.textContent;
  }

  if (productNames.includes(name.textContent)) {
    window[`${name.textContent}Amount`]++;
    const elem =
      productsContainer.children[productNames.indexOf(name.textContent)];
    elem.querySelector(".product__price").textContent =
      (
        Number(window[`${name.textContent}Amount`]) *
        Number(price.textContent.replace("₽", ""))
      ).toString() + "₽";
    elem.querySelector(".product__amount").textContent =
      window[`${name.textContent}Amount`] + " " + "шт.";
  } else {
    productNames.push(name.textContent);
    window[`${name.textContent}Amount`] = 1;
    const imgSrc = brick.querySelector(".brick__img").getAttribute("src");
    const width = brick.querySelector(".brick__width");
    const profile = brick.querySelector(".brick__profile");
    const diameter = brick.querySelector(".brick__diameter");
    const params =
      width.textContent +
      " " +
      profile.textContent +
      " " +
      diameter.textContent;
    const elem = document.createElement("div");
    elem.classList.add("product");
    elem.innerHTML = `<div class="product__container cart__elem">
        <div class='product__name'>${
          name.textContent
        }</div><div><img class='product__img' src='${imgSrc}'></img></div><div class='product__purchase'><div class='product__price'>${
      price.textContent
    }</div><div class='product__regulation'><span class="product__plus">+</span><span class="product__amount">${
      window[`${name.textContent}Amount`]
    } шт.</span><span class='product__minus'>-</span></div> </div><div><div></div>`;
    productsContainer.appendChild(elem);
    window[`${name.textContent}Price`] =
      elem.querySelector(".product__price").textContent;
    elem.querySelector(".product__plus").addEventListener("click", increment);
    elem.querySelector(".product__minus").addEventListener("click", decrement);
  }
  window.cartAmount ? window.cartAmount++ : (window.cartAmount = 1);
  document.querySelector(".cart__amount").textContent = window.cartAmount;
  formFill();
};
const brickDiskBuyHandler = (event) => {
  const brick = event.target.closest(".brick");
  const name = brick.querySelector(".brick__heading");
  const price = brick.querySelector(".brick__price");
  if (sumBlock.textContent !== "") {
    sumBlock.textContent =
      (
        Number(sumBlock.textContent.replace("₽", "")) +
        Number(price.textContent.replace("₽", ""))
      ).toString() + "₽";
  } else {
    sumBlock.textContent = price.textContent;
  }
  if (productNames.includes(name.textContent)) {
    window[`${name.textContent}Amount`]++;
    const elem =
      productsContainer.children[productNames.indexOf(name.textContent)];
    elem.querySelector(".product__price").textContent =
      (
        Number(window[`${name.textContent}Amount`]) *
        Number(price.textContent.replace("₽", ""))
      ).toString() + "₽";
    elem.querySelector(".product__amount").textContent =
      window[`${name.textContent}Amount`] + " " + "шт.";
    console.log(price.textContent.replace("₽", ""));
  } else {
    productNames.push(name.textContent);
    window[`${name.textContent}Amount`] = 1;
    const imgSrc = brick.querySelector(".brick__img").getAttribute("src");
    const width = brick.querySelector(".brick__width");
    const stup = brick.querySelector(".brick__stup");
    const diameter = brick.querySelector(".brick__diameter");
    const takeoff = brick.querySelector(".brick__takeoff");
    const connection = brick.querySelector(".brick__connection");
    const params =
      width.textContent +
      stup.textContent +
      " " +
      diameter.textContent +
      " " +
      takeoff.textContent +
      " " +
      connection.textContent;
    const elem = document.createElement("div");
    elem.classList.add("product");
    elem.innerHTML = `<div class="product__container cart__elem">
        <div class='product__name'>${
          name.textContent
        }</div><div><img class='product__img' src='${imgSrc}'></img></div><div class='product__purchase'><div class='product__price'>${
      price.textContent
    }</div><div class='product__regulation'><span class="product__plus">+</span><span class="product__amount">${
      window[`${name.textContent}Amount`]
    } шт.</span><span class='product__minus'>-</span></div> </div><div><div></div>`;
    productsContainer.appendChild(elem);
    window[`${name.textContent}Price`] =
      elem.querySelector(".product__price").textContent;
    elem.querySelector(".product__plus").addEventListener("click", increment);
    elem.querySelector(".product__minus").addEventListener("click", decrement);
  }
  window.cartAmount ? window.cartAmount++ : (window.cartAmount = 1);
  document.querySelector(".cart__amount").textContent = window.cartAmount;
  formFill();
};
const phoneHandler = (event) => {
  event.preventDefault();
  if (
    event.target.querySelector(".phone__input").value.match(NUMBER__PATTERN)
  ) {
    event.target
      .querySelector(".phone__input")
      .classList.remove("input__error");
    formSubmit(event.target);
  } else {
    event.target.querySelector(".phone__input").classList.add("input__error");
  }
};
async function formSubmit(form) {
  const button = form.querySelector(".phone__button");
  button.setAttribute("disabled", "disabled");
  button.querySelector(".phone__span").classList.add("hidden");
  button.querySelector(".fa-spinner").classList.remove("hidden");
  let formData = new FormData(form);
  let response = await fetch("mail.php", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    button.removeAttribute("disabled");
    button.querySelector(".phone__span").classList.remove("hidden");
    button.querySelector(".fa-spinner").classList.add("hidden");
    form.querySelector(".phone__input").value = "";
    form.reset();
  } else {
    alert("Ошибка");
    button.removeAttribute("disabled");
    button.querySelector(".phone__span").classList.remove("hidden");
    button.querySelector(".fa-spinner").classList.add("hidden");
  }
}
async function formSubmitCart(form) {
  const button = form.querySelector(".phone__button");
  button.setAttribute("disabled", "disabled");
  button.querySelector(".phone__span").classList.add("hidden");
  button.querySelector(".fa-spinner").classList.remove("hidden");
  let formData = new FormData(form);
  let response = await fetch("product_mail.php", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    button.removeAttribute("disabled");
    button.querySelector(".phone__span").classList.remove("hidden");
    button.querySelector(".fa-spinner").classList.add("hidden");
    form.querySelector(".phone__input").value = "";
    form.reset();
  } else {
    alert("Ошибка");
    button.removeAttribute("disabled");
    button.querySelector(".phone__span").classList.remove("hidden");
    button.querySelector(".fa-spinner").classList.add("hidden");
  }
}

function sheet2arr(sheet) {
  const result = [];
  let row;
  let rowNum;
  let colNum;
  const range = XLSX.utils.decode_range(sheet["!ref"]);
  for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    row = [];
    for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
      const nextCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
      if (typeof nextCell === "undefined") {
        row.push(void 0);
      } else {
        row.push(nextCell.w);
      }
    }
    result.push(row);
  }
  return result;
}

function App() {
  const [sheets, setSheets] = useState(null);
  const [currentSheet, setCurrentSheet] = useState(null);

  useEffect(() => {
    loadFile();
  }, []);

  function loadFile() {
    const req = new XMLHttpRequest();
    req.open("GET", "./tyres.xlsx", true);
    req.responseType = "arraybuffer";
    req.onload = function (e) {
      const workBook = XLSX.read(req.response, { type: "array" });

      const allSheets = Object.keys(workBook.Sheets).map((sheet) => {
        return {
          sheet: sheet,
          rows: sheet2arr(workBook.Sheets[sheet])
            .filter((row) => row[1])
            .map((row) => row),
        };
      });
      setSheets(allSheets);
      setCurrentSheet(allSheets[0]);
    };
    req.send();
  }
  const disks = document.querySelector(".disks__elem");
  const tyresSeasons = document.querySelector(".tyres__seasons");
  const tyresManager = (theSheet, tyres) => {
    console.log(theSheet);
    if (!theSheet) {
      return "";
    } else {
      theSheet.sort((a, b) => (Number(a[2]) > Number(b[2]) ? 1 : -1));
      const widthArray = [];
      const heightToWidthArray = [];
      const diameterArray = [];
      const tyresWidth = tyres.querySelector(".tyres__width");
      const tyresHeighttoWidth = tyres.querySelector(".tyres__heighttowidth");
      const tyresDiameter = tyres.querySelector(".tyres__diameter");

      theSheet.forEach((element) => {
        if (
          element[1].split(" ")[1] !== undefined &&
          Number(element[1].split(" ")[1].split("/")[0]) &&
          !widthArray.includes(element[1].split(" ")[1].split("/")[0]) &&
          element[1].split(" ")[1].includes("/")
        ) {
          widthArray.push(element[1].split(" ")[1].split("/")[0]);
        }
      });

      theSheet.forEach((element) => {
        if (
          element[1].split(" ")[1] !== undefined &&
          Number(element[1].split(" ")[1].split("/")[1]) &&
          !heightToWidthArray.includes(
            element[1].split(" ")[1].split("/")[1]
          ) &&
          element[1].split(" ")[1].includes("/")
        ) {
          heightToWidthArray.push(element[1].split(" ")[1].split("/")[1]);
        }
      });

      theSheet.forEach((element) => {
        if (
          element[1].split(" ")[2] !== undefined &&
          !diameterArray.includes(element[1].split(" ")[2]) &&
          element[1].split(" ")[2].includes("R1")
        ) {
          diameterArray.push(element[1].split(" ")[2]);
        }
      });
      widthArray.sort(function (b, a) {
        return b - a;
      });
      heightToWidthArray.sort(function (b, a) {
        return b - a;
      });
      diameterArray.sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      const optionInsertion = (elem, parent) => {
        const option = document.createElement("option");
        option.textContent = elem;
        option.setAttribute("value", elem);
        option.classList.add("option");
        parent.appendChild(option);
      };
      tyresWidth.innerHTML = `<option value="all" class="option">Все</option>`;
      widthArray.forEach((elem) => {
        optionInsertion(elem, tyresWidth);
      });
      tyresHeighttoWidth.innerHTML = `<option value="all" class="option">Все</option>`;
      heightToWidthArray.forEach((elem) => {
        optionInsertion(elem, tyresHeighttoWidth);
      });
      tyresDiameter.innerHTML = `<option value="all" class="option">Все</option>`;
      diameterArray.forEach((elem) => {
        optionInsertion(elem, tyresDiameter);
      });
      tyres.classList.remove("hidden");
      const submitHandler = (event) => {
        let widthAll = false;
        let heightToWidthAll = false;
        let diameterAll = false;
        const width = tyresWidth.value;
        const heightToWidth = tyresHeighttoWidth.value;
        const diameter = tyresDiameter.value;
        if (width === "all") {
          widthAll = true;
        }
        if (heightToWidth === "all") {
          heightToWidthAll = true;
        }
        if (diameter === "all") {
          diameterAll = true;
        }
        const container = event.target.closest(".cat").lastElementChild;
        container.innerHTML = "";
        theSheet
          .filter(
            (elem) =>
              (elem[1].includes(width) ||
                (elem[1].split(" ")[1] !== undefined &&
                  widthAll &&
                  widthArray.includes(elem[1].split(" ")[1].split("/")[0]))) &&
              (elem[1].includes(heightToWidth) ||
                (elem[1].split(" ")[1] !== undefined &&
                  heightToWidthAll &&
                  heightToWidthArray.includes(
                    elem[1].split(" ")[1].split("/")[1]
                  ))) &&
              (elem[1].includes(diameter) ||
                (elem[1].split(" ")[2] !== undefined &&
                  diameterAll &&
                  diameterArray.includes(elem[1].split(" ")[2])))
          )
          .map((elem) => {
            const brick = document.createElement("div");
            brick.textContent = elem;
            brick.innerHTML = `<h2 class="brick__heading">${elem[1]
              .split(" ")
              .slice(3)
              .join(" ")}</h2>
                    <img src='${
                      elem[5] !== undefined
                        ? elem[5].toString()
                        : "./img/Foto/HLB1o0QgS9zqK1RjSZPxq6A4tVXan.jpg"
                    }' alt="" class="brick__img">
                    <div class="brick__width">Ширина: ${
                      elem[1].split(" ")[1].split("/")[0]
                    }</div>
                    <div class="brick__profile">Профиль: ${
                      elem[1].split(" ")[1].split("/")[1]
                    }</div>
                    <div class="brick__diameter">Диаметр: ${
                      elem[1].split(" ")[2]
                    }</div>
                    <button class="button-6 brick__button order__button"> <i class="fa fa-cart-plus" aria-hidden="true" style="padding-right: 3px;"></i> Купить</button>
                    <form action='mail.php' class='phone__form hidden' method='POST' role="form"
                    target="_blank" novalidate>
                    <input name="number" type="tel" class='phone__input' pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}" required placeholder="Введите свой номер" >
                    <button class="phone__button button-6"><i class="fa fa-phone" aria-hidden="true" style="padding-right: 3px;"></i> <span class="phone__span">Заказать звонок</span> <i
                    class="fa fa-spinner fa-pulse fa-x fa-fw hidden"></i></button></form>
                    <div class="brick__price">${elem[2]}₽</div>`;
            brick
              .querySelector(".brick__button")
              .addEventListener("click", brickTireBuyHandler);
            brick.classList.add("brick");
            container.appendChild(brick);
          });
      };
      const tyresButton = tyres.querySelector(".tyres__button");
      tyresButton.addEventListener("click", submitHandler);
    }
  };
  const disksManager = () => {
    sheets[2].rows.sort((a, b) => (Number(a[2]) > Number(b[2]) ? 1 : -1));
    const widthArray = [];
    const diameterArray = [];
    const connectionArray = [];
    const takeoffArray = [];
    const stupArray = [];
    const disksWidth = disks.querySelector(".disks__width");
    const disksDiameter = disks.querySelector(".disks__diameter");
    const disksConnection = disks.querySelector(".disks__connection");
    const disksTakeoff = disks.querySelector(".disks__takeoff");
    const disksStup = disks.querySelector(".disks__stup");
    sheets[2].rows.forEach((element) => {
      if (
        element[1].split(" ")[2] !== undefined &&
        !diameterArray.includes(element[1].split(" ")[2]) &&
        element[1].split(" ")[2].includes("Р")
      ) {
        diameterArray.push(element[1].split(" ")[2]);
      }
    });
    sheets[2].rows.forEach((element) => {
      if (
        element[1].split(" ")[3] !== undefined &&
        !connectionArray.includes(element[1].split(" ")[3]) &&
        element[1].split(" ")[3].includes("*") &&
        Number(element[1].split(" ")[3].split("*")[1]) > 40
      ) {
        connectionArray.push(element[1].split(" ")[3]);
      }
    });
    sheets[2].rows.forEach((element) => {
      if (
        element[1].split(" ")[4] !== undefined &&
        Number(element[1].split(" ")[4].split("*")[1]) &&
        Number(element[1].split(" ")[4].split("*")[1]) < 11 &&
        !widthArray.includes(element[1].split(" ")[4].split("*")[1]) &&
        element[1].split(" ")[4].includes("*")
      ) {
        widthArray.push(element[1].split(" ")[4].split("*")[1]);
      }
    });
    sheets[2].rows.forEach((element) => {
      if (
        element[1] !== undefined &&
        element[1].includes("ET") &&
        Number(element[1].slice(element[1].indexOf("ET"))[2]) &&
        !takeoffArray.includes(
          element[1].slice(element[1].indexOf("ET")).split(" ")[0]
        )
      ) {
        takeoffArray.push(
          element[1].slice(element[1].indexOf("ET")).split(" ")[0]
        );
      }
    });
    sheets[2].rows.forEach((element) => {
      if (
        element[1] !== undefined &&
        element[1].includes("D") &&
        Number(element[1].slice(element[1].indexOf("D"))[1]) &&
        !stupArray.includes(
          element[1].slice(element[1].indexOf("D")).split(" ")[0]
        ) &&
        !element[1].slice(element[1].indexOf("D")).split(" ")[0].includes("x")
      ) {
        stupArray.push(element[1].slice(element[1].indexOf("D")).split(" ")[0]);
      }
    });
    widthArray.sort(function (b, a) {
      return a - b;
    });
    stupArray.sort(function (b, a) {
      return a - b;
    });
    diameterArray.sort(function (b, a) {
      return a - b;
    });
    takeoffArray.sort(function (b, a) {
      return a - b;
    });
    connectionArray.sort(function (b, a) {
      return a - b;
    });
    const optionInsertion = (elem, parent) => {
      const option = document.createElement("option");
      option.textContent = elem;
      option.setAttribute("value", elem);
      option.classList.add("option");
      parent.appendChild(option);
    };
    widthArray.forEach((elem) => {
      optionInsertion(elem, disksWidth);
    });
    stupArray.forEach((elem) => {
      optionInsertion(elem, disksStup);
    });
    takeoffArray.forEach((elem) => {
      optionInsertion(elem, disksTakeoff);
    });
    connectionArray.forEach((elem) => {
      optionInsertion(elem, disksConnection);
    });
    diameterArray.forEach((elem) => {
      optionInsertion(elem, disksDiameter);
    });
    const submitHandler = (event) => {
      let widthAll = false;
      let stupAll = false;
      let diameterAll = false;
      let connectionAll = false;
      let takeoffAll = false;
      const width = disksWidth.value;
      const stup = disksStup.value;
      const diameter = disksDiameter.value;
      const takeoff = disksTakeoff.value;
      const connection = disksConnection.value;
      if (width === "all") {
        widthAll = true;
      }
      if (stup === "all") {
        stupAll = true;
      }
      if (diameter === "all") {
        diameterAll = true;
      }
      if (takeoff === "all") {
        takeoffAll = true;
      }
      if (connection === "all") {
        connectionAll = true;
      }
      const container = event.target.closest(".cat").lastElementChild;
      container.innerHTML = "";
      sheets[2].rows
        .filter(
          (elem) =>
            (elem[1].includes(width) ||
              (elem[1].split(" ")[4] !== undefined &&
                widthAll &&
                widthArray.includes(elem[1].split(" ")[4].split("*")[1]))) &&
            (elem[1].includes(takeoff) ||
              (elem[1] !== undefined &&
                takeoffAll &&
                takeoffArray.includes(
                  elem[1].slice(elem[1].indexOf("ET")).split(" ")[0]
                ))) &&
            (elem[1].includes(diameter) ||
              (elem[1].split(" ")[2] !== undefined &&
                diameterAll &&
                diameterArray.includes(elem[1].split(" ")[2]))) &&
            (elem[1].includes(stup) ||
              (elem[1] !== undefined &&
                stupAll &&
                stupArray.includes(
                  elem[1].slice(elem[1].indexOf("D")).split(" ")[0]
                ))) &&
            (elem[1].includes(connection) ||
              (elem[1].split(" ")[3] !== undefined &&
                connectionAll &&
                connectionArray.includes(elem[1].split(" ")[3])))
        )
        .map((elem) => {
          const brick = document.createElement("div");
          brick.textContent = elem;
          brick.innerHTML = `<h2 class="brick__heading">${elem[1]
            .replace(elem[1].split(" ")[4], "")
            .replace(elem[1].slice(elem[1].indexOf("D")).split(" ")[0], "")
            .replace(elem[1].split(" ")[2], "")
            .replace(elem[1].slice(elem[1].indexOf("ET")).split(" ")[0], "")
            .replace(elem[1].split(" ")[3], "")
            .replace("Диск колесный", "")}</h2>
                <img src="https://kemp103.ru/i3/dd/131549013-1-0-917b67783a6cb8d1e765a6d79e3aedee.jpg" alt="" class="brick__img">
                <div class="brick__width">Ширина: ${
                  elem[1].split(" ")[4].split("*")[1]
                }</div>
                <div class="brick__stup">Ступица: ${
                  elem[1].slice(elem[1].indexOf("D")).split(" ")[0]
                }</div>
                <div class="brick__diameter">Диаметр: ${
                  elem[1].split(" ")[2]
                }</div>
                <div class="brick__takeoff">Вылет: ${
                  elem[1].slice(elem[1].indexOf("ET")).split(" ")[0]
                }</div>
                <div class="brick__connection">Крепёж: ${
                  elem[1].split(" ")[3]
                }</div>
                <button class="button-6 brick__button order__button"> <i class="fa fa-cart-plus" aria-hidden="true" style="padding-right: 3px;"></i> Купить</button>
                <form action='mail.php' class='phone__form hidden' method="POST" role="form"
                target="_blank" novalidate>
                <input type="tel" name="number" class='phone__input' pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}" required placeholder="Введите свой номер" >
                <button class="phone__button button-6"><i class="fa fa-phone" aria-hidden="true" style="padding-right: 3px;"></i> <span class="phone__span">Заказать звонок</span> <i
                class="fa fa-spinner fa-pulse fa-x fa-fw hidden"></i></button></form>
                <div class="brick__price">${elem[2]}₽</div>`;
          brick
            .querySelector(".brick__button")
            .addEventListener("click", brickDiskBuyHandler);
          brick.classList.add("brick");
          container.appendChild(brick);
        });
    };

    const disksButton = disks.querySelector(".disks__button");
    disksButton.addEventListener("click", submitHandler);
  };
  const seasonPicker = () => {
    const value = document.querySelector(".season__select").value;
    if (value === "all") {
      tyresManager(multySeason, tyresSeasons);
    }
    if (value === "summer") {
      tyresManager(sheets[0].rows, tyresSeasons);
    }
    if (value === "winter") {
      tyresManager(sheets[1].rows, tyresSeasons);
    }
  };
  if (!currentSheet) {
    return "";
  } else {
    multySeason = sheets[0].rows.concat(sheets[1].rows);
    seasonPicker();
    document
      .querySelector(".season__select")
      .addEventListener("change", seasonPicker);
    disksManager();
    document
      .querySelectorAll(".inDevelopment__form")
      .forEach((elem) => elem.addEventListener("submit", phoneHandler));
  }
}

render(html`<${App} />`, document.querySelector(".cat"));
