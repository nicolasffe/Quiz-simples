const question = [
    {
        question: "Qual deve ser o relacionamento do Scrum Master com a equipe?",
        answers: [
            { text: "Ignorando as sugestões da equipe.", correct: false },
            { text: "Trabalhando junto com a equipe em busca de um objetivo comum.", correct: true },
            { text: "Atuando como um chefe que dá ordens.", correct: false },
            { text: "Apenas supervisando o trabalho.", correct: false },
        ]
    },
    {
        question: "Qual das seguintes ações um Scrum Master deve realizar?",
        answers: [
            { text: "Remover impedimentos.", correct: true },
            { text: "Criar o Backlog do Produto.", correct: false },
            { text: "Aprovar o trabalho da equipe.", correct: false },
            { text: "Definir a arquitetura do sistema.", correct: false },
        ]
    },
    {
        question: "QUAL É A CAPITAL DA ESPANHA?",
        answers: [
            { text: "BARCELONA", correct: false },
            { text: "GRANADA", correct: false },
            { text: "MADRID", correct: true },
            { text: "SERGIPE", correct: false },
        ]
    },
    {
        question: "QUAL É O TRI CAMPEÃO MUNDIAL?",
        answers: [
            { text: "SPFC", correct: true },
            { text: "SCCP", correct: false },
            { text: "VASCO", correct: false },
            { text: "NONE", correct: false },
        ]
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        answers: [
            { text: "Júpiter", correct: true },
            { text: "Marte", correct: false },
            { text: "Terra", correct: false },
            { text: "Vênus", correct: false }
        ]
    },
    {
        question: "Qual é o elemento químico representado pela letra 'O'?",
        answers: [
            { text: "Ouro", correct: false },
            { text: "Oxigênio", correct: true },
            { text: "Ósmio", correct: false },
            { text: "Óxido", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";  // Oculta o botão inicialmente
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        button.dataset.correct = answer.correct;
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";  // Oculta o botão "Next" até que uma resposta seja selecionada
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);  // Remove os botões de resposta antigos
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    
    if (correct) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;  // Desabilita todos os botões após a seleção
        if (button.dataset.correct === "true") {
            button.classList.add("correct");  // Marca a resposta correta
        }
    });

    nextButton.style.display = "block";  // Exibe o botão "Next" após a seleção da resposta
}

nextButton.addEventListener("click", handleNextQuestion);

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();  // Exibe o placar final quando todas as perguntas são respondidas
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${question.length}!`;
    nextButton.innerHTML = "Reiniciar";
    nextButton.style.display = "block";

    // Atualiza o evento do botão "Next" para reiniciar o quiz corretamente
    nextButton.removeEventListener("click", handleNextQuestion);
    nextButton.addEventListener("click", restartQuiz);
}

function restartQuiz() {
    // Reseta o evento de clique para funcionar como "Next" novamente
    nextButton.removeEventListener("click", restartQuiz);
    nextButton.addEventListener("click", handleNextQuestion);
    
    // Reinicia o quiz
    startQuiz();
}

// Inicia o quiz na primeira vez
startQuiz();