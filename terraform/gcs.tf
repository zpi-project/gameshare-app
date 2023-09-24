resource "google_storage_bucket" "test" {
    project       = var.project
    name          = "test-bucket-for-iac-check"
    location      = var.region

    public_access_prevention = "enforced"
}