from dotenv import load_dotenv
load_dotenv()
from flask import Flask, jsonify, request
from supabase import create_client, Client
import os
import bcrypt
import jwt
import datetime
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

client: Client = create_client(url, key)



@app.route('/register', methods=['POST'])
def register():
    try:
        # Get data from the request
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        
        # Validate inputs
        if not name or not email or not password:
            return jsonify({"error": "All fields are required"}), 400

        # Check if the email is already registered
        res = client.table("user").select("*").eq("email", email).execute()

        if res.data:
            return jsonify({"error": "Email is already registered"}), 400

        # Create the user object
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Create the user object
        user = {
            "name": name,
            "email": email,
            "password": hashed_password  # Decode to string
        }

        # Add user to the database
        response = client.table("user").insert(user).execute()

        if not response.data or len(response.data) == 0:
            return jsonify({"error": "Something went wrong"}), 400

        # Return success response
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during registration: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500



app.config["SECRET_KEY"] = "SECRETE_KEY_ECOMM"

@app.route('/login', methods=['POST'])
def login():
    try:
        # Get data from the request
        print("Checkpoint 1")
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        email = data.get('email')
        password = data.get('password')

        # Validate inputs
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Fetch user from the database
        res = client.table("user").select("*").eq("email", email).execute()

        if not res.data or len(res.data) == 0:
            return jsonify({"error": "Invalid email or password"}), 401

        user = res.data[0]

        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            return jsonify({"error": "Invalid email or password"}), 401


        # Generate JWT token
        token = jwt.encode({
            "user_id": user["id"],
            "email": user["email"],
            "exp": datetime.datetime.now() + datetime.timedelta(hours=24)  # Token expiration
        }, app.config["SECRET_KEY"], algorithm="HS256")

        # Return success response with the token
        print(token)
        return jsonify({
            "message": "Login successful",
            "token": token
        }), 200

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500




@app.route('/register-as-seller', methods=['POST'])
def registerAsSeller():
    try:
        # Get data from the request
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        shop_name = data.get('shop_name')
        owner_name = data.get('owner_name')
        address = data.get('address')
        pincode = data.get('pincode')
        email = data.get('email')
        password = data.get('password')
        
        # Validate inputs
        if not shop_name or not email or not password or not owner_name or not address or not pincode:
            return jsonify({"error": "All fields are required"}), 400

        # Check if the email is already registered
        res = client.table("seller").select("*").eq("email", email).execute()

        if res.data:
            return jsonify({"error": "Email is already registered"}), 400

        # Create the user object
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Create the user object
        user = {
            "shop_name": shop_name,
            "email": email,
            "password": hashed_password,  # Decode to string
            "owner_name": owner_name,  # Decode to string
            "address": address,  # Decode to string
            "pincode": pincode  # Decode to string
        }

        # Add user to the database
        response = client.table("seller").insert(user).execute()

        if not response.data or len(response.data) == 0:
            return jsonify({"error": "Something went wrong"}), 400

        # Return success response
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during registration: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500



@app.route('/login-as-seller', methods=['POST'])
def loginAsSeller():
    try:
        # Get data from the request
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        email = data.get('email')
        password = data.get('password')
        # print(email, password)

        # Validate inputs
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        # Fetch user from the database
        res = client.table("seller").select("*").eq("email", email).execute()

        if not res.data or len(res.data) == 0:
            return jsonify({"error": "Invalid email or password"}), 401

        user = res.data[0]

        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
            return jsonify({"error": "Invalid email or password"}), 401


        # Generate JWT token
        token = jwt.encode({
            "user_id": user["id"],
            "email": user["email"],
            "exp": datetime.datetime.now() + datetime.timedelta(hours=24)  # Token expiration
        }, app.config["SECRET_KEY"], algorithm="HS256")

        # Return success response with the token
        print(token)
        return jsonify({
            "message": "Login successful",
            "token": token
        }), 200

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500



