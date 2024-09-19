
$(document).ready(function() {
    let questions = [];
    let currentQuestionIndex = 0;

    // Function to load questions from the .txt file
    function loadQuestions() {
        return $.get('test.txt')
            .then(data => {
                const questionsArray = data.trim().split('\n');
                return questionsArray.map(line => {
                    const [question, ...options] = line.split(';');
                    return {
                        question,
                        options: options.slice(0, 4),
                        correctAnswer: options[4]
                    };
                });
            })
            .catch(error => {
                console.error('Error loading questions:', error);
                return [];
            });
    }

    // Function to display a question and its options
    function displayQuestion(questionData) {
        const $questionArea = $('#question-area');
        const $optionsArea = $('#options-area');

        // Clear existing content
        $questionArea.empty();
        $optionsArea.empty();

        // Display the question
        $questionArea.text(questionData.question);

        // Display the options
        $.each(questionData.options, function(index, option) {
            const $button = $('<button>').text(option);
            $button.on('click', function() {
                checkAnswer(option, questionData.correctAnswer);
            });
            $optionsArea.append($button);
        });
    }

    // Function to check the answer
    function checkAnswer(selected, correct) {
        if (selected === correct) {
            alert('Correct!');
        } else {
            alert('Wrong! The correct answer is ' + correct);
        }

        // Load the next question or end the quiz
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            alert('Quiz completed!');
        }
    }

    // Initialize the quiz
    loadQuestions().then(loadedQuestions => {
        questions = loadedQuestions;
        if (questions.length > 0) {
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            alert('No questions available!');
        }
    });
});
