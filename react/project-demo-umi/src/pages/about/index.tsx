import { useParams } from 'react-router-dom';
import styles from './index.less';
export default function Page() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
