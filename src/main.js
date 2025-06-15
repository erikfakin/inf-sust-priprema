// Function to shuffle array elements (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array]; // Create a copy of the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

// Game constants and configurations

const ACHIEVEMENTS = {
  perfectScore: {
    id: 'perfectScore',
    title: 'RIP AND TEAR',
    description: 'Slaughter all questions without mercy. Not a single survivor.',
    icon: 'fas fa-skull',
    condition: (stats) => stats.score === stats.totalQuestions
  },
  speedDemon: {
    id: 'speedDemon',
    title: 'SPEED KILLS',
    description: 'Finished with half the time remaining. Inf Sustavi demons couldn\'t even see you coming.',
    icon: 'fas fa-bolt',
    condition: (stats) => stats.timeUsedPercentage < 50
  },
  consistentPerformer: {
    id: 'consistentPerformer',
    title: 'BRUTAL COMBO',
    description: 'Annihilated 5 questions in a row. The info-demons cry in the corner.',
    icon: 'fas fa-fire',
    condition: (stats) => stats.maxStreak >= 5
  },
  quickThinker: {
    id: 'quickThinker',
    title: 'ULTRA-VIOLENCE',
    description: 'Executed a question in under 5 seconds. That was... messy.',
    icon: 'fas fa-radiation',
    condition: (stats) => stats.fastestAnswer <= 5
  },
  comeback: {
    id: 'comeback',
    title: 'HELL WALKER',
    description: 'Returned from the abyss after 2 wrong answers. Not even failure can stop you.',
    icon: 'fas fa-skull-crossbones',
    condition: (stats) => stats.hadComeback
  },
  halfwayHero: {
    id: 'halfwayHero',
    title: 'KNEE-DEEP IN THE DEAD',
    description: 'Scored at least 50%. You\'ve only just begun the carnage.',
    icon: 'fas fa-bone',
    condition: (stats) => stats.score >= stats.totalQuestions / 2
  },
  BFG: {
    id: 'BFG',
    title: 'BFG DIVISION',
    description: 'Answered a difficult question correctly. Big. Freaking. Genius.',
    icon: 'fas fa-meteor',
    condition: (stats) => {
      // Check if we answered any difficult questions correctly
      return userAnswers.some(answer => {
        // Consider questions with longer text or multiple correct answers as difficult
        const isLongQuestion = answer.question.length > 100;
        const hasMultipleAnswers = Array.isArray(answer.correctAnswer) &&
          answer.correctAnswer.length > 1;
        return answer.isCorrect && (isLongQuestion || hasMultipleAnswers);
      });
    }
  }
};

// Game variables
let questions = [];
let categories = {};
let allQuestions = []; // Store all the questions before filtering
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 1200; // Default: 20 minutes in seconds
let totalTime = 1200;
let userAnswers = [];
let currentStreak = 0;
let maxStreak = 0;
let wrongStreak = 0;
let hadComeback = false;
let questionStartTime = 0;
let fastestAnswer = Infinity;
let gameSettings = {
  questionCount: 15,
  timerSetting: 1200,
  soundEffects: true,
  backgroundMusic: true,
  musicVolume: 20 // Default 20%
};
let questionTimer;
let timers = [];

// DOM elements
// Welcome screen
const welcomeScreen = document.getElementById('welcome-screen');
const startButton = document.getElementById('start-btn');
const questionCountSelect = document.getElementById('question-count');
const timerSettingSelect = document.getElementById('timer-setting');
const soundToggle = document.getElementById('sound-toggle');
const viewHighScoresButton = document.getElementById('view-high-scores');

// Quiz screen
const quizScreen = document.getElementById('quiz-container');
const questionText = document.getElementById('question');
const answersList = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('time-display');
const timerBar = document.getElementById('timer-bar');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const currentQuestionDisplay = document.getElementById('current-question');
const totalQuestionsDisplay = document.getElementById('total-questions');
const questionNumberDisplay = document.getElementById('question-number');
const categoryBadge = document.getElementById('category-badge');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const correctAnswerText = document.getElementById('correct-answer');

// Results screen
const resultsScreen = document.getElementById('results-screen');
const finalScoreDisplay = document.getElementById('final-score');
const timeTakenDisplay = document.getElementById('time-taken');
const accuracyDisplay = document.getElementById('accuracy');
const achievementsList = document.getElementById('achievements-list');
const viewAnswersButton = document.getElementById('view-answers-btn');
const saveScoreButton = document.getElementById('save-score-btn');
const restartButton = document.getElementById('restart-button');

// Review screen
const reviewScreen = document.getElementById('review-screen');
const summaryContainer = document.getElementById('summary');
const backToResultsButton = document.getElementById('back-to-results');

// High scores screen
const highScoresScreen = document.getElementById('high-scores-screen');
const highScoresList = document.getElementById('high-scores-list');
const backButton = document.getElementById('back-btn');
const clearScoresButton = document.getElementById('clear-scores-btn');

// Audio elements
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const clickSound = document.getElementById('click-sound');
const completeSound = document.getElementById('complete-sound');
const backgroundMusic = document.getElementById('background-music');

// Audio control buttons
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const musicVolumeSlider = document.getElementById('music-volume-slider');

// Initialize the game
function init() {
  // Ensure audio elements are ready
  initializeAudio();

  // Set up music autoplay fix for browsers
  setupMusicAutoplayFix();

  // Load questions
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      allQuestions = data;
      categorizeQuestions(data);
      setupEventListeners();
      loadGameSettings();
    })
    .catch(error => console.error('Error loading questions:', error));
}

