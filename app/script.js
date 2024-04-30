const cartas = document.querySelectorAll('.memoria-carta');

cartas.forEach(carta => carta.addEventListener('click', virarCarta));

let algumaCartaGirada = false;
let primeiraCarta, segundaCarta;
let cartasFinalizas = 0;
let numJogadas = 0;
let tempoInicial = new Date().getTime();
let jogoFinalizado = false;

(function embaralhar()
{
    cartas.forEach(carta => {
        let position = Math.floor(Math.random()*12);
        carta.style.order = position;
    });
})();
function virarCarta(){
    if(primeiraCarta != null && segundaCarta != null)  return;
    if(primeiraCarta === this) return;
    this.classList.toggle('girando');
    if(!algumaCartaGirada){
        algumaCartaGirada = true;
        primeiraCarta = this;
        return;
    }
    algumaCartaGirada = false;
    segundaCarta = this;
    verificarCartas();
}
function verificarCartas(){
    numJogadas++;
    if(primeiraCarta.dataset.img === segundaCarta.dataset.img) desativarCartas();
    else desvirarCarta();
}
function desativarCartas()
{
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    resetarCartas(); 
    setTimeout(() => {
        cartasFinalizas += 2;
        checkEndGame();
    }, 1000);
}
function desvirarCarta()
{
    setTimeout(() => {
        if(primeiraCarta.dataset.img !== segundaCarta.dataset.img){
            primeiraCarta.classList.remove('girando');
            segundaCarta.classList.remove('girando');
            resetarCartas();
        }
    }, 1000);
}
function resetarCartas()
{
    algumaCartaGirada = false;
    primeiraCarta = null;
    segundaCarta = null;
}
function checkEndGame()
{
    if(cartasFinalizas == 12) 
    {
        jogoFinalizado = true;
        if(window.confirm("Parábens !!!\nVocê finalizou o jogo\nDeseja começar novamente ?")) 
        {
            numJogadas = 0;
            tempoInicial = new Date().getTime();
            jogoFinalizado = false;
            cartas.forEach(carta => {
                let position = Math.floor(Math.random()*12);
                carta.style.order = position;
                carta.addEventListener('click', virarCarta);
                carta.classList.toggle('girando');
                resetarCartas(); cartasFinalizas = 0;
            });
        }
    }
}
function updateTemporizador()
{
    if(jogoFinalizado) return;
    let tempoAtual = new Date().getTime();
    let tempoGasto = (tempoAtual - tempoInicial) / 1000;  // Tempo em segundos
    const showTempo = document.querySelector('.txt-time');
    const showJogadas = document.querySelector('.txt-jogadas');
    showTempo.innerHTML = '[Tempo gasto]: ' + formatarTempo(tempoGasto);
    showJogadas.innerHTML = '[Jogadas feitas]: ' + numJogadas;
}
function formatarTempo(segundos) {
    let minutos = Math.floor(segundos / 60);
    segundos = Math.floor(segundos % 60);
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
setInterval(updateTemporizador, 1000);