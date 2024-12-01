# -*- coding: utf-8 -*-
"""
@author: Vibha
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

class RentalScorer:
    def __init__(self):
        self.scaler = StandardScaler()
        self.model = RandomForestRegressor(n_estimators=100, random_state=7)
    
    def market_price_calc(self, df, row):
        similar_props = df[
            (df['beds'] == row['beds']) &
            (df['sqft'] >= row['sqft'] * 0.8) &
            (df['sqft'] <= row['sqft'] * 1.2)
            ]
        
        if len(similar_props) < 3:
            similar_props = df[df['beds'] == row['beds']]
            
        return similar_props['price_per_sqft_ann'].median()
    
    def deal_calc(self, price_ratio):
        # where 1 = more expensive than market (bad deal)
        # and 5 = cheaper than market (good deal)
        return pd.cut(price_ratio, bins=[-np.inf, -0.2, -0.1, 0.1, 0.2, np.inf], labels=[1,2,3,4,5]).astype(int)
    
    def process_data(self, df):
        df['market_price_per_sqft_ann'] = df.apply(lambda row: self.market_price_calc(df, row), axis=1)
        df['expected_price_ann'] = df['market_price_per_sqft_ann'] * df['sqft'] / 12
        df['price_diff_ratio'] = (df['expected_price_ann'] - df['list_price']) / df['expected_price_ann']
        df['deal_score'] = self.deal_calc(df['price_diff_ratio'])
        return df
    
    def train(self, df):
        features = ['list_price', 'sqft', 'price_per_sqft_ann', 'beds', 'full_baths', 'dist_to_cwru_mi']
        X = df[features]
        y = df['deal_score']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=7)
        self.scaler.fit(X_train)
        X_train_scaled = self.scaler.transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        self.model.fit(X_train_scaled, y_train)
        
        train_pred = self.model.predict(X_train_scaled)
        test_pred = self.model.predict(X_test_scaled)
        
        print("Training R-squared: ", r2_score(y_train, train_pred))
        print("Testing R-squared: ", r2_score(y_test, test_pred))
    
    
    def predict(self, list_price, sqft, beds, baths, address):
        price_per_sqft = (list_price * 12) / sqft
        cwru_address = "11111 Euclid Ave., Cleveland, OH"
        
        geolocator = Nominatim(user_agent = "mimo")
        cor1 = geolocator.geocode(cwru_address)
        cor2 = geolocator.geocode(address)
        dist_to_campus = geodesic((cor1.latitude, cor1.longitude), (cor2.latitude, cor2.longitude)).miles
        
        X = pd.DataFrame([[list_price, sqft, price_per_sqft, beds, baths, dist_to_campus]],
                         columns=['list_price', 'sqft', 'price_per_sqft_ann', 'beds', 'full_baths', 'dist_to_cwru_mi'])
        X_scaled = self.scaler.transform(X)
        score = self.model.predict(X_scaled)[0]
        
        return int(round(score))
    

if __name__ == "__main__":
    
    data = pd.read_csv("./ClevelandRentalsPast90Days.csv")
    scorer = RentalScorer()
    prep_data = scorer.process_data(data)
    scorer.train(prep_data)
    
    new_prop = {
        'list_price': 800,
        'sqft': 750,
        'beds': 2,
        'full_baths': 2,
        'address': '1681 East 116th St., Cleveland, OH'
        }
    
    score = scorer.predict(new_prop['list_price'],
                           new_prop['sqft'],
                           new_prop['beds'],
                           new_prop['full_baths'],
                           new_prop['address'])
    print(f"Deal score for new prop: {score}/5")