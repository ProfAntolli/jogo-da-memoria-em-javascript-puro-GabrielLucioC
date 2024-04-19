const cartas = document.querySelectorAll('.memoria-carta');

cartas.forEach(carta => carta.addEventListener('click', virarCarta));

let algumaCartaGirada = false;
let primeiraCarta, segundaCarta;
let cartasFinalizas = 0;

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
        if(window.confirm("Parábens !!!\nVocê finalizou o jogo\nDeseja começar novamente ?")) 
        {
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