// Initialize audio elements
function initializeAudio() {
  // Set volume levels
  correctSound.volume = 0.6;
  wrongSound.volume = 0.6;
  clickSound.volume = 0.5;
  completeSound.volume = 0.7;

  // Set background music volume from settings
  const volumeDecimal = gameSettings.musicVolume / 100;
  backgroundMusic.volume = volumeDecimal;

  // Initialize volume slider value
  if (musicVolumeSlider) {
    musicVolumeSlider.value = gameSettings.musicVolume;
    updateVolumeSliderUI(gameSettings.musicVolume);
  }

  // Always enable background music
  gameSettings.backgroundMusic = true;

  // Start playing background music
  playBackgroundMusic();

  // Focus on preloading the audio elements
  const audioElements = [correctSound, wrongSound, clickSound, completeSound, backgroundMusic];
  audioElements.forEach(audio => {
    // Force preload
    audio.preload = 'auto';

    // Preload audio
    audio.load();

    // Log success
    audio.addEventListener('canplaythrough', () => {
      console.log(`${audio.id} loaded successfully`);
    });

    // Log errors but continue
    audio.addEventListener('error', (e) => {
      console.warn(`Error loading audio ${audio.id}, but will continue:`, e);
    });
  });

  // Add a click event listener to the document to enable audio on first user interaction
  document.addEventListener('click', () => {
    if (gameSettings.soundEffects) {
      // Try to play and immediately pause to unlock audio
      const unlockAudio = () => {
        audioElements.forEach(audio => {
          // Unlock audio
          audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
          }).catch(e => {
            console.log(`Audio unlock attempted for ${audio.id}:`, e);
          });
        });
        document.removeEventListener('click', unlockAudio);
      };
      unlockAudio();
    }
  }, { once: true });
}

// Play background music function
function playBackgroundMusic() {
  if (gameSettings.backgroundMusic) {
    try {
      // Ensure background music is ready to play
      backgroundMusic.currentTime = 0;
      backgroundMusic.loop = true;

      // Set volume from game settings
      backgroundMusic.volume = gameSettings.musicVolume / 100;

      // Try to play and handle promise rejection
      const playPromise = backgroundMusic.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Background music started successfully");
          })
          .catch(err => {
            console.log("Background music autoplay prevented:", err);
            // We'll rely on the Begin button click to start music
          });
      }
    } catch (err) {
      console.error("Error playing background music:", err);
    }
  }
}

// Stop background music function
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

// Toggle background music
function toggleBackgroundMusic() {
  if (gameSettings.backgroundMusic) {
    playBackgroundMusic();
  } else {
    stopBackgroundMusic();
  }
}

// Categorize questions
function categorizeQuestions(data) {
  // Extract categories based on question content
  // This is a simple implementation - you might need to adjust based on your actual data structure
  categories = {
    'General Knowledge': [],
    'Computer Science': [],
    'Business': [],
    'Other': []
  };

  data.forEach(question => {
    const text = question.text.toLowerCase();

    if (text.includes('computer') || text.includes('software') || text.includes('hardware') || text.includes('sistem')) {
      categories['Computer Science'].push(question);
    } else if (text.includes('business') || text.includes('organization') || text.includes('management') || text.includes('poduzeće') || text.includes('sustav')) {
      categories['Business'].push(question);
    } else if (text.includes('knowledge') || text.includes('information') || text.includes('informacij')) {
      categories['General Knowledge'].push(question);
    } else {
      categories['Other'].push(question);
    }
  });
}

// Setup event listeners
function setupEventListeners() {
  // Welcome screen
  startButton.addEventListener('click', () => {
    playSound(clickSound);
    setGameSettings();

    // Force background music to play when Begin button is clicked
    gameSettings.backgroundMusic = true;

    // Ensure the music is reset to beginning and ready to play
    backgroundMusic.currentTime = 0;
    backgroundMusic.loop = true;
    backgroundMusic.volume = gameSettings.musicVolume / 100;

    // Force play with multiple attempts if needed
    const forcePlayMusic = () => {
      backgroundMusic.play()
        .then(() => {
          console.log("Background music started successfully on button click");
        })
        .catch(err => {
          console.log("Retrying music playback after error:", err);
          // Try again after a short delay
          setTimeout(forcePlayMusic, 100);
        });
    };

    forcePlayMusic();

    showScreen(quizScreen);
    startGame();
  });

  viewHighScoresButton.addEventListener('click', () => {
    playSound(clickSound);
    showHighScores();
  });

  // Quiz screen
  nextButton.addEventListener('click', () => {
    playSound(clickSound);
    nextQuestion();
  });

  // Results screen
  viewAnswersButton.addEventListener('click', () => {
    playSound(clickSound);
    showScreen(reviewScreen);
    createDetailedSummary();
  });

  saveScoreButton.addEventListener('click', () => {
    playSound(clickSound);
    showSaveScoreModal();
  });

  restartButton.addEventListener('click', () => {
    playSound(clickSound);
    resetGame();
    showScreen(welcomeScreen);
  });

  // Review screen
  backToResultsButton.addEventListener('click', () => {
    playSound(clickSound);
    showScreen(resultsScreen);
  });

  // High scores screen
  backButton.addEventListener('click', () => {
    playSound(clickSound);
    showScreen(welcomeScreen);
  });

  clearScoresButton.addEventListener('click', () => {
    playSound(clickSound);
    clearHighScores();
  });

  // Audio controls
  soundToggle.addEventListener('change', () => {
    gameSettings.soundEffects = soundToggle.checked;
    localStorage.setItem('quizGameSettings', JSON.stringify(gameSettings));
    updateAudioControlsUI(); // Update UI immediately
  });

  // Sound toggle button
  soundToggleBtn.addEventListener('click', () => {
    gameSettings.soundEffects = !gameSettings.soundEffects;
    soundToggle.checked = gameSettings.soundEffects;
    localStorage.setItem('quizGameSettings', JSON.stringify(gameSettings));
    updateAudioControlsUI();
    if (gameSettings.soundEffects) {
      playSound(clickSound); // Provide feedback if just turned on
    }
  });

  // Music volume slider
  musicVolumeSlider.addEventListener('input', () => {
    const volume = musicVolumeSlider.value;
    setMusicVolume(volume);
    updateVolumeSliderUI(volume);

    // Try to start the music when slider is moved (user interaction)
    if (backgroundMusic.paused && gameSettings.backgroundMusic) {
      backgroundMusic.play().catch(err => {
        console.log("Tried to play music when slider moved:", err);
      });
    }

    if (gameSettings.soundEffects) {
      playSound(clickSound); // Provide feedback
    }
  });
}

