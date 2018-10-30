-- set searchTerm = '%'|| $1 || '%';
select * from "Games" where title Ilike '%' || $1 || '%' and owner = $2;