select * from "Games" inner join "User" on ("Games".owner = "User".id) where $1 >= minPlayerCount and $1 <= maxPlayerCount
and $2 >= (minPlayTime-30) and $2 <= (maxPlayTime+30) and "User".bggID = $3 order by title asc;
