# React GitHub Pages Template Guide

This template provides a quick way to create React applications with Tailwind CSS and deploy them to GitHub Pages.

## What's Included

1. **React with TypeScript**: A type-safe approach to building React applications
2. **Tailwind CSS**: A utility-first CSS framework for rapid UI development
3. **GitHub Pages Integration**: Automatic deployment to GitHub Pages
4. **Automated Setup Script**: Easy configuration and deployment

## Directory Structure

- `public/`: Static assets and the HTML entry point
- `src/`: React components and application code
- `scripts/`: Helper scripts for deployment
- `init-project.sh`: Script to create new projects from this template

## How to Use This Template

### Option 1: Create a New Project Using the Script

The easiest way to use this template is with the provided init script:

```
./init-project.sh
```

Follow the prompts to:
- Name your project
- Specify the location
- Create a GitHub repository
- Deploy to GitHub Pages

### Option 2: Manual Setup

1. **Copy Template Files**:
   Copy all files to a new directory

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Update Package.json**:
   - Change the name
   - Update homepage to your GitHub Pages URL (username.github.io/repo-name)

4. **Create GitHub Repository**:
   ```
   gh repo create your-repo-name --public --source=. --push
   ```

5. **Deploy to GitHub Pages**:
   ```
   npm run deploy
   ```

## Customization Tips

### Adding Additional Dependencies

```
npm install package-name
```

### Adding Routes

For multi-page applications, install and configure React Router:

```
npm install react-router-dom
```

### Custom Domain

To use a custom domain with GitHub Pages:

1. Add your domain to the CNAME file in the public directory
2. Update the homepage in package.json to your custom domain
3. Configure DNS settings as specified in GitHub Pages documentation

## Troubleshooting

- **Deployment Issues**: Ensure GitHub CLI is properly authenticated
- **Build Errors**: Check console for specific errors and update dependencies if needed
- **CSS Not Working**: Verify Tailwind directives are present in your CSS file

## Maintenance

This template is designed to be a starting point. After creating your project, you can modify and customize it according to your needs. Regular updates to dependencies are recommended to maintain security and access new features.