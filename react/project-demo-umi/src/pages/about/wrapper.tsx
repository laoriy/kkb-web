import { Outlet } from '@umijs/max';

function Wrapper() {
  return (
    <>
      <div>this is parent</div>
      <Outlet></Outlet>
    </>
  );
}

export default Wrapper;
