FROM quay.io/quarkus/centos-quarkus-maven:21.0-java11

COPY . /app

WORKDIR /app

RUN mvn clean install -DskipTests
