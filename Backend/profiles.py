def get_profile(conn, profile_id):
    cursor = conn.cursor()
    query = "SELECT * FROM Accounts WHERE account_id = ?;"
    try:
        cursor.execute(query, profile_id)
        row = cursor.fetchone()
        return {"profile_id": row[0],
                "email": row[1],
                "first_name": row[2],
                "last_name": row[3],
                "username": row[4]}
    except:
        return {"error": "profile not found"}

def create_profile(conn, profile):
    cursor = conn.cursor()
    query = "INSERT INTO Accounts (email, first_name, last_name, username, pw, creation_date) VALUES (?, ?, ?, ?, ?, date('now'));"
    try:
        cursor.execute(query, (profile.email, profile.first_name, profile.last_name, profile.username, profile.pw))
        conn.commit()
        return {"success": "profile created"}
    except:
        return {"error": "profile not created"}