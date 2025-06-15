# Inf Sustavi SLAYER Quiz

A DOOM-themed interactive quiz application for Information Systems course.

![DOOM-themed Quiz App](./public/skull.svg)

## Description

This is a browser-based quiz application styled with a DOOM game aesthetic. The application features:

- Interactive quiz with multiple question types
- DOOM-inspired UI with thematic fonts, colors, and styling
- Sound effects and background music
- Achievement system ("Glory Kills")
- High score tracking
- Mobile responsive layout

## Prerequisites

Before running this project, you need to have the following installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository or download the source code
2. Navigate to the project directory in your terminal

```bash
cd path/to/app
```

3. Install the dependencies

```bash
npm install
# or if you're using yarn
yarn
```

## Running the Project Locally

To run the development server:

```bash
npm run dev
# or if you're using yarn
yarn dev
```

This will start the Vite development server. You'll see output similar to:

```
  VITE v6.3.5  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the application running.

## Building for Production

To build the project for production:

```bash
npm run build
# or if you're using yarn
yarn build
```

This will generate optimized files in the `dist` directory.

## Previewing Production Build

To preview the production build locally:

```bash
npm run preview
# or if you're using yarn
yarn preview
```

This will serve the built files from the `dist` directory.

## Project Structure

- `index.html` - The main HTML file
- `src/main.js` - Main JavaScript file with quiz logic
- `src/style_doom.css` - DOOM-themed styling
- `public/` - Static assets:
  - `questions.json` - Quiz questions
  - `audio/` - Sound effects and music
  - `fonts/` - Custom fonts
  - `skull.svg` - App icon

## Playing the Quiz

1. Select your desired quiz settings on the welcome screen
2. Click "BEGIN SLAUGHTER" to start the quiz
3. Answer each question (some may have multiple correct answers)
4. Review your score and achievements at the end
5. Check your position on the high scores

## Features

- **DOOM-Inspired UI**: Aggressive red and black theme, custom fonts, and style elements from the DOOM universe
- **Sound Effects**: Audio feedback for correct/incorrect answers and interactions
- **Background Music**: DOOM-style background track
- **Audio Controls**: Adjust sound effects and music volume
- **Responsive Design**: Works on desktop and mobile devices
- **Achievements System**: Earn "Glory Kills" by meeting certain conditions
- **High Scores**: Track your best performances

## Credits

- Fonts:
  - "Eternal Battle" font for headings
  - "Arvo" font for text
- Icons from Font Awesome
- Sound effects and music inspired by DOOM

## License

This project is created for educational purposes. All DOOM-related styling is inspired by id Software's DOOM franchise.
