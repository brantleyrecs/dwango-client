import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ marginBottom: '50px' }}>Welcome {user.name}! </h1>
        <div className="links" style={{ marginLeft: '50px' }}>
          <div className="cards red">
            <Link passHref href="/orders/new">
              <Nav.Link>
                <p className="tip">Create New Order</p>
              </Nav.Link>
            </Link>
          </div>
          <div className="cards blue">
            <Link passHref href="/orders">
              <Nav.Link>
                <p className="tip">View Orders</p>
              </Nav.Link>
            </Link>
          </div>
          <div className="cards green">
            <Link passHref href="/revenue">
              <Nav.Link>
                <p className="tip">View Revenue</p>
              </Nav.Link>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
