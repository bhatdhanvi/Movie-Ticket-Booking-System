create database movie_ticket_management;
use movie_ticket_management;




create table user_(usr_id INT AUTO_INCREMENT, usr_name varchar(20), phn_no bigint, usr_email varchar(10),password_ varchar(30), primary key(usr_id));
select * from user_;
delete from user_;

-- drop table user_;
CREATE TABLE IF NOT EXISTS tickets (
    movie_id INT PRIMARY KEY,
    movie_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL
);
-- select * from user_;


INSERT INTO tickets (movie_id, movie_name, quantity) VALUES
(1, 'Interstellar', 10),
(2, 'Baby''s Day Out', 8),
(3, 'The Avengers', 15),
(4, 'Movie 4', 5),
(5, 'Movie 5', 12);
select * from tickets;
drop table tickets;

CREATE TABLE IF NOT EXISTS user_tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_name VARCHAR(255) NOT NULL,
    time VARCHAR(20) NOT NULL,
    code VARCHAR(20) NOT NULL
);
select * from user_tickets;
delete from user_tickets;
-- create table movie (movie_id varchar(10), movie_name varchar(10), primary key(movie_id));
-- create table ticket(booking_id varchar(10), timing time, date_ date, movie_name varchar(10), movie_id varchar(10), primary key(booking_id), foreign key(movie_id) references movie);
 CREATE TABLE THEATRE(THEATRE_ID INT PRIMARY KEY, THEATRE_NAME VARCHAR(20), LOCATION VARCHAR(20), movie_name varchar(20));
 drop table theatre;
 insert into theatre value(1,"orion mall","bglr","inception"),
							(2,"vishal mall","bglr","avengers"),
                            (3,"forum mall","bglr","baby day out"),
                            (4,"mantri mall","bglr","nightmare"),
                            (5,"mall of asia","bglr","interstellar");
                            
 CREATE TABLE MOVIE_AVAIL(THEATRE_ID INT, movie_name VARCHAR(20), price int, FOREIGN KEY(THEATRE_ID) REFERENCES THEATRE(THEATRE_ID));
 insert into MOVIE_AVAIL value(1,"interstellar",350),
 (2,"avengers",780),
 (3,"baby day out",450),
 (4,"nightmare",380),
 (5,"inception",680);
 drop table MOVIE_AVAIL;
 

-- drop database movie_ticket_management;
