resource "google_storage_bucket" "test" {
    project       = var.project
    name          = "no-public-access-bucket"
    location      = var.region

    public_access_prevention = "enforced"
}