interface CategoryProps {
  params: {
    categories: string[],
    searchParams?: string,
  };
}

export default function Category(props: CategoryProps) {
  const { categories } = props.params;
  return <h1> Categoria Dinamica : {categories}</h1>;
}
