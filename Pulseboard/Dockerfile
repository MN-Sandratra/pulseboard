# Build stage
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

COPY Pulseboard/mvnw Pulseboard/pom.xml ./

RUN chmod +x mvnw
COPY Pulseboard/.mvn .mvn
COPY Pulseboard/src src

RUN ./mvnw -DskipTests package

# Run stage
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Tell Render / platform to use $PORT (default 8080)
ENV SERVER_PORT=${PORT:-8080}
EXPOSE 8080
ENTRYPOINT ["sh","-c","java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
