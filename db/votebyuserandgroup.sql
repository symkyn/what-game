select * from "Votes" 
    inner join "User" 
        on ("Votes".userID = "User".id) 
    inner join "GroupsUser" 
        on ("User".id = "GroupsUser".userid)
    inner join "VoteOptions" 
        on ("Votes".vote = "VoteOptions".voteoptionid)
    where gamesid = $1
    and groupid = $2;