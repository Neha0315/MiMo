# -*- coding: utf-8 -*-
"""
@author: Vibha
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.pipeline import Pipeline
from sklearn.feature_selection import SelectKBest, f_regression
from sklearn.model_selection import GridSearchCV
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

class RentalScorer:
    def __init__(self):
        self.scaler = StandardScaler()
        self.model_pipeline = Pipeline([
            ('feature_selection', SelectKBest(f_regression, k=5)),
            ('regressor', RandomForestRegressor(random_state=7))
            ])
        
    def market_price_calc(self, df, row):
        similar_props = df[
            (df['beds'] == row['beds']) &
            (df['sqft'] >= row['sqft'] * 0.8) &
            (df['sqft'] <= row['sqft'] * 1.2)
            ]
        
        if len(similar_props) < 3:
            similar_props = df[df['beds'] == row['beds']]
            
        return similar_props['price_per_bed'].median()
    
    def deal_calc(self, price_ratio):
        # where 1 = more expensive than market (bad deal)
        # and 5 = cheaper than market (good deal)
        return pd.cut(price_ratio, bins=[-np.inf, -0.25, -0.1, 0.1, 0.25, np.inf], labels=[1,2,3,4,5]).astype(int)
    
    def process_data(self, df):
        df['market_price_per_bed'] = df.apply(lambda row: self.market_price_calc(df, row), axis=1)
        df['expected_price_per_bed'] = df['market_price_per_bed']
        df['price_diff_ratio'] = (df['expected_price_per_bed'] - df['price_per_bed']) / df['expected_price_per_bed']
        df['deal_score'] = self.deal_calc(df['price_diff_ratio'])
        return df
    
    def train(self, df):
        features = ['list_price', 'sqft', 'price_per_sqft_ann', 'price_per_bed', 'price_per_sqft_per_bed_ann', 'beds', 'full_baths', 'dist_to_cwru_mi']
        X = df[features]
        y = df['deal_score']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=7)
        
        param_grid = {
            'regressor__n_estimators': [100, 200, 300],
            'regressor__max_depth': [None, 10, 20],
            'regressor__min_samples_split': [2,5,10],
            'feature_selection__k': [4,5,6]
            }
        
        grid_search = GridSearchCV(estimator=self.model_pipeline,
                                   param_grid = param_grid, cv=5, scoring='r2', n_jobs=-1)
        
        grid_search.fit(X_train, y_train)
        self.model_pipeline = grid_search.best_estimator_
        
        
        train_pred = self.model_pipeline.predict(X_train)
        test_pred = self.model_pipeline.predict(X_test)
        
        #print("Best Parameters:", grid_search.best_params_)
        #print("Training R-squared: ", r2_score(y_train, train_pred))
        #print("Testing R-squared: ", r2_score(y_test, test_pred))
        
        cv_scores = cross_val_score(self.model_pipeline, X, y, cv=5, scoring='r2')
        #print("Cross-validation R-squared: ", cv_scores.mean())
        
        
    
    
    def predict(self, list_price, sqft, beds, baths, address):
        price_per_bed = list_price / beds
        price_per_sqft = (list_price * 12) / sqft
        price_per_sqft_per_bed_ann = (price_per_bed * 12) / sqft
        
        cwru_address = "11111 Euclid Ave., Cleveland, OH"
        geolocator = Nominatim(user_agent = "mimo")
        cor1 = geolocator.geocode(cwru_address)
        cor2 = geolocator.geocode(address)
        dist_to_campus = geodesic((cor1.latitude, cor1.longitude), (cor2.latitude, cor2.longitude)).miles
        
        X = pd.DataFrame([[list_price, sqft, price_per_sqft, price_per_bed, price_per_sqft_per_bed_ann, beds, baths, dist_to_campus]],
                         columns=['list_price', 'sqft', 'price_per_sqft_ann', 'price_per_bed', 'price_per_sqft_per_bed_ann', 'beds', 'full_baths', 'dist_to_cwru_mi'])
        score = self.model_pipeline.predict(X)[0]
        
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
    print(f"Deal score for new property: {score}/5")