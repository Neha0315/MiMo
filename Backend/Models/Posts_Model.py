from pydantic import BaseModel


class Posts_Model(BaseModel):
    poster_id: int
    title: str
    about: str
    bedroom: int
    bathroom: int
    shared: bool
    addr: str
    sq_ft: int
    listed_price: int
