let itens = [];
let editandoId = null;

const inputItem = document.getElementById("inputItem");
const botaoPrincipal = document.getElementById("botaoPrincipal");
const listaItens = document.getElementById("listaItens");

function renderizarItens(){

  listaItens.innerHTML="";

  itens.forEach((item,index)=>{

    const linha=document.createElement("div");
    linha.className="linha";

    linha.innerHTML=`

      <div>${index+1}</div>
      <div>${item.nome}</div>

      <div class="acoes">

        <button class="btn-atualizar" onclick="editarItem(${item.id})">
          Atualizar
        </button>

        <button class="btn-remover" onclick="removerItem(${item.id})">
          Remover
        </button>

      </div>

    `;

    listaItens.appendChild(linha);

  });

}

function adicionarOuSalvar(){

  const valor=inputItem.value.trim();

  if(valor==="") return;

  if(editandoId===null){

    const novoItem={
      id:Date.now(),
      nome:valor
    };

    itens.push(novoItem);

  }else{

    itens=itens.map(item=>
      item.id===editandoId
      ? {...item,nome:valor}
      : item
    );

    editandoId=null;
    botaoPrincipal.textContent="Adicionar";

  }

  inputItem.value="";
  renderizarItens();

}

function editarItem(id){

  const item=itens.find(i=>i.id===id);

  inputItem.value=item.nome;
  editandoId=id;

  botaoPrincipal.textContent="Salvar";

}

function removerItem(id){

  itens=itens.filter(item=>item.id!==id);

  renderizarItens();

}

function removerPrimeiro(){

  itens.shift();
  renderizarItens();

}

function removerUltimo(){

  itens.pop();
  renderizarItens();

}

botaoPrincipal.addEventListener("click",adicionarOuSalvar);

inputItem.addEventListener("keydown",(e)=>{

  if(e.key==="Enter"){
    adicionarOuSalvar();
  }

});

renderizarItens();