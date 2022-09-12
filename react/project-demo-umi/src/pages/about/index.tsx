import { history } from '@umijs/max';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import styles from './index.less';
export default function Page() {
  const params = useParams();
  console.log(params);
  const jump = () => {
    history.push('/about/detail');
  };
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button onClick={jump}>to detail</Button>
    </div>
  );
}
