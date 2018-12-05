select title from "Games" 
    where bggid = $1 and owner = $2
union
select title from "Expansion"
    where bggid = $1 and owner = $2;