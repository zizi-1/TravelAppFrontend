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
	withDockerRegistry([ credentialsId: "zohaibs-dockerhub", url: "" ]) {
	sh "docker push zzahid1234/fronttest"
	}
	}
   }  
	  stage('---SSH into VM---') {
        		steps {
        		sh "ssh -T -i /home/ubuntu/Private.pem ubuntu@ec2-35-176-13-135.eu-west-2.compute.amazonaws.com ./frontendStartup.sh"
        }
		}
	  
 }
}
