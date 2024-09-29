# Guía para levantar el proyecto usando docker compose

Este documento te guiará paso a paso sobre cómo levantar el proyecto usando Docker Compose. Asegúrate de seguir cada instrucción cuidadosamente.

## Requisitos previos

Antes de comenzar, asegúrate de tener docker instalado:

- **Docker**: [Instrucciones de instalación](https://docs.docker.com/get-docker/)

Puedes verificar si Docker y Docker Compose están instalados correctamente ejecutando los siguientes comandos en tu terminal:

```bash
docker --version
docker-compose --version
```

En caso de no tener instalado docker-compose, puedes instalarlo manualmente en el siguiente enalce:

- **Docker Compose**: [Instrucciones de instalación](https://docs.docker.com/compose/install/)

## Paso 1: Clonar el repositorio

Si aún no tienes el proyecto en tu máquina, clónalo desde el repositorio, luego en la terminal ve a la raíz del proyecto:

```bash
git clone https://github.com/Franh01/ydn-test.git

cd ydn-test
```

## Paso 2: Construir y levantar los contenedores

Puedes construir y levantar los contenedores usando Docker Compose. Ejecuta el siguiente comando en la terminal desde la raíz del proyecto:

```bash
docker-compose up --build
```

## Paso 3: Acceder a la aplicación

Una vez que los contenedores estén levantados, podrás acceder a las aplicaciones en las siguientes direcciones:

- Backend: http://localhost:3000
- Frontend: http://localhost:3001
