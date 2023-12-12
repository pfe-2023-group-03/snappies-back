# SnappiesBack

This is the back-end of the Snappies project. It is a REST API made with NestJS and Postgresql. It is deployed on a VPS using Docker.

## Development server

Run `npm run start:dev` for a dev server. The server will automatically reload if you change any of the source files.

## Deployement

The project is deployed on a VPS using Docker. The Dockerfile is in the root of the project. Everyting is managed by Github Actions.
There is two workflows, one for development and one for production. The development workflow is triggered when a push is made on the dev branch. The production workflow is triggered when a push is made on the main branch.

## Documentation

The documentation is made with Swagger. It is available at the url: http://localhost:3000/api when the server is running.

## Authors

-   **Corentin D'haeyere** - [cdhaeyere](https://github.com/cdhaeyere)
-   **Thomas Johnen** - [ThomasJohnen](https://github.com/ThomasJohnen)
-   **Lucas Fuentes Gonzalez** - [LucasFueGo](https://github.com/LucasFueGo)
-   **Laurent Vandermeersch** - [laurentVDM](https://github.com/laurentVDM)
-   **Loic Thomas** - [LoicThomas9170](https://github.com/LoicThomas9170)
