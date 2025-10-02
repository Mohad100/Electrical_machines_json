// Application State
let currentView = 'topicSelector';
let currentTopic = null;

// Topic Data - loaded dynamically from JSON
let topicData = {};
let topicsIndex = null;

// Load topics index
async function loadTopicsIndex() {
    try {
        const response = await fetch('data/topics.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        topicsIndex = await response.json();
        console.log('✅ Topics index loaded:', topicsIndex);
    } catch (error) {
        console.error('❌ Error loading topics index:', error);
    }
}

// Load individual topic data
async function loadTopicData(topicId) {
    if (topicData[topicId]) return topicData[topicId];
    
    try {
        const response = await fetch(`data/${topicId}.json`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        topicData[topicId] = data;
        console.log(`✅ Topic loaded: ${topicId}`);
        return data;
    } catch (error) {
        console.error(`❌ Error loading topic ${topicId}:`, error);
        return null;
    }
}

// DOM Elements
const elements = {
    themeToggle: document.getElementById('themeToggle'),
    topicSelector: document.getElementById('topicSelector'),
    explanationView: document.getElementById('explanationView'),
    quizView: document.getElementById('quizView'),
    exercisesView: document.getElementById('exercisesView'),
    backFromExplanation: document.getElementById('backFromExplanation'),
    backFromQuiz: document.getElementById('backFromQuiz'),
    backFromExercises: document.getElementById('backFromExercises'),
    explanationTitle: document.getElementById('explanationTitle'),
    explanationContent: document.getElementById('explanationContent'),
    quizTitle: document.getElementById('quizTitle'),
    quizContent: document.getElementById('quizContent'),
    exercisesTitle: document.getElementById('exercisesTitle'),
    exercisesContent: document.getElementById('exercisesContent')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

async function initializeApp() {
    await loadTopicsIndex();
    showView('topicSelector');
    renderMath();
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        if (elements.themeToggle) {
            elements.themeToggle.querySelector('.theme-icon').textContent = '☀️';
        }
    }
}

function setupEventListeners() {
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }
    if (elements.backFromExplanation) {
        elements.backFromExplanation.addEventListener('click', () => showView('topicSelector'));
    }
    if (elements.backFromQuiz) {
        elements.backFromQuiz.addEventListener('click', () => showView('topicSelector'));
    }
    if (elements.backFromExercises) {
        elements.backFromExercises.addEventListener('click', () => showView('topicSelector'));
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    elements.themeToggle.querySelector('.theme-icon').textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function showView(viewName) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    elements[viewName].classList.add('active');
    currentView = viewName;
}

async function selectTopic(topicId, mode) {
    currentTopic = topicId;
    const topic = await loadTopicData(topicId);
    
    if (!topic) {
        alert('Error loading topic data. Please check console for details.');
        return;
    }
    
    if (mode === 'explain') {
        elements.explanationTitle.textContent = topic.title;
        elements.explanationContent.innerHTML = topic.explanation;
        showView('explanationView');
        renderMath();
    } else if (mode === 'quiz') {
        elements.quizTitle.textContent = `${topic.title} Quiz`;
        generateQuiz(topic.quiz);
        showView('quizView');
        renderMath();
    } else if (mode === 'exercises') {
        elements.exercisesTitle.textContent = `${topic.title} - Practice Exercises`;
        generateExercises(topic.exercises);
        showView('exercisesView');
        renderMath();
    }
}

function generateExercises(exercises) {
    let html = '<div class="exercises-container">';
    exercises.forEach((exercise, index) => {
        html += `
            <div class="exercise-card">
                <h3>Exercise ${index + 1}</h3>
                <div class="exercise-problem">
                    <strong>Problem:</strong>
                    <p>${exercise.problem}</p>
                </div>
                <button class="btn btn-outline toggle-solution" onclick="toggleSolution(${index})">
                    Show Solution
                </button>
                <div id="solution-${index}" class="exercise-solution" style="display: none;">
                    ${exercise.solution}
                </div>
            </div>
        `;
    });
    html += '</div>';
    elements.exercisesContent.innerHTML = html;
}

function toggleSolution(index) {
    const solution = document.getElementById(`solution-${index}`);
    const button = event.target;
    if (solution.style.display === 'none') {
        solution.style.display = 'block';
        button.textContent = 'Hide Solution';
    } else {
        solution.style.display = 'none';
        button.textContent = 'Show Solution';
    }
    renderMath();
}

function generateQuiz(questions) {
    let html = '';
    let currentQuestion = 0;
    let answered = [];
    
    function renderQuestion(index) {
        const question = questions[index];
        let optionsHtml = '';
        question.options.forEach((option, i) => {
            optionsHtml += `<div class="quiz-option" data-option="${i}">${option}</div>`;
        });
        return `
            <div class="quiz-question" data-question="${index}">
                <h3>Question ${index + 1} of ${questions.length}</h3>
                <p>${question.question}</p>
                <div class="quiz-options">${optionsHtml}</div>
                <div id="explanation-${index}" class="quiz-explanation" style="display: none;"></div>
            </div>
        `;
    }
    
    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            html = renderQuestion(currentQuestion);
            html += `
                <div class="quiz-actions">
                    <button class="btn btn-outline" onclick="previousQuestion()">Previous</button>
                    ${currentQuestion < questions.length - 1 ? '<button class="btn btn-primary" onclick="nextQuestion()" disabled id="nextBtn">Next</button>' : ''}
                </div>
            `;
            elements.quizContent.innerHTML = html;
            setupQuizListeners();
            renderMath();
        }
    }
    
    function previousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            html = renderQuestion(currentQuestion);
            html += `
                <div class="quiz-actions">
                    ${currentQuestion > 0 ? '<button class="btn btn-outline" onclick="previousQuestion()">Previous</button>' : ''}
                    ${currentQuestion < questions.length - 1 ? '<button class="btn btn-primary" onclick="nextQuestion()" id="nextBtn">Next</button>' : ''}
                </div>
            `;
            elements.quizContent.innerHTML = html;
            setupQuizListeners();
            
            if (answered[currentQuestion] !== undefined) {
                const options = document.querySelectorAll('.quiz-option');
                const userAnswer = answered[currentQuestion];
                const correctAnswer = questions[currentQuestion].correct;
                const question = questions[currentQuestion];
                
                if (userAnswer === correctAnswer) {
                    options[userAnswer].classList.add('correct');
                } else {
                    options[userAnswer].classList.add('incorrect');
                    options[correctAnswer].classList.add('correct');
                }
                
                const explanationDiv = document.getElementById(`explanation-${currentQuestion}`);
                if (explanationDiv && question.explanation) {
                    explanationDiv.innerHTML = `
                        <div class="review-explanation" style="margin-top: 1rem;">
                            <strong>Explanation:</strong> ${question.explanation}
                        </div>
                    `;
                    explanationDiv.style.display = 'block';
                }
                
                options.forEach(opt => { opt.style.pointerEvents = 'none'; });
                if (currentQuestion < questions.length - 1) {
                    document.getElementById('nextBtn').disabled = false;
                }
            }
            renderMath();
        }
    }
    
    function setupQuizListeners() {
        const options = document.querySelectorAll('.quiz-option');
        const nextBtn = document.getElementById('nextBtn');
        
        options.forEach((option, index) => {
            option.addEventListener('click', function() {
                if (answered[currentQuestion] !== undefined) return;
                
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                answered[currentQuestion] = index;
                if (nextBtn) nextBtn.disabled = false;
                
                const correctIndex = questions[currentQuestion].correct;
                const question = questions[currentQuestion];
                
                if (index === correctIndex) {
                    this.classList.add('correct');
                    this.classList.remove('selected');
                } else {
                    this.classList.add('incorrect');
                    this.classList.remove('selected');
                    options[correctIndex].classList.add('correct');
                }
                
                const explanationDiv = document.getElementById(`explanation-${currentQuestion}`);
                if (explanationDiv && question.explanation) {
                    explanationDiv.innerHTML = `
                        <div class="review-explanation" style="margin-top: 1rem;">
                            <strong>Explanation:</strong> ${question.explanation}
                        </div>
                    `;
                    explanationDiv.style.display = 'block';
                    renderMath();
                }
                
                options.forEach(opt => { opt.style.pointerEvents = 'none'; });
            });
        });
    }
    
    window.nextQuestion = nextQuestion;
    window.previousQuestion = previousQuestion;
    
    html = renderQuestion(0);
    html += `
        <div class="quiz-actions">
            ${questions.length > 1 ? '<button class="btn btn-primary" onclick="nextQuestion()" disabled id="nextBtn">Next</button>' : ''}
        </div>
    `;
    elements.quizContent.innerHTML = html;
    setupQuizListeners();
}

function renderMath() {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(document.body, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ]
        });
    }
}

window.selectTopic = selectTopic;
window.toggleSolution = toggleSolution;
