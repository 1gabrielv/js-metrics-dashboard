let produtos = []
const form = document.getElementById('product-form');
const areaDeInjecao = document.getElementById('product-list');

const Total = document.getElementById('valor-total');
const Medio = document.getElementById('preco-medio');
const Qtd = document.getElementById('total-itens');

function atualizarMetricas() {
    let somaTotal = 0;
    produtos.forEach(function(item) {
        somaTotal += item.preco;
    });

    let media = produtos.length > 0 ? somaTotal / produtos.length : 0;

    Total.innerText = `R$ ${somaTotal.toFixed(2)}`;
    Medio.innerText = `R$ ${media.toFixed(2)}`;
    Qtd.innerText = produtos.length;
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const preco = parseFloat(document.getElementById('preco').value);

    const novoProduto = {
        id: Date.now(),
        nome: nome,
        categoria: categoria,
        preco: preco
    };

    produtos.push(novoProduto);
    console.log("Lista atual de produtos:", produtos);

    form.reset();
    alert("Produto " + nome + " adicionado com sucesso! 👍");
    desenharCards();
    atualizarMetricas();
});



function desenharCards() {
    areaDeInjecao.innerHTML = '';

    produtos.forEach(function(item) {
        const cardHtml = `
            <div class="product-card">
                <strong>${item.nome}</strong>
                <p>Categoria: ${item.categoria}</p>
                <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                <button class="btn-remove" onclick="removerItem(${item.id})">Remover</button>
            </div>
        `;

        areaDeInjecao.innerHTML += cardHtml;
    });
}

function removerItem(id) {
    produtos = produtos.filter(function(item) {
        return item.id !== id;
    });

    desenharCards();
}