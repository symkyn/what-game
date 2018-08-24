update "Votes" set vote = $1
    where gamesid = $2 and userid = $3;