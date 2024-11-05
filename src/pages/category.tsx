import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CategoryOption, useCategory } from "../hooks/useCategory";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../styles/category.module.scss";
import ListCategory from "../components/ListCategory/ListCategory";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import CategoryForm from "../components/CategoryForm/CategoryForm";

export default function Category() {
  const { categories, addCategory, editedCategory, removeCategory } = useCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const [highlightedCategory, setHighlightedCategory] = useState<{ code: string; type: "add" | "edit" | "delete" } | null>(null);
  
  const notifyAddCategory = () => toast.success("Categoria Adicionada!");
  const notifyEditCategory = () => toast.success("Categoria editada!");


  const openModal = (category?: CategoryOption) => {
    setSelectedCategory(category || null);
    setIsModalOpen(true);
  };

  const resetSelectedCategory = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleEdit = (code: string) => {
    try {
      const categoryToEdit = categories.find((cat) => cat.code === code);
      if (!categoryToEdit) throw new Error("Categoria não encontrada para edição.");
  
      setSelectedCategory({ ...categoryToEdit });
      openModal(categoryToEdit);
    } catch (error) {
    }
  };

  const handleDelete = (code: string) => {
    removeCategory(code)
  };


  const handleFormSubmit = (categoryData: CategoryOption) => {
    if (selectedCategory?.code) {
      editedCategory(selectedCategory.code, categoryData);
      const updatedCategory = categories.find(
        (cat) => cat.code === selectedCategory.code
      );
      setSelectedCategory(updatedCategory || null); 
    } else {
      addCategory(categoryData);
    }

    if(selectedCategory) {
      notifyEditCategory();
    } else {
      notifyAddCategory();
    }

    setHighlightedCategory({
      code: categoryData.code,
      type: selectedCategory ? "edit" : "add",
    })
    setTimeout(() => {
      setHighlightedCategory(null); 
    }, 1000);

    
    

    resetSelectedCategory();
  };

  const renderModal = () => (
    isModalOpen && (
      <Modal
        onClose={resetSelectedCategory}
        title={selectedCategory ? "Editar Categoria" : "Adicionar Categoria"}
      >
        <CategoryForm
          initialCategory={selectedCategory || undefined}
          onSubmit={handleFormSubmit}
          onCancel={resetSelectedCategory}
          submitButtonLabel={selectedCategory ? "Salvar Alterações" : "Adicionar Categoria"}
        />
      </Modal>
    )
  );
  

  return (
    <div className={styles.container_category}>

      <div className={styles.category_header}>
        <h2>Lista de Categorias</h2>
        <Button
          btnStyle="primary"
          icon={<FaPlus />}
          className={styles.button_add_product}
          onClick={() => openModal()}
        >
          Adicionar Categoria
        </Button>
      </div>

      <ListCategory
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        highlightedProduct={highlightedCategory}
      />

      {renderModal()}

      <ToastContainer
        position="bottom-left"
        autoClose={4500}
      />
    </div>
  );
}
