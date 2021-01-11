# vortex

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
