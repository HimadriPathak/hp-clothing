import { createSelector } from "reselect";
import { CategoryState } from "./categories.reducer";
import { CategoryMap } from "./categories.types";

const selectCategoryReducer = (state): CategoryState => state.categories;

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, categoryItem) => {
      const { title, items } = categoryItem;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

export const selectCategoriesError = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.error
);
