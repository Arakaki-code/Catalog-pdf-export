import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CategoryOption, useCategory } from "../hooks/useCategory";

import styles from "../styles/category.module.scss";
import ListCategory from "../components/ListCategory/ListCategory";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import CategoryForm from "../components/CategoryForm/CategoryForm";

export default function Category() {
  const { categories, addCategory, editedCategory } = useCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption | null>(null);

  const openModal = (category?: CategoryOption) => {
    setSelectedCategory(category || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleEdit = (code: string) => {
    const categoryToEdit = categories.find((cat) => cat.code === code);

    if (categoryToEdit) {
      setSelectedCategory({ ...categoryToEdit });
      openModal(categoryToEdit);
    } else {
      console.error("Categoria não encontrada para edição.");
      console.error("Codigo ", categories.find((cat) => cat.code === code));
    }
  };

  const handleFormSubmit = (categoryData: CategoryOption) => {
    if (selectedCategory?.code) {
      // Atualiza a categoria existente
      editedCategory(selectedCategory.code, categoryData);
      const updatedCategory = categories.find(
        (cat) => cat.code === selectedCategory.code
      );
      setSelectedCategory(updatedCategory || null); // Atualiza o estado com a categoria editada
    } else {
      // Adiciona uma nova categoria
      addCategory(categoryData);
    }
    closeModal();
  };

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
        onDelete={(code) => console.log("Deletar", code)}
      />

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          title={selectedCategory ? "Editar Categoria" : "Adicionar Categoria"}
        >
          <CategoryForm
            initialCategory={selectedCategory || undefined}
            onSubmit={handleFormSubmit}
            submitButtonLabel={
              selectedCategory ? "Salvar Alterações" : "Adicionar Categoria"
            }
          />
        </Modal>
      )}
    </div>
  );
}
