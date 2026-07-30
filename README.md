<div align="center">
  <img src="https://vitejs.dev/logo.svg" width="120" alt="ByteNotes Logo" />
  <h1>ByteNotes</h1>
  <p><strong>A premium, lightning-fast open-source platform for software engineering interview notes.</strong></p>
</div>

<br />

## 📖 Overview

ByteNotes is a modern, responsive Progressive Web App (PWA) built specifically for reading and sharing high-quality interview notes. 

Rather than sifting through endless unformatted repositories or boring documentation, ByteNotes offers a stunning, zero-friction reading experience with dark/light modes, seamless typography, and a collapsible sidebar.

**Currently Featuring:**
- ⚙️ **Core Mechanics** (Execution Context, Call Stack, Scope, Error Handling)
- 🧩 **Functional Programming** (First-Class Functions, Closures, Currying)
- 📦 **Object-Oriented Programming** (this Keyword, Prototypes, ES6 Classes)
- ⏳ **Asynchronous JavaScript** (Event Loop, Promises, async/await)
- 🌐 **Browser APIs** (DOM Delegation, Storage, Debounce/Throttle)
- 🎓 **Interview Prep** (Polyfills, Memoization, Output questions)

---

## ✨ Features

- **Dynamic Markdown Rendering**: Just drop a `.md` file in the `src/notes/` directory, and ByteNotes instantly renders it into a beautifully styled page.
- **Auto-Generated Navigation**: No need to manually update sidebars or routes! ByteNotes automatically parses your folder structure and dynamically generates nested, collapsible sidebar menus.
- **PWA Ready**: Install ByteNotes directly on your phone or desktop for an app-like experience.
- **Premium Aesthetics**: Built with Tailwind CSS, featuring smooth transitions, beautiful typography, syntax highlighting for code blocks, and a pristine dark mode.

---

## 🚀 How to Add Notes

Adding new topics is incredibly simple. You don't need to touch a single line of React code!

1. Navigate to the `src/notes/` directory.
2. To create a new category, create a folder (e.g., `react/` or `system-design/`). 
   - *Optional:* Prefix your folders/files with numbers to enforce a specific reading order (e.g., `01-basics`). The UI will automatically hide the numbers.
3. Create a Markdown file inside that folder.
4. Write your notes using standard Markdown format.
5. Push to GitHub, and you're done!

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Markdown Parsing**: `react-markdown` + `remark-gfm` + `rehype-highlight`
- **PWA Integration**: `vite-plugin-pwa`

---

## 💻 Running Locally

If you want to contribute to the UI or preview your notes locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/rajmpawar-hash/ByteNotes.git
   cd ByteNotes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to view the app!

---

<div align="center">
  <i>Built with ❤️ for developers preparing for interviews.</i>
</div>