// Save and load game settings
function setGameSettings() {
  gameSettings.questionCount = parseInt(questionCountSelect.value);
  gameSettings.timerSetting = parseInt(timerSettingSelect.value);
  gameSettings.soundEffects = soundToggle.checked;
  gameSettings.backgroundMusic = true; // Always ensure music is enabled

  localStorage.setItem('quizGameSettings', JSON.stringify(gameSettings));
}

function loadGameSettings() {
  const savedSettings = localStorage.getItem('quizGameSettings');
  if (savedSettings) {
    gameSettings = JSON.parse(savedSettings);

    // Handle missing settings in older saved configurations
    if (gameSettings.musicVolume === undefined) {
      gameSettings.musicVolume = 20; // Default 20%
    }

    // Always ensure background music is enabled
    gameSettings.backgroundMusic = true;

    // Apply saved settings to UI
    questionCountSelect.value = gameSettings.questionCount;
    timerSettingSelect.value = gameSettings.timerSetting;
    soundToggle.checked = gameSettings.soundEffects;

    // Update volume slider
    musicVolumeSlider.value = gameSettings.musicVolume;
    updateVolumeSliderUI(gameSettings.musicVolume);

    // Update persistent audio controls
    updateAudioControlsUI();
  } else {
    // First time user, initialize UI
    updateAudioControlsUI();
    updateVolumeSliderUI(gameSettings.musicVolume);
  }
}

// Update the audio controls UI states
function updateAudioControlsUI() {
  // Sound effects button
  if (gameSettings.soundEffects) {
    soundToggleBtn.classList.add('active');
    soundToggleBtn.classList.remove('muted');
    soundToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    soundToggleBtn.classList.remove('active');
    soundToggleBtn.classList.add('muted');
    soundToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }

  // Always ensure music is enabled
  gameSettings.backgroundMusic = true;

  // Volume slider
  musicVolumeSlider.value = gameSettings.musicVolume;
  // Update the volume display if it exists
  if (document.getElementById('volume-value-display')) {
    document.getElementById('volume-value-display').textContent = `${gameSettings.musicVolume}%`;
  }
  musicVolumeSlider.style.background = `linear-gradient(to right, var(--doom-red) 0%, var(--doom-red) ${gameSettings.musicVolume}%, #444 ${gameSettings.musicVolume}%, #444 100%)`;
}

// Show a specific screen
function showScreen(screen) {
  // Hide all screens
  welcomeScreen.classList.remove('active');
  quizScreen.classList.remove('active');
  resultsScreen.classList.remove('active');
  reviewScreen.classList.remove('active');
  highScoresScreen.classList.remove('active');

  // Show the desired screen
  screen.classList.add('active');

  // Handle sound effects
  if (screen === resultsScreen) {
    if (gameSettings.soundEffects) {
      completeSound.play();
    }
  }
}

// Start the game
function startGame() {
  // Reset game variables
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  currentStreak = 0;
  maxStreak = 0;
  wrongStreak = 0;
  hadComeback = false;
  fastestAnswer = Infinity;

  // Start background music if enabled
  if (gameSettings.backgroundMusic) {
    playBackgroundMusic();
  }

  // Set timer based on settings
  timeLeft = gameSettings.timerSetting;
  totalTime = timeLeft;

  // Update UI with new settings
  scoreElement.textContent = '0';
  updateTimerDisplay();
  currentQuestionDisplay.textContent = '1';
  totalQuestionsDisplay.textContent = gameSettings.questionCount;

  // Select and shuffle questions
  selectQuestions();

  // Update progress bar
  updateProgress();

  // Start timer
  startTimer();

  // Show first question
  showQuestion();
}

// Select questions based on difficulty and settings
function selectQuestions() {
  questions = [];

  // Shuffle all questions
  const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

  // Select based on question count setting
  questions = shuffledQuestions.slice(0, gameSettings.questionCount);
}

