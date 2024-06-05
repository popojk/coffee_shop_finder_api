DB_NAME=coffee_shop_finder_review_db

docker run -d --rm --name $DB_NAME \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=coffee_shop_finder_review_db \
  -v coffee_shop_finder_review_data:/var/lib/postgresql/data \
  -p 5435:5432 \
  -d postgres:13