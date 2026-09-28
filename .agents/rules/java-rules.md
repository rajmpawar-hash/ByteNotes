# ☕ Java Transition Context (Node.js & C++ -> Java)

This directory contains notes specifically designed for a developer with 2+ years of Node.js experience and a strong background in C++ for DSA, transitioning into Java.

When generating or editing notes in this directory, in addition to the global `GEMINI.md` rules, ALWAYS adhere to these specific guidelines:

## 🚨 0. THE "NO SQUASHING" DIRECTIVE (CRITICAL)
- **Deepest Detail Possible:** You MUST NOT squash large concepts (like "Object-Oriented Programming" or "Collections") into a single file. 
- **Atomic Files:** Every single micro-topic (e.g., "Constructors", "Access Modifiers", "Inheritance", "Polymorphism") MUST get its own deeply researched, highly detailed standalone file.
- **Exhaustive Coverage:** If a topic involves edge cases (like Covariant Return Types, or Java 9 Modules), cover them deeply. Do not stay on the "surface level".

## ⭐ 1. Importance Star Ratings
Every note MUST clearly indicate the importance of the topic using the Star Rating system right below the Title:
- **★★★ Deep**: Critical for interviews and production code. Note must be extremely thorough.
- **★★ Medium**: Important to understand well and use practically.
- **★ Surface / Outdated**: Legacy, niche, or rarely used in modern applications. 

## 🌉 2. Comprehensive Java Focus (with Occasional Mappings)
- **Standalone Java Notes:** These are complete, pure Java notes. You must cover **all** Java mechanics comprehensively, especially features completely unique to Java (e.g., JVM architecture, specific garbage collection details, modules, annotations) even if they have no Node/C++ equivalent.
- **Sparingly Use Mappings:** Only include a brief mapping if it provides a massive "aha!" moment (e.g., quickly noting that `ArrayList` is `std::vector`). Otherwise, focus purely on teaching Java.

## 🎯 3. Interview Focus
- Address the mindset shift from "making it work quickly" (Node.js) to "enterprise-grade structure and scalability" (Java).
- Emphasize the "Why" (e.g., why `HashMap` uses trees for collisions now) as it's highly tested.

## 📝 4. Recommended Structure Additions
- **Optional Translation Callouts:** If highly relevant, add a short `> [!NOTE]` callout for a Node/C++ translation.
- **Right vs Wrong Paradigms:** Show common Java developer pitfalls.

## 🏗️ 5. Clean & Interlinked Architecture
- Ensure heavy **interlinking** between these atomic files. If "Polymorphism" relies on "Inheritance", link to the Inheritance note directly using Markdown relative links.
- Keep the `00-revision-cheat-sheet.md` updated exactly as per global rules.

## 🕵️ 6. Conversational & Analytical Requirements (Agent Guidelines)
Based on historical interaction, the agent MUST adhere to these behavioral rules:
1. **Always Explain "The Why":** Do not just state arbitrary Java rules (e.g., "this() must be the first line", "sealed subclasses must be final"). You MUST explain the strict compiler or JVM reasoning behind the rule (e.g., "to guarantee object safety before initialization runs").
2. **Exhaustive Edge Cases:** If you mention a concept (e.g., Logical operators `&&`), you must proactively address its counterparts (e.g., Bitwise `&` on booleans), even if rarely used. Do not leave gaps in logic.
3. **Strict Cheat Sheet Syncing:** The `00-revision-cheat-sheet.md` must be updated flawlessly to mirror the *exact nuances* and terminology of the main notes. If you add a "Gotcha" to the note, add it to the cheat sheet's table.
4. **Under-the-Hood JVM Mechanics:** Always translate "syntax sugar" (like Enums, Records, or Autoboxing) into what the JVM is physically doing in memory or during class-loading. The user values knowing the exact mechanical implementation.
