const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Main function to run the setup and deployment
async function autoSetupAndDeploy() {
    try {
        console.log('\n🚀 Automatically setting up GitHub Pages deployment...\n');

        // Check requirements
        try {
            execSync('gh --version', { stdio: 'ignore' });
            console.log('✓ GitHub CLI is installed');
        } catch (error) {
            console.error('❌ GitHub CLI is not installed. Please install it first.');
            process.exit(1);
        }

        // Check if user is logged in to GitHub
        try {
            const whoami = execSync('gh auth status', { encoding: 'utf8' });
            console.log('✓ Logged in to GitHub');

            // Extract username from auth status output
            const usernameMatch = whoami.match(/Logged in to github\.com as (\w+)/);
            const username = usernameMatch ? usernameMatch[1] : 'github-user';

            // Generate repository name with timestamp to ensure uniqueness
            const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '');
            const repoName = `react-app-${timestamp}`;

            // Update package.json with the new values
            console.log('📝 Updating package.json...');
            const packageJsonPath = path.join(process.cwd(), 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

            packageJson.homepage = `https://${username}.github.io/${repoName}`;

            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            console.log('✓ Updated package.json');

            try {
                execSync('gh auth status', { stdio: 'inherit' });
                console.log('✓ Git repository initialized');
            } catch (error) {
                console.error('\n❌ GitHub authentication failed. Please login first:');
                console.error('   Run: gh auth login');
                process.exit(1);
            }
            // Force initialize a fresh git repository
            console.log('📁 Setting up git repository...');
            try {
                // Remove any existing git directory
                if (fs.existsSync('.git')) {
                    // On Windows, need different command for removing .git directory
                    const isWindows = process.platform === 'win32';
                    if (isWindows) {
                        execSync('rmdir /s /q .git', { stdio: 'ignore' });
                    } else {
                        execSync('rm -rf .git', { stdio: 'ignore' });
                    }
                }

                // Initialize a new git repository
                execSync('git init', { stdio: 'inherit' });
                execSync('git add .', { stdio: 'inherit' });
                execSync('git commit -m "Initial commit"', { stdio: 'inherit' });
                console.log('✓ Git repository initialized');

                // Create GitHub repository and push
                console.log(`\n🔧 Creating GitHub repository: ${repoName}...`);
                execSync(`gh repo create ${repoName} --public --source=. --push`, { stdio: 'inherit' });
                console.log('✓ GitHub repository created and code pushed');
            } catch (error) {
                console.error('❌ Error setting up repository:', error.message);
                process.exit(1);
            }

            // Deploy to GitHub Pages
            console.log('\n🚀 Deploying to GitHub Pages...');
            execSync('npm run build', { stdio: 'inherit' });
            execSync('npx gh-pages -d build', { stdio: 'inherit' });
            console.log('✓ Deployed to GitHub Pages successfully');

            console.log(`\n🎉 Your app is now live at: ${packageJson.homepage}`);
            console.log('Note: It may take a few minutes for the site to be fully deployed.');

        } catch (error) {
            console.error('\n❌ TODO:');
            console.error('   Run: gh auth login');
            process.exit(1);
        }

    } catch (error) {
        console.error('❌ An error occurred:', error.message);
        process.exit(1);
    }
}

// Run the setup function
autoSetupAndDeploy();