# Athlete-Reserve-App

# To log into the AWS Dashboard
    - Access the Google Drive (./Spring24/AWS Access Keys) and open `aws_credentials.txt`
    - Follow the written instructions to log into AWS.

## Connecting to the AWS Servers
## How to Connect
    - In order to connect to either instance, first download the two keys from the Google Drive (./Spring24/AWS Access Keys).
    Navigate to your directory which contains those keys. 


    - To connect to the Web Application:
    - Run `ssh -i "AR_Web_PEM.pem" admin@ec2-52-13-218-196.us-west-2.compute.amazonaws.com`

    - To connect to the Server:
    - Run `ssh -i "AR_Server_PEM_New.pem" admin@ec2-34-208-199-170.us-west-2.compute.amazonaws.com`

    - To connect to the Grafana instance:
    - Run `ssh -i "AR_Server_PEM_New.pem" ec2-user@ec2-52-33-205-249.us-west-2.compute.amazonaws.com`
### 

  ## How to Connect to Ec2 Grafana
     Same PEM used for Ec2 AR Server.     Pem file: AR_Server_PEM_New.pem
     Exampple: ssh -i "AR_Server_PEM_New.pem" admin@ec2-34-210-174-207.us-west-2.compute.amazonaws.com

       grafana Login: http://34.210.174.20:3000
                  username: admin
                  password: ar#?tsF8>6h>!#ygV
     # End connecting to Grafana Ec2 AND Grafana login
