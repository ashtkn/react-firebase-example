# `react-firebase-example`

## Setup

### Prepare GCP Project

```sh
gcloud auth application-default login

cd terraform

nano terraform.tfvars
# Set the following variables:
# - region          = "asia-northeast1"
# - billing_account = "XXXXXX-XXXXXXX-XXXXXX"
# - prod_project_id = "XXX-prod"
# - stg_project_id  = "XXX-stg"
# - dev_project_id  = "XXX-dev"

terraform init
terraform plan
terraform apply
```

### Prepare Firebase Project

```sh
firebase login
firebase projects:list
firebase use ---add
# Choose Firebase projects (XXX-prod, XXX-stg, or XXX-dev)
```

## Run development server

```sh
npm run dev
```

## Deployment

### React app

```sh
pnpm run build
firebase deploy --only hosting
```

### Firebase Functions

```sh
firebase deploy --only functions
```
