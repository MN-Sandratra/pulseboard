# Build stage
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app
COPY Pulseboard/.mvn .mvn
COPY Pulseboard/mvnw Pulseboard/pom.xml ./
COPY Pulseboard/src src

RUN chmod +x mvnw
RUN ./mvnw -DskipTests package

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Tell Render / platform to use $PORT (default 8080)
ENV SERVER_PORT=${PORT:-8080}
EXPOSE 8080
ENTRYPOINT ["sh","-c","java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
