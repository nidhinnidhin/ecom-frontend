import styles from "@/styles/Coopens.module.css";
import Image from "next/image";

export default function Coopens({ datass }) {
    console.log(datass)
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        {datass?.length === 0 ? (
          <div>No data</div>
        ) : (
          datass?.map((data) => (
            <div key={data.id} className={styles.card}>
              <Image
                className={styles.discountImage}
                src={data.image}
                alt="image"
                width={300}
                height={200}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
