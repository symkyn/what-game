create table "User" (
	id serial primary key,
	username varchar(20),
	password varchar(20),
	bggID text,
	firstName text,
	lastName text,
	email varchar(50)
);