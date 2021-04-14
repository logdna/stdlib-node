library 'magic-butler-catalogue'

def PROJECT_NAME = 'stdlib'
def CURRENT_BRANCH = [env.CHANGE_BRANCH, env.BRANCH_NAME]?.find{branch -> branch != null}
def DEFAULT_BRANCH = 'master'

def DRY_RUN = CURRENT_BRANCH != DEFAULT_BRANCH
def CHANGE_ID = env.CHANGE_ID == null ? '' : env.CHANGE_ID

pipeline {
  agent none

  options {
    timestamps()
    ansiColor 'xterm'
  }

  environment {
    GITHUB_TOKEN = credentials('github-api-token')
    NPM_TOKEN = credentials('github-api-token')
    NPM_CONFIG_CACHE = '.npm'
    NPM_CONFIG_USERCONFIG = '.npmrc'
    SPAWN_WRAP_SHIM_ROOT = '.npm'
  }

  stages {
    stage('Test Suite') {
      matrix {
        axes {
          axis {
            name 'NODE_VERSION'
            values '10', '12', '14'
          }
        }

        when {
          not {
            changelog '\\[skip ci\\]'
          }
        }


        agent {
          docker {
            image "us.gcr.io/logdna-k8s/node:${NODE_VERSION}-ci"
          }
        }

        stages {
          stage('Install') {
            steps {
              sh "mkdir -p ${NPM_CONFIG_CACHE} coverage"
              script {
                npm.auth token: "${GITHUB_TOKEN}"
              }
              sh 'npm install'
            }
          }

          stage('Test') {
            steps {
              sh 'npm test'
            }

            post {
              always {
                junit 'coverage/*.xml'
                publishHTML target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: true,
                  reportDir: 'coverage/lcov-report',
                  reportFiles: 'index.html',
                  reportName: "coverage-node-v${NODE_VERSION}"
                ]
              }
            }
          }
        }
      }
    }

    stage ('Release') {
      agent {
        docker {
          image "us.gcr.io/logdna-k8s/node:12-ci"
          customWorkspace "${PROJECT_NAME}-${BUILD_NUMBER}"
        }
      }

      when {
        not {
          changelog '\\[skip ci\\]'
        }
      }

      environment {
        GIT_BRANCH = "${DRY_RUN ? CURRENT_BRANCH : env.GIT_BRANCH}"
        BRANCH_NAME = "${DRY_RUN ? CURRENT_BRANCH : env.BRANCH_NAME}"
        CHANGE_ID = "${DRY_RUN ? '' : CHANGE_ID}"
      }

      steps {
        sh "mkdir -p ${NPM_CONFIG_CACHE}"
        script {
          npm.auth token: "${NPM_TOKEN}"
          sh 'npm install'
          if (DRY_RUN) {
            sh "echo release dry run ${BRANCH_NAME}"
            sh "npm run release:dry"
          } else {
            sh "npm run release"
          }
        }
      }
    }
  }
}
