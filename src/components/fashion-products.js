import styles from "@/styles/FashionProducts.module.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function FashionProducts({ datass }) {
  const router = useRouter();
  const FashionProducts = () => {
    router.push("/fashion-product-page");
  };
  return (
    <div className={styles.container}>
      <div className={styles.fasionProducts}>
        <div className={styles.nextBtnWrapper}>
          <h3 className={styles.productTitle}>PRODUCTS</h3>
          <button className={styles.nextBtn} onClick={FashionProducts}>
            <NavigateNextIcon />
          </button>
        </div>
        <div className={styles.productsWrapper}>
          {datass?.length === 0 ? (
            <div>No data</div>
          ) : (
            datass.slice(6)?.map((data) => (
              <Card
                key={data.id}
                className={styles.card}
                sx={{ maxWidth: 345 }}
              >
                <CardActionArea>
                  <Link href={`categoryproduct/${data.id}/`}>
                    <CardMedia
                      component="img"
                      image={data.image}
                      style={{height:"90px",objectFit:"contain"}}
                      alt="image"
                      className={styles.productImage}
                    />
                  </Link>
                  <CardContent className={styles.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{fontSize:"14px"}}
                      className={styles.productName}
                    >
                      {data.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="green"
                      className={styles.productDiscount}
                    >
                      {data.discount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
