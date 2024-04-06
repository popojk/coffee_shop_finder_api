IMAGE_NAME=kibana:8.12.2

docker run -d --rm --name kibana \
  -p 5601:5601 \
  --link elasticsearch:elasticsearch \
  --env "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" \
  $IMAGE_NAME