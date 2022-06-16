// stockage de données
function createObject() {
    let object = {
        question: question.value,
        answer: answer.value
    }
const fs = require('fs');
const saveData = (question) => {
    const finished = (error) => { 
        if (error) {
            console.error(error);
            return;
        }
    };
    const jsonData = JSON.stringify(question,null,2);
    fs.writeFile('dog.json', jsonData,finished)
    }
    saveData(object);
}
let question = document.getElementById('question');
let answer = document.getElementById('answer');
let submit = document.getElementById('submit');
submit.addEventListener('click', createObject)