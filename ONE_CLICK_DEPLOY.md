# One-Click Deployment

This template includes a fully automated deployment script that will:

1. Check if GitHub CLI is installed and authenticated
2. Create a uniquely named GitHub repository 
3. Deploy the React app to GitHub Pages
4. Provide a live URL to your app

## Requirements

- npm installed
- gh CLI installed (`brew install gh` or visit https://cli.github.com/)
- gh CLI authenticated (`gh auth login`)

## How to Use

Simply run:

```
npm run auto-deploy
```

That's it! No prompts, no questions. The script will:

- Generate a unique repository name based on the current timestamp
- Create the repository under your GitHub account
- Deploy the current state of the template to GitHub Pages
- Display the live URL when finished

## What Next?

After deployment:

1. Your app is live at the URL provided
2. You can continue developing by modifying the source code
3. To deploy updates, just run `npm run deploy`

## Customizing Your App

Once deployed, you can:

- Modify components in the `src` directory
- Customize styling with Tailwind CSS
- Add new functionality as needed
- Run `npm run deploy` to publish changes

## Troubleshooting

If the auto-deploy fails:

- Make sure GitHub CLI is installed: `gh --version`
- Make sure you're logged in to GitHub: `gh auth status`
- Check error messages in the console output