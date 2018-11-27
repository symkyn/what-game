create table "Locations" (
  id serial primary key,
  controller integer references "User" (id),
  type integer references "LocationType" (id),
  address1 text,
  address2 text,
  city text,
  state text,
  zipcode integer,
  maxplayers integer,
  tablecount integer,
  drinkallowed boolean,
  foodallowed boolean
);