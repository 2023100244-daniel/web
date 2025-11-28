const questions = [
  {
    question: "¿Cómo reaccionas ante un problema grande?",
    options: [
      { text: "Pienso en una solución lógica", points: { peter: 2, gwen: 1 } },
      { text: "Confío en mis instintos", points: { electro: 2, venom: 1 } },
      { text: "Busco ayuda de mis amigos", points: { peter: 1, gwen: 2 } },
      { text: "Aprovecho la situación para avanzar", points: { harry: 2 } },
    ]
  },
  {
    question: "¿Cuál es tu motivación principal?",
    options: [
      { text: "Hacer lo correcto", points: { peter: 2 } },
      { text: "Poder y control", points: { harry: 2, venom: 1 } },
      { text: "Ayudar a los demás", points: { gwen: 2 } },
      { text: "Excitar la emoción", points: { electro: 2 } },
    ]
  },
  {
    question: "¿Cómo describirías tu personalidad?",
    options: [
      { text: "Responsable y valiente", points: { peter: 2 } },
      { text: "Inteligente y empática", points: { gwen: 2 } },
      { text: "Ambicioso y competitivo", points: { harry: 2 } },
      { text: "Impulsivo y excéntrico", points: { electro: 2 } },
      { text: "Oscuro y rebelde", points: { venom: 2 } },
    ]
  },
  {
    question: "¿Qué harías si tu amigo está en peligro?",
    options: [
      { text: "Salvarlo sin dudar", points: { peter: 2 } },
      { text: "Intentar razonar con la situación", points: { gwen: 2 } },
      { text: "Usar la oportunidad para tu beneficio", points: { harry: 2 } },
      { text: "Actuar impulsivamente para enfrentarlo", points: { electro: 2 } },
      { text: "Ignorarlo y hacer lo que quieras", points: { venom: 2 } },
    ]
  },
  {
    question: "¿Qué valoras más?",
    options: [
      { text: "La justicia", points: { peter: 2 } },
      { text: "La amistad y el cariño", points: { gwen: 2 } },
      { text: "El poder y la influencia", points: { harry: 2 } },
      { text: "La emoción y la adrenalina", points: { electro: 2 } },
      { text: "La libertad personal", points: { venom: 2 } },
    ]
  },
  {
    question: "Si tuvieras un superpoder, ¿cómo lo usarías?",
    options: [
      { text: "Para proteger a los inocentes", points: { peter: 2 } },
      { text: "Para ayudar y estudiar", points: { gwen: 2 } },
      { text: "Para alcanzar mis objetivos", points: { harry: 2 } },
      { text: "Para divertirme y experimentar", points: { electro: 2 } },
      { text: "Para hacer lo que quiera, sin reglas", points: { venom: 2 } },
    ]
  }
];

let currentQuestion = 0;
let scores = { peter: 0, gwen: 0, harry: 0, electro: 0, venom: 0 };

const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');

function showQuestion() {
  const q = questions[currentQuestion];
  questionContainer.innerHTML = `<h2>${q.question}</h2>`;
  q.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.textContent = opt.text;
    btn.onclick = () => selectOption(opt.points);
    questionContainer.appendChild(btn);
  });
  nextBtn.style.display = 'none';
}

function selectOption(points) {
  for (let key in points) {
    scores[key] += points[key];
  }
  nextBtn.style.display = 'inline-block';
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.style.display = 'none';
  nextBtn.style.display = 'none';

  const maxScore = Math.max(...Object.values(scores));
  const winner = Object.keys(scores).filter(key => scores[key] === maxScore)[0];

  let description = '';
  switch (winner) {
    case 'peter':
      description = "Eres Peter Parker: valiente, responsable y heroico.";
      break;
    case 'gwen':
      description = "Eres Gwen Stacy: inteligente, empática y valiente.";
      break;
    case 'harry':
      description = "Eres Harry Osborn: ambicioso, competitivo y determinado.";
      break;
    case 'electro':
      description = "Eres Electro: emocional, impredecible y poderoso.";
      break;
    case 'venom':
      description = "Eres Venom: oscuro, rebelde y apasionado.";
      break;
  }

  resultContainer.innerHTML = `<h2>${description}</h2>`;
}

// Inicializar quiz
showQuestion();
