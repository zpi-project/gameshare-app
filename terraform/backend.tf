terraform {
    backend "gcs" {
        bucket = "terraform-state-12"
        prefix = "statefile"
    }
}