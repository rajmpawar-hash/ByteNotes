# 🛡️ Security & Performance

> [!TIP]
> **The 30-Second Interview Pitch**
> JavaScript security primarily revolves around preventing Cross-Site Scripting (XSS) by strictly sanitizing user input and avoiding the execution of untrusted code via `eval()`. Performance optimization relies on minimizing DOM manipulation, leveraging asynchronous Non-Blocking operations to keep the main thread free, and reducing network overhead via debouncing, minification, and lazy loading.

## 1. Security Best Practices

### The Danger of `eval()`
The built-in `eval()` function takes a string and executes it as JavaScript code. 

```javascript
// Extremely Dangerous!
const userInput = "alert('Hacked!');";
eval(userInput); // The script runs!
```

> [!CAUTION]
> **Never use `eval()` on untrusted input!**
> If a malicious user inputs script tags or logic into a form, `eval()` will execute it with the full privileges of your application, leading to severe XSS attacks.

### Cross-Site Scripting (XSS) & Sanitization
XSS occurs when an attacker injects malicious scripts into your web application.

**How to prevent it:**
1. **Never trust user input:** Treat all input from forms or URL parameters as potentially dangerous.
2. **Sanitize Data:** Use libraries like `DOMPurify` to clean HTML strings before rendering them.
3. **Use Text Methods:** If you only need text, use `element.textContent` instead of `element.innerHTML` (which parses HTML tags).

```javascript
// ❌ Dangerous (Vulnerable to XSS)
element.innerHTML = userInput; 

// ✅ Safe (Removes malicious <script> tags)
element.innerHTML = DOMPurify.sanitize(userInput);

// ✅ Safe (Renders exactly as text, script tags won't execute)
element.textContent = userInput;
```

---

## 2. Input Validation

Validation ensures the data is in the correct format before sending it to the server.

1. **Client-Side (HTML5):** The first line of defense.
   ```html
   <!-- Requires at least 3 chars, only alphanumeric -->
   <input type="text" required minlength="3" pattern="[A-Za-z0-9]+">
   ```
2. **Client-Side (JavaScript/React):** For dynamic feedback.
   ```javascript
   if (username.length < 3) {
       setError("Username must be at least 3 characters");
   }
   ```
3. **Server-Side (Critical):** Client-side validation can be bypassed by an attacker using tools like Postman. **You must always validate again on the server!**

---

## 3. Performance Optimization Strategies

Interviewers often ask how to optimize a sluggish JavaScript application. Here is a checklist of the highest-impact strategies:

1. **Minimize DOM Manipulation:** Accessing and modifying the DOM is the slowest operation in JS. Batch your updates or use Document Fragments. (React solves this via the Virtual DOM).
2. **Use Async Operations:** Never block the main thread. Use `Promises` and `async/await` for heavy computations or network requests.
3. **Debounce & Throttle:** Limit the execution of expensive functions attached to high-frequency events (like scroll or resize).
4. **Lazy Loading:** Do not load data or images until they are needed (e.g., when they scroll into the viewport).
5. **Minification & Bundling:** Reduce the size of your JavaScript files by removing whitespace, comments, and shortening variable names (e.g., using Webpack or Vite) to decrease network load time.
6. **Browser Storage:** Cache frequently used, relatively static data in `localStorage` or `sessionStorage` to avoid redundant network requests.

---

## 🎯 Common Interview Questions

**Q: Why is `eval()` considered bad practice?**
- **A:** `eval()` executes strings as raw JavaScript. If the string contains user input, an attacker can inject malicious code (XSS), compromising the application. It is also slow because the JS engine cannot properly optimize code inside an `eval()` block ahead of time.

**Q: How do you prevent XSS attacks?**
- **A:** By sanitizing all user input before rendering it to the DOM. Avoid using `innerHTML` with untrusted data, opting for `textContent` instead, or use a sanitizer library like `DOMPurify`.
