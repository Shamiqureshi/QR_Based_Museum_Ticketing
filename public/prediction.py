import numpy as np
import pandas as pd
  
# Import the dataset
dataset = pd.read_csv('telcochurndata.csv')
  
# Glance at the first five records
dataset.head()
  
# Print all the features of the data
dataset.columns