// Show the current question
function showQuestion() {
  // Clear any previous question timers
  clearTimeout(questionTimer);

  const question = questions[currentQuestionIndex];
  questionText.textContent = question.text;
  questionNumberDisplay.textContent = `Question ${currentQuestionIndex + 1}`;

  // Set category badge
  let category = 'General Knowledge';
  for (const [cat, questionList] of Object.entries(categories)) {
    if (questionList.some(q => q.text === question.text)) {
      category = cat;
      break;
    }
  }
  categoryBadge.textContent = category;

  // Clear previous answers and feedback
  answersList.innerHTML = "";
  feedbackContainer.style.display = 'none';
  document.getElementById('explanation-text').style.display = 'none';

  // Record the start time for this question
  questionStartTime = Date.now();

  if (question.type === "fill-in-the-blank") {
    // Create a container for styled input
    const inputContainer = document.createElement("div");
    inputContainer.className = "doom-input-container fill-blank-container";

    // Add icon
    const icon = document.createElement("i");
    icon.className = "fas fa-pen-nib input-icon";
    inputContainer.appendChild(icon);

    // Create the input field
    const input = document.createElement("input");
    input.type = "text";
    input.id = "user-answer";
    input.placeholder = "TYPE YOUR ANSWER HERE, SLAYER...";
    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("spellcheck", "false");
    inputContainer.appendChild(input);

    answersList.appendChild(inputContainer);

    input.focus();

    // Add event listener for enter key
    input.addEventListener('keypress', function (event) {
      if (event.key === 'Enter' && !nextButton.disabled) {
        nextQuestion();
      }
    });
  } else {
    const isMultipleChoice = question.answers.filter(a => a.correct).length > 1;

    // Store original indices for tracking correct answers after shuffle
    const answersWithIndices = question.answers.map((answer, index) => ({
      ...answer,
      originalIndex: index
    }));

    // Determine if this is a true/false question
    const isTrueFalseQuestion =
      question.answers.length === 2 &&
      (
        // Check for Croatian "Točno"/"Netočno"
        (question.answers.some(a => a.text === "Točno") && question.answers.some(a => a.text === "Netočno")) ||
        // Check for English "True"/"False"
        (question.answers.some(a => a.text === "True") && question.answers.some(a => a.text === "False"))
      );

    let shuffledAnswers;
    if (isTrueFalseQuestion) {
      // Don't shuffle true/false questions
      shuffledAnswers = answersWithIndices;
    } else {
      // Shuffle all other question types (multiple choice)
      shuffledAnswers = shuffleArray(answersWithIndices);
    }

    shuffledAnswers.forEach((answer, index) => {
      const container = document.createElement("div");
      container.className = 'answer-option';
      container.dataset.index = answer.originalIndex; // Use original index for tracking

      const input = document.createElement("input");
      input.type = isMultipleChoice ? "checkbox" : "radio";
      input.name = "answer";
      input.id = `answer-${index}`;
      input.value = answer.text;

      const label = document.createElement("label");
      label.htmlFor = `answer-${index}`;
      label.textContent = answer.text;

      container.appendChild(input);
      container.appendChild(label);

      // SIMPLIFIED EVENT HANDLING
      // Add a single click handler directly to container
      container.addEventListener('click', function (e) {
        // Skip if clicking directly on the input
        if (e.target === input) {
          return;
        }

        // Handle different input types
        if (input.type === 'radio') {
          // For radio buttons, deselect all others
          document.querySelectorAll('#answer-buttons .answer-option').forEach(opt => {
            opt.classList.remove('selected');
          });
          container.classList.add('selected');
          input.checked = true;
        } else {
          // For checkboxes, toggle the state
          input.checked = !input.checked;
          container.classList.toggle('selected', input.checked);
        }
      });

      // Add click handler to the label explicitly (important for touch devices)
      label.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default label behavior
        e.stopPropagation(); // Prevent double-triggering

        // Toggle input state
        if (input.type === 'radio') {
          document.querySelectorAll('#answer-buttons .answer-option').forEach(opt => {
            opt.classList.remove('selected');
          });
          container.classList.add('selected');
          input.checked = true;
        } else {
          input.checked = !input.checked;
          container.classList.toggle('selected', input.checked);
        }
      });

      answersList.appendChild(container);
    });
  }

  nextButton.disabled = false;
  nextButton.textContent = `Attack!`;
  nextButton.innerHTML = `Attack! <i class="fas fa-khanda"></i>`;
}

