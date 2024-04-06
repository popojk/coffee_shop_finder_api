IMAGE_NAME=coffee_shop_finder_elasticsearch

docker run -d --rm --name elasticsearch \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms750m -Xmx750m" \
  -e "xpack.security.enabled=false" \
  -p 9200:9200 \
  -p 9300:9300 \
  -v ./data:/usr/share/elasticsearch/data \
  --link coffee_shop_finder_db:coffee_shop_finder_db \
  $IMAGE_NAME
