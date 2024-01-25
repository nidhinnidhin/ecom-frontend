import styles from "@/styles/TopDeals.module.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from 'next/router';

export default function TopDeals({ datass }) {
  const router = useRouter();
  const TopProducts = () => {
    router.push("/top-product-page")
  }
  const reDirect = () => {
    router.push('/top-product-page')
  }
  return (
    <div className={styles.container}>
      <div className={styles.topDeals}>
      <div className={styles.nextBtnWrapper}>
        <h3>Top Deals</h3>
        <button className={styles.nextBtn} onClick={TopProducts}> 
            <NavigateNextIcon />
          </button>
        </div>
        <div className={styles.productsWrapper}>
          {datass?.length === 0 ? (
            <div>No data</div>
          ) : (
            datass?.map((data) => (
              <Card className={styles.card} sx={{ maxWidth: 345 }}>
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
