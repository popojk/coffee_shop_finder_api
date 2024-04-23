IMAGE_NAME=coffee_shop_finder_logstash

docker run --rm -it --name logstash \
  -p 5050:5050 \
  -e "CONFIG_SUPPORT_ESCAPE=true" \
  -e "ELASTICSEARCH_URL=http://elasticsearch:9200" \
  -v ./config:/usr/share/logstash/config \
  -v ./logstash_data:/usr/share/logstash/data \
  --link coffee_shop_finder_db:coffee_shop_finder_db \
  --link elasticsearch:elasticsearch \
  --platform linux/arm64 \
  $IMAGE_NAME
