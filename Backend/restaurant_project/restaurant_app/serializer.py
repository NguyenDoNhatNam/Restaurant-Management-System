from rest_framework import serializers, validators
from django.contrib.auth.models import User
from restaurant_app.models import *

import re

# class CustomerSignUp(serializers.Serializer):
#     email = serializers.CharField(max_length = 255 )
#     password = serializers.CharField(write_only=True)
    
#     def validate_email(self , value):
#         if not (re.search(r'[^@]*@[^@]*$' , value) ):
#             raise serializers.ValidationError("Invalid email format. Please include the @ symbol.")
#         if value == "": 
#             raise serializers.ValidationError("Email cannot empty")
#         return value
    
#     def validate_password(self , value):
#         if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
#             raise serializers.ValidationError("Passwords must have at least one special character")
#         if not any(char.isdigit() for char in value):
#             raise serializers.ValidationError("Passwords must have at least one number")
#         if not any(char.isupper() for char in value):
#             raise serializers.ValidationError("Passwords must have at least one upper character")
#         if any(char.isspace() for char in value):
#             raise serializers.ValidationError("Passwords cannot have spaces" )
#         if not value:
#             raise serializers.ValidationError("Passwords cannot be empty") 
#         return value


 
class CustomerAccountSerializer(serializers.ModelSerializer):
    retype_password = serializers.CharField(write_only = True , required = True)

    class Meta:
        model = CustomerAccount
        fields = ('email', 'password', 'last_name', 'first_name','address','retype_password','phone_number')
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def validate_password(self, value):
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Passwords must have at least one special character")
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("Passwords must have at least one number")
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError("Passwords must have at least one upper character")
        if any(char.isspace() for char in value):
            raise serializers.ValidationError("Passwords cannot have spaces" )
        if not value:
            raise serializers.ValidationError("Passwords cannot be empty") 
        return value

    def validate_email(self, value):
        if not (re.search(r'[^@]*@[^@]*$' , value) ):
            raise serializers.ValidationError("Invalid email format. Please include the @ symbol.")
        if value == "": 
            raise serializers.ValidationError("Email cannot empty")
        return value
    
    def validate(self, data):
        password = data.get('password')
        retype_password = data.get('retype_password')
        if password != retype_password:
            raise serializers.ValidationError("Password and Retype Password is not match")
        return data
    
    def create(self, validated_data):
        password = validated_data.get('password')
        email = validated_data.get('email')
        last_name = validated_data.get('last_name')
        first_name = validated_data.get('first_name')
        address = validated_data.get('address')
        phone_number = validated_data.get('phone_number')
        customer_name = f"{last_name} {first_name}"
        customer_group = Group.objects.get(name = 'customer')
        # Tạo đối tượng `CustomerAccount` với `customer_name` đã được tính toán
        user = CustomerAccount.objects.create_user(
            customer_name=customer_name,
            password=password,
            email=email,
            last_name=last_name,
            first_name=first_name,
            address=address,
            is_active=True,
            phone_number = phone_number,
            group = customer_group
        )
        return user

class EmployeeSerializer(serializers.ModelSerializer):
    manager = serializers.PrimaryKeyRelatedField(
        queryset = ManagerAccount.objects.all()
    )
    class Meta:
        model = EmployeeInformation
        fields = '__all__'
        

    def validate_email(self, value):
        if not (re.search(r'[^@]*@[^@]*$' , value) ):
            raise serializers.ValidationError("Invalid email format. Please include the @ symbol.")
        if value == "": 
            raise serializers.ValidationError("Email cannot empty")
        return value

