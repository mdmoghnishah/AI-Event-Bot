# 🤖 AI Event Bot – Resume Parser + Gemini Recommender

This is a smart event assistant chatbot built with React, Firebase, and Google Gemini (via the Gemini API or SDK). It allows users to upload PDF resumes and get intelligent, context-aware recommendations such as session suggestions, similar attendees, skill extraction, and more.

---

## 🚀 Features

- 📄 **Upload PDF Resumes** and extract plain text
- 🧠 **Gemini-Powered Summarization** and Recommendations
- 🔥 **Firebase Firestore Integration** for storing messages, attendees, and logs
- 💬 Real-Time Chat UI
- ⚡ Built with React + Vite for fast dev experience

---

## 🧱 Tech Stack

| Tech         | Usage                          |
|--------------|--------------------------------|
| React        | Frontend UI                    |
| Firebase     | Firestore for messages, attendees |
| Vite         | Development bundler            |
| pdfjs-dist / react-pdftotext | PDF text extraction |
| Gemini API   | AI-generated contextual replies |

---

## 📂 Project Structure

```bash
/src
├── /components
│   └── Chatbot.jsx
│       ⤷ Handles the UI and core chat logic
│
├── /services
│   └── contextGeminiService.js
│       ⤷ Contains Gemini API calls and intent-based prompt switching
│
├── /utils
│   └── resumeParser.js
│       ⤷ Manages PDF resume uploads, text extraction, and Firestore updates
│
├── firebase.js
│   ⤷ Initializes Firebase with Firestore and config variables
│
├── App.jsx
│   ⤷ Renders the main application and routes to the chatbot
│
└── main.jsx
    ⤷ App entry point for React + Vite
```

---

## 🔍 Key Files Explained

- **Chatbot.jsx**  
  Renders the chat UI and handles user input, bot replies, and message flows.

- **contextGeminiService.js**  
  Switch-based logic that sends different prompt types (summarization, recommendations, skill extraction) to the Gemini API based on intent.

- **resumeParser.js**  
  Parses uploaded PDF files into plain text and stores data in Firestore (`attendees` + `messages` collections).

- **firebase.js**  
  Connects to Firebase using environment variables and initializes the Firestore instance.

- **App.jsx / main.jsx**  
  Basic React boilerplate setup using Vite for fast development.

  ## Installation Steps

These steps outline how to set up and run the `ai-event-bot` project.

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd AI-event-bot
    ```

    * Replace `<repository_url>` with the actual URL of the Git repository.

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

    * This command uses `npm` (Node Package Manager) to install all the dependencies listed in the `package.json` file.  This includes:
        * `@google/genai`
        * `@google/generative-ai`
        * `firebase`
        * `pdfjs-dist`
        * `react`
        * `react-dom`
        * `react-pdftotext`
        * `@vitejs/plugin-react`
        * `vite`
        * `eslint` and related packages.

3.  **Configure Firebase:**

    * You'll need to set up a Firebase project and obtain your project's configuration.
    * Create a `firebase.js` file (if it doesn't exist) in the `src` directory.
    * Add your Firebase configuration to `firebase.js`.  It should look similar to this:

        ```javascript
        import { initializeApp } from 'firebase/app';
        import { getFirestore } from 'firebase/firestore';

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID",
          measurementId: "YOUR_MEASUREMENT_ID"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        export { app, db };
        ```

    * **Important:** Replace the placeholder values (`YOUR_...`) with your actual Firebase project credentials.  For security, consider using environment variables to store these sensitive values.

4.  **Set up Google Gemini API Key (if applicable):**

    * If you intend to use the Gemini API, you'll need to obtain an API key from Google Cloud.
    * Store this API key securely, ideally as an environment variable.  The way you set environment variables depends on your operating system (e.g., `.env` file, `export` command in a terminal).
    * Ensure your `contextGeminiService.js` file (or wherever you initialize the Gemini model) is configured to use this API key.

5.  **Run the Application:**

    ```bash
    npm run dev
    ```

    * This command starts the development server using Vite.
    * Open your browser and navigate to the address shown in the terminal (usually `http://localhost:5173`).

## Available Scripts (from package.json)

* `npm run dev`:  Starts the development server.
* `npm run build`:  Builds the application for production.
* `npm run lint`:  Runs the ESLint linter to check for code style issues.
* `npm run preview`:  Starts a local server to preview the built application.

## 🤝 Contributing

Contributions to this project are highly appreciated! To contribute, please follow these steps:

1.  **Fork the Repository:** Navigate to the project page on GitHub and click the "Fork" button in the top right corner. This will create a copy of the repository under your GitHub account.

2.  **Create a New Branch:** Before making any changes, create a new branch from the `main` branch (or the default development branch) to isolate your work. Use the following Git command in your local forked repository:

    ```bash
    git checkout -b feature-name
    ```

    Replace `feature-name` with a descriptive name for the feature, bug fix, or improvement you are working on (e.g., `fix-typo-in-readme`, `add-user-authentication`).

3.  **Commit Your Changes:** Once you have made your changes, stage them using `git add .` or `git add <specific_file>` and then commit them with a clear and concise commit message. Follow these guidelines for your commit messages:

    ```bash
    git commit -m "Add feature-name: Implement user authentication module"
    ```

    * Start with a short summary (max 50 characters).
    * Optionally, add a more detailed explanation after a blank line.
    * Use imperative, present tense ("Add feature" not "Added feature").
    * Reference any relevant issues (e.g., `Fixes #123`).

4.  **Push to the Branch:** After committing your changes, push your new branch to your forked repository on GitHub:

    ```bash
    git push origin feature-name
    ```

    Replace `feature-name` with the name of the branch you created.

5.  **Open a Pull Request:** Finally, go to your forked repository on GitHub. You should see a prompt to "Compare & pull request." Click this button.

    * Provide a clear title for your pull request.
    * In the description, explain the changes you've made and the purpose of your pull request.
    * Reference any related issues.
    * Ensure that all checks pass.

We will review your pull request and provide feedback. Once approved, your changes will be merged into the main repository. Thank you for your contribution!
---