@app.route('/add-product', methods=['POST'])
def addProduct():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        title = data.get('title')
        price = data.get('price')
        discount = data.get('discount')
        description = data.get('description')
        stock = data.get('stock')
        company = data.get('company')
        category = data.get('category')
        img_url = data.get('img_url')

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        # print(decoded_data)
        userId = decoded_data["user_id"]


        if not title or not price or not discount or not description or not stock or not company or not category or not img_url:
            return jsonify({"error": "Email and password are required"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
        data = {
            "title": title,
            "price": price,
            "discount": discount,
            "description": description,
            "stock": stock,
            "company": company,
            "category": category,
            "img_url": img_url,
            "seller": userId
        }

        res = (
            client.table("product").insert(data).execute()
        )
        
        if not res.data or len(res.data) == 0:
            return jsonify({"error": "Something wen wrong"}), 401

        return jsonify({
            "message": "Added successful"
        }), 200

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/add-addresss', methods=['POST'])
def addAddress():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        name = data.get('name')
        address = data.get('address')
        pincode = data.get('pincode')
        mobile_number = data.get('mobile_number')

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not name or not address or not pincode or not mobile_number:
            return jsonify({"error": "Email and password are required"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
        data = {
            "name": name,
            "address": address,
            "pincode": pincode,
            "mobile_number": mobile_number,
            "user": userId
        }

        res = (
            client.table("userAddresses").insert(data).execute()
        )
        
        if not res.data or len(res.data) == 0:
            return jsonify({"error": "Something wen wrong"}), 401

        return jsonify({
            "message": "Added successful"
        }), 200

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/add-to-cart', methods=['POST'])
def addToCart():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        product = data.get('product')
        quntity = data.get('quntity')

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not product or not quntity:
            return jsonify({"error": "Email and password are required"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
        data = {
            "product": product,
            "quntity": quntity,
            "user": userId
        }

        res = (
            client.table("cart").insert(data).execute()
        )
        
        if not res.data or len(res.data) == 0:
            return jsonify({"error": "Something wen wrong"}), 401

        return jsonify({
            "message": "Added successful"
        }), 200
    


    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/make-order', methods=['POST'])
def makeOrder():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        product = data.get('product')
        quantity = data.get('quantity')
        total_price = data.get('total_price')
        status = False
        seller = data.get('seller')

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not product or not quantity or not total_price or not seller:
            return jsonify({"error": "Email and password are required"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
        data = {
            "product": product,
            "quantity": quantity,
            "seller": seller,
            "user": userId,
            "total_price": total_price,
            "status": status
        }

        res = (
            client.table("order").insert(data).execute()
        )
        
        if not res.data or len(res.data) == 0:
            return jsonify({"error": "Something wen wrong"}), 401

        return jsonify({
            "message": "Added successful"
        }), 200
    
    
    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/get-user-orders', methods=['GET'])
def getUserOrders():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401

        res = (
            client.table("order").select("*, product(*)").eq("user", userId).execute()
        )
    
        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500



@app.route('/get-seller-pending-orders', methods=['GET'])
def getSellerPendingOrders():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401

        res = (
            client.table("order").select("*, product(*)").eq("seller", userId).eq("status", False).execute()
        )
    
        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/get-seller-accepted-orders', methods=['GET'])
def getSellerAcceptedOrders():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401

        res = (
            client.table("order").select("*, product(*)").eq("seller", userId).eq("status", True).execute()
        )
    
        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500



@app.route('/get-user-cart', methods=['GET'])
def getUserCart():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401

        res = (
            client.table("cart").select("*, product(*)").eq("user", userId).execute()
        )
    
        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/get-seller-details', methods=['GET'])
def getSellerDetails():
    try:
        token = request.headers.get('Authorization')
        print(token)
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401


        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401

        res = (
            client.table("seller").select("*").eq("id", userId).execute()
        )
    
        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/get-seller-products', methods=['GET'])
def getSellerProducts():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401

        res = (
            client.table("product").select("*").eq("seller", userId).execute()
        )
    
        return jsonify({
            "message": "Fetch successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500



@app.route('/get-user-addresses', methods=['GET'])
def getUserAddresses():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401

        res = (
            client.table("userAddresses").select("*").eq("user", userId).execute()
        )
    
        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/get-product-details', methods=['GET'])
def getProductDetails():
    try:
        product_id = request.args.get('id')
        print("Product id: ", product_id)
        res = ( 
            client.table("product").select("*").eq("id", product_id).execute()
        )
    
        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

