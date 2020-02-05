pipeline {
  agent any
  stages {
   
    stage('----Build Image Frontend----'){
    steps{
      sh "docker build -t zzahid1234/fronttest ."
    }
   }
   stage('----Push to dockerhub----'){
	steps{
	withDockerRegistry([ credentialsId: "dockerhub", url: "" ]) {
	sh "docker push zzahid1234/fronttest"
	}
	}
   }
  stage('----Mvn deploy (nexus)----'){
	steps{
	sh "mvn deploy"
		  }
	  }
 }
}
