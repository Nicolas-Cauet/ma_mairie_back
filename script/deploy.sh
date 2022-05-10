export PGUSER=mamairie
export PGDATABASE=mamairie
export PGPASSWORD=mamairie

sqitch deploy db:pg:mamairie 1.DDL
sqitch deploy db:pg:mamairie 2.DML
