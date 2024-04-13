import DespesaDomestica from "./Models/DespesaDomestica.js";
import DespesaLazer from "./Models/DespesaLazer.js";
import DespesaSaude from "./Models/DespesaSaude.js";

const selectCategoria = document.getElementById("categoria");
const listaDomestico = document.getElementById("lista_domestico");
const listaSaude = document.getElementById("lista_saude");
const listaLazer = document.getElementById("lista_lazer");
const formularioAddItem = document.getElementById("form-gasto")
const formularioEditItem = document.getElementById("form-gasto-edit");
const addGastoButton = document.getElementById("addGastoButton");
const inputFilterDomestico = document.getElementById("filtro_domestico");
const inputFilterSaude = document.getElementById("filtro_saude");
const inputFilterLazer = document.getElementById("filtro_lazer");




const listaDespesaDomestica = [];
const listaDespesaSaude = [];
const listaDespesaLazer = [];

let filterDespesaDomestica = [];
let filterDespesaSaude = [];
let filterDespesaLazer = [];

let itemAtual;

selectCategoria.addEventListener("change", (event) => {
  const divInputCondicional = document.querySelector(".container-input-condicional");
  const inputCondicional = document.getElementById("input_condicional");
  const labelCondicional = document.getElementById("label_condicional");
  const selectCondicional = document.getElementById("select_condicional");
  const categoria = event.target.value;
  console.log(categoria);

  divInputCondicional.style.display = "flex";
  inputCondicional.style.display = "block";
  selectCondicional.style.display = "none";

  if (categoria === "Doméstico") {
    labelCondicional.innerHTML = "Finalidade";
    selectCondicional.value = "";
  } else if (categoria === "Saúde") {
    labelCondicional.innerHTML = "Tipo de Gasto";
    inputCondicional.style.display = "none";
    inputCondicional.value = "";
    selectCondicional.style.display = "block";
  } else if (categoria === "Lazer") {
    labelCondicional.innerHTML = "Local";
    selectCondicional.value = "";
  }
});

formularioAddItem.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputNome = document.getElementById("nome");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputValor = document.getElementById("valor");
    const inputCondicional = document.getElementById("input_condicional");
    const selectCondicional = document.getElementById("select_condicional");


    const nome = inputNome.value;
    const descricao = inputDescricao.value;
    const data = inputData.value;
    const valor = inputValor.value;
    const categoria = selectCategoria.value;
    const condicional = inputCondicional.value || selectCondicional.value;

    AddGasto(nome, descricao, data, valor, categoria, condicional);

    renderizarLista(listaDespesaDomestica, listaDomestico);
    renderizarLista(listaDespesaSaude, listaSaude);
    renderizarLista(listaDespesaLazer, listaLazer);
})

formularioEditItem.addEventListener("submit", (event) => {
  event.preventDefault();

  const divEdicao = document.getElementById("edit-container");
  const inputNomeEdicao = document.getElementById("nome_edit");
  const inputDescricaoEdicao = document.getElementById("descricao_edit");
  const inputDataEdicao = document.getElementById("data_edit");
  const inputValorEdicao = document.getElementById("valor_edit");
  const selectCategoriaEdicao = document.getElementById("categoria_edit");
  const inputCondicionalEdicao = document.getElementById("input_condicional_edit");
  const selectCondicionalEdicao = document.getElementById("select_condicional_edit");

  const nome = inputNomeEdicao.value;
  const descricao = inputDescricaoEdicao.value;
  const data = inputDataEdicao.value;
  const valor = inputValorEdicao.value;
  const categoria = selectCategoriaEdicao.value;
  let condicional;
  let item;

  item = listaDespesaDomestica.find((item) => item.id == itemAtual) || listaDespesaSaude.find((item) => item.id == itemAtual) || listaDespesaLazer.find((item) => item.id == itemAtual);

  item.nome = nome;
  item.descricao = descricao;
  item.data = data;
  item.valor = valor;

  if (categoria === "Doméstica") {
    item.finalidade = inputCondicionalEdicao.value;
  }
  else if (categoria === "Saúde") {
    item.tipoHigiene = selectCondicionalEdicao.value;
  }
  else if (categoria === "Lazer") {
    item.local = inputCondicionalEdicao.value;
  }

  divEdicao.style.display = "none";
  addGastoButton.disabled = false;
  
  renderizarLista(listaDespesaDomestica, listaDomestico);
  renderizarLista(listaDespesaSaude, listaSaude);
  renderizarLista(listaDespesaLazer, listaLazer);
})

