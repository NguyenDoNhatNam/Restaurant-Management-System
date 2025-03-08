from django.contrib.auth.models import Group
from rest_framework import permissions

def _is_in_group(user, group_name):
    if user.is_authenticated and user.group:
        return user.group.name == group_name
    return False

    
def _has_group_permission(user, required_groups):
    return any(_is_in_group(user, group) for group in required_groups)

class IsLoggedInUserOrManager(permissions.BasePermission): 
    required_groups = ['manager']
    
    def has_object_permission(self, request,view, obj):
        has_group_permission = _has_group_permission(request.user, self.required_groups)
        if self.required_groups in None: 
            return False
        return obj == request.user or has_group_permission
    
class IsAdminUser(permissions.BasePermission):
    required_groups = ['admin']
    
    def has_permission(self, request , view): 
        has_group_permission = _has_group_permission(request.user, self.required_groups)
        return request.user and has_group_permission
    
    def has_object_permission(self, request , view , obj): 
        has_group_permission = _has_group_permission(request.user,self.required_groups)
        return request.user and has_group_permission

# class IsAdminOrAnonymousUser(permissions.BasePermission): 
#     required_groups = ['admin','anonymous']
    
#     def has_permission(self, request, view):
#         has_group_permission = _has_group_permission(request.user, self.required_groups)
#         return request.user and has_group_permission
    
class IsManagerUser(permissions.BasePermission):
    required_groups = ['manager']
    
    def has_permission(self, request, view):
        has_group_permission = _has_group_permission(request.user, self.required_groups)
        print(f"User: {request.user}, Has Group Permission: {has_group_permission}") 
        return request.user and has_group_permission
    
    def has_object_permission(self, request, view, obj):
        has_group_permission = _has_group_permission(request.user, self.required_groups)
        return request.user and has_group_permission
    
    
class IsLoginManagerOrCustomer(permissions.BasePermission):
    required_groups = ['manager','customer']
    
    def has_permission(self, request, view):
        has_group_permission = _has_group_permission(request.user, self.required_groups)
        print(f"User: {request.user}, Has Group Permission: {has_group_permission}") 
        return request.user and has_group_permission
    
    def has_object_permission(self, request, view, obj):
        has_group_permission = _has_group_permission(request.user, self.required_groups)
        return request.user and has_group_permission
    