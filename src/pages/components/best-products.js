import styles from "@/styles/BestProducts.module.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from 'next/router';

export default function BestProducts({ datass }) {
  const router = useRouter();
  const BestProducts = () => {
    router.push("/best-product-page")
  }
  const reDirect = () => {
    router.push('/best-product-page')
  }
  return (
    <div className={styles.container}>
      <div className={styles.bestProducts}>
        <div className={styles.nextBtnWrapper}>
          <h3>Best Products</h3>
          <button className={styles.nextBtn} onClick={BestProducts}> 
            <NavigateNextIcon />
          </button>
        </div>
        <div className={styles.productsWrapper}>
          {datass?.length === 0 ? (
            <div>No data</div>
          ) : (
            datass?.map((data) => (
              <Card
                key={data.id}
                className={styles.card}
                sx={{ maxWidth: 345 }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.image}
                    alt="image"
                    onClick={reDirect}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
