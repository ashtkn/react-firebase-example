resource "google_project" "default" {
  provider        = google-beta.no_user_project_override
  name            = var.project_id
  project_id      = var.project_id
  billing_account = var.billing_account
  labels = {
    "firebase" = "enabled"
  }
}

resource "google_project_service" "default" {
  provider = google-beta.no_user_project_override
  project  = google_project.default.project_id
  for_each = toset([
    "serviceusage.googleapis.com",
    "cloudbuild.googleapis.com",
    "cloudbilling.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firebase.googleapis.com",
    "identitytoolkit.googleapis.com",
    "firestore.googleapis.com",
    "firebaserules.googleapis.com",
    "firebasestorage.googleapis.com",
    "storage.googleapis.com",
    "cloudfunctions.googleapis.com",
    "firebasehosting.googleapis.com",
  ])
  service            = each.key
  disable_on_destroy = false
}

# Enable Firebase
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = google_project.default.project_id
  depends_on = [
    google_project_service.default
  ]
}

# Enable Firestore
resource "google_firestore_database" "default" {
  provider                    = google-beta.no_user_project_override
  project                     = google_project.default.project_id
  name                        = "(default)"
  location_id                 = var.region
  type                        = "FIRESTORE_NATIVE"
  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"
  depends_on = [
    google_firebase_project.default,
  ]
}

# Enable Cloud Storage
resource "google_app_engine_application" "default" {
  provider    = google-beta
  project     = google_project.default.project_id
  location_id = var.region
  depends_on = [
    google_firestore_database.default,
  ]
}

## Enable Cloud Storage Bucket
resource "google_firebase_storage_bucket" "default" {
  provider  = google-beta
  project   = google_project.default.project_id
  bucket_id = google_app_engine_application.default.default_bucket
}

# Enable Firebase Authentication
resource "google_identity_platform_config" "default" {
  provider = google-beta
  project  = google_project.default.project_id
  sign_in {
    allow_duplicate_emails = false
    email {
      enabled = true
    }
  }
  depends_on = [
    google_identity_platform_config.default
  ]
}

# Enable Web App
resource "google_firebase_web_app" "default" {
  provider        = google-beta
  project         = google_project.default.project_id
  display_name    = "Web App"
  deletion_policy = "DELETE"
  depends_on = [
    google_firebase_project.default,
  ]
}

data "google_firebase_web_app_config" "default" {
  provider   = google-beta
  project    = google_project.default.project_id
  web_app_id = google_firebase_web_app.default.app_id
}

output "firebase_project_id" {
  value = google_project.default.project_id
}

output "firebase_web_app_api_key" {
  value = data.google_firebase_web_app_config.default.api_key
}

output "firebase_web_app_auth_domain" {
  value = data.google_firebase_web_app_config.default.auth_domain
}

output "firebase_web_app_id" {
  value = data.google_firebase_web_app_config.default.web_app_id
}

output "firebase_web_app_messaging_sender_id" {
  value = data.google_firebase_web_app_config.default.messaging_sender_id
}

output "firebase_web_app_storage_bucket" {
  value = data.google_firebase_web_app_config.default.storage_bucket
}
