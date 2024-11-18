insert into Accounts (email, first_name, last_name, username, pw, creation_date)
VALUES ('jakob@mimo.com', 'jakob', 'danninger', 'papajakob', '1234', '2020-01-01');

insert into Accounts (email, first_name, last_name, username, pw, creation_date)
VALUES ('neha@mimo.com', 'neha', 'panduri', 'neha', '1234', '2020-01-01');

insert into Accounts (email, first_name, last_name, username, pw, creation_date)
VALUES ('vibha@mimo.com', 'vibha', 'mandayam', 'vibha', '1234', '2020-01-01');

insert into Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, est_price, post_date)
VALUES (1, 'Nice Apartment', 'This is a nice apartment', 2, 1, 0, '1234 Elm St', 1000, 1000, '2020-01-01');

insert into Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, est_price, post_date)
VALUES (2, 'Nice Apartment', 'This is a nice apartment', 2, 1, 0, '1234 Elm St', 1000, 1000, '2020-01-01');

insert into Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, est_price, post_date)
VALUES (3, 'Nice Apartment', 'This is a nice apartment', 2, 1, 0, '1234 Elm St', 1000, 1000, '2020-01-01');

INSERT INTO Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, post_date)
VALUES (1, "Nice 1 bedroom little italy", "See title", 1, 1, 0, "1900 East 120 Cleve", 1200,  date('now'));