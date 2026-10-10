# AWS setup used on 2026-10-10 (torn down after measurement)

Region `us-east-2`, default VPC `vpc-0ed8e26a42f49cfb5`, 3 default subnets (2a/2b/2c).

## Network

```bash
# App SG: attached to the EB instance (EB also adds its own SG with port 80 open)
aws ec2 create-security-group --group-name reel-api-sg --vpc-id $VPC --description "REEL Express on Elastic Beanstalk"
# Redis SG: 6379 only from the app SG -> Redis is not reachable from the internet
aws ec2 create-security-group --group-name reel-redis-sg --vpc-id $VPC --description "REEL ElastiCache Redis, only from reel-api-sg"
aws ec2 authorize-security-group-ingress --group-id $REDIS_SG --protocol tcp --port 6379 --source-group $API_SG
```

## ElastiCache

```bash
aws elasticache create-cache-subnet-group --cache-subnet-group-name reel-redis-subnets --subnet-ids <3 default subnets> ...
aws elasticache create-cache-cluster --cache-cluster-id reel-redis --engine redis --engine-version 7.1 \
  --cache-node-type cache.t3.micro --num-cache-nodes 1 \
  --cache-subnet-group-name reel-redis-subnets --security-group-ids $REDIS_SG
```

No TLS, no persistence, single node: access is limited by VPC + SG, and the app falls back to TMDB if Redis is gone.

## Elastic Beanstalk

IAM roles (created in the console): `aws-elasticbeanstalk-ec2-role` (AWSElasticBeanstalkWebTier), `aws-elasticbeanstalk-service-role` (EnhancedHealth + ManagedUpdates).

Bundle: build locally, then zip `dist/` + `package.json` + `package-lock.json`. EB runs `npm install` and `npm start`, and sets `PORT=8080` behind nginx.

```bash
cd server && npx tsc && zip -r reel-api.zip dist package.json package-lock.json
aws s3 cp reel-api.zip s3://elasticbeanstalk-us-east-2-<account>/reel-api/<version>.zip
aws elasticbeanstalk create-application --application-name reel-api
aws elasticbeanstalk create-application-version --application-name reel-api --version-label <version> --source-bundle S3Bucket=...,S3Key=...
aws elasticbeanstalk create-environment --application-name reel-api --environment-name reel-api-prod \
  --version-label <version> --solution-stack-name "64bit Amazon Linux 2023 v6.11.10 running Node.js 24" \
  --option-settings file://options.json
# deploy a new version later:
aws elasticbeanstalk update-environment --environment-name reel-api-prod --version-label <new-version>
```

`options.json` (namespace / option = value):

| Namespace | Option | Value |
| --- | --- | --- |
| aws:ec2:vpc | VPCId, Subnets, AssociatePublicIpAddress | default VPC, 3 subnets, true |
| aws:elasticbeanstalk:environment | EnvironmentType | SingleInstance (no load balancer, to save cost) |
| aws:elasticbeanstalk:environment | ServiceRole | aws-elasticbeanstalk-service-role |
| aws:autoscaling:launchconfiguration | IamInstanceProfile | aws-elasticbeanstalk-ec2-role |
| aws:autoscaling:launchconfiguration | SecurityGroups | reel-api-sg (needs VPCId set, otherwise "does not exist") |
| aws:ec2:instances | InstanceTypes | t3.micro |
| aws:elasticbeanstalk:healthreporting:system | SystemType | enhanced |
| aws:elasticbeanstalk:cloudwatch:logs | StreamLogs / RetentionInDays | true / 7 |
| aws:elasticbeanstalk:application:environment | TMDB_API_KEY, REDIS_URL, CORS_ORIGIN, NODE_ENV | (secret), `redis://<elasticache-endpoint>:6379`, `https://d3j1066xoxz7fm.cloudfront.net`, production |

## Not done

- CloudFront `/api/*` → EB (an HTTPS frontend can't call an HTTP API because of mixed content). Skipped because the backend was torn down
- Cost: ~$0.03/hour total (EC2 + public IPv4 + ElastiCache), paid from free-plan credits
