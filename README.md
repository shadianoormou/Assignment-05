# DevStack — Development Stack Builder

DevStack is a focused technology library that helps developers compare modern tools and save a practical stack for their next project. The interface follows the supplied assignment reference with a clean, navy-and-gradient visual system and meaningful product copy throughout.

## Live links

- Repository: https://github.com/shadianoormou/Assignment-05
- Live site: https://b14-a05-devstack-puce.vercel.app

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

JSX is a JavaScript syntax. We can describe UI with HTML-like elements by using it. It keeps the component structure close to the UI it creates which makes React code easier to read.

### What is the difference between props and state?

Props are read-only values passed into a component by its parent. On the other hand State is data owned by the component that can change and cause the UI to update.

### What does the `useState` hook do, and where did you use it in this project?

The useState hook is used to store data that can change over time. In my DevStack project, I used it for the technology list, loading state, mobile menu, search and filter values, and the selected stack.

### What does the `useEffect` hook do, and why did you need it to load the JSON data?

The useEffect hook lets React run side effects after a component renders. I used it to fetch technologies.json once when the app loads. When the data arrives, it updates the state, so the technology cards appear in the UI.

### Why does every item in a `.map()` list need a unique `key` prop?

Each item in a .map() list needs a unique key so React can identify it between renders. This helps React update only the items that changed instead of rebuilding the whole list.

### What is conditional rendering? Show one place you used it.

Conditional rendering means displaying different UI depending on a condition. In my project, the stack panel shows an empty message when `stack.length === 0`; otherwise, it displays the selected technology items.

### How do you pass data from a parent component to a child component, and how does a child send something back to the parent?

A parent component passes data to a child through props. In my project, Technologies passes technology and selected to TechCard. The parent also passes the onAdd callback, which the child calls with onAdd(technology) when the user clicks the add button.

## Meaningful commit history

This project is developed through focused commits so each change is easy to review: scaffold, data, layout, interactions, responsive styling, documentation, and verification are kept as separate milestones.
