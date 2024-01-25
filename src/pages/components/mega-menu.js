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
          datass?.map((data) => (
            <div key={data.id} className={styles.wrapper}>
              <Link href = {`categoryproduct/${data.id}/`}>
              <Image
                src={data.image}
                alt="image"
                width={80}
                height={80}
              />
              </Link>
              <span>{data.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
