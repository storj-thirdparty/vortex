# vortex

Experimental web interface for [Storj](https://storj.io/)/[Tardigrade](https://tardigrade.io/).

[![Tests](https://github.com/storj-thirdparty/vortex/workflows/Tests/badge.svg)](https://github.com/storj-thirdparty/vortex/actions?query=workflow%3ATests)
[![License](https://img.shields.io/badge/license-AGPLv3-blue.svg?label=license)](https://github.com/Storj/storj-thirdparty/vortex/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/storj-thirdparty/vortex.svg)](https://github.com/storj-thirdparty/vortex/graphs/contributors)


# commands
Production Usage

```
docker-compose up -d --force-recreate --build
```

Development Usage

```
docker-compose -f docker-compose-dev.yml up -d --force-recreate --build
```


Manually Run Audit

```
docker exec -it vortex_vortex_1 /usr/src/app/scripts/audit.sh
```
