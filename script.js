

function startLearning() {
    // Redirect to learning page
    window.location.href = 'learning.html';
}


function openSkill(skill) {
    // Populate and display the quiz modal
    const quiz = quizzes[skill];
    document.getElementById('quiz-title').innerText = quiz.title;
    const questionsDiv = document.getElementById('quiz-questions');
    questionsDiv.innerHTML = '';
    quiz.questions.forEach((q, index) => {
        questionsDiv.innerHTML += `<p>${q.question}</p>`;
        q.options.forEach((opt, optIndex) => {
            questionsDiv.innerHTML += `<input type="radio" name="question${index}" value="${optIndex}"> ${opt}<br>`;
        });
    });
    document.getElementById('quiz-modal').style.display = "block";
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = "none";
}

function submitQuiz() {
    let score = 0;
    const quizTitle = document.getElementById('quiz-title').innerText;
    const quizKey = Object.keys(quizzes).find(key => quizzes[key].title === quizTitle);
    const quiz = quizzes[quizKey];
    quiz.questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            score++;
        }
    });
    alert(`You scored ${score} out of ${quiz.questions.length}`);
    updateProgress(quizKey, score);
    closeQuiz();
}

const quizzes = {
    "communication": {
        title: "Communication Quiz",
        questions: [
            { question: "What is active listening?", options: ["Ignoring", "Responding", "Attentive listening"], correct: 2 },
            { question: "Non-verbal communication includes:", options: ["Gestures", "Talking", "Writing"], correct: 0 }
        ]
    },
    "teamwork": {
        title: "Teamwork Quiz",
        questions: [
            { question: "What is collaboration?", options: ["Working alone", "Working together", "Ignoring others"], correct: 1 },
            { question: "A good team player:", options: ["Dominates discussions", "Listens and shares ideas", "Avoids teamwork"], correct: 1 }
        ]
    },
    "problem-solving": {
        title: "Problem-Solving Quiz",
        questions: [
            { question: "First step in problem-solving is:", options: ["Solution", "Identification", "Avoidance"], correct: 1 },
            { question: "A critical thinker is:", options: ["Impatient", "Open-minded", "Indifferent"], correct: 1 }
        ]
    }
};


function updateProgress(skill, score) {
    let progress = JSON.parse(localStorage.getItem('userProgress')) || {};
    progress[skill] = score;
    localStorage.setItem('userProgress', JSON.stringify(progress));
    displayProgress();
}

function displayProgress() {
    const progress = JSON.parse(localStorage.getItem('userProgress')) || {};
    const progressInfo = document.getElementById('progress-info');
    const progressBar = document.getElementById('progress-fill');
    if (Object.keys(progress).length === 0) {
        progressInfo.innerText = "No progress yet. Start learning to track your improvement!";
        progressBar.style.width = '0%';
    } else {
        let progressText = "Your progress so far:\n";
        let totalQuestions = 0;
        let answeredQuestions = 0;
        for (const skill in progress) {
            const skillScore = progress[skill];
            const skillTotal = quizzes[skill].questions.length;
            progressText += `${skill}: ${skillScore} out of ${skillTotal}\n`;
            totalQuestions += skillTotal;
            answeredQuestions += skillScore;
        }
        progressInfo.innerText = progressText;
        const progressPercentage = (answeredQuestions / totalQuestions) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.innerText = `${Math.round(progressPercentage)}% Completed`;
    }
}


// Form submissions
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Thank you for your message. We will get back to you soon!");
});

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Profile updated successfully!");
});

document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Thank you for your feedback!");
});

// Initialize progress display
window.onload = displayProgress;
