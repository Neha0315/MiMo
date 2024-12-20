def get_profile(conn, user_name):
    cursor = conn.cursor()
    print(f"Querying for user_name: {user_name}") 
    try:
        cursor.execute("SELECT * FROM Accounts LEFT JOIN Posts ON account_id = poster_id WHERE username = ? ", (user_name,))
        row = cursor.fetchone()
        print(f"Database response: {row}")
        if row:
            return {
                "account_id": row[0],
                "email": row[1],
                "first_name": row[2],
                "last_name": row[3],
                "username": row[4],
                "pwd": row[5],
                "creation_date": row[6],
                "listings": [{"post_id":row[7], "title":row[9]}]
            }
        else:
            return {"error": "Profile not found"}
    except Exception as e:
        return {"error": str(e)}
    

def get_profile_id(conn, user_name):

    cursor = conn.cursor()
    print(f"Querying for user_name: {user_name}")
    try:
        # Execute the query
        cursor.execute("SELECT account_id FROM Accounts WHERE username = ?", (user_name,))
        row = cursor.fetchone()
        
        # Log the result
        print(f"Database response: {row}")

        # Return the account_id if found
        if row:
            return {"account_id": row[0]}
        else:
            return {"error": "Profile not found"}
    except Exception as e:
        # Log and return any exceptions
        print(f"Error occurred: {str(e)}")
        return {"error": str(e)}

def create_profile(conn, profile):
    cursor = conn.cursor()
    query = "INSERT INTO Accounts (email, first_name, last_name, username, pw, creation_date) VALUES (?, ?, ?, ?, ?, date('now'));"
    try:
        cursor.execute(query, (profile.email, profile.first_name, profile.last_name, profile.username, profile.pw))
        conn.commit()
        return {"success": "profile created"}
    except:
        return {"error": "profile not created"}