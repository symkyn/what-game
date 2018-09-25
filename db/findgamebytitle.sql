-- set searchTerm = '%'|| $1 || '%';
select * from "Games" where title like '%' || $1 || '%';