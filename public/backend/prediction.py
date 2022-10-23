import numpy as np
import pandas as pd
  
# Import the dataset
dataset = pd.read_csv('pets.csv')
  
# Glance at the first five records
print(dataset.head())
  
# Print all the features of the data
dataset.columns
print(dataset['user_mobile'].value_counts())
print(dataset.groupby('no_of_persons')['user_mobile'].value_counts())

