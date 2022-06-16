let dialog = await fetch('./dialog.json').then(function (response) {
    return response.json();
});
const recbutton = document.getElementById('speechbutton');
const chat = document.getElementById('chat');
let wait = document.getElementById('wat');
let conversation = [];
let response;
function refrech() {
    chat.innerHTML = conversation.map(e => e)
}
function read(m) {
        response = m;
    let res = new SpeechSynthesisUtterance;
    if (response.length > 0) {
        conversation.push(`<h3 class="conversation answer">${response}</h3>`);
    }
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
         conversation.push(`<h2 class="conversation message">${rec}</h2>`);
        refrech();
        if (rec.includes('time')) { 
            let time = new Date();
            let h = time.getHours();
            let m = time.getMinutes();
            if (h > 12) {
                h = h - 12;
                h = h + ' pm';
            }
            else {
                h = h + 'am'
            }
            read(`it's ${h} and ${m} minutes`)
        }
        for (let i = 0; i < dialog.length; i++) {
            if (rec.includes(dialog[i].question)) {
                read(dialog[i].answer);
                return;
            } else if (i === dialog.length - 1 && !rec.includes(dialog[i].question)){
                read("sorry i didn't recognize this")
            }
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
