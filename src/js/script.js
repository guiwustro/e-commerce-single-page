const list = document.querySelector("ul");

function listProducts(productArray) {
	productArray.forEach((product) => {
		const infoProduct = document.createElement("li");
		infoProduct.innerHTML = `
    <img src="${product.img.replace(
			"ç",
			"c"
		)}" alt="Imagem ${product.nome.toLowerCase()}">
    <h3>${product.nome}</h3>
    <p>R${product.preco.toFixed(2)}</p>
    <span>Seção - ${product.secao}</span>
    `;
		list.appendChild(infoProduct);
	});
}
listProducts(produtos);
totalPrice(produtos);

let productFilter = [];
const getSearch = document.querySelector(".containerBuscaPorNome");
["click", "keypress"].forEach((event) =>
	getSearch.addEventListener(event, searchProduct)
);

function searchProduct(event) {
	if (event.target.tagName === "BUTTON" || event.key === "Enter") {
		getFilterProductsByName(document.querySelector("input").value);
		clearAndList(productFilter);
		totalPrice(productFilter);
	}
}

function clearAndList(products) {
	list.innerHTML = "";
	listProducts(products);
}

function totalPrice(products) {
	const newPrice = products
		.reduce((accumulator, currentValue) => accumulator + currentValue.preco, 0)
		.toFixed(2);
	const precoTotal = document.querySelector("#precoTotal");
	precoTotal.innerHTML = newPrice;
}

function getFilterProductsByName(value) {
	productFilter = produtos.filter((product) =>
		product.nome.toLowerCase().includes(value.toLowerCase())
	);
	return productFilter;
}

function getFilterProductsBySection(value) {
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
	} else if (event.target.className.includes("estiloGeralBotoes")) {
		//A ideia aqui era fazer de um jeito que eu pudesse identificar qual seria o botão clicado da forma mais "clean" possível. Ao invés de usar a condicional com o nome do produto, filtrei usando regexp
		//!Explicação regexp: Usando match com o regex cria um array com as possibilidades filtradas. Nesse caso a length vai ser 3 e o nome do filtro encontrado será o segundo elemento(o elemento entre parentenses - ).
		console.log(event.target.className.match(/(filtrar(\w+))/));
		let sectionName = event.target.className.match(/(filtrar(\w+))/)[2];
		getFilterProductsBySection(sectionName);
		clearAndList(productFilter);
		totalPrice(productFilter);
	}
}
