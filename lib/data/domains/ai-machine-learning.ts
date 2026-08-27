import { defineDomain, resource } from "@/lib/data/catalog-helpers";

const V = "2026-08-26";

/** Every URL below returned HTTP 200 on 2026-08-26. */
export const aiMachineLearning = defineDomain({
  domain: {
    id: "ai-machine-learning",
    name: "AI & Machine Learning",
    description: "Train, evaluate, and ship models — and the applications built on top of them."
  },

  roles: [
    {
      id: "machine-learning-engineer",
      title: "Machine Learning Engineer",
      description: "Take a model from a notebook to something that runs, is measured, and can be trusted.",
      requiredSkills: [
        { skillId: "ml-python", importance: 1 },
        { skillId: "ml-math", importance: 0.8 },
        { skillId: "ml-data-prep", importance: 0.9 },
        { skillId: "ml-supervised", importance: 1 },
        { skillId: "ml-model-evaluation", importance: 1 },
        { skillId: "ml-deep-learning", importance: 0.8 },
        { skillId: "ml-deployment", importance: 0.9 },
        { skillId: "ml-responsible-ai", importance: 0.7 }
      ]
    },
    {
      id: "ai-application-developer",
      title: "AI Application Developer",
      description: "Build products on top of language models, with grounding and evaluation built in.",
      requiredSkills: [
        { skillId: "ml-python", importance: 1 },
        { skillId: "ml-data-prep", importance: 0.7 },
        { skillId: "ml-nlp", importance: 0.8 },
        { skillId: "ml-llm-applications", importance: 1 },
        { skillId: "ml-deployment", importance: 0.8 },
        { skillId: "ml-math", importance: 0.6 },
        { skillId: "ml-supervised", importance: 0.7 },
        { skillId: "ml-model-evaluation", importance: 0.7 },
        { skillId: "ml-deep-learning", importance: 0.7 },
        { skillId: "ml-responsible-ai", importance: 0.8 }
      ]
    }
  ],

  skills: [
    {
      id: "ml-python",
      name: "Python for ML",
      category: "foundations",
      description: "Arrays, dataframes, notebooks, and the numerical stack an experiment runs on.",
      prerequisites: []
    },
    {
      id: "ml-math",
      name: "Math for ML",
      category: "foundations",
      description: "Vectors, matrices, gradients, probability, and what a loss surface actually is.",
      prerequisites: []
    },
    {
      id: "ml-data-prep",
      name: "Data Preparation",
      category: "modelling",
      description: "Features, encoding, scaling, leakage, and building an honest train/test split.",
      prerequisites: ["ml-python"]
    },
    {
      id: "ml-supervised",
      name: "Supervised Learning",
      category: "modelling",
      description: "Regression, classification, trees and ensembles, and the bias–variance trade-off.",
      prerequisites: ["ml-data-prep", "ml-math"]
    },
    {
      id: "ml-model-evaluation",
      name: "Model Evaluation",
      category: "modelling",
      description: "Cross-validation, precision and recall, calibration, and choosing the right metric.",
      prerequisites: ["ml-supervised"]
    },
    {
      id: "ml-deep-learning",
      name: "Deep Learning",
      category: "modelling",
      description: "Tensors, autograd, network architectures, and the mechanics of a training loop.",
      prerequisites: ["ml-supervised"]
    },
    {
      id: "ml-nlp",
      name: "Natural Language Processing",
      category: "applications",
      description: "Tokenisation, embeddings, transformers, and fine-tuning a pretrained model.",
      prerequisites: ["ml-deep-learning"]
    },
    {
      id: "ml-llm-applications",
      name: "LLM Application Development",
      category: "applications",
      description: "Prompting, structured output, retrieval, tool use, and evaluating a generated answer.",
      prerequisites: ["ml-python"]
    },
    {
      id: "ml-deployment",
      name: "Model Deployment",
      category: "operations",
      description: "Serve a model behind an API, version it, and watch for drift once it is live.",
      prerequisites: ["ml-model-evaluation"]
    },
    {
      id: "ml-responsible-ai",
      name: "Responsible AI",
      category: "operations",
      description: "Fairness, transparency, privacy, and the failure modes that only appear in production.",
      prerequisites: ["ml-model-evaluation"]
    }
  ],

  resources: [
    resource({
      id: "kaggle-python-course",
      title: "Python",
      provider: "Kaggle Learn",
      url: "https://www.kaggle.com/learn/python",
      resourceType: "course",
      skillTags: ["ml-python"],
      difficulty: "beginner",
      durationMinutes: 300,
      qualityScore: 0.82,
      evidenceType: "python-notebook-ml",
      lastVerifiedAt: V,
      description: "The Python needed for data work: types, loops, functions, and standard libraries."
    }),
    resource({
      id: "numpy-absolute-beginners",
      title: "NumPy: The Absolute Basics for Beginners",
      provider: "NumPy",
      url: "https://numpy.org/doc/stable/user/absolute_beginners.html",
      resourceType: "doc",
      skillTags: ["ml-python"],
      difficulty: "beginner",
      durationMinutes: 150,
      qualityScore: 0.85,
      evidenceType: "python-notebook-ml",
      lastVerifiedAt: V,
      description: "Arrays, shapes, broadcasting, and the vectorised thinking everything else builds on."
    }),
    resource({
      id: "3blue1brown-linear-algebra",
      title: "Essence of Linear Algebra",
      provider: "3Blue1Brown",
      url: "https://www.3blue1brown.com/topics/linear-algebra",
      resourceType: "video",
      skillTags: ["ml-math"],
      difficulty: "beginner",
      durationMinutes: 240,
      qualityScore: 0.93,
      evidenceType: "math-exercise-set",
      lastVerifiedAt: V,
      description: "Vectors, transformations, determinants, and eigenvectors, built up visually."
    }),
    resource({
      id: "deep-learning-book",
      title: "Deep Learning",
      provider: "Goodfellow, Bengio & Courville",
      url: "https://www.deeplearningbook.org/",
      resourceType: "doc",
      skillTags: ["ml-math", "ml-deep-learning"],
      difficulty: "advanced",
      durationMinutes: 1800,
      qualityScore: 0.94,
      evidenceType: "math-exercise-set",
      lastVerifiedAt: V,
      description: "The reference text, opening with the linear algebra and probability the field assumes."
    }),
    resource({
      id: "google-ml-crash-course",
      title: "Machine Learning Crash Course",
      provider: "Google for Developers",
      url: "https://developers.google.com/machine-learning/crash-course",
      resourceType: "course",
      skillTags: ["ml-supervised", "ml-math"],
      difficulty: "beginner",
      durationMinutes: 900,
      qualityScore: 0.9,
      evidenceType: "trained-model",
      lastVerifiedAt: V,
      description: "Loss, gradient descent, generalisation, and regularisation with runnable exercises."
    }),
    resource({
      id: "kaggle-intro-machine-learning",
      title: "Intro to Machine Learning",
      provider: "Kaggle Learn",
      url: "https://www.kaggle.com/learn/intro-to-machine-learning",
      resourceType: "course",
      skillTags: ["ml-supervised"],
      difficulty: "beginner",
      durationMinutes: 210,
      qualityScore: 0.84,
      prerequisites: ["ml-python"],
      evidenceType: "trained-model",
      lastVerifiedAt: V,
      description: "Fit a first model, validate it, and understand underfitting versus overfitting."
    }),
    resource({
      id: "sklearn-getting-started",
      title: "scikit-learn Getting Started",
      provider: "scikit-learn",
      url: "https://scikit-learn.org/stable/getting_started.html",
      resourceType: "doc",
      skillTags: ["ml-supervised", "ml-data-prep"],
      difficulty: "beginner",
      durationMinutes: 90,
      qualityScore: 0.86,
      prerequisites: ["ml-python"],
      evidenceType: "trained-model",
      lastVerifiedAt: V,
      description: "Estimators, transformers, pipelines, and evaluation in the standard ML library."
    }),
    resource({
      id: "sklearn-user-guide",
      title: "scikit-learn User Guide",
      provider: "scikit-learn",
      url: "https://scikit-learn.org/stable/user_guide.html",
      resourceType: "doc",
      skillTags: ["ml-model-evaluation", "ml-supervised"],
      difficulty: "advanced",
      durationMinutes: 720,
      qualityScore: 0.9,
      prerequisites: ["ml-python"],
      evidenceType: "model-evaluation-report",
      lastVerifiedAt: V,
      description: "Every algorithm plus the model-selection and metrics chapters that matter most."
    }),
    resource({
      id: "kaggle-intermediate-machine-learning",
      title: "Intermediate Machine Learning",
      provider: "Kaggle Learn",
      url: "https://www.kaggle.com/learn/intermediate-machine-learning",
      resourceType: "course",
      skillTags: ["ml-data-prep", "ml-model-evaluation"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.85,
      prerequisites: ["ml-python"],
      evidenceType: "model-evaluation-report",
      lastVerifiedAt: V,
      description: "Missing values, categorical encoding, pipelines, cross-validation, and leakage."
    }),
    resource({
      id: "pytorch-basics-tutorial",
      title: "PyTorch: Learn the Basics",
      provider: "PyTorch",
      url: "https://pytorch.org/tutorials/beginner/basics/intro.html",
      resourceType: "lab",
      skillTags: ["ml-deep-learning"],
      difficulty: "intermediate",
      durationMinutes: 360,
      qualityScore: 0.89,
      prerequisites: ["ml-supervised"],
      evidenceType: "trained-model",
      lastVerifiedAt: V,
      description: "Tensors, datasets, autograd, and writing an end-to-end training and eval loop."
    }),
    resource({
      id: "huggingface-nlp-course",
      title: "Hugging Face NLP Course",
      provider: "Hugging Face",
      url: "https://huggingface.co/learn/nlp-course/chapter1/1",
      resourceType: "course",
      skillTags: ["ml-nlp"],
      difficulty: "intermediate",
      durationMinutes: 720,
      qualityScore: 0.91,
      prerequisites: ["ml-deep-learning"],
      evidenceType: "finetuned-model",
      lastVerifiedAt: V,
      description: "Transformers, tokenisers, datasets, and fine-tuning a pretrained model yourself."
    }),
    resource({
      id: "huggingface-llm-course",
      title: "Hugging Face LLM Course",
      provider: "Hugging Face",
      url: "https://huggingface.co/learn/llm-course/chapter1/1",
      resourceType: "course",
      skillTags: ["ml-llm-applications", "ml-nlp"],
      difficulty: "intermediate",
      durationMinutes: 720,
      qualityScore: 0.9,
      prerequisites: ["ml-python"],
      evidenceType: "llm-application",
      lastVerifiedAt: V,
      description: "Working with large language models: generation, fine-tuning, and evaluation."
    }),
    resource({
      id: "langchain-introduction",
      title: "LangChain Introduction",
      provider: "LangChain",
      url: "https://python.langchain.com/docs/introduction/",
      resourceType: "doc",
      skillTags: ["ml-llm-applications"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.82,
      prerequisites: ["ml-python"],
      evidenceType: "llm-application",
      lastVerifiedAt: V,
      description: "Composing prompts, retrieval, and tool calls into an application pipeline."
    }),
    resource({
      id: "huggingface-agents-course",
      title: "Hugging Face Agents Course",
      provider: "Hugging Face",
      url: "https://huggingface.co/learn/agents-course/unit0/introduction",
      resourceType: "course",
      skillTags: ["ml-llm-applications"],
      difficulty: "advanced",
      durationMinutes: 600,
      qualityScore: 0.87,
      prerequisites: ["ml-python"],
      evidenceType: "llm-application",
      lastVerifiedAt: V,
      description: "Building agents that use tools, plan, and are evaluated on real tasks."
    }),
    resource({
      id: "google-genai-responsible",
      title: "Responsible AI",
      provider: "Google for Developers",
      url: "https://developers.google.com/machine-learning/crash-course/fairness/types-of-bias",
      resourceType: "doc",
      skillTags: ["ml-responsible-ai"],
      difficulty: "intermediate",
      durationMinutes: 90,
      qualityScore: 0.85,
      prerequisites: ["ml-model-evaluation"],
      evidenceType: "fairness-audit",
      lastVerifiedAt: V,
      description: "Where bias enters a dataset, and how each type shows up in a trained model."
    }),
    resource({
      id: "nist-ai-risk-framework",
      title: "AI Risk Management Framework",
      provider: "NIST",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
      resourceType: "doc",
      skillTags: ["ml-responsible-ai"],
      difficulty: "advanced",
      durationMinutes: 180,
      qualityScore: 0.87,
      prerequisites: ["ml-model-evaluation"],
      evidenceType: "fairness-audit",
      lastVerifiedAt: V,
      description: "A governance framework for mapping, measuring, and managing AI risk."
    }),
    resource({
      id: "fastapi-tutorial",
      title: "FastAPI Tutorial",
      provider: "FastAPI",
      url: "https://fastapi.tiangolo.com/tutorial/",
      resourceType: "doc",
      skillTags: ["ml-deployment"],
      difficulty: "intermediate",
      durationMinutes: 300,
      qualityScore: 0.88,
      prerequisites: ["ml-model-evaluation"],
      evidenceType: "model-service",
      lastVerifiedAt: V,
      description: "Serve a Python model behind a typed, validated HTTP API with generated docs."
    }),
    resource({
      id: "mlflow-getting-started",
      title: "MLflow Getting Started",
      provider: "MLflow",
      url: "https://mlflow.org/docs/latest/ml/getting-started/",
      resourceType: "doc",
      skillTags: ["ml-deployment"],
      difficulty: "advanced",
      durationMinutes: 240,
      qualityScore: 0.84,
      prerequisites: ["ml-model-evaluation"],
      evidenceType: "model-service",
      lastVerifiedAt: V,
      description: "Track experiments, register model versions, and reproduce a run months later."
    })
  ]
});
