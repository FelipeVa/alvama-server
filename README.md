# Alvama Server
This is the small express API for Alvama project. Alvama project is what me and my teammate named our thesis to get our degree as Industrial Engineers.

## Tech Stack
- Express
- Prisma

I tried to really organized the project structure so it's easy to understand and easy to maintain. I also tried to use the best practices for the project structure.

## Folder Structure
```
├───prisma (Prisma ORM)
├───src
│   ├───classes 
│   ├───http
│   │   ├───controllers (all controllers)
│   │   ├───middlewares (all middlewares)
│   │   └───requests (all request validation)
│   ├───services (Business Logic)
│   ├───types (TypeScript Types)
│   ├───utils (Helper Functions)
│   └───index.ts (Express App)
├───.env.example
├───.gitignore
├───.prettierrc.json
├───.eslintrc.json
├───tsconfig.json
├───package.json
└───README.md

```

## What is Alvama?
Alvama is a lineal mathematical programming model to solve the fleet sizing problem in the public transport sector, built on Python using the PuLP library.

But, **Alvama** divides in three projects:

- Alvama Model
- Alvama GUI
- **Alvama Server (Current)**

The principal idea of this project is to provide a beautiful UI and an API for those people who want to use the model in their own projects. 

The UI is an Electron + React + Vite project (is private for now, but I will publish it soon). The API is this project, a small express API that provides the model and the data to the UI.

## API Documentation
This API is documented using Postman. You can find the documentation [here](https://documenter.getpostman.com/view/11028303/VUxNQTC8#0e3d080a-26c6-4848-be91-d77f59aafd6d).


