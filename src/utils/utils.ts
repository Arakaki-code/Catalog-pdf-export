
export const optionsCategory = [
    { value: "", label: "Todas Categorias" },
    { value: "eletrica", label: "Elétrica" },
    { value: "hidraulica", label: "Hidráulica" },
  ];

  export const optionsUnit = [
    { value: "Unid", label: "Unidade" },
    { value: "Pçs", label: "Peça" },
    { value: "kg", label: "Kilo" },
    { value: "Lts", label: "Litro" },
  ];

  export const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const parsedValue = numericValue ? parseFloat(numericValue) / 100 : 0; 
    return parsedValue.toFixed(2).replace(".", ",");
  };

  export const generateUniqueCode = () => `${Math.random().toString(36).substring(2, 10)}`;