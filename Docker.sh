docker image build --tag mini-keno/local:latest -f Dockerfile .
docker run -p 8082:8082 -d mini-keno/local:latest
