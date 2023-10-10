USE  JobboardDB;
create table advertisements(
type_of_job varchar(100),
offer_date date,
salary int,
job_offer varchar(500)
);
create table companies(
name_of_the_company varchar(100),
location varchar (100),
number_of_employees int
);
create table information(
name_of_the_candidate varchar (100),
message varchar (200),
date_of_the_candidature date
);
create table people(
contact varchar (150),
tel varchar (15),
email (varchar 100)
);

