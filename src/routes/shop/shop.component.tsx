import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchCategoriesStart } from "../../store/categories/categories.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //REVIEW - thunk
    // dispatch(fetchCategoriesAsync());

    //REVIEW - saga
    dispatch(fetchCategoriesStart());
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path={":category"} element={<Category />} />
    </Routes>
  );
};

export default Shop;
