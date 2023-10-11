

FROM gradle:8.4.0-jdk20 AS BUILD
WORKDIR /usr/app/
COPY . .
RUN java --version
RUN gradle build -x test

# Package stage

FROM openjdk:20-jdk
ENV JAR_NAME=backend-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY --from=BUILD $APP_HOME .
EXPOSE 8080



ENTRYPOINT ["java","-jar","build/libs/backend-0.0.1-SNAPSHOT.jar"]