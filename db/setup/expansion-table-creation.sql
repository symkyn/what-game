create table "Expansion" (
	expansionid serial primary key,
    basegameid integer,
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
	averageVote decimal(2),
    bggid integer
);