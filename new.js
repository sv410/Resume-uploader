document.getElementById('resumeInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            const resumeText = e.target.result;
            processResumeText(resumeText);
        };
    }
});

function processResumeText(text) {
    document.getElementById('resumeForm').style.display = 'none';
    document.body.classList.add('uploaded');
    document.getElementById('chatbotContainer').style.display = 'block';

    const keywords = extractKeywords(text);
    const questions = generateQuestions(keywords);
    displayQuestions(questions);
}

function extractKeywords(resumeText) {
    const sections = ['experience', 'education', 'skills', 'projects', 'certifications'];
    const keywords = [];

    sections.forEach(section => {
        const regex = new RegExp(section, 'i');
        if (regex.test(resumeText)) {
            keywords.push(section);
        }
    });

    return keywords;
}

let questions = [];
let currentQuestionIndex = 0;

function generateQuestions(keywords) {
    const questionsArray = [];
    keywords.forEach(keyword => {
        switch (keyword) {
            case 'experience':
                questionsArray.push("Can you describe your most recent job experience?");
                questionsArray.push("What were your key responsibilities in your last job?");
                break;
            case 'education':
                questionsArray.push("Which institution did you last attend?");
                questionsArray.push("What was your major or area of study?");
                break;
            case 'skills':
                questionsArray.push("What are your top skills?");
                questionsArray.push("Which technical skills do you possess?");
                break;
            case 'projects':
                questionsArray.push("Can you discuss a recent project you completed?");
                questionsArray.push("What technologies did you use for your latest project?");
                break;
            case 'certifications':
                questionsArray.push("What certifications have you obtained?");
                questionsArray.push("How have these certifications helped you in your career?");
                break;
        }
    });

    questionsArray.push("How have you demonstrated leadership in your roles?");
    questionsArray.push("Can you provide an example    questionsArray.push("Can you provide an example of a challenging situation you faced and how you overcame it?");
    questionsArray.push("What are your career goals for the next few years?");
    return questionsArray;
}

function displayQuestions(questions) {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = ''; // Clear previous questions

    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.textContent = question;

        const answerInput = document.createElement('textarea');
        answerInput.placeholder = "Type your answer here...";
        answerInput.className = 'answerInput';

        questionElement.appendChild(answerInput);
        questionContainer.appendChild(questionElement);
    });

    // Add a button to submit the answers
    const submitButton = document.createElement('button');
    submitButton.textContent = "Submit Answers";
    submitButton.onclick = submitAnswers;
    questionContainer.appendChild(submitButton);
}

function submitAnswers() {
    const answerInputs = document.querySelectorAll('.answerInput');
    const answers = Array.from(answerInputs).map(input => input.value);

    // Handle the collected answers (e.g., send to a server or process them)
    console.log(answers); // For now, just log them to the console

    // Optionally, you can reset the form or display a thank you message
    document.getElementById('chatbotContainer').style.display = 'none';
    alert('Thank you for your responses!');
}

// Make sure to initialize the questions array when the script runs
questions = [];
