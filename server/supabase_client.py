import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

def get_client():
    client: Client = create_client(url, key) 
    print("Connected to database....")
    return client
