#!/bin/bash
set -e

# B8S Solutions Deployment Script
# Builds the site and uploads to S3 with CloudFront invalidation

# Configuration
S3_BUCKET="b8s.bates-solutions.com"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"

echo "=== B8S Solutions Deployment ==="

# Build the site
echo "Building Next.js site..."
npm run build

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "Error: 'out' directory not found. Build may have failed."
    exit 1
fi

# Sync to S3
echo "Uploading to S3..."
aws s3 sync out/ s3://${S3_BUCKET}/ \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "*.json"

# Upload HTML files with shorter cache
aws s3 sync out/ s3://${S3_BUCKET}/ \
    --exclude "*" \
    --include "*.html" \
    --cache-control "public, max-age=0, must-revalidate"

# Upload JSON files with shorter cache
aws s3 sync out/ s3://${S3_BUCKET}/ \
    --exclude "*" \
    --include "*.json" \
    --cache-control "public, max-age=0, must-revalidate"

# Invalidate CloudFront cache
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --paths "/*"
else
    echo "Warning: CLOUDFRONT_DISTRIBUTION_ID not set, skipping cache invalidation"
    echo "Set it with: export CLOUDFRONT_DISTRIBUTION_ID=\$(cd terraform && terraform output -raw cloudfront_distribution_id)"
fi

echo "=== Deployment Complete ==="
echo "Site available at: https://b8s.bates-solutions.com"
