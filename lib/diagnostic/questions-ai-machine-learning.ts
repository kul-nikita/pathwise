import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

export const aiMachineLearningQuestions: DiagnosticQuestion[] = [
  // ml-python
  {
    id: "mlpy-b",
    skillId: "ml-python",
    difficulty: "beginner",
    prompt: "What does a NumPy array offer over a plain Python list for numeric work?",
    options: [
      "It can hold mixed types",
      "Fixed-type contiguous storage and vectorised operations, so element-wise math avoids a Python loop",
      "It is automatically sorted",
      "It cannot be resized, which prevents bugs"
    ],
    correctIndex: 1
  },
  {
    id: "mlpy-i",
    skillId: "ml-python",
    difficulty: "intermediate",
    prompt: "What is broadcasting in NumPy?",
    options: [
      "Sending arrays across a network",
      "Automatically expanding a smaller array's shape so it can combine element-wise with a larger one",
      "Printing an array to the console",
      "Converting an array to a list"
    ],
    correctIndex: 1
  },
  {
    id: "mlpy-a",
    skillId: "ml-python",
    difficulty: "advanced",
    prompt: "Why can slicing a NumPy array and modifying the slice change the original?",
    options: [
      "Slices are always copies, so it cannot",
      "Basic slicing returns a view sharing the same underlying buffer rather than a copy",
      "NumPy caches the last operation",
      "Only true for arrays of strings"
    ],
    correctIndex: 1
  },

  // ml-math
  {
    id: "mlmath-b",
    skillId: "ml-math",
    difficulty: "beginner",
    prompt: "What is the result of multiplying a 3×2 matrix by a 2×4 matrix?",
    options: ["A 2×2 matrix", "A 3×4 matrix", "A 4×3 matrix", "The operation is undefined"],
    correctIndex: 1
  },
  {
    id: "mlmath-i",
    skillId: "ml-math",
    difficulty: "intermediate",
    prompt: "What does the gradient of a loss function tell you?",
    options: [
      "The value of the loss at the minimum",
      "The direction of steepest increase, so stepping against it reduces the loss",
      "How many parameters the model has",
      "Whether the data is linearly separable"
    ],
    correctIndex: 1
  },
  {
    id: "mlmath-a",
    skillId: "ml-math",
    difficulty: "advanced",
    prompt: "Why is the dot product of two vectors zero when they are orthogonal?",
    options: [
      "Because their magnitudes are zero",
      "The dot product scales with the cosine of the angle between them, and cos(90°) is 0",
      "Because orthogonal vectors are always unit length",
      "It is a convention with no geometric meaning"
    ],
    correctIndex: 1
  },

  // ml-data-prep
  {
    id: "mlprep-b",
    skillId: "ml-data-prep",
    difficulty: "beginner",
    prompt: "Why is a dataset split into training and test sets?",
    options: [
      "To halve the training time",
      "To estimate performance on data the model has not seen, rather than what it memorised",
      "Because algorithms require exactly two files",
      "To balance the class distribution"
    ],
    correctIndex: 1
  },
  {
    id: "mlprep-i",
    skillId: "ml-data-prep",
    difficulty: "intermediate",
    prompt: "Why should a scaler be fitted on the training set only, then applied to the test set?",
    options: [
      "Fitting twice is slower",
      "Fitting on all the data lets test-set statistics leak into training, inflating the score",
      "Scalers can only be fitted once by design",
      "The test set does not need scaling"
    ],
    correctIndex: 1
  },
  {
    id: "mlprep-a",
    skillId: "ml-data-prep",
    difficulty: "advanced",
    prompt: "A churn model reaches 99% accuracy using a feature called `cancellation_date`. What has gone wrong?",
    options: [
      "The model is simply very good",
      "Target leakage — the feature is only known after the outcome, so it will not exist at prediction time",
      "The learning rate is too high",
      "The dataset is too small"
    ],
    correctIndex: 1
  },

  // ml-supervised
  {
    id: "mlsup-b",
    skillId: "ml-supervised",
    difficulty: "beginner",
    prompt: "What distinguishes supervised learning from unsupervised learning?",
    options: [
      "Supervised learning needs more compute",
      "Supervised learning trains on examples that carry known labels or target values",
      "Unsupervised learning is always deep learning",
      "Supervised learning never uses numeric data"
    ],
    correctIndex: 1
  },
  {
    id: "mlsup-i",
    skillId: "ml-supervised",
    difficulty: "intermediate",
    prompt: "A model scores 0.99 on training data and 0.62 on held-out data. What is happening?",
    options: [
      "Underfitting — the model is too simple",
      "Overfitting — it has learned noise specific to the training set",
      "The test set is mislabelled by definition",
      "The learning rate is too low"
    ],
    correctIndex: 1
  },
  {
    id: "mlsup-a",
    skillId: "ml-supervised",
    difficulty: "advanced",
    prompt: "How does a random forest reduce variance compared with a single decision tree?",
    options: [
      "It uses a deeper tree",
      "It averages many decorrelated trees trained on bootstrapped samples and random feature subsets",
      "It prunes the tree until it is linear",
      "It converts features to principal components first"
    ],
    correctIndex: 1
  },

  // ml-model-evaluation
  {
    id: "mleval-b",
    skillId: "ml-model-evaluation",
    difficulty: "beginner",
    prompt: "In a dataset where 99% of cases are negative, why is accuracy a misleading metric?",
    options: [
      "Accuracy cannot be computed on imbalanced data",
      "Always predicting the majority class scores 99% while catching none of the cases that matter",
      "Accuracy only works for regression",
      "It requires a balanced test set to compute at all"
    ],
    correctIndex: 1
  },
  {
    id: "mleval-i",
    skillId: "ml-model-evaluation",
    difficulty: "intermediate",
    prompt: "What does recall measure?",
    options: [
      "The share of predicted positives that were correct",
      "The share of actual positives that the model successfully found",
      "The overall proportion of correct predictions",
      "The model's training speed"
    ],
    correctIndex: 1
  },
  {
    id: "mleval-a",
    skillId: "ml-model-evaluation",
    difficulty: "advanced",
    prompt: "Why is k-fold cross-validation preferred over a single train/test split on a small dataset?",
    options: [
      "It trains a more accurate final model",
      "Every observation is used for validation exactly once, so the estimate depends less on one lucky split",
      "It eliminates overfitting entirely",
      "It requires less computation"
    ],
    correctIndex: 1
  },

  // ml-deep-learning
  {
    id: "mldl-b",
    skillId: "ml-deep-learning",
    difficulty: "beginner",
    prompt: "What is the role of an activation function in a neural network?",
    options: [
      "To initialise the weights",
      "To introduce non-linearity, without which stacked layers collapse into a single linear map",
      "To shuffle the training data",
      "To reduce the number of parameters"
    ],
    correctIndex: 1
  },
  {
    id: "mldl-i",
    skillId: "ml-deep-learning",
    difficulty: "intermediate",
    prompt: "What does backpropagation compute?",
    options: [
      "The forward prediction of the network",
      "The gradient of the loss with respect to each parameter, applying the chain rule backwards",
      "The optimal learning rate",
      "The number of layers required"
    ],
    correctIndex: 1
  },
  {
    id: "mldl-a",
    skillId: "ml-deep-learning",
    difficulty: "advanced",
    prompt: "Training loss suddenly becomes NaN. Which explanation is most likely?",
    options: [
      "The dataset is too large",
      "Exploding gradients or a too-high learning rate driving values to overflow",
      "The model has too few parameters",
      "The GPU is out of storage"
    ],
    correctIndex: 1
  },

  // ml-nlp
  {
    id: "mlnlp-b",
    skillId: "ml-nlp",
    difficulty: "beginner",
    prompt: "What is tokenisation in NLP?",
    options: [
      "Encrypting text before training",
      "Splitting text into the discrete units a model consumes, such as subwords",
      "Removing all punctuation",
      "Translating text into English"
    ],
    correctIndex: 1
  },
  {
    id: "mlnlp-i",
    skillId: "ml-nlp",
    difficulty: "intermediate",
    prompt: "What does an embedding represent?",
    options: [
      "A compressed copy of the training corpus",
      "A dense vector whose geometry places related meanings near each other",
      "The model's output probabilities",
      "A lookup table of exact synonyms"
    ],
    correctIndex: 1
  },
  {
    id: "mlnlp-a",
    skillId: "ml-nlp",
    difficulty: "advanced",
    prompt: "What does the self-attention mechanism let a transformer do?",
    options: [
      "Process tokens strictly in sequence, like an RNN",
      "Weigh every token against every other token in the context when building each representation",
      "Avoid needing any training data",
      "Guarantee factual correctness"
    ],
    correctIndex: 1
  },

  // ml-llm-applications
  {
    id: "mlllm-b",
    skillId: "ml-llm-applications",
    difficulty: "beginner",
    prompt: "What does the temperature parameter control in text generation?",
    options: [
      "How long the model trains",
      "How much randomness is applied when sampling the next token",
      "The maximum context length",
      "The number of GPUs used"
    ],
    correctIndex: 1
  },
  {
    id: "mlllm-i",
    skillId: "ml-llm-applications",
    difficulty: "intermediate",
    prompt: "What problem does retrieval-augmented generation primarily address?",
    options: [
      "Slow inference speed",
      "The model answering from parametric memory alone, by supplying relevant source text at query time",
      "The cost of fine-tuning hardware",
      "Tokenisation errors"
    ],
    correctIndex: 1
  },
  {
    id: "mlllm-a",
    skillId: "ml-llm-applications",
    difficulty: "advanced",
    prompt: "Why is instructing a model not to invent facts insufficient on its own?",
    options: [
      "Models ignore all system instructions",
      "An instruction shapes likelihood but guarantees nothing, so output still needs validating against a known-good source",
      "It only fails when temperature is zero",
      "Because the instruction consumes too many tokens"
    ],
    correctIndex: 1
  },

  // ml-deployment
  {
    id: "mldep-b",
    skillId: "ml-deployment",
    difficulty: "beginner",
    prompt: "What is model inference?",
    options: [
      "The process of training on new data",
      "Using a trained model to produce predictions for new inputs",
      "Measuring the model's accuracy",
      "Compressing the model file"
    ],
    correctIndex: 1
  },
  {
    id: "mldep-i",
    skillId: "ml-deployment",
    difficulty: "intermediate",
    prompt: "Why version the training data alongside the model artifact?",
    options: [
      "To reduce storage cost",
      "Because a result is only reproducible if you know which data produced those weights",
      "Data versioning is required by Python",
      "To speed up inference"
    ],
    correctIndex: 1
  },
  {
    id: "mldep-a",
    skillId: "ml-deployment",
    difficulty: "advanced",
    prompt: "What is training-serving skew?",
    options: [
      "A class imbalance in the training set",
      "Features computed differently in production than in training, so the live model sees inputs it was never fit on",
      "The model being too large to serve",
      "A gradual increase in request latency"
    ],
    correctIndex: 1
  },

  // ml-responsible-ai
  {
    id: "mlresp-b",
    skillId: "ml-responsible-ai",
    difficulty: "beginner",
    prompt: "A hiring model trained on past hires favours one group. What is the most likely source?",
    options: [
      "The algorithm invented a preference on its own",
      "Historical bias in the training data, which the model has faithfully reproduced",
      "Too many features were used",
      "The random seed"
    ],
    correctIndex: 1
  },
  {
    id: "mlresp-i",
    skillId: "ml-responsible-ai",
    difficulty: "intermediate",
    prompt: "Why does removing a protected attribute from the features not guarantee fairness?",
    options: [
      "The attribute is stored elsewhere in the model",
      "Correlated proxy features can still encode it, so the disparity survives its removal",
      "Fairness requires no features at all",
      "Because models memorise removed columns"
    ],
    correctIndex: 1
  },
  {
    id: "mlresp-a",
    skillId: "ml-responsible-ai",
    difficulty: "advanced",
    prompt: "Why can several reasonable fairness metrics be impossible to satisfy at once?",
    options: [
      "They are all measuring the same quantity",
      "Criteria such as equal false-positive rates and equal predictive value provably conflict when base rates differ",
      "Because fairness cannot be measured numerically",
      "Only one metric has ever been defined"
    ],
    correctIndex: 1
  }
];
