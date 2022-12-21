FROM mariadb:latest

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

COPY init.sql /docker-entrypoint-initdb.d/

# Building with
# docker build -t notedb .

# Running with
# docker run --detach -p 3307:3306 --name some-notedb  --env MARIADB_ROOT_PASSWORD=1234  notedb