#!/bin/bash
echo "Building..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://reel-movie-app --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E3RUTYFW0WORS4 \
  --paths "/*"

echo "Done! 🎉"
