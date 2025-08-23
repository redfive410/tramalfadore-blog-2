# Deploy to Google Cloud Run

This guide explains how to deploy the Tramalfadore Blog to Google Cloud Run.

## Prerequisites

1. Install the Google Cloud CLI: https://cloud.google.com/sdk/docs/install
2. Authenticate with Google Cloud:
   ```bash
   gcloud auth login
   ```
3. Set your project ID:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```
4. Enable required APIs:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable artifactregistry.googleapis.com
   ```

## Local Development

Test the Docker build locally:

```bash
# Build the Docker image
npm run docker:build

# Run the container locally
npm run docker:run
```

Visit http://localhost:3000 to test the application.

## Deploy to Cloud Run

Deploy using Cloud Build:

```bash
npm run gcp:deploy
```

This will:
1. Build the Docker image using Google Cloud Build
2. Push the image to Google Container Registry
3. Deploy the image to Cloud Run
4. Make the service publicly accessible

## Manual Deployment

You can also deploy manually:

```bash
# Create Artifact Registry repository (if not exists)
gcloud artifacts repositories create tramalfadore-repo \
  --repository-format=docker \
  --location=us-central1

# Configure Docker to authenticate with Artifact Registry
gcloud auth configure-docker us-central1-docker.pkg.dev

# Build and tag the image
docker build -t us-central1-docker.pkg.dev/YOUR_PROJECT_ID/tramalfadore-repo/tramalfadore-blog:latest .

# Push to Artifact Registry
docker push us-central1-docker.pkg.dev/YOUR_PROJECT_ID/tramalfadore-repo/tramalfadore-blog:latest

# Deploy to Cloud Run
gcloud run deploy tramalfadore-blog \
  --image us-central1-docker.pkg.dev/YOUR_PROJECT_ID/tramalfadore-repo/tramalfadore-blog:latest \
  --region us-west1 \
  --platform managed \
  --allow-unauthenticated
```

## Configuration

- **Service Name**: tramalfadore-blog
- **Region**: us-west1
- **Port**: 3000
- **Access**: Public (unauthenticated)
- **Registry**: us-central1-docker.pkg.dev

## Custom Domain

To set up a custom domain:

1. Map your domain to the Cloud Run service:
   ```bash
   gcloud run domain-mappings create --service tramalfadore-blog --domain your-domain.com
   ```

2. Update your DNS settings as instructed by the command output.

## Environment Variables

If you need to set environment variables, add them to the `cloudbuild.yaml` file:

```yaml
- name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
  entrypoint: gcloud
  args: [
    'run', 'deploy', 'tramalfadore-blog',
    '--image', 'gcr.io/$PROJECT_ID/tramalfadore-blog:$COMMIT_SHA',
    '--region', 'us-central1',
    '--platform', 'managed',
    '--allow-unauthenticated',
    '--set-env-vars', 'NODE_ENV=production,OTHER_VAR=value'
  ]
```