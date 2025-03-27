const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for user input
const prompt = (question) => new Promise((resolve) => {
  rl.question(question, (answer) => {
    resolve(answer.trim());
  });
});

// Main function to run the setup and deployment
async function setupAndDeploy() {
  try {
    console.log('\n🚀 Setting up GitHub Pages deployment...\n');
    
    // Check if gh CLI is installed
    try {
      execSync('gh --version', { stdio: 'ignore' });
      console.log('✓ GitHub CLI is installed');
    } catch (error) {
      console.error('❌ GitHub CLI is not installed. Please install it first:');
      console.error('   Visit: https://cli.github.com/');
      process.exit(1);
    }

    // Check if user is logged in to GitHub
    try {
      const whoami = execSync('gh auth status', { encoding: 'utf8' });
      console.log('✓ Logged in to GitHub');
      
      // Extract username from auth status output
      const usernameMatch = whoami.match(/Logged in to github\.com as (\w+)/);
      const username = usernameMatch ? usernameMatch[1] : await prompt('Enter your GitHub username: ');
      
      // Get repository name
      const repoName = await prompt('Enter name for the new repository: ');
      if (!repoName) {
        console.error('❌ Repository name cannot be empty');
        process.exit(1);
      }

      // Update package.json with the new values
      console.log('📝 Updating package.json...');
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      packageJson.homepage = `https://${username}.github.io/${repoName}`;
      packageJson.scripts['create-gh-repo'] = `gh repo create ${repoName} --public --source=. --push`;
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✓ Updated package.json');
      
      // Create GitHub repository
      console.log(`\n🔧 Creating GitHub repository: ${repoName}...`);
      try {
        execSync('npm run create-gh-repo', { stdio: 'inherit' });
        console.log('✓ GitHub repository created successfully');
      } catch (error) {
        // If repo already exists, continue
        if (error.message.includes('already exists')) {
          console.log('⚠️ Repository already exists, continuing...');
        } else {
          throw error;
        }
      }
      
      // Deploy to GitHub Pages
      console.log('\n🚀 Deploying to GitHub Pages...');
      execSync('npm run deploy', { stdio: 'inherit' });
      console.log('✓ Deployed to GitHub Pages successfully');
      
      console.log(`\n🎉 Your app is now live at: ${packageJson.homepage}`);
      console.log('\nTo deploy updates in the future, simply run:');
      console.log('  npm run deploy');
      
    } catch (error) {
      console.error('\n❌ GitHub authentication failed. Please login first:');
      console.error('   Run: gh auth login');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ An error occurred:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the setup function
setupAndDeploy();