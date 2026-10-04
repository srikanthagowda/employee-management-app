pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvnw.cmd clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm.cmd install'
                    bat 'npm.cmd run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t employee-management-backend:jenkins ./backend'
                bat 'docker build -t employee-management-frontend:jenkins ./frontend'
            }
        }

        stage('Test') {
            steps {
                echo 'Build completed successfully'
            }
        }
    }
}
