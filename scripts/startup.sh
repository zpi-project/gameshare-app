#!/bin/bash
sudo apt-get -y update
sudo apt-get -y install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get -y update
sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo apt-get -y install git
git clone https://github.com/zpi-project/gameshare-app.git
touch gameshare-app/.env
touch gameshare-app/backend/src/main/resources/gcp-account-file.json

echo $IAC_CICD_SA > gameshare-app/backend/src/main/resources/gcp-account-file.json

echo ADMIN1_EMAIL=${{ADMIN1_EMAIL}} >> gameshare-app/.env
echo ADMIN2_EMAIL=${{ADMIN2_EMAIL}} >> gameshare-app/.env
echo ADMIN3_EMAIL=${{ADMIN3_EMAIL}} >> gameshare-app/.env
echo ADMIN4_EMAIL=${{ADMIN4_EMAIL}} >> gameshare-app/.env
echo AUTH_CLIENT_ID="$AUTH_CLIENT_ID" >> gameshare-app/.env
echo BACKEND_HOST="$BACKEND_HOST" >> gameshare-app/.env
echo BACKEND_PORT="$BACKEND_PORT" >> gameshare-app/.env
echo CLIENT_ID="$CLIENT_ID" >> gameshare-app/.env
echo DB_HOST="$DB_HOST" >> gameshare-app/.env
echo DB_NAME="$DB_NAME" >> gameshare-app/.env
echo DB_PASSWORD="$DB_PASSWORD" >> gameshare-app/.env
echo DB_PORT="$DB_PORT" >> gameshare-app/.env
echo DB_USER="$DB_USER" >> gameshare-app/.env
echo FRONTEND_HOST="$FRONTEND_HOST" >> gameshare-app/.env
echo FRONTEND_PORT="$FRONTEND_PORT" >> gameshare-app/.env
echo GCP_BUCKET_ID="$GCP_BUCKET_ID" >> gameshare-app/.env
echo GCP_CONFIG_FILE="$GCP_CONFIG_FILE" >> gameshare-app/.env
echo GCP_DIR_NAME="$GCP_DIR_NAME" >> gameshare-app/.env
echo GCP_PROJECT_ID="$GCP_PROJECT_ID" >> gameshare-app/.env
echo SECURE_LOCAL_STORAGE_HASH_KEY="$SECURE_LOCAL_STORAGE_HASH_KEY">> gameshare-app/.env
echo SECURE_LOCAL_STORAGE_PREFIX="$SECURE_LOCAL_STORAGE_PREFIX" >> gameshare-app/.env
echo VITE_API_URL="$VITE_API_URL" >> gameshare-app/.env
echo VITE_AUTH_CLIENT_ID=${{VITE_AUTH_CLIENT_ID}} >> gameshare-app/.env
echo VITE_SECURE_LOCAL_STORAGE_HASH_KEY=${{VITE_SECURE_LOCAL_STORAGE_HASH_KEY}} >> gameshare-app/.env
echo VITE_SECURE_LOCAL_STORAGE_PREFIX=${{VITE_SECURE_LOCAL_STORAGE_PREFIX}} >> gameshare-app/.env

cd gameshare-app
sudo docker compose up

