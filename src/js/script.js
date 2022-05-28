function createIdArrayProdutos() {
	return produtos.forEach(
		(produto) =>
			(produto.id = produto.nome
				.normalize("NFD")
				.toLowerCase()
				.replace(/[\u0300-\u036f]/g, "")
				.split(" ")
				.join(""))
	);
}
createIdArrayProdutos();

function createData(productArray) {
	return productArray.forEach((product) => {
		createListProducts(product);
	});
}
function createListProducts(product) {
	const list = document.querySelector("ul");
	const infoProduct = document.createElement("li");
	infoProduct.classList.add(
		"product-list__item",
		`${product.secao.toLowerCase()}`
	);
	const treatedName = product.nome
		.normalize("NFD")
		.toLowerCase()
		.replace(/[\u0300-\u036f]/g, "")
		.split(" ")
		.join("");
	// Fonte: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript (Peguei o regexp do replace aqui!)
	infoProduct.id = `${treatedName}`;
	const imgProduct = createImgProduct(product);
	const nameProduct = createNameProduct(product);
	const priceProduct = createPriceProduct(product);
	const priceSection = createSectionProduct(product);
	list.append(infoProduct);
	infoProduct.append(imgProduct, nameProduct, priceSection, priceProduct);
	return infoProduct;
}

function createImgProduct(product) {
	const imgProduct = document.createElement("img");
	imgProduct.src = `${product.img.replace("ç", "c")}`;
	imgProduct.alt = `Imagem ${product.nome.toLowerCase()}`;
	return imgProduct;
}

function createNameProduct(product) {
	const nameProduct = document.createElement("h3");
	nameProduct.innerText = product.nome;
	nameProduct.classList.add("item__name");
	return nameProduct;
}

function createSectionProduct(product) {
	const priceSection = document.createElement("span");
	priceSection.innerText = `${product.secao}`;
	priceSection.classList.add("item__section");
	return priceSection;
}
function createPriceProduct(product) {
	const priceProduct = document.createElement("p");
	priceProduct.innerText = `R$ ${product.preco.toFixed(2)}`;
	priceProduct.classList.add("item__price");
	return priceProduct;
}

createData(produtos);
totalPrice(produtos);

const getSearch = document.querySelector(".search-name");
["click", "keypress"].forEach((event) =>
	getSearch.addEventListener(event, searchProduct)
);

function searchProduct(event) {
	if (
		event.target.tagName === "BUTTON" ||
		event.target.tagName === "IMG" ||
		event.key === "Enter"
	) {
		const productFilter = getProductsByName(
			document.querySelector("input").value
		);
		clearAndList(productFilter);
		totalPrice(productFilter);
	}
}

function clearAndList(products) {
	const elementsList = document.querySelectorAll("li");
	const list = document.querySelector("ul");
	const arrayList = Array.from(elementsList);
	arrayList.forEach((product) => {
		list.removeChild(product);
	});
	return createData(products);
}

function filterAndList(deleteProducts, addProduct) {
	const elementsList = document.querySelectorAll("li");
	const list = document.querySelector("ul");
	const arrayList = Array.from(elementsList);

	arrayList.forEach((product) => {
		let verificacao = 0;
		deleteProducts.forEach((deleteProduct) => {
			if (deleteProduct.id === product.id) {
				verificacao = 1;
				if (verificacao === 1) {
					product.classList.add("transitionImages");
					setTimeout(() => {
						list.removeChild(product);
					}, 200);
					verificacao = 0;
				}
			}
		});
	});
	let verificacao2 = 0;
	arrayList.forEach((product) => {
		product.id === addProduct[0].id ? (verificacao2 = 1) : null;
	});
	if (verificacao2 === 0) {
		return createData(addProduct);
	}
}

function totalPrice(products) {
	const newPrice = products
		.reduce((accumulator, currentValue) => accumulator + currentValue.preco, 0)
		.toFixed(2);
	const precoTotal = document.querySelector("#precoTotal");
	precoTotal.innerText = newPrice;
	return precoTotal;
}

function getProductsByName(value) {
	let productFilter = [];

	productFilter = produtos.filter((product) =>
		product.nome.toLowerCase().includes(value.toLowerCase())
	);
	return productFilter;
}

function getProductsBySection(value) {
	let productFilter = [];
	productFilter = produtos.filter((product) =>
		product.secao.toLowerCase().includes(value.toLowerCase())
	);
	return productFilter;
}

function getProductsThatAreNotSelected(value) {
	let productsNotFiltered = produtos.filter(
		(product) => !product.secao.toLowerCase().includes(value.toLowerCase())
	);
	return productsNotFiltered;
}

const filtersContainer = document.querySelectorAll(".button--standard");
filtersContainer.forEach((button) =>
	button.addEventListener("click", filterByButton)
);

function filterByButton(event) {
	const sectionChoose = event.target.id;
	if (sectionChoose != "todos") {
		const productFilter = getProductsBySection(sectionChoose);
		const notSelectedProducts = getProductsThatAreNotSelected(sectionChoose);
		filterAndList(notSelectedProducts, productFilter);
		totalPrice(productFilter);
		tradeSelectClass(sectionChoose);
	} else {
		clearAndList(produtos);
		totalPrice(produtos);
		tradeSelectClass(sectionChoose);
	}
}

function tradeSelectClass(idSection) {
	const lastSelected = document.querySelector(".button--selected");
	lastSelected.classList.remove("button--selected");
	const sectionChoose = document.querySelector(`#${idSection}`);
	sectionChoose.classList.add("button--selected");
}
