from Models.Message_Model import Message_Model


def get_msg(conn, user_id):
    cursor = conn.cursor()
    query = "SELECT * FROM Message WHERE reciver = ? ORDER BY sent_at DESC;"
    try:
        cursor.execute(query, user_id)
        responses = cursor.fetchall()
        return_me = []
        for response in responses:
            return_me.append({
                "message_id": response[0],
                "sender_id": response[1],
                "message": response[3],
                "message_date": response[4].strftime("%m/%d/%Y")})
        return return_me
    except:
        return {"error": "messages not found"}

def get_msg(conn, reciver, sender):
    cursor = conn.cursor()
    query = "SELECT * FROM Message WHERE (reciver = ? AND sender = ?) OR (sender = ? AND reciver = ?) ORDER BY sent_at DESC"




def send_msg(conn, msg: Message_Model):
    if msg.sender_id == msg.reciver_id:
        return {"error": "can't send message to self"}
    cursor = conn.cursor()
    query = "INSERT INTO Message (sender, reciver, msg, sent_at) VALUES (?, ?, ?, GETDATE());"
    try:
        cursor.execute(query, msg.sender_id, msg.reciver_id, msg.message)
        conn.commit()
        return {'message': 'message sent'}
    except:
        return {"error": "message not sent"}
