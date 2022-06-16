let dialog = await fetch('./dialog.json').then(function (response) {
    return response.json();
});
const recbutton = document.getElementById('speechbutton');
// const input = document.getElementById('spch');
const chat = document.getElementById('chat');
let wait = document.getElementById('wat');
let chatmessages = ['press space to start chat'];
let response;
function refrech() {
    let conversation = chatmessages.map(e => `<h3 class="message">${e}</h3>`);
    chat.innerHTML = conversation;
}
function read(m) {
    if (m === '') {
        read("didn't hear anything")
    }
        response = m;
        let res = new SpeechSynthesisUtterance;
        chatmessages.push(response);
        refrech();
        res.text = response;
        res.lang = 'en-US';
    window.speechSynthesis.speak(res)
    wait.style.display = 'none';
}
function record() {
    wait.style.display = 'flex';
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.onresult = function (event) {
        let rec = event.results[0][0].transcript;
        rec = rec.toLowerCase();
         chatmessages.push(rec);
        refrech();
        let { length } = dialog;
        for (let i = 0; i <= length; i++) {
            if (rec.includes(dialog[i].question)) {
                read(dialog[i].answer)
            }else if (i === length) {}
        }
    }
    recognition.start(); 
}
recbutton.addEventListener('click', record)
window.addEventListener('keypress', (e) => {
    if (e.keyCode === 32) {
        record()
    }
})

// const fs = require('fs');
// const saveData = (question) => {
//     const finished = (error) => { 
//         if (error) {
//             console.error(error);
//             return;
//         }
//     };
//     const jsonData = JSON.stringify(question,null,2);
//     fs.writeFile('dog.json', jsonData,finished)
// }

// else if (rec.includes('your name')) {
//     read('my name is Anass and i am your assistant')
// }else if(rec.includes('say my full name')){
//     read('anass dabaghi')
// }
// else if(rec.includes('go to facebook')){
//     read('ok hold on')
//     window.location.href = 'https://www.facebook.com';
// } else if(rec.includes('go to instagram')){
//     read('ok hold on')
//     window.location.href = 'https://www.instagram.com';
// }
//  else if(rec.includes('go to linked in')){
//     read('ok hold on')
//     window.location.href = 'https://www.linkedin.com/in/anass-dabaghi-5a51141b6/';
// }
//     else if(rec.includes('hi') || rec.includes('hello')){
//     read("hi there what's up")
// }
// else if(rec.includes('say my name')){
//     read('anass')
// }
//  else if(rec.includes('go to youtube')){
//     read('ok hold on')
//     window.location.href = 'https://www.youtube.com';
// }
// else if (rec.includes('say')) {
//     rec = rec.substr(4)
//     read(rec)
// }
//  else if(rec.includes("what's up")){
//     read("i am a robot i don't feel but i am good if you are interested")
// }
//     else if(rec.includes("you are useless")){
//     read("the only useles thing in the world is you")
// }
// else {
//     read("sorry i didn't get that")
// }
// getData();
