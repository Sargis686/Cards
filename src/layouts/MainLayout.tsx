import React, { ReactNode, useState } from "react";
import styles from "./MainLayout.module.scss";

import sidebarTreeLogo from "../assets/sidebar-tree.svg";
import BriefcaseLogo from "../assets/briefcase.svg?react";
import ContractorsLogo from "../assets/contractors.svg?react";
import PeopleLogo from "../assets/people.svg?react";

import searchLogo from "../assets/search.svg";
import settingsLogo from "../assets/settings.svg";
import exitLogo from "../assets/exit.svg";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [expandActiveButton, setExpandActiveButton] = useState<number>(1);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <img
          className={styles.logo}
          src={sidebarTreeLogo}
          alt="sidebarTreeLogo"
        />

        <div className={styles.main}>
          <div>
            <button className={`${styles["active-button"]}`}>
              <BriefcaseLogo fill="#3B3B3B" />
            </button>
            <button>
              <img src={searchLogo} alt="searchLogo" />
            </button>
          </div>

          <div className={styles.bottom}>
            <button>
              <img src={settingsLogo} alt="settingsLogo" />
            </button>
            <button>
              <img src={exitLogo} alt="exitLogo" />
            </button>
          </div>
        </div>
      </aside>
      <aside className={styles["sidebar-expanded"]}>
        <div>
          <div className={styles["sidebar-expanded-title"]}>
            <h2>Oak Tree Cemetery</h2>
            <h3>Process Manager</h3>
          </div>

          <div className={styles["sidebar-expanded-buttons"]}>
            <button
              className={`${styles["sidebar-expanded-button"]} ${
                styles["sidebar-expanded-button-first"]
              } ${
                expandActiveButton === 1
                  ? styles["sidebar-expanded-button-active"]
                  : null
              }`}
              onClick={() => setExpandActiveButton(1)}
            >
              <BriefcaseLogo fill="#3B3B3B" />
              <span className={styles["sidebar-expanded-text"]}>
                Organizations
              </span>
            </button>
            <button
              className={`${styles["sidebar-expanded-button"]} ${
                expandActiveButton === 2
                  ? styles["sidebar-expanded-button-active"]
                  : null
              }`}
            >
              <ContractorsLogo fill="#3B3B3B" />
              <span className={styles["sidebar-expanded-text"]}>
                Contractors
              </span>
            </button>
            <button
              className={`${styles["sidebar-expanded-button"]} ${
                expandActiveButton === 3
                  ? styles["sidebar-expanded-button-active"]
                  : null
              }`}
            >
              <PeopleLogo />
              <span className={styles["sidebar-expanded-text"]}>Clients</span>
            </button>
          </div>
        </div>

        <div className={styles.description}>
          All Funeral Services © 2015-2025
        </div>
      </aside>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MainLayout;
