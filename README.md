# vortex

Experimental web inteface for [Storj](https://storj.io/)/Tardigrade(https://tardigrade.io/).

[![Build Status](https://travis-ci.org/storj-thirdparty/vortex.svg?branch=master)](https://travis-ci.org/storj-thirdparty/vortex)
[![Coverage Status](https://coveralls.io/repos/github/storj-thirdparty/vortex/badge.svg?branch=master)](https://coveralls.io/github/storj-thirdparty/vortex?branch=master)
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
