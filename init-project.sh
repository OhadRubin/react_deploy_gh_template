#!/bin/bash

# Script to create and deploy a new React app using the template

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI is not installed. Please install it first:"
    echo "   Visit: https://cli.github.com/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if user is logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "❌ You are not logged in to GitHub. Please login first:"
    echo "   Run: gh auth login"
    exit 1
fi

# Get the absolute path of the template directory
TEMPLATE_DIR="$(pwd)"

# Ask for project name
read -p "📝 Enter project name: " project_name

if [ -z "$project_name" ]; then
    echo "❌ Project name cannot be empty"
    exit 1
fi

# Ask for project location
read -p "📁 Enter absolute path for project location (or press Enter for current directory): " project_location

if [ -z "$project_location" ]; then
    project_location="$(pwd)"
fi

# Create the full project path
PROJECT_PATH="${project_location}/${project_name}"

# Create project directory
if [ -d "$PROJECT_PATH" ]; then
    echo "❌ Directory $PROJECT_PATH already exists"
    exit 1
fi

echo "🚀 Creating new React app: $project_name at $PROJECT_PATH"

# Create project from template
mkdir -p "$PROJECT_PATH"
cp -r "$TEMPLATE_DIR/node_modules" "$TEMPLATE_DIR/public" "$TEMPLATE_DIR/src" "$TEMPLATE_DIR/scripts" "$TEMPLATE_DIR/.gitignore" "$TEMPLATE_DIR/package.json" "$TEMPLATE_DIR/package-lock.json" "$TEMPLATE_DIR/postcss.config.js" "$TEMPLATE_DIR/README.md" "$TEMPLATE_DIR/tailwind.config.js" "$TEMPLATE_DIR/tsconfig.json" "$PROJECT_PATH/"

# Navigate to the project directory
cd "$PROJECT_PATH"

# Run the setup script
echo "🔧 Setting up project..."
npm run setup-and-deploy

echo "✅ Project setup complete!"
echo "📂 Your project is now ready at: $PROJECT_PATH"
echo "🌐 Your app is now live at the URL shown above"
echo ""
echo "To continue development:"
echo "  cd $PROJECT_PATH"
echo "  npm start"