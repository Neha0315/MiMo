from pydantic import BaseModel

class Posts_Model(BaseModel):
    poster_id: int
    about: str
    bedroom: int
    bathroom: int
    shared: bool
    addr: str
    listed_price: int



