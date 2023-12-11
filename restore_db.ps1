docker compose down -v
Remove-Item -Path "..\postgres-data" -Recurse -Force
docker compose up -d db
docker cp ../dump1.txt db:/dump.sql
Start-Sleep -Seconds 40
docker exec -it db bash -c "psql -U admin -d gameshare < dump.sql"

