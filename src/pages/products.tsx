import styles from "../styles/products.module.scss";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { useCategory } from "../hooks/useCategory";
import { Product, useProducts } from "../hooks/useProducts";
import { optionsCategory } from "../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../components/Button/Button";
import ListProducts from "../components/ListProducts/ListProducts"; 
import Modal from "../components/Modal/Modal";
import Select from "../components/Select/Select";
import ProductForm from "../components/ProductForm/ProductForm";


export default function products() {
  const { products, filterProducts, addOrEditProduct, removeProduct } = useProducts();
  const { getCategoryLabel, selectedCategory, handleCategory } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [highlightedProduct, setHighlightedProduct] = useState<{ code: string; type: "add" | "edit" | "delete" } | null>(null);

  const notifyAddProduct = () => toast.success("Produto adicionado!");
  const notifyEditProduct = () => toast.success("Produto editado!");


  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = (productData: Product) => {
    const productWithVariations = {
      ...productData,
      variations: productData.variations || [],
    };
    addOrEditProduct(productWithVariations, editingProduct || undefined);

  
    setHighlightedProduct({
      code: productWithVariations.code,
      type: editingProduct ? "edit" : "add",
    });
    setTimeout(() => {
      setHighlightedProduct(null); 
    }, 1000);

    if (editingProduct) {
      notifyEditProduct();
    } else {
      notifyAddProduct();
    }

    closeModal();
  };

  const handleEdit = (code: string) => {
    const productToEdit = products.find((product) => product.code === code);
    openModal(productToEdit);
  };
  const handleDelete = (code: string) => {
    removeProduct(code);

  };

  return (
    <div className={styles.listProducts}>
      <div className={styles.listProducts_header}>
        {getCategoryLabel() !== "Todas Categorias" ? (
          <h2>{getCategoryLabel()}</h2>
        ) : (
          <h2>Todos os produtos</h2>
        )}
        <div className={styles.header_buttons}>
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
            onClick={() => openModal()}
          >
            Adicionar Produto
          </Button>
        </div>
      </div>

      <div className={styles.listProducts_content}>
        <ListProducts
          products={filterProducts(selectedCategory)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          highlightedProduct={highlightedProduct} // Passa o highlightedProduct para o ListProducts
        />
      </div>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          title={editingProduct ? "Editar produto" : "Adicionar produto"}
        >
          <ProductForm
            initialData={editingProduct || undefined}
            onSubmit={handleFormSubmit}
            submitButtonLabel={
              editingProduct ? "Salvar produto" : "Adicionar Produto"
            }
          />
        </Modal>
      )}

      <ToastContainer position="bottom-left" autoClose={4500} />
    </div>
  );
}
