resource "google_artifact_registry_repository" "docker-repo" {
  location      = var.region
  repository_id = "docker-repository-zpi"
  description   = "A Docker repository for application artifacts"
  format        = "DOCKER"
}