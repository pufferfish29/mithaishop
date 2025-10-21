# backend


## start guide
1) first start with docker compose up
```bash
docker compose up
```

2) run migration
```bash
docker compose exec mithati-backend npm run typeorm:run-migrations
```

3) you r good to go with this, request at localhost:3000

## Note
in case u want to see postgres schema via shell use

```bash
docker compose exec postgres psql -U rudy -d mithaidb
```
