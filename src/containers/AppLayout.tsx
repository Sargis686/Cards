import React, { ReactNode, useState } from "react";  
import styles from "./MainLayout.module.scss";  

// Sidebar icons  
import sidebarTreeLogo from "../assets/sidebar-tree.svg";  
import BriefcaseLogo from "../assets/brief-case.svg?react";  
import Contractors from "../assets/contractorIcon.svg?react";  
import PeopleLogo from "../assets/people.svg?react";  
import searchLogo from "../assets/search.svg";  
import settingsLogo from "../assets/settings.svg";  
import exitLogo from "../assets/exit.svg";  

interface LayoutProps {  
  children: ReactNode;  
}  

const MainLayout: React.FC<LayoutProps> = ({ children }) => {  
  const [activeSidebarButton, setActiveSidebarButton] = useState<number>(1);  

  // Helper function for active button styling  
  const getSidebarButtonClass = (index: number) => {  
    return `${styles["expandedNavButton"]} ${  
      index === 1 ? styles["expandedNavButtonPrimary"] : ""  
    } ${  
      activeSidebarButton === index ? styles["expandedNavButtonActive"] : ""  
    }`;  
  };  

  return (  
    <div className={styles.appLayout}>  
      <aside className={styles.sideNav}>  
        <img className={styles.brandLogo} src={sidebarTreeLogo} alt="Oak Tree Logo" />  
        <div className={styles.navigationArea}>  
          <div>  
            <button className={styles.activeNavButton}>  
              <BriefcaseLogo fill="#3B3B3B" />  
            </button>  
            <button>  
              <img src={searchLogo} alt="Search" />  
            </button>  
          </div>  

          <div className={styles.sideNavFooter}>  
            <button>  
              <img src={settingsLogo} alt="Settings" />  
            </button>  
            <button>  
              <img src={exitLogo} alt="Exit" />  
            </button>  
          </div>  
        </div>  
      </aside>  

      <aside className={styles.sideNavExpanded}>  
        <div>  
          <div className={styles.expandedNavHeader}>  
            <h2>Oak Tree Cemetery</h2>  
            <h3>Process Manager</h3>  
          </div>  

          <div className={styles.expandedNavButtons}>  
            <button  
              className={getSidebarButtonClass(1)}  
              onClick={() => setActiveSidebarButton(1)}  
            >  
              <BriefcaseLogo fill="#3B3B3B" />  
              <span className={styles.expandedButtonText}>Organizations</span>  
            </button>  

            <button  
              className={getSidebarButtonClass(2)}  
              onClick={() => setActiveSidebarButton(2)}  
            >  
              <Contractors fill="#3B3B3B" />  
              <span className={styles.expandedButtonText}>Contractors</span>  
            </button>  

            <button  
              className={getSidebarButtonClass(3)}  
              onClick={() => setActiveSidebarButton(3)}  
            >  
              <PeopleLogo />  
              <span className={styles.expandedButtonText}>Clients</span>  
            </button>  
          </div>  
        </div>  

        <div className={styles.footerText}>All Funeral Services © 2015-2025</div>  
      </aside>  

      <main className={styles.mainContent}>{children}</main>  
    </div>  
  );  
};  

export default MainLayout;  