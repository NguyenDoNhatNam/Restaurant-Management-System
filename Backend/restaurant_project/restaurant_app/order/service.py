from ..models import OrderHistory , CustomerAccount


def archive_order(order):
    order_history = OrderHistory.objects.create(
        customer=CustomerAccount.objects.get(id=order.customer.id), 
        total_price = float(order.total_price),
        status = order.status,
        items = [
            {
                "menu_item": item.menu_item.food_name,  
                "quantity": item.quantity,
                "price": float(item.price),
            }
            for item in order.items.all()
        ]
    )
    order.delete()
    return order_history