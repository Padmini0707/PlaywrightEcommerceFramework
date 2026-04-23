pipeline {
    agent any
    tools { nodejs "NodeLatest" }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Padmini0707/PlaywrightEcommerceFramework.git'
            }
        }
        stage('Install') {
            steps {
                // Use 'bat' for Windows batch commands
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                // Run Playwright tests with HTML reporter
                bat 'npx playwright test --reporter=html'
            }
        }
        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }
}
