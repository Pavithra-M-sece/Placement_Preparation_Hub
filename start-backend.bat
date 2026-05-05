@echo off
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.18.8-hotspot
set PATH=%JAVA_HOME%\bin;C:\maven\apache-maven-3.9.6\bin;%PATH%
cd /d "d:\preparation hub\backend"
echo Starting Spring Boot...
mvn spring-boot:run
pause
