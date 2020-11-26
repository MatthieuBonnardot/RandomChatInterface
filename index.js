//2D Array to cover by subject potential messages
const Potential = [
  //Greetings
  ["hi", "hey", "hello", "yoo", "good morning", "good afternoon"],
  //Formal Questions
  ["what is up", "how are you", "how is life", "how are things"],
  //Informational Questions
  ["what are you doing", "what is going on", "what is up"],
  //Age Question
  ["how old are you"],
  //conversation
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "yes", "ok", "okay", "nice"],
  ["thanks", "thank you"],
  //Formalities
  ["bye", "good bye", "goodbye", "see you later"],
  //Food
  ["what should i eat today"],
  //intergection
  ["bro"],
  ["what", "why", "how", "where", "when"],
];

const Generated = [
  ["Hello!", "Hi!", "Hey!", "Yoooo", "Hi there!"],
  //Formal responses
  [
    "Chillin... how are you?",
    "I am good, how are you?",
    "Fantastic, how are you?",
  ],
  //informational responses
  ["Nothing much.", "About to go to sleep.", "Busy to be honest."],
  //age responses
  ["I am 22, why you asking"],
  //conversation responses
  ["I love you too ", "Me too"],
  ["That is great haha", "Glad to hear it"],
  [
    "Why?",
    "Why? Although Covid19 is making it difficult to go outside..",
    "Try watching TV or go for walk idk",
  ],
  ["What about?", "Once upon a time... go read a book idk lol"],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["You're welcome"],
  //Formalities responses
  ["Bye", "Goodbye", "See you later"],
  //Food responses
  [
    "No way, I was thinking the same ! How about we go hit up some food at the mall?",
    "Try Dominoes! they got a two for one deal",
  ],
  //intergection responses
  ["Bro!"],
  ["Yes?"],
];

const Default = [
  "Same",
  "Go on...",
  "Try again",
  "Hey sorry my phone is not working correctly",
  "I'm listening...",
  "Yeah i know",
  "??",
  "Hey, it happens",
  "Hey, I think i gotta go... I'll talk to you later",
];

const COVID = [
  "Please tell me you wear a mask...",
  "Be careful please",
  "I am dealing well with the situation, the rules are simple, wash your hands and stay away from people.",
];

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input_bar_id");
  const btn = document.getElementById("send_message");

  btn.addEventListener("click", function () {
    let input = inputField.value;

    if (input !== "") {
      inputField.value = "";
      findAnswer(input);
    } else console.log("Input is null");

    $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
  });

  inputField.addEventListener("keypress", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value;

      if (input !== "") {
        inputField.value = "";
        findAnswer(input);
      } else console.log("Input is null");

      $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
    }
  });
});

function timer(time) {
  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  return `${addZero(time.getHours())}:${addZero(time.getMinutes())}`;
}

function findAnswer(input) {
  const Stemmer = (input) => {
    return input
      .toLowerCase()
      .replace(/[^\w\s\d]/gi, "")
      .trim()
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "");
  };

  const generator = (Potential, Generated, text) => {
    let item;
    for (let x = 0; x < Potential.length; x++) {
      for (let y = 0; y < Generated.length; y++) {
        if (Potential[x][y] == text) {
          items = Generated[x];
          item = items[Math.floor(Math.random() * items.length)];
        }
      }
    }
    return item;
  };

  let output;
  let text = Stemmer(input);

  if (
    text.match(/coronavirus/gi) ||
    text.match(/corona/gi) ||
    text.match(/Covid/gi) ||
    text.match(/covid19/gi)
  ) {
    output = COVID[Math.floor(Math.random() * COVID.length)];
  } else if (generator(Potential, Generated, text)) {
    output = generator(Potential, Generated, text);
  } else {
    output = Default[Math.floor(Math.random() * Default.length)];
  }

  displayMessages(input, output);
}

function displayMessages(input, output, number) {
  let date = new Date();
  const mainDiv = document.getElementById("chatbox");
  let backandforth = document.createElement("div");

  backandforth.innerHTML = `
  <div class="row">
                <div class="col-6 col-3 right_bubble_position">
                    <p class="right_chat_bubble">${input}</p>
                    <span class="right_bubble_timer"><i class="fas fa-check"></i>${timer(
                      date
                    )}</span>
                </div>
                <div class="chat_bubble_seperator"></div>
                <div class="col-6 col-3 left_bubble_position">
                    <p class="left_chat_bubble">${output}</p>
                    <span><img src="./Assets/JohnDoe.jpg" class="mini_pic" />${timer(
                      date
                    )}</span>
                </div>

            </div>
  `;

  mainDiv.appendChild(backandforth);
}



