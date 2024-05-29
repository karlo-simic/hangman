# Hangman

## Getting started

This project is bootstrapped with create-next-app.

### Install dependencies

```
npm i
```

### Start dev server

```
npm run dev
```

### Run tests

```
npm run test
```

## Tech stack

- Next.js 14
- Redux Toolkit 2.0 & RTK Query
- Axios
- Tailwind
- shadcn/ui
- React Hoot Form
- Vitest
- React Testing Library

## Architecture

This project uses [feature-sliced design](https://feature-sliced.design/) for its architecture with some minor differences. This project doesn't have **pages layer** like the traditional FSD projects because we want to keep using Next.js app router.

### 1. **Layers**:

- **App Layer**:

  - **Entry Points**: This includes the main application entry point and other essential configurations.
  - **Providers**: These are global providers such as Redux Provider, Theme Provider, etc.
  - **Pages**: Since this project uses Next.js 14 app router this layer also contains all the pages in the app.

- **Features Layer**:
  - Contains the core features of your application. Each feature is a self-contained module that can include its own UI components, business logic, and data fetching logic.
- **Entities Layer**:

  - This layer includes the business entities or domain models of your application. Entities represent the main business objects and can have their own state and logic.

- **Shared Layer**:
  - Contains shared utilities, UI components, and hooks that are reused across the application.

### 2. **Slices**:

- Each layer is divided into slices, representing different domains or functionalities of the application. For instance, you might have a `user` slice, `game` slice, etc..

## Data fetching

- **Axios**: Used as a main client for data fetching on the server and client.
- **RTK Query**: Used with axios to make some client-side requests. Used for its flexibility and great features, such as it's great caching system and it natively integrated into Redux Toolkit.

## State Management

- Redux Toolkit & RTK Query are used for state management and data fetching.
- State is divided into slices corresponding to different entities.

## Form Management

- React Hook Form is used for managing forms efficiently with minimal re-renders.

## Assignment specific

### Bonus 1: Smart function for calculating the score

- This can be found in `src/entities/score/lib/calcHighScore.ts` along side with the test written for it.

### Bonus 2: useCachedQuoteSometime

- Can be found in `src/entities/quote/lib/useCachedQuoteSometime.ts` with the test written for it.

### Bonus 3: MaskedQuoteText component

- Can be found in `src/entities/quote/ui/masked-quote-text/masked-quote-text.tsx` with the test written for it.
