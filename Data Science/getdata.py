# -*- coding: utf-8 -*-
"""
@author: Vibha
"""

from homeharvest import scrape_property
from datetime import datetime
from geopy.distance import geodesic

def calc_dist(listing_coords, campus_coords):
    return geodesic(listing_coords, campus_coords).miles

def calc_price_per_bed(list_price, beds):
    if(beds == 0):
        return list_price
    else:
        return list_price / beds

if __name__ == "__main__":
    current_timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"./Rentals_Past90Dats_{current_timestamp}.csv"

    properties = scrape_property(
        location="Cleveland, OH",
        listing_type="for_rent",
        past_days=90
        )

    properties = properties.loc[properties["status"] == "FOR_RENT"]

    cwru_coords = (41.5043, -81.6084)
    properties = properties.dropna(subset=['latitude', 'longitude', 'beds'])
    
    properties["dist_to_cwru_mi"] = properties.apply(lambda row: calc_dist((row['latitude'], row['longitude']), cwru_coords), axis=1)
    properties['list_price'] = properties['list_price'].fillna((properties['list_price_min'] + properties['list_price_max']) / 2)
    properties['price_per_bed'] = properties.apply(lambda row: calc_price_per_bed(row['list_price'], row['beds']), axis=1)
    properties['price_per_sqft_ann'] = properties.apply(lambda row: (row['list_price'] * 12) / row['sqft'], axis=1)
    properties['price_per_sqft_per_bed_ann'] = properties.apply(lambda row: (row['price_per_bed'] * 12) / row['sqft'], axis=1)
    properties = properties.dropna(subset = ['sqft', 'price_per_sqft_ann'])
    properties.drop(['list_price_min', 'list_price_max', 'last_sold_date', 'agent_id', 'agent_name', 'agent_email', 'agent_phones', 'agent_mls_set', 'agent_nrds_id', 'broker_id', 'broker_name', 'builder_id', 'builder_name', 'office_id', 'office_mls_set', 'office_name', 'office_email', 'office_phones', 'primary_photo','alt_photos'], axis=1, inplace=True)
    properties.to_csv("./ClevelandRentalsPast90Days.csv")
    
    