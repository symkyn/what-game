create table "Plays" (
	id serial primary key,
	gamesID integer references "Games" (id),
	play date
);