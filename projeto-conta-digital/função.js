let saldo = 10.0;
let entradas = 0.0;
let saidas = 0.0;

const saldoEl = document.getElementById('saldo');
const entradasEl = document.getElementById('entradas');
const saidasEl = document.getElementById('saidas');
const listaTransacoesEl = document.getElementById('lista-transacoes');
const areaPixEl = document.getElementById('area-pix');  
const mensagemReceberEl = document.getElementById('mensagem-receber');
const mensagemTransferirEl = document.getElementById('mensagem-transferir');

areaPixEl.style.display = 'none';  

function registrarTransacao(tipo, valor, descricao) {
    const data = new Date();
    const id = `${data.getFullYear()}${String(data.getMonth() + 1).padStart(2, '0')}${String(data.getDate()).padStart(2, '0')}${String(data.getHours()).padStart(2, '0')}${String(data.getMinutes()).padStart(2, '0')}${String(data.getSeconds()).padStart(2, '0')}`;


    const li = document.createElement('li');
    li.innerHTML = `
            <p><strong>${tipo}</strong></p>
            <p>${descricao}</p>
            <p>ID: ${id}</p>
            <p>R$ ${valor.toFixed(2)}</p>
        </div>
    `;

    const listaTransacoesEl = document.getElementById('lista-transacoes');
    if (listaTransacoesEl.firstChild.textContent === 'Não constam transações') {
        listaTransacoesEl.innerHTML = '';
    }
    listaTransacoesEl.appendChild(li);
}

function formatarDataHora(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const hora = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${ano} às ${hora}:${minutos}`;
}

function registrarTransacao(tipo, valor, descricao) {
    const data = new Date();
    const id = `${data.getFullYear()}${String(data.getMonth() + 1).padStart(2, '0')}${String(data.getDate()).padStart(2, '0')}${String(data.getHours()).padStart(2, '0')}${String(data.getMinutes()).padStart(2, '0')}${String(data.getSeconds()).padStart(2, '0')}`;

    const li = document.createElement('li');
    li.innerHTML = `
        <div>
            <p><strong>${tipo}</strong></p>
            <p>${descricao}</p>
            <p>ID: ${id}</p>
            <p>Data: ${formatarDataHora(data)}</p>
            <p>R$ ${valor.toFixed(2)}</p>
        </div>
    `;

    const listaTransacoesEl = document.getElementById('lista-transacoes');
    if (listaTransacoesEl.firstChild.textContent === 'Não constam transações') {
        listaTransacoesEl.innerHTML = '';
    }
    listaTransacoesEl.appendChild(li);
}

function fecharAreaPix() {
    areaPixEl.style.display = 'none';
    document.querySelectorAll('.form').forEach(form => form.classList.add('hidden'));
    document.getElementById('cpf-cnpj').value = '';
    document.getElementById('valor-receber').value = '';
    document.getElementById('chave-pix').value = '';
    document.getElementById('valor-transferir').value = '';
    mensagemReceberEl.textContent = '';
    mensagemTransferirEl.textContent = '';
}

document.getElementById('btn-pagar').onclick = () => alert('Sistema indisponível. Tente novamente mais tarde.');
document.getElementById('btn-investir').onclick = () => alert('Sistema indisponível. Tente novamente mais tarde.');

document.getElementById('btn-pix').onclick = () => {
    if (areaPixEl.style.display === 'none') {
        areaPixEl.style.display = 'block';  
    } else {
        areaPixEl.style.display = 'none'; 
    }
    
    document.querySelectorAll('.form').forEach(form => form.classList.add('hidden'));
};

document.querySelectorAll('.tab').forEach(tab => {
    tab.onclick = () => {
        document.querySelectorAll('.form').forEach(form => form.classList.add('hidden'));

        document.getElementById(tab.dataset.target).classList.remove('hidden');
    };
});

document.getElementById('btn-enviar-receber').onclick = () => {
    const cpfCnpj = document.getElementById('cpf-cnpj').value.trim();
    const valor = parseFloat(document.getElementById('valor-receber').value);
    if (!cpfCnpj || isNaN(valor) || valor <= 0) {
        mensagemReceberEl.textContent = 'Todos os campos devem ser preenchidos!';
        return;
    }

    saldo += valor;
    entradas += valor;
    saldoEl.textContent = saldo.toFixed(2);
    entradasEl.textContent = entradas.toFixed(2);
    mensagemReceberEl.textContent = 'Transação realizada com sucesso!';
    registrarTransacao('Entrada', valor, 'Transferência recebida');
};

document.getElementById('btn-fechar-pix').onclick = fecharAreaPix;
document.querySelectorAll('.btn-fechar-form').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.form').forEach(form => form.classList.add('hidden'));
    };
});

document.getElementById('btn-enviar-transferir').onclick = () => {
    const chavePix = document.getElementById('chave-pix').value.trim();
    const valor = parseFloat(document.getElementById('valor-transferir').value);
    if (!chavePix || isNaN(valor) || valor <= 0) {
        mensagemTransferirEl.textContent = 'Todos os campos devem ser preenchidos!';
        return;
    }

    if (saldo < valor) {
        mensagemTransferirEl.textContent = 'Saldo insuficiente!';
        return;
    }

    saldo -= valor;
    saidas += valor;
    saldoEl.textContent = saldo.toFixed(2);
    saidasEl.textContent = saidas.toFixed(2);
    mensagemTransferirEl.textContent = 'Transação realizada com sucesso!';
    registrarTransacao('Saída', valor, 'Transferência enviada');
};
