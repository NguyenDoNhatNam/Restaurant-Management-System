from django.urls import path 
from restaurant_app.views import * 
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
router = DefaultRouter()

router.register(r'management_employee', ManagementEmployeeViewset , basename = 'management_employee')
router.register(r'management_product', ManagementProduct , basename = 'management_product')
router.register(r'feedback', FeedBackFromCustomerViewset , basename = 'feedback')
router.register(r'show_item', ShowItemIntoMenu , basename = 'show_item')
router.register(r'customer_booking', CustomerBookingViewset , basename = 'customer_booking')
router.register(r'cart', CartViewSet , basename = 'cart')


urlpatterns = [

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('customer_register', CustomerRegister.as_view(), name='customer_register' ), 
    path('manager_register', CreateManagerAccount.as_view(), name='manager_register' ),
    path('orders', OrderCreateView.as_view(), name='order'),
    path('history/<str:pk>/', AddOrderInOrderHistory.as_view(), name='history'),
    path('cart-detail/', CartDetailView.as_view(), name='cart-detail'),
]

urlpatterns += router.urls
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)