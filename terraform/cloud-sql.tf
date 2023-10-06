resource "google_sql_database" "database" {
  project         = var.project
  instance        = google_sql_database_instance.primary.name
  name            = "test-db"
}

resource "google_sql_database_instance" "primary" {
  project             = var.project
  name                = "cloud-sql-instance"
  region              = var.region
  database_version    = "POSTGRES_15"
  settings {
    tier    = "db-f1-micro"
  }
}