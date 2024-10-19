CREATE TABLE Accounts (
    account_id int IDENTITY(1,1) PRIMARY KEY,
    email varchar(255) NOT NULL,
    first_name varchar(64) NOT NULL,
    last_name varchar(64),
    username VARCHAR(64) NOT NULL,
    pw VARCHAR(64) NOT NULL,
    creation_date DATE
);

CREATE TABLE Posts (
    post_id int IDENTITY(1,1) PRIMARY KEY,
    poster_id int FOREIGN KEY REFERENCES Accounts(account_id) ON DELETE NO ACTION NOT NULL,
    about VARCHAR(2000) NOT NULL,
    bedroom int,
    bathroom int,
    shared bit,
    addr Varchar(256) NOT NULL,
    listed_price int NOT NULL,
    est_price int,
    post_date DATE
);

CREATE TABLE Message (
    message_id int IDENTITY(1,1) PRIMARY KEY,
    sender int FOREIGN KEY REFERENCES ACCOUNTS(account_id) ON DELETE NO ACTION NOT NULL,
    reciver int FOREIGN KEY REFERENCES ACCOUNTS(account_id) ON DELETE NO ACTION NOT NULL,
    msg VARCHAR(256) NOT NULL,
    sent_at DATE,
    read_at DATE,
);

CREATE TABLE Watch_List (
    account_id int FOREIGN KEY REFERENCES ACCOUNTS(account_id) ON DELETE CASCADE,
    post_id int FOREIGN KEY REFERENCES Posts(post_id) ON DELETE CASCADE,
);



