"use client";
import { useGetCategorySeveralQuery } from "@/redux/api/category";
import scss from "./SearchContent.module.scss";

const SearchContent = () => {
  const { data, isLoading, isError } = useGetCategorySeveralQuery();
  console.log("🚀 ~ SearchContent ~ data:", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error :(</div>;
  }

  return (
    <section className={scss.SearchContent}>
      <div className="container">
        <div className={scss.content}>
          <h3>все остальное</h3>
          <div className={scss.SearchContentBlocks}>
            {data?.categories.items.map((category) => (
              <div
                style={{
                  background: `url(${category.icons[0]?.url})`,
                  backgroundSize: "cover",
                  width: "220px",
                  height: "130px",
                  padding: "20px ",
                  cursor: "pointer",
                }}
                key={category.id}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchContent;
