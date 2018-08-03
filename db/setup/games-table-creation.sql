create table "Games" (
	id serial primary key,
	owner integer references "User" (id),
	title text,
	minPlayerCount integer,
	maxPlayerCount integer,
	minPlayTime integer,
	maxPlayTime integer,
	thumbnail text,
	desinger text,
	description text,
	genre text,
	plays integer,
	averageVote decimal(2)
);