// Move to the next question or end the game
function nextQuestion() {
  const question = questions[currentQuestionIndex];

  // Check if this is a submission (not a "next" after feedback)
  if (feedbackContainer.style.display === 'none') {
    let userAnswer;
    let isCorrect = false;

    if (question.type === "fill-in-the-blank") {
      userAnswer = document.getElementById("user-answer").value.trim();

      if (Array.isArray(question.correctAnswer)) {
        isCorrect = question.correctAnswer.map(ans => ans.toLowerCase()).includes(userAnswer.toLowerCase());
      } else {
        isCorrect = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
      }
    } else {
      // Get selected answers from the selected class rather than checked inputs
      // This is more reliable for our custom UI
      const selectedOptions = document.querySelectorAll('#answer-buttons .answer-option.selected');
      userAnswer = Array.from(selectedOptions).map(option => {
        const index = parseInt(option.dataset.index); // This is the original index we stored
        return question.answers[index].text;
      });

      // For debugging
      console.log('Selected answers:', userAnswer);

      const correctAnswers = question.answers.filter(a => a.correct).map(a => a.text);
      console.log('Correct answers:', correctAnswers);

      // The answer is correct if user selected all and only the correct answers
      isCorrect = userAnswer.length === correctAnswers.length &&
        userAnswer.every(answer => correctAnswers.includes(answer)) &&
        correctAnswers.every(answer => userAnswer.includes(answer));
    }

    // Calculate time taken to answer
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    fastestAnswer = Math.min(fastestAnswer, timeTaken);

    // Store user answer
    userAnswers.push({
      question: question.text,
      userAnswer: userAnswer,
      correctAnswer: question.type === "fill-in-the-blank" ? question.correctAnswer : question.answers.filter(a => a.correct).map(a => a.text),
      isCorrect: isCorrect,
      timeTaken: timeTaken
    });

    // Update streak information
    if (isCorrect) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);

      if (wrongStreak >= 2) {
        hadComeback = true;
      }
      wrongStreak = 0;

      // Play correct sound
      playSound(correctSound);

      // Update score
      score++;
      scoreElement.textContent = score;

      // Show feedback
      showFeedback(true);
    } else {
      currentStreak = 0;
      wrongStreak++;

      // Play wrong sound
      playSound(wrongSound);

      // Show feedback
      showFeedback(false);
    }

    // Change button text
    nextButton.textContent = currentQuestionIndex >= questions.length - 1 ? 'Complete Quest' : 'Next Challenge';
    nextButton.innerHTML = currentQuestionIndex >= questions.length - 1 ?
      `Complete Quest <i class="fas fa-flag-checkered"></i>` :
      `Next Challenge <i class="fas fa-arrow-right"></i>`;

    return; // Exit function after showing feedback
  }

  // Move to next question or end the game
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length && currentQuestionIndex < gameSettings.questionCount) {
    // Update progress
    updateProgress();
    currentQuestionDisplay.textContent = currentQuestionIndex + 1;

    // Show next question
    showQuestion();
  } else {
    endGame();
  }
}

// Show feedback for the current question
function showFeedback(isCorrect) {
  const question = questions[currentQuestionIndex];
  feedbackContainer.style.display = 'block';
  feedbackContainer.className = isCorrect ? 'correct' : 'incorrect';

  feedbackText.textContent = isCorrect ? 'DEMON SLAYED!' : 'TARGET SURVIVED!';

  // Get selected answers (both for single and multiple choice)
  const selectedOptions = document.querySelectorAll('#answer-buttons .answer-option.selected');
  const selectedValues = Array.from(selectedOptions).map(option => {
    const index = parseInt(option.dataset.index); // Using original index
    return question.answers[index].text;
  });

  if (!isCorrect) {
    // Show correct answers
    const correctAnswers = question.type === "fill-in-the-blank" ? question.correctAnswer : question.answers.filter(a => a.correct).map(a => a.text);
    const correctAnswerString = Array.isArray(correctAnswers) ? correctAnswers.join(", ") : correctAnswers;
    correctAnswerText.textContent = `PROPER WEAPON: ${correctAnswerString}`;

    // Display explanation if available
    const explanationElement = document.getElementById('explanation-text');
    if (question.explanation) {
      explanationElement.textContent = question.explanation;
      explanationElement.style.display = 'block';
    } else {
      explanationElement.style.display = 'none';
    }

    // Highlight correct and incorrect answers
    if (question.type !== "fill-in-the-blank") {
      document.querySelectorAll('#answer-buttons .answer-option').forEach((option) => {
        const originalIndex = parseInt(option.dataset.index);
        const isCorrectAnswer = question.answers[originalIndex].correct;
        const isSelected = option.classList.contains('selected');

        if (isCorrectAnswer) {
          // Always highlight correct answers clearly
          option.classList.add('correct');
          // Force a repaint to ensure the styles are applied
          option.offsetHeight;
        }

        // If this option was selected but is wrong, mark it as incorrect
        if (isSelected && !isCorrectAnswer) {
          option.classList.add('incorrect');
          // Force a repaint to ensure the styles are applied
          option.offsetHeight;
        }
      });
    }
  } else {
    // For correct answers
    correctAnswerText.textContent = '';

    // Hide explanation for correct answers
    document.getElementById('explanation-text').style.display = 'none';

    // Highlight the selected answers as correct
    if (question.type !== "fill-in-the-blank") {
      // For multiple choice questions, we need to make sure all selected answers are correct
      document.querySelectorAll('#answer-buttons .answer-option').forEach((option) => {
        const originalIndex = parseInt(option.dataset.index);
        const isCorrectAnswer = question.answers[originalIndex].correct;
        const isSelected = option.classList.contains('selected');

        if (isSelected) {
          option.classList.add('correct');
          // Force a repaint to ensure the styles are applied
          option.offsetHeight;
        }
      });
    }
  }

  // Add animation to the feedback
  feedbackContainer.classList.add(isCorrect ? 'correct-animation' : 'incorrect-animation');
}

// Update the progress bar
function updateProgress() {
  const progressPercentage = (currentQuestionIndex / gameSettings.questionCount) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Start the timer
function startTimer() {
  // Clear any existing timers
  timers.forEach(clearInterval);
  timers = [];

  const timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);

  timers.push(timerInterval);

  // Animate timer bar
  timerBar.style.transition = 'width 1s linear';
  timerBar.style.width = '100%';

  function updateTimerBar() {
    const percentageRemaining = (timeLeft / totalTime) * 100;
    timerBar.style.width = `${percentageRemaining}%`;

    // Change color of timer based on time left
    if (percentageRemaining > 50) {
      timerBar.style.backgroundColor = 'var(--primary-color)';
    } else if (percentageRemaining > 25) {
      timerBar.style.backgroundColor = 'var(--warning-color)';
    } else {
      timerBar.style.backgroundColor = 'var(--error-color)';
    }
  }

  const barInterval = setInterval(updateTimerBar, 1000);
  timers.push(barInterval);
}

