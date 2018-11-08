select * from "Votes" 
    inner join "User" 
        on ("Votes".userID = "User".id) 
    inner join "GroupsUser" 
        on ("User".id = "GroupsUser".userid)
    where gamesid = $1
    and groupid = $2;