# Terraform configuration to set up providers by version.
terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }
}

# Configures the provider to use the resource block's specified project for quota checks.
provider "google-beta" {
  alias                 = "default"
  user_project_override = true
  region                = var.region
}

# Configures the provider to not use the resource block's specified project for quota checks.
# This provider should only be used during project creation and initializing services.
provider "google-beta" {
  alias                 = "no_user_project_override"
  user_project_override = false
}

# Configures production environment
# module "prod" {
#   source = "./firebase"
#   providers = {
#     google-beta                          = google-beta.default
#     google-beta.no_user_project_override = google-beta.no_user_project_override
#   }
#   project_id      = var.prod_project_id
#   billing_account = var.billing_account
#   region          = var.region
# }

# Configures staging environment
# module "stg" {
#   source = "./firebase"
#   providers = {
#     google-beta                          = google-beta.default
#     google-beta.no_user_project_override = google-beta.no_user_project_override
#   }
#   project_id      = var.stg_project_id
#   billing_account = var.billing_account
#   region          = var.region
# }

# Configures development environment
module "dev" {
  source = "./firebase"
  providers = {
    google-beta                          = google-beta.default
    google-beta.no_user_project_override = google-beta.no_user_project_override
  }
  project_id      = var.dev_project_id
  billing_account = var.billing_account
  region          = var.region
}
