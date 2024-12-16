from dotenv import load_dotenv
load_dotenv()
from flask import Flask, jsonify, request, redirect
from supabase import create_client, Client
import os
import bcrypt
import jwt
import datetime
from flask_cors import CORS
import razorpay
import datetime


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
key_id: str = os.environ.get("KEY_ID")
key_secret: str = os.environ.get("KEY_SECRETE")

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
        if not email or not password:
            return jsonify({"error": "All fields are required"}), 400

        # Check if the email is already registered
        res = client.table("user").select("*").eq("email", email).execute()

        if res.data:
            return jsonify({"error": "Email is already registered"}), 400

        # Create the user object
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Create the user object
        user = {
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


        print(email, password)
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

        cart = client.table('cart').select("*").eq("user", user['id']).execute()

        # Return success response with the token
        print("CART", cart.data)
        return jsonify({
            "message": "Login successful",
            "token": token,
            "cart": cart.data
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

        # print("IMAGE: URL::: ", img_url)

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        # print(decoded_data)
        userId = decoded_data["user_id"]

        print("CHECKPOINT 1")
        if not title or not price or not discount or not description or not stock or not company or not category or not img_url:
            return jsonify({"error": "Email and password are required"}), 400

        print("CHECKPOINT 2")
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

        # print("DATA######: ", data)
        res = (
            client.table("product").insert(data).execute()
        )
        # print("DATA######: ", res.data)

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

        # print("PRODUCT:: ", product)
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"] 

        # Validate inputs
        if not product or not quntity:
            return jsonify({"error": "Invalid product"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
        data = {
            "product": product,
            "quntity": quntity,
            "user": userId
        }
        
        res = client.table("cart").select("*").eq("user", userId).execute()
        data2 = res.data 


        print("DATA:::", data2)

        found = None
        for item in data2:
            if item["id"] == product:
                found = item
                break


        if found:
            neQ = found["quntity"]+1
            client.table('cart').update({"quntity": neQ}).eq("id", found["id"]).execute()
        else:
            print("INT ELSES")
            client.table("cart").insert(data).execute()


        res = client.table("cart").select("*").eq("user", userId).execute()

        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500

@app.route('/clear-cart', methods=['POST'])
def clearCart():
    try:
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"] 

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
                
        client.table('cart').delete().eq("user", userId).execute()
        print("CECKPOINT ####")
        return jsonify({
            "message": "Clear successful"
        }), 200

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/remove-from-cart', methods=['POST'])
def removeFromCart():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        id = data.get('id')

        if not id:
            return jsonify({"error": "Invalid cart product"}), 400

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"] 

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
        data = client.table('cart').select("*").eq("id", id).execute()
        found = data.data[0]

        if found['quntity'] == 1:
            client.table('cart').delete().eq("id", id).execute()
        elif found['quntity'] > 1:
            client.table('cart').update({"quntity": found["quntity"] - 1}).eq("id", id).execute()
        else: return jsonify({"error": "Something went wrong"}), 500

        res = client.table('cart').select("*").eq("user", userId).execute()

        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500




@app.route('/pay', methods=['POST'])
def pay():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        productId = data.get('productId')
        addressId = data.get('addressId')
        
        razorpayClient = razorpay.Client(auth=(key_id, key_secret))

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not productId or not addressId:
            return jsonify({"error": "porduct and address are required"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
        productDetails = client.table("product").select("*").eq("id", productId).execute()
        productDet = productDetails.data[0]

        addressDetails = client.table("userAddresses").select("*").eq("id", addressId).execute()
        addressDet = addressDetails.data[0]

        price = productDet["price"] - (productDet["price"] * productDet["discount"]/100)
        tax = 50
        data = {
            "amount": price + tax,
            "currency": "INR",
            "receipt": "#11"
        }

        payment = razorpayClient.order.create(data=data)


    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/create_order', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400

    # productId = data.get('productId')
    amount = data.get('amount')
    print(amount)

    # Create an order in Razorpay
    print(key_id, key_secret)
    razorpay_client = razorpay.Client(auth=("rzp_test_Fn1yATSt8ubaAe", "viL3AcgFfgfNmVQWkM5IqVIh"))
    # print("CLIENT: ", razorpay_client)
    amount_in_paise = int(amount) * 100
    try:
        order = razorpay_client.order.create({
            "amount": amount_in_paise,
            "currency": "INR"
        })

        print(order)
        return jsonify({"order_id": order['id'], "status": "success"})
    except Exception as e:
        print(e)
        return jsonify({"error": str(e), "status": "failure"}), 500
    

@app.route('/paymentverification', methods=['POST'])
def verify_payment():
    # data = request.get_json()
    # if not data:
    #     return jsonify({"error": "Invalid JSON payload"}), 400

    # productId = data.get('productId')
    # print(f"Query Params: {request.args}")

    # razorpay_order_id = data.get('razorpay_order_id')
    # razorpay_payment_id = data.get('razorpay_payment_id')
    # razorpay_signature = data.get('razorpay_signature')

    razorpay_client = razorpay.Client(auth=(key_id, key_secret))


    try:
        # print(razorpay_order_id, razorpay_payment_id, razorpay_signature)

        # razorpay_client.utility.verify_payment_signature({
        # 'razorpay_order_id': razorpay_order_id,
        # 'razorpay_payment_id': razorpay_payment_id,
        # 'razorpay_signature': razorpay_signature
        # })


        product_id = request.args.get('productId')
        address_id = request.args.get('addressId')
        token = request.args.get('token')

        print(f"Product ID: {product_id}")
        print(f"Address ID: {address_id}")
        print(f"Token: {token}")


        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not product_id or not address_id:
            return jsonify({"error": "porduct and address are required"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        

        productDetails = client.table("product").select("*").eq("id", product_id).execute()
        productDet = productDetails.data[0]
        # print("###DATA: ", productDet)
        price = productDet["price"] - (productDet["price"] * productDet["discount"]/100)

        data = {
            "product": productDet['id'],
            "quantity": 1,
            "seller": productDet['seller'],
            "user": userId,
            "total_price": price,
            "status": False,
            "address": address_id,
            "payment": "Online"
        }

        res = (
            client.table("order").insert(data).execute()
        )
        
        if productDet['stock'] == 1:
            client.table("product").delete().eq("id", productDet['id']).execute()
        else:
            client.table("product").update({"stock": productDet['stock'] - 1}).eq("id", productDet['id']).execute()


        return redirect("http://localhost:5173/success")

    except Exception as e:
        print(e)
        return jsonify({"error": str(e), "status": "failure"}), 500
    


@app.route('/make-order', methods=['POST'])
def makeOrder():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        productId = data.get('productId')
        addressId = data.get('addressId')
        status = False

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not productId or not addressId:
            return jsonify({"error": "porduct and address are required"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
        productDetails = client.table("product").select("*").eq("id", productId).execute()
        productDet = productDetails.data[0]
        # print("###DATA: ", productDet)
        price = productDet["price"] - (productDet["price"] * productDet["discount"]/100)
        data = {
            "product": productDet['id'],
            "quantity": 1,
            "seller": productDet['seller'],
            "user": userId,
            "total_price": price,
            "status": status,
            "address": addressId,
            "payment": "COD"
        }

        res = (
            client.table("order").insert(data).execute()
        )
        
        if productDet['stock'] == 1:
            client.table("product").delete().eq("id", productDet['id']).execute()
        else:
            client.table("product").update({"stock": productDet['stock'] - 1}).eq("id", productDet['id']).execute()

        if not res.data or len(res.data) == 0:
            return jsonify({"error": "Something wen wrong"}), 401

        return jsonify({
            "message": "Order successful"
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
            client.table("order").select("*, product(*), address(*)").eq("user", userId).execute()
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
            client.table("order").select("*, product(*), address(*)").eq("seller", userId).eq("status", False).execute()
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
            client.table("order").select("*, product(*), address(*)").eq("seller", userId).eq("status", True).execute()
        )
    
        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500



@app.route('/accept-order', methods=['POST'])
def acceptOrder():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        oderId = data.get('orderId')

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"] 

        if not oderId:
            return jsonify({"error": "Order id is not given"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
                
        client.table('order').update({"status": True}).eq("id", oderId).execute()

        return jsonify({
            "message": "Clear successful"
        }), 200

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500
    
@app.route('/remove-item-from-list', methods=['POST'])
def removeItem():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        productId = data.get('productId')

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"] 

        if not productId:
            return jsonify({"error": "product id is not given"}), 400

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
                
        client.table('product').delete().eq("id", productId).execute()

        return jsonify({
            "message": "Clear successful"
        }), 200

    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/update-seller-profile', methods=['POST'])
def updateSellerProfile():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        shop_name = data.get('shop_name')
        owner_name = data.get('owner_name')
        address = data.get('address')
        pincode = data.get('pincode')
        
        # Validate inputs
        if not shop_name or not owner_name or not address or not pincode:
            return jsonify({"error": "All fields are required"}), 400

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"] 

        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
                
        client.table('seller').update({
            "shop_name": shop_name,
            "owner_name": owner_name,
            "address": address,
            "pincode": pincode 
        }).eq("id", userId).execute()

        return jsonify({
            "message": "Clear successful"
        }), 200

    except Exception as e:
        # Log the error for debugging
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

        today = datetime.datetime.utcnow().strftime('%Y-%m-%d')
        # print(today) 
        orders = client.table("order").select("*", count="exact") \
                .eq("seller", userId) \
                .gte("created_at", f"{today}T00:00:00.000Z") \
                .lt("created_at", f"{today}T23:59:59.999Z") \
                .execute()
        
        # print(orders)
    
        return jsonify({
            "message": "Added successful",
            "data": res.data,
            "count": orders.count
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


@app.route('/add-new-address', methods=['POST'])
def addNewAddress():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400
        
        name = data.get("name")
        address = data.get("address")
        mobile = data.get("mobile")
        pincode = data.get("pincode")

        if not name or not address or not mobile or not pincode:
            return jsonify({"error": "All fields required"}), 400

        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Un-authorised request"}), 401

        decoded_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])

        userId = decoded_data["user_id"]

        # Validate inputs
        if not userId:
            return jsonify({"error": "Un-authorised request"}), 401
        
        data = {
            "name": name,
            "address": address,
            "pincode": pincode,
            "mobile_number": mobile,
            "user": userId
        }

        client.table("userAddresses").insert(data).execute()
        
        return jsonify({
            "message": "Added successful"
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
        print(res.data)
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
        # print("Product id: ", product_id)
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


@app.route('/product/search', methods=['GET'])
def seachProduct():
    try:
        query = request.args.get('q')
        # print("Product id: ", product_id)
        res = (
            client.table("product")
            .select("*")
            .or_(
                f"title.ilike.%{query}%,description.ilike.%{query}%,category.ilike.%{query}%,company.ilike.%{query}%"
            )
            .limit(20)
            .execute()
        )
    
        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/get-products', methods=['GET'])
def getProducts():
    try:
        res = ( 
            client.table("product").select("*").limit(20).execute()
        )

        return jsonify({
            "message": "Added successful",
            "data": res.data
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500

@app.route('/get-invoice-details', methods=['GET'])
def getInvoiceDetails():
    try:
        orderId = request.args.get('orderId')

        if not orderId:
            return jsonify({"error": "Invalid order id"}), 400
        

        res = ( 
            client.table("order").select("*, seller(*), product(*), address(*)").eq("id", orderId).execute()
        )

        # print(res.data[0])

        # user = res.data[0]['user']

        # userAds = client.table("userAddresses").select("*").eq("user", user).execute()
        # print(userAds.data[0])

        return jsonify({
            "message": "Added successful",
            "order": res.data[0],
            # "user": userAds.data[0]
        }), 200
    
    except Exception as e:
        app.logger.error(f"Error during login: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

