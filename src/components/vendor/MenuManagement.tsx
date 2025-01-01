import { useState, useEffect } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { updateMenuItemOrder } from './menu/menuItemOperations';
import { LoadingState } from '../shared/LoadingState';
import { MenuManagementHeader } from './menu/MenuManagementHeader';
import { MenuItemGrid } from './menu/MenuItemGrid';
import { CategoryManagement } from './menu/CategoryManagement';
import { MenuItemDialog } from './menu/components/MenuItemDialog';
import { useMenuItems } from './menu/hooks/useMenuItems';
import { useMenuItemForm } from './menu/hooks/useMenuItemForm';
import { supabase } from "@/integrations/supabase/client";

export function MenuManagement() {
  const session = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { menuItems, loading, loadMenuItems, handleDeleteMenuItem } = useMenuItems();
  const {
    selectedImage,
    setSelectedImage,
    editingItem,
    setEditingItem,
    formData,
    setFormData,
    resetForm,
    handleSubmit,
  } = useMenuItemForm(() => {
    setIsDialogOpen(false);
    loadMenuItems();
  });

  useEffect(() => {
    // Subscribe to menu items changes
    const menuChannel = supabase
      .channel('menu-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'menu_items' 
        },
        (payload) => {
          console.log('Menu item change detected:', payload);
          loadMenuItems();
        }
      )
      .subscribe();

    // Subscribe to category changes
    const categoryChannel = supabase
      .channel('category-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'menu_categories' 
        },
        (payload) => {
          console.log('Category change detected:', payload);
          loadMenuItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(menuChannel);
      supabase.removeChannel(categoryChannel);
    };
  }, [loadMenuItems]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] overflow-y-auto">
      <MenuManagementHeader
        onAddClick={() => {
          setEditingItem(null);
          resetForm();
          setSelectedImage(null);
        }}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
      
      <CategoryManagement />

      <MenuItemDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        onSubmit={(data) => handleSubmit(data, session?.user?.id!)}
      />

      <MenuItemGrid
        items={menuItems}
        onEdit={(item) => {
          setEditingItem(item);
          setFormData({
            name: item.name,
            name_ko: item.name_ko || '',
            description: item.description || '',
            description_ko: item.description_ko || '',
            price: item.price.toString(),
            quantity_limit: item.quantity_limit ? item.quantity_limit.toString() : '',
            is_available: item.is_available,
            category_id: item.category_id || undefined,
          });
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteMenuItem}
        onReorder={updateMenuItemOrder}
      />
    </div>
  );
}