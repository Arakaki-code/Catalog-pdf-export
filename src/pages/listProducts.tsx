import styles from "../styles/listProducts.module.scss";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";

import { useCategory } from "../hooks/useCategory";

import Button from "../components/Button/Button";
import TableProducts from "../components/TableProducts/TableProducts";
import Modal from "../components/Modal/Modal";
import Select from "../components/Select/Select";
import ProductForm from "../components/ProductForm/ProductForm";
import useProducts, { Product } from "../hooks/useProducts";

export default function ListProducts() {
  const { products, filterProducts, addOrEditProduct, removeProduct } = useProducts();
  const {
    getCategoryLabel,
    optionsCategory,
    selectedCategory,
    handleCategory,
  } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);


  const openModal = (product?: Product) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleFormSubmit = () => {
    
    closeModal();
  };

  const handleEdit = (code: string) => {
    const productToEdit = products.find(product => product.code === code);
    openModal(productToEdit);
  };

  const handleDelete = (code: string) => {
    console.log(`Excluindo produto: ${code}`);
    removeProduct(code);
  };

  return (
    <div className={styles.listProducts}>
      <div className={styles.listProducts_header}>
        {getCategoryLabel() !== "Todas Categorias" ? <h2>{getCategoryLabel()}</h2> : <h2>Todos os produtos</h2>}
        <div className={styles.listProducts_buttons}>
          <Select
            options={optionsCategory}
            value={selectedCategory}
            onChange={handleCategory}
            placeholder={getCategoryLabel()}
            icon={<MdCategory />}
          />

          <Button
            btnStyle={"primary"}
            icon={<FaPlus />}
            className={styles.button_add_product}
            onClick={openModal}
          >
            Adicionar Produto
          </Button>
        </div>
      </div>

      <div className={styles.listProducts_content}>
      <TableProducts
          products={filterProducts(selectedCategory)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ProductForm
            initialData={editingProduct || undefined}
            onSubmit={handleFormSubmit}
            submitButtonLabel={editingProduct ? 'editar' : 'Adicionar'}
          />
        </Modal>
      )}
    </div>
  );
}
