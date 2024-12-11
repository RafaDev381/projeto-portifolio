var numero = 0; // número que ele vai escolher
var tentativas = 0; // número de tentativas 

function refresh(){
    // para gerar um número aleatório
    tentativas = 0;
    numero = parseInt (Math.random() * 50);
    //Math.random é a biblioteca do Javascript para gerar os números e o parseInt faz com que os números sejam inteiros
    
    console.log(numero)
}

function verifyNumber(){
    var sorteio = document.getElementById('sorteio').value;

    if(sorteio > 50 || sorteio < 1)
    {
        alert('Número inválido');
        return;
    }

    if(sorteio > numero)
    {
        tentativas++; //contagem de erros
        alert('O número oculto é MENOR!');
    }
    else if(sorteio < numero)
    {
        tentativas++;
        alert('O número oculto é MAIOR!');
    }
    else
    {
        alert('PARABÉNS! Foram '+tentativas+' erros no total')
        refresh();
    }

}

refresh();
//refresh para sortear o número quando recarregar a página