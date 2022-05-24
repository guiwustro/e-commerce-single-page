function createData(productArray) {
	productArray.forEach((product) => {
		createListProducts(product);
	});
}
function createListProducts(product) {
	const list = document.querySelector("ul");
	const infoProduct = document.createElement("li");
	const imgProduct = createImgProduct(product);
	const nameProduct = createNameProduct(product);
	const priceProduct = createPriceProduct(product);
	list.append(infoProduct);
	infoProduct.append(imgProduct, nameProduct, priceProduct);
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
	return nameProduct;
}

function createPriceProduct(product) {
	const priceDescription = document.createElement("p");
	priceDescription.innerText = product.preco.toFixed(2);
	const priceNumber = document.createElement("span");
	priceNumber.innerText = `Seção - ${product.secao}`;
	priceDescription.append(priceNumber);
	return priceDescription;
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
	if (
		event.target.className ===
		"estiloGeralBotoes estiloGeralBotoes--mostrarTodos"
	) {
		clearAndList(produtos);
		totalPrice(produtos);
	} else if (event.target.className.includes("estiloGeralBotoes--filtrar")) {
		//A ideia aqui era fazer de um jeito que eu pudesse identificar qual seria o botão clicado da forma mais "clean" possível. Ao invés de usar a condicional com o nome do produto, filtrei usando regexp
		//!Explicação regexp: Usando match com o regex cria um array com as possibilidades filtradas. Nesse caso a length vai ser 2 e o nome do filtro encontrado será o segundo elemento(o elemento entre parentenses - ).
		let sectionName = event.target.className.match(/filtrar(\w+)/)[1];
		const productFilter = getProductsBySection(sectionName);
		clearAndList(productFilter);
		totalPrice(productFilter);
	}
}
