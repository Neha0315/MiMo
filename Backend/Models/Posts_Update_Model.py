from pydantic import BaseModel


class Posts_Update_Model(BaseModel):
    post_id: int
    title: str
    about: str
    bedroom: int
    bathroom: int
    shared: bool
    addr: str
    listed_price: int
