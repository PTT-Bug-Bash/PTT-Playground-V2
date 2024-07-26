

******Metrics High level metrics related to AR *****************************************

SELECT COUNT(*) AS "Count" FROM athletes LIMIT 50 

SELECT COUNT(*) AS "Count" FROM businesses LIMIT 50 

select count(*) + 10 from campaigns 



******************End ********************************************************************



******************Metrics SQL related to Campaigns **********************************88

--Campaigns athelete signed
select count(*) 
from athlete_campaign a , campaigns b  , athletes c 
where a.athlete_id=c.id
and a.campaign_id=b.id



-- From campagins have most signed uo
select  count(b.event_type) , b.event_type eventType
from athlete_campaign a , campaigns b  , athletes c 
where a.athlete_id=c.id
and a.campaign_id=b.id
group by b.event_type



-- Campagins where monetary value is > 15.




--  Campagins happening this week


**************************************************************************************







