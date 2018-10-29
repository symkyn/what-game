create table "Groups" (
  id serial primary key,
  name varchar(20),
  locationCity varchar(20),
  locationState varchar(20),
  isPublic boolean,
  private varchar(20),
  adminUser integer references "User" (id)
);