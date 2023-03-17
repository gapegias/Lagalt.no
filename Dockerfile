FROM gradle:jdk17--corretto AS build
WORKDIR /app
COPY . .
RUN gradle bootJar

FROM openjdk:17 AS runtime
WORKDIR /app
ARG JAR_FILE=/app/build/libs/*.jar
COPY --from=build ${JAR_FILE} /app/app.jar
ENTRYPOINT ["java","-jar","app.jar"]
