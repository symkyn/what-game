select 
  G.title as title, 
  G.minplayercount as minplayercount,
  G.maxplayercount as maxplayercount,
  G.minplaytime as minplaytime,
  G.maxplaytime as maxplaytime,
  G.thumbnail as thumbnail,
  G.description as description,
  G.plays as plays,
  G.bggid as bggid,
  E.title as etitle 
    from "Games" as G left join "Expansion" as E on (G.bggid = E.basegameid) where id = $1;