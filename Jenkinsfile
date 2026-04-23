pipeline {
    agent any
    tools { nodejs "NodeJS18" }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Padmini0707/PlaywrightEcommerceFramework.git'
            }
        }
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npx playwright test --reporter=html'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }
    }
}
