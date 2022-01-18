FROM openjdk:8
ADD target/docker.jar my-docker.jar
EXPOSE 8089
ENTRYPOINT ["java", "-jar", "my-docker.jar"]