// Update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// End the game
function endGame() {
  // Clear all timers
  timers.forEach(clearInterval);
  timers = [];

  // Calculate statistics
  const timeUsed = totalTime - timeLeft;
  const timeUsedPercentage = (timeUsed / totalTime) * 100;
  const accuracy = (score / gameSettings.questionCount) * 100;

  // Format time for display
  const minutes = Math.floor(timeUsed / 60);
  const seconds = timeUsed % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  // Update results screen
  finalScoreDisplay.textContent = `${score}/${gameSettings.questionCount}`;
  timeTakenDisplay.textContent = formattedTime;
  accuracyDisplay.textContent = `${Math.round(accuracy)}%`;

  // Check achievements
  const gameStats = {
    score,
    totalQuestions: gameSettings.questionCount,
    accuracy,
    timeUsed,
    timeUsedPercentage,
    maxStreak,
    fastestAnswer,
    hadComeback
  };

  // Display achievements
  displayAchievements(gameStats);

  // Show confetti for good performance
  if (accuracy >= 70) {
    // Slight delay to ensure the results screen is visible first
    setTimeout(() => {
      showConfetti();
    }, 300);
  }

  // Automatically save the score with a default name (timestamp)
  const defaultName = `Player_${new Date().toLocaleDateString().replace(/\//g, '-')}_${new Date().toLocaleTimeString().replace(/:/g, '-')}`;
  saveHighScore(defaultName);

  // Show results screen
  showScreen(resultsScreen);
}

// Display earned achievements
function displayAchievements(stats) {
  // Clear previous achievements
  achievementsList.innerHTML = '';

  // Add DOOM-style header
  const achievementHeader = document.createElement('div');
  achievementHeader.className = 'achievement-header';
  achievementHeader.innerHTML = 'DEMONIC ACHIEVEMENTS UNLOCKED';
  achievementsList.appendChild(achievementHeader);

  // Check each achievement
  let hasAchievements = false;
  let achievementCount = 0;

  // Array to store achievements that were earned, so we can display them in order
  const earnedAchievements = [];

  // Check which achievements were earned
  for (const achievement of Object.values(ACHIEVEMENTS)) {
    if (achievement.condition(stats)) {
      earnedAchievements.push(achievement);
      hasAchievements = true;
      achievementCount++;
    }
  }

  // If we earned achievements, create a counter
  if (hasAchievements) {
    // Add achievement counter in DOOM style
    const counterElement = document.createElement('div');
    counterElement.className = 'achievement-counter';
    counterElement.innerHTML = `${achievementCount}/${Object.keys(ACHIEVEMENTS).length} GLORY KILLS`;
    achievementsList.appendChild(counterElement);

    // Add sound effect for achievements (if enabled)
    if (gameSettings.soundEffects) {
      try {
        const audio = new Audio();
        audio.volume = 0.7;
        audio.src = '/audio/correct.mp3';  // Use existing sound for now
        audio.play();
      } catch (err) {
        console.error("Failed to play achievement sound", err);
      }
    }

    // Display each achievement with a DOOM-style effect
    earnedAchievements.forEach((achievement, index) => {
      const achievementElement = document.createElement('div');
      achievementElement.className = 'achievement doom-achievement';

      // Add a slight delay for each achievement to create a staggered appearance
      achievementElement.style.animationDelay = `${index * 0.2}s`;

      // Force initial state for animation
      achievementElement.style.opacity = '0';
      achievementElement.style.transform = 'translateX(-100px)';

      // Set content
      achievementElement.innerHTML = `
        <div class="achievement-icon"><i class="${achievement.icon}"></i></div>
        <div class="achievement-info">
          <div class="achievement-title">${achievement.title}</div>
          <div class="achievement-desc">${achievement.description}</div>
        </div>
      `;

      // Add to DOM
      achievementsList.appendChild(achievementElement);

      // Force reflow to ensure animation works
      achievementElement.offsetHeight;
    });
  } else {
    // If no achievements, show a DOOM-style failure message
    const noAchievementElement = document.createElement('div');
    noAchievementElement.className = 'no-achievements doom-failure';
    noAchievementElement.innerHTML = 'MORTALLY CHALLENGED<br><span class="doom-subtitle">YOUR WEAKNESS IS SHOWING. RIP HARDER NEXT TIME.</span>';

    // Apply animation classes
    noAchievementElement.style.opacity = '0';
    achievementsList.appendChild(noAchievementElement);

    // Force reflow for animation
    noAchievementElement.offsetHeight;
    noAchievementElement.style.opacity = '1';
  }
}

// Create a detailed summary of the quiz
function createDetailedSummary() {
  // Clear previous summary
  summaryContainer.innerHTML = '';

  userAnswers.forEach((entry, index) => {
    const questionSummary = document.createElement("div");
    questionSummary.className = entry.isCorrect ? 'correct' : 'incorrect';

    const userAnswerFormatted = Array.isArray(entry.userAnswer) ? entry.userAnswer.join(", ") : entry.userAnswer;
    const correctAnswerFormatted = Array.isArray(entry.correctAnswer) ? entry.correctAnswer.join(", ") : entry.correctAnswer;

    questionSummary.innerHTML = `
      <p><strong>BATTLE ${index + 1}:</strong> ${entry.question}</p>
      <p><strong>YOUR ATTACK:</strong> <span class="${entry.isCorrect ? 'correct' : 'incorrect'}">${userAnswerFormatted || "(No attack)"}</span></p>
      <p><strong>KILLING BLOW:</strong> <span class="correct">${correctAnswerFormatted}</span></p>
      <p><strong>EXECUTION TIME:</strong> ${entry.timeTaken.toFixed(1)} seconds</p>
    `;

    summaryContainer.appendChild(questionSummary);
  });
}

