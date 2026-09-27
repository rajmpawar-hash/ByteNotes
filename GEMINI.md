# 📚 ByteNotes Authoring Guidelines

When writing, refactoring, or updating notes in this repository (e.g., JavaScript, React, Node), ALWAYS adhere to the following **"World Class" standards**. Your role as the AI is to maintain this exact stylistic and architectural consistency across the entire codebase.

## 🏗️ 1. File Structure & Formatting Template
Every markdown note MUST follow this exact top-to-bottom structural template:

1. **Title**: An H1 tag starting with a relevant emoji (e.g., `# 🧠 Closures & Lexical Scope`).
2. **The 30-Second Interview Pitch**: Immediately below the title, add a `> [!TIP]` alert exactly titled **"The 30-Second Interview Pitch"**. This must contain a concise, highly articulate 2-3 sentence summary giving the exact phrasing to use in an interview.
3. **Visual Architecture (Mermaid)**: Whenever applicable, below the pitch, include a `mermaid` flowchart (`flowchart TD` or `LR`) visualizing the concept (e.g., event loop phases, prototype chain). 
   - *Rule (v11+):* NEVER use double quotes inside nodes (`{"Text"}`) or edge labels. Use standard rectangles `["Text"]` and unquoted edge labels `-->|Text|`.
4. **Numbered Sections with Emojis**: Major headings must be H2 (`##`), numbered, and start with an emoji (e.g., `## 📦 1. Encapsulation`).
5. **Interview Questions Module**: The very last section of EVERY file must be `## 🎯 Common Interview Questions` containing 2-3 frequently asked Q&As.

## 🧠 2. Content & Narrative Flow
- **Deep Research & Accuracy**: Do not output generic content. Anticipate the "Why" and "Under the Hood" execution steps.
- **Narrative-Driven**: Keep topics logically ordered. Avoid dry bullet-point walls of text. Explain complex concepts so a beginner can understand them but maintain technical depth (memory management, Big O).
- **Course-Inspired Depth**: Draw inspiration from high-quality courses (like Namaste React/JS) using models like "Execution Context", "Component Memory", and "Side Effects". Do not copy exact transcripts; emulate the teaching style.

## 💻 3. Code Snippets & Gotchas
- **Mandatory Examples**: Every concept must have an immediate, concise, real-world code snippet. No walls of text without code.
- **Precision**: Ensure dummy data, math, and string lengths strictly match the output comments.
- **Right vs Wrong**: Proactively show common developer pitfalls. Use comments like `// ❌ ERROR:` and `// ✅ CORRECT:` to contrast paradigms.
- **GitHub Alerts for Gotchas**: Use `> [!WARNING]` or `> [!IMPORTANT]` to highlight crucial edge cases (e.g., infinite loops in `useEffect`, `this` binding loss).
- **Machine Coding**: When relevant, dedicate standalone files or sections to practical machine coding tasks with production-grade, optimized code snippets (e.g., Debounce, Polyfills) heavily commented with the "Why" behind architecture choices.

## 🏛️ 4. Architecture & Maintenance
- **DRY Architecture (No Duplicates)**: Maintain a SINGLE source of truth for concepts. For overlapping topics (e.g., `Event Bubbling` vs `Event Delegation`), explain it thoroughly in one dedicated file. In other files, completely remove duplicated content and replace it with a brief summary and a hyperlink (`[Link](/path)`) to the main file.
- **Revision Cheat Sheet**: The repository contains a `00-revision-cheat-sheet.md` in core directories. Whenever you add a new concept, refactor a section, or move a file, you MUST update the corresponding cheat sheet.
  - The cheat sheet must summarize the topic briefly and contain a `> **Micro-Concepts & Edge Cases:**` markdown table for quick review.
  - Ensure the cheat sheet includes a `> *Related Notes: [link]*` at the bottom of its sections pointing to the exact, up-to-date deep-dive file paths.

*Note for the AI: You must automatically read and apply this exact context, template, and architectural flow to ANY request involving creating or modifying notes in this workspace.*
