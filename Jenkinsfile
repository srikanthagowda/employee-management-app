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

        stage('Docker Hub Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'

                    bat 'docker tag employee-management-backend:jenkins %DOCKER_USERNAME%/employee-management-backend:jenkins'
                    bat 'docker tag employee-management-frontend:jenkins %DOCKER_USERNAME%/employee-management-frontend:jenkins'

                    bat 'docker push %DOCKER_USERNAME%/employee-management-backend:jenkins'
                    bat 'docker push %DOCKER_USERNAME%/employee-management-frontend:jenkins'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Build and Docker Hub push completed successfully'
            }
        }
    }
}
