document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('input_bar_id');
  const btn = document.getElementById('send_message');

  inputField.addEventListener('keypress', function (e) {
    if (e.code === 'Enter') {
      const text = inputField.value;
      if (text === '') return;
      const newMessage = new Message(true, 'A* NERD', text, new Date());
      inputField.value = '';
      newMessage.appendMessage();
      console.log(newMessage);
      $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
      getReply();
    }
  });
  btn.addEventListener('click', function () {
    const text = inputField.value;
    if (text === '') return;
    const newMessage = new Message(true, '', text, new Date());
    inputField.value = '';
    newMessage.appendMessage();
    $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
    getReply();
  });
});

const getReply = () => {
  setTimeout(async function () {
    const reply = new Message();
    const res = await reply.fetchMessage();
    console.log('reply', reply);
    reply.appendMessage();
  }, Math.random() * 15000);

  setTimeout(() => {
    getReply();
  }, 100000) 
}

class Message {
  constructor (id = false, author = '', content = '', timestamp = '') {
    this.authorId = id;
    this.author = author;
    this.content = content;
    this.timestamp = timestamp;
  }
  fetchMessage  () {
    const data = $.get(
      'http://quotes.stormconsultancy.co.uk/random.json',
      (el) => {
        this.timestamp = new Date();
        this.author = el.author;
        this.content = el.quote;
      }
    );

    return data;
  }

  getTime () {
    let currentTime = this.timestamp;
    let hours = currentTime.getHours().toString();
    if (hours < 10) hours = '0' + hours;
    let minutes = currentTime.getMinutes().toString();
    if (minutes < 10) minutes = '0' + minutes;
    let formatedTime = `${hours}:${minutes}`;
    this.formatedTime = formatedTime;
    return this.formatedTime;
  }

  appendMessage () { 
    let position = 'left';
    if (this.authorId) position = 'right';
    let newBubble = $('<div>');
    newBubble.addClass(`message_container`);
    newBubble.html(`

    <div class="message_wrapper">
        <div class="message ${position}">
            <p class="content">${this.content}</p>
        </div>
        <span class="timer ${position}"> <i class="fas fa-check checkmark"></i>${this.getTime()} - <b>${this.author}</b></span>
    </div>
    `);

    $('#chatbox').append(newBubble);
    $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
  }
}
