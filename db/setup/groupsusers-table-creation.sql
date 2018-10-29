create table "GroupsUser" (
  userID integer references "User" (id),
  groupID integer references "Groups" (id),
  primary key (userID, groupID)
);