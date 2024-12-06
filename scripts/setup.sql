CREATE TABLE 'events' (
  id UUID,
  topic SYMBOL capacity 256 CACHE,
  amount INT,
  timestamp TIMESTAMP
) timestamp (timestamp) PARTITION BY DAY;