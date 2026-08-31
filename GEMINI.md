# Notes Authoring Guidelines

When writing or updating notes in this repository (e.g., React, JavaScript, Node), ALWAYS adhere to the following "World Class" standards:

1. **Deep Research & Accuracy**: Do not output generic or basic content. Deeply research the topic to understand the "Why" and "How" under the hood before writing.
2. **Beginner-Friendly yet Advanced**: Explain complex concepts simply so a beginner can understand, but maintain the technical depth required for advanced developers (e.g., time complexities, memory management).
3. **Narrative-Driven**: Write with a clear narrative flow. Avoid dry, exhaustive bullet-point lists where a compelling step-by-step explanation is better.
4. **Logical Structure**: Keep topics logically ordered, building from foundational concepts to advanced patterns.
5. **Proactive "Gotcha" Explanations**: When answering conceptual questions or updating notes, proactively anticipate and address common developer pitfalls (e.g., infinite loops in `useEffect`, closures in loops for state, hoisting in React hooks, difference between component re-render vs DOM update). Use concrete code examples (showing both the ❌ Wrong and ✅ Correct ways) and explain the "Under the hood" execution steps to clarify *why* something works.
6. **Course-Inspired (Reference Only)**: Draw inspiration from high-quality, deep-dive courses (e.g., Akshay Saini's Namaste React for React notes). Emphasize core conceptual models like "Component Memory", "Reconciliation", and "Side Effects". **Crucially, do not copy exact content or transcripts from these courses verbatim.** Use them strictly as a reference for depth, logical flow, and teaching style.
7. **Rich Formatting**: Use GitHub-style markdown effectively:
   - Fenced code blocks with correct language specifiers (e.g., `jsx`, `javascript`).
   - GitHub alerts (`> [!NOTE]`, `> [!WARNING]`, `> [!IMPORTANT]`, etc.) to highlight crucial information, best practices, or common pitfalls.
   - Tables and Mermaid diagrams where they help visualize comparisons, relationships, or architectures.
8. **Interview-Ready Tone ("The 30-Second Pitch")**: For highly technical, architectural, or frequently tested concepts (e.g., Virtual DOM, Redux, Event Loop), always include a `> [!TIP]` alert block at the very top titled **"The 30-Second Interview Pitch"**. This must contain a concise, highly articulate 2-3 sentence summary that gives the reader the exact phrasing to use in an interview before diving into the deep explanation.
9. **Machine Coding Focus**: When relevant, dedicate sections or standalone files (e.g., `02-machine-coding.md`) to practical machine coding tasks. Provide production-grade, optimized code snippets (e.g., Debounce, Pagination) heavily commented with the "Why" behind the architecture choices.

*Note for the AI: You must automatically read and apply this context to any request involving creating or modifying notes in this workspace.*
