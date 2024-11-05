from pydantic import BaseModel


class Message_Model(BaseModel):
    sender_id: int
    reciver_id: int
    message: str

