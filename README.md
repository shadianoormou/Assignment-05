# DevStack — Development Stack Builder

DevStack is a focused technology library that helps developers compare modern tools and save a practical stack for their next project. The interface follows the supplied assignment reference with a clean, navy-and-gradient visual system and meaningful product copy throughout.

## Live links

- Repository: `https://github.com/ProgrammingHero1/B14-A05-DevStack`
- Live site: _Pending Vercel authentication in the deployment environment._

## Built with

- React + Vite
- JavaScript (ES6+)
- React Toastify for interaction feedback
- Lucide React for interface icons
- CSS with responsive layout and a shared orange → pink → violet theme
- Local JSON data loaded with `fetch` and `useEffect`

## Core features

1. Browse 12 curated technologies across frontend, backend, database, language, styling, DevOps, and tools categories.
2. Search and filter the library, then add technologies to a personal stack without duplicates.
3. Manage the stack with individual removal, remove-all, loading, empty, error, and toast feedback states.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## React questions

### What is JSX, and why is it used in React?

JSX is a JavaScript syntax that lets us describe UI with HTML-like elements. It keeps the component structure close to the UI it creates, which makes React code easier to read.

### What is the difference between props and state?

Props are read-only values passed into a component by its parent. State is data owned by the component that can change and cause the UI to update.

### What does the `useState` hook do, and where did you use it in this project?

`useState` stores changing component data. DevStack uses it for the technology list, loading state, mobile menu, search/filter values, and the selected stack.

### What does the `useEffect` hook do, and why did you need it to load the JSON data?

`useEffect` runs side effects after rendering. It loads `technologies.json` once when the app starts, then updates the UI when the response arrives.

### Why does every item in a `.map()` list need a unique `key` prop?

A key gives React a stable identity for each list item. React can then update only the items that changed instead of rebuilding the entire list.

### What is conditional rendering? Show one place you used it.

Conditional rendering means showing different UI based on a condition. The stack panel shows an empty message when `stack.length === 0`; otherwise it renders the selected technology items.

### How do you pass data from a parent component to a child component, and how does a child send something back to the parent?

The parent passes data through props, such as `technology` and `selected` into `TechCard`. It can pass a callback too, so the child calls `onAdd(technology)` to send the user action back to the parent.

## Meaningful commit history

This project is developed through focused commits so each change is easy to review: scaffold, data, layout, interactions, responsive styling, documentation, and verification are kept as separate milestones.
