import React, { createContext, useState, useContext } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([null]);
  const [sessionDetails, setSessionDetails] = useState([null]);
  const [link, setLink] = useState(null);

  return (
    <ProductContext.Provider value={{ productData, setProductData,sessionDetails, setSessionDetails ,link, setLink}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
