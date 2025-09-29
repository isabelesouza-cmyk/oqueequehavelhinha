const readlineSync = require('readline-sync');

let tabuleiro = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let jogador = "X";
let jogadas = 0;

function mostrarTabuleiro() {
    console.log(`
     ${tabuleiro[0]} | ${tabuleiro[1]} | ${tabuleiro[2]}
    -----------
     ${tabuleiro[3]} | ${tabuleiro[4]} | ${tabuleiro[5]}
    -----------
     ${tabuleiro[6]} | ${tabuleiro[7]} | ${tabuleiro[8]}
`);
}

function verificarVitoria() {
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6] // diagonais
    ];
    
    return combinacoes.some(([a, b, c]) =>
        tabuleiro[a] === jogador && tabuleiro[b] === jogador && tabuleiro[c] === jogador
    );
}

function fazerJogada() {
    mostrarTabuleiro();
    
    let pos = readlineSync.questionInt(`\nJogador ${jogador}, escolha uma posicao (1-9): `) - 1;
    
    if (pos < 0 || pos > 8) {
        console.log("Posição inválida! Escolha um número entre 1 e 9.");
        return false;
    }
    
    if (tabuleiro[pos] === "X" || tabuleiro[pos] === "O") {
        console.log("Posição ocupada, escolha outra.");
        return false;
    }
    
    tabuleiro[pos] = jogador;
    jogadas++;
    return true;
}

console.log("=== JOGO DA VELHA ===\n");

do {
    let jogadaValida = fazerJogada();
    
    if (!jogadaValida) {
        continue;
    }
    
    if (verificarVitoria()) {
        mostrarTabuleiro();
        console.log(`\n Jogador ${jogador} venceu!!`);
        break;
    }
    
    // Troca de jogador
    jogador = jogador === "X" ? "O" : "X";
    
} while (jogadas < 9);

if (jogadas === 9 && !verificarVitoria()) {
    mostrarTabuleiro();
    console.log("\n Deu velha! Empate!");
}