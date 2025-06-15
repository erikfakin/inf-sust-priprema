# Inf Sustavi SLAYER

A Doom-inspired quiz application to help students prepare for Information Systems exams. RIP AND TEAR through your information systems knowledge!

![Inf Sustavi SLAYER](public/skull.svg)

## Features

- Interactive quiz with customizable settings
- Doom-inspired UI/UX with dark theme and retro styling
- Sound effects and background music for an immersive experience
- Achievement system to track your progress
- Customizable question count and time limits
- Responsive design for different screen sizes

## Technologies Used

- JavaScript (Vanilla)
- HTML5
- CSS3
- Vite (for build tooling)
- Font Awesome (for icons)

## How to Run the Project Locally

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- npm (usually comes with Node.js)

### Installation Steps

1. Clone the repository or download the project files
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory
   ```
   cd app
   ```

3. Install the dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Build for Production

To create a production-ready build, run:
```
npm run build
```

The output will be generated in the `dist` folder, which can be deployed to any static site hosting service.

## Preview Production Build

To preview the production build locally, run:
```
npm run preview
```

## Project Structure

- `index.html` - The main HTML file
- `src/` - Source code directory
  - `main.js` - Main JavaScript file containing the application logic
  - `style_doom.css` - The Doom-inspired CSS styles
- `public/` - Static assets directory
  - `questions.json` - The quiz questions database
  - `audio/` - Sound effects and music files
  - `fonts/` - Custom fonts used in the application

## License

[MIT License](LICENSE)

## Credits

- Font Awesome for icons
- Arvo and Eternal Battle fonts for typography
- Sound effects and music assets (see attribution in the code)

## Acknowledgements

Created for Information Systems course preparation. Keep slaying those demons!