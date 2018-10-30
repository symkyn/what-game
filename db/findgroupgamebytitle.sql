select * from "Games" as gm 
    inner JOIN "GroupsUser" as gu ON gm.owner = gu.userid
    where gu.groupid = $2 and title Ilike '%' || $1 || '%'