// Show high scores
function showHighScores() {
  // Load high scores from local storage
  const highScores = getHighScores();

  // Clear previous high scores
  highScoresList.innerHTML = '';

  if (highScores.length === 0) {
    const noScoresMessage = document.createElement('div');
    noScoresMessage.className = 'no-scores-message';
    noScoresMessage.textContent = 'THE SLAYER\'S HALL AWAITS ITS FIRST DOOM SLAYER. WILL YOU CLAIM BLOODY GLORY?';
    highScoresList.appendChild(noScoresMessage);
  } else {
    // Sort scores by score, then by time (faster time is better)
    highScores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.time - b.time;
    });

    // Display top 10 scores
    highScores.slice(0, 10).forEach((scoreData, index) => {
      const scoreItem = document.createElement('div');
      scoreItem.className = 'high-score-item';

      scoreItem.innerHTML = `
        <div class="high-score-rank">#${index + 1}</div>
        <div class="high-score-info">
          <div class="high-score-name">${scoreData.name}</div>
          <div class="high-score-date">${new Date(scoreData.date).toLocaleDateString()}</div>
        </div>
        <div class="high-score-value">${scoreData.score}/${scoreData.totalQuestions}</div>
      `;

      highScoresList.appendChild(scoreItem);
    });
  }

  showScreen(highScoresScreen);
}

// Get high scores from local storage
function getHighScores() {
  const highScores = localStorage.getItem('quizHighScores');
  return highScores ? JSON.parse(highScores) : [];
}

// Save high score
function saveHighScore(name) {
  let highScores = getHighScores();
  const timeUsed = totalTime - timeLeft;
  const currentDate = Date.now();

  // Removed test call

  // Check if we're updating an existing score from this session
  const lastScore = highScores[highScores.length - 1];
  const isUpdateToCurrentSession = lastScore &&
    lastScore.score === score &&
    lastScore.totalQuestions === gameSettings.questionCount &&
    lastScore.time === timeUsed &&
    (currentDate - lastScore.date) < 300000; // Less than 5 minutes old

  const scoreData = {
    name,
    score,
    totalQuestions: gameSettings.questionCount,
    time: timeUsed,
    date: currentDate
  };

  if (isUpdateToCurrentSession) {
    // Update the player name for the latest score
    highScores[highScores.length - 1].name = name;
  } else {
    // Add as a new score
    highScores.push(scoreData);
  }

  localStorage.setItem('quizHighScores', JSON.stringify(highScores));

  // Show high scores after saving
  showHighScores();
}

// Clear high scores
function clearHighScores() {
  localStorage.removeItem('quizHighScores');
  showHighScores();
}

