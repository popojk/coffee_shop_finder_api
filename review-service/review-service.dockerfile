FROM alpine:latest

RUN mkdir /app

COPY reviewApp /app

CMD ["/app/reviewApp"]