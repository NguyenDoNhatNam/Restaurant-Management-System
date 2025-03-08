from django.db import models
from django.contrib.auth.models import AbstractBaseUser  , PermissionsMixin , Group
from restaurant_app.manager import *
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid
from cloudinary.models import CloudinaryField
class BaseUser(AbstractBaseUser , PermissionsMixin):
    username = None
    email = models.CharField(max_length= 50, unique=True )
    group = models.ForeignKey(Group , on_delete=models.CASCADE, default=None)
    is_verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField( default= False ) 
    is_active = models.BooleanField( default= False ) 
    is_staff = models.BooleanField( default= False ) 
    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = []  
    objects = UserManager()
    
    
    
    @property
    def name(self):
        return self.first_name + ' ' + self.last_name

    def __str__(self):
        return self.email

    def token(self):
        pass
# CustomerAccount model
class CustomerAccount(BaseUser):
    first_name = models.CharField(max_length=255 , null = False)
    last_name = models.CharField(max_length= 255 , null = False)
    phone_number = models.IntegerField(validators=[MinValueValidator(10000000), MaxValueValidator(99999999999)])
    customer_name = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)
    join_date = models.DateField(auto_now_add=True)
    USERNAME_FIELD = 'email' 

    objects = CustomerManager()

    def __str__(self):
        return f"Customer: {self.email}"

# ManagerAccount model
class ManagerAccount(BaseUser):
    first_name = models.CharField(max_length=255 , null = False)
    last_name = models.CharField(max_length= 255 , null = False)
    manager_fullname = models.CharField(max_length=255 , null = False)
    address = models.CharField(max_length=255, null=False)
    phone_number = models.IntegerField(validators=[MinValueValidator(100000000), MaxValueValidator(9999999999)])
    start_date = models.DateTimeField(auto_now_add=True)
    
    objects = UserManager()

    def __str__(self):
        return f"Manager: {self.email}"


class EmployeeInformation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4 , editable=False)
    manager = models.ForeignKey(
        ManagerAccount,
        on_delete=models.CASCADE,
        related_name="employee"
        )
    image = CloudinaryField('image')
    employee_name = models.CharField(max_length=255 , null=False)
    role =  models.CharField(max_length=50, null= False)
    email = models.CharField(max_length= 50, unique=True )
    phone =  models.IntegerField(validators=[MinValueValidator(100000000), MaxValueValidator(9999999999)])
    salary = models.DecimalField(max_digits=10 , decimal_places=2)
    start_date = models.DateField(max_length=20 , null=False)
    
    
    
class CustomerBookingInformation(models.Model):
    
    customer = models.ForeignKey(
        CustomerAccount , 
        on_delete=models.CASCADE,
        related_name="Bookings"
    )
    email = models.CharField(max_length= 50 , null = False)
    customer_name = models.CharField(max_length= 255 , null = False ) 
    phone_number = models.IntegerField(validators=[MinValueValidator(100000000), MaxValueValidator(9999999999)])
    number_of_guest = models.IntegerField()
    date = models.DateField(max_length= 20 , null = False )
    time = models.TimeField(max_length= 20 , null = False ) 
    note = models.CharField(max_length= 255 , null= True , blank = True )
    
    
class FeedbackFromCustomer(models.Model):
    customer = models.ForeignKey(
        CustomerAccount , 
        on_delete=models.CASCADE,
        related_name="Bookings"
    )
    feedback = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now=True)
    customer = models.ForeignKey(BaseUser, on_delete=models.CASCADE)
    

class MenuItems(models.Model):
    manager = models.ForeignKey(
        ManagerAccount,
        on_delete=models.CASCADE,
        related_name="item"
        )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4 , editable=False)
    image = CloudinaryField('image')
    food_name = models.CharField(max_length= 50,null = False , unique = True)
    category = models.CharField(max_length=255,null = False)
    price = models.DecimalField(max_digits=10, decimal_places=3)
    stock = models.IntegerField() 
    status = models.CharField(max_length=30, null = False)
    description = models.CharField(max_length=255, null = False)
    
class Order(models.Model):
    customer = models.ForeignKey(
        CustomerAccount,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    order_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=3, default=0.0)
    status = models.CharField(max_length=50, choices=[
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled')
    ], default='Pending')
    
    
class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )
    menu_item = models.ForeignKey(
        MenuItems,
        on_delete=models.CASCADE,
        related_name="order_items"
    )
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=3)
    
class OrderHistory(models.Model):
    customer = models.ForeignKey(
        CustomerAccount,
        on_delete=models.CASCADE,
        related_name="order_history"
    )
    order_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    total_price = models.DecimalField(max_digits=10 , decimal_places=3)
    status = models.CharField(max_length=40)
    items = models.JSONField()

class Cart(models.Model):
    customer = models.ForeignKey(
        CustomerAccount,
        on_delete=models.CASCADE,
        related_name="cart"
    )

class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items"
    )
    menu_item = models.ForeignKey(
        MenuItems,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=3)