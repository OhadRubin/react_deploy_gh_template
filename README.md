# React GitHub Pages Template

A simple template for quickly creating and deploying React applications to GitHub Pages with Tailwind CSS.

## Features

- ⚛️ React with TypeScript
- 🎨 Tailwind CSS for styling
- 📱 Responsive design
- 🚀 GitHub Pages deployment
- 🤖 Automated setup script

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (with npm)
- [GitHub CLI](https://cli.github.com/) (`gh`)
- GitHub CLI logged in (`gh auth login`)

## Quick Start

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the automated setup and deploy script:
   ```
   npm run setup-and-deploy
   ```
   Follow the prompts to create a GitHub repository and deploy your app.

4. Your app will be available at `https://your-username.github.io/your-repo-name`

## Development

- Start the development server:
  ```
  npm start
  ```
- Build for production:
  ```
  npm run build
  ```
- Deploy changes to GitHub Pages:
  ```
  npm run deploy
  ```

## Customization

- Modify the components in the `src` directory
- Customize Tailwind CSS in `tailwind.config.js`
- Update the page title and metadata in `public/index.html`

## License

MIT