export PGUSER
export PGDATABASE
export PGPASSWORD

sqitch deploy db:pg:mamairie 1.DDL
sqitch deploy db:pg:mamairie 2.DML
