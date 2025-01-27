import styles from '../dashboard.module.css';
import { IoSettingsOutline } from "react-icons/io5";
import Link from 'next/link';

function SideBar(props) {
  // console.log('Props sidebar:', props);
  const username = props.username;
  // console.log('Username sidebar:', username);
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        {/* <ul className={styles.sidebarTop}>
          <Link className={styles.link} href={`/onboarding?username=${username}`}>
          <li className={styles.sidebarListItems}>Onboarding</li>
          </Link>
          <Link className={styles.link} href={`/onboarding?username=${username}`}>
          <li className={styles.sidebarListItems}>History</li>
          </Link>
        </ul> */}
      </div> 
      <div className={styles.sidebarBottom}>
        <Link className={styles.link} href={`/onboarding?username=${username}`}>
        <ul className={styles.sidebarBottom}>
          <IoSettingsOutline className={styles.sidebarListIcons} />
          <li className={styles.sidebarListItems}></li>
          <li className={styles.sidebarListItems}>Set Up</li>
        </ul>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
