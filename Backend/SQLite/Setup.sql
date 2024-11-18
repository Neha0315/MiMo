CREATE TABLE Accounts (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email varchar(255) NOT NULL,
    first_name varchar(64) NOT NULL,
    last_name varchar(64),
    username VARCHAR(64) NOT NULL,
    pw VARCHAR(64) NOT NULL,
    creation_date DATE
);

CREATE TABLE Posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    poster_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    about VARCHAR(2000) NOT NULL,
    bedroom INTEGER,
    bathroom INTEGER,
    shared bit,
    addr Varchar(256) NOT NULL,
    listed_price INTEGER NOT NULL,
    est_price INTEGER,
    post_date DATE,
    FOREIGN KEY (poster_id) REFERENCES Accounts(account_id)
);

CREATE TABLE Message (
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender INTEGER,
    receiver INTEGER,
    msg VARCHAR(256) NOT NULL,
    sent_at DATE,
    read_at DATE,
    FOREIGN KEY (sender) REFERENCES ACCOUNTS(account_id),
    FOREIGN KEY (receiver) REFERENCES ACCOUNTS(account_id)
);

CREATE TABLE Watch_List (
    account_id INTEGER,
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (account_id) REFERENCES ACCOUNTS(account_id)
);