inputFilterDomestico.addEventListener("input", (event) => {
  const filtro = event.target.value.toLowerCase();
  filterDespesaDomestica = listaDespesaDomestica.filter((item) => item.nome.toLowerCase().startsWith(filtro));

  if(filtro === ""){
    renderizarLista(listaDespesaDomestica, listaDomestico);
    return;
  }

  renderizarLista(filterDespesaDomestica, listaDomestico);
})

inputFilterSaude.addEventListener("input", (event) => {
  const filtro = event.target.value.toLowerCase();
  filterDespesaSaude = listaDespesaSaude.filter((item) => item.nome.toLowerCase().startsWith(filtro));

  if(filtro === ""){
    renderizarLista(listaDespesaSaude, listaSaude);
    return;
  }

  renderizarLista(filterDespesaSaude, listaSaude);
})

inputFilterLazer.addEventListener("input", (event) => {
  const filtro = event.target.value.toLowerCase();
  filterDespesaLazer = listaDespesaLazer.filter((item) => item.nome.toLowerCase().startsWith(filtro));

  if(filtro === ""){
    renderizarLista(listaDespesaLazer, listaLazer);
    return;
  }

  renderizarLista(filterDespesaLazer, listaLazer);
})



function AddGasto(nome, descricao, data, valor, categoria, condicional = null) {
  let despesa;

  if (categoria === "Doméstico") {
    despesa = new DespesaDomestica(nome, descricao, valor, data, condicional);
    listaDespesaDomestica.push(despesa);
  } else if (categoria === "Saúde") {
    despesa = new DespesaSaude(nome, descricao, valor, data, condicional);
    listaDespesaSaude.push(despesa);
  } else if (categoria === "Lazer") {
    despesa = new DespesaLazer(nome, descricao, valor, data, condicional);
    listaDespesaLazer.push(despesa);
  }
}

function renderizarLista(lista, listaElement) {
    listaElement.innerHTML = "";
    lista.forEach((despesa) => {
        const card = criarCardItem(despesa);
        card.dataset.id = despesa.id;
        card.dataset.tipo = despesa.categoria;
        listaElement.appendChild(card);
    });
}

function carregaValoresEdicao(despesa){
  const inputNomeEdicao = document.getElementById("nome_edit");
  const inputDescricaoEdicao = document.getElementById("descricao_edit");
  const inputDataEdicao = document.getElementById("data_edit");
  const inputValorEdicao = document.getElementById("valor_edit");
  const selectCategoriaEdicao = document.getElementById("categoria_edit");
  const inputCondicionalEdicao = document.getElementById("input_condicional_edit");
  const selectCondicionalEdicao = document.getElementById("select_condicional_edit");
  const labelCondicionalEdicao = document.getElementById("label_condicional_edit");
  const divEdicao = document.getElementById("edit-container");
  const divInputCondicionalEdit = document.getElementById("container-input-condicional-edit");

  selectCategoriaEdicao.addEventListener("change", (event) => {
    const categoria = event.target.value;
    console.log(categoria);
  
    divInputCondicionalEdit.style.display = "flex";
    inputCondicionalEdicao.style.display = "block";
    selectCondicionalEdicao.style.display = "none";
  
    if (categoria === "Doméstico") {
      labelCondicionalEdicao.innerHTML = "Finalidade";
      selectCondicionalEdicao.value = "";
    } else if (categoria === "Saúde") {
      labelCondicionalEdicao.innerHTML = "Tipo de Gasto";
      inputCondicionalEdicao.style.display = "none";
      inputCondicionalEdicao.value = "";
      selectCondicionalEdicao.style.display = "block";
    } else if (categoria === "Lazer") {
      labelCondicionalEdicao.innerHTML = "Local";
      selectCondicionalEdicao.value = "";
    }
  });

  divEdicao.style.display = "flex";
  divInputCondicionalEdit.style.display = "flex";

  inputCondicionalEdicao.style.display = "none";
  selectCondicionalEdicao.style.display = "none";

  inputNomeEdicao.value = despesa.nome;
  inputDescricaoEdicao.value = despesa.descricao;
  inputDataEdicao.value = despesa.data;
  inputValorEdicao.value = despesa.valor;
  selectCategoriaEdicao.value = despesa.categoria;

  selectCategoriaEdicao.disabled = true;

  const teste = despesa.finalidade;

  if (despesa.categoria === "Doméstica"){
    inputCondicionalEdicao.style.display = "block";
    inputCondicionalEdicao.value = despesa.finalidade;
  }
    
  if (despesa.categoria === "Saúde"){
    selectCondicionalEdicao.style.display = "block";
    selectCondicionalEdicao.value = despesa.tipoHigiene;
  }
    
  if (despesa.categoria === "Lazer"){
    inputCondicionalEdicao.style.display = "block";
    inputCondicionalEdicao.value = despesa.local;
  }
    
  addGastoButton.disabled = true;
}

