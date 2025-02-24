# Coralsoft Test Task1

## Setup

```bash
npm install
npm run dev
```

## Tech Stack

- React
- Redux Toolkit
- RTK Query
- React Router
- Recharts
- Preline UI
- Tailwind CSS
- TypeScript
- Vite

## Features

- Sign In (without a backend)
- Home Page (Dashboard)

## Prerequisites

- You may install any validation-related packages.
- You must use Redux Toolkit, RTK Query, TypeScript, React Router, Recharts, Preline UI, Tailwind CSS, and Vite.
- You are free to modify or add files to the project (decoupling files where necessary is encouraged).

## Requirements

- Refactor the app code using best practices in React, TypeScript, Redux Toolkit, and RTK Query.
- **Sign-In Page**
  - Implement email and password validation:
    - The email must be in a valid format.
    - In the fake backend, the email must be `test@test.test` and the password must be `password`. Otherwise, return a "User not found" error.
  - Display error messages for invalid inputs.
  - Implement a loading state.
- **Dashboard Page**
  - Integrate TheCatAPI's `/breeds` endpoint in `catsService`.
    - Follow this [link](https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=aZyiLrsCh#tag/Breeds/paths/~1breeds/get)
    - In the left sidebar, click on `OpenAPI Spec Doc` and then click on `Breeds`.
    - Use `/breeds` endpoint to get the data.
  - Implement charts for data visualization (fixing the existing ones if necessary).
  - Display a grid of cat information, including:
    - Name
    - Origin
    - Description
    - Adaptability
    - Affection Level
    - Life Span
  - Implement sorting and filtering using Preline UI (sorting and filtering parameters are up to you).
- **Hosting**
  - Host the app on Vercel or any other free hosting service.

## Additional Requirements (Optional but Recommended)

- Implement a dark theme.

## Evaluation Criteria

### Requirements Implementation

- All core features are implemented correctly.
- API integration works as expected.
- Validation logic functions properly.

### Code Architecture & Organization

- Clear separation of concerns.
- Modular component structure.
- Proper state management with Redux.
- Efficient API handling with RTK Query.
- Well-organized file and folder structure.

### TypeScript Usage

- Proper type definitions.
- Type safety across components.
- Minimal use of the `any` type.
- Consistent typing patterns.

### React Best Practices

- Functional components with hooks.
- Proper component composition.
- Efficient re-rendering strategies.
- Avoiding excessive prop drilling.

### Performance Optimization

- Minimal unnecessary re-renders.
- Proper use of memoization.
- Efficient data fetching.

### Code Quality

- Clean and readable code.
- Consistent naming conventions.
- Proper error handling.
- Comments where necessary.
- Adherence to DRY (Don't Repeat Yourself) principles.

### Testing & Maintainability

- Unit test coverage.
- Easy to extend and modify.
- Well-documented code.
- Proper error boundaries.
