from questdb.ingress import Sender, IngressError, TimestampNanos
from datetime import datetime, timedelta
import os
import sys
import random
import time
import uuid

def weekend_bernouli(timestamp):
    chance = 0.75 if timestamp.weekday() < 5 else 0.1
    return 1 if random.uniform(0,1) < chance else 0


HOST = os.getenv('QDB_CLIENT_HOST', 'localhost')
PORT = os.getenv('QDB_CLIENT_PORT', 9009)
TLS = os.getenv('QDB_CLIENT_TLS', "False" ).lower() in ('true', '1', 't')
AUTH_KID = os.getenv('QDB_CLIENT_AUTH_KID', '')
AUTH_D = os.getenv('QDB_CLIENT_AUTH_D', '')
AUTH_X = os.getenv('QDB_CLIENT_AUTH_X', '')
AUTH_Y = os.getenv('QDB_CLIENT_AUTH_Y', '')
conf = "http::addr=localhost:9000;username=admin;password=quest;"

MILLIS_IN_DAY = 86400000
DAYS_BACK = 300

def send():
    now = datetime.now()
    try:
        auth = None
        if AUTH_KID and AUTH_D and AUTH_X and AUTH_Y:
            sys.stdout.write(f'Ingestion using credentials\n')
            auth = ( AUTH_KID, AUTH_D, AUTH_X, AUTH_Y )
        with Sender.from_conf(conf) as sender:
            for i in range(DAYS_BACK):
                current_date = now - timedelta(days=i)
                roll = weekend_bernouli(current_date)
                if roll == 1:
                    sender.row(
                        'events',
                        symbols={'topic': 'fake_topic'},
                        columns={
                            "amount": roll,
                            "timestamp": int(current_date.timestamp() * 1000000000), # questdb does microseconds
                            "id": str(uuid.uuid4())
                        },
                        at=TimestampNanos.now()
                    )
            sender.flush()
            sys.stdout.write(f'sent : {DAYS_BACK} rows\n')
    except IngressError as e:
        sys.stderr.write(f'Got error: {e}')

if __name__ == '__main__':
    send()
