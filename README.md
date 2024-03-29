# AthennaIO 🦴

> The Athenna scaffold project used by 'athenna new project' command to create your project.

[![GitHub followers](https://img.shields.io/github/followers/athennaio.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/athennaio?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/athennaio/athennaio.svg?style=social&label=Star&maxAge=2592000)](https://github.com/athennaio/athennaio/stargazers/)

<p>
    <a href="https://www.buymeacoffee.com/athenna" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</p>

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/athennaio/athennaio?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/athennaio/athennaio?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">

  <img alt="Commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen?style=for-the-badge&logo=appveyor">
</p>

<img src="https://raw.githubusercontent.com/AthennaIO/AthennaIO/9d2247f0afce10b754e171b0ac23062eeb2f5024/.github/logo.svg" width="200px" align="right" hspace="30px" vspace="100px">

## Running

First go to the [Riot developer portal](https://developer.riotgames.com/) and get an API
Key. Add your key to your `.env` and `.env.test` file in
the `RIOT_API_KEY` env var.

In application root path, run Postgres database locally
using the following command:

```shell
docker-compose up -d
```

Install dependencies:

```shell
npm install
```

Create `.env` and `.env.test`

```shell
cp .env.example .env && cp .env.example .env.test
```

Run database migrations:

```shell
node artisan migration:run
```

To run your application in watch mode:

```shell
node artisan serve --watch
```

Visit [http://localhost:3000/docs](http://localhost:3000/docs)
to see the Swagger documentation page.

To run application tests (needs Database and API Key for E2E tests):

```shell
node artisan test
```

## Links

> For project documentation [click here](https://athenna.io). If something is not clear in the documentation please open
> an issue in the [documentation repository](https://github.com/athennaio/docs)

## Contributing

> If you want to contribute to this project, first read
> the [CONTRIBUTING.MD](https://github.com/AthennaIO/AthennaIO/blob/develop/CONTRIBUTING.md) file. It will be a pleasure to
> receive your help.

---

<p align='center'>
  With 💜 by <a href='https://github.com/AthennaIO'>Athenna community</a>
</p>

<p align='center'>
  <a href='https://github.com/AthennaIO/AthennaIO/graphs/contributors'>
    <img src='https://contrib.rocks/image?repo=AthennaIO/AthennaIO'/>
  </a>
</p>
