insert into Accounts (email, first_name, last_name, username, pw, creation_date)
VALUES ('jakob@mimo.com', 'jakob', 'danninger', 'papajakob', '1234', '2020-01-01');

insert into Accounts (email, first_name, last_name, username, pw, creation_date)
VALUES ('neha@mimo.com', 'neha', 'panduri', 'neha', '1234', '2020-01-01');

insert into Accounts (email, first_name, last_name, username, pw, creation_date)
VALUES ('vibha@mimo.com', 'vibha', 'mandayam', 'vibha', '1234', '2020-01-01');



insert into Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, sq_ft, post_date, score)
VALUES (1, 'Nice Apartment', 'This is a nice apartment', 2, 1, 0, '10521 Lee Ave, Cleveland, OH 44106', 1000, 1000, '2020-01-01', 1);

insert into Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, sq_ft, post_date, score)
VALUES (2, 'Nice Apartment', 'This is a nice apartment', 2, 1, 0, '11701 Superior Ave, Cleveland, OH 44106', 1000, 1000, '2020-01-01', 2);

insert into Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, sq_ft, post_date, score)
VALUES (3, 'Nice Apartment', 'This is a nice apartment', 2, 1, 0, '2450 Overlook Rd, Cleveland Heights, OH 44106', 1000, 1000, '2020-01-01', 3);

INSERT INTO Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, sq_ft, post_date, score)
VALUES (1, "Nice 1 bedroom little italy", "See title", 1, 1, 0, "2200 Overlook Rd, Cleveland, OH 44106", 1200, 750, date('now'), 4);

INSERT INTO Images (file_name, post_id, photo_number)
VALUES ('12z3llwww.JPG', 1, 1);

INSERT INTO Images (file_name, post_id, photo_number)
VALUES ('33hiyey6s.png', 2, 2);

INSERT INTO Images (file_name, post_id, photo_number)
VALUES ('335zj6pe3.png', 3, 3);

INSERT INTO Images (file_name, post_id, photo_number)
VALUES ('122v3bnz5.JPG', 4, 4);