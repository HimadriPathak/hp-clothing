import { FC, memo } from "react";
import { CategoryItem } from "../../store/categories/categories.types";
import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  Preview,
  Title,
} from "./category-preview.styles";
type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};
const CategoryPreview: FC<CategoryPreviewProps> = memo(
  ({ title, products }) => {
    return (
      <CategoryPreviewContainer>
        <h2>
          <Title to={title}>{title.toUpperCase()}</Title>
        </h2>
        <Preview>
          {products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Preview>
      </CategoryPreviewContainer>
    );
  }
);

export default CategoryPreview;
