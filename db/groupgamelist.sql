SELECT * FROM "Games" as gm 
    inner JOIN "GroupsUser" as gu ON gm.owner = gu.userid
    where gu.groupid = $1 order by title asc;