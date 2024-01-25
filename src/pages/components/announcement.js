import styles from "@/styles/Announcement.module.css";

export default function ({ datass }) {
  return (
    <div className={styles.container}>
      {datass?.length === 0 ? (
        <div>No data</div>
      ) : (
        datass?.map((data) => (
          <div className={styles.announcement}>
            <img
              src={data.image}
              height={100}
              width={400}
            />
          </div>
        ))
      )}
    </div>
  );
}
