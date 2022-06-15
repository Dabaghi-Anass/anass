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
        if (rec.includes('time')) {
            var d= new Date();
            var h = d.getHours();
            var m = d.getMinutes();
        read(`it's ${h} and ${m} minutes`)
        } else if(rec.includes('your name')){
            read('my name is Anass and i am your assistant')
        }else if(rec.includes('say my full name')){
            read('anass dabaghi')
        }
        else if(rec.includes('go to my facebook')){
            read('ok hold on')
            window.location.href = 'https://www.facebook.com/anass.debbaghi.12';
        } else if(rec.includes('go to my instagram')){
            read('ok hold on')
            window.location.href = 'https://www.instagram.com/debbaghianass/';
        }
         else if(rec.includes('go to my linked')){
            read('ok hold on')
            window.location.href = 'https://www.linkedin.com/in/anass-dabaghi-5a51141b6/';
        }
        else if(rec.includes('say my name')){
            read('anass')
        }
         else if(rec.includes('go to youtube')){
            read('ok hold on')
            window.location.href = 'https://www.youtube.com';
        }
        else if (rec.includes('say')) {
            rec = rec.substr(4)
            read(rec)
        }
         else if(rec.includes("what's up")){
            read("i am a robot i don't feel but i am good if you are interested")
        }
            else if(rec.includes("you are useless")){
            read("the only useles thing in the world is you")
        }
        else {
            read("sorry i didn't get that")
        }
        // input.value = rec;
    }
    recognition.start(); 
}
recbutton.addEventListener('click', record)
window.addEventListener('keypress', (e) => {
    if (e.keyCode === 32) {
        record()
    }
})


