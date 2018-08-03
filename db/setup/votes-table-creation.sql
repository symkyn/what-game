create table "Votes" (
	id serial primary key,
	gamesID integer references "Games" (id),
	userID integer references "User" (id),
	vote integer
);