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