// Show save score modal
function showSaveScoreModal() {
  const modal = document.createElement('div');
  modal.id = 'save-score-modal';
  modal.style.display = 'flex';

  modal.innerHTML = `
    <div class="modal-content">
      <h2 class="modal-title">Claim Your Legend</h2>
      <p>Your feat has been recorded in the annals. Enter your warrior name for the Hall of Fame.</p>
      <div class="doom-input-container">
        <i class="fas fa-skull input-icon"></i>
        <input type="text" id="player-name" class="modal-input" placeholder="ENTER YOUR NAME, SLAYER..." maxlength="20" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      </div>
      <div class="modal-buttons">
        <button id="cancel-save" class="btn secondary-btn"><i class="fas fa-times"></i> Retreat</button>
        <button id="confirm-save" class="btn primary-btn"><i class="fas fa-trophy"></i> Claim Glory</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Focus the input
  document.getElementById('player-name').focus();

  // Add event listeners
  document.getElementById('confirm-save').addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value.trim();
    if (playerName) {
      saveHighScore(playerName);
    }
    document.body.removeChild(modal);
  });

  document.getElementById('cancel-save').addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Close on click outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

// Reset the game
function resetGame() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  clearTimeout(questionTimer);
  timers.forEach(clearInterval);
  timers = [];
}

// Show confetti animation
function showConfetti() {
  console.log("Showing confetti");

  // Let's use a simpler approach with direct CSS animations
  // Remove any existing confetti styles
  const oldStyles = document.getElementById('confetti-styles');
  if (oldStyles) {
    document.head.removeChild(oldStyles);
  }

  // Add new confetti styles
  const confettiStyles = document.createElement('style');
  confettiStyles.id = 'confetti-styles';
  confettiStyles.textContent = `
    .confetti-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 100;
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #f00;
      pointer-events: none;
      z-index: 100;
      animation: confettiAnimation 3s ease-in forwards;
      transform-origin: center;
      will-change: transform, opacity;
      top: 50%;
      left: 50%;
    }
    
    @keyframes confettiAnimation {
      0% {
        transform: translate(-50%, -50%) scale(0.1) rotate(0deg);
        opacity: 1;
      }
      25% {
        opacity: 1;
      }
      100% {
        transform: translate(calc(-50% + var(--tx) * 1px), calc(-50% + var(--ty) * 1px)) scale(1) rotate(var(--rot));
        opacity: 0;
      }
    }
    
    .confetti-circle {
      border-radius: 50%;
    }
    
    .confetti-rect {
      width: 12px;
      height: 6px;
    }
    
    .confetti-triangle {
      width: 0 !important;
      height: 0 !important;
      background-color: transparent !important;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 12px solid;
    }
  `;
  document.head.appendChild(confettiStyles);

  // Clear existing confetti
  const confettiContainer = document.getElementById('confetti-container');
  confettiContainer.innerHTML = '';
  confettiContainer.className = 'confetti-container';

  // Get the container dimensions
  const rect = confettiContainer.getBoundingClientRect();
  const containerWidth = rect.width;
  const containerHeight = rect.height;

  // Colors for the confetti
  const colors = ['#f72585', '#4361ee', '#4cc9f0', '#4895ef', '#3a0ca3', '#ffbe0b', '#fb5607'];

  // Create confetti pieces
  for (let i = 0; i < 150; i++) {
    // Create a confetti element
    const confetti = document.createElement('div');

    // Randomly decide the shape
    const shapeTypes = ['circle', 'rect', 'triangle'];
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    confetti.classList.add('confetti', `confetti-${shapeType}`);

    // Set random size
    const size = Math.random() * 8 + 5;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;

    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    if (shapeType === 'triangle') {
      confetti.style.borderBottomColor = color;
    } else {
      confetti.style.backgroundColor = color;
    }

    // Calculate max distance to keep pieces within container bounds
    const maxDistance = Math.min(containerWidth, containerHeight) * 0.45;

    // Random animation variables - limit spread to prevent overflow
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * maxDistance;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rot = Math.random() * 720 - 360;

    // Set custom properties for animation
    confetti.style.setProperty('--tx', tx);
    confetti.style.setProperty('--ty', ty);
    confetti.style.setProperty('--rot', `${rot}deg`);

    // Random animation duration
    const duration = Math.random() * 2 + 2;
    confetti.style.animationDuration = `${duration}s`;

    // Add to container
    confettiContainer.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
      if (confettiContainer.contains(confetti)) {
        confettiContainer.removeChild(confetti);
      }
    }, duration * 1000 + 100);
  }
}

// Try to play music on any user interaction to overcome autoplay restrictions
function setupMusicAutoplayFix() {
  const tryPlayMusic = () => {
    if (gameSettings.backgroundMusic && backgroundMusic.paused) {
      backgroundMusic.play().then(() => {
        // Successfully started playing
        document.removeEventListener('click', tryPlayMusic);
        document.removeEventListener('touchstart', tryPlayMusic);
        document.removeEventListener('keydown', tryPlayMusic);
        document.removeEventListener('mousemove', tryPlayMusic);
        backgroundMusic.paused = false;

      }).catch(err => {
        // Still can't play, keep the listeners active
        console.log("Still can't autoplay music:", err);
      });
    }
  };

  // Add event listeners for common user interactions
  document.addEventListener('click', tryPlayMusic);
  document.addEventListener('touchstart', tryPlayMusic);
  document.addEventListener('keydown', tryPlayMusic);
  document.addEventListener('mousemove', tryPlayMusic);
}

// Play sound effect
function playSound(sound) {
  if (gameSettings.soundEffects) {
    try {
      // Reset playback position
      sound.currentTime = 0;

      // Play the audio file
      const playPromise = sound.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Audio playback failed, but will not use synthetic fallback: ', error);
          // We're no longer falling back to synthetic sound as requested
        });
      }
    } catch (e) {
      console.error('Audio playback error:', e);
      // No fallback to synthetic sound
    }
  }
}

// CSS for confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.innerHTML = `
  @keyframes confetti-explosion {
    0% {
      transform: translate(-50%, -50%) scale(0.1) rotate(0deg);
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--x-end), var(--y-end)) scale(1) rotate(720deg);
      opacity: 0;
    }
  }
  
  .confetti {
    position: absolute;
    z-index: 100;
    transform: translate(-50%, -50%);
    animation-name: confetti-explosion;
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  .confetti.circle {
    border-radius: 50%;
  }
  
  .confetti.square {
    border-radius: 0;
  }
  
  .confetti.triangle {
    width: 0 !important;
    height: 0 !important;
    background-color: transparent !important;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 14px solid; /* Will inherit the backgroundColor as border color */
  }
  
  .confetti.rectangle {
    border-radius: 2px;
    transform-origin: center;
  }
`;
document.head.appendChild(confettiStyle);

// Function to set music volume
function setMusicVolume(volumePercent) {
  // Convert percent to decimal (0-1)
  const volumeDecimal = volumePercent / 100;
  gameSettings.musicVolume = parseInt(volumePercent);

  // Update actual volume
  backgroundMusic.volume = volumeDecimal;

  // Save to local storage
  localStorage.setItem('quizGameSettings', JSON.stringify(gameSettings));
}

// Volume button state is no longer needed as the slider is always visible

// Update volume slider UI
function updateVolumeSliderUI(volume) {
  // Update the background gradient to show volume level
  musicVolumeSlider.style.background = `linear-gradient(to right, var(--doom-red) 0%, var(--doom-red) ${volume}%, #444 ${volume}%, #444 100%)`;

  // Update the volume display text
  const volumeDisplay = document.getElementById('volume-value-display');
  if (volumeDisplay) {
    volumeDisplay.textContent = `${volume}%`;
  }
}

// Initialize the game
init();
