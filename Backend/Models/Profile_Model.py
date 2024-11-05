from pydantic import BaseModel


class Profile_Model(BaseModel):
    email: str
    first_name: str
    last_name: str
    username: str
    pw: str

