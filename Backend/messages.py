from Models.Message_Model import Message_Model


# def get_msg(conn, user_id):
#     cursor = conn.cursor()
#     query = "SELECT * FROM Message WHERE reciver = ? ORDER BY sent_at DESC;"
#     try:
#         cursor.execute(query, user_id)
#         responses = cursor.fetchall()
#         return_me = []
#         for response in responses:
#             return_me.append({
#                 "message_id": response[0],
#                 "sender_id": response[1],
#                 "message": response[3],
#                 "message_date": response[4].strftime("%m/%d/%Y")})
#         return return_me
#     except:
#         return {"error": "messages not found"}

def get_msg(conn, receiver, sender):
    cursor = conn.cursor()
    query = """
    SELECT m.message_id, m.sender, m.msg, m.sent_at, a.username 
    FROM Message m 
    INNER JOIN Accounts a ON m.sender = a.account_id 
    WHERE (m.receiver = ? AND m.sender = ?) OR (m.sender = ? AND m.receiver = ?) 
    ORDER BY m.message_id DESC
    """
    try:
        cursor.execute(query, (receiver, sender, receiver, sender))
        responses = cursor.fetchall()
        return_me = []
        for response in responses:
            return_me.append({
                "message_id": response[0],
                "sender_id": response[1],
                "sender_username": response[4], 
                "message": response[2],
                "message_date": response[3]
            })
        return return_me
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return {"error": "messages not found"}

def send_msg(conn, msg: Message_Model):
    if msg.sender_id == msg.reciver_id:
        return {"error": "can't send message to self"}
    cursor = conn.cursor()
    query = "INSERT INTO Message (sender, receiver, msg, sent_at) VALUES (?, ?, ?, date('now'));"
    try:
        cursor.execute(query, (msg.sender_id, msg.reciver_id, msg.message))
        conn.commit()
        return {'message': 'message sent'}
    except:
        return {"error": "message not sent"}
