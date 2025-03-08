const SidebarItem = ({ icon: Icon, label, isOpen }) => (
    <div className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200">
        <Icon className="h-6 w-6 text-gray-600" />
        {isOpen && <span className="text-gray-700">{label}</span>}
    </div>
)

export default SidebarItem
