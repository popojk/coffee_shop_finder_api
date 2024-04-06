DB_NAME=coffee_shop_finder_db

docker run -d --rm --name $DB_NAME \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=coffee_shop_finder_db \
  -v my_postgres_data:/var/lib/postgresql/data \
  -p 5433:5432 \
  -d postgres:13
