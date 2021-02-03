# vortex

Experimental web interface for [Storj](https://storj.io/)/[Tardigrade](https://tardigrade.io/).

[![Tests](https://github.com/storj-thirdparty/vortex/workflows/tests/badge.svg)](https://github.com/storj-thirdparty/vortex/actions?query=workflow%3Atests)
[![License](https://img.shields.io/badge/license-AGPLv3-blue.svg?label=license)](https://github.com/Storj/storj-thirdparty/vortex/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/storj-thirdparty/vortex.svg)](https://github.com/storj-thirdparty/vortex/graphs/contributors)


# usage
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

# config

To run you need a `config.json`

```json
{
	"baseUrl": "http://localhost:3000",
	"stargateEndpoint": "https://gateway.tardigradeshare.io",
	"stargateAuthEndpoint": "https://auth.tardigradeshare.io",
	"masterAccount": {
		"accessKey": "<your-master-access-key>",
		"secretKey": "<your-master-secret-key>",
		"projectId": "<your-tardigrade-project-id>",
		"apiKey": "<your-tardigrade-project-id>",
		"passphrase": "<your-tardigrade-passphrase>",
		"satelliteUrl": "<your-tardigrade-satellite>",
		"satelliteEndpoint": "<your-tardigrade-endpoint>",
		"username": "<your-tardigrade-email>",
		"password": "<your-tardigrade-password>"
	},
	"bucketPrefix": "<bucket-prefix>",
	"postmarkToken": "<postmarkapp.com-token>",
	"features": {
		"emailActivation": false
	},
	"adminTokens": [
		"<admin-token>"
	]
}
```
