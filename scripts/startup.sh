
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
echo "BACKEND_HOST=http://localhost
BACKEND_PORT=8080

FRONTEND_HOST=http://localhost
FRONTEND_PORT=5173
AUTH_CLIENT_ID=854677688562-ese1riu3pmijrrd0ibundp381t7a4jrg.apps.googleusercontent.com
CLIENT_ID=854677688562-ese1riu3pmijrrd0ibundp381t7a4jrg.apps.googleusercontent.com

SECURE_LOCAL_STORAGE_HASH_KEY=7a70d92672cb3d56e7efb591749e4e98c9a75d048bc66bcb428c6be1e8a2a
SECURE_LOCAL_STORAGE_PREFIX=gshare

VITE_API_URL=${BACKEND_HOST}:${BACKEND_PORT}
VITE_AUTH_CLIENT_ID=${AUTH_CLIENT_ID}
VITE_SECURE_LOCAL_STORAGE_HASH_KEY=${SECURE_LOCAL_STORAGE_HASH_KEY}
VITE_SECURE_LOCAL_STORAGE_PREFIX=${SECURE_LOCAL_STORAGE_PREFIX}

DB_PASSWORD=share
DB_USER=game
DB_NAME=gamesharetest
DB_HOST=db
DB_PORT=5432

GCP_CONFIG_FILE=gcp-account-file.json
GCP_PROJECT_ID=zpi-test-1
GCP_BUCKET_ID=game-pictures-bucket
GCP_DIR_NAME=ola-game-pictures

ADMIN1_EMAIL=260370@student.pwr.edu.pl
ADMIN2_EMAIL=260378@student.pwr.edu.pl
ADMIN3_EMAIL=260407@student.pwr.edu.pl
ADMIN4_EMAIL=260417@student.pwr.edu.pl
" > gameshare-app/.env
cd gameshare-app
sudo docker compose up
