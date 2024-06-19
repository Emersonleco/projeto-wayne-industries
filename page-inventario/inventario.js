
let itens = JSON.parse(localStorage.getItem('itens')) || [];

const catalogo = document.querySelector('.catalogo');


function salvarItens() {
    localStorage.setItem('itens', JSON.stringify(itens));
}

function addItens() {

    const titulo = document.querySelector('#titulo');
    const quantidade = document.querySelector('#quantidade');

    const erroTitulo = validarCampo(titulo);
    if (erroTitulo) {
        alert(erroTitulo);
        return false; 
    }

    const erroQuantidade = validarCampo(quantidade);
    if (erroQuantidade) {
        alert(erroQuantidade);
        return false; 
    }
    
    const novoItem = {
        titulo: titulo.value,
        quantidade: Number(quantidade.value)
    };
    itens.push(novoItem);
    salvarItens();
    titulo.value = '';
    quantidade.value = '';
    listarItens(itens);

    return true; 
}

function validarCampo(input) {
    if (input.value.trim() === '') {
        return 'Preencha os campos solicitados!';
    }
    return '';
}

function listarItens(catalogoArray) {
    
    catalogo.innerHTML = '';
    for (const item of catalogoArray) {
        //Criar div com itens
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<h3 class="h3-titulo">${item.titulo}</h3>
        <h3 class="h3-quantidade">${item.quantidade}</h3>`;
        catalogo.appendChild(div);
        // Criar div com botões
        const divButtons = document.createElement('div')
        divButtons.classList.add('div-btn')
        div.appendChild(divButtons)
         //Criar botão editar
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('button-form');
        btnEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        btnEditar.addEventListener('click', () => editarItem(item));
        divButtons.appendChild(btnEditar)
        //Criar botão exluir
        const btnExcluir = document.createElement('button');
        btnExcluir.classList.add('button-form');
        btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btnExcluir.addEventListener('click', () => excluirItem(div, item.titulo));
        divButtons.appendChild(btnExcluir);
    }
    
}

function editarItem(item) {
    // Exibir popUp para edição
    const novoTitulo = prompt('Novo nome:', item.titulo);
    const novaQuantidade = prompt('Nova quantidade:', item.quantidade);
    item.titulo = novoTitulo;
    item.quantidade = novaQuantidade;
    // Autenticar se os campos estão vazios ou nulos
    if (item.titulo === '' || item.quantidade === '') {
        alert('Digite os novos valores');
        editarItem(item);
    }
    else if(item.titulo, item.quantidade) {
        const index = itens.findIndex((e) => e.titulo === item.titulo);
        itens[index].titulo = novoTitulo;
        itens[index].quantidade = novaQuantidade;
    
        salvarItens();
        listarItens(itens);
    }
    else{
        alert('Digite os novos valores');
        editarItem(item);
    }
}



function excluirItem(div, item){
    //Exibir popUp de confirmação
    const confirmacao = window.confirm(`Deseja realmente excluir o item "${item}"?`);

    if (confirmacao) {
        catalogo.removeChild(div);
        const index = itens.findIndex((element) => element.titulo === item);
        if (index !== -1) {
            itens.splice(index, 1);
            salvarItens();
        } else {
            console.log(`Item "${item}" não encontrado na lista.`);
        }
}
}


function searchEquipamento() {
    const termo = document.querySelector('#termo-busca').value;
    const resultados = itens.filter((item) => {
        return item.titulo === termo });

    if (termo === ''){
        alert('digite o item a buscar');
        return listarItens(itens);
    }
    else{
        listarItens(resultados);
    }
}

listarItens(itens);



// animação nav-bar///
const navs = document.querySelectorAll(".nav div")
const navsContent = document.querySelectorAll(".nav-content div")

navs.forEach((nav, index) => {
    nav.addEventListener("click", () =>{
        navsContent.forEach((content) => {
            content.classList.remove("active")
        })
        navs.forEach((nav) => {
            nav.classList.remove("active")
        })
        navs[index].classList.add("active")
        navsContent[index].classList.add("active")
    })
})