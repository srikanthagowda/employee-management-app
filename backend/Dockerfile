FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw && ./mvnw clean package -DskipTests

EXPOSE 8083

CMD ["java", "-jar", "target/employee-management-0.0.1-SNAPSHOT.jar"]