class MangerAccountSerializer(serializers.ModelSerializer):
    retype_password = serializers.CharField(write_only = True , required = True)
    class Meta:
        model = ManagerAccount
        fields = ('email','password','first_name','last_name','address','phone_number','retype_password','manager_fullname')
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def validate_password(self, value):
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Passwords must have at least one special character")
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("Passwords must have at least one number")
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError("Passwords must have at least one upper character")
        if any(char.isspace() for char in value):
            raise serializers.ValidationError("Passwords cannot have spaces" )
        if not value:
            raise serializers.ValidationError("Passwords cannot be empty") 
        return value

    def validate_email(self, value):
        if not (re.search(r'[^@]*@[^@]*$' , value) ):
            raise serializers.ValidationError("Invalid email format. Please include the @ symbol.")
        if value == "": 
            raise serializers.ValidationError("Email cannot empty")
        return value
    
    def validate(self, data):
        password = data.get('password')
        retype_password = data.get('retype_password')
        if password != retype_password:
            raise serializers.ValidationError("Password and Retype Password is not match")
        return data
    
    
    def create(self, validated_data):
        password = validated_data.get('password')
        email = validated_data.get('email')
        last_name = validated_data.get('last_name')
        first_name = validated_data.get('first_name')
        address = validated_data.get('address')
        phone_number = validated_data.get('phone_number')
        manager_fullname = validated_data.get('manager_fullname')
        manage_group , create_group = Group.objects.get_or_create(name = 'manager')

        user = ManagerAccount.objects.create_user(
            manager_fullname=manager_fullname,
            password=password,
            email=email,
            last_name=last_name,
            first_name=first_name,
            address=address,
            phone_number = phone_number, 
            is_active=True , 
            group = manage_group
            )
        return user
    
class CustomerBookingInfoSerializer(serializers.ModelSerializer):   
    customer = serializers.PrimaryKeyRelatedField(
        queryset = CustomerAccount.objects.all()
    )
    class Meta:
        model = CustomerBookingInformation
        fields = '__all__'
        extra_kwargs = {
            'note': {'required': False},
        }
    def create(self, validated_data):
        customer_id = validated_data.pop('customer')
        customer = CustomerAccount.objects.get(pk=customer_id)
        booking = CustomerBookingInformation.objects.create(
            customer=customer, 
            **validated_data  
        )
        return booking


class FeedbackFromcustomerSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(
        queryset = CustomerAccount.objects.all() 
    )
    class Meta:
        model = FeedbackFromCustomer
        fields = ('feedback','customer')
        read_only_fields = ['customer']

class MenuItemSerializer(serializers.ModelSerializer):
    manager = serializers.PrimaryKeyRelatedField(
        queryset = ManagerAccount.objects.all()
    )
    class Meta:
        model = MenuItems
        fields = '__all__'
        
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta: 
        model = OrderItem
        fields = ('menu_item','quantity')
        
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many = True, write_only = True )
    customer = serializers.PrimaryKeyRelatedField(
        queryset = CustomerAccount.objects.all() 
    )
    class Meta: 
        model = Order
        fields = ('customer','total_price','status','items')
        
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        total_price = 0 
        
        for item_data in items_data:
            menu_item = item_data['menu_item']
            quantity = item_data['quantity']
            price = menu_item.price * quantity
            
            OrderItem.objects.create(
                order = order,
                menu_item = menu_item, 
                quantity = quantity , 
                price = price
            )
            total_price += price
            order.total_price = total_price
        order.save() 
        return order
    
    
class AddOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('menu_item', 'quantity')

    def validate(self, data):
        menu_item = data['menu_item']
        quantity = data['quantity']
        
        if quantity <= 0:
            raise serializers.ValidationError("Quantity must be greater than 0")
            
        if menu_item.stock < quantity:
            raise serializers.ValidationError("Not enough items in stock")
            
        return data
    
class CartItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer()
    class Meta:
        model = CartItem
        fields = ('menu_item', 'quantity')
        

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    customer = serializers.PrimaryKeyRelatedField(
        queryset = CustomerAccount.objects.all() 
    )
    class Meta:
        model = Cart
        fields = ('customer', 'items')

    