function criarCardItem(despesa) {
    const { nome, descricao, data, valor, categoria } = despesa;
    let descCategoria;

    if (despesa instanceof DespesaDomestica){
        descCategoria = despesa.finalidade;
    } else if (despesa instanceof DespesaSaude){
        descCategoria = despesa.tipoHigiene;
    } else if (despesa instanceof DespesaLazer){
        descCategoria = despesa.local;
    }

    const card = document.createElement("div");
    card.classList.add("card-item");
    card.innerHTML = `
        <div style="display: flex; flex-direction: column;">
                <span>${nome}</span>
                <span>${descricao}</span>
        </div>

        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <span>${data}</span>
                <span>R$${valor}</span>
        </div>

        <div style="display: flex; flex-direction: column;">
                <span>${categoria}</span>
                <span>${descCategoria}</span>
        </div>

        <div style="display: flex; flex-direction: column;">
                <span class="botaoEditar" style="color: blue; cursor: pointer">Editar</span>
                <span class="botaoExcluir" style="color: red; cursor: pointer">Excluir</span>
        </div>
        `;

        card.querySelector('.botaoEditar').addEventListener('click', function(event) {
          const cardElement = event.target.closest('.card-item');
          const itemId = cardElement.dataset.id;
          const tipo = cardElement.dataset.tipo;
          let item;

          if (tipo === "Doméstica") {
            item = listaDespesaDomestica.find((item) => item.id == itemId);
          } else if (tipo === "Saúde") {
            item = listaDespesaSaude.find((item) => item.id == itemId);
          } else if (tipo === "Lazer") {
            item = listaDespesaLazer.find((item) => item.id == itemId);
          }

          itemAtual = itemId;

          carregaValoresEdicao(item);

        });

        card.querySelector('.botaoExcluir').addEventListener('click', function(event) {
          const cardElement = event.target.closest('.card-item');
          const itemId = cardElement.dataset.id;
          const tipo = cardElement.dataset.tipo;

          if (tipo === "Doméstica") {
            const index = listaDespesaDomestica.findIndex((item) => item.id == itemId);
            listaDespesaDomestica.splice(index, 1);
            renderizarLista(listaDespesaDomestica, listaDomestico);
          } else if (tipo === "Saúde") {
            const index = listaDespesaSaude.findIndex((item) => item.id == itemId);
            listaDespesaSaude.splice(index, 1);
            renderizarLista(listaDespesaSaude, listaSaude);
          } else if (tipo === "Lazer") {
            const index = listaDespesaLazer.findIndex((item) => item.id == itemId);
            listaDespesaLazer.splice(index, 1);
            renderizarLista(listaDespesaLazer, listaLazer);
          }
        });
        

        return card;
}


