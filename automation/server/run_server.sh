IMAGE=coffee_shop_finder_server
NAME=coffee_shop_finder_server
PORT=8100
WORK=/root/api
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

docker run -d --rm --name "$NAME" \
  -w "$WORK" \
  -p "$PORT:$PORT" --link elasticsearch:elasticsearch --link coffee_shop_finder_db:coffee_shop_finder_db  \
  $IMAGE