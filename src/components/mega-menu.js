import Image from "next/image";
import styles from "@/styles/MegaMenu.module.css";
import Link from "next/link";

export default function MegaMenu({ datass }) {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        {datass?.length === 0 ? (
          <div>Loading...</div>
        ) : (
          datass.slice(0, 6)?.map((data) => (
            <div key={data.id} className={styles.wrapper}>
              <Link href={`categoryproduct/${data.id}/`}>
                <Image
                  className={styles.productImage}
                  src={data.image}
                  alt="image"
                  width={80}
                  height={80}
                />
              </Link>
              <span className={styles.productName}>{data.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
