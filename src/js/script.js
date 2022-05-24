function createData(productArray) {
	return productArray.forEach((product) => {
		createListProducts(product);
	});
}
function createListProducts(product) {
	const list = document.querySelector("ul");
	const infoProduct = document.createElement("li");
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
	nameProduct.classList.add("nameProduct");
	return nameProduct;
}

function createSectionProduct(product) {
	const priceSection = document.createElement("span");
	priceSection.innerText = `${product.secao}`;
	priceSection.classList.add("sectionProduct");
	return priceSection;
}
function createPriceProduct(product) {
	const priceProduct = document.createElement("p");
	priceProduct.innerText = `R$ ${product.preco.toFixed(2)}`;
	priceProduct.classList.add("priceProduct");
	return priceProduct;
}

createData(produtos);
totalPrice(produtos);

const getSearch = document.querySelector(".containerBuscaPorNome");
["click", "keypress"].forEach((event) =>
	getSearch.addEventListener(event, searchProduct)
);

function searchProduct(event) {
	if (event.target.tagName === "BUTTON" || event.key === "Enter") {
		const productFilter = getProductsByName(
			document.querySelector("input").value
		);
		clearAndList(productFilter);
		totalPrice(productFilter);
	}
}

function clearAndList(products) {
	const list = document.querySelector("ul");
	list.innerHTML = "";
	createData(products);
}

function totalPrice(products) {
	const newPrice = products
		.reduce((accumulator, currentValue) => accumulator + currentValue.preco, 0)
		.toFixed(2);
	const precoTotal = document.querySelector("#precoTotal");
	precoTotal.innerText = newPrice;
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

const filtersContainer = document.querySelector(".filtersContainer");
filtersContainer.addEventListener("click", filterByButton);

function filterByButton(event) {
	const sectionChoose = event.target.id;
	if (
		sectionChoose == "hortifruti" ||
		sectionChoose === "panificadora" ||
		sectionChoose == "laticinios"
	) {
		const productFilter = getProductsBySection(sectionChoose);
		tradeOldSectionClass();
		clearAndList(productFilter);
		totalPrice(productFilter);
		tradeNewSectionClass(sectionChoose);
	} else if (sectionChoose === "todos") {
		tradeOldSectionClass();
		clearAndList(produtos);
		totalPrice(produtos);
		tradeNewSectionClass(sectionChoose);
	}
}

function tradeNewSectionClass(id) {
	const sectionSelected = document.querySelector(`#${id}`);
	sectionSelected.classList.add("estiloGeralBotoes--selected");
	sectionSelected.classList.remove("estiloGeralBotoes--padrao");
	return sectionSelected;
}

function tradeOldSectionClass() {
	const lastSelected = document.querySelector(".estiloGeralBotoes--selected");
	lastSelected.classList.remove("estiloGeralBotoes--selected");
	lastSelected.classList.add("estiloGeralBotoes--padrao");
	return lastSelected;
}
